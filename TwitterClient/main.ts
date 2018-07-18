// for Electron
const electron = require('electron');

// for node-twitter-api
const twitterAPI = require('node-twitter-api');
var APIKey = 'U1SZSnbuJIUxQcExAa56PA';
var APISecret = '7Cnv4Wzc4vueMYRXM9bIv278vuWj2UjSggIdxhfPM';
var callbackURL = 'http://twitter.com/AvixenA';
const twitter = new twitterAPI({
    consumerKey: APIKey,
    consumerSecret: APISecret,
    callback: callbackURL,
});

var twitter_accessToken;
var twitter_accessTokenSecret;

electron.app.on('ready', function () {
  // 新規ウィンドウ作成
  const mainWindow = new electron.BrowserWindow({width: 800, height: 600,
                          webPreferences: {webSecurity: false}});

  twitter.getRequestToken(function (error, requestToken, requestTokenSecret, results) {
  
  var url = twitter.getAuthUrl(requestToken);
  mainWindow.webContents.on('will-navigate', function (event, url) {

    var matched;

    if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {

      twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], function (error, accessToken, accessTokenSecret, results) {

        twitter_accessToken = accessToken;
        twitter_accessTokenSecret = accessTokenSecret;

        twitter.verifyCredentials(twitter_accessToken, twitter_accessTokenSecret, {}, function (error, data, respons) {

          // index.htmlを開く
          mainWindow.loadURL('file://' + __dirname + '/index.html');

        });

        });
  
      }

      event.preventDefault();   

    });

    mainWindow.loadURL(url);

  });

});

exports.tweet = function(data) {

  console.log("tweet!");

  twitter.statuses("update", {status: data},
                   twitter_accessToken,
                   twitter_accessTokenSecret,
                   function(error, data, response) {
                       if (error) {
                           console.log(error);
                       } else {
                           console.log(data);
                       }
                   });
}
