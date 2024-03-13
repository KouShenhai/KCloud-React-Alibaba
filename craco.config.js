const path = require('path')  
module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src') // 允许通过@符号来表示 src目录
    }
  }
}