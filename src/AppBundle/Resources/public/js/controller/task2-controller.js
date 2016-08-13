/**
 * Created by fliak on 10.8.16.
 */

app.controllers.task2Controller = function (config) {


    document.querySelector('menu.top').classList.add('hidden');
    document.querySelector('menu.top>li:first-child').style.display = 'none';

    var menu = document.querySelector('menu.top');
    var menuToggle = document.querySelector('#menu-toggle');

    menuToggle.addEventListener('click', function() {
        menu.classList.remove('hidden');
        menuToggle.classList.add('hidden');
    });

    menu.addEventListener('click', function() {
        menuToggle.classList.remove('hidden');
        menu.classList.add('hidden');
    });

    document.body.classList.remove('hidden');

};

app.controllers.task2Controller.depends = ['config'];