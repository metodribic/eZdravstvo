 'use strict()';


angular.module('tpo')
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope','Posta','Uporabniki', 'Zdravnik','Notification', 'Ustanova', 'KontaktnaOseba',  '$http', '$q', 'API_URL',
  function ($scope, AuthService, $state, $rootScope, Posta, Uporabniki, Zdravnik, Notification, Ustanova, KontaktnaOseba, $http, $q, API_URL) {

    // shrani uporabnika, ki je trenutno prijavljen
    var trenutniUporabnik = $rootScope.uporabnik;
    $scope.sprejema = true;

    // Preveri ali je prijavljena oseba zravnik ali pacient
    if(trenutniUporabnik.role.naziv == 'Pacient') {
      $scope.tipUporabnika = 'Pacient';
      pridobi_zdravnike();
	  }
    else if(trenutniUporabnik.role.naziv == 'Zdravnik'){
      $scope.tipUporabnika = 'Zdravnik';
    }

    // metoda za posodabljanje profila
    $scope.shrani_spremembe_zdravnik = function(){
      // preveri če je prijavljen uporabnik zdravnik
      if(trenutniUporabnik.role.naziv == 'Zdravnik'){
        var zdravnik = new Zdravnik();
        zdravnik.id = $rootScope.uporabnik.id;
        zdravnik.ime = $rootScope.uporabnik.ime;
        zdravnik.priimek = $rootScope.uporabnik.priimek;
        zdravnik.telefon = $rootScope.uporabnik.telefon;
        zdravnik.email = $rootScope.uporabnik.email;
        zdravnik.prosta_mesta = $rootScope.uporabnik.prosta_mesta;
        zdravnik.ustanova = {
          id: $rootScope.uporabnik.ustanova.id
        };

        // pridobi vredsnoti iz checkboxa
        if(radioBtn1.checked)
          zdravnik.sprejema_paciente = true;
        else if(radioBtn2.checked)
          zdravnik.sprejema_paciente = false;

        // posodobi  zdravnik
        zdravnik.$update({zdravnikId: trenutniUporabnik.id}, function(response){
          $rootScope.uporabnik = response;
          window.localStorage.setItem('user', JSON.stringify(response));
        });
        Notification.success('Profil uspešno posodobljen!');
      }
    };

    // funkcija za onemogočanje vnašanja števila pacientov, če jih zdravnik sploh ne sprejema
    $scope.hideNumber = function(arg){
      if(arg){
        prostaMesta.disabled = true;
      }
      else if(!arg){
        prostaMesta.disabled = false;
      }
    };


    // POSODOBI PROFIL
    $scope.shrani_spremembe_pacient = function(){
      // če je pacient ali admin
      if( trenutniUporabnik.role.naziv == 'Pacient' || trenutniUporabnik.role.naziv == 'Admin' ){

        var updated_user = new Uporabniki();
        updated_user.id = $rootScope.uporabnik.id;
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

        // preveri če je datum vnesen
        if($rootScope.uporabnik.datum_rojstva !== null){
          updated_user.datum_rojstva = new Date($rootScope.uporabnik.datum_rojstva).toISOString();
        }
        else {
          updated_user.datum_rojstva = null;
        }
        updated_user.$update({iduporabnik: $rootScope.uporabnik.id}, function(response){
          $rootScope.uporabnik = response;
          window.localStorage.setItem('user', JSON.stringify(response));
        });
        //UpdateCurrentUser();
        Notification.success('Profil uspešno posodobljen!');
      }
    };

    // POSODOBI KONTAKTNO OSEBO!
    $scope.shrani_kontaktno = function(){
      var updated_kontaktna = new KontaktnaOseba();
      updated_kontaktna.ime = $rootScope.uporabnik.kontaktna_oseba.ime;
      updated_kontaktna.priimek = $rootScope.uporabnik.kontaktna_oseba.priimek;
      updated_kontaktna.naslov = $rootScope.uporabnik.kontaktna_oseba.naslov;
      updated_kontaktna.posta = {
        id: $rootScope.uporabnik.kontaktna_oseba.posta.id,
        kraj: $rootScope.uporabnik.kontaktna_oseba.posta.kraj
      };
      updated_kontaktna.sorodstveno_razmerje = $rootScope.uporabnik.kontaktna_oseba.sorodstveno_razmerje;
      updated_kontaktna.telefon = $rootScope.uporabnik.kontaktna_oseba.telefon;

      // update kontaktna oseba
      if( typeof $rootScope.uporabnik.kontaktna_oseba.id !== undefined ){
        console.log('test');
        updated_kontaktna.id = $rootScope.uporabnik.kontaktna_oseba.id;
        updated_kontaktna.$update({kontaktnaId: $rootScope.uporabnik.kontaktna_oseba.id}, function(response){
          Notification.success('Kontaktna oseba uspešno posodobljen!!');
        });
      }
      // create kontaktna oseba
      else {
        updated_kontaktna.id = $rootScope.uporabnik.id;
        KontaktnaOseba.save(updated_kontaktna, function(response){
          Notification.success('Kontaktna oseba uspešno ustvarjena!!');
        });
      }

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

    function pridobi_zdravnike () {
        var _this = $scope;
        $scope.zdravniki = [];
        $scope.zobozdravniki = [];
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
              if(!response[i].sprejema_paciente || response[i].prosta_mesta < 1)
                  continue;
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
                addAlert(response.data.error, 'error');
            });
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
