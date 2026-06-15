const jwt = require('jsonwebtoken');
const env = require('./src/config/env');

async function test() {
  const token = jwt.sign({ id: 'test-admin', role: 'admin' }, env.JWT_SECRET, { expiresIn: '1h' });
  
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const res = await fetch('http://localhost:5001/api/v1/analytics/overview?filter=30D', { headers });
    const data = await res.json();
    console.log("Overview:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
