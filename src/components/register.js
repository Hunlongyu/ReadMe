import Vue from 'vue'
import Top from './top'
import Left from './left'
import Middle from './middle'
import Add from './add'
import Md from './md'
import Set from './set'
import Tag from './tag'

export default {
  registerComponents () {
    Vue.component('Top', Top)
    Vue.component('Left', Left)
    Vue.component('Middle', Middle)
    Vue.component('Add', Add)
    Vue.component('Md', Md)
    Vue.component('Set', Set)
    Vue.component('Tag', Tag)
  }
}
