import axios from 'axios'

const base="127.0.0.1:8080"

// export const activityList = () => axios.get(" /api/cappuccino/icon_set?platform=2&type=1&version=3")

// // 分类商品列表
// export const cateproductList = (opt_id, opt_type, size, offset) => axios.get(`/operation/${opt_id}/groups`, {
//     params: {
//         opt_type,
//         size,
//         offset,
//         sort_type: "DEFAULT"

//     }
// })
// 用户登录
export const login = (username, password) => axios
    .post("http://127.0.0.1:8080/userLogin", {
        username: username,
        password: password
    })

export const getInfo = (token) => axios
    .post("/getInfo", {
        token: tokrn
    })
