import Vue from 'vue'
import Top from './Top/top'
import Left from './Left/left'
import Middle from './Middle/middle'
import Add from './Right/add'
import Md from './Right/md'
import Set from './Right/set'
import Tag from './Right/tag'

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