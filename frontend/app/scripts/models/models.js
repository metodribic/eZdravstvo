angular.module('tpo.models', ['ngResource'])

.factory('Uporabniki', function($resource) {
	return $resource('http://localhost:8000/uporabniki/:iduporabnik', { iduporabnik: '@iduporabnik' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Pregled', function($resource) {
	return $resource('http://localhost:8000/pregledi/:pregeldId', { pregledId: '@pregledId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Meritve', function($resource) {
	return $resource('http://localhost:8000/meritve/:meritevId', { meritevId: '@meritevId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Bolezni', function($resource) {
	return $resource('http://localhost:8000/bolezni/:bolezenId', { bolezenId: '@bolezenId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Zdravila', function($resource) {
	return $resource('http://localhost:8000/zdravila/:zdraviloId', { zdraviloId: '@zdraviloId' }, {
		update: {
			method: 'PUT'
		}
	});
})


.factory('Diete', function($resource) {
	return $resource('http://localhost:8000/diete/:dietaId', { dietaId: '@dietaId' }, {
		update: {
			method: 'PUT'
		}
	});
});
