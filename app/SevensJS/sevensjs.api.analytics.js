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


     LANDING PAGE

     Like it:

     s.linkTrackVars=’prop51,prop53,pageName’;
     s.pageName;
     s.prop50 = s.pageName;
     s.prop51=’exitSurvey’;
     s.prop53=’click: ExitSurvey.Landing.LikeIt’;
     s.tl(this,’o’,’ExitSurvey.Landing.LikeIt.click’);

     ‘X’ (close survey):

     s.linkTrackVars=’prop51,prop53,pageName’;
     s.pageName;
     s.prop50 = s.pageName;
     s.prop51=’exitSurvey’;
     s.prop53=’click: ExitSurvey.Landing.Exit’;
     s.tl(this,’o’,’ExitSurvey.Landing.Exit.click’);

     Don’t Like It:

     s.linkTrackVars=’prop51,prop53,pageName’;
     s.pageName;
     s.prop50 = s.pageName;
     s.prop51=’exitSurvey’;
     s.prop53=’click: ExitSurvey.Landing.DontLikeIt’;
     s.tl(this,’o’,’ExitSurvey.Landing.DontLikeIt.click’);


             REASON

             ‘X’ (close survey):

             s.linkTrackVars=’prop51,prop53,pageName’;
             s.pageName;
             s.prop50 = s.pageName;
             s.prop51=’exitSurvey’;
             s.prop53=’click: ExitSurvey.Reason.Exit’;
             s.tl(this,’o’,’ExitSurvey.Reason.Exit.click’);


             Submit & Exit:

             s.linkTrackVars=’events,prop51,prop53,pageName’;
             s.linkTrackEvents=‘event78';
             s.pageName;
             s.prop50 = s.pageName;
             s.prop51=’exitSurvey’;
             s.prop53=’click: ExitSurvey.Reason.Submit’;
             s.prop63=REASON;
             s.tl(this,’o’,’ExitSurvey.Reason.Submit.click’);

     UNIQUE:
     s.pageName;
     s.prop53:[click: ExitSurvey.Landing.LikeIt, click: ExitSurvey.Landing.Exit, click: ExitSurvey.Landing.DontLikeIt, click: ExitSurvey.Reason.Exit, click: ExitSurvey.Reason.Submit];
     s.prop63=REASON
     s.tl() :[]


     DRY OBJECT PROPS:
     s.linkTrackVars=’prop51,prop53,pageName’;
     s.prop50 = s.pageName;
     s.prop51=’exitSurvey’;


     */


    SevensJsAPI.analytics = {};
    var k = SevensJsAPI.analytics;
    var xs;

    k.init = function(arg){
       var s = AppMeasurement.getInstance(arg.country_sacc)

        /*
        * CONFIG
        *
        * */
        s.trackDownloadLinks=true;
        s.trackExternalLinks=true;
        s.trackInlineStats=true;
        s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
        s.linkInternalFilters="javascript:"; //optional: add your internal domain here
        s.linkLeaveQueryString=false;
        s.linkTrackVars="None";
        s.linkTrackEvents="None";
        s.trackingServer="accstandardbank.d1.sc.omtrdc.net";
        s.trackingServerSecure="accstandardbank.d1.sc.omtrdc.net";
        s.server = "accstandardbank.d1.sc.omtrdc.net";
        s.channel = arg.country_channel; //Need to confirm this

        xs = s;

    };

    k.trackView = function (stateName) {
        //pass the state name or page name to the pageName Property
        xs.pageName = stateName;
        xs.t();
    };

    k.trackEvent = function(action, props){
        // analytics.trackEvent( 'o', 'dashboard | actions | click on hero tile ' );
        xs.tl(true, action, props);
    };
    /**
    * @Parameters : [String=stateName], [String=response] optional
     * exitSurvey('landing','ELL')
    * */
    k.exitSurvey = function(stateName, response){
        //response: like, noLike
        var prop53 = {

            ELL: "ExitSurvey.Landing.LikeIt",
            ELE: "ExitSurvey.Landing.Exit",
            ELD: "ExitSurvey.Landing.DontLikeIt",
            ERE: "ExitSurvey.Reason.Exit",
            ERS: "ExitSurvey.Reason.Submit"

        };

        var pageName = {
            landing : "ROAWEB.ExitSurvey.Landing",
            reason : "ROAWEB.ExitSurvey.Reason"
        };

        //for prop53 append 'click' to prop53 e.g : click: ExitSurvey.Landing.LikeIt
        //for s.tl() append 'click' to prop53 e.g : ExitSurvey.Landing.LikeIt.click

        var _prop53 = 'click: ' + prop53[response];
        var _tl = prop53[response] + '.click';

        //defaults
        if(response !== 'ERS') {

            xs.linkTrackVars = 'events,prop51,prop53,pageName';
            xs.pageName = pageName[stateName];
            xs.prop50 = xs.pageName;
            xs.prop51 = 'exitSurvey';
            xs.prop53 = _prop53;

        }else{

            xs.linkTrackEvents = 'event78';
            xs.prop63 = response;
        }

        xs.tl(true, 'o', _tl);
    };

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
