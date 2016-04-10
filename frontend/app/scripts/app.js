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
    'tpo.services'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider)  {
    /* Defaut route */
      $urlRouterProvider.otherwise('/login');
          
      /* states */
      $stateProvider
          .state('nadzornaPlosca', {
              url: '/domov',
              templateUrl: '../views/nadzornaPlosca.html',
              controller: 'NadzornaPloscaCtrl'
          }).state('login', {
              url: '/login',
              templateUrl: '../views/login.html',
              controller: 'LoginCtrl'
          });
  }])

    .constant("API", {
        "url": "http://localhost:8000",
    })

  .run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        console.log('changing state');
        console.log(AuthService.isAuthenticated());
        if (toState.url !== '/login' && toState.url !== '/forgotPassword' && !AuthService.isAuthenticated()){
          // User isn’t authenticated
          $state.transitionTo("/login");
          event.preventDefault(); 
        }
      });
  });
