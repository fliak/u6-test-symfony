/**
 * Created by fliak on 11.8.16.
 */


app.services.timer = function()   {
    var timer = function(fn, timeout)  {
        
        var canceled = false;
        
        setTimeout(function()   {
            
            if (canceled) return;
            fn();
            
        }, timeout);
        
        return {
            
            cancel: function () {
                canceled = true;
            }
            
            
        }
    };
    
    
    return {
        start: function (fn, timeout) {
            return new timer(fn, timeout);
        }
    }
};