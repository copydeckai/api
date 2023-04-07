"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openai_1 = require("../controllers/openai");
// const router = express.Router();
const router = (0, express_1.Router)();
router.post('/completion', openai_1.completion);
router.post('/edit', openai_1.edit);
router.post('/embedding', openai_1.embedding);
exports.default = router;
//# sourceMappingURL=openai.js.map