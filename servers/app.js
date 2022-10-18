const express = require('express')
const { crawlProductData } = require('./src/amazon-spiders')
const { getProductStatisticsData } = require('./src/amazon-analyze')


const app = express()
const port = 3000

/**
 * 获取商品统计数据
 * @param {string} searchKey 搜索关键字
 */
app.get('/product-statistics-list', async (req, res) => {
  const { searchKey } = req.query
  const data = await getProductStatisticsData(searchKey)
  res.send(data)
})

app.get('/product-spider', async (req, res) => {
  const { searchKey } = req.query
  const data = await crawlProductData(searchKey)
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})