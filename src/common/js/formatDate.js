export function formatDate(date, format) {
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }

  let F = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds
  };
  for (let i in F) {
    if (new RegExp(`(${i})`).test(format)) {
      let string = F[i] + '';
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? string : prefix(string));
    }
  }
  return format;
}

function prefix(string) {
  return ('00' + string).substring(string.length);
}
