// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//获取数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('FoodList')
    .orderBy('timestamp', 'desc')
    .get({
      success:function(res){
        return res;
        console.log('列表',res)
      }
    });
  }catch(e){
    console.error(e)
  }
}