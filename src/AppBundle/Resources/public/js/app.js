/**
 * Created by fliak on 10.8.16.
 */

var app = {
    config: {
        menuURL: '/menu',
        loginURL: '/login',
        logoutURL: '/logout',
        loginCheckURL: '/login-check',
        dataResourceURL: '/data'
    },
    
    controllers: {},
    services: {},
    
    compiled: {},
    
    callController: function (controllerName) {
        if (this.controllers[controllerName] === undefined)  {
            throw "Controller " + controllerName + " is missing";
        }
        
        var ctrl = this.controllers[controllerName];
        var depends = ctrl.depends || [];
        
        var args = [];
        depends.forEach(function(element)  {
            if (app.compiled[element] === undefined)    throw 'Unknow dependency "' + element + '"';
            args.push(app.compiled[element]);
        });
        
        ctrl.apply(this, args)
    },
    
    bootstrap: function () {
        
        //build app manually
        
        this.compiled.config = this.config;
        
        this.compiled.promise = new this.services.promise();
        this.compiled.http = new this.services.http(app.compiled.promise);
        this.compiled.timer = new this.services.timer();

        if (this.services.menuBuilder) {
            this.compiled.menuBuilder = new this.services.menuBuilder();
        }
        
        if (this.services.menuControl)  {
            this.compiled.menuControl = new this.services.menuControl(this.compiled.timer);
        }
        
        if (this.services.auth)  {
            this.compiled.auth = new this.services.auth(this.compiled.http, this.compiled.promise, this.compiled.config);
        }
        

    }
    
};




window.addEventListener('load', function()  {
    app.bootstrap();
    
    var controllerName = document.body.getAttribute('controller');
    
    if (!controllerName) return;
    
    app.callController(controllerName)
    
});