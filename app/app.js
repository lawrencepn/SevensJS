'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router',
        'myApp.demo-csv',
        'myApp.demo-pdf',
        'myApp.version',
        'sevensjs',
        'nigeriaConstants'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/demo-csv');
    }])
    .run(['sevensjs','NigeriaConstants', function (sevensjs, NigeriaConstants) {
    //init site catalyst for tracking and pass country specific profile name
    sevensjs.analytics.init(NigeriaConstants.s_account)
}]);