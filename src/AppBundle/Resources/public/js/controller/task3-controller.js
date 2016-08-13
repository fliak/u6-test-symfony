/**
 * Created by fliak on 10.8.16.
 */

app.controllers.task3Controller = function (auth, http, config) {

    var btnLogin = document.getElementById('login');
    var btnSave = document.getElementById('save');
    var dataArea = document.getElementById('data');

    var wrapper = document.getElementById('wrapper');

    var changeAuthState = function(state)  {
        if (state.isAuthorized) {
            btnLogin.innerHTML = 'Logout';
            btnLogin.setAttribute('data-state', 'logout');
            dataArea.setAttribute('contenteditable', '');

            btnSave.classList.remove('hidden');
        }
        else    {
            btnLogin.innerHTML = 'Login as Admin';
            btnLogin.setAttribute('data-state', 'login');
            dataArea.removeAttribute('contenteditable');

            btnSave.classList.add('hidden');
        }

        wrapper.classList.remove('hidden');

    };

    auth.isAuthorized().then(changeAuthState, function () {
        alert('Cannot check authorization state')
    });

    http.get(config.dataResourceURL).then(function (response) {

        dataArea.innerHTML = response.data;

    }, function (response) {
        console.error('Cannot load data from server. Server return ', response);
    });


    btnLogin.addEventListener('click', function () {
        if (btnLogin.getAttribute('data-state') === 'logout') {
            auth.logout().then(changeAuthState, function () {
                alert('Logout problem');
            });
        }
        else    {
            auth.login('an_secure_token').then(changeAuthState, function () {
                alert('Authorization problem');
            });
        }
    });

    btnSave.addEventListener('click', function()    {

        http.post(config.dataResourceURL, {
            data: dataArea.innerText
        }).then(function (response) {
            console.log(response)

        }, function (response) {
            console.error('Cannot save data on server. Server return ', response);
        });
    });




};

app.controllers.task3Controller.depends = ['auth', 'http', 'config'];