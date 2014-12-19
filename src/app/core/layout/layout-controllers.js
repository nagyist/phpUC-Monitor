/**
 * This file contains all necessary Angular controller definitions for 'phpucMonitor.core.layout' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    angular.module('phpucMonitor.core.layout')
        .controller('HeaderController',
            function($scope) {
                $scope.openSettings = function openSettings() {
                    console.log('open settings model');
                };
            }
        );

    angular.module('phpucMonitor.core.layout')
        .controller('FooterController',
            function($scope) {
            }
        );
}());
