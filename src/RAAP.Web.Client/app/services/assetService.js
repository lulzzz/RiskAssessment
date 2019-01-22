(function () {
    "use strict";

    angular.module("raap").factory("assetService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/asset";
        var assetServiceFactory = {};

        // get all 
        assetServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc, category, excludeIds) {
            var excludeIdsValue = "";
            if (excludeIds && excludeIds.length > 0) {
                for (var i = 0; i < excludeIds.length; i++) {
                    excludeIdsValue = excludeIdsValue + "&excludeIds=" + excludeIds[i];
                }
            }
            var categoryValue = '&category=';
            if (category) {
                categoryValue += category;
            } else {
                categoryValue += '0';
            }
            return $http.get(serviceBase + '?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc + categoryValue + excludeIdsValue);
        };

        // get single 
        assetServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/' + id);
        };

        assetServiceFactory.getReverse = function (id) {
            return $http.get(serviceBase + '/reverse/' + id);
        };

        // create 
        assetServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        assetServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase, model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        assetServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/' + id);
        };

        // search 
        assetServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/search?query=' + query);
        };

        // get GetUnhandledThreats 
        assetServiceFactory.getUnhandledThreats = function (probability, impact, levelType) {
            return $http.get(serviceBase + '/GetUnhandledThreats?probability=' + probability + '&impact=' + impact + '&levelType=' + levelType);
        };


        // generate tree list - asset
        assetServiceFactory.generateTreeListAsset = function(assetNode) {
            var itemList = [];
            assetServiceFactory.assetTreeNodeRecursiveAsset(assetNode, itemList);
            return itemList;
        };

        assetServiceFactory.assetTreeNodeRecursiveAsset = function(asset, list, nodeParent) {

            var assetId = 'a-' + asset.assetId;
            if (!nodeParent || nodeParent.length <= 0) {
                nodeParent = '#';
            }
          
            list.push({
                id: assetId,
                parent: nodeParent,
                text: asset.name,
                state: { opened: false, selected: (nodeParent == '#') },
                type: 'asset',
                data: asset,
                li_attr: { 'class': 'greennode' }
            });

            // threats
            if (asset.threats) {
                for (var i = 0; i < asset.threats.length; i++) {
                    var threat = asset.threats[i];
                    var threatId = 't-' + threat.threatId;
                    list.push({
                        id: assetId + threatId,
                        parent: assetId,
                        text: threat.name,
                        state: { opened: false },
                        type: 'threat',
                        data: threat,
                        li_attr: { 'class': 'rednode' }
                    });

                    // controls
                    if (threat.controls) {
                        for (var c = 0; c < threat.controls.length; c++) {
                            var control = threat.controls[c];
                            list.push({
                                id: assetId + threatId + 'c-' + control.controlId,
                                parent: assetId + threatId,
                                text: control.name,
                                state: { opened: false },
                                type: 'control',
                                completeObject: control,
                                data: control,
                                li_attr: { 'class': 'greennode' }
                            });
                        }
                    }

                }
            }

            // go recursive on childs
            if (asset.assets) {
                for (var i = 0; i < asset.assets.length; i++) {
                    assetServiceFactory.assetTreeNodeRecursiveAsset(asset.assets[i], list, assetId);
                }
            }

        };

        assetServiceFactory.generateRiskLabel = function (risks) {

            if (!risks) { return "n/a"; }

            var text = ""
            angular.forEach(risks, function (risk, i) {
                text += risk.name + ": " + risk.isoRisk + " | ";
            });

           
            if (text.length > 4) {
                text = text.slice(0, -3);
            }

            return text;
        };

        assetServiceFactory.generateNodeColor = function (risk) {

            if (!risk)
                return 'defaultnode';

            // iso
            if (risk.damageIsoRisk >= 0) {
                return 'greennode';
            }

            // ns
            return 'rednode';

        };

        // generate tree list - process
        assetServiceFactory.generateTreeListProcess = function (processNode, selectNone) {
            var itemList = [];


            var processId = 'p-' + processNode.processId;

            itemList.push({
                id: processId,
                parent: '#',
                text: processNode.name,
                state: { opened: false, selected: !selectNone },
                type: 'process',
                data: processNode,
                li_attr: { 'class': assetServiceFactory.generateNodeColor(processNode.risk) },
                a_attr: { 'data-toogle': 'tooltip', 'data-placement': 'bottom', 'data-title': assetServiceFactory.generateRiskLabel(processNode.risks), 'data-trigger': 'manual', 'data-delay': '50' }
            });
           
            if (processNode.assets) {
                for (var i = 0; i < processNode.assets.length; i++) {
                    assetServiceFactory.assetTreeNodeRecursiveProcess(processNode.assets[i], itemList, processId, processNode);
                }
            }


      
            return itemList;
        };

        assetServiceFactory.seed = 0;
        assetServiceFactory.getSeed = function() {
            assetServiceFactory.seed = assetServiceFactory.seed + 1;
            return assetServiceFactory.seed;
        }

        assetServiceFactory.assetTreeNodeRecursiveProcess = function (asset, list, nodeParent, topProcess) {

            var assetId = 'p-' + topProcess.processId + 'a-' + asset.assetId + "seed-" + assetServiceFactory.getSeed();
            if (!nodeParent || nodeParent.length <= 0) {
                nodeParent = '#';
            }

            var assetNode = {
                id: assetId,
                parent: nodeParent,
                text: asset.name,
                state: { opened: false, selected: (nodeParent == '#') },
                type: 'asset',
                data: asset,
                li_attr: { 'class': assetServiceFactory.generateNodeColor(asset.risk) },
                a_attr: { 'data-toogle': 'tooltip', 'data-placement': 'bottom', 'data-title': assetServiceFactory.generateRiskLabel(asset.risks), 'data-trigger': 'manual', 'data-delay': '50' }
            };

            assetNode.data.processId = topProcess.processId;

            list.push(assetNode);

            // threats
            if (asset.threats) {
                for (var i = 0; i < asset.threats.length; i++) {
                    var threat = asset.threats[i];
                    var threatId = assetId + 't-' + threat.threatId + "seed-" + assetServiceFactory.getSeed();
                    var threatItem = {
                        id: threatId,
                        parent: assetId,
                        text: threat.name,
                        state: { opened: false },
                        type: 'threat',
                        data: threat,
                        li_attr: { 'class': assetServiceFactory.generateNodeColor(threat.risk) },
                        a_attr: { 'data-toogle': 'tooltip', 'data-placement': 'bottom', 'data-title': assetServiceFactory.generateRiskLabel(threat.risks), 'data-trigger': 'manual', 'data-delay': '50' }
                    };
                    threatItem.data.assetId = asset.assetId;
                    list.push(threatItem);

                    // controls
                    if (threat.controls) {
                        for (var c = 0; c < threat.controls.length; c++) {
                            var control = threat.controls[c];
                            var controlNode = {
                                id: threatId + 'c-' + control.controlId + "seed-" + assetServiceFactory.getSeed(),
                                parent: threatId,
                                text: control.name,
                                state: { opened: false },
                                type: 'control',
                                data: control,
                                li_attr: { 'class': 'defaultnode' }
                            };

                            controlNode.data.assetId = asset.assetId;
                            controlNode.data.threatId = threat.threatId;


                            list.push(controlNode);
                        }
                    }

                }
            }

            // go recursive on childs
            if (asset.assets) {
                for (var i = 0; i < asset.assets.length; i++) {
                    assetServiceFactory.assetTreeNodeRecursiveProcess(asset.assets[i], list, assetId, topProcess);
                }
            }

        };

        return assetServiceFactory;
    }]);

})();
