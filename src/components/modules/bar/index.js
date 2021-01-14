import bar from './bar.vue';
import barSet from './barSet.vue';
/* istanbul ignore next */
bar.install = function(Vue) {
  Vue.component(bar.name, bar);
};
barSet.install = function(Vue) {
  Vue.component(barSet.name, barSet);
};
export {
	bar,
	barSet
};