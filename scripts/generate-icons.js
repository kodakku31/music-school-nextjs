const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// アイコンのサイズ定義
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconPath = path.join(__dirname, '../public/icons/icon.svg');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  try {
    console.log('アイコン生成を開始します...');
    
    // SVGアイコンを読み込む
    const image = await loadImage(iconPath);
    
    // 各サイズのアイコンを生成
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // 背景を白に
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      
      // SVGを描画
      ctx.drawImage(image, 0, 0, size, size);
      
      // PNGとして保存
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      const out = fs.createWriteStream(outputPath);
      const stream = canvas.createPNGStream();
      
      stream.pipe(out);
      out.on('finish', () => {
        console.log(`${outputPath} を生成しました`);
      });
    }
    
    console.log('アイコン生成が完了しました');
  } catch (error) {
    console.error('アイコン生成中にエラーが発生しました:', error);
  }
}

generateIcons();
