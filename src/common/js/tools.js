// 解析url参数
// @example: ?id=12345&key=value
// @return: {"id":12345,"key":"value"}

export function parseURL() {
  let url = window.location.search; // 必须加上window来制定全局域
  let obj = {};
  let str = url.substring(1); // "id=12345&key=value"
  let arr = str.split('&'); // ["id=12345","key=value"]
  if (arr) {
    arr.forEach((item) => {
      let _arr = item.split('='); // ["id","12345"]
      obj[_arr[0]] = _arr[1];
    });
  }
  return obj;
}
