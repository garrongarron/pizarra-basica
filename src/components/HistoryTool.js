import historySurf from './HistorySurf.js'
import MainBtn from './MainBtn.js'
import Key from './KeyHandler.js'
import getIcon from './Icons.js'

let mainIcon = 'history'
let penIconList = [
    'lock',
    'unlock',
    '<<',
    '|<',
    '>|',
    '>>',
    'history',
    'info'
]
export let History = new MainBtn()
History.switchTool(mainIcon, penIconList, 'history')

export let isHistoryToolActive = false
History.getIcon('info').addEventListener('click',()=>{
    alert("Para avanzar y retroceder en el historial: \n\nPresiona la tecla Control \ny sin solatar la tecla presione \nla flecha de la derecha [→] \no la felcha izquierda [←]")
})

let controls = document.createElement('div')
controls.id = 'controls'
let controlBtn = {
    'back2':getIcon('<<'),
    'back1':getIcon('|<'),
    'ahead1':getIcon('>|'),
    'ahead2':getIcon('>>'),
}
for (const key in controlBtn) {
    if (controlBtn.hasOwnProperty(key)) {
        const element = controlBtn[key];
        controls.appendChild(element)
        element.classList.add('hide')
    }
}

let loked = true
History.getIcon('lock').addEventListener('click',()=>{
    loked = false
    History.getIcon('lock').classList.add('hide')
    History.getIcon('unlock').classList.remove('hide')
    for (const key in controlBtn) {
        if (controlBtn.hasOwnProperty(key)) {
            const element = controlBtn[key];
            element.classList.add('hide')
        }
    }
})
History.getIcon('unlock').addEventListener('click',()=>{
    loked = true
    History.getIcon('lock').classList.remove('hide')
    History.getIcon('unlock').classList.add('hide')
    for (const key in controlBtn) {
        if (controlBtn.hasOwnProperty(key)) {
            const element = controlBtn[key];
            element.classList.remove('hide')
        }
    }
})

setTimeout(()=>{
    document.querySelector('#pizarra-basica').appendChild(controls)
    
}, 1000) 




// History.getIcon('>>').style.backgroundColor = 'yellow'
// History.getIcon('<<').style.backgroundColor = 'yellow'

controlBtn['back2'].addEventListener('click', ()=>historySurf.goToBegining())
controlBtn['back1'].addEventListener('click', ()=>historySurf.back())
controlBtn['ahead1'].addEventListener('click',()=> historySurf.ahead())
controlBtn['ahead2'].addEventListener('click', ()=>historySurf.goToEnding())
History.getIcon('<<').addEventListener('click',()=> historySurf.goToBegining())
History.getIcon('|<').addEventListener('click', ()=>historySurf.back())
History.getIcon('>|').addEventListener('click', ()=>historySurf.ahead())
History.getIcon('>>').addEventListener('click', ()=>historySurf.goToEnding())






let history = History.getNode()
History.setWhenSwitchOnCallback(()=>{
    isHistoryToolActive = true
    
        Key.addDownListener(39,()=>{
            if(Key.isKeyPressed(17)){
                History.getIcon('>|').style.backgroundColor = 'red'
                historySurf.ahead()
            } 
        })
        Key.addUpListener(39,()=>{
            if(Key.isKeyPressed(17)){
                History.getIcon('>|').style.backgroundColor = null
            } 
        })

        Key.addDownListener(37,()=>{
            if(Key.isKeyPressed(17)){
                History.getIcon('|<').style.backgroundColor = 'red'
                historySurf.back()
            } 
        })
        Key.addUpListener(37,()=>{
            if(Key.isKeyPressed(17)){
                History.getIcon('|<').style.backgroundColor = null
            } 
        })
    
        
})
History.setWhenSwitchOffCallback(()=>{
    isHistoryToolActive = false
    Key.addDownListener(37,null)
    Key.addDownListener(39,null)
})
History.setWhenSwitchOnCallback(()=>{
    let icon = (!loked)?'unlock':'lock'
    History.getIcon(icon).classList.add('hide')
})

export default history
console.log('HistoryTool Loaded')