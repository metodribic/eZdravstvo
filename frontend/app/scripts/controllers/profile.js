'use strict()';
angular.module('tpo')
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope','Posta','Uporabniki', 'Zdravnik','Notification', function ($scope, AuthService, $state, $rootScope, Posta, Uporabniki, Zdravnik, Notification) {
    var trenutniUporabnik = $rootScope.uporabnik;
    $scope.shrani_spremembe = function(){
      // model, ki se uporabi za POST
      var updatedUporabnik = {};

      // preveri če je prijavljen uporabnik zdravnik
      if(trenutniUporabnik.role.naziv == 'Zdravnik'){
        Zdravnik.get({zdravnikId: trenutniUporabnik.id}).$promise.then(function(response){
          response.ime = trenutniUporabnik.ime;
          response.priimek = trenutniUporabnik.priimek;
          response.$update();

        });
      }
      //  če ni zdravnik preveri če je pacient ali admin
      else if( trenutniUporabnik.role.naziv == 'Pacient' || trenutniUporabnik.role.naziv == 'Admin' ){
        var updated_user = new Uporabniki();
        updated_user.id = trenutniUporabnik.id;
        updated_user.ime = $rootScope.uporabnik.ime;
        updated_user.priimek = $rootScope.uporabnik.priimek;
        updated_user.kraj_rojstva = $rootScope.uporabnik.kraj_rojstva;
        updated_user.st_zzzs = $rootScope.uporabnik.st_zzzs;
        updated_user.$update({iduporabnik: trenutniUporabnik.id});
        Notification.success('Profile updated!')
      }

    };

    $scope.pridobi_ime_poste = function(){
      Posta.get({postaId: $scope.uporabnik.posta.id}).$promise.then(function(response){
        $rootScope.uporabnik.posta.kraj = response.kraj;
      });
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
