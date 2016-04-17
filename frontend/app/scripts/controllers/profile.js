'use strict()';

angular.module('tpo')
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope', function ($scope, AuthService, $state, $rootScope) {

    $scope.shrani_spremembe = function(){
      console.log($rootScope.uporabnik);
    };


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
            addAlert("Passwords do not match", "warning");
            return;
        }

        if(!id)
            return;

        AuthService.changePassword(id, oldpass, newpass).then(function(response){
            addAlert("Password changed", "success");
        }, function(error) {
            addAlert(error, "danger");
        });
    };

    function addAlert(msg, state) {
        var container = angular.element(document.querySelector('#alertContainer'));
        container.empty();
        container.append(
            '<div class="fade in alert alert-dismissible alert-' + state + '" role="alert"> ' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="false">&times;</span></button>' + msg + '</div>');
    }
  }]);
