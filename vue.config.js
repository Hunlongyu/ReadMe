module.exports = {
  pages: {
    index: 'src/renderer/main.ts'
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.ts',
      nodeIntegration: false,
      preload: {
        preload: 'src/main/preload/index.ts'
      },
      mainProcessWatch: ['src/main/'],
      builderOptions: {
        productName: 'ReadMe',
        copyright: 'Copyright @ 2021 hunlongyu',
        appId: 'com.hunlongyu.readme',
        win: {
          target: 'nsis'
        },
        nsis: {}
      }
    }
  }
}
