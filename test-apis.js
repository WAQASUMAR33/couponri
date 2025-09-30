const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// List of API endpoints to test
const apiEndpoints = [
  // Basic GET endpoints
  { method: 'GET', path: '/admin', name: 'Get Admin Users' },
  { method: 'GET', path: '/blog', name: 'Get Blogs' },
  { method: 'GET', path: '/banners', name: 'Get Banners' },
  { method: 'GET', path: '/company', name: 'Get Companies' },
  { method: 'GET', path: '/category', name: 'Get Categories' },
  { method: 'GET', path: '/offers', name: 'Get Offers' },
  { method: 'GET', path: '/blogcategory', name: 'Get Blog Categories' },
  { method: 'GET', path: '/category_coupon', name: 'Get Category Coupons' },
  { method: 'GET', path: '/faqs', name: 'Get FAQs' },
  { method: 'GET', path: '/submitoffer', name: 'Get Submit Offers' },
  { method: 'GET', path: '/headertag', name: 'Get Header Tags' },
  { method: 'GET', path: '/getfeaturedcoupon', name: 'Get Featured Coupons' },
  
  // Search endpoints
  { method: 'GET', path: '/searchStore?q=test', name: 'Search Store' },
  { method: 'GET', path: '/searchoffer?q=test', name: 'Search Offers' },
];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

async function testAPI(endpoint) {
  try {
    const response = await axios({
      method: endpoint.method,
      url: BASE_URL + endpoint.path,
      timeout: 10000
    });
    
    return {
      name: endpoint.name,
      path: endpoint.path,
      status: response.status,
      success: true,
      data: Array.isArray(response.data) ? `Array(${response.data.length})` : typeof response.data
    };
  } catch (error) {
    return {
      name: endpoint.name,
      path: endpoint.path,
      status: error.response?.status || 'ERROR',
      success: false,
      error: error.message
    };
  }
}

async function testAllAPIs() {
  console.log(colors.blue + '🚀 Starting API Testing...\n' + colors.reset);
  
  const results = [];
  
  for (const endpoint of apiEndpoints) {
    console.log(`Testing: ${endpoint.name} (${endpoint.method} ${endpoint.path})`);
    const result = await testAPI(endpoint);
    results.push(result);
    
    if (result.success) {
      console.log(colors.green + `  ✅ SUCCESS - Status: ${result.status}, Data: ${result.data}` + colors.reset);
    } else {
      console.log(colors.red + `  ❌ FAILED - Status: ${result.status}, Error: ${result.error}` + colors.reset);
    }
    console.log('');
  }
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(colors.blue + '📊 SUMMARY:' + colors.reset);
  console.log(colors.green + `✅ Successful: ${successful}` + colors.reset);
  console.log(colors.red + `❌ Failed: ${failed}` + colors.reset);
  console.log(colors.yellow + `📈 Success Rate: ${((successful / results.length) * 100).toFixed(1)}%` + colors.reset);
  
  if (failed > 0) {
    console.log(colors.red + '\n🔍 FAILED ENDPOINTS:' + colors.reset);
    results.filter(r => !r.success).forEach(result => {
      console.log(colors.red + `  • ${result.name} (${result.path}) - Status: ${result.status}` + colors.reset);
    });
  }
  
  return results;
}

// Run the tests
testAllAPIs().then(() => {
  console.log(colors.blue + '\n🏁 API Testing Complete!' + colors.reset);
}).catch(error => {
  console.error(colors.red + 'Error running API tests:', error.message + colors.reset);
});



