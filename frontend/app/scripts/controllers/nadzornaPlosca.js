'use strict()';

/* Contorller za nadzorno ploščo

 Podatki so grupirani v več skupin:
    osebni podatki, 👍
    podatki o izbranem osebnem zdravniku in zobozdravniku ter njunih medicinskih sestrah, 👍
    podatki o opravljenih pregledih, 👍
    podatki o boleznih,👍
    podatki o alergijah,👍
    podatki o dietah,👍
    podatki o zdravilih,👍
    podatki o meritvah, 👍
    podatki o naslednjih pregledih,👍
    možnost naročanja na preglede. TODO:TO SE DOPIŠE, ČE SE IMPLEMENTIRA KASNEJE NAROČANJE
    V primeru velike količine podatkov se izpiše samo nekaj zadnjih/najnovejših/trenutno aktualnih (npr. zadnjih 5 pregledov).
*/

angular.module('tpo')
  .controller('NadzornaPloscaCtrl', ['$scope','$state','Uporabniki','$rootScope','AuthService',
      'Pregled','Meritve','Bolezni','Zdravila','Diete', 'ZdravnikoviPacienti', '$http', 'NgTableParams', '$filter',
      function ($scope,$state, Uporabniki, $rootScope, AuthService, Pregled,
                Meritve, Bolezni, Zdravila, Diete, ZdravnikoviPacienti, $http, NgTableParams, $filter ) {

      mojScope = $scope;

      /* če ni prijavlen ga dej na login*/
      if(!$scope.uporabnik)
          $state.go("login");

      mojScope.jeZdravnik = {};
      mojScope.jeZdravnik.placeholderBes = "Nalagam paciente...";
      mojScope.jeZdravnik.nimaPac = true;   // disable


      zdravnikoviPacientiNalozeni = false;

      $scope.posodobiPacienta = function (uporabnikZdravnika) {

          // request for pacient's, then allow choice of 'em
          if( zdravnikoviPacientiNalozeni ){

              clearData();
              if(  angular.isUndefined(uporabnikZdravnika) || angular.isUndefined(uporabnikZdravnika.ime) || uporabnikZdravnika.ime === "" ){
                  // ni pacienta
                  mojScope.izbranPacient = false;

              }else {
                  mojScope.izbranPacient = true;
                  // dobi pacienta ki smo ga izbrali
                  mojScope.uporabnik = uporabnikZdravnika;
                  mojScope.bolezni = uporabnikZdravnika.bolezni;
                  mojScope.diete = uporabnikZdravnika.dieta;
                  mojScope.zdravila = uporabnikZdravnika.zdravila;
                  // zamenjejmo userja

                  var id = uporabnikZdravnika.id;
                  if(!id) {
                      //For some stupid reason there is no oskrbovanec id
                      id = item.url.substring(item.url.lastIndexOf('/')+1);
                      item.id = id;
                  }
                  $http.defaults.headers.common.pacient = id;
                  $rootScope.izbraniUporabId = id;

                  Meritve.get({limit:5}).$promise.then(function (response) {
                      mojScope.meritve = response.results;
                  });

                  Pregled.get({limit:5}).$promise.then(function (response) {
                      mojScope.pregledi = response.results;
                  });


                  /* Loči zasebnega zdravnika ter zobozdravnika */
                  mojScope.osebniZdravnik = {};
                  mojScope.osebniZobozdravnik = {};
                  for (var index in uporabnikZdravnika.zdravnik) {
                      var tmpZdravnik = uporabnikZdravnika.zdravnik[index];
                      if (tmpZdravnik.tip == 'osebni') {
                          mojScope.osebniZdravnik = tmpZdravnik;
                      }
                      if (tmpZdravnik.tip == 'zobozdravnik') {
                          mojScope.osebniZobozdravnik = tmpZdravnik;
                      }
                  }

                  /* metoda za krajšanje texta
                  *  input == text ki ga krajšamo
                  *  len+10: maximalna dovoljena dolžina
                  *  če je txt dalši od len+10, se ga skrajša na len ter doda ...
                  */
                  $scope.okrajsaj = function (input, len) {
                      if (input.length > len+10)
                          return input.substring(0, len) + "...";
                      return input;
                  };
              }
          }

          // table

        // set default numbers
      if( angular.isUndefined($rootScope.uporabnik.personalizacija) || $rootScope.uporabnik.personalizacija === null ){
          // doc || not set for pacient
          $scope.uporPersonal = [];
          $scope.uporPersonal.zdravila = 10;
          $scope.uporPersonal.pregledi = 10;
          $scope.uporPersonal.meritve = 10;
          $scope.uporPersonal.bolezni = 10;
      }else{
          $scope.uporPersonal = $rootScope.uporabnik.personalizacija;
          /*
          $scope.uporPersonal.zdravila = $rootScope.uporabnik.personalizacija;
          $scope.uporPersonal.pregledi = 10;
          $scope.uporPersonal.meritve = 10;
          $scope.uporPersonal.bolezni = 10;*/
      }

      if( $scope.uporPersonal.zdravila === 5 || $scope.uporPersonal.zdravila === 20 ){
          $scope.zdravilaCounts = [5,20].sort(function(a, b){return a-b});
      }else{
          $scope.zdravilaCounts = [5,$scope.uporPersonal.zdravila,20].sort(function(a, b){return a-b});
      }

      // init table numbs
      $scope.zdravilaData = [];
      $scope.tableSet = [];
      $scope.tableSet.perPage = 1;
      $scope.tableSet.perCou = $scope.uporPersonal.zdravila;
          
      var tp = new NgTableParams({
          page : $scope.tableSet.perPage,     // show first page
          count : $scope.tableSet.perCou,    // count per page
          data : $scope.zdravilaData
      }, {
          total:0,
          counts: $scope.zdravilaCounts, //[5,10,20],

          getData: function( $defer, params ){

              return Zdravila.query( params.url() ).$promise.then(function(data){

                  $scope.tableSet.perPage = params.page();
                  $scope.tableSet.perCou = params.count();

                  // order data
                  data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                  // filter data by input
                  data = params.filter() ? $filter('filter')(data, params.filter()) : data;

                  // set len AFTER filtering!
                  params.total(data.length);

                  // paginacija
                  data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                      $scope.tableSet.perPage*$scope.tableSet.perCou));
                  //Notification.success('Uporabniki posodobljeni!');

                  return data;
              });

          }});

      $scope.tablePar = tp;



      if( $scope.uporPersonal.zdravila === 5 || $scope.uporPersonal.zdravila === 20 ){
          $scope.dieteCounts = [5,20].sort(function(a, b){return a-b});
      }else{
          $scope.dieteCounts = [5,$scope.uporPersonal.zdravila,20].sort(function(a, b){return a-b});
      }
          // init table numbs
      $scope.dieteData = [];
      $scope.tableSet = [];
      $scope.tableSet.perPage = 1;
      $scope.tableSet.perCou = $scope.uporPersonal.zdravila;

      var tpDieta = new NgTableParams({
          page : $scope.tableSet.perPage,     // show first page
          count : $scope.tableSet.perCou,    // count per page
          data : $scope.dieteData
      }, {
          total:0,
          counts: $scope.dieteCounts, //[5,10,20],

          getData: function( $defer, params ){

              return Diete.query( params.url() ).$promise.then(function(data){
                  $scope.tableSet.perPage = params.page();
                  $scope.tableSet.perCou = params.count();

                  // order data
                  data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                  // filter data by input
                  data = params.filter() ? $filter('filter')(data, params.filter()) : data;

                  // set len AFTER filtering!
                  params.total(data.length);

                  // paginacija
                  data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                      $scope.tableSet.perPage*$scope.tableSet.perCou));
                  //Notification.success('Uporabniki posodobljeni!');

                  return data;
              });

          }});

      $scope.tableParDieta = tpDieta;



      if( $scope.uporPersonal.bolezni === 5 || $scope.uporPersonal.bolezni === 20 ){
          $scope.bolezniCounts = [5,20].sort(function(a, b){return a-b});
      }else{
          $scope.bolezniCounts = [5,$scope.uporPersonal.bolezni,20].sort(function(a, b){return a-b});
      }

      // init table numbs
      $scope.bolezniData = [];
      $scope.tableSet = [];
      $scope.tableSet.perPage = 1;
      $scope.tableSet.perCou = $scope.uporPersonal.bolezni;

      var tpBolez = new NgTableParams({
          page : $scope.tableSet.perPage,     // show first page
          count : $scope.tableSet.perCou,    // count per page
          data : $scope.bolezniData
      }, {
          total:0,
          counts: $scope.bolezniCounts,// [5,10,20],

          getData: function( $defer, params ){

              return Bolezni.query( params.url() ).$promise.then(function(data){
                  $scope.tableSet.perPage = params.page();
                  $scope.tableSet.perCou = params.count();

                  // order data
                  data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                  // filter data by input
                  data = params.filter() ? $filter('filter')(data, params.filter()) : data;

                  // set len AFTER filtering!
                  params.total(data.length);

                  // paginacija
                  data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                      $scope.tableSet.perPage*$scope.tableSet.perCou));
                  //Notification.success('Uporabniki posodobljeni!');

                  return data;
              });

          }});

      $scope.tableParBolezni = tpBolez;


      if( $scope.uporPersonal.meritve === 5 || $scope.uporPersonal.meritve === 20 ){
          $scope.meritveCounts = [5,20].sort(function(a, b){return a-b});
      }else{
          $scope.meritveCounts = [5,$scope.uporPersonal.meritve,20].sort(function(a, b){return a-b});
      }

      // init table numbs
      $scope.meritveData = [];
      $scope.tableSet = [];
      $scope.tableSet.perPage = 1;
      $scope.tableSet.perCou = $scope.uporPersonal.meritve;

      var tpMeritve = new NgTableParams({
          page : $scope.tableSet.perPage,     // show first page
          count : $scope.tableSet.perCou,    // count per page
          data : $scope.meritveData
      }, {
          total:0,
          counts: $scope.meritveCounts, //[5,10,20],

          getData: function( $defer, params ){

              return Meritve.query( params.url() ).$promise.then(function(data){
                  $scope.tableSet.perPage = params.page();
                  $scope.tableSet.perCou = params.count();
                  
                  
                  // sort & filter
                  data.tipMeritveSifra = "";
                  data.tipMeritveTip = "";
                  
                  for (var i = 0; i < data.length; i++){
                      data[i].tipMeritveTip = data[i].tip_meritve.tip;
                      data[i].tipMeritveSifra = data[i].tip_meritve.sifra;
                  }

                  // order data
                  data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                  // filter data by input
                  data = params.filter() ? $filter('filter')(data, params.filter()) : data;

                  // set len AFTER filtering!
                  params.total(data.length);

                  // paginacija
                  data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                      $scope.tableSet.perPage*$scope.tableSet.perCou));
                  //Notification.success('Uporabniki posodobljeni!');

                  return data;
              });

          }});

      $scope.tableParMeritve = tpMeritve;


      if( $scope.uporPersonal.pregledi === 5 || $scope.uporPersonal.pregledi === 20 ){
          $scope.preglediCounts = [5,20].sort(function(a, b){return a-b});
      }else{
          $scope.preglediCounts = [5,$scope.uporPersonal.pregledi,20].sort(function(a, b){return a-b});
      }

      // init table numbs
      $scope.preglediData = [];
      $scope.tableSet = [];
      $scope.tableSet.perPage = 1;
      $scope.tableSet.perCou = $scope.uporPersonal.pregledi;

      var tpPregledi = new NgTableParams({
          page : $scope.tableSet.perPage,     // show first page
          count : $scope.tableSet.perCou,    // count per page
          data : $scope.preglediData
      }, {
          total:0,
          counts: $scope.preglediCounts,// [5,10,20],

          getData: function( $defer, params ){

              return Pregled.query( params.url() ).$promise.then(function(data){
                  $scope.tableSet.perPage = params.page();
                  $scope.tableSet.perCou = params.count();

                  // order data
                  data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                  // filter data by input
                  data = params.filter() ? $filter('filter')(data, params.filter()) : data;

                  // set len AFTER filtering!
                  params.total(data.length);

                  // paginacija
                  data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                      $scope.tableSet.perPage*$scope.tableSet.perCou));
                  //Notification.success('Uporabniki posodobljeni!');

                  return data;
              });

          }});

      $scope.tableParPregledi = tpPregledi;
          


      };

      if( $scope.uporabnik.role.naziv ===  "Admin"){
          $scope.omogociIzbiranjePacienta = false;
      }
      else if( $scope.uporabnik.role.naziv ===  "Pacient"){
          // ce je uporabnik pacient, prikazi enako kot do sedaj
          $scope.izbranPacient = true;
          $scope.omogociIzbiranjePacienta = false;
          zdravnikoviPacientiNalozeni = true;
          $scope.posodobiPacienta( $scope.uporabnik );
      }
      else{
          // je skor zdravnik
          $scope.omogociIzbiranjePacienta = true;
          $scope.izbranPacient = false;

          $http.defaults.headers.common.pacient = $rootScope.user.id;
          /* GET Pacienti tega zdravnika */
          ZdravnikoviPacienti.get({limit:  150}).$promise.then(function(response){

              $scope.mojiPacienti = response.results;

              if( $scope.mojiPacienti.length === 0 ){
                  mojScope.jeZdravnik.nimaPac = true;
              }else{
                  mojScope.jeZdravnik.nimaPac = false;
              }

              zdravnikoviPacientiNalozeni = true;

              if( ! angular.isUndefined($rootScope.izbraniUporabId) ){
                  Uporabniki.get({ limit:1, iduporabnik:$rootScope.izbraniUporabId }).$promise.then(function (response) {
                      $scope.posodobiPacienta( response );
                  });
              }

              mojScope.jeZdravnik.placeholderBes = "Izberite pacienta...";
          });

      }

      function clearData(){
          mojScope.uporabnik = "";
          mojScope.bolezni = [];
          mojScope.diete = [];
          mojScope.zdravila = [];
          mojScope.meritve = [];
          mojScope.pregledi = [];
          mojScope.osebniZdravnik = {};
          mojScope.osebniZobozdravnik = {};
      }


  }]);
