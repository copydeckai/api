"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvoiceSchema = new mongoose_1.Schema({
    invoiceId: {
        type: String,
        required: true,
    },
    planType: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
    },
    authorId: {
        type: String,
        required: true,
    },
    authorFname: {
        type: String,
        required: true,
    },
    authorLname: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    isCreated: {
        type: Date,
        default: Date.now,
    },
    isUpdated: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Invoice', InvoiceSchema);
//# sourceMappingURL=Invoice.js.map