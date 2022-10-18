const { crawlProductData } = require('./amazon-spiders');
const { isExist, getJsonInFile } = require('./utils/file');
const { getStatisticsData } = require('./helper/analyze');
const { getDataFilePathBySearchKey } = require('./helper/database');

/**
 * 获取商品统计数据
 */
 async function getProductStatisticsData(searchKey) {
  const dataFilePath = getDataFilePathBySearchKey(searchKey)
  const isExistFile = isExist(dataFilePath)
  // 如果数据文件不存在，则从amazon官网爬取数据
  if (!isExistFile) { await crawlProductData(searchKey) }
  // 从文件中读取数据
  const sourceData = getJsonInFile(dataFilePath)
  const staticsData = getStatisticsData(sourceData)
  return staticsData
}

module.exports = {
  getProductStatisticsData
}