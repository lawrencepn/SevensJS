'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router',
        'myApp.demo-csv',
        'myApp.demo-pdf',
        'myApp.version',
        'sevensjs',
        'countryConstants'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/demo-csv');
    }])
    .run(['sevensjs','CountryConstants', function (sevensjs, CountryConstants) {
    //init site catalyst for tracking and pass country specific profile name
        var conf = {
            country_sacc : CountryConstants.ghana.s_account,
            country_channel : CountryConstants.ghana.channel
        }

        sevensjs.analytics.init(conf)
}]);