function toDouble (time) {
  return time > 9 ? time : '0' + time
}
let getNow = function () {
  let data
  let date = new Date()
  data = '' + date.getFullYear() + toDouble(date.getMonth() + 1) + toDouble(date.getDate())
  return data
}
let setStorage = function (key, val) {
  let newVal = JSON.stringify(val)
  localStorage.setItem(key, newVal)
}
let getStorage = function (key) {
  let data = localStorage.getItem(key)
  return JSON.parse(data)
}
export {
  getNow,
  setStorage,
  getStorage
}
