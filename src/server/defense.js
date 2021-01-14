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


//获取赛事配置信息
export const get_match_sets = (data) => {
	return axios.get('api/manage/gameEvent/getDeployInfo', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//获取赛事组织列表
export const get_match_group = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/getTissueList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//获取赛事裁判列表
export const get_match_referee = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/page',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//发布赛事
export const public_match = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/addGameEvent',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//发布赛事
export const edit_match = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/updateGameEventInfo',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//赛事列表
export const get_match_list = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/findGameEventInfoList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}


//删除赛事
export const delete_match = (data) => {
	return axios.delete('api/manage/gameEvent/deleteGameEventInfo', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//关闭赛事
export const close_match = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/closeGameEvent',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//赛事详情
export const get_match_info = (data) => {
	return axios.get('api/manage/gameEvent/getEventInfo', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}


//获取战绩配置信息
export const get_record_sets = (data) => {
	return axios.get('api/manage/record/getDeployInfo', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

export const get_record_attrack_sets = (data) => {
	return axios.get('api//manage/rehearsal/getDeployInfo', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//获取所有赛事信息
export const get_all_matchs = (data) => {
	return axios.get('api/manage/record/getAllGameEvent', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//创建战绩
export const add_record = (data) => {
	return axios.request({
		url: 'api/manage/record/addRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//获取银行城市信息
export const get_bank_city = (data) => {
	return axios.get('api/manage/record/getAllBankCityInfo', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}


//查询战绩
export const get_records = (data) => {
	return axios.request({
		url: 'api/manage/record/findRecordList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//查询战绩
export const change_attack_record = (data) => {
	return axios.request({
		url: 'api/manage/record/modifyRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//删除战绩
export const delete_record = (data) => {
	return axios.delete('api/manage/record/deleteRecord', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//审核战绩
export const sure_check = (data) => {
	return axios.request({
		url: 'api/manage/record/verifyRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//管理中心顶部数据
export const get_num_data = (data) => {
	return axios.get('api/manage/statistics/getCountData', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//管理中心获取所有赛事
export const get_all_achievement_matchs = (data) => {
	return axios.get('api/manage/statistics/getAllGameEvent', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//统计
export const get_statistic_data = (data) => {
	return axios.request({
		url: 'api/manage/statistics/recordCount',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//获取小组
export const get_chat_list = (data) => {
	return axios.request({
		url: 'api/manage/greeting/findGameEventInfoList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
/*聊天接口*/
//获取赛事人员列表
export const get_match_users_list = (data) => {
	return axios.request({
		url: 'api/manage/greeting/getGameUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
export const get_match_team_users_list = (data) => {
	return axios.request({
		url: 'api/manage/greeting/getTeamUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
export const get_small_team_users_list = (data) => {
	return axios.request({
		url: 'api/manage/greeting/getSmallTeamUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}

export const get_teamType = (data) => {
	return axios.request({
		url: 'api/manage/greeting/findUserTeamType',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
export const get_historyTeam = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/findHistoryTeam',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
//新郑接口
//获取 登录账号 所在的赛事信息list
export const get_attract_defense_match_list = (data) => {
	return axios.get('api/manage/rehearsal/getMyGameEvent', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

export const get_attract_defense_match_list_select = (data) => {
	return axios.get('api/manage/record/getMyGameEvent', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
//添加成果
export const add_attrack_defense_record = (data) => {
	return axios.request({
		url: 'api/manage/record/addRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result);
		return getAjax(result);
	})
}
export const edit_attrack_defense_record = (data) => {
	return axios.request({
		url: 'api/manage/record/modifyRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//赛事列表
export const get_replay_match_list = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/findRehearsalList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
//赛事列表
export const add_Attrack_relay = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/addStep',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const get_Attrack_defense_relay = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/refreshStepData',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const get_replay_record = (data) => {
	return axios.get('api/manage/rehearsal/getDefenseGainList', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const edit_defense_relay = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/modifyDefenseStep',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const edit_Attrack_relay = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/modifyAttackStep',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const deleteReplay = (data) => {
	return axios.delete('api/manage/rehearsal/deleteStep', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const add_say = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/stateGain',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const voer_replay = (data) => {
	return axios.get('api/manage/rehearsal/overRehearsal', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_link = (data) => {
	return axios.request({
		url: 'api/manage/rehearsal/linkGraph',
		method: 'post',
		data: data,
	}).then(result => {
		return getAjax(result);
	})
}
//
export const get_record_referee = (data) => {
	return axios.request({
		url: 'api/manage/defenseReferee/findRecordList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const get_attrack_referee = (data) => {
	return axios.request({
		url: 'api/manage/attackReferee/findRecordList',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

export const sure_attrack_check = (data) => {
	return axios.request({
		url: 'api/manage/attackReferee/verifyRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

export const sure_defense_check = (data) => {
	return axios.request({
		url: 'api/manage/defenseReferee/verifyRecord',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

export const get_attrack_match_list = (data) => {
	return axios.get('api/manage/attackReferee/getMyGameEvent', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const get_defense_match_list = (data) => {
	return axios.get('api/manage/defenseReferee/getMyGameEvent', {
		params: data
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//添加常用语
export const add_common_wordds = (data) => {
	return axios.request({
		url: 'api/manage/greeting/saveWords',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const get_common_wordds = (data) => {
	return axios.request({
		url: 'api/manage/greeting/getOftenWords',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const delete_common_wordds = (data) => {
	return axios.request({
		url: 'api/manage/greeting/deleteWords',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}
export const get_current_team_info = (data) => {
	return axios.request({
		url: 'api/manage/gameEvent/findTeamUsers',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

//聊天图片上传

export const chat_upload = (data) => {
	return axios.request({
		url: 'api/manage/greeting/upload',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		return getAjax(result);
	})
}

