/**
 * 根据输入的关键字去amazon搜索
 * 美国站：https://www.amazon.com/
 */
const Country = require('./constants/country');
const Amazon = require('./amazon');
const { saveSearchDataToFile } = require('./helper/database');

/**
 * 根据关键字从amazon官网爬取商品数据，并存入数据库中
 */
async function crawlProductData(searchKey) {
  const amazon = new Amazon()
  await amazon.initWebsite(Country.US)
  await amazon.search(searchKey)
  const data = await amazon.getSearchResult()
  saveSearchDataToFile(data, searchKey)
  await amazon.close();
  return data
}

module.exports = {
  crawlProductData
}