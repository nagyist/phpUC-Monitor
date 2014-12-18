/**
 * Angular module 'phpucMonitor.core.error' initialize. This will handle all application errors and shows those to
 * users. This module will be used whenever $stateChangeError is triggered.
 */
(function() {
    'use strict';

    // Initialize module
    angular.module('phpucMonitor.core.error', []);

    // Module configuration
    angular.module('phpucMonitor.core.error')
        .config(
            function state($stateProvider) {
                $stateProvider
                    .state('error', {
                        parent: 'phpucMonitor',
                        url: '/error',
                        views: {
                            'content@': {
                                templateUrl: '/phpuc-monitor/core/error/partials/index.html',
                                controller: 'ErrorController',
                                resolve: {
                                    _error: function resolve() {
                                        return this.self.error;
                                    }
                                }
                            }
                        }
                    });
            }
        );
}());
