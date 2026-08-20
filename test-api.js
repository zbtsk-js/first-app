
import axios from 'axios';

async function testProducts() {
    try {
        const response = await axios.get('http://localhost:5000/payment/products');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error fetching products:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testProducts();
