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

  .run(function ($rootScope, Uporabniki) {
    Uporabniki.get({iduporabnik: 1}).$promise.then(function(response){
      /* shrani uporabnika v $scope, da lahk dostopaš v view do njega */
      $rootScope.uporabnik = response;
      console.log($rootScope.uporabnik);
    })
  });
