import History from './HistoryHandler.js'
import { subtitle } from './AudioDescriptionTool.js'
import Storage from './LocalStorage.js'
import speakerHandler from './SpeakerHandler.js'

let displayNode = document.createElement('div')
displayNode.classList.add('display')
displayNode.classList.add('hide')
let contentNode = document.createElement('div')
displayNode.appendChild(contentNode)

class AudioDisplay
{
    getDisplay(){
        return displayNode
    }

    setContent(string){
        contentNode.innerText = string
        speakerHandler.speak(string)
    }

    setId(id){
        contentNode.id = id
    }

    setListener(){
        contentNode.addEventListener('click', (e)=>{
            subtitle.id = e.target.id
            subtitle.setSubtitle(e.target.innerText)
        })
    }

    createId(string){
        displayNode.classList.remove('hide')
        let historyElement = History.getNewElement()
        historyElement.t = "audio"
        historyElement.audio = string
        History.insertObject(historyElement)
        this.setContent(string)
        this.setId(historyElement.id)
    }

    update(id,string ){
        let history = Storage.getLocal('history')
        let obj = history[id]
        obj.audio = string
        this.setContent(string)
        History.insertObjectById(subtitle.id, obj)
    }
    restore(obj){
        displayNode.classList.remove('hide')
        this.setContent(obj.audio)
        this.setId(obj.id)
    }
    none(){
        displayNode.classList.add('hide')
    }
    
    
}

export const Display = new AudioDisplay()
Display.setListener()
let audioDisplay = Display.getDisplay()
export default audioDisplay
console.log('HistorySurf Loaded')
