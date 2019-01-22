(function () {
    "use strict";


    angular.module("raap").controller('risktypeController', risktypeController);
    risktypeController.$inject = ['$scope', '$location', '$timeout', 'risktypeService', '$loading', '$stateParams', 'authService'];
    function risktypeController($scope, $location, $timeout, risktypeService, $loading, $stateParams, authService) {

        $scope.authentication = authService.authentication;
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.gridPagination = function (page, limit) {
            $scope.vm.pageSize = limit;
            $scope.vm.page = page;
            $scope.loadData();
        }
        $scope.gridReOrder = function (order) {
            $scope.vm.orderByKey = order.replace('-', '');
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
            },
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            risktypeService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
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
            $location.path('/app/risktype/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/risktype/create');
        };

        $scope.loadData();
    }

    angular.module("raap").controller('risktypeCreateController', risktypeCreateController);
    risktypeCreateController.$inject = ['$scope', '$location', '$timeout', 'risktypeService', '$sce', '$loading', '$mdDialog', 'runningInModalChild'];
    function risktypeCreateController($scope, $location, $timeout, risktypeService, $sce, $loading, $mdDialog, runningInModalChild) {
        $scope.createMode = true;

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

        $scope.savedSuccessfully = false;

        $scope.vm = {
            riskTypeId: -1,
            name: '',
        };

        $scope.save = function (exit) {
            $scope.alerts = [];
            $loading.start('key');
            $scope.savedSuccessfully = false;

            if (runningInModalChild) {
                // this controller/view is called from modal - dont save to db
                $mdDialog.hide($scope.vm);
                return;
            }

            risktypeService.create($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                if (exit && exit == true) {
                    $scope.alerts.push({ type: 'success', msg: 'The risktype was created! Please wait while we redirect back to the index page.' });
                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The risktype was saved.' });
                }
                $loading.finish('key');
                $('#mainmenu').scope().refreshTreeView();
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
                $location.path('/app/risktype/grid');
            }, 1000);
        }
    }



    angular.module("raap").controller('risktypeEditController', risktypeEditController);
    risktypeEditController.$inject = ['$scope', '$location', '$timeout', 'risktypeService', '$sce', '$loading', '$stateParams', '$mdDialog'];
    function risktypeEditController($scope, $location, $timeout, risktypeService, $sce, $loading, $stateParams, $mdDialog) {

        $scope.createMode = false;
        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
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


        $scope.savedSuccessfully = false;

        $scope.vm = {
            riskTypeId: $stateParams.id,
            name: '',
        };

        $scope.save = function (exit) {
            $scope.alerts = [];
            $loading.start('key');
            $scope.savedSuccessfully = false;

            risktypeService.update($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.categoryForm.$setPristine();
                if (exit && exit == true) {
                    $scope.alerts.push({ type: 'success', msg: 'The risktype was updated! Please wait while we redirect back to the index page.' });
                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The risktype was saved.' });
                }
                $loading.finish('key');
                $('#mainmenu').scope().refreshTreeView();
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
                risktypeService.delete($scope.vm.riskTypeId).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'risktype is deleted. Please wait while the grid is updating ...' });
                    startTimer();

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
            }, function () {
            });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/risktype/grid');
            }, 1000);
        }

        $scope.loadData = function () {
            $scope.savedSuccessfully = false;
            $loading.start('key');
            risktypeService.getSingle($scope.vm.riskTypeId).then(
                function (result) {
                    $scope.vm = result.data;
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

