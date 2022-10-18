const AmazonAction = require('./amazon-action')
const Selector = require('./constants/selector');
const { getTotal, getProductInfo, parsePriceRange } = require('./helper/select');

class Amazon extends AmazonAction {
  /**
   * 获取所有搜索结果
   */
   async getSearchResult() {
    const total = await this.getSearchTotal()
    const productList = await this.getSearchProductList()
    const brandList = await this.getProductBrand()
    const priceRangeList = await this.getProductPriceRange()

    return { 
      total,  // 产品总数
      productList, // 产品列表
      brandList, // 产品品牌列表
      priceRangeList // 产品价格区间
    }
  }

  /**
   * 获取查询产品总数
   */
  async getSearchTotal() {
    const barInfo = await this.page.$eval(Selector.searchInfoBar, el=>el.innerText);
    return getTotal(barInfo)
  }

  /**
   * 获取产品信息列表
   * @returns {Promise<Array>}
   */
  async getSearchProductList() {
    let productList = [];
    let hasNextPage = true;

    while(hasNextPage) {
      const currentProductList = await this.getCurrentPageProductList();
      productList.push(...currentProductList);
      hasNextPage = await this.goToNextPage();
    }

    return productList
  }

  /**
   * 获取当前页产品列表信息
   * @returns {Promise<Array>}
   */
  async getCurrentPageProductList() {
    // 获取产品明细信息
    const cardList = await this.page.$$(Selector.productCard);
    const productList = await Promise.all(cardList.map(async (card, index) => {
      return await getProductInfo(card, index)
    }))
    return productList
  }

  /**
   * 获取产品价格区间分类
   * @returns {Array<string>} priceRangeList 价格区间列表['0-25', '25-50', '50-100', '100-200', '200+']
   */
  async getProductPriceRange() {
    const priceRangeList = await this.page.$$eval(Selector.productPriceRange, elList=>elList.map(el=>el.innerText));
    return priceRangeList.map(parsePriceRange)
  }

  /**
   * 获取品牌列表
   * @returns {Array<string>} brandList 品牌列表
   */
  async getProductBrand() {
    const brandList = await this.page.$$eval(Selector.productBrand, elList=>elList.map(el=>el['ariaLabel']));
    return brandList
  }
}

module.exports = Amazon