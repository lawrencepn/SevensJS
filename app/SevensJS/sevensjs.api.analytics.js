/**
 * Created by lawrencenyakiso on 2016/03/10.
 */
var SevensJs = (function(SevensJsAPI, AppMeasurement){
    //dependency on site catalyst

    /**setup profile details and parse them to the modules
     *
     * var s_account="accstandardbanknigeriaib2015"
     * var s = s_gi(s_account)
     *
     * s.trackingServer="accstandardbank.d1.sc.omtrdc.net"
     s.trackingServerSecure="accstandardbank.d1.sc.omtrdc.net"
     */


    SevensJsAPI.analytics = {};
    var k = SevensJsAPI.analytics;
    var xs;


    k.init = function(arg){
       var s = AppMeasurement.getInstance(arg)

        /*
        * CONFIG
        *
        * */
        s.trackDownloadLinks=true
        s.trackExternalLinks=true
        s.trackInlineStats=true
        s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
        s.linkInternalFilters="javascript:" //optional: add your internal domain here
        s.linkLeaveQueryString=false
        s.linkTrackVars="None"
        s.linkTrackEvents="None"
        s.trackingServer="accstandardbank.d1.sc.omtrdc.net"
        s.trackingServerSecure="accstandardbank.d1.sc.omtrdc.net"
        s.server = "accstandardbank.d1.sc.omtrdc.net"
        s.channel = "GhanaIB" //Need to confirm this

        xs = s;

    }

    k.trackView = function (stateName) {
        //pass the state name or page name to the pageName Property
        xs.pageName = stateName
        xs.t()
    }

    k.trackEvent = function(action, props){
        // analytics.trackEvent( 'o', 'dashboard | actions | click on hero tile ' );
        console.log(xs)
        xs.tl(true, action, props)
    }

    return SevensJsAPI

}(SevensJs || {}, AppMeasurement));

//angular specific injection
(function(app){

    app.run(function($rootScope, sevensjs){
        $rootScope.$on('$stateChangeSuccess', function(a,b,c,d,e){
            sevensjs.analytics.trackView(b.name)
        })

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
                        //get action type from attribute
                        var ov = attr.analyticsTrack;
                        var actionType = ov.charAt(0);
                        var eventProperty = ov.slice(1).replace(/\|/,"").trim();
                        //remove the everything before the first | character
                        sevensjs.analytics.trackEvent(actionType, eventProperty);

                    }catch(e){
                        console.log(e)
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
