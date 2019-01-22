(function () {
    "use strict";

    angular.module("raap").factory("risktypeService", ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri + "api/company";
        var risktypeServiceFactory = {};

        // get all 
        risktypeServiceFactory.getAll = function (pageSize, page, orderByKey, isDesc) {
            return $http.get(serviceBase + '/GetRiskTypes?&pagesize=' + pageSize + '&page=' + page + '&OrderByKey=' + orderByKey + '&IsDescending=' + isDesc);
        };


        risktypeServiceFactory.getAvailableRiskReduces = function () {
          
            var deferred = $q.defer();

            $http.get(serviceBase + '/GetRiskTypes?&pagesize=100&page=1').then(function (response) {

                var riskRedues = [];
                angular.forEach(response.data.items, function (value, key) {
                    riskRedues.push({
                        "isoProbability":1,
                        "isoImpact":1,
                        "nsValue":1,
                        "nsThreat":1,
                        "nsVulnerability":1,
                        "name":value.name,
                        "type":value.riskTypeId
                    });
                });


                deferred.resolve(riskRedues);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;

        };

        risktypeServiceFactory.getAvailableRisks = function () {

            var deferred = $q.defer();

            $http.get(serviceBase + '/GetRiskTypes?&pagesize=100&page=1').then(function (response) {

                var risks = [];
                angular.forEach(response.data.items, function (value, key) {
                    risks.push({
                        "calculatedIsoRisk":1,
                        "calculatedNsRisk":1,
                        "isoRisk":1,
                        "nsRisk":1,
                        "isoProbability":1,
                        "isoImpact":1,
                        "nsValue":1,
                        "nsThreat":1,
                        "nsVulnerability":1,
                        "calculatedIsoProbability":0,
                        "calculatedIsoImpact":0,
                        "calculatedNsValue":0,
                        "calculatedNsThreat":0,
                        "calculatedNsVulnerability":0,
                        "name":value.name,
                        "type": value.riskTypeId,
                    });
                });


                deferred.resolve(risks);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;

        };


        // get single 
        risktypeServiceFactory.getSingle = function (id) {
            return $http.get(serviceBase + '/GetRiskType/' + id);
        };

        // create 
        risktypeServiceFactory.create = function (model) {
            var deferred = $q.defer();

            $http.post(serviceBase + '/CreateRiskType', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // update 
        risktypeServiceFactory.update = function (model) {
            var deferred = $q.defer();

            $http.put(serviceBase + '/UpdateRiskType', model, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                deferred.resolve(response);
            },function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // delete 
        risktypeServiceFactory.delete = function (id) {
            return $http.delete(serviceBase + '/DeleteRiskType/' + id);
        };

        // search 
        risktypeServiceFactory.search = function (query) {
            return $http.get(serviceBase + '/RiskTypeSearch?query=' + query);
        };


        // generate tree list - risktype
        risktypeServiceFactory.generateTreeListrisktype = function(risktypeNode) {
            var itemList = [];
            risktypeServiceFactory.risktypeTreeNodeRecursiverisktype(risktypeNode, itemList);
            return itemList;
        };

        risktypeServiceFactory.risktypeTreeNodeRecursiverisktype = function(risktype, list, nodeParent) {

            var risktypeId = 'a-' + risktype.risktypeId;
            if (!nodeParent || nodeParent.length <= 0) {
                nodeParent = '#';
            }
          
            list.push({
                id: risktypeId,
                parent: nodeParent,
                text: risktype.name,
                state: { opened: false, selected: (nodeParent == '#') },
                type: 'risktype',
                data: risktype,
                li_attr: { 'class': 'greennode' }
            });

            // threats
            if (risktype.threats) {
                for (var i = 0; i < risktype.threats.length; i++) {
                    var threat = risktype.threats[i];
                    var threatId = 't-' + threat.threatId;
                    list.push({
                        id: risktypeId + threatId,
                        parent: risktypeId,
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
                                id: risktypeId + threatId + 'c-' + control.controlId,
                                parent: risktypeId + threatId,
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
            if (risktype.risktypes) {
                for (var i = 0; i < risktype.risktypes.length; i++) {
                    risktypeServiceFactory.risktypeTreeNodeRecursiverisktype(risktype.risktypes[i], list, risktypeId);
                }
            }

        };

        risktypeServiceFactory.generateRiskLabel = function (risks) {

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

        risktypeServiceFactory.generateNodeColor = function (risk) {

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
        risktypeServiceFactory.generateTreeListProcess = function (processNode, selectNone) {
            var itemList = [];


            var processId = 'p-' + processNode.processId;

            itemList.push({
                id: processId,
                parent: 'company-node',
                text: processNode.name,
                state: { opened: false, selected: !selectNone },
                type: 'process',
                data: processNode,
                li_attr: { 'class': risktypeServiceFactory.generateNodeColor(processNode.risk) },
                a_attr: { 'data-toogle': 'tooltip', 'data-placement': 'bottom', 'data-title': risktypeServiceFactory.generateRiskLabel(processNode.risks), 'data-trigger': 'manual', 'data-delay': '50' }
            });
           
            if (processNode.risktypes) {
                for (var i = 0; i < processNode.risktypes.length; i++) {
                    risktypeServiceFactory.risktypeTreeNodeRecursiveProcess(processNode.risktypes[i], itemList, processId, processNode);
                }
            }


      
            return itemList;
        };

        risktypeServiceFactory.seed = 0;
        risktypeServiceFactory.getSeed = function() {
            risktypeServiceFactory.seed = risktypeServiceFactory.seed + 1;
            return risktypeServiceFactory.seed;
        }

        risktypeServiceFactory.risktypeTreeNodeRecursiveProcess = function (risktype, list, nodeParent, topProcess) {

            var risktypeId = 'p-' + topProcess.processId + 'a-' + risktype.risktypeId + "seed-" + risktypeServiceFactory.getSeed();
            if (!nodeParent || nodeParent.length <= 0) {
                nodeParent = '#';
            }

            var risktypeNode = {
                id: risktypeId,
                parent: nodeParent,
                text: risktype.name,
                state: { opened: false, selected: (nodeParent == '#') },
                type: 'risktype',
                data: risktype,
                li_attr: { 'class': risktypeServiceFactory.generateNodeColor(risktype.risk) },
                a_attr: { 'data-toogle': 'tooltip', 'data-placement': 'right', 'data-title': risktypeServiceFactory.generateRiskLabel(risktype.risks), 'data-trigger': 'manual', 'data-delay': '50' }
            };

            risktypeNode.data.processId = topProcess.processId;

            list.push(risktypeNode);

            // threats
            if (risktype.threats) {
                for (var i = 0; i < risktype.threats.length; i++) {
                    var threat = risktype.threats[i];
                    var threatId = risktypeId + 't-' + threat.threatId + "seed-" + risktypeServiceFactory.getSeed();
                    var threatItem = {
                        id: threatId,
                        parent: risktypeId,
                        text: threat.name,
                        state: { opened: false },
                        type: 'threat',
                        data: threat,
                        li_attr: { 'class': risktypeServiceFactory.generateNodeColor(threat.risk) },
                        a_attr: { 'data-toogle': 'tooltip', 'data-placement': 'right', 'data-title': risktypeServiceFactory.generateRiskLabel(threat.risks), 'data-trigger': 'manual', 'data-delay': '50' }
                    };
                    threatItem.data.risktypeId = risktype.risktypeId;
                    list.push(threatItem);

                    // controls
                    if (threat.controls) {
                        for (var c = 0; c < threat.controls.length; c++) {
                            var control = threat.controls[c];
                            var controlNode = {
                                id: threatId + 'c-' + control.controlId + "seed-" + risktypeServiceFactory.getSeed(),
                                parent: threatId,
                                text: control.name,
                                state: { opened: false },
                                type: 'control',
                                data: control,
                                li_attr: { 'class': 'defaultnode' }
                            };

                            controlNode.data.risktypeId = risktype.risktypeId;
                            controlNode.data.threatId = threat.threatId;


                            list.push(controlNode);
                        }
                    }

                }
            }

            // go recursive on childs
            if (risktype.risktypes) {
                for (var i = 0; i < risktype.risktypes.length; i++) {
                    risktypeServiceFactory.risktypeTreeNodeRecursiveProcess(risktype.risktypes[i], list, risktypeId, topProcess);
                }
            }

        };

        return risktypeServiceFactory;
    }]);

})();
