(function () {
    "use strict";

    angular.module("raap").directive("assetDendogram", assetDendogram);
    function assetDendogram() {
        var width = 1000, height = 500, clusterwidth = width - 400, namelength = 25;
        return {
            restrict: 'E',
            scope: {
                asset: '=',
            },
            link: function(scope, element, attrs) {
                var svg = d3.select(element[0]).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(150,00)");
                scope.refreshAsset = function(newVal)
                {
                    svg.selectAll('*').remove();

                    //var diagonal = d3.svg.diagonal().projection(function (d) { return [d.y, d.x]; });

                    if (!newVal) {
                        return;
                    };

                    function addChildren(parent, parentAsset) {
                        if (!parentAsset.assets || parentAsset.assets.length === 0)
                            return;
                        for (var i = 0; i < parentAsset.assets.length; i++) {
                            var child = {
                                name: parentAsset.assets[i].name.substring(0, namelength),
                                parent: parentAsset.name,
                                children: []
                            };
                            parent.children.push(child);
                            addChildren(child, parentAsset.assets[i]);
                        }
                    };

                    var root = {
                        name: newVal.name.length > namelength ? newVal.name.substring(0, namelength - 2) + '..' : newVal.name,
                        parent: null,
                        children: []
                    };

                    addChildren(root, newVal);

                    //cluster.children = cluster.children(function (d) { return d.assets });
                    var cluster = d3.cluster().size([height, clusterwidth]);
                    var rootNode = d3.hierarchy(root);
                    cluster(rootNode);
                    var link = svg.selectAll(".link").data(rootNode.descendants().slice(1)).enter().append("path").attr("class", "link").attr("d", function (d) {
                        return "M" + d.y + "," + d.x
                            + "C" + (d.parent.y + 100) + "," + d.x
                            + " " + (d.parent.y + 100) + "," + d.parent.x
                            + " " + d.parent.y + "," + d.parent.x;
                    });


                    var node = svg.selectAll(".node").data(rootNode.descendants()).enter().append("g").attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); }).attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

                    node.append("circle").attr("r", 4.5);

                    node.append("text").attr("dx", function (d) { return d.children ? -8 : 8; }).attr("dy", function (d) { return (d.children && d.parent)? 20 : 6; }).style("text-anchor", function (d) { return d.children ? (d.parent ? "middle" : "end") : "start"; }).text(function (d) { return d.data.name; });
                }
                scope.$on('asset-changed', function (event, args) {
                    scope.refreshAsset(scope.asset);
                });
                scope.$watch('asset', function (newVal, oldVal)
                {
                    scope.refreshAsset(newVal);
                });
            }
        };
    };

    angular.module("raap").directive("assetDendogramReverse", assetDendogramReverse);
    function assetDendogramReverse() {
        var width = 1000, height = 500, clusterwidth = width - 400;
        return {
            restrict: 'E',
            scope: {
                asset: '=',
            },
            link: function (scope, element, attrs) {
                var svg = d3.select(element[0]).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(200,00)");
                scope.$watch('asset', function (newVal, oldVal) {
                    svg.selectAll('*').remove();
                    if (!newVal) {
                        return;
                    };

                    var cluster = d3.cluster().size([height, clusterwidth]);
                    var rootNode = d3.hierarchy(newVal);
                    cluster(rootNode);
                    var link = svg.selectAll(".link").data(rootNode.descendants().slice(1)).enter().append("path").attr("class", "link").attr("d", function (d) {
                        return "M" + (clusterwidth - d.y) + "," + d.x
                            + "C" + (clusterwidth - d.parent.y - 100) + "," + d.x
                            + " " + (clusterwidth - d.parent.y - 100) + "," + d.parent.x
                            + " " + (clusterwidth - d.parent.y) + "," + d.parent.x;
                    });

                    var node = svg.selectAll(".node").data(rootNode.descendants()).enter().append("g").attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); }).attr("transform", function (d) { return "translate(" + (clusterwidth - d.y) + "," + d.x + ")"; });

                    node.append("circle").attr("r", 4.5);

                    node.append("text").attr("dx", function (d) { return d.children ? 8 : -8; }).attr("dy", function (d) { return (d.children && d.parent) ? 20 : 6; }).style("text-anchor", function (d) { return d.children ? (d.parent ? "middle" : "start") : "end"; }).text(function (d) { return d.data.name; });
                });
            }
        };
    };

})();