(function () {
    "use strict";

    angular.module("raap").factory("soachapterService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/soa";
        var serviceFileBase = ngAuthSettings.apiServiceBaseUri + "api/file";
        var soachapterServiceFactory = {};

        //Delete file som SOA
        soachapterServiceFactory.deleteFile = function (file) {
            var deferred = $q.defer();

            $http.delete(serviceFileBase + '/' + file.guid, {}, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;

        };

        // get all 
        soachapterServiceFactory.get = function (type, isoCode) {
            return $http.get(serviceBase + '/' + type + '/' + isoCode);
        };

        soachapterServiceFactory.getRelevantSoas = function () {
            return $http.get(serviceBase + '/GetRelevantSoas');
        };

        // update 
        soachapterServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        soachapterServiceFactory.getSoa = function (type, isoCode) {
            return $http.get(serviceBase + '/GetSoa/' + type + '/' + isoCode);
        };

        soachapterServiceFactory.addTemplate = function (template) {
            var deferred = $q.defer();

            $http.post(serviceBase + "/AddTemplate", template, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        // update 
        soachapterServiceFactory.updateSoa = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase + '/UpdateSoa', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        soachapterServiceFactory.getAssetSoas = function (assetId, isoCode) {
            return $http.get(serviceBase + '/GetAssetSoas/' + assetId + '/' + isoCode);
        };

        soachapterServiceFactory.updateAssetSoas = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase + '/UpdateAssetSoas', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        soachapterServiceFactory.getSoaStatistics = function (soaType) {
            return $http.get(serviceBase + '/GetSoaStatistics/' + soaType);
        };

        soachapterServiceFactory.getAssetSoaStatistics = function (assetId, soaType, isoCode) {
            return $http.get(serviceBase + '/GetAssetSoaStatistics/' + assetId + '/' + soaType + '/' + isoCode);
        };

        return soachapterServiceFactory;
    }]);

})();
