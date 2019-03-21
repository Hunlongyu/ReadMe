import db from './db'

// 更新数据库内容
db.md.update(1, { tag: 'PWA' }).then((updated) => {
  if (updated) {
    console.log('updated success')
  } else {
    console.log('update fail')
  }
})

// 添加到数据库
db.md.add({
  repository: 'lalal',
  tag: 'js',
  url: 'https://www.baidu.com'
}).then((id) => {
  console.log(id)
}).catch((err) => {
  console.log(err)
})
