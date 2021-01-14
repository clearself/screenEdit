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
		if((typeof result.data.code !== 'undefined' && result.data.code == 1) ) {
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
//演练统计
export const getDrillStatistic = (data) => {
	return axios.request({
		url: 'api/manage/overviewChart/getNum',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

export const getDrillBrokenLine = (data) => {
	return axios.request({
		url: 'api/manage/overviewChart/getNumByMonth',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const getAttrackRank = (data) => {
	return axios.request({
		url: 'api/manage/overviewChart/getAttackTeamRanking',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}
export const getDefenseRank = (data) => {
	return axios.request({
		url: 'api/manage/overviewChart/getDefenseTeamRanking',
		method: 'post',
		params: data.queryData,
		data: data.paramsData,
	}).then(result => {
		console.log(result)
		return getAjax(result);
	})
}

//演练指挥态势
export const get_screen_drill_static = (data) => {
  return axios.request({
    url: 'api/terminal/getGameNum',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_rank_data = (data) => {
  return axios.request({
    url: 'api/terminal/attackTeamRanking',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_attrack_result = (data) => {
  return axios.request({
    url: 'api/terminal/getAttackResults',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_defense_data = (data) => {
  return axios.request({
    url: 'api/terminal/getDefenseResults',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_link_data = (data) => {
  return axios.request({
    url: 'api/terminal/linkGraph',
    method: 'post',
     params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}

// 成果提交分析
export const get_submit_result = (data) => {
  return axios.request({
    url: 'api/terminal/getSubmitAnalysis',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}

// 攻击手段统计
export const get_attack_way = (data) => {
  return axios.request({
    url: 'api/terminal/getAttackModeNum',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
// 演练趋势
export const get_trend = (data) => {
  return axios.request({
    url: 'api/terminal/getDrillTrend',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
// 顶部列表
export const get_topList = (data) => {
  return axios.request({
    url: 'api/terminal/getHisTop20',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_drill_team_detail = (data) => {
  return axios.request({
    url: 'api/terminal/attackTeamRankingInfo',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_attrack_defense_detail = (data) => {
  return axios.request({
    url: 'api/terminal/getRecordPage',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}
export const get_matchTime = (data) => {
  return axios.request({
    url: 'api/terminal/getGameTime',
    method: 'post',
    params: data.queryData,
    data: data.paramsData,
  }).then(result => {
    console.log(result)
    return getAjax(result);
  })
}


