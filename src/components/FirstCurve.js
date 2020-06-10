import Mouse from './MouseHandler.js'
import EditCurve from './EditCurve.js'
import SaveCurve from './SaveCurve.js'
import svg from './Svg.js'
import nodeAttributes from './NodeAttributes.js'
import History from './HistoryHandler.js'


let path = null
class FirstCurve
{
    constructor(){
        console.log('FirstCurve Loaded')
        this.coordinates = {
            x1:null,y1:null,
            x2:null,y2:null,
            x3:null,y3:null,
            x4:null,y4:null,
        }
    }
    getCoordinates(){
        return this.coordinates
    }
    setCoordinates(coordinates){
        this.coordinates = coordinates
    }
    process(){
        if(document.querySelector('path.tmpNode') === null){
            path = document.createElementNS('http://www.w3.org/2000/svg',"path");
            path.setAttribute('fill', nodeAttributes.fill)
            path.setAttribute('stroke', nodeAttributes.stroke)
            path.setAttribute('stroke-width', nodeAttributes.strokeWidth)
            path.classList.add('tmpNode')
            svg.appendChild(path)
        } else {
            path = document.querySelector('path.tmpNode')
        }
    }
    setNode(figure){
        path = figure
    }
    getPath(){
        return path
    }
    setSvg(){
        this.process()
        path.classList.remove('hide')
        this.coordinates.x1 = Mouse.getCursorPlusScroll(true).x
        this.coordinates.y1 = Mouse.getCursorPlusScroll(true).y
        this.coordinates.x4 = Mouse.getCursorPlusScroll(true).x-10
        this.coordinates.y4 = Mouse.getCursorPlusScroll(true).y      
        this.move()
        this.up()
    } 

    move(){
        Mouse.setMoveSubscriber(()=>{
            this.coordinates.x3 = Mouse.getCursorPlusScroll(true).x
            this.coordinates.y3 = Mouse.getCursorPlusScroll(true).y
            this.coordinates.x2 = (this.coordinates.x1+Mouse.getCursorPlusScroll(true).x)/2
            this.coordinates.y2 = (this.coordinates.y1+Mouse.getCursorPlusScroll(true).y)/2
            this.draw()
        })
    }
    draw(){
        path.style.display = null
        let d = `
                M ${this.coordinates.x1} ${this.coordinates.y1} 
                q ${(this.coordinates.x2-this.coordinates.x1)} ${(this.coordinates.y2-this.coordinates.y1)} 
                ${this.coordinates.x3-this.coordinates.x1} ${this.coordinates.y3-this.coordinates.y1}`
        path.setAttribute('d', d)
    }
    up(){
        Mouse.setUpSubscriber(()=>{
            Mouse.setMoveSubscriber(null)
            EditCurve.setNode(this)
            EditCurve.editor()
        })
    }

    restore(obj){
        
        let path = document.querySelector(`[id=${obj.id}]`)
        
        if(!path){
            path = document.createElementNS('http://www.w3.org/2000/svg',"path")
            path.id = obj.id    
        }
        path.setAttribute('fill', (obj.fill)?obj.fill:nodeAttributes.fill)
        path.setAttribute('stroke', (obj.stroke)?obj.stroke:nodeAttributes.stroke) 
        path.setAttribute('stroke-width', (obj.strokeWidth)?obj.strokeWidth:nodeAttributes.strokeWidth)
        
        svg.appendChild(path)
        firstCurve.setNode(path)
        firstCurve.setCoordinates(obj.c)
        firstCurve.draw()
        EditCurve.setNode(firstCurve)
        EditCurve.editor()
        SaveCurve.setListeners()
    }
}
let firstCurve = new FirstCurve()
export default firstCurve