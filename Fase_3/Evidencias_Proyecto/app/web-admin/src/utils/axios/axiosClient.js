import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const instanceApi = () => {
    const api = axios.create({
        baseURL: supabaseUrl,
        headers: {
            apikey: supabaseAnonKey,
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.request.use(
        (config) => {
            const token = sessionStorage.getItem('authdata');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return api
}

export default instanceApi;
