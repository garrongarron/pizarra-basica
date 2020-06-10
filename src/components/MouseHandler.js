import {distance as gridUnit} from './Grid.js'

let grid = gridUnit/1
const cursor = {
    x:null,
    y:null
}
let moveSubscriber = null
let upSubscriber = null
let downSubscriber = null
class MouseHandle
{
    constructor(size){
        console.log('MouseHandle Loaded')
        document.addEventListener('mousemove', this.move)
        document.addEventListener('mousedown', this.down)
        document.addEventListener('mouseup', this.up)
        window.addEventListener('scroll', function(e) {
            // console.log(document.documentElement.scrollTop)
        })
    }

    getCursorPlusScroll(gridded){
        if(gridded){
            return {
                x: Math.round((cursor.x+Mouse.getScroll().x)/grid)*grid,
                y: Math.round((cursor.y+Mouse.getScroll().y)/grid)*grid 
            }
        }
        return {
            x:cursor.x+Mouse.getScroll().x,
            y:cursor.y+Mouse.getScroll().y
        }
    }
    

    getCursor(graphic){
        if(graphic){
            return {
                x:cursor.x,
                y:cursor.y
            }
        }
        return cursor
    }

    setMoveSubscriber(subscriber){
        moveSubscriber = subscriber
    }

    setUpSubscriber(subscriber){
        upSubscriber = subscriber
    }

    setDownSubscriber(subscriber){
        downSubscriber = subscriber
    }

    up(e){
        if (upSubscriber == null) {
            return
        } else {
            upSubscriber(e)
        }
    }

    down(e){
        if (downSubscriber == null) {
            return
        } else {
            downSubscriber(e)
        }
    }

    move(e){
        cursor.x = Math.round((e.clientX)/grid)*grid 
        cursor.y = Math.round((e.clientY)/grid)*grid 
        if (moveSubscriber == null) {
            return
        } else {
            moveSubscriber(e)
        }
    }

    scroll(){
        let scroll = Mouse.getScroll()
        cursor.x += scroll.x 
        cursor.y += scroll.y 
    }

    getScroll() {
        if (window.pageYOffset !== undefined) {
            return {x:window.pageXOffset,y:window.pageYOffset};
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return {x:sx,y:sy};
        }
    }
    // debug(){
    //     console.log('.............................................')
    //     console.log('upSubscriber',upSubscriber)
    //     console.log('moveSubscriber',moveSubscriber)
    //     console.log('downSubscriber',downSubscriber)
    //     console.log('""""""""""""""""""""""""""""""""""""""""""""')
    // }
}
const Mouse = new MouseHandle()
export default Mouse