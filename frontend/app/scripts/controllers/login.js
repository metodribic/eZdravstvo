'use strict';

angular.module('tpo')
  .controller('LoginCtrl', ['$scope','AuthService', '$state', '$rootScope', function ($scope, AuthService, $state, $rootScope) {
      $scope.red = false;
      //Logout
      if($state.current.name == "logout" && AuthService.isAuthenticated()) {
          AuthService.logout();
          $rootScope.uporabnik = undefined;
      }

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
