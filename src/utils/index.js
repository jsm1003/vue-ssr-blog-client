export const inBrowser = typeof window !== 'undefined'

export const on = (elem, type, listener, useCapture = false) => {
  elem.addEventListener(type, listener, useCapture)
}

export const off = (elem, type, listener, useCapture = false) => {
  elem.removeEventListener(type, listener, useCapture)
}
export const getTransitionEndEvent = () => {
  let isWebkitTrans =
    window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  let transitionEndEvent = isWebkitTrans
    ? 'webkitTransitionEnd'
    : 'transitionend'
  return transitionEndEvent
}
 //后续会把函数防抖的那两个函数加进来，当然再看一下requestAnimation