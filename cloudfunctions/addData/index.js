// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const addData = db.collection('product')
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  try {
    return await addData.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: "product2",
        description: 'learn cloud database',
        due: new Date('2018-09-01'),
        tags: [
          'cloud',
          'database'
        ],
        location: new db.Geo.Point(113, 23),
        done: false,
        price: 88,
        color: "red",
        image: "https://developers.weixin.qq.com/miniprogram/dev/image/cat/0.jpg?t=19010912"
      }
    })
  } catch (e) {
    console.error(e)
  }
}