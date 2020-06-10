import Storage from './LocalStorage.js'
import { Visualizer } from './Monitor.js'
import historySurf from './HistorySurf.js'
import History from './HistoryHandler.js'
import nodeAttributes from './NodeAttributes.js'

class CurrentSelected
{
    constructor(){
        this.id
    }

    setId(id){
        this.id = id
        // console.error(id)
        // Visualizer.showData(id)
    }
    setHistoryCursor(n){
        let history = Storage.getLocal('history')
        if(n===0){
            this.setId(null)
        } else {
            let id = Object.entries(history)[n-1][0]
            this.setIdAsSelector(id)
        }   
    }
    setIdAsSelector(id){
        this.setId(`[id=${id}]`)
    }

    stroke(){
        let history = Storage.getLocal('history')
        document.querySelectorAll('[filter="url(#f1)"]').forEach(element => {
            if(typeof history[element.id]['stroke'] !== 'undefined'){
                history[element.id]['stroke'] = nodeAttributes.stroke
            }
            if(history[element.id]['t'] === 'text'){
                history[element.id]['fill'] = nodeAttributes.stroke
            }
            History.insertObject(history[element.id])
            historySurf.builder(history[element.id])
        })
    }
    
    weight(){
        let history = Storage.getLocal('history')
        document.querySelectorAll('[filter="url(#f1)"]').forEach(element => {
            if(typeof history[element.id]['strokeWidth'] !== 'undefined'){
                history[element.id]['strokeWidth'] = nodeAttributes.strokeWidth
            }
            History.insertObject(history[element.id])
            historySurf.builder(history[element.id])
        })
    }

    fontSize(){
        let history = Storage.getLocal('history')
        document.querySelectorAll('[filter="url(#f1)"]').forEach(element => {
            if(history[element.id]['t'] === 'text'){
                history[element.id]['fontSize'] = nodeAttributes.fontSize
            }
            History.insertObject(history[element.id])
            historySurf.builder(history[element.id])
        })
    }
}
const currentSelected = new CurrentSelected()
export default currentSelected