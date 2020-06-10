import MainBtn from './MainBtn.js'
import nodeAttributes from './NodeAttributes.js'
import Storage from './LocalStorage.js'
import historySurf from './HistorySurf.js'
import currentSelected from './CurrentSelected.js'


let mainIcon = 'weight'
let penIconList = [
    'number',
    'weight',
    'info',
]
export let Weight = new MainBtn()
Weight.switchTool(mainIcon, penIconList, 'weight')

Weight.getIcon('info').addEventListener('click',()=>{
    alert("Elija un grosor de linea")
})

let icon = Weight.getIcon('number')
icon.setAttribute('min','1')
icon.setAttribute('max','15')
icon.setAttribute('step','1')
icon.setAttribute('value','3')


icon.addEventListener('change', (e)=>{
    nodeAttributes.strokeWidth = e.target.value
    Storage.setLocal('wheight', e.target.value)
    currentSelected.weight()
})
icon.style.cursor = 'pointer';
icon.addEventListener('keydown', (e)=>{
    e.preventDefault()
    e.stopPropagation()
})
icon.value = Storage.getLocal('wheight', 3)
nodeAttributes.strokeWidth = Storage.getLocal('wheight', 3)

let WeightTool = Weight.getNode()


// export let isWeightToolActive =  () => {
//     return Weight.getIcon('weight').classList.contains('active')
// }

// Weight.getIcon('weight').addEventListener('click',()=>{
//     if(Weight.getIcon('weight').getAttribute('isActive') === "true"){
//         Weight.getIcon('weight').classList.remove('active')
//         Weight.getIcon('weight').setAttribute('isActive', "false")
//     } else {
//         Weight.getIcon('weight').setAttribute('isActive', "true")
//         Weight.getIcon('weight').classList.add('active')
//     }
// })

// Weight.setWhenSwitchOnCallback(()=>{
//     isWeightToolActive = !isWeightToolActive 
//     console.log('active') //.add('active')
// })
// Weight.setWhenSwitchOffCallback(()=>{
//     console.log('off') //.add('active')
// })
export default WeightTool
console.log('WeightTool Loaded')