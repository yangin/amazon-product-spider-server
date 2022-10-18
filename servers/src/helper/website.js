const Website = require('../constants/website');
const { Lang, Language } = require('../constants/language');
/**
 * 获取当前站点显示的语言
 */
function getWebsiteLanguage(document) {
  const lang = document.querySelector('html').lang || Lang.US;
  return lang
}

/**
 * 获取本国语言的站点
 * @param {string} country 国家简称， 如：US
 */
function getLocalWebsite(country) {
  return `${Website[country]}?language=${Language[country]}`
}

module.exports = {
  getWebsiteLanguage,
  getLocalWebsite
}