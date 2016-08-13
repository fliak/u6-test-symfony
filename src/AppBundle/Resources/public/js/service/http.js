/**
 * Created by fliak on 10.8.16.
 */


app.services.http = function(promise)  {

    var parseResponse = function(xhr)   {
        var cType = xhr.getResponseHeader('Content-Type');

        var response;

        switch (true)   {
            case /application\/json/.test(cType):
                response = JSON.parse(xhr.responseText);

                break;

            default:
                response = xhr.responseText;

                break;
        }

        return response;

    };


    return {

        get: function(url)  {
            return this.request(url, 'GET');
        },
        post: function(url, data)   {
            return this.request(url, 'POST', {
                payload: data
            })
        },
        request: function(url, method, options)  {
            options = options || {};
            var defer = promise.defer();
            
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function() {
                var parsedResponse = parseResponse(xhr);
                
                if (xhr.status >= 200 && xhr.status < 300) {
                    defer.resolve(parsedResponse, xhr);
                }
                else {
                    defer.reject(parsedResponse, xhr);
                }
            };

            switch (true)   {
                case options.payload === undefined:
                    xhr.send();

                    break;

                case typeof options.payload === 'object':
                    var payload = JSON.stringify(options.payload);

                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(payload);

                    break;

                default:
                case typeof options.payload === 'string':
                    xhr.send(String(payload));

                    break;


            }



            return defer.promise;
        }
    }
};