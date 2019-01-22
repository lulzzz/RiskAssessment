(function () {
    "use strict";

    angular.module("raap").controller('soaDashboardController', soaDashboardController);
    soaDashboardController.$inject = ['$scope', '$location', '$state', '$loading', '$timeout', 'assetService', '$rootScope', 'soachapterService', 'localStorageService'];
    function soaDashboardController($scope, $location, $state, $loading, $timeout, assetService, $rootScope, soachapterService, localStorageService) {

        $scope.vm = {
            statistics: null,
            showAssetList: [],
            isoAssetStats: null,
            helseAssetStats: null,
            gdprAssetStats: null,
            enableIso: false,
            enableHelse: false,
            enableGdpr: false,
            showAssetListLabel: ""
        };
        
        $scope.pie;
        $scope.helsePie;
        $scope.isoPie;
        $scope.gdprPie;

        $scope.isoCode = localStorageService.get('languageIsoCode');
        
        $scope.handleError = function (response) {
            if (response && response.exceptionMessage) {
                $scope.alerts.push({ type: 'danger', msg: "Error: " + response.exceptionMessage });
            }
            else {
                $scope.alerts.push({ type: 'danger', msg: 'Unkown error - please try again!' });
            };
        };

        $scope.getAssetSoaStatistics = function (assetId) {
            soachapterService.getAssetSoaStatistics(assetId, $scope.getSoaType(), $scope.isoCode).then(
                function (result) {
                    var statistics = $scope.vm.showAssetList;
                    for (var i = 0; i < statistics.length; i++) {
                        if (statistics[i].id == assetId)
                        {
                            statistics[i].statistics = result.data;
                            break;
                        };
                    };
                },
                function (response) {
                    $scope.handleError(response);
                });
        };

        $scope.toggleCollapseAssetStatistics = function (assetItem) {
            if (!assetItem.statistics)
                $scope.getAssetSoaStatistics(assetItem.id);
            if (assetItem.collapsed != null)
                assetItem.collapsed = !assetItem.collapsed;
            else
                assetItem.collapsed = true;
        };

        $scope.getSoaStatistics = function () {
            soachapterService.getRelevantSoas().then(
                function (result) {
                    for (var i = 0; i < result.data.length; i++) {
                        soachapterService.getSoaStatistics(result.data[i]).then(
                            function (stats) {
                                if (stats.data.soaType == 1) {
                                    $scope.vm.enableIso = true;
                                    $scope.vm.isoAssetStats = stats.data;
                                    var data = $scope.parseStatisticsData(stats.data);
                                    $scope.isoPie = $scope.generateStatisticsPie('isoPie', data);
                                }
                                else if (stats.data.soaType == 4) {
                                    $scope.vm.enableHelse = true;
                                    $scope.vm.helseAssetStats = stats.data;
                                    var data = $scope.parseStatisticsData(stats.data);
                                    $scope.helsePie = $scope.generateStatisticsPie('helsePie', data);
                                }
                                else if (stats.data.soaType == 5) {
                                    $scope.vm.enableGdpr = true;
                                    $scope.vm.gdprAssetStats = stats.data;
                                    var data = $scope.parseStatisticsData(stats.data);
                                    $scope.gdprPie = $scope.generateStatisticsPie('gdprPie', data);
                                }
                            },
                            function (response) {
                                $scope.handleError(response);
                            });
                    };
                },
                function (response) {
                    $scope.handleError(response);
                }
            );
        };

        $scope.$watch('subSelectedIndex', function (newValue, oldValue) {
            $scope.vm.showAssetListLabel = '';
                $scope.vm.showAssetList = null;
                if (newValue == 0) {
                    if ($scope.vm.enableIso)
                        $scope.isoPie.updateProp('data.content', $scope.parseStatisticsData($scope.vm.isoAssetStats));
                    else if ($scope.vm.enableHelse)
                        $scope.helsePie.updateProp('data.content', $scope.parseStatisticsData($scope.vm.helseAssetStats));
                    else if ($scope.vm.enableGdpr)
                        $scope.gdprPie.updateProp('data.content', $scope.parseStatisticsData($scope.vm.gdprAssetStats));
                }
                else if (newValue == 1) {
                    if ($scope.vm.enableIso && $scope.vm.enableHelse)
                            $scope.helsePie.updateProp('data.content', $scope.parseStatisticsData($scope.vm.helseAssetStats));
                    else if ($scope.vm.enableGdpr)
                            $scope.gdprPie.updateProp('data.content', $scope.parseStatisticsData($scope.vm.gdprAssetStats));
                }
                else if (newValue == 2)
                    $scope.gdprPie.updateProp('data.content', $scope.parseStatisticsData($scope.vm.gdprAssetStats));
        });

        $scope.getSoaType = function () {
            if ($scope.subSelectedIndex == 0) {
                if ($scope.vm.enableIso)
                    return 1;
                else if ($scope.vm.enableHelse)
                    return 4;
                else if ($scope.vm.enableGdpr)
                    return 5;
            }
            else if ($scope.subSelectedIndex == 1) {
                if ($scope.vm.enableHelse)
                    return 4;
                else if ($scope.vm.enableGdpr)
                    return 5;
            }
            else if ($scope.subSelectedIndex == 2)
                return 5;
        };

        $scope.getSoaTypeData = function () {
            if ($scope.subSelectedIndex == 0) {
                if ($scope.vm.enableIso)
                    return $scope.vm.isoAssetStats;
                else if ($scope.vm.enableHelse)
                    return $scope.vm.helseAssetStats;
                else if ($scope.vm.enableGdpr)
                    return $scope.vm.gdprAssetStats;
            }
            else if ($scope.subSelectedIndex == 1) {
                if ($scope.vm.enableHelse)
                    return $scope.vm.helseAssetStats;
                else if ($scope.vm.enableGdpr)
                    return $scope.vm.gdprAssetStats;
            }
            else if ($scope.subSelectedIndex == 2)
                return $scope.vm.gdprAssetStats;
        };

        $scope.generateStatisticsPie = function (pieName, data) {
            var pie =
                new d3pie(pieName, {
                    "header": {
                        "title": {
                            "text": "Status",
                            "fontSize": 22,
                            "font": "verdana"
                        },
                        "subtitle": {
                            "text": "Assets",
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
                        },
                        "pullOutSegmentOnClick": {
                            "effect": "none", // none / linear / bounce / elastic / back
                            "speed": 300,
                            "size": 10
                        },
                    },
                    "callbacks": {
                        "onClickSegment": function (a) {
                            $scope.$apply(function () {
                                var data = $scope.getSoaTypeData();
                                if (a.data.type == 1) {
                                    $scope.vm.showAssetList = data.notImplemented;
                                    $scope.vm.showAssetListLabel = "- Not implemented";
                                }
                                else if (a.data.type == 2) {
                                    $scope.vm.showAssetList = data.inProgress;
                                    $scope.vm.showAssetListLabel = "- In progress";
                                }
                                else if (a.data.type == 3) {
                                    $scope.vm.showAssetList = data.deadlinePassed;
                                    $scope.vm.showAssetListLabel = "- Deadline passed";
                                }
                                else if (a.data.type == 4) {
                                    $scope.vm.showAssetList = data.implemented;
                                    $scope.vm.showAssetListLabel = "- Implemented";
                                }
                            });
                        }
                    }
                });
            return pie;
        };

        $scope.parseStatisticsData = function (data) {
            return [
                {
                    "label": "Not started",
                    "value": data.notImplemented ? data.notImplemented.length : 0,
                    "color": "#00A9FF",
                    "type": "1",
                },
                {
                    "label": "In progress",
                    "value": data.inProgress ? data.inProgress.length : 0,
                    "color": "#7e349b",
                    "type": "2",
                },
                {
                    "label": "Deadline passed",
                    "value": data.deadlinePassed ? data.deadlinePassed.length: 0,
                    "color": "#f02c09",
                    "type": "3",
                },
                {
                    "label": "Implemented",
                    "value": data.implemented ? data.implemented.length : 0,
                    "color": "#2EA319",
                    "type": "4",
                },
            ];
        };

        //$scope.loadStatistics();

        $scope.getSoaStatistics()
    }
})();

