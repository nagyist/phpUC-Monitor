(function() {
    'use strict';

    angular.module('phpucMonitor.monitor', []);

    angular.module('phpucMonitor.monitor')
        .config(
            function state($stateProvider) {
                $stateProvider
                    .state('monitor', {
                        parent: 'phpucMonitor',
                        url: '/monitor',
                        views: {
                            'content@': {
                                templateUrl: '/phpuc-monitor/monitor/partials/index.html',
                                controller: 'MonitorController'
                            }
                        }
                    });
            }
        );
}());
