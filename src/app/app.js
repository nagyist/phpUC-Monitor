(function() {
    'use strict';

    // Create phpucMonitor module and specify dependencies for that
    angular.module('phpucMonitor', [
        'angular-loading-bar',
        'ngStorage',
        'ui.router',
        'ui.bootstrap'
    ]);

    angular.module('phpucMonitor')
        .config([
            '$stateProvider', '$locationProvider', '$urlRouterProvider',
            'cfpLoadingBarProvider',
            function config(
                $stateProvider, $locationProvider, $urlRouterProvider,
                cfpLoadingBarProvider
            ) {
                // Disable spinner from cfpLoadingBar
                cfpLoadingBarProvider.includeSpinner = false;

                // Yeah we wanna to use HTML5 urls!
                $locationProvider
                    .html5Mode({
                        enabled: true,
                        requireBase: false
                    })
                    .hashPrefix('!');

                // Main state provider for liukko-poc application
                $stateProvider
                    .state('phpucMonitor', {
                        abstract: true,
                        data: {
                            access: 1
                        },
                        views: {
                            header: {
                                templateUrl: '/liukko-poc/core/layout/partials/header.html',
                                controller: 'HeaderController'
                            },
                            footer: {
                                templateUrl: '/liukko-poc/core/layout/partials/footer.html',
                                controller: 'FooterController'
                            }
                        }
                    });

                // For any unmatched url, redirect to /login
                $urlRouterProvider.otherwise('/login');
            }
        ])
}());

