'use strict';

angular.module('tpo')
  .controller('LoginCtrl', ['$scope','AuthService', '$state', function ($scope, AuthService, $state) {
      $scope.red = false;

    $scope.doLogin = function(uporabniki) {
        /* Do login */
        var uporabniki = this.uporabniki;
        var _this = $scope;
        var _$state = $state;

        AuthService.login(uporabniki.email, uporabniki.geslo).then(function(response){
            console.log(response);
            if(_this.uporabnik && !_this.uporabnik.ime)
                    alert('No profile set. Will redirect (if we will make profile page)');
            else
                $state.go('nadzornaPlosca');    //GO home! 
        }, function(error) {
            _this.red = true;
        });
    };
  }]);
