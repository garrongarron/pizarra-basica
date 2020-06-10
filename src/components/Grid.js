import GridLine from './GridLine.js'
let Grid = document.createElement('div')
Grid.classList = 'grid'

export default Grid

export let distance = 10; //Storage.getLocal('distance', defaultDistance)
export let boardSize = 2000; //Storage.getLocal('boardSize', defaultBoardSize)
let gridColor = '#008000'//Storage.getLocal('gridColor', '#008000')
Grid.width = boardSize+'px'
Grid.height = boardSize+'px'

let lines = new Array(boardSize / distance);
for (let index = 0; index < lines.length; index++) {
    lines[index] = distance * index
}

let vertical = 'vertical'
let horizontal = 'horizontal'

lines.map(vline => {
    Grid.appendChild(new GridLine(gridColor, vline, vertical, boardSize))
})
lines.map(hline => {
    Grid.appendChild(new GridLine(gridColor, hline, horizontal, boardSize))
})
console.log('Grid Loaded')