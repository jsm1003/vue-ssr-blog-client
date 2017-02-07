import store from '../store'

let aa

function directive (el, binding, v) {
    document.addEventListener('click', handleClick, true)
    aa = el
}

function handleClick(e) {
    if(!aa.contains(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        store.commit('CLOSE_DROP')
    }
}

export default {
    bind: directive,
    unbind () {
        document.removeEventListener('click', handleClick, true)
    }
}