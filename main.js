// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

class AppWindow extends BrowserWindow{
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 1200,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = {...basicConfig, ...config}
    super(finalConfig)
    this.loadFile(fileLocation)
  }
}

function createWindow () {
  var mainWindow
  // Create the browser window.
  mainWindow = new AppWindow({}, './renderer/index.html')
  let addMusicWindow
  ipcMain.on('add-music-window', () => {
    console.log('-----add-music-window-----')
    addMusicWindow = new AppWindow({
      width: 600,
      height: 400,
    }, './renderer/add.html')
  })

    ipcMain.on('open-music-file', (event) => {
    console.log('----open-music-file---')
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Music', extensions: ['mp3'] },
      ]
    }).then(res => {
      console.log('----event.sender-------')
      console.log(event.sender)
      console.log(res)
      event.sender.send('selected-file', res)
    }).catch(err => {

    })
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
