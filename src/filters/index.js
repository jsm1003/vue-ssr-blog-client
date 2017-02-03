import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: function (code, lang) {
    var res;
    if (lang) {
      res = hljs.highlight(lang, code, true).value;
    } else {
      res = hljs.highlightAuto(code).value;
    }
    return res;
  }
});

function pluralize(time, label) {
    return time + label
}

export function markdown (str) {
    return marked(str)
}
//相对时间
export function timeAgo(time) {
    const between = (Date.now() - Date.parse(time)) / 1000
    if (between < 60) {
      return pluralize(~~between, '秒')
    }else if (between < 3600) {
        return pluralize(~~(between / 60), '分钟')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), '小时')
    } else if (between < 604800) {
      return pluralize(~~(between / 86400), '天')
    } else if (between < 31536000) {
      return pluralize(~~(between / 604800), '周')
    }
  return pluralize(~~(between / 31536000), '年')  
}

export function timeYmd(timestamp) {
    var time = new Date(timestamp * 1000)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (date < 10 ? '0' + date : date)
}