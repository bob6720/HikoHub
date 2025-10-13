import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// CSRF TOKEN SETUP
let token = document.head?.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content || token.getAttribute('content');
    console.log('CSRF token loaded successfully');
} else {
    console.error('CSRF token not found! Check your HTML head meta tag.');
}

// Debug to confirm it's working
console.log('Axios CSRF Header:', window.axios.defaults.headers.common['X-CSRF-TOKEN']);