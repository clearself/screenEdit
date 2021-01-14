import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const VueRouterReplace = Router.prototype.replace;
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch((err) => err);
};
const errorPage = () => import('@/pages/error.vue');
const edit = () => import('@/pages/edit.vue');
const screen = () => import('@/pages/screen.vue');
export default new Router({
    base: '',
    routes: [
        {
            path: '/',
            redirect: '/edit'
        },
        {
            path: '/error',
            name: 'error',
            component: errorPage,
            meta: {
                title: '系统出错了'
            }
        },

        {
            path: '/edit',
            name: 'edit',
            component: edit,
            meta: {
                title: '创建大屏'
            }
        },
		{
		    path: '/screen',
		    name: 'screen',
		    component: screen,
		    meta: {
		        title: '大屏展示'
		    }
		},
      
    ]
});
