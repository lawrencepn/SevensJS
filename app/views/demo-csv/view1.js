'use strict';

var app = angular.module('myApp.demo-csv', ['ui.router']);

app.factory('Upload', function(){
    return {
        local : function(file){
            //XMLHTTP Request
            var promise = new Promise(function(resolve, reject){
                var f = new FormData();
                var xhr = new XMLHttpRequest()

                xhr.addEventListener("load",function(e){
                    console.log(e.target)
                    resolve(e.target)
                })


                xhr.open("POST","http://localhost:8080/upload",true)
                f.append("file",file)
                f.append("name","my name is charlie")
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
                xhr.send(f)
            })

            return promise;

        }
    }
})

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('demo-csv', {
            url: '/demo-csv',
            templateUrl: 'views/demo-csv/demo-csv.html',
            controller: demoCSVController,
            controllerAs : '_this'
        });
}])

//app.controller('View1Ctrl',demoCSVController)

function demoCSVController(sevensjs, TableData, Upload) {
    var data = TableData.table();
    var dropbox, uploadedFile
    var _this = this;
    console.log(_this)
    _this.test = 4

    _this.testme = function(){
        _this.test += 1;
        console.log(_this.test)
    }



    dropbox = document.getElementById("dragOnMe");
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
        dropbox.style.backgroundColor = "rgb(19, 164, 208)";
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {

        e.stopPropagation();
        e.preventDefault();

        var dataTransfer = e.dataTransfer;
        var files = dataTransfer.files;
        dropbox.style.backgroundColor = "#fff";

        //resolve the file
        parseFile(files);

    }

    function parseFile(files) {

        sevensjs.parseCSV(files[0]).then(function(res){
            uploadedFile = res.file
            //uploadedFile holds the binary data of the file to upload gain after OTP
            console.log(uploadedFile)
        })
    }

    _this.makeCSV = function () {
        window.saveAs(sevensjs.makeCSV(data), 'ManMade')
    }

    _this.upload = function(){
        console.log(uploadedFile)
        if(uploadedFile !== undefined){
            Upload.local(uploadedFile).then(function(res){
                console.log(res)
            })
        }

    }

}

