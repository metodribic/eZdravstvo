'use strict()';

angular.module('tpo')
  .controller('MeritevPodrobnoCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','$stateParams', function ($scope, AuthService, $state, $rootScope, Meritve, Notification, $stateParams) {
    var scope = $scope;

    Meritve.get({ meritevId:$stateParams.id}).$promise.then(function(response){
      $scope.meritev = response;
    });

    $scope.chart = {'start': moment(), 'end': moment()};

    $scope.drawChart = function() {
        startDate = moment($scope.chart.start, 'DD.MM.YYYY');
        endDate = moment($scope.chart.end, 'DD.MM.YYYY');
        tipMeritveId = $scope.meritev.tip_meritve.id;
        Meritve.query({tipMeritveId: tipMeritveId, startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD')}).$promise.then(function(response) {
                data = [{values: []}]
                scope.config.visible = true;

                for(var i=0; i<response.length; i++) {
                        console.log(response[i].datum)
                    if(i === 0)
                        data[0].key = response[i].tip_meritve.tip;
                    if(response[i].tip_meritve.tip === "Krvni pritisk") {
                        if(data.length < 2) {
                            data.push({values:[], key: "Sistolični krvni pritisk"});
                            data[0].key = "Diastolični krvni pritisk";
                        }
                        var spodnji = parseFloat(response[i].vrednost_meritve.split("/")[0]);
                        var zgornji = parseFloat(response[i].vrednost_meritve.split("/")[1]);

                        data[0].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD ').valueOf(),
							y: spodnji
                        });

                        data[1].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD ').valueOf(),
							y: zgornji
                        });

                    } else {
                        data[0].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD ').valueOf(),
							y: parseFloat(response[i].vrednost_meritve),
                        });
                    }
                }
                $scope.data = data;
            }, function(error) {
                console.log(error);
            });
    };

    $scope.options = {
            chart: {
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: true
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                duration: 350,
                xAxis: {
                    axisLabel: 'Datum',
                    tickFormat: function(d){
                        return d3.time.format('%d.%m.%Y')(new Date(d));
                    },
                    axisLabelDistance: 30
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                }
            }
        };
    $scope.config = {
        visible: false
    }


}]);
