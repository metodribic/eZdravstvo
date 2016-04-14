'use strict';

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
    'tpo.models'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider)  {
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

  .run(function ($rootScope, $state, AuthService, Uporabniki) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        // console.log('changing state');
        // console.log(AuthService.isAuthenticated());
        if (toState.url !== '/login' && toState.url !== '/forgotPassword' && !AuthService.isAuthenticated()){
          // User isn’t authenticated
          $state.go("login");
          event.preventDefault();
        }
        if(AuthService.isAuthenticated() && !$rootScope.uporabnik) {
          $rootScope.uporabnik = AuthService.getCurrentUser();
        }
      });
  });
