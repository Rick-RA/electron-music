const { ipcRenderer } = require('electron')
const { $ } = require('./help')

$('add-music-button').addEventListener('click', () => {
    ipcRenderer.send('add-music-window')

})
