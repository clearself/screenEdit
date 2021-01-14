import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import { Message,MessageBox } from 'element-ui';
//import Vuex from '../store/index.js'
import {
	setsessionStorage
} from '../assets/js/public_fun.js';
// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = '';
	axios.defaults.headers.post['Content-Type'] = 'application/json'; //'application/x-www-form-urlencoded';
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
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
				console.log(result.data.message);
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			} else if (result.data.code == 9005) {
			if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
				setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			} else {
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
		if ((typeof result.data.code !== 'undefined' && result.data.code == 1)) {
			resolve(result.data);
		} else {
			if (result.data.code == 2) { //请求成功但流程不对
				Message({
					message: result.data.message,
					type: 'warning'
				});
			} else if (result.data.code == 9999) {
				MessageBox.confirm('系统报错，点击查看详情?', '提示', {
		          confirmButtonText: '查看',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass:'confirm-box'
		        }).then(() => {
		        	setsessionStorage('errorInfo', result.data.message)
		          	router.push('/error')
		        }).catch(() => {});
			} else if (result.data.code == 9005) {
				if (document.getElementsByClassName('el-message').length === 0) {
				      Message({
								message: '登录已失效，请重新登录！',
								type: 'warning'
							});
			     }
				setTimeout(()=>{
					window.location.href = getCookie('basetokenbaseInfo');
				},1500)
			} else {
				Message({
					message: result.data.message,
					type: 'warning'
				});
			}
			reject(result.data);
		}
	})
}
//form表单五返回code
var getAjaxVal = result => {
	return new Promise((resolve, reject) => {
		if (result.status == 200) {
			resolve("success");
		} else {
			Message({
				message: result.data.message,
				type: 'warning'
			});
			reject(result.data);
		}
	})
}


export const getMap_one = (data) => {
  return axios.request({
    url: 'api/manage/defenseCommand/attackMap?type='+data.type,
    method: 'get',
    data: {},
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const getMap_two = (data) => {
  return axios.request({
    url: 'api/manage/defenseCommand/counterattackIpMap?type='+data.type,
    method: 'get',
    data: {},
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_match_users_list_hall = (data) => {
	return axios.request({
		url: 'api/manage/greeting/getAllUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

export const get_screen_static = (data) => {
  return axios.request({
    url: 'api/manage/defenseCommand/stat',
    method: 'get',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_trend = (data) => {
  return axios.request({
    url: 'api/manage/defenseCommand/trend',
    method: 'get',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}

export const get_customers = (data) => {
  return axios.request({
    url: 'api/manage/defenseCommand/attackedCustomer',
    method: 'get',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_backIp = (data) => {
  return axios.request({
    url: 'api/manage/defenseCommand/counterattackIp',
    method: 'get',
    data: data,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}

export const add_second = (data) => {
	return axios.request({
		url: 'api/manage/secondLineData/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
export const get_second_list = (data) => {
	return axios.request({
		url: 'api/manage/secondLineData/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

export const edit_second = (data) => {
	return axios.request({
		url: 'api/manage/secondLineData/update',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}


export const add_project = (data) => {
	return axios.request({
		url: 'api/manage/projectData/save',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
export const get_project_list = (data) => {
	return axios.request({
		url: 'api/manage/projectData/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

export const edit_project = (data) => {
	return axios.request({
		url: 'api/manage/projectData/update',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
