// 浏览器视窗高度
function getClientHeight(): number {
    return document.documentElement.clientHeight || document.body.clientHeight
}
// 浏览器文档总高度
function getScrollHeight(): number {
    return document.documentElement.scrollHeight || document.body.scrollHeight
}
// 浏览器文档被卷起的高度
function getScrollTop(): number {
    return document.documentElement.scrollTop || document.body.scrollTop
}
function isVisible(elm: HTMLElement) {
    const rect = elm.getBoundingClientRect()
    const windowHeight = document.body.clientHeight || document.documentElement.clientHeight || window.innerHeight
    return !(rect.bottom < 0 || rect.top - windowHeight >= 0)
}
export function isReachedBottom(distance: number): boolean {
    const footer = document.getElementById('footer')
    // isVisible(footer) return true means reached the Bottom 
    if (footer) {
        return isVisible(footer)
    }
    else if (getScrollTop() + getClientHeight() + distance >= getScrollHeight()) {
        return true
    }
    else return false
}
