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
    $urlRouterProvider.otherwise('/domov');

    /* states */
    $stateProvider
      .state('nadzornaPlosca', {
        url: '/domov',
        templateUrl: '../views/nadzornaPlosca.html',
        controller: 'NadzornaPloscaCtrl'
      });
  }])

  .run(function ($rootScope) {
      $rootScope.uporabnik = {
        id : 1
      };
  });
