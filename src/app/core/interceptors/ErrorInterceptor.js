/**
 * Interceptor for $http request to handle possible errors and show that error to user automatic. Message is shown by
 * application 'Message' service which uses toastr library.
 */
(function() {
    'use strict';

    angular.module('phpucMonitor.core.interceptors')
        .factory('ErrorInterceptor',
            function($q, $injector) {
                return {
                    /**
                     * This method is called before $http sends the request to the backend, so you can modify the
                     * configurations and make other actions. This function receives the request configuration object
                     * as a parameter and has to return a configuration object or a promise. Returning an invalid
                     * configuration object or promise that will be rejected, will make the $http call to fail.
                     *
                     * @param   {{
                     *              method: '{string}',
                     *              url: '{string}',
                     *              params: '{Object.<string|Object>}',
                     *              data: '{string|Object}',
                     *              headers: '{Object}',
                     *              xsrfHeaderName: '{string}',
                     *              xsrfCookieName: '{string}',
                     *              transformRequest: '{function(data, headersGetter)|Array.<function(data, headersGetter)>}',
                     *              transformResponse: '{function(data, headersGetter, status)|Array.<function(data, headersGetter, status)>}',
                     *              cache: '{boolean|Cache}',
                     *              timeout: '{number|Promise}',
                     *              withCredentials: '{boolean}',
                     *              responseType: '{string}'
                     *          }}  config  Configuration object for current request
                     *
                     * @returns {*|Promise}
                     */
                    request: function requestCallback(config) {
                        var deferred = $q.defer();

                        // Initialize config object
                        config = config || {};
                        config.headers = config.headers || {};

                        // Set default timeout for request
                        config.timeout = 3000;

                        deferred.resolve(config);

                        return deferred.promise;
                    },

                    /**
                     * This method is called right after $http receives the response from the backend, so you can
                     * modify the response and make other actions. This function receives a response object as a
                     * parameter and has to return a response object or a promise. The response object includes the
                     * request configuration, headers, status and data that returned from the backend. Returning an
                     * invalid response object or promise that will be rejected, will make the $http call to fail.
                     *
                     * @param   {{}|Promise}   response
                     *
                     * @returns {*|Promise}
                     */
                    response: function responseCallback(response) {
                        var deferred = $q.defer();

                        deferred.resolve(response);

                        return deferred.promise;
                    },

                    /**
                     * Sometimes a request can’t be sent or it is rejected by an interceptor. Request error interceptor
                     * captures requests that have been canceled by a previous request interceptor. It can be used in
                     * order to recover the request and sometimes undo things that have been set up before a request,
                     * like removing overlays and loading indicators, enabling buttons and fields and so on.
                     *
                     * @param   {{}|Promise}    rejection
                     *
                     * @returns {*|Promise}
                     */
                    requestError: function requestError(rejection) {
                        return $q.reject(rejection);
                    },

                    /**
                     * Sometimes our backend call fails. Other times it might be rejected by a request interceptor or
                     * by a previous response interceptor. In those cases, response error interceptor can help us to
                     * recover the backend call.
                     *
                     * @param   {*|Promise}    rejection
                     *
                     * @returns {*|Promise}
                     */
                    responseError: function responseErrorCallback(rejection) {
                        var message = '';
                        var title ='';

                        // We have some data on rejection
                        if (rejection.data) {
                            if (rejection.data.error) {
                                message = rejection.data.error;
                            } else if (rejection.data.message) {
                                message = rejection.data.message;

                                if (rejection.data.title) {
                                    title = rejection.data.title;
                                }
                            } else {
                                if (typeof rejection.data === 'string') {
                                    message = rejection.data;
                                } else if (rejection.statusText) {
                                    message = rejection.statusText;
                                } else {
                                    message = $injector.get('HttpStatus').getStatusCodeText(rejection.status);
                                }

                                title = 'HTTP status ' + rejection.status;
                            }
                        } else if (rejection.status === 0) {
                            title = 'Request timeout';
                            message = rejection.config.url;
                        } else {
                            if (rejection.statusText) {
                                message = rejection.statusText;
                            } else {
                                message = $injector.get('HttpStatus').getStatusCodeText(rejection.status);
                            }

                            title = 'HTTP status ' + rejection.status;
                        }

                        // We want to show error message
                        if (message && !rejection.config.noErrorMessage) {
                            $injector.get('MessageService').error(message, title);
                        }

                        return $q.reject(rejection);
                    }
                };
            }
        );
}());
