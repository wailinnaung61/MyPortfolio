// Quick test script to verify API endpoints
async function testAPIEndpoints() {
    const endpoints = [
        '/api/information.json',
        '/api/services.json',
        '/api/techskills.json',
        '/api/portfolios.json'
    ];

    console.log('Testing API endpoints...');
    
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(`✅ ${endpoint}: OK (${Object.keys(data).length} items)`);
        } catch (error) {
            console.error(`❌ ${endpoint}: Failed -`, error.message);
        }
    }
}

// Run the test
testAPIEndpoints();
