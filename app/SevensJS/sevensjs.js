/**
 * Created by lawrencenyakiso on 2016/03/10.
 */

var SevensJs = (function(){

    var API = {},

    version = function(){
        return 1.0
    }

    return {
        version : version
    }

}());

//angular specific setup. Module Setup
(function(){
    var sevensjs = angular.module('sevensjs', []);
    sevensjs.factory('sevensjs',function(){
        return window.SevensJs;
    })
}(angular));