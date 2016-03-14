'use strict';

angular.module('myApp.demo-csv', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
      .state('demo-csv', {
          url : '/demo-csv',
    templateUrl: 'views/demo-csv/demo-csv.html',
    controller: 'View1Ctrl'
});
}])

.controller('View1Ctrl', ['$scope','sevensjs','TableData', function($scope, sevensjs,TableData) {

  var data = TableData.table();
  console.log(data)
  var dropbox;

  dropbox = document.getElementById("dragOnMe");
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

  function dragenter(e){
    e.stopPropagation();
    e.preventDefault();
    dropbox.style.backgroundColor = "rgb(19, 164, 208)";
  }
  function dragover(e){
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e){
    e.stopPropagation();
    e.preventDefault();

    var dataTransfer = e.dataTransfer;
    var files = dataTransfer.files;
    dropbox.style.backgroundColor = "#fff";
    handleUpload(files);
  }
  function handleUpload(files){
    console.log(sevensjs.parseCSV(files[0]))
  }

  $scope.makeCSV = function(){
    window.saveAs(sevensjs.makeCSV(data), 'ManMade')
  }

}]);