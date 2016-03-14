/**
 * Created by lawrencenyakiso on 2016/03/10.
 */
var SevensJs = (function (SevensJsAPI) {
    var res = {};
    SevensJsAPI.parseCSV = function (file) {

        /*
         * Expects a file and query parameter parseCSV([CSV File]file,[String]rr)
         * */
        var file = file;

        try {
            //should return object with file meta data and number of entries
            //console.log(parseResult(file))
            return "blue"
            //var promise = parseResult(file);
            //promise.then(function(result){
            //    res.entries = result;
            //    return res
            //})

        } catch (e) {
            throw Error(e)
        }
    }

    function parseResult(file) {
        var fileMeta = {
                name: file.name,
                size: file.size,
                type: file.type
            };

        //only read file if file type and size comply
        //validate file type and file size
        if (parseInt(fileMeta.size) > 2097152) {
            console.log("S")
            return "Error"
        } else {

            if (fileMeta.type !== "text/csv" || fileMeta.type !== "text/plain") {
                if (fileMeta.type.length == 0) {
                    return "Error"
                }
                var reader = new FileReader();

                reader.onload = parseCSV;
                reader.error = function () {
                    console.log("Something went wrong");
                }
                reader.readAsBinaryString(file);
            }
        }
        res.meta = fileMeta;
        return res
    }

    function parseCSV(file) {
        //number of rows
        var binary = file.target.result;
        var collection = binary.split('\n');
        var entries = collection.length;
        var valid = false;

        //deliminator
        var firstRow = collection[0];
        var secondRow = collection[1];

        var reg = /(,)/;
        var deliminator = firstRow.match(reg);
        //number of deliminators should be equal per row
        if (deliminator == null) {
            //return error
        }
        //columns
        var columns = firstRow.split(',').length;
        //fileMetaData['columns'] = columns;

        var y = entries - 1;

        for (var x = y; x >= 0; x--) {
            //columns should be equal
            var d = collection[x].split(',').length;
            if (d !== columns) {
                valid = false;
                return "Error"
            }
        }

        return entries;
    }

    return SevensJsAPI

}(SevensJs || {}))