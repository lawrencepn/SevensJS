/**
 * Created by lawrencenyakiso on 2016/03/27.
 */
var SevensJs = (function(SevensJsAPI){
    //userAgent

    //Our Browser Support:

    /*
     DESKTOP
     * Mozilla 19>
     * Chrome
     * IE 9 > [10 > PDF] - users need Adobe reader
     * Opera
     * Safari
     ------------------
     MOBILE
     *
     * */

    //Branch Init Stuff. store results

    var pdfPlugin = false,
        browserCanPrint = false,
        supportedBrowser = true,
        IEHasPlugin = false,
        tryMIME = false,
        IEPlugin = navigator.plugins["AcroPDF.PDF"],
        agent = navigator.userAgent.match(/Safari\/|Firefox\/|Chrome\/|MSIE|Trident\//)[0],
        agent_version = navigator.userAgent.match(/Safari\/|Firefox\/|Chrome\/|MSIE|Trident\//)[0];

    //pdf plugin - ignore for firefox using pdf.js
    var arr = navigator.mimeTypes;
    //pdf plugin support
    //IE browser plugin detection
    if(agent === "MSIE/") {
        //detect Adobe
        if(IEPlugin){
            //get version
            //is plugin enabled ? what if more than one plugin is installed?
            IEHasPlugin = IEHasPlugin && IEPlugin.enabledPlugin;
        }else{
            try{
                IEPlugin = new ActiveXObject("AcroPDF.PDF");
                IEHasPlugin = IEPlugin ? true : false;
            }catch(error){
                tryMIME = true;
            }
        }
        if(tryMIME){
            IEPlugin = navigator.mimeTypes['application/pdf'];
            IEHasPlugin = IEPlugin && IEPlugin.enabledPlugin;
        }

    }else{
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].description.match(/pdf/g) || arr[i].type.match(/application\/pdf|pdf/)) {
                pdfPlugin = true;
            }
        }
    }

    switch(agent){
        case "Safari/" 	:
        case "Chrome/" 	:
        case "Trident/"	:
            browserCanPrint = true;
            break;
        case "Firefox/"	:
            browserCanPrint = false;
            break;
        case "MSIE/"   	:
            browserCanPrint = !!IEHasPlugin;
            break;
        default :
            supportedBrowser = false;
            break;
    }

    SevensJsAPI.Utility =  {
        canPrintPDF: function () {
            //return safari, chrome, firefox, IE, Opera...unknown
            return !(!pdfPlugin && !browserCanPrint);
        },
        hasPDFPlugin : function(){
            return !!pdfPlugin;
        },
        b_agent : function(){
            return agent.slice(0, -1);
        }

    };	//is there a PDF Plugin
    //return true or FALSE


}(SevensJs || {}))