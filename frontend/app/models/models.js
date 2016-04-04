angular.module('tpo.services', [])

.factory('Uporabniki', function($resource) {
	return $resource('http://localhost:8000/uporabniki/:iduporabnik', { iduporabnik: '@iduporabnik' }, {
    isArray: true,
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
});
