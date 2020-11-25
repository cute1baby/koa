import request from '@/utils/request';

export async function getQuestionList(params) {
    return request("http://62.234.192.179:7300/mock/5fbe09e86bfbdb50beec3ab0/umi/getTableList", {
        method: "POST",
        body: params
    })
}
