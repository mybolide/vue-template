const { app, BrowserWindow, session } = require('electron')
const path = require('path')

const reactDevToolsPath = path.resolve(__dirname, '../vue-devtools');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  console.info(global)

  let url = process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:3000' :
    'file://' + path.join(__dirname, '../dist/index.html');
  win.loadURL(url)
  // 打开开发工具
  win.webContents.openDevTools()
}

app.whenReady().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    await session.defaultSession.loadExtension(reactDevToolsPath)
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})