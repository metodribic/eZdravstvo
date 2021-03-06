angular.module('tpo.models', ['ngResource', 'config'])

.factory('Uporabniki', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/uporabniki/:iduporabnik', { iduporabnik: '@iduporabnik' }, {
		update: {
			method: 'PATCH'
		},
        delete: {
			method: 'DELETE'
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


.factory('DodajPregled', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/ustvariPregled', {
		update: {
			method: 'POST'
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
			method: 'PATCH'
		}
	});
})

.factory('VrednostiMeritevSeznam', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/vrednosti_meritev/seznam');
})

.factory('VrednostiMeritev', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/vrednosti_meritev/:meritevId', { meritevId: '@meritevId' }, {
		update: {
			method: 'PATCH'
		}
	});
})

.factory('Ustanova', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/ustanova/:ustanovaId', { ustanovaId: '@ustanovaId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})

.factory('Personalizacija', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/personalizacija', {
	});
})

.factory('RegistracijaUporAdmin', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/registracijaAdmin', {
		update: {
			method: 'PUT'
		}
	});
})

.factory('UrejanjeZdravilAdmin', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravilaAdmin', {
		update: {
			method: 'PUT'
		}
	});
})

.factory('RegistracijaPacient', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/registracijaPacient', {
	});
})

.factory('Osebje', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/osebje/:osebjeId',{ osebjeId: '@osebjeId'}, {
		update: {
			method: 'PATCH'
		}
	});
})

.factory('Ambulanta', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/ambulanta/:ambulantaId',{ ambulantaId: '@ambulantaId'}, {
		update: {
			method: 'PUT'
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


.factory('BolezniSeznam', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/bolezni/seznam', { bolezenId: '@bolezenId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})


.factory('BrisiBolezniClanek', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/bolezni/brisiClanek', { bolezenId: '@bolezenId' }, {
		update: {
			method: 'PATCH'
		}
	});
})

.factory('DodajBolezniClanek', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/bolezni/dodajClanek', { bolezenId: '@bolezenId' }, {
		update: {
			method: 'PATCH'
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

.factory('ZdravilaSeznam', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravila/seznam', {
		update: {
			method: 'UPDATE'
		}
	});
})

.factory('BrisiZdraviluClanek', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravila/brisiClanekZdravilo', { zdraviloId: '@zdraviloId' }, {
		update: {
			method: 'PATCH'
		}
	});
})

.factory('DodajZdraviluClanek', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravila/dodajClanekZdravilo', { zdraviloId: '@zdraviloId' }, {
		update: {
			method: 'PATCH'
		}
	});
})

.factory('Zdravnik', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/zdravnik/:zdravnikId', { zdravnikId: '@zdravnikId' }, {
		update: {
			method: 'PATCH'
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

.factory('KontaktnaOseba', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/kontaktna_oseba/:kontaktnaId', { kontaktnaId: '@kontaktnaId' }, {
		update: {
			method: 'PATCH'
		}
	});
})


.factory('SifrantRegistriranih', function($resource, API_URL) {
    return $resource('http://' + API_URL + '/sifrant_registriranih/:sifraId', { sifraId: '@sifraId' }, {
        update: {
            method: 'PATCH'
        }
    });
})


.factory('Diete', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/diete/:dietaId', { dietaId: '@dietaId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})

.factory('DieteSeznam', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/diete/seznam', { dietaId: '@dietaId' }, {
		update: {
			method: 'UPDATE'
		}
	});
})

.factory('BrisiDietiClanek', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/diete/brisiClanekDieta', { dietaId: '@dietaId' }, {
		update: {
			method: 'PATCH'
		}
	});
})

.factory('DodajDietiClanek', function($resource, API_URL) {
	return $resource('http://' + API_URL + '/diete/dodajClanekDieta', { dietaId: '@dietaId' }, {
		update: {
			method: 'PATCH'
		}
	});
});
