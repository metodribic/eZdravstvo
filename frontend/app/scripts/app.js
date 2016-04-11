'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
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


  .config(['$resourceProvider','$stateProvider', '$urlRouterProvider',
      function($resourceProvider, $stateProvider, $urlRouterProvider)  {
    /* Defaut route */
    $urlRouterProvider.otherwise('/domov');


    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;


      /* states */
    $stateProvider
      .state('nadzornaPlosca', {
        url: '/domov',
        templateUrl: '../views/nadzornaPlosca.html',
        controller: 'NadzornaPloscaCtrl'
      });


    $stateProvider
      .state('registracijaUporabnikaAdmin', {
        url: '/registracijaAdmin',
        templateUrl: '../views/registracijaUporabnikaAdmin.html',
        controller: 'registracijaUporAdminCtrl'
      });


  }]);
