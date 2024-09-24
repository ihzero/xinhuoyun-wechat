import Request from 'luch-request';
import {useGlobSetting} from '@/config';
import {useUserStoreWithOut} from '@/store/modules/user';

let isNavigateTo = false

async function cleanStorage() {
    uni.showToast({
        title: '你的登录状态已过期，请重新登录', icon: 'none',
    })
    const userStore = useUserStoreWithOut();
    userStore.resetState();
    if (!isNavigateTo) {
        isNavigateTo = true
        uni.reLaunch({
            url: '/pages/login/index',
        })
    }
}

const {apiUrl} = useGlobSetting();
const http = new Request();
http.setConfig((config) => {

    config.baseURL = uni.getStorageSync('serve_temp_base_api') || apiUrl;
    config.timeout = 10000;
    /* 设置全局配置 */
    config.validateStatus = (statusCode) => {
        // 不论什么状态,统一在正确中处理
        return true;
    };
    return config;
});
http.interceptors.request.use((config) => {
    config.header = Object.assign({}, config.header);
    if (config.params) {
        for (const [key, value] of Object.entries(config.params)) {
            if (value === undefined || value === null || value === '') delete config.params[key];
        }
    }
    if (config.data) {
        for (const [key, value] of Object.entries(config.data)) {
            if (value === undefined || value === null || value === '') delete config.data[key];
        }
    }
    const userStore = useUserStoreWithOut();
    let accessToken = userStore.token;

    const _params = {};
    let params = config.params || {};
    config.params = Object.assign(Object.assign({}, _params), params);
    config.header = config.header || {};
    if (accessToken != null) {
        config.header.Token = accessToken;
    }
    return config;
}, (config) => {
    return Promise.reject(config);
});

http.interceptors.response.use(async (response) => {
    if (response.statusCode === 404) {
        uni.showToast({
            title: '接口不存在',
            icon: 'none',
            duration: 2000
        })
        return Promise.reject(response);
    }
    isNavigateTo = false
    const {isTransformResponse, isReturnNativeResponse} = response.config.custom;
    // 是否返回原生响应头
    if (isReturnNativeResponse) {
        return response;
    }
    // 是否需要处理请求结果
    if (isTransformResponse) {
        return response.data;
    }


    if (response.data?.code != 200) {
        const _code = response.data?.code
        if (_code == 401 || _code == 403) {
            cleanStorage()
            return Promise.reject(response);
        }
        uni.showToast({
            title: response.data.msg || '系统暂时遇到问题，请稍后再试',
            icon: 'none',
        });
        return Promise.reject(response);
    }
    const _data = response.config?.custom?.data ?? 'data';
    return response.data[_data];
}, (error) => {
    return Promise.reject(error);
});
export {http};
export const Method = {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE',
};