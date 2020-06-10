let input = null

class ImportFile
{
    constructor(){
        input = document.createElement('input')
        input.setAttribute('type','file')
        input.setAttribute('accept','text/plain')
        input.style.display = 'none'
        document.body.appendChild(input)
        input.addEventListener('change', this.setCallBack )
    }
    
    upload(e, callback) {
        var file = e.target.files[0];
        var textType = 'application/json'    ;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                callback(reader.result)
            }

            reader.readAsText(file);    
        } else {
            console.error('error', e)
        }
    }

    setObjectAndCallback(obj, callBack){
        this.obj = obj
        this.setInnerCallBack(callBack)
        this.obj.addEventListener('click', ()=>{
            input.click()
        })
    }
    setCallBack(e){
        Import.upload(e, Import.callback)
    }

    setInnerCallBack(callback){
        this.callback = callback || function(json){console.error(`Callback not defined on Import.onChange(cssSelector, callback) method. Result is ${json}`)}
    }

}
const Import = new ImportFile();
export default Import