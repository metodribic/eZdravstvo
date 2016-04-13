angular.module('tpo.models', ['ngResource', 'config'])

.factory('Uporabniki', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/uporabniki/:iduporabnik', { iduporabnik: '@iduporabnik' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Pregled', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/pregledi/:pregeldId', { pregledId: '@pregledId' }, {
		update: {
			method: 'PUT'
		}
	});
})

.factory('Meritve', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/meritve/:meritevId', { meritevId: '@meritevId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Bolezni', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/bolezni/:bolezenId', { bolezenId: '@bolezenId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Zdravila', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravila/:zdraviloId', { zdraviloId: '@zdraviloId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Diete', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/diete/:dietaId', { dietaId: '@dietaId' }, {
		update: {
			method: 'PUT'
		}
	});
});


