/**
 * 定义的最大宽度和最大高度均为 500，如果图片的宽高至少有一个超出了 500，都会被 **等比例 **压缩，不用担心变形。可以根据自己项目需要改变maxWidth 和 maxHeight 。
 * 注意一点，对于有些宽高没到 500，且分辨率很小的图片，压缩之后可能比之前还大。。
 * 可以在调用的地方加个判断，如果压缩完的大小比原图小，就上传压缩后的图片；如果如果压缩完的大小比原图大，就上传原图
 */

// 将base64转换为blob
export function convertBase64UrlToBlob(urlData) {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}


// 压缩图片
export function compressImage(path) {
  const maxHeight = 500; //最大高度
  const maxWidth = 500; //最大宽度

  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = path;
    img.onload = function () {
      const originHeight = img.height;
      const originWidth = img.width;
      let compressedWidth = img.height;
      let compressedHeight = img.width;
      if ((originWidth > maxWidth) && (originHeight > maxHeight)) {
        // 更宽更高，
        if ((originHeight / originWidth) > (maxHeight / maxWidth)) {
          // 更加严重的高窄型，确定最大高，压缩宽度
          compressedHeight = maxHeight
          compressedWidth = maxHeight * (originWidth / originHeight)
        } else {
          //更加严重的矮宽型, 确定最大宽，压缩高度
          compressedWidth = maxWidth
          compressedHeight = maxWidth * (originHeight / originWidth)
        }
      } else if (originWidth > maxWidth && originHeight <= maxHeight) {
        // 更宽，但比较矮，以maxWidth作为基准
        compressedWidth = maxWidth
        compressedHeight = maxWidth * (originHeight / originWidth)
      } else if (originWidth <= maxWidth && originHeight > maxHeight) {
        // 比较窄，但很高，取maxHight为基准
        compressedHeight = maxHeight
        compressedWidth = maxHeight * (originWidth / originHeight)
      } else {
        // 符合宽高限制，不做压缩
      }
      // 生成canvas
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      canvas.height = compressedHeight;
      canvas.width = compressedWidth;
      context.clearRect(0, 0, compressedWidth, compressedHeight);
      context.drawImage(img, 0, 0, compressedWidth, compressedHeight);
      let base64 = canvas.toDataURL('image/*', 0.8);
      let blob = convertBase64UrlToBlob(base64);
      // compressImage 方法返回的是 blob 值，根据服务端接口需要可以改为返回 base64，
			// 只需将 resolve(blob) 改为 resolve(base64) 即可。
      resolve(blob)
    }
  })
}