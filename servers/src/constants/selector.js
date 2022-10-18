
const Selector = {
  searchInput: '#twotabsearchtextbox',
  searchSubmit: '#nav-search-submit-button',
  searchInfoBar: '#search>[data-component-type="s-result-info-bar"]>div > h1 > div > .s-breadcrumb > div > div > span:nth-child(1)',
  searchNextPage: '.s-pagination-strip > a:last-child',
  searchNextPageDisable: '.s-pagination-strip > span.s-pagination-next.s-pagination-disabled',
  productListPanel:  '.s-desktop-content > .s-matching-dir',
  productCard: '[data-component-type="s-search-result"]',
  productCardSet: {
    img: 'img[data-image-latency="s-product-image"]', // 图片
    title: 'h2 > a > span', // 标题
    link: 'h2 > a', // 商品详情链接
    price: 'a > span.a-price > span.a-offscreen', // 价格
    rating: 'i > .a-icon-alt', // 评分
    review: 'span > a > .a-size-base', // 评论数
    prime: '.a-icon-prime', // prime
    save: '[data-component-type="s-coupon-component"]', // 优惠
  },
  productBrand: '#brandsRefinements ul > li[aria-label]', // 品牌
  productPriceRange: '#priceRefinements li[id^="p_36/"] > span > a > span', // 价格区间
  deliverLocationLink: '#nav-global-location-popover-link',
  deliverLocationInput: '#GLUXZipUpdateInput',
  deliverLocationSubmit: '#GLUXZipUpdate',
  deliverLocationConfirm: '#a-popover-1>div>.a-popover-footer>span>span[data-action="GLUXConfirmAction"]',
  deliverLocationInfo: '#glow-ingress-line2',
}

module.exports = Selector;