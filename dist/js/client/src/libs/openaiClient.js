"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedding = exports.getEdit = exports.getCompletion = void 0;
const config_1 = require("@copydeck/config");
function getCompletion(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${config_1.API_URL}/writing/completion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(response => response.json());
    });
}
exports.getCompletion = getCompletion;
function getEdit(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${config_1.API_URL}/writing/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(response => response.json());
    });
}
exports.getEdit = getEdit;
function getEmbedding(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${config_1.API_URL}/writing/embedding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(response => response.json());
    });
}
exports.getEmbedding = getEmbedding;
