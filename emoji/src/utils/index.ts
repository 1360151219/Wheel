import data from '../datas'
let emojiData: { [key: string]: any } = {}
Object.values(data).forEach(item => {
    emojiData = Object.assign(emojiData, item)
})
/**
 *
 *
 * @export
 * @param {string} value
 * @returns {string}
 */

export function emoji(value: string) {
    if (!value) return
    Object.keys(emojiData).forEach(item => {
        value = value.replace(new RegExp(item, 'g'), createIcon(item))
    })
    return value
}

function createIcon(item: string) {
    const value = emojiData[item]
    const path = 'http://2021-h5-questions.pivotstudio.cn/static/emoji/'
    return `<img src=${path}${value} width="16px" height="16px">`
}

export interface emojiModel {
    [key: string]: string
}