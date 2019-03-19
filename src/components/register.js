import Vue from 'vue'
import Left from './left'
import Mid from './mid'
import Add from './add'
import Md from './md'
import Set from './set'
import Tag from './tag'

export default {
  registerComponents () {
    Vue.component('Left', Left)
    Vue.component('Mid', Mid)
    Vue.component('Add', Add)
    Vue.component('Md', Md)
    Vue.component('Set', Set)
    Vue.component('Tag', Tag)
  }
}
