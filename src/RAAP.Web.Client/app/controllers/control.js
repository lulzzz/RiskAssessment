(function() {
    "use strict";


    angular.module("raap").controller('controlController', controlController);
    controlController.$inject = ['$scope', '$location', '$timeout', 'controlService', '$loading'];

    function controlController($scope, $location, $timeout, controlService, $loading) {


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


        $scope.statusCodes = [{ name: "Not implemented", id: 1 }, { name: "Implemented", id: 2 }, { name: "Planned", id: 3 }, { name: "End of life", id: 4 }];
        $scope.mapStatusCodeToName = function(statusCodeId) {
            for (var i = 0; i < $scope.statusCodes.length; i++) {
                if ($scope.statusCodes[i].id == statusCodeId)
                    return $scope.statusCodes[i].name;
            }
            return 'Not set';
        }

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
            item.controlId = 0;
            controlService.create(item).then(function (item) {
                $loading.finish('key');
                $location.path('/app/control/edit/' + item.controlId);
            },
                function (response) {
                    $loading.finish('key');
                });
        };

        $scope.loadData = function() {
            $scope.alerts = [];
            $loading.start('key');

            controlService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
                function(result) {

                    $scope.vm.dataset.items = result.data.items;
                    $scope.vm.dataset.totalPages = result.data.totalPages;
                    $scope.vm.dataset.totalItems = result.data.totalItems;
                    $scope.vm.page = result.data.currentPage;
                    $loading.finish('key');
                },
                function(response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('key');
                });
        };

        $scope.edit = function(id) {
            $location.path('/app/control/edit/' + id);
        };

        $scope.create = function() {
            $location.path('/app/control/create');
        };

     
        $scope.search = function(val) {
            return controlService.search(val).then(function(response) {
                return response.data;
            });
        };



        $scope.loadData();

    }


    angular.module("raap").controller('controlCreateController', controlCreateController);
    controlCreateController.$inject = ['$scope', '$location', '$timeout', 'controlService', 'controlCategoryService', '$sce', '$loading', 'runningInModalChild', '$mdDialog'];

    function controlCreateController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, runningInModalChild, $mdDialog) {
        // overloading new controller (as angularjs dont support optional injector values)
        return controlCreateTreeController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, runningInModalChild, $mdDialog);
    }

    angular.module("raap").controller('controlCreateTreeController', controlCreateTreeController);
    controlCreateTreeController.$inject = ['$scope', '$location', '$timeout', 'controlService', 'controlCategoryService', '$sce', '$loading', 'runningInModalChild', '$mdDialog'];

    function controlCreateTreeController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, runningInModalChild, $mdDialog) {

        $scope.createMode = true;
        $scope.runningInModalChild = runningInModalChild;
     
        $scope.savedSuccessfully = false;

        $scope.statusCodes = [{ name: "Not implemented", id: 1 }, { name: "Implemented", id: 2 }, { name: "Planned", id: 3 }, { name: "End of life", id: 4 }];

        $scope.vm = {
            executedDate: undefined,
            enabled: false,
            validTo: undefined,
            deadline: new Date(),
            status: 0,
            type: 0,
            damage: {
                probability: 0,
                impact: 0,
                threat: 0,
                value: 0,
                vulnerability: 0
            },
            financial: {
                probability: 0,
                impact: 0,
                threat: 0,
                value: 0,
                vulnerability: 0
            },
            reputation: {
                probability: 0,
                impact: 0,
                threat: 0,
                value: 0,
                vulnerability: 0
            },
            legalObligation: false,
            investmentCost: 0,
            maintenanceCost: 0,
            name: '',
            description: '',
            responsible: '',
            prevent: false,
            detect: false,
            avoid: false,
            react: false,
            alertDate: new Date(),
            alertUserId: null,
            category: {
                controlCategoryId: 0,
                name: '',
                description: ''
            },
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]

        };
       

        $scope.exit = function () {

            if ($scope.editControlForm.$pristine) {
                if (runningInModalChild) {
                    $mdDialog.hide($scope.vm);
                } else {
                    window.history.back();
                }
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
                        if (runningInModalChild) {
                            $mdDialog.hide($scope.vm);
                        } else {
                            window.history.back();
                        }
                    });
            }
        }

        $scope.save = function(exit) {
          
            $loading.start('key');
            $scope.savedSuccessfully = false;

            $scope.alerts = [];
            if (runningInModalChild) {
                // this controller/view is called from modal - dont save to db

                $mdDialog.hide($scope.vm);
                return;
            }

      
            controlService.create($scope.vm).then(function (response) {
                
                $scope.savedSuccessfully = true;
                    $scope.editControlForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The control was created! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The control was created.' });
                    }
                    $loading.finish('key');
                    $('#mainmenu').scope().refreshTreeView();
                },
                function(response) {
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

        $scope.loadData = function() {
            $scope.alerts = [];
            $loading.start('key');

            controlCategoryService.getAll(100, 1, 'Name', false).then(
                function(result) {

                    $scope.categories = result.data.items;
                    $scope.vm.category = $scope.categories[0];
                    $loading.finish('key');
                },
                function(response) {

                    if (response && response.exceptionMessage) {
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
                $location.path('/app/control/grid');
            }, 1000);
        };

        $scope.loadData();
    }


    angular.module("raap").controller('controlEditController', controlEditController);
    controlEditController.$inject = ['$scope', '$location', '$timeout', 'controlService', 'controlCategoryService', '$sce', '$loading', '$stateParams', '$mdDialog', 'runningInModalChild'];

    function controlEditController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, $stateParams, $mdDialog, runningInModalChild) {
        // overloading new controller (as angularjs dont support optional injector values)
        return controlEditModalController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, $stateParams, $mdDialog, runningInModalChild, null);
    }

    angular.module("raap").controller('controlEditModalController', controlEditModalController);
    controlEditModalController.$inject = ['$scope', '$location', '$timeout', 'controlService', 'controlCategoryService', '$sce', '$loading', '$stateParams', '$mdDialog', 'runningInModalChild', 'control'];

    function controlEditModalController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, $stateParams, $mdDialog, runningInModalChild, control) {

        $scope.createMode = false;

        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
       
        $scope.exit = function () {
            if ($scope.editControlForm.$pristine) {
                if (runningInModalChild) {
                    $mdDialog.hide($scope.vm);
                } else {
                    window.history.back();
                }
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
                      if (runningInModalChild) {
                          $mdDialog.hide($scope.vm);
                      } else {
                          window.history.back();
                      }
                  });

              
            }
        }

       
        $scope.savedSuccessfully = false;
        $scope.runningInModalChild = runningInModalChild;
        $scope.statusCodes = [{ name: "Not implemented", id: 1 }, { name: "Implemented", id: 2 }, { name: "Planned", id: 3 }, { name: "End of life", id: 4 }];

        $scope.vm = {
            controlId: $stateParams.id,
            enabled: false,
            executedDate: undefined,
            validTo: undefined,
            deadline: undefined,
            status: 0,
            type: 0,
            damage: {
                probability: 0,
                impact: 0,
                threat: 0,
                value: 0,
                vulnerability: 0
            },
            financial: {
                probability: 0,
                impact: 0,
                threat: 0,
                value: 0,
                vulnerability: 0
            },
            reputation: {
                probability: 0,
                impact: 0,
                threat: 0,
                value: 0,
                vulnerability: 0
            },
            legalObligation: false,
            investmentCost: 0,
            maintenanceCost: 0,
            name: '',
            description: '',
            responsible: '',
            category: {
                controlCategoryId: 0,
                name: '',
                description: ''
            },
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]

        };
       

        $scope.save = function(exit) {
            $scope.alerts = [];
            if (runningInModalChild) {
                // this controller/view is called from modal - dont save to db
                $mdDialog.hide($scope.vm);
                return;
            }

            $scope.message = '';
            $loading.start('key');
            $scope.savedSuccessfully = false;


            controlService.update($scope.vm).then(function(response) {
                $scope.savedSuccessfully = true;
                $scope.editControlForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The control was updated! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The control was saved.' });
                    }
                    $loading.finish('key');
                    $('#mainmenu').scope().refreshTreeView();
                },
                function(response) {
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

                controlService.delete($scope.vm.controlId).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'Control is deleted. Please wait while the grid is updating ...' });
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


        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/control/grid');
            }, 1000);
        }

        $scope.loadData = function() {
          
            $scope.savedSuccessfully = false;
            $loading.start('key');
            $loading.start('categories');

            controlCategoryService.getAll(100, 1, 'Name', false).then(
                function(result) {

                    $scope.categories = result.data.items;
                    $loading.finish('categories');


                    if (runningInModalChild) {
                        $scope.vm = control;

                        for (var i = 0; i < $scope.categories.length; i++) {
                            if ($scope.categories[i].controlCategoryId == $scope.vm.category.controlCategoryId) {
                                $scope.vm.category = $scope.categories[i];
                                break;
                            }
                        }

                        $loading.finish('key');
                    } else {
                        controlService.getSingle($scope.vm.controlId).then(
                            function(result) {
                                $scope.vm = result.data;

                                for (var i = 0; i < $scope.categories.length; i++) {
                                    if ($scope.categories[i].controlCategoryId == $scope.vm.category.controlCategoryId) {
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
                    }


                },
                function(response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    }
                    else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('categories');
                });

        };

        $scope.loadData();
    }


    angular.module("raap").controller('controlViewController', controlViewController);
    controlViewController.$inject = ['$scope', '$location', '$timeout', 'controlService', '$sce', '$loading', '$stateParams', 'assetService', '$uibModal'];

    function controlViewController($scope, $location, $timeout, controlService, $sce, $loading, $stateParams, assetService, $uibModal) {

        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.message = '';

        $scope.vm = {
            controlId: $stateParams.controlid,
            assetId: $stateParams.assetid,
            threatId: $stateParams.threatid,
            control: null,
            threat: null,
            asset: null
        };


        $scope.loadData = function() {
            $scope.message = '';
            $loading.start('key');

            assetService.getSingle($scope.vm.assetId).then(
                function(result) {
                    $scope.vm.asset = result.data;
                    $scope.setCurrentThreat();
                    $scope.setCurrentControl();

                    $loading.finish('key');
                },
                function(response) {

                    if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }

                    $loading.finish('key');
                });
        };

        $scope.setCurrentThreat = function() {

            if (!$scope.vm.asset || !$scope.vm.asset.threats || $scope.vm.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            for (var i = 0; i < $scope.vm.asset.threats.length; i++) {
                var currentThreat = $scope.vm.asset.threats[i];
                if (currentThreat.threatId == $scope.vm.threatId) {
                    $scope.vm.threat = currentThreat;
                    break;
                }
            }

            if (!$scope.vm.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.setCurrentControl = function() {

            for (var i = 0; i < $scope.vm.threat.controls.length; i++) {
                var currentControl = $scope.vm.threat.controls[i];
                if (currentControl.controlId == $scope.vm.controlId) {
                    $scope.vm.control = currentControl;
                    break;
                }
            }

        };

        $scope.removeCurrentControl = function() {
            if (!$scope.vm.asset || !$scope.vm.asset.threats || $scope.vm.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            var position = -1;
            for (var i = 0; i < $scope.vm.asset.threats.length; i++) {
                var currentThreat = $scope.vm.asset.threats[i];
                if (currentThreat.threatId == $scope.vm.threatId) {

                    // find control
                    for (var c = 0; c < currentThreat.controls.length; c++) {
                        var currentControl = currentThreat.controls[c];
                        if (currentControl.controlId == $scope.vm.controlId) {
                            position = c;
                        }
                    }
                    if (position >= 0) {
                        currentThreat.controls.splice(position, 1);
                    }


                    break;
                }
            }


            if (!$scope.vm.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.delete = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/controls/delete.html',
                controller: 'deleteController',
                windowClass: 'app-modal-window'
            });

            modalInstance.result.then(function(result) {
                $loading.start('key');

                // remove threat from asset 
                $scope.removeCurrentControl();

                assetService.update($scope.vm.asset).then(function(response) {
                        $loading.finish('key');
                        $('#mainmenu').scope().refreshTreeView();
                        $location.path('/app/control/grid');
                    },
                    function(response) {
                        if (response && response.exceptionMessage) {
                            $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                        } else {
                            $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                        }
                        $loading.finish('key');
                    });


            }, function() {
                // cancel
            });

        };


        $scope.edit = function() {
            $location.path('/app/control/edittree/' + $scope.vm.assetId + '/' + $scope.vm.threatId + '/' + $scope.vm.controlId);
        };

        $scope.loadData();
    }


    angular.module("raap").controller('controlTreeEditController', controlTreeEditController);
    controlTreeEditController.$inject = ['$scope', '$location', '$timeout', 'controlService', 'controlCategoryService', '$sce', '$loading', '$stateParams', '$uibModal', 'assetService'];

    function controlTreeEditController($scope, $location, $timeout, controlService, controlCategoryService, $sce, $loading, $stateParams, $uibModal, assetService) {

        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.exit = function() {
            if ($scope.editControlForm.$pristine) {
                window.history.back();
            } else {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/shared/unsaved.html',
                    controller: 'okCancelController',
                    windowClass: 'app-modal-window'
                });

                modalInstance.result.then(function(result) {
                        $scope.save(true);
                    },
                    function(result) {
                        window.history.back();
                    });
            }
        }

        $scope.message = '';
        $scope.savedSuccessfully = false;

        $scope.statusCodes = [{ name: "Not implemented", id: 1 }, { name: "Implemented", id: 2 }, { name: "Planned", id: 3 }, { name: "End of life", id: 4 }];

        $scope.vm = {
            controlId: -1,
            enabled: false,
            executedDate: undefined,
            validTo: undefined,
            deadline: undefined,
            status: 0,
            type: 0,
            damage: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1,
            },
            financial: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1,
            },
            reputation: {
                probability: 1,
                impact: 1,
                threat: 1,
                value: 1,
                vulnerability: 1,
            },
            legalObligation: false,
            investmentCost: 0,
            maintenanceCost: 0,
            name: '',
            description: '',
            responsible: '',
            category: {
                controlCategoryId: 0,
                name: '',
                description: ''
            },
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }]

        };
        $scope.iscalopen = [false, false, false];
        $scope.vm2 = {
            controlId: $stateParams.controlid,
            assetId: $stateParams.assetid,
            threatId: $stateParams.threatid,
            control: null,
            threat: null,
            asset: null
        };


        $scope.open = function($event, calendar) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.iscalopen[calendar] = true;
        };

        $scope.save = function(exit) {
            $scope.message = '';
            $loading.start('key');
            $scope.savedSuccessfully = false;

            $scope.updateCurrentControl();

            assetService.update($scope.vm2.asset).then(function(response) {
                $scope.savedSuccessfully = true;
                $scope.editControlForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.message = $sce.trustAsHtml("The threat was updated! Please wait while we redirect back to the view page.");
                        startTimer();
                    } else {
                        $scope.message = $sce.trustAsHtml("The control was saved.");
                    }
                    $loading.finish('key');
                    $('#mainmenu').scope().refreshTreeView();
                },
                function(response) {
                    if (response && response.modelState) {
                        var errors = [];
                        for (var key in response.modelState) {
                            for (var i = 0; i < response.modelState[key].length; i++) {
                                errors.push(response.modelState[key][i]);
                            }
                        }
                        $scope.message = $sce.trustAsHtml("Please correct the following: <ul><li>" + errors.join('</li><li>') + "</li></ul>");
                    } else if (response && response.exceptionMessage) {
                        $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                    } else {
                        $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
                    }
                    $loading.finish('key');

                });
        };


        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $location.path('/app/control/grid');
            }, 1000);
        }

        $scope.loadData = function() {
            $scope.message = '';
            $scope.savedSuccessfully = false;
            $loading.start('key');
            $loading.start('categories');

            controlCategoryService.getAll(100, 1, 'Name', false).then(
                function(result) {

                    $scope.categories = result.data.items;
                    $loading.finish('categories');


                    assetService.getSingle($scope.vm2.assetId).then(
                        function(result) {
                            $scope.vm2.asset = result.data;
                            $scope.setCurrentThreat();
                            $scope.setCurrentControl();

                            $loading.finish('key');
                        },
                        function(response) {

                            if (response && response.exceptionMessage) {
                                $scope.message = $sce.trustAsHtml("Error: " + response.exceptionMessage);
                            } else {
                                $scope.message = $sce.trustAsHtml('Unkown error - please try again!');
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

        $scope.setCurrentThreat = function() {

            if (!$scope.vm2.asset || !$scope.vm2.asset.threats || $scope.vm2.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            for (var i = 0; i < $scope.vm2.asset.threats.length; i++) {
                var currentThreat = $scope.vm2.asset.threats[i];
                if (currentThreat.threatId == $scope.vm2.threatId) {
                    $scope.vm2.threat = currentThreat;
                    break;
                }
            }

            if (!$scope.vm2.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.setCurrentControl = function() {

            for (var i = 0; i < $scope.vm2.threat.controls.length; i++) {
                var currentControl = $scope.vm2.threat.controls[i];
                if (currentControl.controlId == $scope.vm2.controlId) {
                    $scope.vm2.control = currentControl;
                    break;
                }
            }

            $scope.vm = $scope.vm2.control;

            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].controlCategoryId == $scope.vm.category.controlCategoryId) {
                    $scope.vm.category = $scope.categories[i];
                    break;
                }
            }

        };

        $scope.updateCurrentControl = function() {
            if (!$scope.vm2.asset || !$scope.vm2.asset.threats || $scope.vm2.asset.threats.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
                return;
            }

            var position = -1;
            for (var i = 0; i < $scope.vm2.asset.threats.length; i++) {
                var currentThreat = $scope.vm2.asset.threats[i];
                if (currentThreat.threatId == $scope.vm2.threatId) {

                    // find control
                    for (var c = 0; c < currentThreat.controls.length; c++) {
                        var currentControl = currentThreat.controls[c];
                        if (currentControl.controlId == $scope.vm2.controlId) {
                            position = c;
                        }
                    }
                    if (position >= 0) {
                        currentThreat.controls[position] = $scope.vm;
                    }


                    break;
                }
            }


            if (!$scope.vm2.threat) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find threat for this asset!' });
            }
        };

        $scope.loadData();
    }


})();
