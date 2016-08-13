/**
 * Created by fliak on 10.8.16.
 */

app.controllers.task1Controller = function (menuControl, config) {

    document.querySelectorAll('li').forEach(function (element) {
        element.addEventListener('mouseover', function(e)    {
            menuControl.open(e.target);
        });

        element.addEventListener('mouseout', function (e) {
            menuControl.close(e.target);
        });
    });

};

app.controllers.task1Controller.depends = ['menuControl', 'config'];