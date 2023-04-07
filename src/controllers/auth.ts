import { Response, Request, NextFunction } from 'express';
// import { IUser } from "./../../types/user"
import bcrypt from 'bcryptjs';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import createError from '../utils/error';
import sendEmail from '../utils/mailer';
import User from '../models/User';
import { passportSession } from '../utils/verifyToken';

dotenv.config();
const jwtSecret = process.env.JWT as string;
const clientUrl = process.env.CLIENT_URL as string;

function getUserDataFromReq(req: Request) {
  return new Promise((resolve) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      resolve(userData);
    });
  });
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, firstName } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return next(createError(422, 'User with email already exists'));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    // Generate token with id
    const token = newUser.generateVerificationToken();
    // const verificationToken = newUser.token();
    // Email the user a unique verification link
    const link = `https://copydeck.grayshapes.co/verify-identity/${newUser.id}/${token}`;
    await sendEmail(
      email,
      'Confirm Account',
      link,
      firstName,
      'signup-confirm'
    );

    res.status(200);
    // .send({message: "Verfication email sent"});
  } catch (err) {
    next(err);
  }
};

export const resendConfirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData: any = await getUserDataFromReq(req);
  try {
    const user = await User.findOne({ _id: userData.id });
    console.log(user);
    // Generate token with user data
    const token = user?.generateVerificationToken();
    // const token = jwt.sign({ email: userData.email, id: userData._id }, jwtSecret, {
    // 	expiresIn: "10m",
    //   });
    // const verificationToken = newUser.token();
    // Email the user a unique verification link
    if (user) {
      const link = `https://copydeck.grayshapes.co/verify-identity/${userData.id}/${token}`;
      await sendEmail(
        user.email,
        'Confirm Account',
        link,
        user.firstName,
        'signup-confirm'
      );

      res.status(200).send({ message: 'Verfication email sent' });
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'Wrong password or email'));
    // if (!user.isActive) return next(createError(403, "Account hasn\'t been verified"));
    if (user.isBanned) return next(createError(401, 'User has been banned'));

    const isMatch = await bcrypt.compare(req.body.password, user?.password);
    if (!isMatch) return next(createError(400, 'Wrong password or email'));
    const { password, isAdmin, isActive, ...otherDetails } = user._doc;
    jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive },
      jwtSecret,
      {},
      (err: any, token: any) => {
        if (err) {
          throw err;
        }
        res
          .cookie('token', token, {
            httpOnly: true,
          })
          .status(200)
          .json({ ...otherDetails, isAdmin, isActive });
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;
  try {
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
        if (err) {
          throw err;
        }
        const query = { _id: userData.id };
        const account = await User.findOne(query);

        res.status(200).json(account);
      });
    } else {
      res.status(401).json(null);
    }
  } catch (err) {
    throw res.status(500).json({ message: 'Server error occured' });
    // next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'User not found!'));

    const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret, {
      expiresIn: '5m',
    });

    const link = `https://copydeck.grayshapes.co/reset-password/${user._id}/${token}`;
    const { email } = req.body;

    await sendEmail(email, 'Password Reset', link, '', 'reset-password');

    res.status(200).send({
      message: 'Password reset link sent',
    });
  } catch (err) {
    next(createError(500, 'Something went wrong'));
    console.log(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) return next(createError(404, 'User not found!'));

  let payload = null;
  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(500).send(`Invalid token: ${err}`);
  }

  // try {
  // const verify = jwt.verify(token, process.env.JWT);
  // res.render("index", { email: verify.email, status: "Not Verified" });
  // } catch (error) {
  // console.log(error);
  // res.status(400).send("Not Verified");
  // }
};

export const resetPasswordPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id, token } = req.params;
  const { email, password } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) return next(createError(404, 'User not found!'));

  let payload = null;
  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, jwtSecret);
    try {
      const isMatchPassword = await bcrypt.compare(password, user?.password);
      if (isMatchPassword)
        return next(
          createError(
            400,
            'New password cannot be similar as previous password'
          )
        );

      // const verify = jwt.verify(token, jwtSecret);
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: hash,
          },
        }
      );
      const content = `Your copydeck account password has been changed.`;
      await sendEmail(email, 'Password Reset Done', content, '', 'reset-done');

      res.status(200).send({ message: 'Password reset done.' });
    } catch (err) {
      console.log(err);
      next(err);
      //   res.json({ status: "Something Went Wrong" });
    }
  } catch (err) {
    return next(createError(500, `Link token expired`));
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData: any = await getUserDataFromReq(req);
  const { newPassword } = req.body;

  const user: any = await User.findOne({ _id: userData.id });
  // if (!user) return next(createError(404, "User not found!"));

  try {
    const isMatchPassword = await bcrypt.compare(newPassword, user.password);
    if (isMatchPassword)
      return next(createError(400, "Try a password you've not used before."));

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(newPassword, salt);
    await User.updateOne(
      {
        _id: userData.id,
      },
      {
        $set: {
          password: hash,
        },
      }
    );
    const content = `Your copydeck account password has been updated.`;
    await sendEmail(
      user?.email,
      'Password has been changed',
      content,
      '',
      'reset-done'
    );

    res.status(200).send({
      message: 'Password updated.',
    });
  } catch (err) {
    console.log(err);
    next(err);
    //   res.json({ status: "Something Went Wrong" });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, token } = req.params;
  if (!token) {
    return res.status(422).send({
      message: 'Missing token',
    });
  }
  // Verify the token from the URL
  let payload = null;
  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return next(createError(500, `Invalid token: ${err}`));
  }
  try {
    const user = await User.findOne({ _id: id });
    if (!user) return next(createError(404, 'User not found!'));
    user.isActive = true;
    await user.save();
    return res.status(200).send({
      message: 'Account Verified',
    });
  } catch (err) {
    console.log(err);
    next(err);
    // return res.status(500).send(err);
  }
};

export const googlePassport = async (): Promise<void> => {
  passport.authenticate('google', { scope: ['profile', 'email'] });
};

export const googlePassportCallback = async () => {
  // eslint-disable-next-line no-unused-expressions
  passport.authenticate('google', {
    successRedirect: clientUrl,
    failureRedirect: `/login`,
    // eslint-disable-next-line no-sequences
  }),
    (req: Request, res: Response) => {
      const token = passportSession(req.user);
      res.cookie('token', token);
      res.redirect(`/`);
    };
};
