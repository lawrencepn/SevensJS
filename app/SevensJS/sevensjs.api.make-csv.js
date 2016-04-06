/**
 * Created by lawrencenyakiso on 2016/03/10.
 */
var SevensJs = (function(SevensJsAPI){

    //TODO: Try and Catch
    //private
    function exportCSV (dt){
        //print every row on a new line
        var headers = dt[0], body = dt[1];
        var un = [], un_k = [], un_t = [], b, h, un_kl;
        //extract table headers
        h = headers.length;
        for (var i = h - 1; i >= 0; i--) {
            un.push(headers[i].title)
        }
        //extract rows
        b = body.length;
        for (var k = b - 1; k >= 0; k--) {
            var gh = Object.keys(body[k])
            //extract columns
            for (var prop in gh) {
                if (gh.hasOwnProperty(prop)) {
                    //create new array
                    un_t.push(body[k][gh[prop]])
                }
            }
            un_k.push(new Array(un_t));
            un_t = [];
        }
        //write to file
        var fg = '';
        //add the extracted headers to the new csv content array
        fg += un.join();
        fg += "\r\n";
        //add the extracted columns to the csv
        un_kl = un_k.length;
        for (var y = un_kl - 1; y >= 0; y--) {
            fg += un_k[y].join() + "\r\n";
        }

        return new Blob([fg], {type:'text/csv'});
    }

    //public
    SevensJsAPI.makeCSV = function (dataTable) {
        return exportCSV(dataTable)
    }

    return SevensJsAPI

}(SevensJs || {}));