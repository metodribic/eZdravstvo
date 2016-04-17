'use strict';

angular.module('tpo')
  .controller('LoginCtrl', ['$scope','AuthService', '$state', '$rootScope', 'Notification', function ($scope, AuthService, $state, $rootScope, Notification) {
      $scope.red = false;
      $rootScope.logged_out = true;
      
      //Logout
      if($state.current.name == "logout" && AuthService.isAuthenticated()) {
          AuthService.logout();
          $rootScope.uporabnik = undefined;
          $rootScope.logged_out = true;
      }

    $scope.doLogin = function(uporabniki) {
        /* Do login */
        var uporabniki = this.uporabniki;
        var _this = $scope;
        var _$state = $state;

        AuthService.login(uporabniki.email, uporabniki.geslo).then(function(response){
            if(_this.uporabnik && !_this.uporabnik.ime)
                  Notification.error({message: 'Your profile is empty, but edit profile story is not realized yet. So you get this nice popup :)'});
            else{
              $rootScope.logged_out = false;
              $state.go('nadzornaPlosca');    //GO home!
            }

        }, function(error) {
            Notification.error({message: error});
        });
    };
  }]);
