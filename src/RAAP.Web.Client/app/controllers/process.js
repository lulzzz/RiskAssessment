(function () {
    "use strict";


    angular.module("raap").controller('processController', processController);
    processController.$inject = ['$scope', '$location', '$timeout', 'processService', '$uibModal', '$loading'];
    function processController($scope, $location, $timeout, processService, $uibModal, $loading) {

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
            $scope.vm.orderByKey = order.replace('-','');
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

        $scope.copyItem = function (item) {
            $scope.alerts = [];
            $loading.start('key');
            item.name += " - copy";
            item.processId = 0;
            processService.create(item).then(function (item) {
                $loading.finish('key');
                $location.path('/app/process/edit/' + item.processId);
            },
                function (response) {
                    $loading.finish('key');
                });
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');
           
            processService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
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
            $location.path('/app/process/edit/' + id);
        };

        $scope.create = function () {
            $location.path('/app/process/create');
        };


        $scope.view = function (id) {
            $location.path('/app/process/view/' + id);
        };


        $scope.search = function (val) {
            return processService.search(val).then(function (response) {
                return response.data;
            });
        };

        $scope.loadData();

    }




    angular.module("raap").controller('processCreateController', processCreateController);
    processCreateController.$inject = ['$scope', '$location', '$timeout', 'processService', 'processCategoryService', 'threatService',  '$loading', '$mdDialog'];
    function processCreateController($scope, $location, $timeout, processService, processCategoryService, threatService,  $loading, $mdDialog) {
        $scope.savedSuccessfully = false;
        $scope.createMode = true;
        $scope.vm = {
                name: "",
                enabled: false,
                description: "",
                category: {
                    processcategoryId: 0,
                    name: "",
                    description: ""
                },
                assets: [],
                responsible: "",
                evaluations: [{ evaluationId: 0, revision: 1, text: "" }]
            };
        $scope.exit = function() {
            if ($scope.editProcessForm.$pristine)
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

        $scope.categories = [];
        $scope.extendedDescription = '';
        $scope.selectAssets = function () {

            $mdDialog.show({
                controller: 'selectAssetsController',
                templateUrl: 'app/views/assets/select-assets.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    assets: function () {
                        return $scope.vm.assets;
                    },
                    assetId: function () {
                        return $scope.vm.assetId;
                    }
                }
            })
                .then(function (result) {
                    $scope.editProcessForm.$setDirty();
                }, function () {
                    // cancel
                });

        };

        $scope.removeAsset = function (asset) {
            for (var i = 0; i < $scope.vm.assets.length; i++) {
                if ($scope.vm.assets[i] == asset)
                    $scope.vm.assets.splice(i, 1);
            }
            $scope.editProcessForm.$setDirty();
        };
      

        $scope.save = function (exit) {
            $scope.alerts = [];
            $loading.start('key');
            $scope.savedSuccessfully = false;
     
            processService.create($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.editProcessForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The process was created! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The process was saved.' });
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

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            processCategoryService.getAll(100, 1, 'Name', false).then(
                function (result) {

                    $scope.categories = result.data.items;
                    $scope.vm.category = $scope.categories[0];
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

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/process/grid');
            }, 1000);
        }

        $scope.loadData();
    }



    angular.module("raap").controller('processEditController', processEditController);
    processEditController.$inject = ['$scope', '$location', '$timeout', 'processService', 'processCategoryService', 'threatService',  '$loading', '$stateParams', '$mdDialog', '$mdToast'];
    function processEditController($scope, $location, $timeout, processService, processCategoryService, threatService,  $loading, $stateParams, $mdDialog, $mdToast) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.exit = function() {
            if ($scope.editProcessForm.$pristine)
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
        };

        $scope.savedSuccessfully = false;
        $scope.createMode = false;
        $scope.vm = {
            processId: $stateParams.id,
            enabled: false,
            name: "",
            responsible: "",
            description: "",
            createdOn: Date(),
            updatedOn: Date(),
            category: {
                processcategoryId: 0,
                name: "",
                description: ""
            },
            assets: [],
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]
        };

        $scope.categories = [];

   
        
        $scope.searchLoading = false;

      
        $scope.selectAssets = function () {

            $mdDialog.show({
                controller: 'selectAssetsController',
                    templateUrl: 'app/views/assets/select-assets.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true,
                    resolve: {
                        assets: function () {
                            return $scope.vm.assets;
                        },
                        assetId: function() {
                            return $scope.vm.assetId;
                        }
                    }
                })
                .then(function(result) {
                    $scope.editProcessForm.$setDirty();
                }, function() {
                   // cancel
                });

        };

        $scope.removeAsset = function (asset) {
            for (var i = 0; i < $scope.vm.assets.length; i++) {
                if ($scope.vm.assets[i] == asset)
                    $scope.vm.assets.splice(i, 1);
            }
            $scope.editProcessForm.$setDirty();
        };

        $scope.save = function (exit) {
            $loading.start('key');
            $scope.savedSuccessfully = false;
            $scope.alerts = [];
            processService.update($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.editProcessForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The process was updated! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                          $scope.alerts.push({ type: 'success', msg: 'The process was saved.' });
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
                $location.path('/app/process/grid');
            }, 1000);
        }

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

                     processService.delete($scope.vm.processId).then(function (response) {
                         $loading.finish('key');
                         $scope.alerts.push({ type: 'success', msg: 'Process is deleted. Please wait while the grid is updating ...' });
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

        $scope.loadData = function () {
            $scope.savedSuccessfully = false;
            $loading.start('key');
            $loading.start('categories');

            processCategoryService.getAll(100, 1, 'Name', false).then(
                function(result) {

                    $scope.categories = result.data.items;
                    $loading.finish('categories');

                    processService.getSingle($scope.vm.processId).then(
                        function(result) {
                            $scope.vm = result.data;

                            for (var i = 0; i < $scope.categories.length; i++) {
                                if ($scope.categories[i].processCategoryId == $scope.vm.category.processCategoryId) {
                                    $scope.vm.category = $scope.categories[i];
                                    break;
                                }
                            }
                    

                            $loading.finish('key');
                        },
                        function(response) {

                            if (response && response.exceptionMessage) {
                                $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                            }
                            else {
                                $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                            }
                            $loading.finish('key');
                        });
                },
                function(response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('categories');
                });

        };


        $scope.loadData();

    }



    angular.module("raap").controller('processViewController', processViewController);
    processViewController.$inject = ['$scope', '$location', '$timeout', 'assetService', 'processService', 'assetSubCategoryService', 'threatService',  '$loading', '$stateParams', '$mdDialog'];
    function processViewController($scope, $location, $timeout, assetService, processService, assetSubCategoryService, threatService,  $loading, $stateParams, $mdDialog) {

       

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            processId: $stateParams.id,
            process: null,
            threats: []
        };

        $scope.pushAssetThreatsToList = function(currentAsset) {
            for (var j = 0; j < currentAsset.threats.length; j++) {
                currentAsset.threats[j].assetName = currentAsset.name;
                $scope.vm.threats.push(currentAsset.threats[j]);
                for (var k = 0; k < currentAsset.assets.length; k++) {
                    var subAsset = currentAsset.assets[k];
                    $scope.pushAssetThreatsToList(subAsset);
                }
            }
        };

        $scope.loadData = function () {
        
            $loading.start('key');

            processService.getSingle($scope.vm.processId).then(
                function (result) {
                    $scope.vm.process = result.data;
                    $scope.vm.threats = [];
                    for (var i = 0; i < $scope.vm.process.assets.length; i++) {
                        var currentAsset = $scope.vm.process.assets[i];
                        $scope.pushAssetThreatsToList(currentAsset);
                    }


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

        $scope.edit = function() {
            $location.path('/app/process/edit/' + $scope.vm.process.processId);
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

                    processService.delete($scope.vm.process.processId).then(function(response) {
                            $loading.finish('key');
                            $('#mainmenu').scope().refreshTreeView();
                            $location.path('/app/process/grid');

                        },
                        function(response) {
                            if (response && response.exceptionMessage) {
                                $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                            } else {
                                $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                            }
                            $loading.finish('key');
                        });


                }, function () {    });


        };


        $scope.loadData();

    }



})();

