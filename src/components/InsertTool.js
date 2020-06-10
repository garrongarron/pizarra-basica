import MainBtn from './MainBtn.js'


let mainIcon = 'insert'
let penIconList = [
    'insert',
]
export let Insert = new MainBtn()

Insert.switcher('insert')
// Insert.switchTool(mainIcon, penIconList, 'insert')

let InsertTool = Insert.getNode()


export let isInsertToolActive =  () => {
    return Insert.getIcon('insert').classList.contains('active')
}

Insert.getIcon('insert').addEventListener('click',()=>{
    if(Insert.getIcon('insert').getAttribute('isActive') === "true"){
        Insert.getIcon('insert').classList.remove('active')
        Insert.getIcon('insert').setAttribute('isActive', "false")
    } else {
        Insert.getIcon('insert').setAttribute('isActive', "true")
        Insert.getIcon('insert').classList.add('active')
    }
})

// Insert.setWhenSwitchOnCallback(()=>{
//     isInsertToolActive = !isInsertToolActive 
//     console.log('active') //.add('active')
// })
// Insert.setWhenSwitchOffCallback(()=>{
//     console.log('off') //.add('active')
// })
export default InsertTool
console.log('InsertTool Loaded')