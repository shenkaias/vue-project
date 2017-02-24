export function setLocal(id, key, value) {
  let seller = window.localStorage.__seller__; // 设置商家私有信息
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller); // 如果存在 先解析
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
}

export function getLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  return seller[key] || def;
}
