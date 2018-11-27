import Vue from 'vue'
import Frame from './Frame/index'
import Left from './Left/index'
import Middle from './Middle/index'
import Add from './Right/add'
import Cat from './Right/cat'
import Imex from './Right/imex'
import Md from './Right/md'
import Search from './Right/search'
import Setting from './Right/setting'
import Sync from './Right/sync'
import Tag from './Right/tag'

export default {
  registerComponents () {
    Vue.component('Frame', Frame)
    Vue.component('Left', Left)
    Vue.component('Middle', Middle)
    Vue.component('Add', Add)
    Vue.component('Cat', Cat)
    Vue.component('Imex', Imex)
    Vue.component('Md', Md)
    Vue.component('Search', Search)
    Vue.component('Setting', Setting)
    Vue.component('Sync', Sync)
    Vue.component('Tag', Tag)
  }
}
