// helpers.js

const bold = (str) => `<b>${str}</b>`
const italic = (str) => `<i>${str}</i>`
const underline = (str) => `<u>${str}</u>`
const color = (str, hex) => `<font color="#${hex}">${str}</font>`
const has = (item, array) => array.includes(item)

module.exports = {bold, italic, underline, color, has}