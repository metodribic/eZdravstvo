/**
 * Created by Mrak on 29.5.2016.
 */

 'use strict()';


angular.module('tpo')
  .controller('noveRegistracijeCtrl', ['$scope','AuthService', '$state', '$rootScope',
      'Uporabniki','Notification', '$http', '$q', 'API_URL', 'NgTableParams', '$filter',
  function ($scope, AuthService, $state, $rootScope, Uporabniki, Notification, $http, $q, API_URL, NgTableParams, $filter ) {

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

                  $scope.tableSet.perPage = params.page();
                  $scope.tableSet.perCou = params.count();

                  // order data
                  data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

                  // filter data by input
                  data = params.filter() ? $filter('filter')(data, params.filter()) : data;


                  // set len AFTER filtering!
                  params.total(data.length);
                  //data = ($filter('orderBy')(data, params.orderBy()));

                  $scope.saveDataForPdf = data; // save it without pagination!

                  // paginacija
                  data = (data.slice(($scope.tableSet.perPage-1)*$scope.tableSet.perCou,
                      $scope.tableSet.perPage*$scope.tableSet.perCou));
                  return data;
              });

          }});

      $scope.tablePar = tp;


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
          doc.save("seznamNedokoncanihRegistracij.pdf");
      }

      function handlePdfFormatting(){

          var doc = new jsPDF('p', 'pt');

          // title + dataKey -> heading
          var columns = [
              {title:'#',key:'index'},
              {title:'Uporabniško ime',key:'username'},
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

          // duplicate for more data !
          var j = $scope.saveDataForPdf.length;
          for ( var i = 0; i < $scope.saveDataForPdf.length; i++){
              rows[j] = {};
              rows[j].index = i+1;
              rows[j].username = $scope.saveDataForPdf[i].username;
              rows[j].rola=$scope.saveDataForPdf[i].role.naziv;

              if($scope.saveDataForPdf[i].date_joined != null){
                  rows[j].date_joined= $filter('date')($scope.saveDataForPdf[i].date_joined,'dd.MM.yyyy');
              }else{
                  rows[j].date_joined="/";
              }

              if($scope.saveDataForPdf[i].last_login != null){
                  rows[j].last_login=$filter('date')($scope.saveDataForPdf[i].last_login,'dd.MM.yyyy');
              }else{
                  rows[j].last_login="/";
              }
              if( $scope.saveDataForPdf[i].is_active ){
                  rows[j].is_active="Da";
              }else{
                  rows[j].is_active="Ne";
              }
              j = j+1;
          }

          $scope.pdfPageNum = 1;

          doc.autoTable(columns, rows, {
              theme: 'striped',
              styles : {
                  halign:'left',
                  fontStyle:'normal',
                  font:'helvetica'
              },
              headerStyles:{},
              bodyStyles:{},
              columnStyles:{},
              margin: {top:60},

              startY:false,
              pageBreak: 'auto',

              beforePageContent:function(data){
                  if($scope.pdfPageNum < 2 ){
                      //FIRST PAGE
                      doc.setFontSize(16);
                      doc.text("eZdravstvo",40,30);
                      doc.setFontSize(12);
                      //&#268; -> č
                      doc.text("Seznam nedokoncanih postopkov registracije",60,50);
                  }else{
                      doc.setFontSize(12);
                      doc.text("eZdravstvo",40,30);
                  }
                  doc.setFontSize(10);
                  doc.text(getTodaysDate(), 510, 30);
                  doc.text("stran "+$scope.pdfPageNum, 510, 45);
                  $scope.pdfPageNum += 1;
              },
              afterPageContent: function (data) {
              }

          });

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

