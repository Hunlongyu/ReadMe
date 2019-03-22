import db from './db'

// 更新数据库内容
db.md.update(1, { tag: 'PWA' }).then((updated) => {
  if (updated) {
    console.log('updated success')
  } else {
    console.log('update fail')
  }
})

// 更新数据库内容
db.md.put({
  repository: 'papa',
  tag: 'repo',
  url: 'https://www.qq.com',
  id: 8
}).then(e => {
  console.log(e)
}).catch(err => {
  console.log(err)
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

// 添加多个数据到数据库
db.md.bulkAdd([
  {
    repository: 'rada',
    tag: 'test',
    url: 'www.adfa.com'
  },
  {
    repository: 'sdkfa',
    tag: 'test',
    url: 'www.coasdfa.com'
  }
]).catch((err) => {
  console.log(err)
})

// 删除数据
db.md.delete(16)

// 查找数据
db.md.where('tag').equalsIgnoreCase('test').each(md => {
  console.log(md.repository)
}).catch(err => {
  console.log(err)
})

// 获取数据
db.md.get(24).then(e => {
  console.log(e.tag)
})

// 获取数据
db.md.orderBy(':id').limit(10).each(e => {
  console.log(e.tag)
})

// 操作
let table = db.md
let item
let key
let arr = []
table.add(item, [key]).then().catch() // 添加单条数据
table.bulkAdd(arr).then().catch() // 添加多组数据
table.clear() // 清空该数据库
table.count(e => {}) // 获取数据库有多少条数据
table.delete(key) // 删除单条数据
table.each(e => {}) // 循环获取数据
table.filter() // 过滤获取数据
table.get(key).then(e => {}) // 获取数据
table.orderBy(':id').limit(10).each(e => {}) // 获取按id排序的前10个数据
table.where('repository').startsWithIgnoreCase('Hun').each(md => {}) // 包含字母，忽略大小写
table.where('repository').equalsIgnoreCase('Hun').each(md => {}) // 相同单词，忽略大小写
table.where('repository').equalsIgnoreCase('Hun').toArray(md => {}) // 返回数组

db.delete() // 清空数据库（慎用！！）
