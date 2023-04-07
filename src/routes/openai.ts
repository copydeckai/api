import { Router } from 'express';
import { completion, edit, embedding } from '../controllers/openai';

// const router = express.Router();
const router: Router = Router();

router.post('/completion', completion);
router.post('/edit', edit);
router.post('/embedding', embedding);

export default router;
