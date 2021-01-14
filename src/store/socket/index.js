export default {
	state: {
		stompClient:null,
	},
	mutations: {
		connect(state, {
			data
		}) {
			// 建立连接对象
				let socket = new SockJS(data);
				// 获取STOMP子协议的客户端对象
			return state.stompClient = Stomp.over(socket);;
		},
		
	},
	actions: {
		buildconnect(store, {
			data
		}) {
			store.commit('connect', {
				data
			});
		},
		
	},
	getters: {
		
	}
}