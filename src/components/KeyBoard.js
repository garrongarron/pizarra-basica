import keyBtn from './KeyBtn.js'
import getIcon from './Icons.js'
import { Sign as SignTool} from './SignTool.js'
class KeyBoard
{
    constructor(){
        console.log('KeyBoard Loaded')
        this.keyBoard = document.createElement('div')
        this.keyBoard.className = 'KeyBoard'
        this.buttons = '1234567890abcdefghijklmnopqrstuvwxyz'
        this.btn = Array.from(this.buttons)
        this.insertKeys()
        this.insertAdditionalKey()
        
    }
    getKeyBoard(){
        return this.keyBoard
    }
    insertKeys(){
        keyBtn.createKey(this.btn, this.keyBoard)
    }

    insertAdditionalKey(){
        let key = document.createElement('div')
        let icon = document.createElement('div')
        icon.className = 'btn-name'
        icon.innerHTML = '&nbsp;'

        let sign = getIcon('burger')
        // let sing = document.createElement('div')
        sign.classList.add('btn-menu')
        // sign.innerText = '+'
        key.appendChild(icon)
        key.appendChild(sign)
        this.keyBoard.appendChild(key)
        sign.addEventListener('click', ()=>{
            SignTool.getIcon('menu').classList.toggle('hide')
        })
        
        
    }
}

let keyBoard = new KeyBoard()
let kb = keyBoard.getKeyBoard()
export default kb