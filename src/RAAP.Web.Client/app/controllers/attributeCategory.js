(function () {
    "use strict";


    angular.module("raap").controller('attributeCategoryController', attributeCategoryController);
    attributeCategoryController.$inject = ['$scope', '$location', '$timeout', 'attributeCategoryService', '$loading', '$state', 'authService'];
    function attributeCategoryController($scope, $location, $timeout, attributeCategoryService, $loading, $state, authService) {
        $scope.authentication = authService.authentication;
        $scope.attributeTypeId = $state.current.data.attributeTypeId;
        $scope.nameprefix = $state.current.data.nameprefix;
        $scope.urlprefix = $state.current.data.urlprefix;
        $scope.idfield = "attributeCategoryId";


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

            attributeCategoryService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $scope.attributeTypeId).then(
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
            $location.path('/app/' + $scope.urlprefix + '/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/' + $scope.urlprefix + '/create');
        };

        
        $scope.search = function (val) {
            return attributeCategoryService.search(val, $scope.attributeTypeId).then(function (response) {
                return response.data;
            });
        };

        $scope.loadData();

    }




    angular.module("raap").controller('attributeCategoryCreateController', attributeCategoryCreateController);
    attributeCategoryCreateController.$inject = ['$scope', '$location', '$timeout', 'attributeCategoryService', '$sce', '$loading', '$state', '$mdDialog'];
    function attributeCategoryCreateController($scope, $location, $timeout, attributeCategoryService, $sce, $loading, $state, $mdDialog) {
        $scope.createMode = true;
        $scope.hideButton = true;
        $scope.attributeTypeId = $state.current.data.attributeTypeId;
        $scope.nameprefix = $state.current.data.nameprefix;
        $scope.urlprefix = $state.current.data.urlprefix;

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

            $scope.vm.attributeTypeId = $scope.attributeTypeId;

            attributeCategoryService.create($scope.vm).then(function (response) {
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
                $location.path('/app/' + $scope.urlprefix + '/grid');
            }, 1000);
        }

    }



    angular.module("raap").controller('attributeCategoryEditController', attributeCategoryEditController);
    attributeCategoryEditController.$inject = ['$scope', '$location', '$timeout', 'attributeCategoryService', '$sce', '$mdDialog', '$loading', '$stateParams', '$state'];
    function attributeCategoryEditController($scope, $location, $timeout, attributeCategoryService, $sce, $mdDialog, $loading, $stateParams, $state) {

        $scope.attributeTypeId = $state.current.data.attributeTypeId;
        $scope.nameprefix = $state.current.data.nameprefix;
        $scope.urlprefix = $state.current.data.urlprefix;


        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.savedSuccessfully = false;

        $scope.vm = {
            attributeCategoryId: $stateParams.id,
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

                     attributeCategoryService.delete($scope.vm.attributeCategoryId).then(function (response) {
                         $loading.finish('key');
                         $scope.alerts.push({ type: 'success', msg: 'Category is deleted. Please wait while the grid is updating ...' });
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

            attributeCategoryService.update($scope.vm).then(function (response) {
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
                $location.path('/app/'+ $scope.urlprefix +'/grid');
            }, 1000);
        }



        $scope.loadData = function () {
            $scope.message = "";
            $scope.savedSuccessfully = false;
            $loading.start('key');

            attributeCategoryService.getSingle($scope.vm.attributeCategoryId).then(
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

