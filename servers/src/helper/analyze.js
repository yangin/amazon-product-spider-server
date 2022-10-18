const Analyze = require('../constants/analyze')
/**
 * 获取平均评论分数（满分5.0）
 */
const getAverageRating = (ratingList, reviewList) => {
  const totalRating = ratingList.reduce((total, rating) => total + rating, 0)
  const totalReview = reviewList.reduce((total, review) => total + review, 0)
  return (totalRating / totalReview).toFixed(1)
}

/**
 * 获取商品价格相关数据：最低价、最高价、平均价
 */
const getPriceRange = (priceList) => {
  const minPrice = Math.min(...priceList)
  const maxPrice = Math.max(...priceList)
  const avgPrice = (priceList.reduce((total, price) => total + price, 0) / priceList.length).toFixed(2)
  return { minPrice, maxPrice, avgPrice }
}

/**
 * 获取出现次数最多的num个价格及其出现的次数
 * @param {Array<{number: number}>} priceList [{12.99: 53}, {13.99: 24}, {14.99: 21}]
 */
const getMostFrequentPrice = (priceList, num = 5) => {
  const priceMap = {}
  priceList.forEach(price => {
    if (priceMap[price]) {
      priceMap[price]++
    } else {
      priceMap[price] = 1
    }
  })
  const priceArr = Object.entries(priceMap)
  priceArr.sort((a, b) => b[1] - a[1])
  return priceArr.slice(0, num)
}

/**
 * 根据Analyze.reviewRange获取商品的评价数区间
 * @param {Array<number>} reviewList 评价数列表
 * @returns {Object<string, number>} 评价数区间列表 { '0~99': 0, '100~299': 0, '300~999': 0, '1000~9999999': 0 }
 */
const getReviewRange = (reviewList) => {
  const reviewRange = {}
  Analyze.reviewRange.forEach(range => {
    const rangeArr = range.split('~')
    const min = parseInt(rangeArr[0])
    const max = parseInt(rangeArr[1])
    const count = reviewList.filter(review => review >= min && review <= max).length
    reviewRange[range] = count
  })
  return reviewRange
}

/**
 * 获取评论数最多的num个产品的价格'
 * @param {Array<{price: number, review: number}>} productList 产品列表
 * @param {number} num 产品数量
 * @returns {Array<number>} 价格列表 [12.99, 13.99, 14.99]
 */
const getMostReviewPrice = (productList, num = 5) => {
  const reviewList = []
  productList.forEach(product => {
    reviewList.push({
      price: product.price,
      review: product.review
    })
  })
  reviewList.sort((a, b) => b.review - a.review)
  return reviewList.slice(0, num)
}

/**
 * 获取各价格区间内的商品数
 * @param {Array<string>} priceRangeList 价格区间列表
 * @param {Array<{price: number}>} priceList 产品价格列表
 */
const getPriceRangeCount = (priceList, priceRangeList) => {
  const priceRangeCount = {}
  priceRangeList.forEach(range => {
    // 处理 500+ 为 500~9999999
    const currentRange = range.includes('+') ? `${range.replace('+','~')}9999999` : range
    const rangeArr = currentRange.split('~')
    const min = parseInt(rangeArr[0])
    const max = parseInt(rangeArr[1])
    const count = priceList.filter(price => price > min && price <= max).length
    priceRangeCount[range] = count
  })
  return priceRangeCount
}

/**
 * 获取商品相关分析数据：平均评论分数、最低价、最高价、平均价、出现次数最多的num个价格及其出现的次数、评价数区间
 */
const getStatisticsData = (productData) => {
  const {productList, total, brandList, priceRangeList} = productData
  const ratingList = []
  const priceList = []
  const reviewList = []
  const primeList = []
  productList.forEach(product => {
    const ratingCount = (product.rating || 0) * (product.review || 0)
    ratingList.push(ratingCount)
    priceList.push(product.price || 0)
    reviewList.push(product.review || 0)
    primeList.push(product.prime || false)
  })

  const avgRating = getAverageRating(ratingList, reviewList)
  const { minPrice, maxPrice, avgPrice } = getPriceRange(priceList)
  const mostFrequentPrice = getMostFrequentPrice(priceList)
  const reviewRange = getReviewRange(reviewList)
  const mostReviewPrice = getMostReviewPrice(productList)
  const primeCount = primeList.filter(Boolean).length
  const priceRangeCount = getPriceRangeCount(priceList, priceRangeList)
  const sampleTotal = productList.length

  return {
    avgRating, // 平均评级（满分5.0）
    minPrice, // 最低价格
    maxPrice, // 最高价格
    avgPrice, // 平均价格
    mostFrequentPrice, // 出现次数最多的价格
    reviewRange, // 评论数范围
    mostReviewPrice, // 最多评论数的价格
    primeCount,  // prime的总数
    total, // 产品总数
    brandList, // 品牌列表
    priceRangeCount, // 价格区间分布
    sampleTotal, // 分析样本总数
  }
}

module.exports = {
  getStatisticsData
}