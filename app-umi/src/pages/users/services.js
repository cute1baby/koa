import request from '@/utils/request';

export async function getQuestionList(params) {
    return request("http://62.234.192.179:7300/mock/5fbe747546d1046d9c86d11b/umi/getTableList", {
        method: "POST",
        body: params
    })
}
