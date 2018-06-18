const {BrowserView} = require('electron');

class BrowserViewManager {
  constructor() {
    this.views = new Map();
  }

  createNewBrowserView() {
    let view = new BrowserView({
      webPreferences: {
        nodeIntegration: false,
        webviewTag: false
      }
    });
    this.views.set(view.id, view);
    return view;
  }

  getCount() {
    return this.views.size;
  }

  getView(id) {
    return this.views.get(id);
  }

  getAllViews() {
    return this.views.values();
  }

  deleteView(id) {
    let view = this.views.get(id);
    view.destroy();
    this.views.delete(id);
  }

  destroyAllBrowserViews() {
    for(let [key, view] of this.views) {
      view.destroy();
    }
  }
}

module.exports = BrowserViewManager;
