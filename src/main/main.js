const {app, BrowserWindow, ipcMain} = require('electron');
const BrowserViewManager = require('./BrowserViewManager.js');
const BrowserWindowManager = require('./BrowserWindowManager.js');

let mainWindow;
let viewManager = new BrowserViewManager();
let windowManager = new BrowserWindowManager();
let tabList = [];

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.on('close', (e) => {
    windowManager.closeAllBrowserWindow();
  });
  mainWindow.loadURL(`file://${__dirname}/../templates/browser.html`);

  let view = viewManager.createNewBrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({x: 0, y: 40, width: 800, height: 590});
  //view.setAutoResize({widht: true, height: true});
  view.webContents.loadURL("https://www.google.co.jp");
  tabList.push({
    title: view.webContents.getTitle(),
    url: view.webContents.getURL(),
    id: view.id
  });
  view.webContents.on('page-title-updated', () => {
    console.log('page-title-updated');
  });
  //view.webContents.on('new-window', (event, url, disposition, options, additionalFeatures) => {
  //  event.preventDefault();
  //  let newView = viewManager.createNewBrowserView();
  //  mainWindow.setBrowserView(newView);
  //  newView.setBounds({x: 0, y: 40, width: 800, height: 590});
  //  newView.setAutoResize({widht: true, height: true});
  //  newView.webContents.loadURL(url);
  //  event.newGuest = windowManager.createNewBrowserWindow({show: false});
  //  // We should bind new BrowserWindow because application will be crash if you bind
  //  // current window as newGuest.
  //});
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  viewManager.destroyAllBrowserViews();
  app.quit();
});

ipcMain.on('viewControl', (event, args) => {
  console.log(args);
  let webContents = mainWindow.getBrowserView().webContents;
  console.log(webContents.id);
  if(args.action == 'back') {
    if(webContents.canGoBack()) {
      webContents.goBack();
    }
  } else if(args.action == 'forward') {
    if(webContents.canGoForward()) {
      webContents.goForward();
    }
  } else if(args.action == 'load') {
    webContents.loadURL(args.url);
  } else if(args.action == 'reload') {
    webContents.reload();
  }
});

ipcMain.on('viewManage', (event, args) => {
  console.log(args);
  if(args.action == 'addNewView') {
    let newView = viewManager.createNewBrowserView();
    mainWindow.setBrowserView(newView);
    newView.setBounds({x: 0, y: 40, width: 800, height: 590});
  } else if(args.action == 'deleteView') {
    if(viewManager.getCount() > 1) {
      let currentView = mainWindow.getBrowserView();
      views = viewManager.getAllViews();
      for(var view of views) {
        if(view.id == currentView.id) {
          continue;
        }
        mainWindow.setBrowserView(view);
        view.setBounds({x: 0, y: 40, width: 800, height: 590});
      }
      viewManager.deleteView(currentView.id);
    }
  }
});
