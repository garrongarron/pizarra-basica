import MainBtn from './MainBtn.js'


let mainIcon = 'code'
let penIconList = [
    'code',
]
export let Code = new MainBtn()

Code.switcher('code')
// Code.switchTool(mainIcon, penIconList, 'code')

let CodeTool = Code.getNode()


export let isCodeToolActive =  () => {
    return Code.getIcon('code').classList.contains('active')
}

Code.getIcon('code').addEventListener('click',()=>{
    if(Code.getIcon('code').getAttribute('isActive') === "true"){
        Code.getIcon('code').classList.remove('active')
        Code.getIcon('code').setAttribute('isActive', "false")
    } else {
        Code.getIcon('code').setAttribute('isActive', "true")
        Code.getIcon('code').classList.add('active')
    }
})

// Code.setWhenSwitchOnCallback(()=>{
//     isCodeToolActive = !isCodeToolActive 
//     console.log('active') //.add('active')
// })
// Code.setWhenSwitchOffCallback(()=>{
//     console.log('off') //.add('active')
// })
export default CodeTool
console.log('CodeTool Loaded')