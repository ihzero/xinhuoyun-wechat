import {http} from "@/utils/request";

/**
 * 充值参数
 */
export function payMentApi(data) {
    return http.request({
        method: "POST",
        url: "/api/re/art",
        data,
    });
}