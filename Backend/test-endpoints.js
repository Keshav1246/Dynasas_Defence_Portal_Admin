const http = require('http');

const testEndpoint = (path) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5001${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    }).on('error', reject);
  });
};

(async () => {
  try {
    console.log('Testing /api/v1/dashboard...');
    const dash = await testEndpoint('/api/v1/dashboard');
    console.log(`Status: ${dash.statusCode}`);
    console.log(`Response: ${dash.data}`);

    console.log('\nTesting /api/v1/inquiries/unread-count...');
    const unread = await testEndpoint('/api/v1/inquiries/unread-count');
    console.log(`Status: ${unread.statusCode}`);
    console.log(`Response: ${unread.data}`);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
})();
