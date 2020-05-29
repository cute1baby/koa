// 参考地址：https://www.jianshu.com/p/ddb3f2230c7b

const fs = require('fs')
/**
 * 注意：在使用gm模块之前需要安装graphicsMagick，安装之后需要配置环境变量，
 * 然后重启电脑，才能使用
 */
const gm = require('gm')
/**
 * 常用Api的解释
 * size：获取宽高
 * identify：获取基本信息
 * resize：重新设置宽高
 * flip：翻转
 * rotate：旋转
 * blur：高斯模糊
 * magnify：放大1倍
 * crop：裁剪（宽高，位置）
 * edge：边缘（效果类似于背景变黑，整体图像明显的效果）
 * implode：内爆（不知道啥效果）
 * 
 * stroke: 外边框（跟drawCircle一起用）
 * drawCircle：画圆（圆心，半径）=>没看懂
 * 
 */








// 获取图片尺寸值
// gm('./imgs/a.jpg')
// .size(function (err, size) {
//   if (!err)
//     console.log('获取图片尺寸===', size);
// });

// 获取图片基本信息
// gm('./imgs/a.jpg')
// .identify(function (err, data) {
//   if (!err) console.log('获取图片基本信息==', data)
// });

gm('./imgs/a.jpg')
// .flip()
// .magnify(0.5)
// .rotate('green', 45)
// .blur(7, 3)
// .crop(300, 300, 150, 130)
.edge(1)
.write('./imgs/d.jpg', function (err) {
  // if (!err) console.log('效果切换');
})


gm('./imgs/a.jpg')
.stroke("#ffffff")
// .drawCircle(50, 50, 10,10)
// .font("Helvetica.ttf", 12)
.drawText(30, 20, "GMagick!")
.write('./imgs/e.jpg', function (err) {
  if (!err) console.log('done');
});


// 将图片a.jpg重新设置尺寸500*300px，并且命名为c.jpg
// gm('./imgs/a.jpg')
// .resize(500, 300)
// .noProfile()
// .write('./imgs/c.jpg', function (err) {
//     if (!err) {
//         console.log('done');
//     }else{
//         console.log(err)
//     }
// });

// 
/**
 * 将图片a.jpg放大到分辨率750*563，比例不变
 * 顺时针旋转60度，底部颜色为`#999`
 * 宽高模糊值设置5,5
 */
// gm('./imgs/a.jpg')
// .scale(750, 600)
// .rotate("#999", 60) 
// .blur(5, 5)
// .implode()
// .noProfile()
// .write('./imgs/d.jpg', function (err) {
//     if (!err) {
//         console.log('done111');
//     }
// });


/**
 * 合成图
 * 方法1：mosaic进行合成
 * 将图片bg.png（背景图），b.jpg（二维码图片），avatar.png（头像土拍你）
 * 合成一张确定位置的图片
 */
gm()
.in("-page", "+0+0") //-page是设置图片位置，所有的图片以左上为原点，向右、向下为正
.in("./imgs/hc/bg.png") //底图，到这里第一张图就设置完了，要先设置参数，再设置图片

.in("-resize", "200x200") //设置微信二维码图片的大小（等比缩放）
.in("-page", "+138+250") //设置微信二维码图片的位置
.in("./imgs/hc/b.jpg") //二维码图

.in("-resize", "50x50").border(1, 1).borderColor('#0B8B27') //logo图大小
.in("-page", "+75+75") //logo图位置
.in("./imgs/hc/avatar.png") //logo图
.mosaic() //图片合成
.write("./imgs/hc/all_1.png", function(err) {
    //图片写入
    if (!!err) {
        console.log(err);
    } else {
        console.log("ok");
    }
});


/**
 * 合成图
 * 方法2：draw进行合成
 * bgImage：底图
 * params：二维码的位置和大小
 *  key1: 参数1
 *      position 位置和大小
 *      path 图片路径
 * outputPath：合成图片的输出路径
 */
function composeLocalImages(
  bgImage,
  params,
  outputPath
) {
  return new Promise((resolve, reject) => {
    gm(bgImage)
      .draw(params.key1)
      .draw(params.key2)
      .write(outputPath, function(err) {
        if (!err) {
          console.log("composeLocalImages done!");
          return resolve(true);
        } else {
          console.log(err.message || "composeLocalImages 出错了！");
          return resolve(false);
        }
      });
  });
}

let params = {
    key1: 'image Over 138, 250, 200, 200 "./imgs/hc/b.jpg"',
    key2: 'image Over 75, 75, 50, 50 "./imgs/hc/avatar.png"'
};
const allImg = composeLocalImages('./imgs/hc/bg.png', params, "./imgs/hc/all_2.png")
if(!allImg){
    console.log('图片合成错误')
}


