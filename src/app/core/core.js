/**
 * Angular module for 'phpucMonitor.core' component. This component is divided to following logical components:
 *
 *  phpucMonitor.core.components
 *  phpucMonitor.core.directives
 *  phpucMonitor.core.error
 *  phpucMonitor.core.interceptors
 *  phpucMonitor.core.layout
 *  phpucMonitor.core.libraries
 *  phpucMonitor.core.services
 *
 * Each core component has it own module initialize.
 */
(function() {
    'use strict';

    angular.module('phpucMonitor.core', [
        'phpucMonitor.core.components',
        'phpucMonitor.core.directives',
        'phpucMonitor.core.error',
        'phpucMonitor.core.interceptors',
        'phpucMonitor.core.layout',
        'phpucMonitor.core.libraries',
        'phpucMonitor.core.services'
    ]);
}());
