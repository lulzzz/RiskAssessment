(function () {
    "use strict";

    angular.module("raap").controller('dashboardController', dashboardController);
    dashboardController.$inject = ['$scope', '$location', 'userService', 'authService', '$state', '$loading', 'reportService', '$timeout', 'assetService'];
    function dashboardController($scope, $location, userService, authService, $state, $loading, reportService, $timeout, assetService) {

        $scope.vm = {
            generatedDate: null,

            processesByCategoryLabels: [],
            processesByCategoryData: [],

            assetsByCategoryLabels: [],
            assetsByCategoryData: [],

            threatsByCategoryLabels: [],
            threatsByCategoryData: [],
        
        }

        $scope.vm2 = {
            assets: [],
            filteredAssets: [],

            selectedProbabilityLevel: 3,
            selectedImpactLevel: 3,
            selectedImpactType: 1,
            selectedProbabilityType: 1,
            levelType : 1,
            isAllExpanded: false,
            setupDone: false
        };



        $scope.toggleAll = function() {
            
            if ($scope.vm2.isAllExpanded) {
                $scope.accordion1.collapseAll();
            } else {
                console.log("expanding all");
                $scope.accordion1.expandAll();
            }

            $scope.vm2.isAllExpanded = !$scope.vm2.isAllExpanded;
        }


        $scope.$on('accordion1:onReady', function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.toggleAll();
            }, 100);
        });

        console.log($scope.vm2);

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            reportService.getDashboardReport().then(
                function (result) {
                    $scope.vm = result.data;


                    $scope.loadData2();

                    $scope.$watch('vm2.selectedProbabilityLevel', function () {
                        $scope.loadData2();
                    });

                    $scope.$watch('vm2.selectedImpactLevel', function () {
                        $scope.loadData2();
                    });
                    $scope.$watch('vm2.levelType', function () {
                        $scope.loadData2();
                    });
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        $scope.loadData2 = function () {

            $scope.vm2.assets = null;

            assetService.getUnhandledThreats($scope.vm2.selectedProbabilityLevel, $scope.vm2.selectedImpactLevel, $scope.vm2.levelType).then(
                function (result) {

                    $scope.vm2.assets = result.data;
                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        $scope.loadData();


    }

})();

