import { Pen } from './PenTool.js'
import Storage from './LocalStorage.js'
import svg, { isSvgPressed } from './Svg.js'
import History from './HistoryHandler.js'
import nodeAttributes from './NodeAttributes.js'
import helper from './EditHelper.js'

let polygon = null
let F = null
class SaveRectangle
{
    setNode(FirstRectangle){
        F = FirstRectangle
    }
    save(FirstRectangle){
        F = FirstRectangle
        polygon = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
        polygon.setAttribute('fill', nodeAttributes.fill)
        polygon.setAttribute('stroke', nodeAttributes.stroke)
        polygon.setAttribute('stroke-width', nodeAttributes.strokeWidth)
        polygon.id = this.createId()
        svg.appendChild(polygon)
        this.draw()
        this.setListeners()
    }
    createId(){
        let historyElement = History.getNewElement()
        historyElement.c = F.getCoordinates()
        historyElement.t = "polygon"
        historyElement.fill = nodeAttributes.fill
        historyElement.stroke = nodeAttributes.stroke
        historyElement.strokeWidth = nodeAttributes.strokeWidth
        History.insertObject(historyElement)
        return historyElement.id
    }
    update(FirstRectangle){
        F = FirstRectangle
        let history = Storage.getLocal('history')
        let historyElement = history[F.getPolygon().id]
        historyElement.c = F.getCoordinates()
        History.insertObject(historyElement)
    }
    draw(){
        polygon.style.display = null
        let points = `
        ${F.getCoordinates().x1},${F.getCoordinates().y1} 
        ${F.getCoordinates().x3},${F.getCoordinates().y1} 
        ${F.getCoordinates().x3},${F.getCoordinates().y3} 
        ${F.getCoordinates().x1},${F.getCoordinates().y3}`
        polygon.setAttribute('points', points)
    }
    setListeners(){
        document.querySelectorAll('#pizarra-basica > svg > polygon').forEach(element => {
            element.removeEventListener('mouseover',this.over)
            element.removeEventListener('mouseout',this.out)
            element.removeEventListener('mousedown',this.down)
            element.removeEventListener('dblclick',this.dblclick)
            element.addEventListener('mouseover',this.over)
            element.addEventListener('mouseout',this.out)
            element.addEventListener('mousedown',this.down)
            element.addEventListener('dblclick',this.dblclick)
        });
    }
    dblclick(e){
        e.target.removeAttribute('filter')
    }
    down(e){
        if(Pen.isActive){
            F.setPolygon(e.target)
            F.up()
        }
        e.target.setAttribute('filter','url(#f1)')
    }

    over(e){
        if(Pen.isActive && isSvgPressed === false && helper.clicked === null){
            e.target.setAttribute('stroke-width', "10")
        }
    }
    out(e){
        if(Pen.isActive && isSvgPressed === false && helper.clicked === null){
            helper.hidePointers()
            let history = Storage.getLocal('history')
            F.restore(history[e.target.id])
        }
    }
}

let saveRectangle = new SaveRectangle()
export default saveRectangle
console.log('SaveRectangle Loaded')