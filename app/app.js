'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.demo-csv',
  'myApp.demo-pdf',
  'myApp.version',
  'sevensjs'
]).
config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/demo-csv');
}]);
