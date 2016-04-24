'use strict()';

/*
Uporabniški profil obsega:
  številko kartice zdravstvenega zavarovanja, 👍
  priimek in ime, 👍
  naslov, 👍
  telefon, 👍
  datum rojstva,
  spol,👍
  podatke o kontaktni osebi: 👍
    priimek in ime, 👍
    naslov, 👍
    telefon, 👍
    sorodstveno razmerje 👍

------ ZDRAVNIK -----
številko zdravnika, 👍
priimek in ime, 👍
šifro izvajalca zdravstvene dejavnosti (npr. zdravstvenega doma),👍
telefon,👍
e-mail,👍
število pacientov, ki jih lahko sprejme). 👍
*/

angular.module('tpo')
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope','Posta','Uporabniki', 'Zdravnik','Notification', 'Ustanova', 'KontaktnaOseba',
  function ($scope, AuthService, $state, $rootScope, Posta, Uporabniki, Zdravnik, Notification, Ustanova, KontaktnaOseba) {
    var trenutniUporabnik = $rootScope.uporabnik;

    // console.log($rootScope.uporabnik);
    // Preveri ali je prijavljena oseba zravnik ali pacient
    $scope.tipUporabnika = 'Pacient';
    if(trenutniUporabnik.role.naziv == 'Pacient')
      $scope.tipUporabnika = 'Pacient';
    else if(trenutniUporabnik.role.naziv == 'Zdravnik')
      $scope.tipUporabnika = 'Zdravnik';


    // POSODOBI PRFIL
    $scope.shrani_spremembe = function(){
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

        // TODO: Preveri če je oskrbovanec

        var updated_user = new Uporabniki();
        updated_user.id = trenutniUporabnik.id;
        updated_user.ime = $rootScope.uporabnik.ime;
        updated_user.priimek = $rootScope.uporabnik.priimek;
        updated_user.kraj_rojstva = $rootScope.uporabnik.kraj_rojstva;
        updated_user.st_zzzs = $rootScope.uporabnik.st_zzzs;
        updated_user.telefon = $rootScope.uporabnik.telefon;
        updated_user.naslov = $rootScope.uporabnik.naslov;
        updated_user.spol = $rootScope.uporabnik.spol;
        updated_user.posta = {
          id: $rootScope.uporabnik.posta.id,
          kraj: $rootScope.uporabnik.posta.kraj
        };

        updated_user.$update({iduporabnik: trenutniUporabnik.id});
        Notification.success('Profile uspešno posodobljen!');
      }
    };

    // POSODOBI KONTAKTNO OSEBO!
    $scope.shrani_oskrbovanca = function(){
      console.log($rootScope.uporabnik.kontaktna_oseba);
      var updated_kontaktna = new KontaktnaOseba();
      updated_kontaktna.id = $rootScope.uporabnik.kontaktna_oseba.id;
      updated_kontaktna.ime = $rootScope.uporabnik.kontaktna_oseba.ime;
      updated_kontaktna.priimek = $rootScope.uporabnik.kontaktna_oseba.priimek;
      updated_kontaktna.naslov = $rootScope.uporabnik.kontaktna_oseba.naslov;
      updated_kontaktna.posta = {
        id: $rootScope.uporabnik.kontaktna_oseba.posta.id,
        kraj: $rootScope.uporabnik.kontaktna_oseba.posta.kraj
      };
      updated_kontaktna.sorodstveno_razmerje = $rootScope.uporabnik.kontaktna_oseba.sorodstveno_razmerje;
      updated_kontaktna.telefon = $rootScope.uporabnik.kontaktna_oseba.telefon;


      updated_kontaktna.$update({kontaktnaId: $rootScope.uporabnik.kontaktna_oseba.id});
      Notification.success('Kontaktna oseba uspešno posodobljen!!');
    };

    // PRIDOBIVANJE POSTE GLEDE NA ID
    $scope.pridobi_ime_poste = function(oseba){

      // pridobi pošto za pacienta
      if(oseba == 'pacient')
        Posta.get({postaId: $scope.uporabnik.posta.id}).$promise
        .then(function(response){
          $rootScope.uporabnik.posta.kraj = response.kraj;
        })
        // če pošta ne obstaja, obveti uporabnika, ter povrni številko na prvotno pošto
        .catch(function(err){
          if( err.status == 404 )
            Notification.error({message: 'Pošte s podano številko ni bilo mogoče najti!', title: '<b>Napaka!</b>'});
            $rootScope.uporabnik.posta = AuthService.getCurrentUser().posta;
        });

      // pridobi posto za sorodnika
      else if(oseba == 'sorodnik')
        Posta.get({postaId: $scope.uporabnik.kontaktna_oseba.posta.id}).$promise.then(function(response){
          $rootScope.uporabnik.kontaktna_oseba.posta.kraj = response.kraj;
        })
        // če pošta ne obstaja, obveti uporabnika, ter povrni številko na prvotno pošto
        .catch(function(err){
          if( err.status == 404 )
          console.log($rootScope.uporabnik);
            Notification.error({message: 'Pošte s podano številko ni bilo mogoče najti!', title: '<b>Napaka!</b>'});
            $rootScope.uporabnik.kontaktna_oseba.posta = AuthService.getCurrentUser().kontaktna_oseba.posta;
        });
    };


    //  PRIDOBIVANJE USTANOVE GLEDE NA ID
    $scope.pridobi_ustanovo = function () {
      Ustanova.get({ustanovaId: $rootScope.uporabnik.ustanova.id}).$promise.then(function(response){
        $rootScope.uporabnik.ustanova = response;
      })
      .catch(function(err){
        if( err.status == 404 )
          Notification.error({message: 'Ustanove s podano šifro ni bilo mogoče najti!', title: '<b>Napaka!</b>'});
          $rootScope.uporabnik.ustanova = AuthService.getCurrentUser().ustanova;
      });
    };


    // SPREMENI GESLO
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

        if(!id) return;

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
