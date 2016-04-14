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
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'tpo.services',
    'tpo.models'
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
          }).state('registracijaUporabnikaAdmin', {
        url: '/registracijaAdmin',
        templateUrl: '../views/registracijaUporabnikaAdmin.html',
        controller: 'registracijaUporAdminCtrl'
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
          console.log($rootScope.uporabnik);
        } 
      });
  });