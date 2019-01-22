(function() {
    "use strict";


    angular.module("raap").controller('incidentController', incidentController);
    incidentController.$inject = ['$scope', '$location', '$timeout', 'incidentService', '$uibModal', '$loading'];

    function incidentController($scope, $location, $timeout, incidentService, $uibModal, $loading) {

        $scope.alerts = [];
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
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

        $scope.loadData = function() {
            $scope.alerts = [];
            $loading.start('key');

            incidentService.getAll($scope.vm.pageSize, $scope.vm.page, $scope.vm.orderByKey, $scope.vm.isDesc).then(
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
            $location.path('/app/incident/edit/' + id);
        };

        $scope.create = function() {
            $location.path('/app/incident/create');
        };

        $scope.delete = function(id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/incidents/delete.html',
                controller: 'deleteController',
                windowClass: 'app-modal-window'
            });

            modalInstance.result.then(function(result) {
                $loading.start('key');

                incidentService.delete(id).then(function(response) {
                        $loading.finish('key');
                        $scope.alerts.push({ type: 'success', msg: 'incident is deleted. Please wait while the grid is updating ...' });
                        startTimer();

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

        $scope.search = function(val) {
            return incidentService.search(val).then(function(response) {
                return response.data;
            });
        };

        var startTimer = function() {
            var timer = $timeout(function() {
                $timeout.cancel(timer);
                $scope.loadData();
            }, 1500);
        };

        $scope.loadData();

    }


    angular.module("raap").controller('incidentCreateController', incidentCreateController);
    incidentCreateController.$inject = ['$scope', '$location', '$timeout', 'incidentService', '$sce', '$loading'];

    function incidentCreateController($scope, $location, $timeout, incidentService, $sce, $loading) {

        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.vm = {
            name: "",
            description: "",
        };

        $scope.save = function() {
            $scope.message = "";
            $loading.start('key');
            $scope.savedSuccessfully = false;

            incidentService.create($scope.vm).then(function(response) {
                    $scope.savedSuccessfully = true;
                    $scope.message = $sce.trustAsHtml("The incident was created! Please wait while we redirect back to the index page.");
                    startTimer();
                    $loading.finish('key');
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
                $location.path('/app/incident/grid');
            }, 1000);
        }
    }


    angular.module("raap").controller('incidentEditController', incidentEditController);
    incidentEditController.$inject = ['$scope', '$location', '$timeout', 'incidentService', '$sce', '$loading', '$stateParams'];

    function incidentEditController($scope, $location, $timeout, incidentService, $sce, $loading, $stateParams) {

        $scope.message = "";
        $scope.savedSuccessfully = false;

        $scope.vm = {
            incidentId: $stateParams.id,
            name: "",
            description: "",
            createdOn: Date(),
            updatedOn: Date(),
        };

        $scope.save = function() {
            $scope.message = "";
            $loading.start('key');
            $scope.savedSuccessfully = false;

            incidentService.update($scope.vm).then(function(response) {
                    $scope.savedSuccessfully = true;
                    $scope.message = $sce.trustAsHtml("The incident was updated! Please wait while we redirect back to the index page.");
                    startTimer();
                    $loading.finish('key');
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
                $location.path('/app/incident/grid');
            }, 1000);
        }

        $scope.loadData = function() {
            $scope.message = "";
            $scope.savedSuccessfully = false;
            $loading.start('key');

            incidentService.getSingle($scope.vm.incidentId).then(
                function(result) {
                    $scope.vm = result.data;
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
            $scope.loadData();

        };
    }

})();
