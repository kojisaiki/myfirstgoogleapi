const { google } = require('googleapis');
const dotenv = require('dotenv');
require('dotenv').config();

console.log('hello!');

console.log('dotenv:');
console.log(process.env);

getCalendarList().then(v => {
    console.log('accepted');
    console.log(v);
}, reason => {
    console.log('rejected');
    console.log(reason);
});

async function getCalendarList() {
    const {
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URIS,
        ACCESS_TOKEN,
        REFRESH_TOKEN,
        TOKEN_TYPE,
        EXPIRES_IN,
        SCOPE,
        CODE,
    } = process.env;
    
    // Setup oAuth2 client
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS);
    console.log('================== client');
    const tokens = {
      access_token: ACCESS_TOKEN,
      scope: SCOPE,
      token_type: TOKEN_TYPE,
      expires_in: EXPIRES_IN,
    };
    if (REFRESH_TOKEN) tokens.refresh_token = REFRESH_TOKEN;
    oAuth2Client.credentials = tokens;
    console.log('================== prepare tokens');
    

    // Create a Calendar instance
    const calendar = google.calendar({
      version: 'v3',
      auth: oAuth2Client,
    });
    console.log('================== got calendar');
        
    return new Promise((resolve,reject) => {
      calendar.calendarList.list({},(err, res) => {
        resolve(res.data.items);
      })
    });
}