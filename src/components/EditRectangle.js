import Mouse from './MouseHandler.js'
import Editor from './EditHelper.js'
import SaveRectangle from './SaveRectangle.js'
import Key from './KeyHandler.js'
import Storage from './LocalStorage.js'

let F = null
class EditRectangle
{   
    setNode(FirstRectangle){
        F = FirstRectangle
        SaveRectangle.setNode(F)
    }
    editor(){
       if(F.getPolygon().id.length > 12){
            if(document.querySelector('polygon.tmpNode') !== null){
                document.querySelector('polygon.tmpNode').setAttribute('points', '0 0 0 0 0 0 0 0')
            }
            let history = Storage.getLocal('history')
            F.setCoordinates(history[F.getPolygon().id].c)
            Key.addDownListener(13,null)
        } else {
            Key.addDownListener(13, ()=>{
                SaveRectangle.save(F)
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
            if(F.getPolygon().id.length > 12){
                SaveRectangle.update(F)
            }
        })
    }
    
}

let editor = new EditRectangle()
export default editor
console.log('EditRectangle Loaded')