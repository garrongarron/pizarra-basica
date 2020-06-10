import Mouse from './MouseHandler.js'
import EditEllipse from './EditEllipse.js'
import svg from './Svg.js'
import SaveEllipse from './SaveEllipse.js'
import nodeAttributes from './NodeAttributes.js'
import History from './HistoryHandler.js'

let ellipse = null

class FirstEllipse
{
    constructor(){
        console.log('FirstEllipse Loaded')
        this.coordinates = {
            x1:null,y1:null,
            x3:null,y3:null,
        }
    }
    getCoordinates(){
        return this.coordinates
    }
    setCoordinates(coordinates){
        this.coordinates = coordinates
    }
    process(){
        if(document.querySelector('ellipse.tmpNode') === null){
            ellipse = document.createElementNS('http://www.w3.org/2000/svg',"ellipse");
            ellipse.setAttribute('fill', nodeAttributes.fill)
            ellipse.setAttribute('stroke', nodeAttributes.stroke)
            ellipse.setAttribute('stroke-width', nodeAttributes.strokeWidth)
            ellipse.classList.add('tmpNode')
            svg.appendChild(ellipse)
        } else {
            ellipse = document.querySelector('ellipse.tmpNode')
        }
    }
    setShape(figure){
        ellipse = figure
    }
    getShape(){
        return ellipse
    }
    setSvg(){
        this.process()
        ellipse.classList.remove('hide')
        this.coordinates.x1 = Mouse.getCursorPlusScroll(true).x
        this.coordinates.y1 = Mouse.getCursorPlusScroll(true).y   
        this.move()
        this.up()
    }
    move(){
        Mouse.setMoveSubscriber(()=>{
            this.coordinates.x3 = Mouse.getCursorPlusScroll(true).x
            this.coordinates.y3 = Mouse.getCursorPlusScroll(true).y
            this.draw()
        })
    }
    draw(){
        ellipse.style.display = null
        ellipse.setAttribute('cx', (this.coordinates.x1+this.coordinates.x3)/2)
        ellipse.setAttribute('cy', (this.coordinates.y1+this.coordinates.y3)/2)
        ellipse.setAttribute('rx', Math.abs((this.coordinates.x3-this.coordinates.x1)/2))
        ellipse.setAttribute('ry', Math.abs((this.coordinates.y3-this.coordinates.y1)/2))
    }
    up(){
        Mouse.setUpSubscriber(()=>{
            Mouse.setMoveSubscriber(null)
            EditEllipse.setNode(this)
            EditEllipse.editor()
        })
    }
    restore(obj){
        let ellipse = document.querySelector(`[id=${obj.id}]`)
        if(!ellipse){
            ellipse = document.createElementNS('http://www.w3.org/2000/svg',"ellipse")
            ellipse.id = obj.id
        }
        ellipse.setAttribute('fill', (obj.fill)?obj.fill:nodeAttributes.fill)
        ellipse.setAttribute('stroke', (obj.stroke)?obj.stroke:nodeAttributes.stroke) 
        ellipse.setAttribute('stroke-width', (obj.strokeWidth)?obj.strokeWidth:nodeAttributes.strokeWidth)
        svg.appendChild(ellipse)
        firstEllipse.setShape(ellipse)
        firstEllipse.setCoordinates(obj.c)
        firstEllipse.draw()
        EditEllipse.setNode(firstEllipse)
        EditEllipse.editor()
        SaveEllipse.setListeners()
    }
}
let firstEllipse = new FirstEllipse()
export default firstEllipse