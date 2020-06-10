import insertTool, { Insert } from './InsertTool.js'
import codeTool, { Code } from './CodeTool.js'
import history, { History } from './HistoryTool.js'
import penTool, { Pen } from './PenTool.js'
import signTool, { Sign } from './SignTool.js'

import fileTool, { File } from './FileTool.js'
import weightTool, { Weight } from './WeightTool.js'
import paletteTool, { Palette } from './PaletteTool.js'
import fontSizeTool, { FontSize } from './FontSizeTool.js'
import audioDescriptionTool, { AudioDescription } from './AudioDescriptionTool.js'



let TopBar = document.createElement('div')
TopBar.classList = 'TopBar'


let toolList = [
    Insert,
    File,
    AudioDescription,
    
    History,
    FontSize,
    Palette,
    Weight,
    Pen,
    Sign,
    Code,
    
]

toolList.forEach(tool1 => {
    toolList.forEach(tool2 => {
        tool1.addOthers(tool2)
    })
});


TopBar.appendChild(fileTool)
TopBar.appendChild(audioDescriptionTool)
TopBar.appendChild(insertTool)
TopBar.appendChild(history)
TopBar.appendChild(fontSizeTool)
TopBar.appendChild(paletteTool)
TopBar.appendChild(weightTool)
TopBar.appendChild(penTool)
TopBar.appendChild(signTool)
TopBar.appendChild(codeTool)

export default TopBar
console.log('TopBar Loaded')