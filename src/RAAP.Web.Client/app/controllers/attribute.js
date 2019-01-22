(function () {
    "use strict";

    angular.module("raap").controller('selectOriginOfThreatController', selectOriginOfThreatController);
    selectOriginOfThreatController.$inject = ['$scope', 'attributeService', '$loading', 'causes', '$mdDialog'];
    function selectOriginOfThreatController($scope, attributeService, $loading, causes, $mdDialog) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            pageSize: 500,
            page: 1,
            orderByKey: 'name',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            },
            addedCauses: causes
        };


        $scope.addCause = function (cause) {
            // add to local
            $scope.vm.addedCauses.push(cause);
            // reload data
            $scope.loadData();
        };

        $scope.addedCauseIds = function () {
            var result = [];
            for (var i = 0; i < $scope.vm.addedCauses.length; i++) {
                result.push($scope.vm.addedCauses[i].attributeId);
            }
            return result;
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');


            attributeService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, 'OriginOfThreat', $scope.addedCauseIds()).then(
                function (result) {
                    $scope.vm.dataset.items = result.data.items;
                    $scope.vm.dataset.totalPages = result.data.totalPages;
                    $scope.vm.dataset.totalItems = result.data.totalItems;

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

        $scope.ok = function () {

            $mdDialog.hide();
        };

        $scope.loadData();
    }



    angular.module("raap").controller('attributeController', attributeController);
    attributeController.$inject = ['$scope', '$location', '$timeout', 'attributeCategoryService', 'attributeService', '$loading', '$state', 'authService'];
    function attributeController($scope, $location, $timeout, attributeCategoryService, attributeService, $loading, $state, authService) {
        $scope.authentication = authService.authentication;
        $scope.attributeTypeId = $state.current.data.attributeTypeId;
        $scope.nameprefix = $state.current.data.nameprefix;
        $scope.urlprefix = $state.current.data.urlprefix;
        $scope.idfield = "attributeId";


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
          
            attributeService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $scope.attributeTypeId).then(
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
            return attributeService.search(val, $scope.attributeTypeId).then(function (response) {
                return response.data;
            });
        };

        $scope.loadData();

    }


    angular.module("raap").controller('attributeCreateController', attributeCreateController);
    attributeCreateController.$inject = ['$scope', '$mdDialog', '$location', '$timeout', 'attributeCategoryService', 'attributeService', '$sce', '$loading', '$state'];
    function attributeCreateController($scope,$mdDialog, $location, $timeout, attributeCategoryService, attributeService, $sce, $loading, $state) {
        $scope.createMode = true;
        $scope.editMode = false;
        $scope.attributeTypeId = $state.current.data.attributeTypeId;
        $scope.nameprefix = $state.current.data.nameprefix;
        $scope.urlprefix = $state.current.data.urlprefix;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.savedSuccessfully = false;

        $scope.categories = [];
        $scope.vm = {
            name: "",
            description: "",
            comment: "",
            attributeTypeId: null,
            attributeCategoryId: null,
            timeframe: { 
                months: 4095,
                days: 127,
                hours: 7
            },
            source: 3,
            childAttributes: []
        };
        

        $scope.selectOriginOfThreat = function () {

            $mdDialog.show({
                controller: 'selectOriginOfThreatController',
                templateUrl: 'app/views/common_attributes/select-originofthreat.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    causes: function () {
                        return $scope.vm.childAttributes;
                    }
                }
            })
                .then(function (result) {
                  
                }, function () {
                    // cancel
                });

        };
        $scope.removeChildAttribute = function (cause) {
            for (var i = 0; i < $scope.vm.childAttributes.length; i++) {
                if ($scope.vm.childAttributes[i] == cause)
                    $scope.vm.childAttributes.splice(i, 1);
            }
         
        };


        $scope.hasMonth = function (value) {
            return (($scope.vm.timeframe.months & value));
        };

        $scope.updateMonthEnum = function (value) {
           
            if ($scope.hasMonth(value))
            {
                // we already has this enum
                $scope.vm.timeframe.months &= ~value;
            }
            else {
                // add
                $scope.vm.timeframe.months = $scope.vm.timeframe.months | value;
            }

        }

        $scope.hasDay = function (value) {
            return (($scope.vm.timeframe.days & value));
        };

        $scope.updateDayEnum = function (value) {

            if ($scope.hasDay(value)) {
                // we already has this enum
                $scope.vm.timeframe.days &= ~value;
            }
            else {
                // add
                $scope.vm.timeframe.days = $scope.vm.timeframe.days | value;
            }

        }
        $scope.hasTime = function (value) {
            return (($scope.vm.timeframe.hours & value));
        };

        $scope.updateTimeEnum = function (value) {

            if ($scope.hasTime(value)) {
                // we already has this enum
                $scope.vm.timeframe.hours &= ~value;
            }
            else {
                // add
                $scope.vm.timeframe.hours = $scope.vm.timeframe.hours | value;
            }
        }


        $scope.save = function (redirect) {

            $loading.start('key');
            $scope.savedSuccessfully = false;

            $scope.vm.attributeTypeId = $scope.attributeTypeId;

            attributeService.create($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
              
                    $scope.alerts.push({ type: 'success', msg: 'The ' + $scope.nameprefix + ' was saved! Please wait while we redirect back to the index page.' });

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

        $scope.exit = function () {

            if ($scope.attributeForm.$pristine)
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


        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');
            console.log("yarr");
            attributeCategoryService.getAll(1000, 1, 'Title',false, $scope.attributeTypeId).then(
                function (result) {

                    $scope.categories = result.data.items;
                    if (result.data.items != null) {
                        $scope.vm.attributeCategoryId = result.data.items[0].attributeCategoryId;
                    }
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
                $location.path('/app/' + $scope.urlprefix + '/grid');
            }, 1000);
        }
        $scope.loadData();
    }




    angular.module("raap").controller('attributeEditController', attributeEditController);
    attributeEditController.$inject = ['$mdDialog','$stateParams', '$scope', '$location', '$timeout', 'attributeCategoryService', 'attributeService', '$sce', '$loading', '$state'];
    function attributeEditController($mdDialog, $stateParams, $scope, $location, $timeout, attributeCategoryService, attributeService, $sce, $loading, $state) {

        $scope.editMode = true;
        $scope.attributeTypeId = $state.current.data.attributeTypeId;
        $scope.nameprefix = $state.current.data.nameprefix;
        $scope.urlprefix = $state.current.data.urlprefix;

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.savedSuccessfully = false;

        $scope.categories = [];
        $scope.vm = {
            attributeId: $stateParams.id,
            name: "",
            description: "",
            comment: "",
            attributeTypeId: null,
            attributeCategoryId: null,
            timeframe: {
                months: null,
                days: null,
                hours: null
            },
            childAttributes: []
        };

        $scope.hasMonth = function (value) {
            return (($scope.vm.timeframe.months & value));
        };

        $scope.updateMonthEnum = function (value) {
           
            if ($scope.hasMonth(value))
            {
                // we already has this enum
                $scope.vm.timeframe.months &= ~value;
            }
            else {
                // add
                $scope.vm.timeframe.months = $scope.vm.timeframe.months | value;
            }

        }


        $scope.selectOriginOfThreat = function () {

            $mdDialog.show({
                controller: 'selectOriginOfThreatController',
                templateUrl: 'app/views/common_attributes/select-originofthreat.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    causes: function () {
                        return $scope.vm.childAttributes;
                    }
                }
            })
                .then(function (result) {
             
                }, function () {
                    // cancel
                });

        };
        $scope.removeChildAttribute = function (cause) {
            for (var i = 0; i < $scope.vm.childAttributes.length; i++) {
                if ($scope.vm.childAttributes[i] == cause)
                    $scope.vm.childAttributes.splice(i, 1);
            }
           
        };

        $scope.hasDay = function (value) {
            return (($scope.vm.timeframe.days & value));
        };

        $scope.updateDayEnum = function (value) {

            if ($scope.hasDay(value)) {
                // we already has this enum
                $scope.vm.timeframe.days &= ~value;
            }
            else {
                // add
                $scope.vm.timeframe.days = $scope.vm.timeframe.days | value;
            }

        }
        $scope.hasTime = function (value) {
            return (($scope.vm.timeframe.hours & value));
        };

        $scope.updateTimeEnum = function (value) {

            if ($scope.hasTime(value)) {
                // we already has this enum
                $scope.vm.timeframe.hours &= ~value;
            }
            else {
                // add
                $scope.vm.timeframe.hours = $scope.vm.timeframe.hours | value;
            }

        }


        $scope.save = function (redirect) {

            $loading.start('key');
            $scope.savedSuccessfully = false;

            $scope.vm.attributeTypeId = $scope.attributeTypeId;

            attributeService.update($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.attributeForm.$setPristine();
                if (redirect) {
                    $scope.alerts.push({ type: 'success', msg: 'The ' + $scope.nameprefix + ' was updated! Please wait while we redirect back to the index page.' });

                    startTimer();
                } else {
                    $scope.alerts.push({ type: 'success', msg: 'The ' + $scope.nameprefix + ' was updated!' });
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

        $scope.exit = function () {

            if ($scope.attributeForm.$pristine)
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

        $scope.loadCategories = function () {
            $scope.alerts = [];
            $loading.start('key');
       
            attributeCategoryService.getAll(1000, 1, 'Title', false, $scope.attributeTypeId).then(
                function (result) {

                    $scope.categories = result.data.items;
                    if (result.data.items != null) {
                        $scope.vm.attributeCategoryId = result.data.items[0].attributeCategoryId;
                    }
                    $scope.loadData();
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
                $location.path('/app/' + $scope.urlprefix + '/grid');
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

                     attributeService.delete($scope.vm.attributeId).then(function (response) {
                         $loading.finish('key');
                         $scope.alerts.push({ type: 'success', msg: $scope.nameprefix + ' is deleted. Please wait while the grid is updating ...' });
                         startTimer();

                     },
                 function (response) {
                     console.log(response);
                     if (response && response.data && response.data.exceptionMessage) {
                         $scope.alerts.push({ type: 'danger', msg: response.data.exceptionMessage.replace(/\n/g, '<br/>') });
                     }
                     else {
                         $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                     }
                     $loading.finish('key');
                 });


                 }, function () { });


        };


        $scope.loadData = function () {
            $scope.message = "";
            $scope.savedSuccessfully = false;
       

            attributeService.getSingle($scope.vm.attributeId).then(
                function (result) {
                    $scope.vm = result.data;
                    if (!$scope.vm.source) {
                        $scope.vm.source = 1;
                    }
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


        $scope.loadCategories();

       
    }




})();

