var app = angular.module('app', ['ui.router', 'ngAnimate']);

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
            templateUrl: '/pages/collector-form-keywords.html'
        })

        .state('collector-form.search-parameters', {
            url: '/parameters',
            templateUrl: '/pages/collector-form-search-parameters.html'
        })

    ;




});
