'use strict';

angular.module('wordsApp', [
  'wordsApp.services',
  'wordsApp.directives',
  'wordsApp.home',
  'ui.router'
  ]).
  config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
  });