import SignHandler from './SignHandler.js'
import historySurf from './HistorySurf.js';
import { isInsertToolActive } from './InsertTool.js'
import { Sign } from './SignTool.js'


class KeyBtn
{
    createKey(btnArray, keyBoard){
        btnArray.forEach(element => {
            let key = document.createElement('div')

            let icon = document.createElement('div')
            icon.className = 'btn-name'
            icon.innerText = element
            

            let sing = document.createElement('div')
            sing.className = 'btn-content'
            sing.innerText = element
            sing.id = 'btn-'+element
            this.addListeners(sing)
            key.appendChild(icon)
            key.appendChild(sing)
            keyBoard.appendChild(key)
        });
    }

    addListeners(element){
        element.addEventListener('mousedown', (e)=>{
            if(!isInsertToolActive() && !historySurf.itIsTheLast()){
                alert("Hay elementos no visibles \nUtilice el Historial para verlos a todos.")
                return
            }
            SignHandler.create(e.target.innerText)
        })
    }
}

let keyBtn = new KeyBtn()
export default keyBtn
console.log('KeyBtn Loaded')