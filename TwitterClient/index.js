/// <reference path="node_modules/electron/electron.d.ts" />
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
var MyApplication = /** @class */ (function () {
    function MyApplication(app) {
        var _this = this;
        this.app = app;
        this.mainWindow = null;
        this.onWindowAllClosed = function () {
            if (process.platform != 'darwin') {
                _this.app.quit();
            }
        };
        this.onReady = function () {
            _this.mainWindow = new BrowserWindow({
                width: 800,
                height: 400,
                minWidth: 500,
                minHeight: 200,
                acceptFirstMouse: true,
                titleBarStyle: 'hidden'
            });
            _this.mainWindow.on('closed', function () {
                _this.mainWindow = null;
            });
        };
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
    }
    return MyApplication;
}());
var myapp = new MyApplication(app);
//# sourceMappingURL=index.js.map