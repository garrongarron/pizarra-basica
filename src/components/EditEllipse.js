import Mouse from './MouseHandler.js'
import Editor from './EditHelper.js'
import SaveEllipse from './SaveEllipse.js'
import Key from './KeyHandler.js'
import Storage from './LocalStorage.js'

let F = null
class EditEllipse
{
    setNode(FirstEllipse){
        F = FirstEllipse
        SaveEllipse.setNode(F)
    }
    editor(){
        if(F.getShape().id.length > 12){
            if(document.querySelector('ellipse.tmpNode')!==null){
                document.querySelector('ellipse.tmpNode').setAttribute('rx', '0')
                document.querySelector('ellipse.tmpNode').setAttribute('ry', '0')
            }
            let history = Storage.getLocal('history')
            F.setCoordinates(history[F.getShape().id].c)
            Key.addDownListener(13,null)
        } else {
            Key.addDownListener(13, ()=>{
                SaveEllipse.save(F)
            })
        }
        document.querySelector('.p1').style.left = F.getCoordinates().x1+'px'
        document.querySelector('.p1').style.top = F.getCoordinates().y1+'px'
        document.querySelector('.p3').style.left = F.getCoordinates().x3+'px'
        document.querySelector('.p3').style.top = F.getCoordinates().y3+'px'
        Editor.setMoveCallback((point)=>{
            let coordinates = F.getCoordinates()
            if(point.className === 'p1'){
                coordinates.x1 = Mouse.getCursorPlusScroll(true).x
                coordinates.y1 = Mouse.getCursorPlusScroll(true).y
            }
            if(point.className === 'p3'){
                coordinates.x3 = Mouse.getCursorPlusScroll(true).x
                coordinates.y3 = Mouse.getCursorPlusScroll(true).y
            }
            F.setCoordinates(coordinates)
            F.draw()
            if(F.getShape().id.length > 12){
                SaveEllipse.update(F)
            }
        })
    }
    
}

let editEllipse = new EditEllipse()
export default editEllipse
console.log('EditEllipse Loaded')