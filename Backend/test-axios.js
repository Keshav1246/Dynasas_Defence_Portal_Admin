const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 5001,
  path: '/api/v1/analytics/overview?filter=30D',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer test'
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, data));
});
req.on('error', e => console.error(e));
req.end();
