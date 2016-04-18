'use strict';

angular.module('tpo')
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope', 'Notification', function ($scope, AuthService, $state, $rootScope, Notification) {

    $scope.changePassword = function(user) {
        /* Do login */
        var userdata = user;
        var _this = $scope;
        var _$state = $state;

        var oldpass = user.oldpass;
        var newpass = user.newpass;
        var newpass2 = user.newpass2;
        var id = $rootScope.uporabnik.id;
        if(newpass2 !== newpass) {
            addAlert("Passwords do not match", "error");
            return;
        }

        if(!id)
            return;

        AuthService.changePassword(id, oldpass, newpass).then(function(response){
            addAlert("Password changed", "success");
        }, function(error) {
            addAlert(error, "error");
        });
    };

    function addAlert(msg, state) {
        Notification({message: msg}, state);
    }
  }]);
