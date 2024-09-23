export const useGlobSetting = () => {

    const ENV = import.meta.env


    const { VITE_COMMON_API_PREFIX, VITE_COMMON_API_URL } = ENV

    let apiUrl = ''
    // #ifdef MP-WEIXIN || APP-PLUS
    apiUrl += VITE_COMMON_API_URL
    // #endif
    // #ifdef H5
    apiUrl += VITE_COMMON_API_PREFIX
    // #endif

    return {
        urlPrefix: VITE_COMMON_API_PREFIX,
        api: VITE_COMMON_API_URL,
        apiUrl: apiUrl
    }
}