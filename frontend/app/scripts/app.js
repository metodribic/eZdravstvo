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
    'ui-notification'
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
            controller: 'PregledPodrobnoCtrl',
            resolve:   {
                pregled: function($stateParams, Pregled) {
                    return Pregled.Pre
                }
            }
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


  .run(function ($rootScope, $state, AuthService, Uporabniki, Notification) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        if (toState.url !== '/login' && toState.url !== '/forgotPassword' && !AuthService.isAuthenticated()){
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

        if(AuthService.isAuthenticated() && !$rootScope.uporabnik) {
          $rootScope.uporabnik = AuthService.getCurrentUser();
        }
      });

  });
