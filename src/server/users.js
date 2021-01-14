import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs'
import router from '../router/index'
import { Message,MessageBox } from 'element-ui';
import {
	setsessionStorage
} from '../assets/js/public_fun.js';
//import Vuex from '../store/index.js'

// 全局的配置的默认值/defaults
export let axios_config = () => {
	axios.defaults.baseURL = '';
	axios.defaults.headers.post['Content-Type'] = 'application/json';
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

//获取所有分组
export const getGroups = (data) => {
	return axios.request({
		url: 'api/manage/api/getGroups',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}
//获取所有角色
export const getRoles = (data) => {
	return axios.request({
		url: 'api/manage/api/getAllRoles',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}

//获取所有厂商
export const getDeps = (data) => {
	return axios.request({
		url: 'api/manage/api/getDeps',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}

//获取上级
export const getParents = (data) => {
	return axios.request({
		url: 'api/manage/api/getValidUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}
//获取厂商
export const getStore = (data) => {
	return axios.request({
		url: 'api/manage/api/getAllManufacturer',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}

//添加or修改用户
export const addUsers = (data) => {
	return axios.request({
		url: 'api/manage/api/saveUser',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}

//删除用户
export const delUsers = (data) => {
	return axios.request({
		url: 'api/manage/api/delUser',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//用户列表数据
export const getAll = (data) => {
	return axios.request({
		url: 'api/manage/api/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result)
		return getAjax(result);
	})
}


//角色列表数据
export const getAllRoles = (data) => {
	return axios.request({
		url: 'api/manage/api/getAllRoles',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//添加厂商
export const addDeps = (data) => {
	return axios.request({
		url: 'api/manage/manufacturer/saveManufacturer',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//删除厂商
export const delDeps = (data) => {
	return axios.request({
		url: 'api/manage/manufacturer/del',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取厂商列表
export const getDepsAll = (data) => {
	return axios.request({
		url: 'api/manage/manufacturer/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}


//获取所有角色权限
export const getAllResource = (data) => {
	return axios.request({
		url: 'api/manage/userRole/getAllResource',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//添加角色
export const addRoles = (data) => {
	return axios.request({
		url: 'api/manage/userRole/saveRole',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//删除角色
export const delRoles = (data) => {
	return axios.request({
		url: 'api/manage/userRole/del',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取角色列表
export const getRolesAll = (data) => {
	return axios.request({
		url: 'api/manage/userRole/page',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//添加客户
export const addCustomer = (data) => {
	return axios.request({
		url: 'api/manage/client/addClientInfo',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//更新客户
export const updateCustomer = (data) => {
	return axios.request({
		url: 'api/manage/client/updateClientInfo',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//搜索客户
export const searchCustomer = (data) => {
	return axios.request({
		url: 'api/manage/client/queryClientInfoList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//删除客户
export const delCustomer = (data) => {
	return axios.delete('api/manage/client/deleteClientInfo', {
		params: data
	}).then(result => {
		console.log('result',result)
		return getAjax(result);
	});
}


//获取客户列表
export const getCustomer = (data) => {
	return axios.request({
		url: 'api/manage/client/queryClientInfoList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//获取项目列表
export const getProject = (data) => {
	return axios.get('api/manage/cntract/project/selectProject', {
		params: data
	}).then(result => {
		console.log('result',result)
		return getAjax(result);
	});
}


//添加小组
export const addGroups = (data) => {
	return axios.request({
		url: 'command/manage/adminusergroup/saveGroup',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//删除小组
export const delGroups = (data) => {
	return axios.request({
		url: 'command/manage/adminusergroup/delGroup',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取小组列表
export const getGroupsAll = (data) => {
	return axios.request({
		url: 'command/manage/adminusergroup/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//获取所有user
export const getUserAll = (data) => {
	return axios.request({
		url: 'command/manage/adminusergroup/getValidUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}


//获取用户登录成功后的系统入口列表
export const getSysMenus = (data) => {
	return axios.request({
		url: 'api/manage/permission/getSysMenus',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//判断跳转地址
export const getHref = (data) => {
	return axios.request({
		url: 'api/manage/permission/getLoginUrl',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}




//添加部门
export const addDepartment = (data) => {
	return axios.request({
		url: 'api/manage/department/saveDepartment',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//删除部门
export const delDepartment = (data) => {
	return axios.request({
		url: 'api/manage/department/del',
		method: 'post',

		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取部门列表
export const getDepartmentAll = (data) => {
	return axios.request({
		url: 'api/manage/department/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}





//获取组织列表
export const getTissueList = (data) => {
	return axios.request({
		url: 'api/manage/tissue/findTissueList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//添加组织
export const addTissue = (data) => {
	return axios.request({
		url: 'api/manage/tissue/addTissue',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//更新组织
export const editTissue = (data) => {
	return axios.request({
		url: 'api/manage/tissue/updateTissue',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//删除组织
export const delTissue = (data) => {
	return axios.delete('api/manage/tissue/deleteTissue', {
		params: data
	}).then(result => {
		console.log('result',result)
		return getAjax(result);
	});
}

//获取组织负责人
export const getValidUsers = (data) => {
	return axios.request({
		url: 'api/manage/tissue/getValidUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}


//获取选手列表
export const getAllPlayer = (data) => {
	return axios.request({
		url: 'api/manage/player/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//添加选手
export const addPlayer = (data) => {
	return axios.request({
		url: 'api/manage/player/savePlayer',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//删除选手
export const delPlayer = (data) => {
	return axios.request({
		url: 'api/manage/player/delById',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//禁用选手
export const disPlayer = (data) => {
	return axios.request({
		url: 'api/manage/player/prohibit',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取所有组织
export const getAllTissuse = (data) => {
	return axios.request({
		url: 'api/manage/player/getAllTissuse',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取所有用户
export const getAllUsers = (data) => {
	return axios.request({
		url: 'api/manage/player/getValidUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}


//获取所有用户
export const getReferee = (data) => {
	return axios.request({
		url: 'api/manage/referee/getValidUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//获取裁判列表
export const getAllReferee = (data) => {
	return axios.request({
		url: 'api/manage/referee/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}

//添加裁判
export const addReferee = (data) => {
	return axios.request({
		url: 'api/manage/referee/saveReferee',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//删除裁判
export const delReferee = (data) => {
	return axios.request({
		url: 'api/manage/referee/delById',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//禁用裁判
export const disReferee = (data) => {
	return axios.request({
		url: 'api/manage/referee/prohibit',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}



//赛事获取厂商
export const getStoreList = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/getManfacturerList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//获取厂商下的人
export const getStoreUsers = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/getAllManfacturerUser',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//获取功能模块
export const getSysList = (data) => {
	return axios.request({
		url: 'api/manage/modular/getSysMenus',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
//功能模块禁用启用
export const updateStatus = (data) => {
	return axios.request({
		url: 'api/manage/modular/updateStatus',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		// console.log(result);
		return getAjax(result);
	})
}
