import MainBtn from './MainBtn.js'
/***************************************************/
/*********Do not delete next line*******************/
/***************************************************/
import jscolor from './../libraries/jscolor.js'
import nodeAttributes from './NodeAttributes.js'
import Storage from './LocalStorage.js'
import currentSelected from './CurrentSelected.js'


let mainIcon = 'palette'
let penIconList = [
    'input',
    'palette',
    'info',
]
export let Palette = new MainBtn()
Palette.switchTool(mainIcon, penIconList, 'palette')

Palette.getIcon('info').addEventListener('click',()=>{
    alert("Elija un color de para las figuras")
})

Palette.getIcon('input').classList.add('jscolor')
Palette.getIcon('input').value = Storage.getLocal('stroke', 'FFF000')
Palette.getIcon('input').addEventListener('change', (e)=>{
    nodeAttributes.stroke = '#'+e.target.value
    Storage.setLocal('stroke', e.target.value)
    currentSelected.stroke()
})
nodeAttributes.stroke = '#'+Storage.getLocal('stroke', 'FFF000')

let paletteTool = Palette.getNode()

export default paletteTool
console.log('PaletteTool Loaded')
