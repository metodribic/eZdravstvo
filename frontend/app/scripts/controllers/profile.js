 'use strict()';


angular.module('tpo')
  .controller('ProfileCtrl', ['$scope','AuthService', '$state', '$rootScope','Posta','Uporabniki', 'Zdravnik','Notification', 'Ustanova', 'KontaktnaOseba',  '$http', '$q', 'API_URL', 'Personalizacija',
  function ($scope, AuthService, $state, $rootScope, Posta, Uporabniki, Zdravnik, Notification, Ustanova, KontaktnaOseba, $http, $q, API_URL, Personalizacija) {

    // shrani uporabnika, ki je trenutno prijavljen
    var trenutniUporabnik = $rootScope.uporabnik;
    $scope.sprejema = true;

    // Preveri ali je prijavljena oseba zravnik ali pacient
    if(trenutniUporabnik.role.naziv == 'Pacient') {
      $scope.tipUporabnika = 'Pacient';
      pridobi_zdravnike();

      $scope.forma = trenutniUporabnik.personalizacija;
      if(!trenutniUporabnik.personalizacija || trenutniUporabnik.personalizacija === null)
          $scope.forma = {
              "datum_rojstva" : true,
              "kraj_rojstva": true,
              "naslov": true,
              "stevilka_zzzs": true,
              "zdravnik": true,
              "zobozdravnik": true,
              "pregledi": 10,
              "meritve": 10,
              "bolezni": 10,
              "zdravila": 10
          }
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
          updated_user.datum_rojstva = moment($rootScope.uporabnik.datum_rojstva, 'DD.MM.YYYY').toISOString();
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
      updated_kontaktna.sorodstveno_razmerje = $rootScope.uporabnik.kontaktna_oseba.sorodstveno_razmerje;
      updated_kontaktna.telefon = $rootScope.uporabnik.kontaktna_oseba.telefon;
      updated_kontaktna.posta = {
        id: $rootScope.uporabnik.kontaktna_oseba.posta.id,
        kraj: $rootScope.uporabnik.kontaktna_oseba.posta.kraj
      };

      // update kontaktna oseba
      if($rootScope.uporabnik.kontaktna_oseba.id){
        updated_kontaktna.id = $rootScope.uporabnik.kontaktna_oseba.id;
        updated_kontaktna.$update({kontaktnaId: $rootScope.uporabnik.kontaktna_oseba.id}, function(response){
          Notification.success('Kontaktna oseba uspešno posodobljen!!');
        });
      }
      // create kontaktna oseba
      else {
        updated_kontaktna.id = $rootScope.uporabnik.id;
        KontaktnaOseba.save(updated_kontaktna, function(response){
          $rootScope.uporabnik.kontaktna_oseba.id = response.id;
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
                if(data.zdravnik && data.zdravnik === -1)
                    replaceZdravnik(-1);
                if(data.zobozdravnik && data.zobozdravnik === -1)
                    replaceZdravnik(-2);
                if(response.data.zdravnik)
                    replaceZdravnik(response.data.zdravnik);
                if(response.data.zobozdravnik)
                    replaceZdravnik(response.data.zobozdravnik);
                addAlert("Shranjeno", 'success');
            }, function errorCallback(response) {
                addAlert(response.data.error, 'error');
            });
        });
    };

    function replaceZdravnik(nov) {
        var z = $rootScope.uporabnik.zdravnik;
        //Zdravniki array is empty so we just push
        if(!z && nov !== -1 && nov !== -2) {
            $rootScope.uporabnik.zdravnik.push(nov);
            return;
        }
        for(var i=0; i<z.length; i++) {
            //Replace
            if(nov !== -1 && nov !== -2 && (nov.tip !== "zobozdravnik" && z[i].tip !== "zobozdravnik" ||
                                            nov.tip === "zobozdravnik" && z[i].tip === "zobozdravnik" )) {
                $rootScope.uporabnik.zdravnik[i] = nov;
                return;
            } else {    //Delete
                if(nov === -1 && z[i].tip !== "zobozdravnik" || nov === -2 && z[i].tip === "zobozdravnik") {
                    $rootScope.uporabnik.zdravnik.splice(i, 1);
                    return;
                }
            }
        }
        $rootScope.uporabnik.zdravnik.push(nov);
    }

    $scope.deleteAccount = function() {
        var u = $rootScope.uporabnik;
        var _$state = $state;

        Uporabniki.delete({iduporabnik: u.id, password_confirm: $scope.passwordConfirm }).$promise.then(function(msg) {
            addAlert(msg.message, 'info');
            $rootScope.logged_out = true;
            AuthService.logout();
            $state.go('login');
        }, function(error) {
            addAlert(error.data.error, 'error');
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

    $scope.personalizacija = function(forma) {
        personalizacija = new Personalizacija(forma);
        Personalizacija.save(personalizacija).$promise.then(function(personalizacija) {
            $rootScope.uporabnik.personalizacija = personalizacija;
            var user = JSON.parse(window.localStorage.getItem('user'));
            if(user.id === $rootScope.uporabnik.id)
                user.personalizacija = personalizacija;
            else {
                var os = user.oskrbovanci;
                for(o in os) {
                    if(os[o].url.substring(os[o].url.lastIndexOf('/')+1) == $rootScope.uporabnik.id) {
                        os[o].personalizacija = personalizacija;
                        break;
                    }
                }
            }
            window.localStorage.setItem('user', JSON.stringify(user));
            addAlert("Shranjeno", 'success');
        }, function(error) {
            addAlert(error.error, 'error');
        });
    }

    function addAlert(msg, state) {
        Notification({message: msg}, state);
    }

  }]);
