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
    'daterangepicker'

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

          .state('registracijaUporabnikaAdmin', {
            url: '/registracijaAdmin',
            templateUrl: '../views/registracijaUporabnikaAdmin.html',
            controller: 'registracijaUporAdminCtrl'
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

        if (toState.url !== '/login' && toState.url !== '/forgotPassword' && toState.url !== '/register' && !AuthService.isAuthenticated()){
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
        $http.defaults.headers.common.pacient = id;
        $rootScope.selected = { value: item.ime + " " + item.priimek };
        $state.reload();
    };
  });
