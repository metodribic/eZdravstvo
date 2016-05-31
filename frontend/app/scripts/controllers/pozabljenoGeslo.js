'use strict()';

angular.module('tpo')
  .controller('PozabljenoGesloCtrl', ['$scope','$rootScope', 'Notification', 'AuthService', '$location', function ($scope, $rootScope, Notification, AuthService, $location) {
      $scope.red = false;
      $scope.showEmail = true;
      $scope.showPassword = false;
      var urlParams = $location.search();

      if(urlParams.email && urlParams.token) {
          $scope.showEmail = false;
          $scope.showPassword = true;
      }

      $scope.resetGeslo = function() {
          $scope.showPassword ? sendNewPass() : sendMail();
      }

      var sendNewPass = function() {
          if($scope.geslo === $scope.geslo2) {
              AuthService.menjavaGesla(urlParams.email, urlParams.token, $scope.geslo).then(function(success) {
                  Notification.info({message: 'Geslo zamenjano. Preusmerjam na prijavo...'});
                  $location.path('/login'); 
              }, function(error) {
                  Notification.error({message: error});
              });
          } else {
              Notification.warning({message: 'Gesli se ne ujemata'});
          }
      }

      var sendMail = function() {
          var email = $scope.email;
          AuthService.resetGesla(email).then(function(response){
              Notification.info({message: 'Email poslan. Preverite svoj poštni predal'});
          }, function(error) {
              Notification.error({message: error});
          });
      };
  }]);
