'use strict()';

angular.module('tpo')
  .controller('MeritevPodrobnoCtrl', ['$scope','AuthService', '$state', '$rootScope','Meritve','Notification','$stateParams', function ($scope, AuthService, $state, $rootScope, Meritve, Notification, $stateParams) {
    Meritve.get({ meritevId:$stateParams.id}).$promise.then(function(response){
      $scope.meritev = response;
      $scope.data = [{
		key: "Graf za trenutno meritev",
		values: [{"label": "Trenutna meritev", "value": $scope.meritev.vrednost_meritve}]
	}]

    });


    $scope.chart = {'start': moment(), 'end': moment()}

    $scope.drawChart = function() {
        startDate = moment($scope.chart.start, 'DD.MM.YYYY')
        endDate = moment($scope.chart.end, 'DD.MM.YYYY')
        Meritve.query({tip: $scope.meritev.tip, startDate: startDate.format('YYYY-MM-DD'), 
            endDate: endDate.format('YYYY-MM-DD')}).$promise.then(function(response) {
                data = [{key: "Graf meritev od " + startDate.format('DD.MM.YYYY') + ' - ' + 
                    endDate.format('DD.MM.YYYY'), values: []}];
                for(var i=0; i<response.length; i++) {
                    data[0].values.push({"label": moment(response[i].datum, 'YYYY-MM-DD').format('DD.MM.YYYY'),
                                     "value": response[i].vrednost_meritve});
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

}]);
