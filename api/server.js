const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const { PassThrough } = require('stream');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const db = require('./db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.get('/check-eligible', (req, res) => {
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
    const usrVals = req.query;
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
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
