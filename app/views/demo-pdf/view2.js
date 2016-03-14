'use strict';

angular.module('myApp.demo-pdf', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
      .state('demo-pdf', {
        url : '/demo-pdf',
    templateUrl: 'views/demo-pdf/demo-pdf.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','sevensjs','TableData',function($scope,sevensjs, TableData) {

    var data = TableData.table();
    //make pdf from json
    $scope.pdfRandomTest = function(){

        var doc = new sevensjs.makePDF('p', 'pt');
        //box 1
        doc.rect(40,40,250,250);

        //box 2
        doc.rect(300,40,250,250);

        //right align inside box1
        doc.setFontSize(16);
        doc.textAlign("Im Big Right Joe", "right" , 20, 60,
            {
                ox: 40,//the x value of box 1
                size: 250 //the width of box 1
            });

        doc.setFontSize(10);
        doc.textAlign("We like the right side", "right" , 20, 80,
            {
                ox: 40,//the x value of box 1
                size: 250 //the width of box 1
            });

        //center in box 2
        doc.textAlign("I'm Center Josh Moe", "center" , 20, 60,
            {
                ox: 300, //the x value of box 2
                size: 250 //the width of box 2
            });

        doc.autoPrint();
        //publish(doc.output('datauristring'))
        doc.output('save')

    }

    $scope.pdfFromJSON = function(x){

        var tableData = x !== 'n' ? data[2] : data[1];

        var doc = new sevensjs.makePDF('p', 'pt');

        //doc.addImage($scope.dataURI, 'PNG', 40, 20, 40, 40);

        doc.text("Bank Statement", 40, 90);

        doc.setFontSize(8);
        doc.textAlign("StandardBank", "right", 40, 60)

        doc.setFontSize(8);
        doc.setTextColor(122, 122, 122)
        doc.textAlign("Date : 01-01-2015", "right" , 40, 80)

        doc.autoTable($scope.tableColumns, tableData, {startY:140, fontSize: 8});
        //publish(doc.output('datauristring'));
        doc.autoPrint();
        doc.save();
    }
}])
.factory('TableData',function(){

    var moreData = [];
    return {
        table : function(){

            var columns = [
                {title: "ID", key: "id"},
                {title: "Name", key: "first_name"},
                {title: "Email", key: "email"},
                {title: "Country", key: "country"},
                {title: "Expenses", key: "expenses"}
            ]
            var data = [{
                "id": 1,
                "first_name": "Russell",
                "email": "rmills0@independent.co.uk",
                "country": "Croatia",
                "expenses": "$8.94"
            }, {
                "id": 2,
                "first_name": "Laura",
                "email": "lwest1@com.com",
                "country": "China",
                "expenses": "$5.32"
            }, {
                "id": 3,
                "first_name": "Carlos",
                "email": "cdean2@macromedia.com",
                "country": "China",
                "expenses": "$0.47"
            }, {
                "id": 4,
                "first_name": "Nicholas",
                "email": "nhart3@huffingtonpost.com",
                "country": "Thailand",
                "expenses": "$4.20"
            }, {
                "id": 5,
                "first_name": "Ernest",
                "email": "ecollins4@goodreads.com",
                "country": "China",
                "expenses": "$20.16"
            }, {
                "id": 6,
                "first_name": "Heather",
                "email": "hweaver5@dot.gov",
                "country": "Dominican Republic",
                "expenses": "$4.55"
            }, {
                "id": 7,
                "first_name": "Harold",
                "email": "hbutler6@discovery.com",
                "country": "Mali",
                "expenses": "$7.06"
            }, {
                "id": 8,
                "first_name": "Mildred",
                "email": "moliver7@ed.gov",
                "country": "France",
                "expenses": "$2.27"
            }, {
                "id": 9,
                "first_name": "Timothy",
                "email": "thowell8@nih.gov",
                "country": "Gambia",
                "expenses": "$12.18"
            }, {
                "id": 10,
                "first_name": "Barbara",
                "email": "bfox9@free.fr",
                "country": "Indonesia",
                "expenses": "$6.62"
            }];

            for (var i = 0; i < 45; i++) {
                moreData = moreData.concat(data);
            }

            return [columns, data]
        }
    }
})