import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import { Message,MessageBox } from 'element-ui';
//import Vuex from '../store/index.js'
import { setsessionStorage } from '../assets/js/public_fun.js';
// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = '';//带重点
	// axios.defaults.baseURL = 'http://10.1.225.74:10001/';
	axios.defaults.headers.post['Content-Type'] = 'application/json';//'application/x-www-form-urlencoded';
	axios.defaults.timeout = 60000;
}
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)
 
    if (start == -1) {
        return null;
    }
 
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
 
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
axios_config();
var getAjax = result => {
	return new Promise((resolve, reject) => {
		console.log('result',result);
		if((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data.data);
		} else {
			if(result.data.code == 2){//请求成功但流程不对
				Message({
			          message: result.data.message,
			          type: 'warning'
			        });
			}else if(result.data.code == 9999){
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
                    confirmButtonText: '查看',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass:'confirm-box'
                  }).then(() => {
                      setsessionStorage('errorInfo', result.data.message)
                        router.push('/error')
                  }).catch(() => {});
			}else if(result.data.code == 9005){
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
			  setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			}else{
				Message({
		          message: result.data.message,
		          type: 'warning'
		        });
			}
			reject(result.data);
		}
	})
}
var getAjaxSome = result => {
	return new Promise((resolve, reject) => {
		if(result.status == 200 ) {
			resolve(result.data);
		} else {
			if(result.data.code == 2){//请求成功但流程不对
				Message({
			          message: result.data.message,
			          type: 'warning'
			        });
			}else if(result.data.code == 9999){
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			}else if(result.data.code == 9005){
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
			   setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			}else{
				Message({
		          message: result.data.message,
		          type: 'warning'
		        });
			}
			reject(result.data);
		}
	})
}



// 正式开始 原始ip信息表格
export const get_list_data = (data) => {
	return axios.request({
		url: 'api/manage/originalIpInfo/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
// 原始 ip信息获取全部客户
export const get_all_customer_data = (data) => {
	return axios.request({
		url: 'api/manage/originalIpInfo/allCustomer',
		method: 'get',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
// 原始ip信息新增
export const add_users = (data) => {
	return axios.request({
		url: 'api/manage/originalIpInfo/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
// 原始ip信息修改
export const edit_users = (data) => {
	return axios.request({
		url: 'api/manage/originalIpInfo/update',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

// 组织管理 客户列表

export const client_list = (data) => {
	return axios.request({
		url: 'api/manage/organization/client/all',
		method: 'get',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}


// 组织管理 表格数据列表

export const get_organization_list_data = (data) => {
	return axios.request({
		url: 'api/manage/organization/user/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

// 组织管理--allUser
export const get_allUser = (data) => {
	return axios.request({
		url: 'base/terminal/getAllUsers',
		method: 'post',
		data: data,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
// 组织管理-- 添加
export const add_organization_user = (data) => {
	return axios.request({
		url: 'api/manage/organization/user/add',
		method: 'post',
		data: data,
	}).then(result => {
		return getAjax(result);
	})
}
// 组织管理 删除
export const del_organization_user = (data) => {
	return axios.request({
		url: 'api/manage/organization/user/delete',
		method: 'post',
		data: data,
	}).then(result => {
		return getAjax(result);
	})
}

// 组织管理 获取地区
export const get_area = (data) => {
	return axios.request({
		url: 'api/terminal/region/tree',
		method: 'get',
		data: data,
	}).then(result => {
		return getAjax(result);
	})
}

// 组织管理 添加编辑客户
export const add_client = (data) => {
	return axios.request({
		url: 'api/manage/organization/client/add',
		method: 'post',
		data: data,
	}).then(result => {
		return getAjax(result);
	})
}

// 组织管理 删除客户
export const del_client = (data) => {
	return axios.request({
		url: 'api/manage/organization/client/delete',
		method: 'post',
		data: data,
	}).then(result => {
		return getAjax(result);
	})
}

// 反制表格列表数据
export const get_list_counter = (data) => {
	return axios.request({
		url: 'api/manage/counterattackIp/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

// 反制 添加
export const add_users_counter = (data) => {
	return axios.request({
		url: 'api/manage/counterattackIp/save',
		method: 'post',
        params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

// 反制 修改
export const edit_users_counter = (data) => {
	return axios.request({
		url: 'api/manage/counterattackIp/update',
		method: 'post',
        params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

// ip情报管理
export const get_list_information = (data) => {
	return axios.request({
		url: 'api/manage/originalIpInfo/searchResultPage',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}