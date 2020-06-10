import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'
import historySurf from './HistorySurf.js'
let displayNode = document.createElement('div')
displayNode.classList.add('monitor')
let btn = document.createElement('button')
btn.innerText = 'Actualizar'
btn.addEventListener('click', (e)=>{
    

})
let input = document.createElement('input')



btn.addEventListener('click', (e)=>{
    let history = Storage.getLocal('history')
    let input = e.target.previousSibling
    history[input.id][input.getAttribute('key')] = input.value
    History.insertObjectById(input.id,history[input.id] )
    historySurf.update()
        
})
class Monitor
{
    getNode(){
        return displayNode
    }

    setData(json){
        input.id = json.id
        if(json.t === 'audio')  {
            input.setAttribute('key', 'audio' )
            input.value = json['audio']
            displayNode.append(input)
            displayNode.append(btn)
            displayNode.classList.remove('hide')
        } else if(json.t === 'text')  {
            input.setAttribute('key', 'text' )
            input.value = json['text']
            displayNode.append(input)
            displayNode.append(btn)
            displayNode.classList.remove('hide')
        } else {
            displayNode.innerHTML = ''
            displayNode.classList.add('hide')
        }
        
        
        
    }

    showData(id){
        if(id === null){
            return
        }
        let index = document.querySelector(id).id
        let history = Storage.getLocal('history')
        this.setData(history[index])
    }

    
}

export const Visualizer = new Monitor()
let monitor = Visualizer.getNode()
export default monitor