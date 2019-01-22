(function () {
    "use strict";

    angular.module("raap").factory('httpInterceptorService', ['$q', '$injector', '$location', 'localStorageService', 'ngAuthSettings', '$cookies',
    function ($q, $injector, $location, localStorageService, ngAuthSettings, $cookies) {

            var httpInterceptorServiceFactory = {};

            var _request = function (config) {

                config.headers = config.headers || {};
                config.headers['Access-Control-Allow-Origin'] = ngAuthSettings.apiServiceBaseUri;

                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                    $cookies.put("raap", authData.token, {
                        path: "/"
                    });
                }

                return config;
            }

            var _responseError = function (rejection) {
                if (rejection.status === 401) {
                    var authService = $injector.get('authService');

                    authService.logOut();
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }

            httpInterceptorServiceFactory.request = _request;
            httpInterceptorServiceFactory.responseError = _responseError;

            return httpInterceptorServiceFactory;
        }]);

})();



