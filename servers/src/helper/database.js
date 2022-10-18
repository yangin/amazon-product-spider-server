/**
 * 数据存储
 */

const {writeFileSync} = require('../utils/file');
const {getAbsolutePath} = require('../utils/path');
const {jsonFormat} = require('../utils/format');
const Path = require('../constants/path');

/**
 * 根据searchKey获取存储数据的文件路径
 */
function getDataFilePathBySearchKey (searchKey) {
  return getAbsolutePath(`${Path.dataDir}/${searchKey.replace(/\ /ig, '-')}.json`)
}

/**
 * 保存数据到指定文件中
 */
function saveSearchDataToFile (data, searchKey) {
  const content = jsonFormat(JSON.stringify(data))
  const filePath = getDataFilePathBySearchKey(searchKey)
  writeFileSync(filePath, content)
}

module.exports = {
  getDataFilePathBySearchKey,
  saveSearchDataToFile
}



