const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  let { userInfo, _id } = event
  try {
    return await db.collection('FoodList').where({
      _id: _id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}