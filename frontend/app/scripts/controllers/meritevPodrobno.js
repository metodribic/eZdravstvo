'use strict()';

angular.module('tpo')
  .controller('MeritevPodrobnoCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','$stateParams', function ($scope, AuthService, $state, $rootScope, Meritve, Notification, $stateParams) {
    var scope = $scope;

    Meritve.get({ meritevId:$stateParams.id}).$promise.then(function(response){
      $scope.meritev = response;
      if($scope.meritev.tip_meritve.tip === "Krvni pritisk") {
          scope.config.visible = true;
          var spodnji = parseFloat($scope.meritev.vrednost_meritve.split("/")[0]);
          var zgornji = parseFloat($scope.meritev.vrednost_meritve.split("/")[1]);
          $scope.data = [{
              key: "Graf za trenutno meritev",
              values: [{"label": "Trenutna meritev", "value": spodnji}]
          }]
          
          $scope.data2 = [{
              key: "Graf za trenutno meritev",
              values: [{"label": "Trenutna meritev", "value": zgornji}]
          }]

      } else {
          $scope.data = [{
              key: "Graf za trenutno meritev",
              values: [{"label": "Trenutna meritev", "value": $scope.meritev.vrednost_meritve}]
          }]
      }

    });


    $scope.chart = {'start': moment(), 'end': moment()}

    $scope.drawChart = function() {
        startDate = moment($scope.chart.start, 'DD.MM.YYYY')
        endDate = moment($scope.chart.end, 'DD.MM.YYYY')
        tipMeritveId = $scope.meritev.tip_meritve.id;
        Meritve.query({tipMeritveId: tipMeritveId, startDate: startDate.format('YYYY-MM-DD'), 
            endDate: endDate.format('YYYY-MM-DD')}).$promise.then(function(response) {
                data = [{key: "Graf meritev od " + startDate.format('DD.MM.YYYY') + ' - ' + 
                    endDate.format('DD.MM.YYYY'), values: []}];
                for(var i=0; i<response.length; i++) {
                    if(response[i].tip_meritve.tip === "Krvni pritisk") {
                        scope.config.visible = true;
                        var spodnji = parseFloat(response[i].vrednost_meritve.split("/")[0]);
                        var zgornji = parseFloat(response[i].vrednost_meritve.split("/")[1]);
                        data[0].values.push({"label": moment(response[i].datum, 'YYYY-MM-DD').format('DD.MM.YYYY'),
                                     "value": spodnji});
                        data2[0].values.push({"label": moment(response[i].datum, 'YYYY-MM-DD').format('DD.MM.YYYY'),
                                     "value": zgornji});
                    } else {
                        data[0].values.push({"label": moment(response[i].datum, 'YYYY-MM-DD').format('DD.MM.YYYY'),
                                     "value": parseFloat(response[i].vrednost_meritve)});
                    }
                }
                $scope.data = data;
            }, function(error) {
                console.log(error);
            });
    }

	$scope.data = [{
		key: "",
		values: []
	}]
    
    $scope.data2 = [{
		key: "",
		values: []
	}]


    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Meritve'
            },
            yAxis: {
                axisLabel: 'Vrednost meritve',
                axisLabelDistance: 30
            }
        }
    };

    $scope.config = {
        visible: false
    }


}]);
