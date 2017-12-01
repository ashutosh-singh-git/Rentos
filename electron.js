const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
let child;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.loadURL('http://localhost:8070/payment');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    });

    // module.paths.push(path.resolve('server'));
    //Run Express Server.
    var expresspath = app.getAppPath() + '/server/server';
    console.log(path + " , " + expresspath);
    let exec = require('child_process').exec;
    child = exec('node ' + expresspath);
    child.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    child.on('close', function (code) {
        console.log('closing code: ' + code);
        child.kill();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        child.kill();
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});