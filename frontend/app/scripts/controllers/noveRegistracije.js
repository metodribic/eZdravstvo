/**
 * Created by Mrak on 29.5.2016.
 */

 'use strict()';


angular.module('tpo')
  .controller('noveRegistracijeCtrl', ['$scope','AuthService', '$state', '$rootScope',
      'Uporabniki','Notification', '$http', '$q', 'API_URL', 'NgTableParams', '$filter','Zdravnik', 'Osebje',
  function ($scope, AuthService, $state, $rootScope, Uporabniki, Notification, $http, $q, API_URL,
            NgTableParams, $filter, Zdravnik, Osebje ) {

      /*GET USER FROM LOCAL STORAGE*/
      $scope.uporabnik = AuthService.getCurrentUser();
      /* če ni prijavlen ga dej na login*/
      if(!$scope.uporabnik){
          $state.go("login");
      }
      // Redirect everyone that isn't an Admin
      if( $scope.uporabnik.role.naziv !== "Admin" ){
          $state.go("nadzornaPlosca");
      }
      
      // dates
      $scope.chart = {'start': moment(), 'end': moment()}
      $scope.startDate = moment($scope.chart.start, 'DD.MM.YYYY');
      $scope.endDate = moment($scope.chart.end, 'DD.MM.YYYY');


///   DATES
      $scope.filtrirejDatum = function( dat ){

          return function( dat ){
              /*
              if( moment(dat.date_joined).isAfter($scope.startDate)
                  && moment($scope.endDate).isAfter(dat.date_joined)) {

                  return true;
              }*/
              // dat.date_joined with format "dd.mm.yyyy" doesnt work
              if( $scope.startDate <= moment(dat.date_joined,"YYYY-MM-DD"  )
                  && $scope.endDate >= moment(dat.date_joined,"YYYY-MM-DD" )  ){
                  return true;
              }

              return false;
          };
      };

      // init table numbs
      $scope.tableSet = [];
      $scope.tableSet.perPage = 1;
      $scope.tableSet.perCou = 10;

      var tp = new NgTableParams({
          page : $scope.tableSet.perPage,     // show first page
          count : $scope.tableSet.perCou    // count per page
      }, {
          total:0,
          counts: [5,10,20],

          getData: function( $defer, params ){
              
              

              return Uporabniki.query( params.url() ).$promise.then(function(data){
                  return Zdravnik.query(params.url() ).$promise.then(function (data2) {
                      return Osebje.query(params.url() ).$promise.then(function (data3) {

                          $scope.tableSet.perPage = params.page();
                          $scope.tableSet.perCou = params.count();

                          data = data.concat(data2);
                          data = data.concat(data3);
                          
                          data.uporVloga = "";
                          for (var i = 0; i < data.length; i++){
                              data[i].uporVloga = data[i].role.naziv;
                          }

                          // order data
                          data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                          // filter data by dates
                          data = data.filter($scope.filtrirejDatum( data ));

                          // filter data by input
                          data = params.filter() ? $filter('filter')(data, params.filter()) : data;

                          // set len AFTER filtering!
                          params.total(data.length);
                          //data = ($filter('orderBy')(data, params.orderBy()));

                          $scope.saveDataForPdf = data; // save it without pagination!

                          // paginacija
                          data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                              $scope.tableSet.perPage*$scope.tableSet.perCou));

                          if( data.length == 0 ){
                              $scope.niPacientov = true;
                          }else{
                              $scope.niPacientov = false;
                          }

                          //Notification.success('Uporabniki posodobljeni!');
                          return data;

                      });
                  });
              });

          }});

      $scope.tablePar = tp;
      
      $scope.naloziDatumInReload = function() {
          
          //$scope.izbranDatum = true;
          $scope.startDate = moment($scope.chart.start, 'DD.MM.YYYY');
          $scope.endDate = moment($scope.chart.end, 'DD.MM.YYYY');
          
          // validate
          if( $scope.startDate > $scope.endDate ){
              // NI KUL
              $scope.errDatumEnd = true;
              Notification.error("Začetni datum mora biti pred koncem.");
          }else{
              $scope.errDatumEnd = false;
              $scope.tablePar.reload();
          }

      }

///   PDF
      $scope.showPdf = function () {

          var doc = handlePdfFormatting();
          // open in new tab
          var str = doc.output("datauristring");
          var x = window.open();
          x.document.open();
          x.document.location=str;

      }

      $scope.shraniPdf = function () {

          var doc = handlePdfFormatting();
          // save
          doc.save("seznamNovihUporabnikov.pdf");
      }


      function handlePdfFormatting(){

          var doc = new jsPDF('p', 'pt');


          // title + dataKey -> heading
          var columns = [
              {title:'#',key:'index'},
              {title:'Uporabniško ime',key:'username'},
              {title:'Ime',key:'ime'},
              {title:'Priimek',key:'priimek'},
              {title:'Vloga', key:'rola'},
              {title:'Datum registracije', key:'date_joined'},
              {title:'Zadnji dostop', key:'last_login'},
              {title:'Aktiviran', key:'is_active'}
          ];

          // {},{},...with vals
          var rows = [];

          for ( var i = 0; i < $scope.saveDataForPdf.length; i++){
              rows[i] = {};
              rows[i].index = i+1;
              rows[i].username = $scope.saveDataForPdf[i].username;

              if( $scope.saveDataForPdf[i].ime == "" ){
                  rows[i].ime = "/";
              }else{
                  rows[i].ime = $scope.saveDataForPdf[i].ime;
              }
              if( $scope.saveDataForPdf[i].priimek == "" ){
                  rows[i].priimek = "/";
              }else{
                  rows[i].priimek = $scope.saveDataForPdf[i].priimek;
              }

              rows[i].rola=$scope.saveDataForPdf[i].role.naziv;

              if($scope.saveDataForPdf[i].date_joined != null){
                  rows[i].date_joined= $filter('date')($scope.saveDataForPdf[i].date_joined,'dd.MM.yyyy');
              }else{
                  rows[i].date_joined="/";
              }

              if($scope.saveDataForPdf[i].last_login != null){
                  rows[i].last_login=$filter('date')($scope.saveDataForPdf[i].last_login,'dd.MM.yyyy');
              }else{
                  rows[i].last_login="/";
              }
              if( $scope.saveDataForPdf[i].is_active ){
                  rows[i].is_active="Da";
              }else{
                  rows[i].is_active="Ne";
              }
          }


          var totalPagesExp = "{total_pages_count_string}";

          var footer = function (data) {
              var str = "Stran " + data.pageCount;
              // Total page number plugin only available in jspdf v1.0+

              if (typeof doc.putTotalPages === 'function') {
                  str = str + " od " + totalPagesExp;
              }
              doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
          };

          var header = function(data){

              if(data.pageCount < 2 ){
                  //FIRST PAGE
                  //&#268; -> č
                  doc.setFontSize(16);
                  doc.text("Uporabniki registrirani med " + moment($scope.startDate).format("DD.MM.YYYY") +
                      " in " + moment($scope.endDate).format("DD.MM.YYYY") ,40,75);

              }
              doc.setFontSize(12);
              doc.text("eZdravstvo",40,30);
              doc.setFontSize(10);
              doc.text(getTodaysDate(), 510, 30);
          }

          var options = {


              beforePageContent: header,
              afterPageContent: footer,

              theme: 'striped',
              styles : {
                  halign:'left',
                  fontStyle:'normal',
                  font:'helvetica',
                  overflow:'linebreak'
              },
              headerStyles:{fontStyle:'bold'},
              bodyStyles:{},
              columnStyles:{},
              margin: {top:60},
              startY:100,
              pageBreak: 'auto',

          };

          doc.autoTable(columns, rows, options );

          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
              doc.putTotalPages(totalPagesExp);
          }

          return doc;
      }


///   END-PDF
      function getTodaysDate(){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!

          var yyyy = today.getFullYear();
          if(dd<10){
              dd='0'+dd
          }
          if(mm<10){
              mm='0'+mm
          }
          var today = dd+'.'+mm+'.'+yyyy;
          return today;
      }

  }]);

