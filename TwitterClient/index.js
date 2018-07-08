var remote = require('electron').remote;
var BrowserWindow = remote.BrowserWindow;
var dialog = remote.dialog;
function hello() {
    var options = {
        title: 'ダイアログのタイトル',
        type: 'info',
        buttons: ['OK', 'Cancel'],
        message: 'メッセージ',
        detail: 'hello'
    };
    var win = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(win, options);
}
//# sourceMappingURL=index.js.map