git // Comprehensive test script to verify all API endpoints
async function testAPIEndpoints() {
    const baseURL = 'https://wailinnaung.com';
    
    const endpoints = [
        '/api/information.json',
        '/api/services.json',
        '/api/techskills.json',
        '/api/languageskills.json',
        '/api/portfoliofilters.json',
        '/api/portfolios.json',
        '/api/jobexperience.json',
        '/api/educationbackground.json',
        '/api/certificates.json',
        '/api/posts.json'
    ];

    console.log('🔍 Testing API endpoints on production site...\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const endpoint of endpoints) {
        try {
            const fullUrl = baseURL + endpoint;
            console.log(`Testing: ${fullUrl}`);
            
            const response = await fetch(fullUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            const itemCount = Array.isArray(data) ? data.length : Object.keys(data).length;
            
            console.log(`✅ ${endpoint}: OK (${itemCount} items)\n`);
            successCount++;
            
        } catch (error) {
            console.error(`❌ ${endpoint}: Failed - ${error.message}\n`);
            failCount++;
        }
    }
    
    console.log(`\n📊 Test Results:`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📈 Success Rate: ${((successCount / endpoints.length) * 100).toFixed(1)}%`);
    
    if (failCount === 0) {
        console.log('\n🎉 All API endpoints are working perfectly!');
    } else {
        console.log('\n⚠️  Some endpoints need attention.');
    }
}

// Test individual fetcher functions (for local testing)
async function testFetcherFunctions() {
    console.log('\n🔧 Testing fetcher functions locally...\n');
    
    try {
        // Import your fetcher functions (this would work in a browser environment)
        const { getInformation, getServices, getTechskills } = await import('./src/fetchers/index.js');
        
        const tests = [
            { name: 'getInformation', func: getInformation },
            { name: 'getServices', func: getServices },
            { name: 'getTechskills', func: getTechskills }
        ];
        
        for (const test of tests) {
            try {
                const data = await test.func();
                console.log(`✅ ${test.name}: OK`);
            } catch (error) {
                console.error(`❌ ${test.name}: Failed - ${error.message}`);
            }
        }
    } catch (error) {
        console.log('ℹ️  Fetcher function testing requires browser environment');
    }
}

// Browser Console Test (paste this into browser console on your site)
function browserConsoleTest() {
    return `
// 🌐 PASTE THIS INTO YOUR BROWSER CONSOLE ON https://wailinnaung.com

console.log('🔍 Testing API endpoints from browser...');

const endpoints = [
    '/api/information.json',
    '/api/services.json', 
    '/api/techskills.json',
    '/api/portfolios.json'
];

Promise.all(
    endpoints.map(async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log('✅', endpoint, 'OK -', data);
            return { endpoint, success: true, data };
        } catch (error) {
            console.error('❌', endpoint, 'Failed -', error);
            return { endpoint, success: false, error };
        }
    })
).then(results => {
    const successful = results.filter(r => r.success).length;
    console.log(\`📊 Results: \${successful}/\${results.length} endpoints working\`);
});
    `;
}

// Run the test
console.log('Copy and paste this into your browser console on wailinnaung.com:');
console.log(browserConsoleTest());

testAPIEndpoints();
