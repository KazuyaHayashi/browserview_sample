const {BrowserWindow} = require('electron');

class BrowserWindowManager {
  constructor() {
    this.windows = new Map();
  }

  createNewBrowserWindow(args) {
    let window = new BrowserWindow(args);
    this.windows.set(window.id, window);
    return window;
  }

  getCount() {
    return this.window.size;
  }

  getWindow(id) {
    return this.windows.get(id);
  }

  closeAllBrowserWindow() {
    for(let [key, window] of this.windows) {
      console.log("on closeAllBrowserWindow: key = " + key);
      window.close();
    }
  }
}

module.exports = BrowserWindowManager;
