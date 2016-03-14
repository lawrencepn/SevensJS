/**
 * Created by lawrencenyakiso on 2016/03/10.
 */

var SevensJs = (function(){

    var API = {},
        privateD = "Hello My People"

    API.move = function(){
        return "move me";
    }
    API.go = function(){
        return "let me go"
    }
    //define('SevensJs', function(){
    //    return SevensJs;
    //})
    return API

}());

//angular specific setup. Module Setup
(function(){
    var sevensjs = angular.module('sevensjs', []);
    sevensjs.factory('sevensjs',function(){
        return window.SevensJs;
    })
}(angular));