import MainBtn from './MainBtn.js'
import Key from './KeyHandler.js'
import Storage from './LocalStorage.js'
import Export from './ExportFile.js'
import Import from './ImportFile.js'
import historySurf from './HistorySurf.js'
let mainIcon = 'file'
let fileIconList = [
    'trash',
    'upload',
    'download',
    'file',
    'info',
]

export let File = new MainBtn()

File.switchTool(mainIcon, fileIconList, 'file')


File.getIcon('info').addEventListener('click',()=>{
    alert("Carge o descarge un archivo con el trabajo realizado")
})

// File.getIcon('upload').style.backgroundColor = 'yellow'
// File.getIcon('download').style.backgroundColor = 'yellow'

File.getIcon('trash').style.backgroundColor = 'yellow'
File.getIcon('trash').addEventListener('click', (e)=>{
    let answer = confirm("Borrar todo y empesar de nuevo");
    if(answer){
        historySurf.goToBegining()
        Storage.setLocal('history', {})
        Storage.setLocal('fontSize', 30)
        Storage.setLocal('stroke', '#ffffff')
        Storage.setLocal('wheight', '2')
        historySurf.resetCursor()
    }
})




let isFileToolActive = false

Export.onClickOnObject(File.getIcon('download'), () => {
    return JSON.stringify(Storage.getLocal('history'))
})

let callback = (content) => {
    historySurf.goToBegining()
    Storage.setLocal('history',JSON.parse(content) )
    historySurf.goToEnding()
}
Import.setObjectAndCallback(File.getIcon('upload'), callback)


File.setWhenSwitchOnCallback(()=>{
    isFileToolActive = true
    Key.addDownListener(83, ()=>{
        if(Key.isKeyPressed(17)){
            console.log('Save')
            
        }
    })
    Key.addDownListener(79, ()=>{
        if(Key.isKeyPressed(17)){
            console.log('Open')
        }
    })
})

File.setWhenSwitchOffCallback(()=>{
    isFileToolActive = false
    Key.addDownListener(83, null)
    Key.addDownListener(79, null)
})

let fileBtnGroup = File.getNode()

export default fileBtnGroup
console.log('FileTool Loaded')