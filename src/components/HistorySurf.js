import { Display } from './AudioDisplay.js'
import Storage from './LocalStorage.js'
import FirstRectangle from './FirstRectangle.js'
import FirstEllipse from './FirstEllipse.js'
import FirstCurve from './FirstCurve.js'
import SignHandler from './SignHandler.js'
// import currentSelected from './CurrentSelected.js'
import speakerHandler from './SpeakerHandler.js'

class HistorySurf
{
    constructor(builders){
        console.log('HistorySurf Loaded')
        this.builders = builders
        this.n = 0
    }

    //AHEAD
    ahead(){
        let history = Storage.getLocal('history')
        let HistoryArray = Object.entries(history)
        if(this.n>HistoryArray.length-1){
            return
        }
        this.builder(Object.entries(history)[this.n++][1])
    }

    //BACK
    back(){
        if(this.n<1){
            return
        }

        let history = Storage.getLocal('history')
        let HistoryArray = Object.entries(history)
        let backIsAudio = this.isAudio(this.n-2, HistoryArray)
        let itIsAudio = this.isAudio(this.n-1, HistoryArray)
        if(itIsAudio){
            Display.none()
        } else {
            let HistoryElement = HistoryArray[this.n-1]
            let id = HistoryElement[0]
            let node = document.querySelector(`[id=${id}]`)
            if(node!==null){
                document.querySelector(`[id=${id}]`).remove()
            }
            
        }
        if(backIsAudio){
            // Display.setContent(HistoryArray[this.n-2][1].audio)
            this.builder(HistoryArray[this.n-2][1])
        } else {
            Display.none()
        }
        
        this.n--
    }
    isAudio(n, HistoryArray){
        if(typeof HistoryArray[n] === 'undefined'){
            return false
        }
        let obj = HistoryArray[n][1]
        return obj.t === 'audio'
    }

    builder(obj){
        Display.none()
        this.builders[obj.t].restore(obj)
    }

    update(){
        
        // let history = Storage.getLocal('history')
        // let obj = history[document.querySelector(currentSelected.id).id]
        // if(typeof obj === 'undefined'){
        //     return
        // }
        // this.builder(obj)        
    }

    getCursor(){
        return this.n
    }
    
    isNewOne(obj){
        let history = Storage.getLocal('history')
        if(typeof history[obj.id] === 'undefined'){
            return true
        }
        return false
    }
    SetCursorAhead(obj){
        this.n++
    }
    resetCursor(){
        this.n = 0
    }

    goToBegining(){
        speakerHandler.disable()
        do {
            this.back()
        }
        while (this.n > 0);
        speakerHandler.enable()
    }

    goToEnding(){
        speakerHandler.disable()
        do {
            this.ahead()
        }
        while (!this.itIsTheLast())
        speakerHandler.enable()
    }

    itIsTheLast(){
        let history = Storage.getLocal('history')
        let length = Object.entries(history).length
        return this.n === length
    }
}

const historySurf = new HistorySurf({
    'text':SignHandler,
    'path':FirstCurve,
    'polygon':FirstRectangle,
    'ellipse':FirstEllipse,
    'audio':Display
})

export default historySurf