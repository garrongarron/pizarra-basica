import Mouse from './MouseHandler.js'
import Editor from './EditHelper.js'
import SaveCurve from './SaveCurve.js'
import Key from './KeyHandler.js'
import Storage from './LocalStorage.js'

let F = null
class EditCurve
{
    setNode(FirstCurve){
        F = FirstCurve
        SaveCurve.setNode(F)
    }
    editor(){
        if(F.getPath().id.length > 12){
            if(document.querySelector('path.tmpNode') !== null){
                document.querySelector('path.tmpNode').setAttribute('d', 'M 50 50 q 0 0 0 0')
            }
            let history = Storage.getLocal('history')
            F.setCoordinates(history[F.getPath().id].c)
            Key.addDownListener(13,null)
        } else {
            Key.addDownListener(13, ()=>{
                SaveCurve.save(F)
            })
        }
        document.querySelector('.p1').style.left = F.getCoordinates().x1+'px'
        document.querySelector('.p1').style.top = F.getCoordinates().y1+'px'
        document.querySelector('.p2').style.left = F.getCoordinates().x2+'px'
        document.querySelector('.p2').style.top = F.getCoordinates().y2+'px'
        document.querySelector('.p3').style.left = F.getCoordinates().x3+'px'
        document.querySelector('.p3').style.top = F.getCoordinates().y3+'px'
        document.querySelector('.p4').style.left = F.getCoordinates().x1-10+'px'
        document.querySelector('.p4').style.top = F.getCoordinates().y1+'px'
        Editor.setMoveCallback((point)=>{
            let coordinates = F.getCoordinates()
            if(point.className === 'p1'){
                coordinates.x1 = Mouse.getCursorPlusScroll(true).x
                coordinates.y1 = Mouse.getCursorPlusScroll(true).y
            }
            if(point.className === 'p2'){
                coordinates.x2 = Mouse.getCursorPlusScroll(true).x
                coordinates.y2 = Mouse.getCursorPlusScroll(true).y
            }
            if(point.className === 'p3'){
                coordinates.x3 = Mouse.getCursorPlusScroll(true).x
                coordinates.y3 = Mouse.getCursorPlusScroll(true).y
            }
            if(point.className === 'p4'){
                let mx = coordinates.x4-Mouse.getCursorPlusScroll(true).x
                coordinates.x1 -= mx
                coordinates.x2 -= mx
                coordinates.x3 -= mx
                coordinates.x4 = Mouse.getCursorPlusScroll(true).x
                let my = coordinates.y4-Mouse.getCursorPlusScroll(true).y
                coordinates.y1 -= my
                coordinates.y2 -= my
                coordinates.y3 -= my
                coordinates.y4 = Mouse.getCursorPlusScroll(true).y

                document.querySelector('.p1').style.left = coordinates.x1+'px'
                document.querySelector('.p1').style.top = coordinates.y1+'px'
                document.querySelector('.p2').style.left = coordinates.x2+'px'
                document.querySelector('.p2').style.top = coordinates.y2+'px'
                document.querySelector('.p3').style.left = coordinates.x3+'px'
                document.querySelector('.p3').style.top = coordinates.y3+'px'
            }
            F.setCoordinates(coordinates)
            F.draw()
            if(F.getPath().id.length > 12){
                SaveCurve.update(F)
            }          
        })
    }
    
}

let editor = new EditCurve()
export default editor
console.log('EditCurve Loaded')