const { google } = require('googleapis');
const dotenv = require('dotenv');
require('dotenv').config();

console.log('hello!');

console.log('dotenv:');
console.log(process.env);

getCalendarList().then(v => {
    console.log('accepted');
    console.log(v);

    getEvents('ems3a2nepchseq8cq0lmj911ug@group.calendar.google.com').then(events => {
      console.log('events:');
      console.log(events)

      getEventInstances('ems3a2nepchseq8cq0lmj911ug@group.calendar.google.com').then(events => {
        console.log('event instances:');
        console.log(events)
      });
    });
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
    const calendarApi = google.calendar({
      version: 'v3',
      auth: oAuth2Client,
    });
    console.log('================== got calendar');
        
    console.log('================== try calendarlist list');
    return new Promise((resolve,reject) => {
      calendarApi.calendarList.list({},(err, res) => {
        resolve(res.data.items);
      })
    });
}

async function getEvents(calendarId) {
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
    const calendarApi = google.calendar({
      version: 'v3',
      auth: oAuth2Client,
    });
    console.log('================== got calendar');
        
    console.log('================== try events list');
    return new Promise((resolve,reject) => {
      calendarApi.events.list({
        calendarId: calendarId,
        timeMin: '2020-12-21T00:00:00.000+09:00',
        timeMax: '2020-12-27T23:59:59.000+09:00'
      },(err, res) => {
        resolve(res.data.items);
      })
    });
}

async function getEventInstances(calendarId) {
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
    const calendarApi = google.calendar({
      version: 'v3',
      auth: oAuth2Client,
    });
    console.log('================== got calendar');
        
    console.log('================== try events instances');
    return new Promise((resolve,reject) => {
      calendarApi.events.instances({
        calendarId: calendarId,
        eventId: '53uo023p8r4f2lipfigikm473n',
        timeMin: '2020-12-21T00:00:00.000+09:00',
        timeMax: '2020-12-27T23:59:59.000+09:00'
      },(err, res) => {
        if (err) {
          console.log('error ');
          console.log(err);
        }
        resolve(res.data.items);
      })
    });
}