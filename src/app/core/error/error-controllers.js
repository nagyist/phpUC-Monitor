/**
 * This file contains all necessary Angular controller definitions for 'phpucMonitor.core.error' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    /**
     * Controller for generic error handling.
     */
    angular.module('phpucMonitor.core.error')
        .controller('ErrorController',
            function ErrorController(
                $scope, $state,
                _,
                _error
            ) {
                if (_.isUndefined(_error)) {
                    return $state.go('monitor');
                }

                $scope.error = _error;

                // Helper function to change current state to previous one
                $scope.goToPrevious = function goToPrevious() {
                    $state.go($scope.error.fromState.name, $scope.error.fromParams);
                };
            }
        );
}());
