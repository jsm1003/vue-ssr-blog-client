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

export const markdown = str => {
    return marked(str)
}