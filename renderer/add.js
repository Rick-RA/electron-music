const { ipcRenderer } = require('electron')
const { $ } = require('./help')
const path = require('path')

$('select-music').addEventListener('click', () => {
    ipcRenderer.send('open-music-file')

})

$('import-music').addEventListener('click', () => {
    ipcRenderer.send('import-music')

})

ipcRenderer.on('selected-file', (event, filePaths) => {
    console.log('-------selected-file----------')
    console.log(filePaths)
    if (Array.isArray(filePaths)) {
        let subElements = ''
        filePaths.forEach(item => {
            let fileName = path.basename(item)
            subElements += `<li class="list-group-item">${fileName}</li>`
        })
        let element = `<ul class="list-group">${subElements}</ul>`
        $('musicList').innerHTML = element
    }
})
