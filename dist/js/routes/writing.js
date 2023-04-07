"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const writing_1 = require("../controllers/writing");
const verifyToken_1 = require("../utils/verifyToken");
const router = (0, express_1.Router)();
router.get('/stories', writing_1.fetchAuthorStories);
router.get('/:url', writing_1.getStory);
router.get('/read/:url', writing_1.fetchStory);
router.post('/store', verifyToken_1.verifyUser, writing_1.storeWriting);
router.put('/:id/update', verifyToken_1.verifyUser, writing_1.updateStory);
router.delete('/:id/delete', verifyToken_1.verifyUser, writing_1.deleteStory);
exports.default = router;
//# sourceMappingURL=writing.js.map