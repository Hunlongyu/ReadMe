<template>
  <a-row id="md">
    <a-row class="top">
      <a-button type="primary" @click="home">官网</a-button>
      <a-button @click="modify">修改</a-button>
      <a-popconfirm placement="bottomRight" okText="Yes" cancelText="No" @confirm="confirm">
        <template slot="title">
            <p>是否确定删除该数据</p>
        </template>
        <a-button type="danger">删除</a-button>
      </a-popconfirm>
    </a-row>
    <a-col class="spin" v-show="spinShow">
      <a-spin tip="Loading"></a-spin>
    </a-col>
    <a-row class="markdown-body" v-show="!spinShow">
      <div v-html="markdown" v-highlight></div>
    </a-row>
    <a-modal class="modify" title="修改" :visible="visible" @ok="handleOk" @cancel="handleCancel" >
      <a-form>
        <a-form-item label="作者/库：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.repository"></a-input>
        </a-form-item>
        <a-form-item label="标签：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.tag"></a-input>
        </a-form-item>
        <a-form-item label="官网：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.htmlUrl"></a-input>
        </a-form-item>
        <a-form-item label="MD地址：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-input v-model="d.mdUrl"></a-input>
        </a-form-item>
        <a-form-item label="描述：" :labelCol="{span: 3}" :wrapperCol="{span: 21}">
          <a-textarea v-model="d.description" :rows="4"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-row>
</template>
<script>
import marked from 'marked'
import db from '../database/nedb'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
export default {
  name: 'md',
  data () {
    return {
      markdown: null,
      visible: false,
      spinShow: true,
      d: {}
    }
  },
  computed: {
    url () {
      let u = this.$store.getters.getMdUrl
      if (u === '') {
        u = 'https://raw.githubusercontent.com/Hunlongyu/ReadMe-client/dev/README.md'
      }
      return u
    },
    id () {
      return this.$store.getters.getDBID
    }
  },
  watch: {
    url (curval, oldval) {
      if (curval !== oldval) {
        this.getMd()
      }
    }
  },
  methods: {
    getMd () {
      this.spinShow = true
      this.$http.get(this.url).then((res) => {
        let md = marked(res.data)
        this.markdown = md
        this.$nextTick(() => {
          this.changePicSize()
          this.changeALink()
          this.spinShow = false
        })
      })
    },
    changePicSize () {
      let imgs = document.getElementsByTagName('img')
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.maxWidth = '90%'
      }
    },
    changeALink () {
      let a = document.getElementsByTagName('a')
      for (let i = 0; i < a.length; i++) {
        a[i].target = '_blank'
      }
    },
    home () {
      db.find({ _id: this.id }, (e, d) => {
        window.open(d[0].htmlUrl, '_blank')
      })
    },
    modify () {
      db.find({ _id: this.id }, (e, d) => {
        this.d = d[0]
        this.visible = true
      })
    },
    handleOk () {
      db.update({ _id: this.d._id }, { $set: this.d }, (err, num) => {
        if (err) {
          this.$message.warning('修改失败，请重试')
        } else {
          this.$message.success('修改成功')
          this.$store.commit('CHANGE_REFRESH', true)
        }
        this.visible = false
      })
    },
    handleCancel () {
      this.visible = false
      this.$message.info('未修改')
    },
    confirm () {
      db.remove({ _id: this.id }, {}, (e, d) => {
        if (e === null) {
          this.$message.success('删除成功')
          this.$store.commit('CHANGE_REFRESH', true)
          this.$store.commit('CHANGE_RIGHT', 'add')
        } else {
          this.$message.warning('删除失败，请重试')
        }
      })
    }
  },
  mounted () {
    this.getMd()
  }
}
</script>
<style lang="scss" scoped>
#md{
  flex: 1;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar{
    width: 1px;
    height: 0;
  }
  .top{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    button{
      margin: 10px 20px 10px 0;
    }
  }
  .modify{
    .min{
      margin-top: 10px;
    }
  }
  .markdown-body{
    padding: 20px;
    height: 100%;
    img{
      max-width: 80%;
    }
  }
  #components-back-top-demo-custom .ant-back-top {
    bottom: 100px;
  }
  #components-back-top-demo-custom .ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
  .spin{
    margin-top: 20px;
    text-align: center;
  }
}
</style>
