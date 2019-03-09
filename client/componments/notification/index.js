import notification from './notification.vue'
import notify from './func'

export default (Vue) => {
  Vue.component(notification.name, notification)
  Vue.prototype.$notify = notify
}
