import './style.scss'

import Grid from './components/Grid.js'
import TopBar from './components/TopBar.js'
import Svg from './components/Svg.js'
import KeyBoard from './components/KeyBoard.js'
import audioDisplay from './components/AudioDisplay.js'
import monitor from './components/Monitor'

let App = document.createElement('div')
App.id = 'pizarra-basica'
document.body.appendChild(App)
App.appendChild(Grid)
App.appendChild(Svg)
App.appendChild(TopBar)
App.appendChild(KeyBoard)
App.appendChild(audioDisplay)
App.appendChild(monitor)


