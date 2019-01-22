(function () {
    "use strict";


    angular.module("raap").controller('userController', userController);
    userController.$inject = ['$scope', '$location', '$timeout', 'userService', '$uibModal', '$loading', '$mdDialog', 'authService'];
    function userController($scope, $location, $timeout, userService, $uibModal, $loading, $mdDialog, authService) {


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
            companyId: authService.authentication.userDetails.companyId,
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
         
            userService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $scope.vm.companyId, true).then(
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
            $location.path('/app/user/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/user/create/' + $scope.vm.companyId);
        };
      
      


        $scope.search = function (val) {
            return userService.search(val).then(function (response) {
                return response.data;
            });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.loadData();
            }, 1500);
        };

        $scope.$watch('vm.companyId', function () {
            $scope.loadData();
        });


        $scope.loadData();

    }




    angular.module("raap").controller('userCreateController', userCreateController);
    userCreateController.$inject = ['$scope', 'authService', '$location', '$timeout', 'userService', '$sce', '$loading', '$stateParams', '$mdDialog', 'Upload', 'ngAuthSettings'];
    function userCreateController($scope, authService, $location, $timeout, userService, $sce, $loading, $stateParams, $mdDialog, Upload, ngAuthSettings) {
        $scope.authentication = authService.authentication;
        $scope.createMode = true;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            companyId: $stateParams.id,
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            passwordRepeat: "",
            role: null,
            userId: -1
        };


        $scope.uploadFile = function (file, errFiles) {
            $scope.f = file;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: ngAuthSettings.apiServiceBaseUri + "api/user/profileimage?userId=" + $scope.vm.userId,
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
            if ($scope.editUserForm.$pristine)
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
        }


        $scope.save = function (exit) {
            $loading.start('key');
            $scope.alerts = [];
            if ($scope.vm.role) {
                $scope.vm.roles = [$scope.vm.role];
            } else {
                $scope.vm.roles = [];
            }

            userService.create($scope.vm).then(function (response) {
         
                if (exit) {
                    $scope.alerts.push({ type: 'success', msg: 'The user was created! Please wait while we redirect back to the index page.' });
                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The user was created!' });

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
                $location.path('/app/user/grid');
            }, 1000);
        };

    }



    angular.module("raap").controller('userEditController', userEditController);
    userEditController.$inject = ['$scope', 'authService', '$location', '$timeout', 'userService', '$sce', '$loading', '$stateParams', '$mdDialog', 'Upload', 'ngAuthSettings'];
    function userEditController($scope, authService, $location, $timeout, userService, $sce, $loading, $stateParams, $mdDialog, Upload, ngAuthSettings) {
        $scope.authentication = authService.authentication;

        $scope.createMode = false;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.profileimage = ngAuthSettings.apiServiceBaseUri + "api/user/image?userId=" + $stateParams.id + "&rnd=" + new Date();
        $scope.vm = {
            userId: $stateParams.id,
            role: null
           
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

                userService.delete($scope.vm.userId).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'User is deleted. Please wait while the grid is updating ...' });
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

        $scope.uploadFile = function (file, errFiles) {
            $scope.f = file;

            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: ngAuthSettings.apiServiceBaseUri + "api/user/profileimage?userId=" + $scope.vm.userId,
                    data: { file: file}
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

        $scope.exit = function() {
            if ($scope.editUserForm.$pristine)
                window.history.back();
            else {

                $mdDialog.show({
                        controller: 'okCancelController',
                        templateUrl: 'app/views/shared/unsaved.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: true
                    })
                    .then(function(answer) {
                        $scope.save(true);
                    }, function() {
                        window.history.back();

                    });

            }
        }


        $scope.save = function (exit) {
            $scope.alerts = [];
                $loading.start('key');
 

                if ($scope.vm.role) {
                    $scope.vm.roles = [$scope.vm.role];
                } else {
                    $scope.vm.roles = [];
                }
                

                userService.update($scope.vm).then(function (response) {
              

                    if (exit) {
                        $scope.alerts.push({ type: 'success', msg: 'The user was updated! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The user was updated!' });
               
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

            $scope.updatePassword = function () {
          
                $loading.start('key');

                userService.setPassword($scope.vm).then(function (response) {

                    $scope.alerts.push({ type: 'success', msg: 'Password was changed sucessfully' });

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
                    $location.path('/app/user/grid');
                }, 1000);
            };

            $scope.loadData = function () {
                $loading.start('key');

                userService.getSingle($scope.vm.userId).then(
                    function (result) {
                        $scope.vm = result.data;
                        if (result.data.roles.length > 0) {
                            $scope.vm.role = result.data.roles[0];
                        } else {
                            $scope.vm.role = null;
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


            $scope.loadData();

        }




        angular.module("raap").controller('userMyPageController', userMyPageController);
        userMyPageController.$inject = ['$scope', '$location', '$timeout', 'userService', '$loading', 'authService'];
        function userMyPageController($scope, $location, $timeout, userService, $loading, authService) {

            $scope.alerts = [];
            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };
      
            $scope.savedSuccessfully = false;

            $scope.vm = {
                userId: authService.authentication.userDetails.userId,
            };

            $scope.updatePassword = function () {
                $scope.alerts = [];
                $loading.start('key');
                $scope.savedSuccessfully = false;

                userService.updatePassword($scope.vm).then(function (response) {
                    $scope.savedSuccessfully = true;
                    $scope.message = "Changed password successfully";

                    $scope.vm.password = "";
                    $scope.vm.newPassword = "";
                    $scope.vm.newPasswordRepeat = "";

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


            $scope.loadData = function () {
          
                $scope.savedSuccessfully = false;
                $loading.start('key');

                userService.getSingle($scope.vm.userId).then(
                    function (result) {
                        $scope.vm = result.data;
                        $loading.finish('key');
                    },
                    function (response) {

                        if (response && response.exceptionMessage) {
                            $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                        } else {
                            $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                        }

                        $loading.finish('key');
                    });
            };


            $scope.loadData();

        }





    })();

