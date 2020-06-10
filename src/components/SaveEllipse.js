import { Pen } from './PenTool.js'
import Storage from './LocalStorage.js'
import svg, { isSvgPressed } from './Svg.js'
import History from './HistoryHandler.js'
import nodeAttributes from './NodeAttributes.js'
import helper from './EditHelper.js'

let ellipse = null
let F = null
class SaveEllipse
{
    constructor(){
        console.log('SaveEllipse Loaded')
        this.shape = null
    }
    setNode(FirstEllipse){
        F = FirstEllipse
    }
    save(FirstEllipse){
        F = FirstEllipse
        ellipse = document.createElementNS('http://www.w3.org/2000/svg',"ellipse");
        ellipse.setAttribute('fill', nodeAttributes.fill)
        ellipse.setAttribute('stroke', nodeAttributes.stroke)
        ellipse.setAttribute('stroke-width', nodeAttributes.strokeWidth)
        ellipse.id = this.createId()
        svg.appendChild(ellipse)
        this.draw()
    }
    createId(){
        let historyElement = History.getNewElement()
        historyElement.c = F.getCoordinates()
        historyElement.t = "ellipse"
        historyElement.fill = nodeAttributes.fill
        historyElement.stroke = nodeAttributes.stroke
        historyElement.strokeWidth = nodeAttributes.strokeWidth
        History.insertObject(historyElement)
        return historyElement.id
    }
    update(shape){
        let history = Storage.getLocal('history')
        let historyElement = history[shape.getShape().id]
        historyElement.c = shape.getCoordinates()
        History.insertObject(historyElement)
    }
    draw(){
        ellipse.style.display = null
        ellipse.setAttribute('cx', (F.getCoordinates().x1+F.getCoordinates().x3)/2)
        ellipse.setAttribute('cy', (F.getCoordinates().y1+F.getCoordinates().y3)/2)
        ellipse.setAttribute('rx', Math.abs((F.getCoordinates().x3-F.getCoordinates().x1)/2))
        ellipse.setAttribute('ry', Math.abs((F.getCoordinates().y3-F.getCoordinates().y1)/2))
        this.setListeners()
    }
    setListeners(){
        document.querySelectorAll('#pizarra-basica > svg > ellipse').forEach(element => {
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
            F.setShape(e.target)
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

let saveEllipse = new SaveEllipse()
export default saveEllipse