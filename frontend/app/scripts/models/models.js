angular.module('tpo.models', ['ngResource', 'config'])

.factory('Uporabniki', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/uporabniki/:iduporabnik', { iduporabnik: '@iduporabnik' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Pregled', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/pregledi/:pregledId', { pregledId: '@pregledId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('Posta', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/posta/:postaId', { postaId: '@postaId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('Meritve', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/meritve/:meritevId', { meritevId: '@meritevId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})

.factory('RegistracijaUporAdmin', function($resource) {
	return $resource('http://localhost:8000/registracijaAdmin', {
		update: {
			method: 'POST'
		}
	});
})


.factory('Bolezni', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/bolezni/:bolezenId', { bolezenId: '@bolezenId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('Zdravila', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravila/:zdraviloId', { zdraviloId: '@zdraviloId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('Zdravnik', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravnik/:zdravnikId', { zdravnikId: '@zdravnikId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('ZdravnikoviPacienti', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravnik_uporabniki', { pacientId: '@pacientId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('Diete', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/diete/:dietaId', { dietaId: '@dietaId' }, {
		update: {
			method: 'UPDATE'
		}
	});
});
