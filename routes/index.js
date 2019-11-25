const express = require('express');
const router = express.Router();
const request = require('request');
const auth = require('../auth/key.json');
const http_option = require('../classes/http-opt');
const logger = require('../classes/logger');

const _title = 'Bitly URL Shortener';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: _title });
});

/* Process the long url and return the short one. */
router.post('/', (req, res) => { 
  let long_url = req.body.long_url;
  let options = http_option.group(); 
  options.url = auth.groups_url;
  options.hostname = auth.domain;
  options.method = 'GET';
  options.headers.Authorization = auth.auth + " " +auth.token;
  options.headers.Accept = auth.accept;
  
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {  
          resolve(body);
        }
      })
    }).then((result) => { 
      let guid = JSON.parse(result).groups[0].guid;
      let options = http_option.shorten();
      options.url = auth.shorten_url;
      options.hostname = auth.domain;
      options.method = 'POST';
      options.json.long_url = long_url;
      options.json.group_guid = guid;
      options.headers.Authorization = auth.auth + " " +auth.token;
      options.headers["Content-Type"] = auth.content_type;
      return request(options, (error, response, body) => {
          let shortLink = body.link;
          
          res.render('result', {short_url: shortLink, title: _title});
          logger.logTrace(long_url, shortLink);
      })  
    }).catch(error => {
      console.error(error);
    });
});

module.exports = router;
