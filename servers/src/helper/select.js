const Selector = require('../constants/selector');
/**
 * 提取信息辅助方法
 */

/**
 * 从barInfo中提取total信息
 * @param {string} barInfo
 * @returns {string} total 945 | 200,000+
 */
const getTotal = (barInfo) => {
  const totalInfo = barInfo.split('of')[1].trim();
  const total = totalInfo.includes('over') ? `${totalInfo.split(' ')[1]}+` : totalInfo.split(' ')[0];
  return total
}

const getRating = (ratingInfo) => {
  if(!ratingInfo) return 0
  const rating = ratingInfo.split(' ')[0];
  return Number(rating)
}

/**
 * 从$19.99中提取价格19.99
 * @param {string} priceInfo 
 */
const getPrice = (priceInfo) => {
  const price = priceInfo.replace('$', '');
  return Number(price)
}

/**
 * 获取价格区间
 * 解析Up to $25、$25 to $50、 $50 & above 为‘0~25’,'25~50','50+'
 */
const parsePriceRange = (priceRange) => {
  const priceNumRange = priceRange.replace(/\$/ig, '').replace(/\ /ig,'').replace('Under', '0~')
  if(priceNumRange.includes('&')){
    return `${priceNumRange.split('&')[0]}+`
  }
  return priceNumRange.replace('to','~')
}

/**
 * 从cardInfo中提取price信息
 */
const getProductInfo = async (productCardEl, index) => {
  const productCard = Selector.productCardSet;
  let title = '';
  let rating = 0;
  let review = 0;
  let link = '';
  let image = '';
  let price = 0;
  let prime = false;

  try {
    title = await productCardEl.$eval(productCard.title, el=>el?.innerText || '');
    const ratingInfo = await productCardEl.$eval(productCard.rating, el=>el?.innerText || '');
    rating = getRating(ratingInfo)
    const reviewInfo = await productCardEl.$eval(productCard.review, el=>el?.innerText);
    review = reviewInfo ? Number(reviewInfo) : 0
    link = await productCardEl.$eval(productCard.link, el=>el?.href || '');
    image = await productCardEl.$eval(productCard.img, el=>el?.src || '');
    const priceInfo = await productCardEl.$eval(productCard.price, el=>el?.innerText || '');
    price = getPrice(priceInfo);
    const primeEl = await productCardEl.$(productCard.prime);
    prime = !!primeEl;
  }catch(e){
    // console.log('error-->', index, {price, title, rating, review, link, image})
  }

  return { price, title, rating, review, link, image, prime }
}

module.exports = {
  getTotal,
  getProductInfo,
  parsePriceRange
}