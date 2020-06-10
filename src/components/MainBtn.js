import getIcon from './Icons.js'

class MainBtn
{
    constructor(){
        
        this.penBtnGroup = null
        this.iconList = {}
        this.name = null
        this.isActive = false
        this.othersTools = []
        this.hideList = []
    }

    switcher(iconName){
        this.penBtnGroup = document.createElement('div')
        let icon = getIcon(iconName)
        icon.classList.add('btn')
        this.penBtnGroup.appendChild(icon)
        this.name = iconName
        this.iconList[iconName+'-btn-'+this.name] = icon
    }

    switchTool(mainIcon, penIconList, name){
        this.penBtnGroup = document.createElement('div')
        this.iconList = {}
        this.name = name
        this.isActive = false
        penIconList.forEach(element => {
            let icon = getIcon(element)
            this.iconList[element+'-btn-'+this.name] = icon
            icon.classList.add(element+'-btn-'+this.name)
            this.penBtnGroup.appendChild(icon)
        });
        this.mainIcon = mainIcon
        this.hideList = penIconList.filter(element => {
            return element != mainIcon
        })
        this.iconList[this.mainIcon+'-btn-'+this.name].classList.add('btn')
        this.iconList[this.mainIcon+'-btn-'+this.name].addEventListener('click', ()=>{
            this.othersTools.forEach(element => {
                if(element !== this){
                    element.switchOff()
                }
            });
            this.click()
        })
        this.switchOff()
    }
    addOthers(Tool){
        this.othersTools.push(Tool)
    }
    getIcon(name){
        return this.iconList[name+'-btn-'+this.name]
    }
    getNode(){
        return this.penBtnGroup
    }
    switchOff(){
        this.disable()
        this.isActive = false
    }
    getMainIcon(){
        return this.iconList[mainIcon+'-btn-'+this.name]
    }

    enable(){
        this.hideList.forEach(element => {
            this.iconList[element+'-btn-'+this.name].classList.remove('hide')
        })
        this.iconList[this.mainIcon+'-btn-'+this.name].classList.add('active')
        if(typeof this.whenSwitchOn === 'function'){
            this.whenSwitchOn()
        }
    }

    setWhenSwitchOnCallback(callback){
        this.whenSwitchOn = callback
    }

    setWhenSwitchOffCallback(callback){
        this.whenSwitchOff = callback
    }
    
    disable(){
        this.hideList.forEach(element => {
            this.iconList[element+'-btn-'+this.name].classList.add('hide')
        })
        if(typeof this.iconList[this.mainIcon+'-btn-'+this.name] !== 'undefined'){
            this.iconList[this.mainIcon+'-btn-'+this.name].classList.remove('active')
        }
        
        if(typeof this.whenSwitchOff === 'function'){
            this.whenSwitchOff()
        }
    }

    toggle(){
        this.isActive = !this.isActive
        if(this.isActive){
            this.enable()
        } else {
            this.disable()
        } 
    }

    click(e){
        this.toggle()
    }
}
console.log('MainBtn Loaded')
export default MainBtn