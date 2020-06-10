
import { Pen } from './PenTool.js'
import { Sign } from './SignTool.js'
import { boardSize } from './Grid.js'
import FirstCurve from './FirstCurve.js'
import FirstRectangle from './FirstRectangle.js'
import FirstEllipse from './FirstEllipse.js'
import { isInsertToolActive } from './InsertTool.js'
import Key from './KeyHandler.js'
import historySurf from './HistorySurf.js'



var NS = "http://www.w3.org/2000/svg";
let svg = document.createElementNS(NS,'svg')
svg.setAttribute('width', boardSize)
svg.setAttribute('height', boardSize)
// svg.style.backgroundColor = 'red'


var filter = document.createElementNS( NS, "filter" );
filter.setAttribute( "id", "f1" );
filter.setAttribute( "width", "150%" );
filter.setAttribute( "height", "150%" );

var feOffset = document.createElementNS( NS, "feOffset" );
feOffset.setAttribute( "in", "SourceAlpha" );
feOffset.setAttribute( "dx", "5" );
feOffset.setAttribute( "dy", "5" );


var feBlend = document.createElementNS( NS, "feBlend" );
feBlend.setAttribute( "in", "SourceGraphic" );


filter.appendChild( feOffset );
filter.appendChild( feBlend );

svg.appendChild(filter)


export let isSvgPressed = false
let down = (e) => {
    isSvgPressed = true
    // console.log('isSvgPressed', isSvgPressed)
    if(Pen.isActive){
        if(!isInsertToolActive() && !historySurf.itIsTheLast()){
            alert("Hay elementos no visibles \nUtilice el Historial para verlos a todos.")
            Pen.switchOff()
            return
        }
        if(Key.isKeyPressed(49)){
            FirstCurve.setSvg()
        }
        if(Key.isKeyPressed(50)){
            FirstRectangle.setSvg()
        }
        if(Key.isKeyPressed(51)){
            FirstEllipse.setSvg()
        }
    }
}
let up = () => {
    isSvgPressed = false
    // console.log('isSvgPressed', isSvgPressed)
}

svg.addEventListener('mousedown', down)
svg.addEventListener('mouseup', up)


export default svg
console.log('Svg Loaded')