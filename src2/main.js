// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/css/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
  path: '/',
  redirect: '/goods',
  component: goods
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: function (createElement) {
  // return createElement(App);
  // },
  render: createElement => createElement(App)
  // components: {App}
});
