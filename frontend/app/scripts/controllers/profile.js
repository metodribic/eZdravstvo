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
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope','Posta','Uporabniki', 'Zdravnik','Notification', 'Ustanova', '$http', '$q', 'API_URL', function ($scope, AuthService, $state, $rootScope, Posta, Uporabniki, Zdravnik, Notification, Ustanova, $http, $q, API_URL) {
    var trenutniUporabnik = $rootScope.uporabnik;
    // Preveri ali je prijavljena oseba zravnik ali pacient
    $scope.tipUporabnika = 'Pacient';
    if(trenutniUporabnik.role.naziv == 'Pacient') {
      $scope.tipUporabnika = 'Pacient';
        pridobi_zdravnike();
    }
    else if(trenutniUporabnik.role.naziv == 'Zdravnik')
      $scope.tipUporabnika = 'Zdravnik'
          


    // model, ki se uporabi za posodabljanje profila
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
        updated_user.$update({iduporabnik: trenutniUporabnik.id});
        Notification.success('Profile updated!');
      }

    };

    $scope.pridobi_ime_poste = function(oseba){
      if(oseba == 'pacient')
        Posta.get({postaId: $scope.uporabnik.posta.id}).$promise.then(function(response){
          $rootScope.uporabnik.posta.kraj = response.kraj;
        });
      else if(oseba == 'sorodnik'){

        Posta.get({postaId: $scope.uporabnik.kontaktna_oseba.posta.id}).$promise.then(function(response){
          $rootScope.uporabnik.kontaktna_oseba.posta.kraj = response.kraj;
        });
      }

    };

    $scope.pridobi_ustanovo = function () {
      Ustanova.get({ustanovaId: $rootScope.uporabnik.ustanova.id}).$promise.then(function(response){
        $rootScope.uporabnik.ustanova = response;
        console.log(response);
      });
    };
    
    function pridobi_zdravnike () {
        var _this = $scope;
      Zdravnik.query({sprejema_paciente:true}).$promise.then(function(response){
          var zobo = [];
          var zdravniki = [];
          var izbraniZobo;
          var izbraniZdr;
         
          //Preverimo za zdravnike, ki bodo izbrani default
          if(trenutniUporabnik && trenutniUporabnik.zdravnik) {
              var zdr = trenutniUporabnik.zdravnik;
              for(var i=0; i<zdr.length; i++) {
                  if(zdr[i].tip === "osebni")
                      izbraniZdr = zdr[i];
                  else if(zdr[i].tip === "zobozdravnik")
                      izbraniZobo = zdr[i];
              }
          }
          
          for(var i=0; i<response.length; i++) {
              if(response[i].tip === "zobozdravnik")
                  zobo.push(response[i]);
              else
                  zdravniki.push(response[i]);
          }
        _this.zdravniki = zdravniki;
        _this.zobozdravniki = zobo;
        $scope.izbrani = {};
        if(izbraniZdr)
        $scope.izbrani.zdravnik = izbraniZdr.naziv + " " + izbraniZdr.ime + " " + 
            izbraniZdr.priimek + " (" + izbraniZdr.sifra.sifra + ")";
        if(izbraniZobo)
            $scope.izbrani.zobozdravnik = izbraniZobo.naziv + " " + izbraniZobo.ime + " " + 
            izbraniZobo.priimek + " (" + izbraniZobo.sifra.sifra + ")";
      }, function(error) {console.log(error); });
    }


    $scope.changeZdravnik = function(item, model) { 
        izbraniZdr = item;
        if(izbraniZdr) {
            $scope.izbrani.zdravnik = izbraniZdr.naziv + " " + izbraniZdr.ime + " " +
            izbraniZdr.priimek + " (" + izbraniZdr.sifra.sifra + ")";
        }
        $scope.izbraniZdr = izbraniZdr ? izbraniZdr.id : -1;
    };
    
    $scope.changeZobozdravnik = function(item, model) { 
        izbraniZdr = item;
        if(izbraniZdr) {
            $scope.izbrani.zobozdravnik = izbraniZdr.naziv + " " + izbraniZdr.ime + " " +
             izbraniZdr.priimek + " (" + izbraniZdr.sifra.sifra + ")";
        }
        $scope.izbranizobozdr = izbraniZdr ? izbraniZdr.id : -1;
    };
    
    $scope.menjavaZdravnikov = function(){
        var zdravnik = $scope.izbraniZdr;
        var zobozdravnik = $scope.izbranizobozdr;
        var data = {};
        console.log(zdravnik);
        console.log(zobozdravnik);
        
        if(zdravnik)
            data.zdravnik = zdravnik;
        if(zobozdravnik)
            data.zobozdravnik = zobozdravnik;
        if(!data)
            return;
        
        return $q(function(resolve, reject) {
            $http({
                method: 'PUT',
                url: 'http://' + API_URL + '/menjava_zdravnika',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function successCallback(response) {
                addAlert("Shranjeno", 'success');
            }, function errorCallback(response) {
                addAlert(response.data.error, 'danger');
            });
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
