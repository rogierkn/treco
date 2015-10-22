var app = angular.module('app', ['ui.router', 'ngAnimate']);

app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({enabled:true,requireBase:false});

    $urlRouterProvider.otherwise("/home");

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: '/pages/home.html'
        })

        .state('collector-form', {
            url: '/collector',
            templateUrl: '/pages/collector-form.html'
        })

        .state('collector-form.keywords', {
            url: '/keywords',
            templateUrl: '/pages/collector-form/keywords.html'
        })

        .state('collector-form.searchParameters', {
            url: '/parameters',
            templateUrl: '/pages/collector-form/search-parameters.html'
        })

        .state('collector-form.filterRules', {
            url: '/filters',
            templateUrl: '/pages/collector-form/filters.html'
        })

        .state('collector-form.customFilters', {
            url: '/filters/custom',
            templateUrl: '/pages/collector-form/custom-filters.html'
        })

        .state('collector-form.categories', {
            url:  '/categories',
            templateUrl: '/pages/collector-form/categories.html'
        })

        .state('collector-form.markup', {
            url: '/markup',
            templateUrl: '/pages/collector-form/markup.html'
        })

        .state('collector-form.status', {
            url: '/status',
            templateUrl: '/pages/collector-form/status.html'
        })

        .state('collector-form.results', {
            url: '/results',
            templateUrl: '/pages/collector-form/results.html'
        })

    ;




});
