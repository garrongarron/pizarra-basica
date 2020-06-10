import svg from './Svg.js'
import Mouse from './MouseHandler.js'
import keyBoard from './KeyBoard.js'
import { isSignToolActive, SingObj } from './SignTool.js'
import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'
import topBar from './TopBar.js'
import nodeAttributes from './NodeAttributes.js'

let text = null
class SignHandler
{
    constructor(){
        this.stiker = false
        console.log('SignHandler Loaded')
    }
    create(string){
        text = document.createElementNS('http://www.w3.org/2000/svg',"text")
        text.setAttribute('x',Mouse.getCursorPlusScroll(true).x)
        text.setAttribute('y',Mouse.getCursorPlusScroll(true).y)
        text.setAttribute('fill', nodeAttributes.stroke);// no fill
        text.setAttribute('font-size', nodeAttributes.fontSize);
        text.textContent = string
        svg.appendChild(text)
        keyBoard.classList.add('hide')
        topBar.classList.add('hide')
        this.move()
        this.up()
    }
    move(){
        Mouse.setMoveSubscriber(()=>{
            text.setAttribute('x',Mouse.getCursorPlusScroll(true).x)
            text.setAttribute('y',Mouse.getCursorPlusScroll(true).y)
        })
    }
    up(){
        Mouse.setUpSubscriber(()=>{
            keyBoard.classList.remove('hide')
            topBar.classList.remove('hide')
            text.addEventListener('mousedown', this.click)
            text.addEventListener('dblclick', this.dblclick)
            this.newOne()
            Mouse.setMoveSubscriber(null)
        })
    }
    dblclick(e){
        e.target.removeAttribute('filter')
        SingObj.reset()
    }
    
    click(e){
        e.target.setAttribute('filter','url(#f1)')
        SingObj.id = e.target.id
        SingObj.editSing(e.target.textContent)
        if(!isSignToolActive){
            return
        }
        this.stiker = false
        
        Mouse.setMoveSubscriber(()=>{
            e.target.setAttribute('x',Mouse.getCursorPlusScroll(true).x)
            e.target.setAttribute('y',Mouse.getCursorPlusScroll(true).y)
            let history = Storage.getLocal('history')
            let historyElement = history[e.target.id]
            historyElement.c = {
                x:e.target.getAttribute('x'),
                y:e.target.getAttribute('y')
            }
            History.insertObject(historyElement)
        })
        Mouse.setUpSubscriber(()=>{
            Mouse.setMoveSubscriber(null)
        })
    }
    
    restore(obj){
        let text = document.querySelector(`[id=${obj.id}]`)
        if(!text){
            text = document.createElementNS('http://www.w3.org/2000/svg',"text")
            text.id = obj.id
        }
        text.setAttribute('fill', (obj.fill)?obj.fill:nodeAttributes.stroke);
        text.setAttribute('font-size', (obj.fontSize)?obj.fontSize:nodeAttributes.fontSize);

        text.setAttribute('x',obj.c.x)
        text.setAttribute('y',obj.c.y)
        text.textContent = obj.text
        text.addEventListener('mousedown', signHandler.click)
        text.addEventListener('dblclick', this.dblclick)
        svg.appendChild(text)
    }

    prepare(string){
        if(this.stiker === false){
            this.stiker = true
            text = document.createElementNS('http://www.w3.org/2000/svg',"text")
        }
        text.setAttribute('x',Mouse.getCursorPlusScroll(true).x)
        text.setAttribute('y',Mouse.getCursorPlusScroll(true).y)
        text.setAttribute('fill', nodeAttributes.stroke);
        text.setAttribute('font-size', nodeAttributes.fontSize);
        text.textContent = string
        svg.appendChild(text)
        Mouse.setMoveSubscriber(()=>{
            text.setAttribute('x',Mouse.getCursorPlusScroll(true).x)
            text.setAttribute('y',Mouse.getCursorPlusScroll(true).y)
        })
        Mouse.setUpSubscriber(()=>{
            this.stiker = false
            this.newOne()
            text.addEventListener('mousedown', this.click)
            Mouse.setMoveSubscriber(null)
        })
    }

    newOne(){
        let historyElement = History.getNewElement()
            historyElement.t = 'text'
            historyElement.c = {
                x:text.getAttribute('x'),
                y:text.getAttribute('y')
            }
            historyElement.text = text.textContent
            text.id = historyElement.id
            History.insertObject(historyElement)
            Mouse.setUpSubscriber(null)
    }
}
let signHandler = new SignHandler()
export default signHandler
