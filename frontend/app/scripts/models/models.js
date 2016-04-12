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
