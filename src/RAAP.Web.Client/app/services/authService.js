(function () {
    "use strict";

    angular.module("raap").factory("authService", ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            userDetails: {},
            hasRole: function (role) {
                if (!_authentication.userDetails || !_authentication.userDetails.roles || _authentication.userDetails.roles.length <= 0)
                    return false;
                for (var i = 0; i < _authentication.userDetails.roles.length; i++) {
                    if (_authentication.userDetails.roles[i] === role) {
                        return true;
                    }
                }
                return false;
            },
            lastActivity: null
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                // must be here to do authorizated requests
                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });

                _getUserDetails().then(function (userDetailsResponse) {
                    console.log(userDetailsResponse);
                    localStorageService.set('authorizationData', {
                        token: response.data.access_token,
                        userName: loginData.userName,
                        userDetails: userDetailsResponse.data,
                        lastActivity: new Date().getTime()
                    });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    _authentication.useRefreshTokens = loginData.useRefreshTokens;
                    _authentication.userDetails = userDetailsResponse.data;
                    _authentication.lastActivity = new Date().getTime();

                    deferred.resolve(response);


                }, function (error) {
                    console.log(error);
                    alert("error: " + error);
                });

            },
                function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _recoverPassword = function (recoverPasswordData) {

            var data = "username=" + recoverPasswordData.userName;
            var deferred = $q.defer();

            $http.post(serviceBase + 'api/account/RecoverPassword', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                    deferred.resolve(response);
                },
                function (err, status) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.userDetails = {};
            _authentication.lastActivity = null;

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData && authData.lastActivity) {

                var latestUseDate = new Date(new Date(authData.lastActivity).getTime() + 60 * 60000); // 60min timeout

                if (latestUseDate > new Date()) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                    _authentication.userDetails = authData.userDetails;
                    _authentication.lastActivity = authData.lastActivity;

                    localStorageService.set('authorizationData', {
                        token: authData.token,
                        refreshToken: "",
                        userName: authData.userName,
                        userDetails: authData.userDetails,
                        lastActivity: new Date().getTime()
                    });


                }


                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.userDetails = authData.userDetails;
            }

        };

        var _getUserDetails = function () {

            var deferred = $q.defer();

            $http.get(serviceBase + 'api/account/GetMyDetails').then(function (response) {
                deferred.resolve(response);

            },function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _changePassword = function (changePasswordData) {

            var deferred = $q.defer();

            $http.post(serviceBase + 'api/account/SetNewPassword', changePasswordData, { headers: { 'Content-Type': 'application/json'} }).then(function (response) {
                deferred.resolve(response);
            },
                function (err, status) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        authServiceFactory.login = _login;
        authServiceFactory.recoverPassword = _recoverPassword;
        authServiceFactory.changePassword = _changePassword;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.getUserDetails = _getUserDetails;

        return authServiceFactory;
    }]);

})();
