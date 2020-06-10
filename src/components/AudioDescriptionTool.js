import { Display } from './AudioDisplay.js'
import MainBtn from './MainBtn.js'
import historySurf from './HistorySurf.js'
import Storage from './LocalStorage.js'
import { isInsertToolActive } from './InsertTool.js'

let mainIcon = 'audioDescription'
let penIconList = [
    'subtitle',
    'input',
    'speakerOn',
    'speakerOff',
    // 'eyeVisible',
    // 'eyeInvisible',
    'audioDescription',
    'info'
]

export let AudioDescription = new MainBtn()

// AudioDescription.switcher('audioDescription')
AudioDescription.switchTool(mainIcon, penIconList, 'audioDescription')

AudioDescription.getIcon('subtitle').classList.add('btn')
AudioDescription.getIcon('subtitle').style.backgroundColor = 'yellow'


AudioDescription.getIcon('speakerOff').addEventListener('click', ()=>{
    AudioDescription.getIcon('speakerOff').classList.add('hide')
    AudioDescription.getIcon('speakerOn').classList.remove('hide')
    isSpeakerAvailable = true
    Storage.setLocal('speaker',isSpeakerAvailable)
})

export let isSpeakerAvailable = Storage.getLocal('speaker',false)

AudioDescription.getIcon('speakerOn').addEventListener('click', ()=>{
    AudioDescription.getIcon('speakerOff').classList.remove('hide')
    AudioDescription.getIcon('speakerOn').classList.add('hide')
    isSpeakerAvailable = false
    Storage.setLocal('speaker',isSpeakerAvailable)
})

export let subtitle = {
    id: 'none', 
    setSubtitle: (string)=>{
        AudioDescription.getIcon('input').value = string
    }
}

AudioDescription.getIcon('subtitle').addEventListener('click', ()=>{
    let string =  AudioDescription.getIcon('input').value
    if(subtitle.id === 'none'){
        if(!isInsertToolActive() && !historySurf.itIsTheLast()){
            alert("Para insertar un subtitulo debe activar el modo insersion. \nO bien, ir al final del historial.")
        } else {
            Display.createId(string)
        }
    } else {
        Display.update(subtitle.id,string )
    }
    subtitle.id = 'none'
    AudioDescription.getIcon('input').value = ''
})

AudioDescription.getIcon('audioDescription').addEventListener('click',()=>{
    if(AudioDescription.getIcon('audioDescription').getAttribute('isActive') === "true"){
        AudioDescription.getIcon('audioDescription').classList.remove('active')
        AudioDescription.getIcon('audioDescription').setAttribute('isActive', "false")
    } else {
        AudioDescription.getIcon('audioDescription').setAttribute('isActive', "true")
        AudioDescription.getIcon('audioDescription').classList.add('active')
    }
})

AudioDescription.setWhenSwitchOnCallback(()=>{
    let icon = (!isSpeakerAvailable)?'speakerOn':'speakerOff'
    AudioDescription.getIcon(icon).classList.add('hide')
})

let audioDescriptionTool = AudioDescription.getNode()
export default audioDescriptionTool
console.log('AudioDescriptionTool Loaded')