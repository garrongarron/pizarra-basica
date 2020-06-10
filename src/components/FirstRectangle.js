import Mouse from './MouseHandler.js'
import EditRectangle from './EditRectangle.js'
import SaveRectangle from './SaveRectangle.js'
import svg from './Svg.js'
import nodeAttributes from './NodeAttributes.js'
import History from './HistoryHandler.js'

let polygon = null
class FirstRectangle
{
    constructor(){
        console.log('FirstRectangle Loaded')
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
        if(document.querySelector('polygon.tmpNode') === null){
            polygon = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
            polygon.setAttribute('fill', nodeAttributes.fill)
            polygon.setAttribute('stroke', nodeAttributes.stroke)
            polygon.setAttribute('stroke-width', nodeAttributes.strokeWidth)
            polygon.classList.add('tmpNode')
            svg.appendChild(polygon)
        } else {
            polygon = document.querySelector('polygon.tmpNode')
        }
    }
    setPolygon(figure){
        polygon = figure
    }
    getPolygon(){
        return polygon
    }
    setSvg(){
        this.process()
        polygon.classList.remove('hide')
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
        polygon.style.display = null
        let points = `
        ${this.coordinates.x1},${this.coordinates.y1} 
        ${this.coordinates.x3},${this.coordinates.y1} 
        ${this.coordinates.x3},${this.coordinates.y3} 
        ${this.coordinates.x1},${this.coordinates.y3}`
        polygon.setAttribute('points', points)
    }
    up(){
        Mouse.setUpSubscriber(()=>{
            Mouse.setMoveSubscriber(null)
            EditRectangle.setNode(this)
            EditRectangle.editor()
        })
    }
    restore(obj){
        let polygon = document.querySelector(`[id=${obj.id}]`)
        if(!polygon){
            polygon = document.createElementNS('http://www.w3.org/2000/svg',"polygon")
            polygon.id = obj.id
        }
        polygon.setAttribute('fill', (obj.fill)?obj.fill:nodeAttributes.fill)
        polygon.setAttribute('stroke', (obj.stroke)?obj.stroke:nodeAttributes.stroke) 
        polygon.setAttribute('stroke-width', (obj.strokeWidth)?obj.strokeWidth:nodeAttributes.strokeWidth)
        svg.appendChild(polygon)
        firstRectangle.setPolygon(polygon)
        firstRectangle.setCoordinates(obj.c)
        firstRectangle.draw()
        EditRectangle.setNode(firstRectangle)
        EditRectangle.editor()
        SaveRectangle.setListeners()
    }
}
let firstRectangle = new FirstRectangle()
export default firstRectangle