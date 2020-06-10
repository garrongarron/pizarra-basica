import Storage from './LocalStorage.js'
import historySurf from './HistorySurf.js'
import { isInsertToolActive } from './InsertTool.js'

class HistoryHandler
{
    insertObject(obj){
        let isNewOne = historySurf.isNewOne(obj)
        if(isInsertToolActive()){
            this.insertInTheMiddle(obj.id, obj)
        } else {
            this.insertObjectById(obj.id, obj)
        }
        if(isNewOne){
            historySurf.SetCursorAhead()
        }
    }

    insertInTheMiddle(index, obj){
        let history = Storage.getLocal('history')
        let n = 0
        let tmp = {}
        for (const id in history) {
            if (history.hasOwnProperty(id)) {
                if(historySurf.getCursor() === n){
                    tmp[index] = obj
                }
                n++
                tmp[id] = history[id]
            }
        }
        history = tmp
        Storage.setLocal('history',history);
        
    }

    insertObjectById(key, value){
        let history = Storage.getLocal('history')
        history[key] = value
        Storage.setLocal('history',history);
    }

    getNewElement(type){
        return {
            id:'id'+Math.round(new Date().getTime()/100),
            type:type
        }
    }
}

const History = new HistoryHandler();
export default History;
console.log('HistoryHandler Loaded')