const { getProductStatisticsData } = require('./src/amazon-analyze')
const { crawlProductData } = require('./src/amazon-spiders')

async function run() {
  const result = await getProductStatisticsData('box')
  console.log(result)
}

run()