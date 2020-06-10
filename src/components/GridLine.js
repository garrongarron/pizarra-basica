export default class GridLine
{
    constructor(gridColor, gap, orientation, boardSize){
        let line = document.createElement('div')
        let s = line.style
        s.position = 'absolute'
        if(orientation === 'vertical'){
            s.left = gap+'px'
            s.top = '0px'
            s.borderLeft = '1px solid '+gridColor
            s.height = boardSize+'px'
            s.width = '1px'
        } else {
            s.left = '0px'
            s.top = gap+'px'
            s.borderTop = '1px solid '+gridColor
            s.width = boardSize+'px'
            s.height = '1px'
        }
        console.log('GridLine Loaded')
        return line
    }
}
