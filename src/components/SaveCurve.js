import { Pen } from './PenTool.js'
import Storage from './LocalStorage.js'
import svg, { isSvgPressed } from './Svg.js'
import History from './HistoryHandler.js'
import nodeAttributes from './NodeAttributes.js'
import helper from './EditHelper.js'

let path = null
let F = null
class SaveCurve
{
    setNode(FirstCurve){
        F = FirstCurve
    }
    save(FirstCurve){
        F = FirstCurve
        path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        path.setAttribute('fill', nodeAttributes.fill)
        path.setAttribute('stroke', nodeAttributes.stroke)
        path.setAttribute('stroke-width', nodeAttributes.strokeWidth)
        path.id = this.createId()
        svg.appendChild(path)
        this.draw()
        this.setListeners()
    }
    createId(){
        let historyElement = History.getNewElement()
        historyElement.c = F.getCoordinates()
        historyElement.t = "path"
        historyElement.fill = nodeAttributes.fill
        historyElement.stroke = nodeAttributes.stroke
        historyElement.strokeWidth = nodeAttributes.strokeWidth
        History.insertObject(historyElement)
        return historyElement.id
    }
    update(FirstCurve){
        F = FirstCurve
        let history = Storage.getLocal('history')
        let historyElement = history[F.getPath().id]
        historyElement.c = F.getCoordinates()
        History.insertObject(historyElement)
        this.setListeners()
    }
    draw(){
        path.style.display = null
        let d = `
                M ${F.getCoordinates().x1} ${F.getCoordinates().y1} 
                q ${(F.getCoordinates().x2-F.getCoordinates().x1)} ${(F.getCoordinates().y2-F.getCoordinates().y1)} 
                ${F.getCoordinates().x3-F.getCoordinates().x1} ${F.getCoordinates().y3-F.getCoordinates().y1}`
        path.setAttribute('d', d)
    }
    setListeners(){
        document.querySelectorAll('#pizarra-basica > svg > path').forEach(element => {
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
            F.setNode(e.target)
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

let saveCurve = new SaveCurve()
export default saveCurve
console.log('SaveCurve Loaded')