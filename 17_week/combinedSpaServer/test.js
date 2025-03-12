'use strict';

const Reporter = require('./libraries/reportWithAddress');

const compUrl ='http://localhost:4009/api/computers';
const orderUrl ='http://localhost:4008/api/orders';

const reporter=new Reporter(orderUrl, compUrl);

reporter.createReportWithAddress(100)
    .then(report=>console.log(JSON.stringify(report,null,2)));

