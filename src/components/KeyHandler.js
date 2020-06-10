let upListener = {}
let downListener = {}
let keyPressed = {}
class KeyHandler
{
    constructor() {
        console.log('KeyHandler Loaded')
        document.addEventListener('keydown', this.trigger)
        document.addEventListener('keyup', this.up)
    } 

    isKeyPressed(code){
        return keyPressed[code] === true
    }

    up(e){
        keyPressed[e.keyCode] = false
        if( upListener.hasOwnProperty(e.keyCode) ){
            if(typeof upListener[e.keyCode] === 'function'){
                upListener[e.keyCode](e)
            }
        }
    }

    trigger(e){
        keyPressed[e.keyCode] = true
        if( downListener.hasOwnProperty(e.keyCode) ){
            if(typeof downListener[e.keyCode] === 'function'){
                downListener[e.keyCode](e)   
            }
        }
        // console.log(e.keyCode)
    }

    addUpListener(number, callback){
        upListener[number] = callback
    }

    addDownListener(number, callback){
        downListener[number] = callback
    }
    
    
}

const Key = new KeyHandler();
export default Key;