
// export default {
//     LIGHT: 1, // 灯杆,
//     MMaster controller
// }
 
// 2：主控器；3：灯具；4：屏幕；5：wifi设备 6：灯具控制器；7：通信基站；8：监控摄像头(Camera)；9：AccessPoint；10：井盖；11：气象监测

module.exports = {
  checkIphoneX(res) {
    return res.statusBarHeight > 38
  }
}
