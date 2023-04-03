"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trackerFactory_1 = require("./trackerFactory");
const types_1 = require("./types");
const testErrorId = 'testId';
const initMockFn = jest.fn();
const captureExceptionMockFn = jest.fn(_ => testErrorId);
const setUserDataMockFn = jest.fn();
const TestAdapter = () => {
    const init = () => {
        initMockFn();
        return true;
    };
    const setUserData = userData => setUserDataMockFn(userData);
    const captureException = (e) => captureExceptionMockFn(e);
    return {
        captureException,
        init,
        setUserData
    };
};
describe('Error Tracking', () => {
    it('Initiates the tracker', () => {
        const errorTracking = (0, trackerFactory_1.ErrorTrackerFactory)(TestAdapter());
        const enabled = errorTracking.init();
        expect(enabled).toBe(true);
        expect(initMockFn).toHaveBeenCalled();
    });
    it('Does not fire events when is not initiated', () => {
        const errorTracking = (0, trackerFactory_1.ErrorTrackerFactory)(TestAdapter());
        const sampleError = new Error('test');
        const id = errorTracking.captureException(sampleError);
        expect(id).toBe(undefined);
        expect(captureExceptionMockFn).toHaveBeenCalledTimes(0);
    });
    it('Sends a captured exception', () => {
        const errorTracking = (0, trackerFactory_1.ErrorTrackerFactory)(TestAdapter());
        errorTracking.init();
        const sampleError = new Error('test');
        const id = errorTracking.captureException(sampleError);
        expect(id).toBe(testErrorId);
        expect(captureExceptionMockFn).toHaveBeenCalledWith(sampleError);
    });
    it('Does not save user data without permission', () => {
        const errorTracking = (0, trackerFactory_1.ErrorTrackerFactory)(TestAdapter());
        errorTracking.init();
        const userData = {
            email: 'john@example.com',
            id: 'id',
            username: 'John Doe'
        };
        errorTracking.setUserData(userData);
        expect(setUserDataMockFn).toHaveBeenCalledTimes(0);
    });
    it('Does save user data with proper permission', () => {
        const errorTracking = (0, trackerFactory_1.ErrorTrackerFactory)(TestAdapter(), [types_1.TrackerPermission.USER_DATA]);
        errorTracking.init();
        const userData = {
            email: 'john@example.com',
            id: 'id',
            username: 'John Doe'
        };
        errorTracking.setUserData(userData);
        expect(setUserDataMockFn).toHaveBeenCalledWith(userData);
    });
});
