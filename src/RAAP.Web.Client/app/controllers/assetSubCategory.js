(function () {
    "use strict";


    angular.module("raap").controller('assetSubCategoryController', assetSubCategoryController);
    assetSubCategoryController.$inject = ['$scope', '$location', '$timeout', 'assetSubCategoryService', '$loading', 'authService'];
    function assetSubCategoryController($scope, $location, $timeout, assetSubCategoryService, $loading, authService) {

        $scope.authentication = authService.authentication;

        $scope.nameprefix = "Asset";
        $scope.urlprefix = "assetsubcategory";
        $scope.idfield = "assetSubCategoryId";

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.gridReOrder = function (order) {

            $scope.vm.orderByKey = order.replace('-', '');
            if ($scope.vm.orderByKey === "categoryId") {
                $scope.vm.orderByKey = $scope.idfield;
            }
            $scope.vm.isDesc = !$scope.vm.isDesc;
            $scope.loadData();
        };



        $scope.vm = {
            searchLoading: false,
            searchResult: null,
            pageSize: 20,
            page: 1,
            orderByKey: '',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            }
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            assetSubCategoryService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
                function (result) {

                    $scope.vm.dataset.items = result.data.items;
                    $scope.vm.dataset.totalPages = result.data.totalPages;
                    $scope.vm.dataset.totalItems = result.data.totalItems;
                    $scope.vm.page = result.data.currentPage;
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

        $scope.edit = function (id) {
            $location.path('/app/assetsubcategory/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/assetsubcategory/create');
        };

        
        $scope.search = function (val) {
            return assetSubCategoryService.search(val).then(function (response) {
                return response.data;
            });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.loadData();
            }, 1500);
        };

        $scope.loadData();

    }




    angular.module("raap").controller('assetSubCategoryCreateController', assetSubCategoryCreateController);
    assetSubCategoryCreateController.$inject = ['$scope', '$location', '$timeout', 'assetSubCategoryService', '$sce', '$loading', '$mdDialog'];
    function assetSubCategoryCreateController($scope, $location, $timeout, assetSubCategoryService, $sce, $loading, $mdDialog) {
        $scope.title = "asset category";
        $scope.createMode = true;
        $scope.hideButton = true;
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.savedSuccessfully = false;

        $scope.vm = {
            name: "",
            description: ""
        };

        $scope.exit = function () {

            if ($scope.categoryForm.$pristine)
                window.history.back();
            else {
                $mdDialog.show({
                    controller: 'okCancelController',
                    templateUrl: 'app/views/shared/unsaved.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                     .then(function (answer) {
                         $scope.save(true);
                     }, function () {
                         window.history.back();
                     });

            }

        };

        $scope.save = function () {
          
            $loading.start('key');
            $scope.savedSuccessfully = false;

            assetSubCategoryService.create($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.alerts.push({ type: 'success', msg: 'The category was created! Please wait while we redirect back to the index page.' });
                startTimer();
                $loading.finish('key');
            },
                function (response) {
                    if (response && response.modelState) {
                        var errors = [];
                        for (var key in response.modelState) {
                            for (var i = 0; i < response.modelState[key].length; i++) {
                                errors.push(response.modelState[key][i]);
                            }
                        }
                        $scope.alerts.push({ type: 'danger', msg: 'Please correct the following: ' + errors[0] });
                    } else if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }
                    $loading.finish('key');

                });
        };



        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/assetsubcategory/grid');
            }, 1000);
        }

    }



    angular.module("raap").controller('assetSubCategoryEditController', assetSubCategoryEditController);
    assetSubCategoryEditController.$inject = ['$scope', '$location', '$timeout', 'assetSubCategoryService', '$sce','$mdDialog', '$loading', '$stateParams'];
    function assetSubCategoryEditController($scope, $location, $timeout, assetSubCategoryService, $sce, $mdDialog, $loading, $stateParams) {
        $scope.title = "asset category";
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.savedSuccessfully = false;

        $scope.vm = {
            assetsubcategoryId: $stateParams.id,
            name: "",
            description: ""
        };

        $scope.exit = function () {

            if ($scope.categoryForm.$pristine)
                window.history.back();
            else {
                $mdDialog.show({
                    controller: 'okCancelController',
                    templateUrl: 'app/views/shared/unsaved.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true
                })
                     .then(function (answer) {
                         $scope.save(true);
                     }, function () {
                         window.history.back();
                     });

            }

        };

        $scope.delete = function () {

            $mdDialog.show({
                controller: 'deleteController',
                templateUrl: 'app/views/shared/delete.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true
            })
                 .then(function (answer) {

                     $loading.start('key');

                     assetSubCategoryService.delete($scope.vm.assetSubCategoryId).then(function (response) {
                         $loading.finish('key');
                         $scope.alerts.push({ type: 'success', msg: 'Asset Category is deleted. Please wait while the grid is updating ...' });
                         startTimer();

                     },
                 function (response) {
                     if (response && response.data && response.data.exceptionMessage) {
                         $scope.alerts.push({ type: 'danger', msg: response.data.exceptionMessage });
                     }
                     else {
                         $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                     }
                     $loading.finish('key');
                 });


                 }, function () { });


        };

        $scope.save = function (exit) {
           
            $loading.start('key');
            $scope.savedSuccessfully = false;

            assetSubCategoryService.update($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.categoryForm.$setPristine();
                if (exit && exit === true) {
                    $scope.alerts.push({ type: 'success', msg: 'The category was updated! Please wait while we redirect back to the index page.' });
                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The category was updated!' });
                }
                $loading.finish('key');
            },
                function (response) {
                    if (response && response.modelState) {
                        var errors = [];
                        for (var key in response.modelState) {
                            for (var i = 0; i < response.modelState[key].length; i++) {
                                errors.push(response.modelState[key][i]);
                            }
                        }
                        $scope.alerts.push({ type: 'danger', msg: 'Please correct the following: ' + errors[0] });
                    } else if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }
                    $loading.finish('key');

                });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/assetsubcategory/grid');
            }, 1000);
        }



        $scope.loadData = function () {
            $scope.message = "";
            $scope.savedSuccessfully = false;
            $loading.start('key');

            assetSubCategoryService.getSingle($scope.vm.assetsubcategoryId).then(
                function (result) {
                    $scope.vm = result.data;
                    $loading.finish('key');
                },
                function (response) {

                    if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }

                    $loading.finish('key');
                });
        };


        $scope.loadData();

    }





})();

