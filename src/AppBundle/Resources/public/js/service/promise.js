/**
 * Created by fliak on 10.8.16.
 */

app.services.promise = function()   {
    
    var q = function()  {

        var deferred = {
            state: 'wait',
            data: null,
            
            resolveListeners: [],
            rejectListeners: [],
            
            resolve: function(data) {
                var i;
                
                this.state = 'resolved';
                this.data = data;
                
                for (i = 0; i < this.resolveListeners.length; i++)  {
                    this.resolveListeners[i].call(this, this.data);
                }
            },
            
            reject: function (data) {
                var i;

                this.state = 'rejected';
                this.data = data;

                for (i = 0; i < this.rejectListeners.length; i++)  {
                    this.rejectListeners[i].call(this, this.data);
                }
            },
            
            promise: {
                then: function(fnSucc, fnFail)    {
                    deferred.resolveListeners.push(fnSucc);
                    deferred.rejectListeners.push(fnFail);

                    return deferred.promise;
                }
            }
        };

        return deferred;
    };
    
    
    return {
        defer: function()   {
            return new q();
        }
    };
};
