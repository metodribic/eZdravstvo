'use strict()';

angular.module('tpo')
  .controller('MeritevPodrobnoCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','$stateParams', function ($scope, AuthService, $state, $rootScope, Meritve, Notification, $stateParams) {
    var scope = $scope;

    Meritve.get({ meritevId:$stateParams.id}).$promise.then(function(response){
      $scope.meritev = response;
    });

    $scope.chart = {'start': moment().subtract(1, 'weeks'), 'end': moment()};

    $scope.drawChart = function() {
        startDate = moment($scope.chart.start, 'DD.MM.YYYY');
        endDate = moment($scope.chart.end, 'DD.MM.YYYY');
        endDate.add(1, 'days');
        tipMeritveId = $scope.meritev.tip_meritve.id;
        Meritve.query({tipMeritveId: tipMeritveId, startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'), ordering: 'datum'}).$promise.then(function(response) {
                data = [{values: []}];
                scope.config.visible = true;

                for(var i=0; i<response.length; i++) {
                    if(i === 0)
                        data[0].key = response[i].tip_meritve.tip;
                    if(response[i].tip_meritve.tip === "Holesterol") {
                        if(data.length < 3) {
                            data.push({values:[], key: "LDL"});
                            data.push({values:[], key: "HDL"});
                            data[0].key = "Normalni holesterol";
                        }
                        var vrednosti = response[i].vrednost_meritve.split("/");

                        data[0].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD %H:%m:%s').valueOf(),
							y: parseFloat(vrednosti[0])
                        });

                        data[1].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD %H:%m:%s').valueOf(),
							y: parseFloat(vrednosti[1])
                        });
                        
                        data[2].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD %H:%m:%s').valueOf(),
							y: parseFloat(vrednosti[2])
                        });

                    }
                    else if(response[i].tip_meritve.tip === "Krvni pritisk") {
                        if(data.length < 2) {
                            data.push({values:[], key: "Sistolični krvni pritisk"});
                            data[0].key = "Diastolični krvni pritisk";
                        }
                        var spodnji = parseFloat(response[i].vrednost_meritve.split("/")[0]);
                        var zgornji = parseFloat(response[i].vrednost_meritve.split("/")[1]);

                        data[0].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD %H:%m:%s').valueOf(),
							y: spodnji
                        });

                        data[1].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD %H:%m:%s').valueOf(),
							y: zgornji
                        });

                    } else {
                        data[0].values.push({
							x: moment(response[i].datum, 'YYYY-MM-DD %H:%m:%s').valueOf(),
							y: parseFloat(response[i].vrednost_meritve),
                        });
                    }
                }
                $scope.api.clearElement();
                $scope.data = data;
            }, function(error) {
                console.log(error);
            });
    };

    $scope.options = {
            chart: {
                type: 'lineChart',
                height: 350,
                color: d3.scale.category10().range(),
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
				useInteractiveGuideline: true,
                duration: 350,
                xAxis: {
                    axisLabel: 'Datum',
                    tickFormat: function(d){
                        return d3.time.format('%d.%m.%Y %H:%M')(new Date(d));
                    },
                    axisLabelDistance: 30
                },
                yAxis: {
					useNiceScale: true,
					tickSize: 30,
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
    };


}]);
