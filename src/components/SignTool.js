import MainBtn from './MainBtn.js'
import SignHandler from './SignHandler.js'
import Key from './KeyHandler.js'
import historySurf from './HistorySurf.js'
import { isInsertToolActive } from './InsertTool.js'
import menuSign from './MenuSing.js'
import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'


let mainIcon = 'keyboard'
let penIconList = [
    'menu',
    'drag',
    'input',
    'keyboard',
    'info',
]
export let Sign = new MainBtn()
Sign.switchTool(mainIcon, penIconList, 'sign')
let penBtnGroup = Sign.getNode()
 
menuSign.process(Sign.getIcon('menu'))



export let SingObj = {
    id: 'none', 
    editSing: (string)=>{
        Sign.getIcon('input').value = string
        Sign.getIcon('drag').style.backgroundColor = '#00ff00'
    },
    reset:()=>{
        SingObj.id = 'none'
        Sign.getIcon('drag').style.backgroundColor = 'yellow'
        Sign.getIcon('input').value = ''
    }

}

Sign.getIcon('info').addEventListener('click',()=>{
    alert("Presione las teclas [0-9] o [a-z] para generar un digito. \nTambien puedes hacer click en los botones de la barra de la parte de abajo.\nIMPORTANTE: \nPuedes hacer click y corregir la posicion de los digitos")
})

Sign.getIcon('drag').classList.add('btn')
Sign.getIcon('drag').style.backgroundColor = 'yellow'

Sign.getIcon('drag').addEventListener('mousedown',()=>{
    let string = Sign.getIcon('input').value
    if(Sign.getIcon('input').value === ''){
        return
    }
    if(SingObj.id === 'none'){
        if(!isInsertToolActive() && !historySurf.itIsTheLast()){
            alert("Hay elementos no visibles \nUtilice el Historial para verlos a todos.")
            return
        }
        SignHandler.create(string)
    } else {
        let history = Storage.getLocal('history')
        history[SingObj.id]['text'] = Sign.getIcon('input').value
        History.insertObject(history[SingObj.id])
        SignHandler.restore(history[SingObj.id])
        SingObj.id = 'none'
        Sign.getIcon('drag').style.backgroundColor = 'yellow'
    }
    
    Sign.getIcon('input').value = ''
})

let fousOnInput = false
Sign.getIcon('input').addEventListener('focus', (event) => {
    fousOnInput = true
});
Sign.getIcon('input').addEventListener('blur', (event) => {
    fousOnInput = true
});

export let isSignToolActive = false
Sign.setWhenSwitchOnCallback(()=>{
    isSignToolActive = true
    Sign.getIcon('menu').classList.toggle('hide')
    document.querySelector('.KeyBoard').style.display = 'flex'
    for (let index = 48; index < 58; index++) {  
        Key.addDownListener(index, () => {
            if(fousOnInput){
                return
            }
            if(!isInsertToolActive() && !historySurf.itIsTheLast()){
                alert("65 Hay elementos no visibles \nUtilice el Historial para verlos a todos.")
                return
            }
            let id = `[id=btn-${(index-48)}]`
            SignHandler.prepare(document.querySelector(id).innerText)
        })
    }
    for (let index = 65; index < 91; index++) {
        Key.addDownListener(index, () => {
            if(fousOnInput){
                return
            }
            if(!isInsertToolActive() && !historySurf.itIsTheLast()){
                alert("Hay elementos no visibles \nUtilice el Historial para verlos a todos.")
                return
            }
            let id = `[id=btn-${String.fromCharCode(index).toLowerCase()}]`
            SignHandler.prepare(document.querySelector(id).innerText)
        })
    }
    if(SingObj.id === 'none'){
        Sign.getIcon('drag').style.backgroundColor = 'yellow'
    } else {
        Sign.getIcon('drag').style.backgroundColor = '#00ff00'
    }
    document.querySelectorAll('#controls > svg').forEach(element => {
        element.classList.add('up')
    });
})
Sign.setWhenSwitchOffCallback(()=>{
    isSignToolActive = false
    for (let index = 48; index < 58; index++) {  
        Key.addDownListener(index,null)
    }
    for (let index = 65; index < 91; index++) {
        Key.addDownListener(index, null)
    }
    document.querySelector('.KeyBoard').style.display = 'none'
    document.querySelectorAll('.tmpNode').forEach(element => {
        element.classList.add('hide')
    });
    document.querySelectorAll('#controls > svg').forEach(element => {
        element.classList.remove('up')
    });
})
export default penBtnGroup
console.log('SingTool Loaded')