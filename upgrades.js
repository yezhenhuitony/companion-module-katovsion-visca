// upgrades.js
class UpgradeManager {
    constructor() {
        this.scripts = [];
    }

    getUpgradeScripts() {
        return this.scripts;
    }
}

module.exports = new UpgradeManager().getUpgradeScripts();