const Lang = {
  US: 'en-us', // 美国
  UK: 'en-gb', // 英国
  DE: 'de-de', // 德国
  FR: 'fr-fr', // 法国
  IT: 'it-it', // 意大利
  ES: 'es-es', // 西班牙
  CA: 'en-ca', // 加拿大
  JP: 'ja-jp', // 日本
  CN: 'zh-cn', // 中国
  IN: 'en-in', // 印度
  MX: 'es-mx', // 墨西哥
  BR: 'pt-br', // 巴西
  AU: 'en-au', // 澳大利亚
  AE: 'ar-ae', // 阿联酋
  SA: 'ar-sa', // 沙特阿拉伯
  TR: 'tr-tr', // 土耳其
}

/**
 * 将Lang对象的'en-us'转换为'en_US'格式
 * @param {object} lang 
 * @returns {object}
 */
 const LangToLanguage = (lang) => {
  const language = {}
  Object.entries(lang).forEach(([key, value]) => {
    const langArr = value.split('-')
    language[key] = `${langArr[0]}_${langArr[1].toUpperCase()}`
  })

  return language
}

const Language = LangToLanguage(Lang)

module.exports = {
  Language,
  Lang
};