(function () {
    "use strict";

    angular.module("raap").factory("languageService", ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, $rootScope) {

        var userServiceBase = ngAuthSettings.apiServiceBaseUri + "api/user";

        var defaultUserLanguageIsoCode = "en-us";
        var languageServiceFactory = {};

        languageServiceFactory.setUserLanguage = function (languageIsoCode) {
            localStorageService.set('languageIsoCode', languageIsoCode);
            $rootScope.$broadcast('language-changed', { isoCode: languageIsoCode});
        };

        languageServiceFactory.getUserLanguage = function () {
            var savedLanguage = localStorageService.get('languageIsoCode');
            if (!savedLanguage) {
                savedLanguage = defaultUserLanguageIsoCode;
            }

            return savedLanguage;
        };

        languageServiceFactory.getLanguages = function () {
            return $http.get(userServiceBase + '/GetAvailableLanguages');
        };

        return languageServiceFactory;
    }]);

})();