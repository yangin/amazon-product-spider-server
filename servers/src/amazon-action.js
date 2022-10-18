const puppeteer = require('puppeteer');
const Selector = require('./constants/selector');
const ZipCode = require('./constants/zip-code');
const { getLocalWebsite } = require('./helper/website');

class AmazonAction {
  constructor() {
    this.browser = null
    this.page = null
  }

  /**
   * 初始化一个浏览器实例
   */
  async init() {
    const browser = await puppeteer.launch({ headless: false });
    this.browser = browser
  }

  /**
   * 退出浏览器
   */
  async close() {
    await this.browser.close()
  }

  /**
   * 初始化一个站点：打开浏览器，打开当地语言的站点，切换配送地址为其国内邮编
   * @param {string} country 国家简称， 如：US
   */
  async initWebsite(country) {
    if(!this.browser) await this.init()
    this.page = await this.browser.newPage();
    const website = getLocalWebsite(country);
    await this.page.setViewport({ width: 1280, height: 800 })
    await this.page.goto(website);
    await this.page.waitForTimeout(1000);

    const searchEl = await this.page.$(Selector.searchInput)
    let isLoaded = !!searchEl
    // 加载的页面可能会有问题，这里要处理一下
    let reloadLoadCount = 3 // 重试次数

    // 重试3次，如果还是加载不成功，则抛出异常
    while(!isLoaded) {
      if(reloadLoadCount <= 0) {
        console.log('Load website failed')
        return
      }

      await this.page.reload();
      await this.page.waitForTimeout(1000);

      const searchEl = await this.page.$(Selector.searchInput)
      isLoaded = !!searchEl
      reloadLoadCount -= 1 
    }

    await this.setDeliverLocation(ZipCode[country]);
  }

  async closePage() {
    if(!this.page) return
    await this.page.close()
  }

  async search(searchKey) {
    if(!this.page) return
    await this.page.type(Selector.searchInput, searchKey);
    await this.page.click(Selector.searchSubmit);
    await this.page.waitForSelector(Selector.searchInfoBar);
    await this.page.waitForSelector(Selector.productCard);
    await this.page.waitForTimeout(1000);  // 等待1秒，等待页面加载完成
  }

  /**
   * 进入下一页
   * @returns {Promise<boolean>} 是否进入了下一页
   */
  async goToNextPage() {
    const isDisable = await this.page.$(Selector.searchNextPageDisable)
    if(isDisable) return false
    await this.page.click(Selector.searchNextPage);
    await this.page.waitForSelector(Selector.productCard);
    await this.page.waitForTimeout(2000);  // 等待1秒，等待页面加载完成
    return true
  }

  /**
   * 设置配送地址
   * @param {string} zipCode 配送地邮编
   */
  async setDeliverLocation(zipCode) {
    const address = await this.page.$eval(Selector.deliverLocationInfo, el=>el.innerText);

    // 如果当前配送地址是指定的邮编，则不需要设置
    if(address.includes(zipCode)) return

    // 如果当前配送地址不是邮编设置的地址，则切换为邮编地址
    await this.page.click(Selector.deliverLocationLink);
    await this.page.waitForSelector(Selector.deliverLocationInput);
    await this.page.waitForTimeout(500);
    await this.page.type(Selector.deliverLocationInput, zipCode);
    await this.page.click(Selector.deliverLocationSubmit);
    // 填写完zipCode后
    await this.page.waitForSelector(Selector.deliverLocationConfirm);
    await this.page.click(Selector.deliverLocationConfirm);
    await this.page.waitForTimeout(2000);
  }
}

module.exports = AmazonAction