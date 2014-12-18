(function() {
    'use strict';

    angular.module('phpucMonitor.monitor')
        .controller('MonitorController',
            function ($scope) {
                $scope.foo = 'bar';

                console.log('yeah');
            }
        );
}());
