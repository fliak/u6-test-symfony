/**
 * Created by fliak on 12.8.16.
 */

app.services.auth = function (http, promise, config) {

    /**
     * Private property
     */
    var isAuthorized;
    
    var publicInterface = {
        login: function (secureToken) {
            return http.post(config.loginURL, {
                token: secureToken
            }).then(function (response) {
                console.log('success', response);
                isAuthorized = true;
            }, function (response) {
                console.error('Login error: ', response);
            })
        },
        logout: function()  {
            return http.post(config.logoutURL).then(function (response) {
                console.log('success', response);
                isAuthorized = false;
            }, function (response) {
                isAuthorized = false;
                console.error('Logout error: ', response);
            })            
        },
        checkState: function () {
            return http.get(config.loginCheckURL).then(function (response) {
                
                isAuthorized = Boolean(response.isAuthorized);
                
            }, function (response) {
                console.error('Authorization error: ', response);
            })
        },

        /**
         * Getter for private property
         * @returns {boolean}
         */
        isAuthorized: function () {
            if (isAuthorized === undefined) {
                return this.checkState();
            }
            else    {
                var defer = promise.defer();
                defer.resolve({
                    isAuthorized: isAuthorized
                });
                
                return defer.promise;
            }
        }
        
    };

    //make check on startup
    publicInterface.checkState();
    
    return publicInterface;
};