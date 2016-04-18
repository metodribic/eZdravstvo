'use strict()';

angular.module('tpo')
  .controller('LoginCtrl', ['$scope','AuthService', '$state', '$rootScope','Posta','Notification', function ($scope, AuthService, $state, $rootScope, Posta, Notification) {
      $scope.red = false;
      $rootScope.logged_out = true;

      //Logout
      if($state.current.name == "logout" && AuthService.isAuthenticated()) {
          AuthService.logout();
          $rootScope.logged_out = true;
          $state.go('login');
      }

    $scope.doLogin = function(uporabniki) {
        /* Do login */
        var uporabniki = this.uporabniki;
        var _this = $scope;
        var _$state = $state;

        AuthService.login(uporabniki.email, uporabniki.geslo).then(function(response){
          $rootScope.logged_out = false;
          if(_this.uporabnik && !_this.uporabnik.ime){
            Notification.warning({message: 'Za nadaljevanje izpolnite profil!', title: '<b>Opozorilo!</b>'});
            $state.go('profile');
          }
          else{
            $state.go('nadzornaPlosca');    //GO home!
          }

        }, function(error) {
            Notification.error({message: error});
        });
    };
  }]);
