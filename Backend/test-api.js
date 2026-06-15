const axios = require('axios');
async function test() {
  try {
    const res = await axios.get('http://localhost:5001/api/v1/analytics/overview?filter=30D');
    console.log(res.data);
  } catch (err) {
    console.error(err.message, err.response?.data);
  }
}
test();
