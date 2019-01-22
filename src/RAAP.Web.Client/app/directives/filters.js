(function () {
    "use strict";


    angular.module('raapFilters', []).filter('assetCategory', function () {
        return function (input) {
            switch (input) {
                case 0:
                    return "Business";
                case 1:
                    return "Technical";
                case 2:
                    return "Physical";
                case 3:
                    return "Organizational";
                default:
                    return "Unknown";
            }

        };
    });




    angular.module('raapFilters').filter('riskFilter', function () {
        return function (input) {

            if (input === undefined) { input = { isoProbability: 0, isoImpact:0 } }

            var threat = input.isoProbability + "/" + input.isoImpact;
            if (input.isoImpact == 5 && input.isoProbability >= 3)
                return "<i class='threat-red'>" + threat + "</i>";
            if (input.isoImpact == 4 && input.isoProbability >= 4)
                return "<i class='threat-red'>" + threat + "</i>";
            if (input.isoImpact == 3 && input.isoProbability == 5)
                return "<i class='threat-red'>" + threat + "</i>";

            if (input.isoImpact == 1 && input.isoProbability <= 3)
                return "<i class='threat-green'>" + threat + "</i>";
            if (input.isoImpact == 2 && input.isoProbability <= 2)
                return "<i class='threat-green'>" + threat + "</i>";
            if (input.isoImpact == 3 && input.isoProbability == 1)
                return "<i class='threat-green'>" + threat + "</i>";

            if (input.isoImpact == 0 && input.isoProbability == 0)
                return "<i class='threat-green'>" + threat + "</i>";

            return "<i class='threat-yellow'>" + threat + "</i>";


        };
    });

    angular.module('raapFilters').filter('riskFilterCalculated', function () {
        return function (input) {

            if (input === undefined) { input = { calculatedIsoProbability: 0, calculatedIsoImpact: 0 } }

            var threat = input.calculatedIsoProbability + "/" + input.calculatedIsoImpact;
            if (input.calculatedIsoImpact == 5 && input.calculatedIsoProbability >= 3)
                return "<i class='threat-red'>" + threat + "</i>";
            if (input.calculatedIsoImpact == 4 && input.calculatedIsoProbability >= 4)
                return "<i class='threat-red'>" + threat + "</i>";
            if (input.calculatedIsoImpact == 3 && input.calculatedIsoProbability == 5)
                return "<i class='threat-red'>" + threat + "</i>";

            if (input.calculatedIsoImpact == 1 && input.calculatedIsoProbability <= 3)
                return "<i class='threat-green'>" + threat + "</i>";
            if (input.calculatedIsoImpact == 2 && input.calculatedIsoProbability <= 2)
                return "<i class='threat-green'>" + threat + "</i>";
            if (input.calculatedIsoImpact == 3 && input.calculatedIsoProbability == 1)
                return "<i class='threat-green'>" + threat + "</i>";

            if (input.calculatedIsoImpact == 0 && input.calculatedIsoProbability == 0)
                return "<i class='threat-green'>" + threat + "</i>";

            return "<i class='threat-yellow'>" + threat + "</i>";


        };
    });

    angular.module('raapFilters').filter('inputNumberColorFilter', function() {
        return function(input) {
            if (input == 1)
                return "<option value='1' class='text-success'>1 - Very Low</option>";
            else if (input == 2)
                return "<i class='text-success'>2 - Low</i>";
            else if (input == 3)
                return "<i class='text-yellow'>3 - Medium</i>";
            else if (input == 4)
                return "<i class='text-danger'>4 - High</i>";
            else if (input == 5)
                return "<i class='text-danger'>5 - Very High</i>";
            else
                return "<i>" + input + "</i>";
        };
    });

    angular.module('raapFilters').filter('numberColorFilter', function () {
        return function (input) {
            if (input == 1)
                return "<option value='1' class='text-success'>1</option>";
            else if (input == 2)
                return "<i class='text-success'>2</i>";
            else if (input == 3)
                return "<i class='text-yellow'>3</i>";
            else if (input == 4)
                return "<i class='text-danger'>4</i>";
            else if (input == 5)
                return "<i class='text-danger'>5</i>";
            else
                return "<i>" + input + "</i>";
        };
    });


    angular.module('raapFilters').filter('criticalityCategory', function () {
        return function (input) {
            if (input == 1)
                return '<span class="text-success">1 - Very low</span>';
            else if (input == 2)
                return '<span class="text-success">2 - Low</span>';
            else if (input == 3)
                return '<span class="text-yellow">3 - Medium</span>';
            else if (input == 4)
                return '<span class="text-danger">4 - High</span>';
            else if (input == 5)
                return '<span class="text-danger">5 - Very high</span>';
            else
                return "<span>" + input + "</span>";
        };
    });

    angular.module('raapFilters').filter('reduceCategory', function () {
        return function (input) {
            return '<span class="text-success">'+ input +'%</span>';
        };
    });


    angular.module('raapFilters').filter('yesNo', function() {
        return function(input) {
            return input ? 'yes' : 'no';
        }
    });

    angular.module('raapFilters').filter('minutesToDDHHmm', function () {
        return function (input) {
            if (!input || input == 0) {
                return '0:0:0';
            }
            var minNum = input;
            var days = Math.floor(minNum / 1440);
            minNum -= days * 1440;
            var hours = Math.floor(minNum / 60);
            minNum -= hours * 60;
            var minutes = minNum;

            if (days < 10) {
                days = "0" + days;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var time = days + ':' + hours + ':' + minutes;
            return time;
        }
    });
})();

