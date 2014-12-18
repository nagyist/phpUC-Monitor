// Main angular application definition.
(function() {
    'use strict';

    // Create phpucMonitor module and specify dependencies for that
    angular.module('phpucMonitor', [
        'angular-loading-bar',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'toastr',
        'phpuc-monitor',
        'phpucMonitor.core',
        'phpucMonitor.monitor'
    ]);

    // Application configuration
    angular.module('phpucMonitor')
        .config(
            function config(
                $stateProvider, $locationProvider, $urlRouterProvider,
                cfpLoadingBarProvider, toastrConfig
            ) {
                // Disable spinner from cfpLoadingBar
                cfpLoadingBarProvider.includeSpinner = false;

                // Extend default toastr configuration with application specified configuration
                angular.extend(
                    toastrConfig,
                    {
                        allowHtml: true,
                        closeButton: true,
                        extendedTimeOut: 3000
                    }
                );

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
                        views: {
                            header: {
                                templateUrl: '/phpuc-monitor/core/layout/partials/header.html',
                                controller: 'HeaderController'
                            },
                            footer: {
                                templateUrl: '/phpuc-monitor/core/layout/partials/footer.html',
                                controller: 'FooterController'
                            }
                        }
                    });

                // For any unmatched url, redirect to /monitor
                $urlRouterProvider.otherwise('/monitor');
            }
        );

    // Application run configuration
    angular.module('phpucMonitor')
        .run(
            function($rootScope, $state, $injector) {
                $rootScope.$on('$stateChangeError', function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
                    event.preventDefault();

                    // Show "generic" error message
                    $injector.get('MessageService')
                        .error('Error loading the page');

                    // Set new error object to error state
                    $state.get('error').error = {
                        event: event,
                        toState: toState,
                        toParams: toParams,
                        fromState: fromState,
                        fromParams: fromParams,
                        error: error
                    };

                    // This is needed for error page reloads
                    $rootScope.error = $state.get('error').error;

                    return $state.go('error');
                });
            }
        );
}());
