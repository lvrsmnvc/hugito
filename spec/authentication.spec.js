jest.disableAutomock();

import Authentication from '../components/utils/Authentication.jsx';

describe("Authentication", () => {

    let auth;
    Authentication.prototype._setupWebSocket = jest.fn();

    beforeEach(() => {
        auth = new Authentication();
    });

    afterEach(() => {
        auth = undefined;
    });

    describe("When extracting a target from an url", () => {
        describe("and the target exists in the url", () => {
            it("should return the value related to that target (after the equal in this case).", () => {
                spyOn(auth, "setCode");
                spyOn(auth, "setReceivedState");

                let url = "http://www.github.com/something?code=123";
                let target = 'code';

                expect(auth._getParameterFromUrl(url, target)).toBe('123');
            });
        });
        describe("and the target does not exist in the url", () => {
            it("should return null", () => {
                spyOn(auth, "setCode");
                spyOn(auth, "setReceivedState");

                let url = "http://www.github.com/something?bla=123";
                let target = 'code';

                expect(auth._getParameterFromUrl(url, target)).toBe(null);
            });
        });
    });

    describe("When checking if an authentication process is going on", () => {
        describe("and the url is valid", () => {
            it("should call setCode and setReceivedState with parameters equal to the respective url parameters", () => {
                spyOn(auth, "setCode");
                spyOn(auth, "setReceivedState");

                const code = "123abc";
                const receivedState = "456xyz";
                const validUrl = "http://www.github.com/something?code=" + code + "&state=" + receivedState;

                auth.checkIfAuthenticating(validUrl);

                expect(auth.setCode).toBeCalledWith(code);
                expect(auth.setReceivedState).toBeCalledWith(receivedState);
            });
        });

        describe("and the url is invalid", () => {
            it("should call setCode and setReceivedState with an empty string when the link contains code but not state.", () => {
                spyOn(auth, "setCode");
                spyOn(auth, "setReceivedState");

                const invalidUrl = "http://www.github.com/something?code=ccccc";

                auth.checkIfAuthenticating(invalidUrl);

                expect(auth.setCode).toBeCalledWith('');
                expect(auth.setReceivedState).toBeCalledWith('');
            });

            it("should not do anything with an empty string when the link contains state but not code.", () => {
                spyOn(auth, "setCode");
                spyOn(auth, "setReceivedState");

                const invalidUrl = "http://www.github.com/something?state=ccccc";

                auth.checkIfAuthenticating(invalidUrl);

                expect(auth.setCode).not.toBeCalled();
                expect(auth.setReceivedState).not.toBeCalled();
            });

            it("should not do anything when the link has no code field.", () => {
                spyOn(auth, "setCode");
                spyOn(auth, "setReceivedState");

                const invalidUrl = "http://www.github.com/something?hdhwiue&hduiebwdwd";

                auth.checkIfAuthenticating(invalidUrl);

                expect(auth.setCode).not.toBeCalled();
                expect(auth.setReceivedState).not.toBeCalled();
            });
        });
    });

    describe("When checking if a user is authenticated", function () {
        describe("and the user is not authenticated", function () {
            it("should return false for isAuthenticated", function () {
                expect(auth.isAuthenticated()).toBe(false);
                auth._onError(false);
                expect(auth.isAuthenticated()).toBe(false);
            });
        });

        describe("and the user is authenticated", function () {
            it("should return true for isAuthenticated", function () {
                auth._onSetAuthenticated(true);
                expect(auth.isAuthenticated()).toBe(true);
            });
        });
    });
});
