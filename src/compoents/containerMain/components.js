const components = []
// 建立上下文件关系
const files = require.context("../../views", true, /\.js$/);// 第一个参数：目录，第二参数：是否查找子级目录，第三参数：指定查找到文件
files.keys().map(key => {
    if (key.includes('./Index') || key.includes('./Login')) { return false }
    const splitFilesName = key.split('.')
    const path = `/index${splitFilesName[1].toLowerCase()}`
    const component = files(key).default;
    components.push({ path, component })
})
export default components