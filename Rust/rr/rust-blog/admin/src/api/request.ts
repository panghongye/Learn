import axios from 'axios'


export const request = (config) => {
    const http = axios.create({
        baseURL: '/api',
        // timeout: 5000,
    });

    // 请求拦截
    http.interceptors.request.use(
        (config) => {
            if (config.url != '/login') {
                config.headers['Authorization'] = window.localStorage.getItem('token');
            }

            return config;
        },
        (error) => {
            console.log("error: ", error.response);
        }
    );

    // 响应拦截
    http.interceptors.response.use(
        (res) => {
            return res;
        },
        (error) => {
            console.log("error: ", error.response);
            // return error;
        }
    );

    return http(config);

}