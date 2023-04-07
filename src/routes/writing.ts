import { Router } from 'express';
import {
  storeWriting,
  updateStory,
  fetchAuthorStories,
  fetchStory,
  deleteStory,
  getStory,
} from '../controllers/writing';
import { verifyUser } from '../utils/verifyToken';

const router: Router = Router();

router.get('/stories', fetchAuthorStories);
router.get('/:url', getStory);
router.get('/read/:url', fetchStory);
router.post('/store', verifyUser, storeWriting);
router.put('/:id/update', verifyUser, updateStory);
router.delete('/:id/delete', verifyUser, deleteStory);

export default router;
