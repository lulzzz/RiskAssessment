(function () {
    "use strict";


    angular.module("raap").controller('companyController', companyController);
    companyController.$inject = ['$scope', '$location', '$timeout', 'companyService', '$uibModal', '$loading', '$mdDialog', 'authService'];
    function companyController($scope, $location, $timeout, companyService, $uibModal, $loading, $mdDialog, authService) {

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

            companyService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
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
            $location.path('/app/company/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/company/create');
        };
        $scope.delete = function (id) {


            $mdDialog.show({
                controller: 'deleteController',
                templateUrl: 'app/views/shared/delete.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true
            })
            .then(function (answer) {

                $loading.start('key');

                companyService.delete(id).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'Company is deleted. Please wait while the grid is updating ...' });
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


        $scope.search = function (val) {
            return companyService.search(val).then(function (response) {
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




    angular.module("raap").controller('companyCreateController', companyCreateController);
    companyCreateController.$inject = ['$scope', '$location', '$timeout', 'companyService', '$sce', '$loading', 'Upload', 'ngAuthSettings'];
    function companyCreateController($scope, $location, $timeout, companyService, $sce, $loading, Upload, ngAuthSettings) {

        $scope.createMode = true;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            name: ""
        };
        $scope.exit = function () {
            $location.path('/app/company/grid');
        };

        $scope.uploadFile = function (file, errFiles) {
            $scope.f = file;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: ngAuthSettings.apiServiceBaseUri + "api/company/profileimage?companyId=" + $scope.vm.companyId,
                    data: { file: file }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        $scope.profileimage = $scope.profileimage + new Date();
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            };
        };


        $scope.save = function (exit) {
            $scope.alerts = [];
            $loading.start('key');
      

            companyService.create($scope.vm).then(function (response) {
              

                if (exit) {
                    $scope.alerts.push({ type: 'success', msg: 'The company was created! Please wait while we redirect back to the index page.' });
                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The company was created!' });

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


        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/company/grid');
            }, 1000);
        };

    }



    angular.module("raap").controller('companyEditController', companyEditController);
    companyEditController.$inject = ['$scope', '$location', '$timeout', 'companyService', '$sce', '$loading', '$stateParams', 'Upload', 'ngAuthSettings', 'authService'];
    function companyEditController($scope, $location, $timeout, companyService, $sce, $loading, $stateParams, Upload, ngAuthSettings, authService) {

        $scope.createMode = false;
        $scope.profileimage = ngAuthSettings.apiServiceBaseUri + "api/company/image?companyId=" + $stateParams.id + "&rnd=" + new Date();
        $scope.authentication = authService.authentication;
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            companyId: $stateParams.id,
            name: ""
        };
        $scope.exit = function () {
            $location.path('/app/user/company');
        };
        $scope.uploadFile = function (file, errFiles) {
            $scope.f = file;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: ngAuthSettings.apiServiceBaseUri + "api/company/profileimage?companyId=" + $scope.vm.companyId,
                    data: { file: file }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        $scope.profileimage = $scope.profileimage + new Date();
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            };
        };

        $scope.exit = function () {
            if ($scope.editForm.$pristine) {
                    window.history.back();
            }
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

        $scope.save = function (exit) {
         
            $scope.alerts = [];
            $loading.start('key');
       

            companyService.update($scope.vm).then(function (response) {
               

                if (exit) {
                    $scope.alerts.push({ type: 'success', msg: 'The company was updated! Please wait while we redirect back to the index page.' });
                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The company was updated!' });

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


        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/company/grid');
            }, 1000);
        };

        $scope.loadData = function () {
            $scope.message = "";
            $scope.savedSuccessfully = false;
            $loading.start('key');

            companyService.getSingle($scope.vm.companyId).then(
                function (result) {
                    $scope.vm = result.data;
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


        $scope.loadData();

    }





    angular.module("raap").controller('companyViewController', companyViewController);
    companyViewController.$inject = ['$scope', '$location', '$timeout', 'assetService', 'companyService', 'assetSubCategoryService', 'threatService', '$sce', '$loading', '$stateParams', '$uibModal'];
    function companyViewController($scope, $location, $timeout, assetService, companyService, assetSubCategoryService, threatService, $sce, $loading, $stateParams, $uibModal) {

        $scope.message = '';

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            companyId: $stateParams.id,
            company: null,
        };

        $scope.loadData = function () {
            $scope.message = '';
            $loading.start('key');

            companyService.getSingle($scope.vm.companyId).then(
               function (result) {
                   $scope.vm.company = result.data;
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

        $scope.create = function () {
            $location.path('/app/process/create');
        };



        $scope.loadData();

    }




})();

