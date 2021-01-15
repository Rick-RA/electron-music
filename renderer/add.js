const { ipcRenderer } = require('electron')
const { $ } = require('./help')

$('select-music').addEventListener('click', () => {
    ipcRenderer.send('open-music-file')

})

ipcRenderer.on('selected-file', (event, path) => {
    console.log('-------selected-file----------')
    console.log(path)
    if (Array.isArray(path)) {

    }
})
