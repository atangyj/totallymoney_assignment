const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const { PassThrough } = require('stream');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const db = require('./db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'GET') {
    if (req.url.search(/^\/check-eligible/) !== -1) {
      const parseURL = (url) => {
        const pattern = /\?(.*)\b/;
        const match = pattern.exec(req.url)[1];
        const params = match.split('&').reduce((acc, curr) => {
          const keyVal = curr.split('=');
          acc[keyVal[0]] = keyVal[1];
          return acc;
        }, {});
        return params;
      };

      const checkEligibility = (eligibleVal, usrVal, property) => {
        switch (property) {
          case 'employee_status':
            return eligibleVal.includes(usrVal);
            break;

          case 'income_range':
            return usrVal >= eligibleVal.min;
            break;

          default:
            break;
        }
      };

      const { cards } = db;
      const eligiblCards = cards.filter((card) => {
        const { eligible_check } = card;
        const usrVals = parseURL(req.url);
        const results = [];
        for (const rule in eligible_check) {
          const checkResult = checkEligibility(
            eligible_check[rule],
            usrVals[rule],
            rule
          );
          results.push(checkResult);
        }
        return results.every((result) => result);
      });
      res.jsonp({ cardlist: eligiblCards });
    } else if (req.url.search(/^\/card_details\/(.*)/) !== -1) {
      const cardType = req.url.split('/')[2];
      const { cards } = db;
      const card = cards.filter((card) => card.card_type === cardType);
      res.jsonp({ card: card[0] });
    } else {
      next();
    }
  } else {
    // Continue to JSON Server router
    next();
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
