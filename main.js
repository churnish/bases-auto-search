const { Plugin } = require('obsidian');

module.exports = class BasesAutoSearch extends Plugin {
  /** Leaves where search has already been opened */
  _processed = new WeakSet();

  onload() {
    // Check on layout changes (new tabs, splits, popouts)
    this.registerEvent(
      this.app.workspace.on('layout-change', () => this._openSearch())
    );
    // Also check when active leaf changes (tab switch, deferred view load)
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', () => this._openSearch())
    );
  }

  _openSearch() {
    for (const leaf of this.app.workspace.getLeavesOfType('bases')) {
      if (this._processed.has(leaf)) continue;
      const searchMenu = leaf.view?.controller?.searchMenu;
      if (!searchMenu) continue;
      this._processed.add(leaf);
      searchMenu.open();
    }
  }
};
