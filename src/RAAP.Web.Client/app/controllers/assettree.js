(function () {
    "use strict";

    angular.module("raap").controller('assettreeController', assettreeController);
    assettreeController.$inject = ['$scope', '$location', '$state', '$loading', '$timeout', 'assetService', '$rootScope'];
    function assettreeController($scope, $location, $state, $loading, $timeout, assetService, $rootScope) {

        $scope.vm = {
            selectedAsset: null,
            query: '',
        };

        $scope.loadedAsset = null;
        $scope.reverseAssetRoot = null;

        $scope.search = function (query) {
            return assetService.search(query).then(function (response) {
                return response.data;
            });
        };

        $scope.loadAsset = function (assetId) {
            assetService.getSingle(assetId).then(
                                function (result) {
                                    $scope.loadedAsset = result.data;

                                    assetService.getReverse(assetId).then(
                                        function (result) {
                                            $scope.reverseAssetRoot = result.data;
                                        },
                                        function (response) {

                                            if (response && response.exceptionMessage) {
                                                $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                                            }
                                            else {
                                                $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                                            }

                                        });
                                    $rootScope.$broadcast('asset-changed');
                                },
                                function (response) {

                                    if (response && response.exceptionMessage) {
                                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                                    }
                                    else {
                                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                                    }
                                });
        };

        $scope.$watch('vm.selectedAsset', function () {
            if($scope.vm.selectedAsset) {
                $scope.loadAsset($scope.vm.selectedAsset.id);
            }
        });
    }
})();

