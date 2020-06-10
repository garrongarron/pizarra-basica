import Mouse from './MouseHandler.js'

class EditHelper
{
    constructor(){
        this.points = []
        window.onload = () => {
            let points = document.createElement('div')
            points.className ='points'
            for (let index = 1; index < 5; index++) {
                let p = document.createElement('div')
                p.className = 'p'+index
                p.addEventListener('mousedown', this.down)
                points.appendChild(p)
                this.points.push(p)
            }
            document.querySelector('[id=pizarra-basica]').appendChild(points)
        }
        this.clicked = null
        this.moveCallback = null
    }
    getClicked(){
        return this.clicked
    }
    setClicked(clicked){
        this.clicked = clicked
    }
    down(e){
        helper.setClicked(e.target)
        Mouse.setMoveSubscriber(helper.move)
        Mouse.setUpSubscriber(()=>{
            helper.setClicked(null)
            Mouse.setMoveSubscriber(null)
        })
    }
    move(){
        helper.getClicked().style.left = Mouse.getCursorPlusScroll(true).x+'px'
        helper.getClicked().style.top = Mouse.getCursorPlusScroll(true).y+'px' 
        if(typeof helper.getMoveCallback() === 'function'){
            helper.getMoveCallback()(helper.getClicked())
        }
    }
    setMoveCallback(cb){
        this.moveCallback = cb
    }
    getMoveCallback(){
        return this.moveCallback
    }
    hidePointers(){
        this.points.forEach(element => {
            element.style.left = '-100px'
            element.style.top = '-100px'
        });
    }
}
let helper = new EditHelper()
export default helper
console.log('EditHelper Loaded')