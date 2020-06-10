import MainBtn from './MainBtn.js'
import Key from './KeyHandler.js'
import helper from './EditHelper.js'
import Mouse from './MouseHandler.js'
import nodeAttributes from './NodeAttributes.js'

let mainIcon = 'pen'
let penIconList = [
    'curve',
    'square',
    'ellipse',
    // 'cursor',
    'pen',
    'info',
]
export let Pen = new MainBtn()

Pen.switchTool(mainIcon, penIconList, 'pen')
Pen.getIcon('info').addEventListener('click',()=>{
    alert("Presione la tecla [1], [2] o [3] y sin soltar \ndibuje con el raton una figura \n\nIMPORTANTE: \nLuego presione la tecla ENTER para guardar la figura ")
})
let penBtnGroup = Pen.getNode()

let updateNodeAttributes = () => {
    document.querySelectorAll('.tmpNode').forEach(element => {
        element.setAttribute('stroke', nodeAttributes.stroke)
        element.setAttribute('fill', nodeAttributes.fill)
        element.setAttribute('stroke-width', nodeAttributes.strokeWidth)
    });
}

Pen.setWhenSwitchOnCallback(()=>{
    Pen.getIcon('pen').style.color = nodeAttributes.stroke
    Key.addDownListener(49, ()=>{
        Pen.getIcon('curve').style.backgroundColor = 'yellow'
        updateNodeAttributes()
    })
    Key.addUpListener(49, ()=>{
        Pen.getIcon('curve').style.backgroundColor = null
        
    })

    Key.addDownListener(50, ()=>{
        Pen.getIcon('square').style.backgroundColor = 'yellow'
        updateNodeAttributes()
    })
    Key.addUpListener(50, ()=>{
        Pen.getIcon('square').style.backgroundColor = null
    })

    Key.addDownListener(51, ()=>{
        Pen.getIcon('ellipse').style.backgroundColor = 'yellow'
        updateNodeAttributes()
    })
    Key.addUpListener(51, ()=>{
        Pen.getIcon('ellipse').style.backgroundColor = null
    })
})
Pen.setWhenSwitchOffCallback(()=>{
    Mouse.setDownSubscriber(null)
    Mouse.setUpSubscriber(null)
    Mouse.setMoveSubscriber(null)
    Key.addDownListener(49, null)
    Key.addUpListener(49, null)
    Key.addDownListener(50, null)
    Key.addUpListener(50, null)
    Key.addDownListener(51, null)
    Key.addUpListener(51, null)
    helper.hidePointers()
    document.querySelectorAll('.tmpNode').forEach(element => {
        element.classList.add('hide')
    });
})
export default penBtnGroup
console.log('PenTool Loaded')