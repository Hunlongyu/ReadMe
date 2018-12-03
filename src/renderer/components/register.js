import Vue from 'vue'
import Frame from './Frame/index'
import Left from './Left/index'
import Middle from './Middle/index'
import Add from './Right/add'
import Md from './Right/md'
import Setting from './Right/setting'
import Tag from './Right/tag'

export default {
  registerComponents () {
    Vue.component('Frame', Frame)
    Vue.component('Left', Left)
    Vue.component('Middle', Middle)
    Vue.component('Add', Add)
    Vue.component('Md', Md)
    Vue.component('Setting', Setting)
    Vue.component('Tag', Tag)
  }
}
