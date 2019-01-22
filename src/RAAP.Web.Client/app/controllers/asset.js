(function () {
    "use strict";


    angular.module("raap").controller('assetController', assetController);
    assetController.$inject = ['$scope', '$location', '$timeout', 'assetService', '$loading', '$stateParams'];
    function assetController($scope, $location, $timeout, assetService, $loading, $stateParams) {

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


        $scope.categories = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
        $scope.mapCategoryToName = function (categoryId)
                {
                    for (var i = 0; i < $scope.categories.length; i++) {
                        if ($scope.categories[i].id == categoryId)
                            return $scope.categories[i].name;
                    }
                    return 'Default';
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

        $scope.copyItem = function (asset) {
            $scope.alerts = [];
            $loading.start('key');
            asset.name += " - copy";
            asset.assetId = 0;
            assetService.create(asset).then(function (asset) {
                        $loading.finish('key');
                        $location.path('/app/asset/edit/' + asset.assetId);
                },
                function (response) {
                    $loading.finish('key');
                });
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            assetService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $stateParams.categoryId, null).then(
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
            $location.path('/app/asset/edit/' + id);
        };
        
        $scope.view = function (id) {
            $location.path('/app/asset/view/' + id);
        };
        
        $scope.create = function () {
            if ($stateParams.categoryId) {
                $location.path('/app/asset/create/' + $stateParams.categoryId);
            } else {
                $location.path('/app/asset/create/');
            }
        };

        $scope.search = function (val) {
            return assetService.search(val).then(function (response) {
                return response.data;
            });
        };


        $scope.loadData();

    }

    angular.module("raap").controller('selectVulnerabilitiesController', selectVulnerabilitiesController);
    selectVulnerabilitiesController.$inject = ['$scope', 'vulnerabilitiesService', '$loading', 'vulnerabilities', '$mdDialog'];
    function selectVulnerabilitiesController($scope, vulnerabilitiesService, $loading, vulnerabilities, $mdDialog) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            pageSize: 50,
            page: 1,
            orderByKey: 'name',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            },
            addedVulnerabilities: vulnerabilities
        };

        //$scope.createVulnerability = function () {

        //    $mdDialog.show({
        //        controller: 'vulnerabilityCreateTreeController',
        //        templateUrl: 'app/views/threats/save.html',
        //        parent: angular.element(document.body),
        //        clickOutsideToClose: true,
        //        fullscreen: true,
        //        resolve: {
        //            runningInModalChild: function () {
        //                return true;
        //            }
        //        }
        //    })
        //        .then(function (result) {
        //            $scope.addThreat(result);
        //        }, function () {
        //            // cancel
        //        });

        //};


        $scope.addVulnerability = function (vulnerability) {
            // add to local
            $scope.vm.addedVulnerabilities.push(vulnerability);
            // reload data
            $scope.loadData();
        };

        $scope.addedVulnerabilityIds = function () {
            var result = [];
            for (var i = 0; i < $scope.vm.addedVulnerabilities.length; i++) {
                result.push($scope.vm.addedVulnerabilities[i].vulnerabilityId);
            }
            return result;
        };

        $scope.loadData = function () {
            $scope.alerts = [];
            $loading.start('key');

            threatService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $scope.addedThreatIds()).then(
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
            $mdDialog.hide($scope.vm.addedThreats);
        };

        $scope.loadData();
    }


    angular.module("raap").controller('selectThreatsController', selectThreatsController);
    selectThreatsController.$inject = ['$scope', 'threatService', '$loading', 'threats', '$mdDialog'];
    function selectThreatsController($scope, threatService, $loading, threats, $mdDialog) {

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            pageSize: 50,
            page: 1,
            orderByKey: 'name',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            },
            addedThreats: threats
        };

        $scope.createThreat = function () {

            $mdDialog.show({
                controller: 'threatCreateTreeController',
                templateUrl: 'app/views/threats/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    }
                }
            })
                .then(function (result) {
                    $scope.addThreat(result);
                }, function () {
                    // cancel
                });

        };

   
        $scope.addThreat = function(threat) {
            // add to local
            $scope.vm.addedThreats.push(threat);
            // reload data
            $scope.loadData();
        };

        $scope.addedThreatIds = function() {
            var result = [];
            for (var i = 0; i < $scope.vm.addedThreats.length; i++) {
                result.push($scope.vm.addedThreats[i].threatId);
            }
            return result;
        };

        $scope.loadData = function() {
            $scope.alerts = [];
            $loading.start('key');

            threatService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, $scope.addedThreatIds()).then(
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
            $mdDialog.hide($scope.vm.addedThreats);
        };

        $scope.loadData();
    }


    angular.module("raap").controller('selectAssetsController', selectAssetsController);
    selectAssetsController.$inject = ['$scope', 'assetService', '$loading', 'assets', 'assetId', '$mdDialog'];
    function selectAssetsController($scope, assetService, $loading, assets, assetId, $mdDialog) {

        $scope.createMode = true;

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


        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            pageSize: 50,
            page: 1,
            orderByKey: 'name',
            isDesc: false,
            dataset: {
                items: [],
                totalPages: 0,
                totalItems: 0
            },
            addedAssets: assets
        };

        $scope.createAsset = function () {

            $mdDialog.show({
                controller: 'assetCreateTreeController',
                templateUrl: 'app/views/assets/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    }
                }
            })
           .then(function (result) {
               if (result) {
                   $scope.addAsset(result);
               }
               
           }, function () {
               // cancel
           });


        };

        $scope.addAsset = function(asset) {
            // add to local
            $scope.vm.addedAssets.push(asset);
            // reload data
            $scope.loadData();
        };

        $scope.addedAssetIds = function () {
            var result = [];
            for (var i = 0; i < $scope.vm.addedAssets.length; i++) {
                result.push($scope.vm.addedAssets[i].assetId);
            }
            if (assetId != null) {
                result.push(assetId);
            }
            return result;
        };

        $scope.loadData = function() {
            $scope.alerts = [];
            $loading.start('key');

            assetService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc, null, $scope.addedAssetIds()).then(
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

    angular.module("raap").filter('assetTypeFilter', assetTypeFilter);
    assetTypeFilter.$inject = ['$filter'];
    function assetTypeFilter($filter) {
        return function (items, search) {
            if (!search) {
                return items;
            }

            return items.filter(function (element, index, array) {

                var textVersion = $filter('assetCategory')(element.category);
                if (textVersion.toLowerCase().indexOf(search) >= 0) {
                    return element;
                }
            });

        };
    }

    angular.module("raap").controller('assetCreateController', assetCreateController);
    assetCreateController.$inject = ['$scope', '$location', '$timeout', 'assetService', 'assetSubCategoryService', 'criticalityCategoryService', 'threatService', '$sce', '$loading', '$mdDialog', 'runningInModalChild', '$uibModal', '$stateParams'];
    function assetCreateController($scope, $location, $timeout, assetService, assetSubCategoryService, criticalityCategoryService, threatService, $sce, $loading, $mdDialog, runningInModalChild, $uibModal, $stateParams) {
        return assetCreateTreeController($scope, $location, $timeout, assetService, assetSubCategoryService, criticalityCategoryService, threatService, $sce, $loading, $mdDialog, runningInModalChild, $uibModal, $stateParams);
    }

    angular.module("raap").controller('assetCreateTreeController', assetCreateTreeController);
    assetCreateTreeController.$inject = ['$scope', '$location', '$timeout', 'assetService', 'assetSubCategoryService', 'criticalityCategoryService', 'threatService', '$sce', '$loading', '$mdDialog', 'runningInModalChild', '$uibModal', '$stateParams'];
    function assetCreateTreeController($scope, $location, $timeout, assetService, assetSubCategoryService, criticalityCategoryService, threatService, $sce, $loading, $mdDialog, runningInModalChild, $uibModal, $stateParams) {
        $scope.Math = window.Math;
        $scope.createMode = true;

        // added after layout convert
        $scope.calculatedValue1 = 0;
        $scope.calculatedValue2 = 0;
        $scope.$watchGroup(['vm.dataRecoveryTime', 'vm.integrityCheckTime', 'vm.systemRecoveryTime'], function () {
            $scope.calculatedValue1 = $scope.vm.dataRecoveryTime + $scope.vm.integrityCheckTime + $scope.vm.systemRecoveryTime;
        });
        $scope.$watchGroup(['vm.integrityCheckCost', 'vm.dataRecoveryCost', 'vm.systemRecoveryCost'], function () {
            $scope.calculatedValue2 = $scope.vm.integrityCheckCost + $scope.vm.dataRecoveryCost + $scope.vm.systemRecoveryCost;
        });

        $scope.exit = function () {
            if ($scope.editAssetForm.$pristine) {
                if (runningInModalChild) {
                    $mdDialog.cancel();
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
                            $mdDialog.cancel();
                        } else {
                            window.history.back();
                        }
                    });


            }
        };



      
        Number.prototype.minutesToDDHHmm = function() {
            var minNum = this;
            var days = Math.floor(minNum / 1440);
            minNum -= days * 1440;
            var hours = Math.floor(minNum / 60);
            minNum -= hours * 60;
            var minutes = minNum;

            if (days < 10) { days = "0" + days; }
            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            var time = days + ':' + hours + ':' + minutes;
            return time;
        };

       
        $scope.savedSuccessfully = false;

        $scope.categories = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
        $scope.mapCategoryToName = function (categoryId) {
            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].id == categoryId)
                    return $scope.categories[i].name;
            }
            return 'Default';
        }


        $scope.vm = {
            systemRecoveryTime: 0,
            enabled: false,
            dataRecoveryTime: 0,
            integrityCheckTime: 0,
            maxDownTime: 0,
            confidenciality: 3,
            integrity: 3,
            availability: 3,
            authenticity: 3,
            requiresBusinessContinuityPlan: false,
            systemRecoveryCost: 0,
            dataRecoveryCost: 0,
            integrityCheckCost: 0,
            maxDownCost: 0,
            name: '',
            description: '',
            aggregatedStatus: '',
            category: 1,
            subCategory: {
                assetSubCategoryId: 0,
                name: '',
                description: ''
            },
            evaluations: [],
            businessContinuityPlans: [],
            threats: [],
            assets: [],
            vulnerabilities: [],
            timeCosts: [
                { time: 10, cost: 0 },
                { time: 30, cost: 0 },
                { time: 60, cost: 0 },
                { time: 720, cost: 0 },
                { time: 1440, cost: 0 }
            ],
            criticalityCategory: {
                criticalityCategoryId: 0,
                name: '',
                description: '',
            }
        };

        if ($stateParams.categoryId) {
            $scope.vm.category = $stateParams.categoryId;
        }

        $scope.criticalityCategories = [];

        $scope.subCategories = [];

        $scope.selectVulnerabilities = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/shared/select-vulnerabilities.html',
                controller: 'selectVulnerabilitiesController',
                windowClass: 'app-modal-window',
                resolve: {
                    vulnerabilities: function () {
                        return $scope.vm.vulnerabilities;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                // $scope.vm.threats = result;
                $scope.editAssetForm.$setDirty();
            }, function () {
                // cancel
            });
        };

        $scope.removeVulnerability = function(item) {
            for (var i = 0; i < $scope.vm.vulnerabilities.length; i++) {
                if ($scope.vm.vulnerabilities[i] === item)
                    $scope.vm.vulnerabilities.splice(i, 1);
            }
            $scope.editAssetForm.$setDirty();
        };

        $scope.editVulnerability = function(item) {

        };

        $scope.selectThreats = function () {


            $mdDialog.show({
                controller: 'selectThreatsController',
                templateUrl: 'app/views/assets/select-threats.html',
                parent: angular.element(document.body),
                resolve: {
                    threats: function () {
                        return $scope.vm.threats;
                    }
                },
                clickOutsideToClose: true,
                bindToController: true,
                fullscreen: true
            })
       .then(function (result) {

       }, function () {
       });


     
        };

        $scope.editThreat = function (threatToEdit) {

            $mdDialog.show({
                controller: 'threatEditModalController',
                templateUrl: 'app/views/threats/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    },
                    threat: function () {
                        return threatToEdit;
                    }
                }
            })
            .then(function (result) {
            
                if (result.risk === undefined || result.risk == null) { result.risk = { damage: null, reputation: null, financial: null } }

                result.risk.damage = result.damage;
                result.risk.reputation = result.reputation;
                result.risk.financial = result.financial;
            }, function () {
                // cancel
            });


        };



        $scope.removeThreat = function(threat) {
            for (var i = 0; i < $scope.vm.threats.length; i++) {
                if ($scope.vm.threats[i] == threat)
                    $scope.vm.threats.splice(i, 1);
            }
            $scope.editAssetForm.$setDirty();
        };

        $scope.selectAssets = function () {

            $mdDialog.show({
                controller: 'selectAssetsController',
                templateUrl: 'app/views/assets/select-assets.html',
                parent: angular.element(document.body),
                resolve: {
                    assets: function () {
                        return $scope.vm.assets;
                    },
                    assetId: function () {
                        return $scope.vm.assetId;
                    }
                },
                clickOutsideToClose: true,
                bindToController: true,
                fullscreen: true
            })
                .then(function (result) {
                    $scope.editAssetForm.$setDirty();
                }, function () {
                });


        };
        $scope.editAsset = function (assetId) {


            $mdDialog.show({
                controller: 'okCancelController',
                templateUrl: 'app/views/shared/leaveasset.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                bindToController: true,
                fullscreen: true
            })
            .then(function (result) {

                // do something
                if ($scope.editAssetForm.$pristine)
                    $location.path('/app/asset/edit/' + assetId);
                else {

                    $mdDialog.show({
                        controller: 'okCancelController',
                        templateUrl: 'app/views/shared/unsaved.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        bindToController: true,
                        fullscreen: true
                    }).then(function (result) {
                        $scope.save(false);
                        $location.path('/app/asset/edit/' + assetId);
                    }, function () {
                        $location.path('/app/asset/edit/' + assetId);
                    });

                }

            });
        };

        $scope.removeAsset = function (asset) {
            for (var i = 0; i < $scope.vm.assets.length; i++) {
                if ($scope.vm.assets[i] == asset)
                    $scope.vm.assets.splice(i, 1);
            }
            $scope.editAssetForm.$setDirty();
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

            assetService.create($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.editAssetForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The asset was created! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The asset was saved.' });
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

            assetSubCategoryService.getAll(100, 1, 'Name', false).then(
                function (result) {

                    $scope.subCategories = result.data.items;
                    $scope.vm.subCategory = $scope.subCategories[0];
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
            criticalityCategoryService.getAll(100, 1, 'Name', false).then(
                function (result) {

                    $scope.criticalityCategories = result.data.items;
                    $scope.vm.criticalityCategory = $scope.criticalityCategories[0];
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
                $location.path('/app/asset/grid');
            }, 1000);
        }

        $scope.loadData();
    }



    angular.module("raap").controller('assetEditController', assetEditController);
    assetEditController.$inject = ['$scope', '$location', '$timeout', 'assetService', 'assetSubCategoryService', 'criticalityCategoryService', 'threatService', '$sce', '$loading', '$stateParams', '$mdDialog', '$rootScope', 'soachapterService'];
    function assetEditController($scope, $location, $timeout, assetService, assetSubCategoryService, criticalityCategoryService, threatService, $sce, $loading, $stateParams, $mdDialog, $rootScope, soachapterService) {

        $scope.createMode = false;

        $scope.Math = window.Math;
        Number.prototype.minutesToDDHHmm = function () {
            var minNum = this;
            var days = Math.floor(minNum / 1440);
            minNum -= days * 1440;
            var hours = Math.floor(minNum / 60);
            minNum -= hours * 60;
            var minutes = minNum;

            if (days < 10) { days = "0" + days; }
            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            var time = days + ':' + hours + ':' + minutes;
            return time;
        };

        $scope.soadata = [];

        $scope.reverseAssetRoot = [];

        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.assetSoas = [];

        $scope.exit = function () {
            if ($scope.editAssetForm.$pristine) {
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

       
        $scope.savedSuccessfully = false;

        $scope.categories = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
        $scope.mapCategoryToName = function (categoryId) {
            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].id == categoryId)
                    return $scope.categories[i].name;
            }
            return 'Default';
        }

        // added after layout convert
        $scope.calculatedValue1 = 0;
        $scope.calculatedValue2 = 0;
        $scope.$watchGroup(['vm.dataRecoveryTime', 'vm.integrityCheckTime', 'vm.systemRecoveryTime'], function () {
            $scope.calculatedValue1 = $scope.vm.dataRecoveryTime + $scope.vm.integrityCheckTime + $scope.vm.systemRecoveryTime;
        });
        $scope.$watchGroup(['vm.integrityCheckCost', 'vm.dataRecoveryCost', 'vm.systemRecoveryCost'], function () {
            $scope.calculatedValue2 = $scope.vm.integrityCheckCost + $scope.vm.dataRecoveryCost + $scope.vm.systemRecoveryCost;
        });



        $scope.vm = {
            
            assetId: $stateParams.id,
            enabled : false,
            systemRecoveryTime: 0,
            dataRecoveryTime: 0,
            integrityCheckTime: 0,
            maxDownTime: 0,
            confidenciality: 0,
            integrity: 0,
            availability: 0,
            requiresBusinessContinuityPlan: false,
            systemRecoveryCost: 0,
            dataRecoveryCost: 0,
            integrityCheckCost: 0,
            maxDownCost: 0,
            name: '',
            description: '',
            aggregatedStatus: '',
            createdOn: Date(),
            updatedOn: Date(),
            category: 1,
            subCategory: {
                assetSubCategoryId: 0,
                name: '',
                description: ''
            },
            threats: [],
            assets: [],
            evaluations: [{ evaluationId: 0, revision: 1, text: "" }],
            timeCosts: [
                { time: 10, cost: 0 },
                { time: 30, cost: 0 },
                { time: 60, cost: 0 },
                { time: 720, cost: 0 },
                { time: 1440, cost: 0 }
            ],
            criticalityCategory: {
                criticalityCategoryId: 0,
                name: '',
                description: '',
            }
        };

        $scope.subCategories = [];
        $scope.selectThreats = function () {


            $mdDialog.show({
                controller: 'selectThreatsController',
                templateUrl: 'app/views/assets/select-threats.html',
                parent: angular.element(document.body),
                resolve: {
                    threats: function () {
                        return $scope.vm.threats;
                    }
                },
                clickOutsideToClose: true,
                bindToController: true,
                fullscreen: true
            })
              .then(function (result) {
                  $scope.editAssetForm.$setDirty();
              }, function () {
              });


        };

        $scope.editThreat = function (threatToEdit) {

            $mdDialog.show({
                controller: 'threatEditModalController',
                templateUrl: 'app/views/threats/save.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                resolve: {
                    runningInModalChild: function () {
                        return true;
                    },
                    threat: function () {
                        return threatToEdit;
                    }
                }
            })
            .then(function (result) {
                $scope.editAssetForm.$setDirty();

                if (result.risk === undefined || result.risk == null) { result.risk = { damage: null, reputation: null, financial: null } }
                  
                result.risk.damage = result.damage;
                result.risk.reputation = result.reputation;
                result.risk.financial = result.financial;
            }, function () {
                // cancel
            });


        };

        $scope.removeThreat = function (threat) {
            for (var i = 0; i < $scope.vm.threats.length; i++) {
                if ($scope.vm.threats[i] == threat)
                    $scope.vm.threats.splice(i, 1);
            }
            $scope.editAssetForm.$setDirty();
        };

        $scope.selectAssets = function () {

            $mdDialog.show({
                controller: 'selectAssetsController',
                templateUrl: 'app/views/assets/select-assets.html',
                    parent: angular.element(document.body),
                    resolve: {
                        assets: function () {
                            return $scope.vm.assets;
                        },
                        assetId: function () {
                            return $scope.vm.assetId;
                        }
                    },
                    clickOutsideToClose: true,
                    bindToController: true,
                    fullscreen: true
                })
                .then(function(result) {
                    $scope.editAssetForm.$setDirty();
                    $rootScope.$broadcast('asset-changed');
                }, function() {
                });
        };
        $scope.editAsset = function (assetId) {
            $mdDialog.show({
                controller: 'okCancelController',
                templateUrl: 'app/views/shared/leaveasset.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                bindToController: true,
                fullscreen: true
            })
            .then(function (result) {

                // do something
                if ($scope.editAssetForm.$pristine)
                    $location.path('/app/asset/edit/' + assetId);
                else {

                    $mdDialog.show({
                        controller: 'okCancelController',
                        templateUrl: 'app/views/shared/unsaved.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        bindToController: true,
                        fullscreen: true
                    }).then(function (result) {
                        $scope.save(false);
                        $location.path('/app/asset/edit/' + assetId);
                    }, function () {
                        $location.path('/app/asset/edit/' + assetId);
                    });
                }
            });
        };

        $scope.removeAsset = function (asset) {
            for (var i = 0; i < $scope.vm.assets.length; i++) {
                if ($scope.vm.assets[i] == asset)
                    $scope.vm.assets.splice(i, 1);
            }
            $scope.editAssetForm.$setDirty();
            $rootScope.$broadcast('assset-changed');
        };

        $scope.save = function (exit) {
            $scope.alerts = [];
            $loading.start('key');
            $loading.start('key1');
            $scope.savedSuccessfully = false;

            soachapterService.updateAssetSoas($scope.assetSoas).then(function (response) {
                $scope.savedSuccessfully = true;
                $loading.finish('key1');
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
                    $loading.finish('key1');
                });

            assetService.update($scope.vm).then(function (response) {
                $scope.savedSuccessfully = true;
                    $scope.editAssetForm.$setPristine();
                    if (exit && exit == true) {
                        $scope.alerts.push({ type: 'success', msg: 'The asset was updated! Please wait while we redirect back to the index page.' });
                        startTimer();
                    } else {
                        $scope.alerts.push({ type: 'success', msg: 'The asset was saved.' });
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

                assetService.delete($scope.vm.assetId).then(function (response) {
                    $loading.finish('key');
                    $scope.alerts.push({ type: 'success', msg: 'Asset is deleted. Please wait while the grid is updating ...' });
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
                $location.path('/app/asset/grid');
            }, 1000);
        }

        $scope.getAssetSoas = function (soaType) {
            for (var i = 0; i < $scope.assetSoas.length; i++){
                if ($scope.assetSoas[i].soaType == soaType)
                    return $scope.assetSoas[i].assetSoas;
            };
            return [];
        };

        $scope.getSoaPercentageData = function (soaType) {
            var soas = $scope.getAssetSoas(soaType);
            var impl = 0;
            var NA = 0;
            var work = 0;
            var pastdeadline = 0;
            for (var i = 0; i < soas.length; i++) {
                if (soas[i].implemented == true)
                    impl += 1;
                else if (soas[i].deadline && soas[i].deadline > Date.now())
                    work += 1;
                else if (soas[i].deadline && soas[i].deadline <= Date.now())
                    pastdeadline += 1;
                else
                    NA += 1;
            }
            return [
                {
                    "label": "Not implemented",
                    "value": NA,
                    "color": "#00A9FF"
                },
                {
                    "label": "In progress",
                    "value": work,
                    "color": "#7e349b"
                },
                {
                    "label": "deadline passed",
                    "value": pastdeadline,
                    "color": "#f02c09"
                },
                {
                    "label": "Implemented",
                    "value": impl,
                    "color": "#2EA319"
                },
            ];
        };

        $(function () {
            var num = 4;
            $("#addData").on("click", function () {
                data.push({
                    label: num.toString(),
                    value: Math.floor(Math.random() * 10) + 1
                });

                pie.updateProp("data.content", data);
                num++;
            });
        });

        $scope.isoPie;
        $scope.helsePie;
        $scope.gdprPie;

        $scope.enableIso = false;
        $scope.enableHelse = false;
        $scope.enableGdpr = false;

        $scope.generateSoaPie = function (pieName, data) {
            return new d3pie(pieName, {
                "header": {
                    "title": {
                        "text": "Status",
                        "fontSize": 22,
                        "font": "verdana"
                    },
                    "subtitle": {
                        "text": "Number of relevant items implemented for this asset",
                        "color": "#999999",
                        "fontSize": 10,
                        "font": "verdana"
                    },
                    "titleSubtitlePadding": 12
                },
                "footer": {
                    "text": "Future implemented dates show as \"work in progress\"",
                    "color": "#999999",
                    "fontSize": 11,
                    "font": "open sans",
                    "location": "bottom-center"
                },
                "size": {
                    "canvasHeight": 350,
                    "canvasWidth": 540,
                    "pieOuterRadius": "88%"
                },
                "data": {
                    "content": data
                },
                "labels": {
                    "outer": {
                        "pieDistance": 16
                    },
                    "inner": {
                        "format": "value"
                    },
                    "mainLabel": {
                        "font": "verdana"
                    },
                    "percentage": {
                        "color": "#e1e1e1",
                        "font": "verdana",
                        "decimalPlaces": 0
                    },
                    "value": {
                        "color": "#e1e1e1",
                        "font": "verdana"
                    },
                    "lines": {
                        "enabled": true,
                        "color": "#cccccc"
                    },
                    "truncation": {
                        "enabled": true
                    }
                },
                "effects": {
                    "load": {
                        "speed": 300
                    }
                }
            });
        };

        $scope.$watch('subSelectedIndex', function (newValue, oldValue) {
            if ($scope.isoPie && $scope.helsePie) {
                if (newValue == 0) {
                    if($scope.enableIso)
                        $scope.isoPie.updateProp('data.content', $scope.getSoaPercentageData(1));
                    else if($scope.enableHelse)
                        $scope.helsePie.updateProp('data.content', $scope.getSoaPercentageData(4));
                    else if($scope.enableGdpr)
                        $scope.gdprPie.updateProp('data.content', $scope.getSoaPercentageData(5));
                }
                else if (newValue == 1) {
                    if ($scope.enableHelse)
                        $scope.helsePie.updateProp('data.content', $scope.getSoaPercentageData(4));
                    else if ($scope.enableGdpr)
                        $scope.gdprPie.updateProp('data.content', $scope.getSoaPercentageData(5));
                }
                else if (newValue == 2)
                    $scope.gdprPie.updateProp('data.content', $scope.getSoaPercentageData(5));
            }
        });

        $scope.loadData = function () {
          
            $scope.savedSuccessfully = false;
            $loading.start('key');
            $loading.start('subCategories');
            $loading.start('criticalityCategories');
            $loading.start('key1');

            assetSubCategoryService.getAll(100, 1, 'Name', false).then(
                function(result) {

                    $scope.subCategories = result.data.items;
                    $loading.finish('subCategories');

                    criticalityCategoryService.getAll(100, 1, 'Name', false).then(
                        function(result) {

                            $scope.criticalityCategories = result.data.items;
                            $scope.vm.criticalityCategory = $scope.criticalityCategories[0];
                            $loading.finish('criticalityCategories');

                            assetService.getSingle($scope.vm.assetId).then(
                                function(result) {
                                    $scope.vm = result.data;

                                    for (var i = 0; i < $scope.subCategories.length; i++) {
                                        if ($scope.subCategories[i].assetSubCategoryId == $scope.vm.subCategory.assetSubCategoryId) {
                                            $scope.vm.subCategory = $scope.subCategories[i];
                                            break;
                                        }
                                    }


                                    $loading.finish('key');

                                    assetService.getReverse($scope.vm.assetId).then(
                                        function (result) {
                                            $scope.reverseAssetRoot = result.data;

                                            $loading.finish('key1');

                                            soachapterService.getAssetSoas($scope.vm.assetId, 'en-us').then(
                                                function (result) {
                                                    $scope.assetSoas = result.data;
                                                    $scope.isoPie = $scope.generateSoaPie("isoPieChart", $scope.getSoaPercentageData(1));
                                                    $scope.helsePie = $scope.generateSoaPie("helsePieChart", $scope.getSoaPercentageData(4));
                                                    $scope.gdprPie = $scope.generateSoaPie("gdprPieChart", $scope.getSoaPercentageData(5));

                                                    soachapterService.getRelevantSoas().then(
                                                        function (result) {
                                                            for (var i = 0; i < result.data.length; i++) {
                                                                if (result.data[i] == 1)
                                                                    $scope.enableIso = true;
                                                                else if (result.data[i] == 4)
                                                                    $scope.enableHelse = true;
                                                                else if (result.data[i] == 5)
                                                                    $scope.enableGdpr = true;
                                                            };
                                                        },
                                                        function (response) {
                                                            if (response && response.exceptionMessage) {
                                                                $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                                                            }
                                                            else {
                                                                $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                                                            };
                                                        }
                                                    );
                                                },
                                                function (response) {
                                                    if (response && response.exceptionMessage) {
                                                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                                                    }
                                                    else {
                                                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                                                    }
                                                }
                                             );
                                        },
                                        function (response) {

                                            if (response && response.exceptionMessage) {
                                                $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                                            }
                                            else {
                                                $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                                            }

                                            $loading.finish('key1');
                                        });
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

                            $loading.finish('criticalityCategories');
                        });
                },
                function(response) {

                    if (response && response.exceptionMessage) {
                        $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
                    } else {
                        $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
                    }

                    $loading.finish('subCategories');
                });

        };

        $scope.updateHelseSoaPie = function () {

        }

        $scope.loadData();

    }





    angular.module("raap").controller('assetViewController', assetViewController);
    assetViewController.$inject = ['$scope', '$location', '$timeout', 'assetService', 'assetSubCategoryService', 'threatService', '$sce', '$loading', '$stateParams', '$uibModal', 'processService'];
    function assetViewController($scope, $location, $timeout, assetService, assetSubCategoryService, threatService, $sce, $loading, $stateParams, $uibModal, processService) {
        $scope.Math = window.Math;
        Number.prototype.minutesToDDHHmm = function () {
            var minNum = this;
            var days = Math.floor(minNum / 1440);
            minNum -= days * 1440;
            var hours = Math.floor(minNum / 60);
            minNum -= hours * 60;
            var minutes = minNum;

            if (days < 10) { days = "0" + days; }
            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            var time = days + ':' + hours + ':' + minutes;
            return time;
        };

        $scope.message = '';
     
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.vm = {
            assetId: $stateParams.assetid,
            processId: $stateParams.processid,
            asset: null,
            process: null
        };

        $scope.categories = [{ name: "Business", id: 1 }, { name: "Technical", id: 2 }, { name: "Physical", id: 3 }, { name: "Organizational", id: 4 }];
        $scope.mapCategoryToName = function (categoryId) {
            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].id == categoryId)
                    return $scope.categories[i].name;
            }
            return 'Default';
        }

        $scope.pushAssetThreatsToList = function (currentAsset) {
            for (var j = 0; j < currentAsset.threats.length; j++) {
                currentAsset.threats[j].assetName = currentAsset.name;
                $scope.vm.asset.threats.push(currentAsset.threats[j]);
                for (var k = 0; k < currentAsset.assets.length; k++) {
                    var subAsset = currentAsset.assets[k];
                    $scope.pushAssetThreatsToList(subAsset);
                }
            }
        };

        $scope.loadData = function () {
            $scope.message = '';
            $loading.start('key');

            assetService.getSingle($scope.vm.assetId).then(
                function(result) {
                    $scope.vm.asset = result.data;
                    for (var i = 0; i < $scope.vm.asset.threats.length; i++) {
                        $scope.vm.asset.threats[i].assetName = $scope.vm.asset.name;
                    };
                    for (var j = 0; j < $scope.vm.asset.assets.length; j++) {
                        var currentAsset = $scope.vm.asset.assets[j];
                        $scope.pushAssetThreatsToList(currentAsset);
                    }
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

        $scope.setCurrentAsset = function () {

            if (!$scope.vm.process || !$scope.vm.process.assets || $scope.vm.process.assets.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find asset for this process!' });
                return;
            }

            for (var i = 0; i < $scope.vm.process.assets.length; i++) {
                var currentAsset = $scope.vm.process.assets[i];
                if (currentAsset.assetId == $scope.vm.assetId) {
                    $scope.vm.asset = currentAsset;
                    break;
                }
            }

            if (!$scope.vm.asset) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find asset for this process!' });
            }
        };

        $scope.removeCurrentThreat = function () {

            if (!$scope.vm.process || !$scope.vm.process.assets || $scope.vm.process.assets.length <= 0) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find asset for this process!' });
                return;
            }

            var position = -1;
            for (var i = 0; i < $scope.vm.process.assets.length; i++) {
                var currentAsset = $scope.vm.process.assets[i];
                if (currentAsset.assetId == $scope.vm.assetId) {
                    position = i;
                    break;
                }
            }

            if (position >= 0) {
                $scope.vm.process.assets.splice(position, 1);
            }

            if (!$scope.vm.asset) {
                $scope.alerts.push({ type: 'warning', msg: 'Unable to find asset for this process!' });
            }


        };


        $scope.edit = function () {
            $location.path('/app/asset/edit/' + $scope.vm.assetId);
        };


        $scope.delete = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/assets/delete.html',
                controller: 'deleteController',
                windowClass: 'app-modal-window'
            });

            modalInstance.result.then(function (result) {
                $loading.start('key');


                $scope.removeCurrentThreat();

                processService.update($scope.vm.process).then(function (response) {
                    $loading.finish('key');
                    $('#mainmenu').scope().refreshTreeView();
                    $scope.alerts.push({ type: 'success', msg: 'asset is deleted. Please wait while the grid is updating ...' });
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
                // cancel
            });

        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/app/asset/grid');
            }, 1000);
        }

   
        $scope.loadData();

    }




})();

