angular.module('tpo.services', ['ngResource', 'config'])

.service('AuthService', function($q, $http, $rootScope, Uporabniki, API_URL) {
  var LOCAL_TOKEN_KEY = 'token';
  var LOCAL_USER_KEY = 'user';
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
 
  function storeUser(token, user) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = 'Token ' + token;
  }
 
  function destroyUser() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_USER_KEY);
  }

  var getCurrentUser = function() {
   return JSON.parse(window.localStorage.getItem(LOCAL_USER_KEY));
  };
 
    var login = function(email, pass) {
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'http://' + API_URL + '/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {"email": email, "password": pass}
            }).then(function successCallback(response) {
                if(response.data.uporabnik) {
                    $rootScope.uporabnik = response.data.uporabnik;
                    storeUser(response.data.token, response.data.uporabnik);
                }
                else if(response.data.zdravnik) {
                    $rootScope.uporabnik = response.data.zdravnik;
                    storeUser(response.data.token, response.data.zdravnik);
                }
                resolve('Login success.');
            }, function errorCallback(response) {
                reject(response.data.error);
            });
        });
    };
 
  var logout = function() {
    destroyUser();
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
    getCurrentUser: getCurrentUser
  };
});
