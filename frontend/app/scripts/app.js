'use strict()';

/**
 * @ngdoc overview
 * @name tpo
 * @description
 * # tpo
 *
 * Main module of the application.
 */
angular
  .module('tpo', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.select',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'tpo.services',
    'tpo.models',
    'ui-notification',
    'jkuri.datepicker',
    'nvd3'

  ])
  .config(['$resourceProvider','$stateProvider', '$urlRouterProvider',
      function($resourceProvider, $stateProvider, $urlRouterProvider)  {

    /* Defaut route */
      $urlRouterProvider.otherwise('/domov');

      /* states */
      $stateProvider
          .state('nadzornaPlosca', {
              url: '/domov',
              templateUrl: '../views/nadzornaPlosca.html',
              controller: 'NadzornaPloscaCtrl'
          })

          .state('login', {
              url: '/login',
              templateUrl: '../views/login.html',
              controller: 'LoginCtrl'
          })

          .state('pozabljenoGeslo', {
              url: '/pozabljenoGeslo?email&token',
              templateUrl: '../views/pozabljenoGeslo.html',
              controller: 'PozabljenoGesloCtrl'
          })

          .state('registracijaUporabnikaAdmin', {
            url: '/registracijaAdmin',
            templateUrl: '../views/registracijaUporabnikaAdmin.html',
            controller: 'registracijaUporAdminCtrl'
          })

          .state('urejanjeZdravilAdmin', {
            url: '/zdravilaAdmin',
            templateUrl: '../views/urejanjeZdravilAdmin.html',
            controller: 'urejanjeZdravilAdminCtrl'
          })

           .state('listPregledov', {
            url: '/listPregledov',
            templateUrl: '../views/listPregledov.html',
            controller: 'ListPregledovCtrl'
          })

          .state('pregledPodrobno', {
            url: '/pregledPodrobno/:id',
            templateUrl: '../views/pregledPodrobno.html',
            controller: 'PregledPodrobnoCtrl'
          })

          .state('register', {
            url: '/register',
            templateUrl: '../views/register.html',
            controller: 'registerCtrl'
          })

          .state('logout', {
              url: '/logout',
              templateUrl: '../views/login.html',
              controller: 'LoginCtrl'
          })

          .state('profile', {
              url: '/profile',
              templateUrl: '../views/profile.html',
              controller: 'ProfileCtrl'
          })

          .state('prijavaPregled', {
              url: '/prijavaPregled',
              templateUrl: '../views/prijavaPregled.html'
          })

          .state('meritve', {
              url: '/meritve',
              templateUrl: '../views/meritve.html',
              controller: 'MeritveCtrl'
          })

          .state('meritevPodrobno', {
              url: '/meritev:id',
              templateUrl: '../views/meritevPodrobno.html',
              controller: 'MeritevPodrobnoCtrl'
          })

          .state('dodajMeritev', {
              url: '/dodajMeritev',
              templateUrl: '../views/dodajMeritev.html',
              controller: 'dodajMeritevCtrl'
          })

          .state('urediVrednostiMeritev', {
              url: '/urediVrednostiMeritev',
              templateUrl: '../views/urediVrednostiMeritev.html',
              controller: 'UrediVrednostiMeritevCtrl'
          })

          .state('dodajPregled', {
              url: '/dodajpregled',
              templateUrl: '../views/dodajPregled.html',
              controller: 'DodajPregledCtrl'
          });
  }])


    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 10,
            startRight: 10,
            verticalSpacing: 10,
            horizontalSpacing: 10,
            // positionX: 'center',
            positionY: 'top'
        });
    })

  .run(function ($rootScope, $state, AuthService, Uporabniki, Notification, $http, $route) {

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        if (toState.url !== '/login' && toState.url !== '/forgotPassword' && toState.url !== '/register' && toState.name !== 'pozabljenoGeslo' && !AuthService.isAuthenticated()){
          // User isn’t authenticated
          $state.go("login");
          event.preventDefault();
        }

        if(fromState.url === '/profile' && toState.url !== '/logout'){
          if(!$rootScope.uporabnik.ime || !$rootScope.uporabnik.priimek){
            Notification.warning({message: 'Za nadaljevanje izpolnite profil!', title: '<b>Opozorilo!</b>'});
            event.preventDefault();
          }
        }

        if(AuthService.isAuthenticated()) {
            if(!$rootScope.user) {
                $rootScope.user = AuthService.getCurrentUser();
                $rootScope.uporabnik = AuthService.getCurrentUser();
            }
            if(!$rootScope.profili) {
              $rootScope.profili = [$rootScope.user];
              $rootScope.profili = $rootScope.profili.concat($rootScope.uporabnik.oskrbovanci);
              $rootScope.selected = { value: $rootScope.profili[0].ime + " " + $rootScope.profili[0].priimek };
            }
          // check if admin and set link correctly
          if( $rootScope.user.role.naziv === "Admin" ){
            $rootScope.isSuperU = true;
          }else{
            $rootScope.isSuperU = false;
          }
          if( $rootScope.user.role.naziv === "Zdravnik"  ){
            $rootScope.isDoctor = true;
          }else{
            $rootScope.isDoctor = false;
          }
        } else {
            delete $rootScope.profili;
        }
      });

    $rootScope.changeUser = function(item, model) {
        var id = item.id;
        if(!id) {
            //For some stupid reason there is no oskrbovanec id
            id = item.url.substring(item.url.lastIndexOf('/')+1);
            item.id = id;
        }
        $rootScope.uporabnik = item;

        // če preglejujemo oskrbovanca, izriši opozorilo
        if(item.id != $rootScope.user.id)
          $rootScope.oskrbovanecAlert = true;
        else
          $rootScope.oskrbovanecAlert = false;


        $http.defaults.headers.common.pacient = id;
        $rootScope.selected = { value: item.ime + " " + item.priimek };

        // zračunaj id od pošte od oskrbovanca
        if($rootScope.uporabnik.posta !== null && $rootScope.uporabnik.posta.id === undefined){
          $rootScope.uporabnik.posta.id = $rootScope.uporabnik.posta.url.substring($rootScope.uporabnik.posta.url.length - 4);
          $rootScope.uporabnik.posta.id = parseInt($rootScope.uporabnik.posta.id);
        }

        // zračunaj id od kontaktne osebe oskrbovanca
        if($rootScope.uporabnik.kontaktna_oseba !== null && !$rootScope.uporabnik.kontaktna_oseba.id && $rootScope.uporabnik.kontaktna_oseba.url){
            var a = $rootScope.uporabnik.kontaktna_oseba;
            a.id = a.url.substring(a.url.lastIndexOf('/')+1);
        }

        // zračunaj id od pošte za kontaktna_oseba od oskrbovanca
        if($rootScope.uporabnik.kontaktna_oseba !== null && $rootScope.uporabnik.kontaktna_oseba.posta !== null && $rootScope.uporabnik.kontaktna_oseba.posta.id === undefined){
          $rootScope.uporabnik.kontaktna_oseba.posta.id = $rootScope.uporabnik.kontaktna_oseba.posta.url.substring($rootScope.uporabnik.kontaktna_oseba.posta.url.length - 4);
          $rootScope.uporabnik.kontaktna_oseba.posta.id = parseInt($rootScope.uporabnik.kontaktna_oseba.posta.id);
        }

        //  preveri če ima profil, če ne ga prisli da ga ustvari
        if($rootScope.selected.value == " "){
          Notification.warning({message: 'Za nadaljevanje izpolnite profil!', title: '<b>Opozorilo!</b>'});
          $state.go('profile');
        }
        else
          $state.reload();
    };
  });
