/**
 * Created by lawrencenyakiso on 2016/03/10.
 */
var SevensJs = (function(SevensJsAPI){
    //dependency on site catalyst

    SevensJsAPI.analytics = {};
    var k = SevensJsAPI.analytics
    k.track = function (stateName) {
        return "I'll track " + stateName + " for coffee"
    }

    return SevensJsAPI

}(SevensJs || {}, s));

//angular specific things
(function(app){

    app.run(function($rootScope, sevensjs){
        $rootScope.$on('$stateChangeSuccess', function(a,b,c,d,e){
            //analytics.track(b.name)

            console.log(sevensjs.analytics.track(b.name))
        })
        //$rootScope.$emit('$stateChangeSuccess')
    })

    // html attribute for buttons and links that you want to track
    var directive = function(sevensjs){

        function link(scope, el, attr){

            //add event lister for click / touch
            //pass your track parameters here
            //sevensjs.analytics.track(attr.analyticsTrack)
            el.on('click', trackEvent)
            function trackEvent(){
                if(attr !== undefined){
                    try {
                        console.log(sevensjs.analytics.track(attr.analyticsTrack))
                    }catch(e){

                    }
                }else{
                    //if debug on, print to console
                    //this.report("Please provide tracking Parametes")
                }
            }
        }

        return{
            link : link
        }
    }

    app.directive('analyticsTrack', ['sevensjs',directive]);
})(angular.module('sevensjs'))
