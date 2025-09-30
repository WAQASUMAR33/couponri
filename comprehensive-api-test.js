const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Test results storage
let testResults = [];

function logResult(name, success, status, message) {
  const result = { name, success, status, message };
  testResults.push(result);
  
  if (success) {
    console.log(colors.green + `  ✅ ${name} - Status: ${status} - ${message}` + colors.reset);
  } else {
    console.log(colors.red + `  ❌ ${name} - Status: ${status} - ${message}` + colors.reset);
  }
}

async function testEndpoint(method, path, data = null, name = null) {
  const testName = name || `${method} ${path}`;
  try {
    const config = {
      method,
      url: BASE_URL + path,
      timeout: 10000
    };
    
    if (data) {
      config.data = data;
      config.headers = { 'Content-Type': 'application/json' };
    }
    
    const response = await axios(config);
    const dataInfo = Array.isArray(response.data) 
      ? `Array(${response.data.length})` 
      : typeof response.data === 'object' 
        ? 'Object' 
        : response.data;
    
    logResult(testName, true, response.status, dataInfo);
    return response.data;
  } catch (error) {
    const status = error.response?.status || 'ERROR';
    const message = error.response?.data?.message || error.message;
    logResult(testName, false, status, message);
    return null;
  }
}

async function runComprehensiveTests() {
  console.log(colors.blue + '🚀 Starting Comprehensive API Testing...\n' + colors.reset);
  
  // 1. Basic GET endpoints
  console.log(colors.cyan + '📋 Testing Basic GET Endpoints:' + colors.reset);
  await testEndpoint('GET', '/admin', null, 'Get Admin Users');
  await testEndpoint('GET', '/blog', null, 'Get Blogs');
  await testEndpoint('GET', '/banners', null, 'Get Banners');
  await testEndpoint('GET', '/company', null, 'Get Companies');
  await testEndpoint('GET', '/category', null, 'Get Categories');
  await testEndpoint('GET', '/offers', null, 'Get Offers');
  await testEndpoint('GET', '/blogcategory', null, 'Get Blog Categories');
  await testEndpoint('GET', '/category_coupon', null, 'Get Category Coupons');
  await testEndpoint('GET', '/faqs', null, 'Get FAQs');
  await testEndpoint('GET', '/submitoffer', null, 'Get Submit Offers');
  await testEndpoint('GET', '/headertag', null, 'Get Header Tags');
  await testEndpoint('GET', '/getfeaturedcoupon', null, 'Get Featured Coupons');
  
  console.log('');
  
  // 2. Search endpoints (with correct parameter)
  console.log(colors.cyan + '🔍 Testing Search Endpoints:' + colors.reset);
  await testEndpoint('GET', '/searchStore?query=test', null, 'Search Store');
  await testEndpoint('GET', '/searchoffer?query=test', null, 'Search Offers');
  
  console.log('');
  
  // 3. Authentication endpoints
  console.log(colors.cyan + '🔐 Testing Authentication:' + colors.reset);
  
  // Test login with correct credentials
  const loginData = {
    email: 'admin@couponri.com',
    password: 'admin123'
  };
  const loginResult = await testEndpoint('POST', '/login', loginData, 'Admin Login');
  
  // Test login with wrong credentials
  const wrongLoginData = {
    email: 'admin@couponri.com',
    password: 'wrongpassword'
  };
  await testEndpoint('POST', '/login', wrongLoginData, 'Login (Wrong Password)');
  
  console.log('');
  
  // 4. Data Creation endpoints (POST)
  console.log(colors.cyan + '📝 Testing Data Creation (POST):' + colors.reset);
  
  // Test creating a category
  const categoryData = {
    category_name: 'Test Category',
    category_description: 'This is a test category',
    category_image: 'test-image.jpg',
    category_status: 'active',
    created_at: new Date(),
    updated_at: new Date(),
    meta_title: 'Test Category',
    meta_description: 'Test category description',
    web_slug: 'test-category'
  };
  await testEndpoint('POST', '/category', categoryData, 'Create Category');
  
  // Test creating a blog post
  const blogData = {
    title: 'Test Blog Post',
    description: 'This is a test blog post description',
    image: 'test-blog-image.jpg',
    category: 'test',
    meta_title: 'Test Blog',
    meta_description: 'Test blog description',
    web_slug: 'test-blog-post'
  };
  await testEndpoint('POST', '/blog', blogData, 'Create Blog Post');
  
  // Test creating a company
  const companyData = {
    com_title: 'Test Company',
    comp_logo: 'test-logo.jpg',
    comp_category: 'Test Category',
    comp_description: 'This is a test company',
    comp_phone: '123-456-7890',
    comp_email: 'test@company.com',
    comp_website: 'https://testcompany.com',
    comp_rating: '4.5',
    comp_status: 'active'
  };
  await testEndpoint('POST', '/company', companyData, 'Create Company');
  
  console.log('');
  
  // 5. Email endpoint
  console.log(colors.cyan + '📧 Testing Email Endpoint:' + colors.reset);
  const emailData = {
    to: 'test@example.com',
    subject: 'Test Email',
    message: 'This is a test email'
  };
  await testEndpoint('POST', '/sendemail', emailData, 'Send Email');
  
  console.log('');
  
  // Summary
  const successful = testResults.filter(r => r.success).length;
  const failed = testResults.filter(r => !r.success).length;
  const total = testResults.length;
  
  console.log(colors.blue + '📊 COMPREHENSIVE TEST SUMMARY:' + colors.reset);
  console.log(colors.green + `✅ Successful: ${successful}` + colors.reset);
  console.log(colors.red + `❌ Failed: ${failed}` + colors.reset);
  console.log(colors.yellow + `📈 Success Rate: ${((successful / total) * 100).toFixed(1)}%` + colors.reset);
  console.log(colors.cyan + `🔢 Total Tests: ${total}` + colors.reset);
  
  if (failed > 0) {
    console.log(colors.red + '\n🔍 FAILED TESTS:' + colors.reset);
    testResults.filter(r => !r.success).forEach(result => {
      console.log(colors.red + `  • ${result.name} - Status: ${result.status} - ${result.message}` + colors.reset);
    });
  }
  
  console.log(colors.green + '\n✨ WORKING APIS:' + colors.reset);
  testResults.filter(r => r.success).forEach(result => {
    console.log(colors.green + `  • ${result.name} - Status: ${result.status}` + colors.reset);
  });
}

// Wait for server to start and run tests
setTimeout(() => {
  runComprehensiveTests().then(() => {
    console.log(colors.blue + '\n🏁 Comprehensive API Testing Complete!' + colors.reset);
  }).catch(error => {
    console.error(colors.red + 'Error running tests:', error.message + colors.reset);
  });
}, 5000); // Wait 5 seconds for server to start



