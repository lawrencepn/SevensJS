/**
 * Created by lawrencenyakiso on 2016/03/10.
 */
var SevensJs = (function (SevensJsAPI) {
    var res = {},
        legalFileType = {
            csv : "text/csv",
            plain : "text/plain"
        }, maxLegalFileSize = 2097152 ;

    //private
    function parseResult(file) {

        var fileMeta = {
                name: file.name,
                size: file.size,
                type: file.type
            };

        //only read file if file type and size comply
        //validate file type and file size
        if (parseInt(fileMeta.size) > maxLegalFileSize) {
            //TODO: Handle Error
            return "Error"
        } else {

            if (fileMeta.type !== legalFileType.csv || fileMeta.type !== legalFileType.plain) {
                if (fileMeta.type.length == 0) {
                    //TODO: Handle Error
                    return "Error"
                }
                return fileReaderUtility(file)
            }
        }

    }

    //private
    function fileReaderUtility(file){
        //is promise supported
        if(typeof Promise === "function"){

            var promise = new Promise(function(resolve, reject){

                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = function(file) {
                    //TODO: Handle any error in file reader Onload
                    var binary = file.target.result;
                    resolve(parseFile(binary))
                }
                reader.error = function (e) {
                    //TODO: Handle Error
                    reject(e)
                }
            })

            return promise;

        }else{

           //promise is not supported
        }
    }

    function parseFile(binary){
        var collection = binary.split('\n'),
            entries = collection.length,
            valid = false,

        //deliminator
            firstRow = collection[0],
            secondRow = collection[1],

            reg = /(,)/,
            utf8Characters = /[^\u0020-\u007F]/g,
            deliminator = firstRow.match(reg);

        //number of deliminators should be equal per row
        if (deliminator == null) {
            throw  Error("File Error")
        }
        //columns
        var columns = firstRow.split(',').length;
        //fileMetaData['columns'] = columns;

        var y = entries - 1;

        for (var x = y; x >= 0; x--) {
            /*
             * Should validate deliminator on all rows
             * Should remove header if it exists
             *
             * */
            //columns should be equal
            var d = collection[x].split(',').length;
            if (d !== columns) {
                valid = false;
                //TODO: Handle Error
                throw Error("File Error")
            }
        }

        var parsedFile = {
            file : binary,
            entries : entries
        }
        console.log(parsedFile)
        return parsedFile;
    }

    //public
    SevensJsAPI.parseCSV = function (file) {

        /*
         * Expects a file and query parameter parseCSV([CSV File]file,[String]rr)
         * */
        var file = file;
        try {

            return parseResult(file)

        } catch (e) {
            console.log(e)
            return e
            //TODO: Handle Error
        }
    }

    return SevensJsAPI

}(SevensJs || {}))