// Modules to control application life and create native browser window
const { app, BrowserWindow} = require('electron')
// include the Node.js 'path module at the topo of your file
const path = require('node:path')


// definir tamanho da janela
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // modifica sua funcao existente createWindow(). parte abaixo inserida depois
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    })

    // apos criar janela carrega conteudo do arquivo index.html
    win.loadFile('index.html')

    // Open the DevTools
    // win.webContents.openDevTools()
}

// aguarda app ficar pronto e entao cria janela
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {
    createWindow()

    // se nao houver janelas do app abertas cria-se um nova
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// se todas as janela do app estiverem fechadas, encerrao o app, exceto macOS.
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})


