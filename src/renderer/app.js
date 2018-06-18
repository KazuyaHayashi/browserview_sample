const {ipcRenderer} = require('electron');

function back() {
  ipcRenderer.send('viewControl', {action: 'back'});
}

function forward() {
  ipcRenderer.send('viewControl', {action: 'forward'});
}

function reload() {
  ipcRenderer.send('viewControl', {action: 'reload'});
}

function load(url) {
  ipcRenderer.send('viewControl', {action: 'load', url: url});
}

function addNewView() {
  ipcRenderer.send('viewManage', {action: 'addNewView'});
}

function deleteView() {
  ipcRenderer.send('viewManage', {action: 'deleteView'});
}
