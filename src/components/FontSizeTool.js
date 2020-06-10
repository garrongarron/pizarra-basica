import MainBtn from './MainBtn.js'
import nodeAttributes from './NodeAttributes.js'
import Storage from './LocalStorage.js'
import currentSelected from './CurrentSelected.js'


let mainIcon = 'size'
let penIconList = [
    'number',
    'size',
    'info',
]
export let FontSize = new MainBtn()
FontSize.switchTool(mainIcon, penIconList, 'size')

FontSize.getIcon('info').addEventListener('click',()=>{
    alert("Elija un tamaño de la fuente")
})

let icon = FontSize.getIcon('number')
icon.setAttribute('min','1')
icon.setAttribute('max','150')
icon.setAttribute('step','1')
icon.setAttribute('value','10')


icon.addEventListener('change', (e)=>{
    nodeAttributes.fontSize = e.target.value
    Storage.setLocal('fontSize', e.target.value)
    currentSelected.fontSize()
})
icon.style.cursor = 'pointer';
icon.addEventListener('keydown', (e)=>{
    e.preventDefault()
    e.stopPropagation()
})
icon.value = Storage.getLocal('fontSize', 30)
nodeAttributes.fontSize = Storage.getLocal('fontSize',30 )

let fontSizeTool = FontSize.getNode()


export default fontSizeTool
console.log('FontSizeTool Loaded')