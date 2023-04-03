"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("./adapters");
const trackerFactory_1 = require("./trackerFactory");
const errorTracker = (0, trackerFactory_1.ErrorTrackerFactory)((0, adapters_1.SentryAdapter)({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.ENVIRONMENT
}));
exports.default = errorTracker;
