angular.module('tpo.services', ['ngResource'])

.service('AuthService', function($q, $http, $rootScope, Uporabniki) {
  var LOCAL_TOKEN_KEY = 'token';
  var LOCAL_USERID_KEY = 'userId';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token, id) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(LOCAL_USERID_KEY, id);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = 'Token ' + token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_USERID_KEY);
  }

  var getCurrentUserId = function() {
   return window.localStorage.getItem(LOCAL_USERID_KEY);
  };

    var login = function(email, pass) {
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'http://localhost:8000/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {"email": email, "password": pass}
            }).then(function successCallback(response) {
                $rootScope.uporabnik = response.data.uporabnik;
                console.log(response.data.uporabnik);
                storeUserCredentials(response.data.token, response.data.uporabnik.id);
                resolve('Login success.');
            }, function errorCallback(response) {
                console.log(response.data);
                reject(response.data.error);
            });
        });
    };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;},
    getCurrentUserId: getCurrentUserId
  };
});
