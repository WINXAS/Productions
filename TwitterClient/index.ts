const app = require('electron').remote.require('app');

function tweet(){

    app.tweet(document.forms["test"].elements["data"].value);

}