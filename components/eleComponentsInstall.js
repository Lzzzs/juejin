import { Input, Button, Select, Option, Notification, Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

export default {
  install(Vue) {
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Button)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.prototype.$message = Message
    Vue.prototype.$notify  = Notification
  }
}