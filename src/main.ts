import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/views/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false

Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

// // record store
// window.recordList = recordListModel.fetch();
// window.createRecord = (record: RecordItem) => { recordListModel.createItem(record); }


// // tag store
// window.tagList = tagListModel.fetch();
// window.findTag = (id: string) => {
//   return window.tagList.filter(item => item.id === id)[0]
// }

// window.addTag = (name: string) => {
//   const res = tagListModel.createItem(name);
//   if (res.code == 0) {
//     window.alert("标签名重复！");
//   } else if (res.code == 1) {
//     window.alert("新增标签成功！");
//   }
// };

// window.removeTag = (id: string) => {
//   return tagListModel.remove(id);
// };

// window.updateTag = (id: string, name: string) => {
//   return tagListModel.update(id, name);
// };

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
