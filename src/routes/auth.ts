import { Router, Response, Request, NextFunction } from 'express';
import {
  changePassword,
  getUserDetails,
  login,
  register,
  forgotPassword,
  resetPassword,
  resetPasswordPost,
  verifyEmail,
  resendConfirmEmail,
  // googlePassport,
  // googlePassportCallback,
} from '../controllers/auth';
import { verifyUser } from '../utils/verifyToken';

const router: Router = Router();

const use =
  (func: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

router.post('/register', use(register));
router.post('/login', login);
router.get('/fetch', getUserDetails);
router.post('/forgot-password', forgotPassword);
router.post('/resend-confirm', resendConfirmEmail);
router.get('/reset-password/:id/:token', resetPassword);
router.post('/reset-password/:id/:token', resetPasswordPost);
router.post('/change-password', verifyUser, changePassword);
router.get('/verify/:id/:token', verifyEmail);
// router.get('/google', googlePassport);
// router.get('/google/callback', googlePassportCallback);

export default router;
