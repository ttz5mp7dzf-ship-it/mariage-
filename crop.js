const sharp = require('sharp');
const fs = require('fs');

async function createStudioCutout() {
  const inputPath = 'C:/Users/HP OMEN/.gemini/antigravity/brain/2dcbb2b0-a7a4-43b0-a49c-28bdba7ff976/.user_uploaded/media_1788463229026.jpg';
  const img = sharp(inputPath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  // Let's create an SVG polygon mask matching the cloth contour
  // Top vertex: ~435, 78
  // Top right corner: ~632, 208
  // Right side: ~632, 665
  // Right curve bottom: ~605, 720 -> ~500, 726
  // Cloth bottom right: ~500, 846
  // Cloth bottom left: ~88, 856
  // Cloth left side: ~92, 235
  // Top left slope: ~92, 235 -> ~435, 78
  
  const svgMask = `
    <svg width="${width}" height="${height}">
      <polygon points="
        435,76
        632,208
        632,665
        605,720
        500,726
        500,846
        88,856
        92,235
      " fill="white" />
    </svg>
  `;
  
  const maskBuffer = await sharp(Buffer.from(svgMask)).png().toBuffer();
  const rawInput = await sharp(inputPath).raw().toBuffer();
  const rawMask = await sharp(maskBuffer).raw().toBuffer();
  
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = rawInput[i * 3];
    const g = rawInput[i * 3 + 1];
    const b = rawInput[i * 3 + 2];
    const a = rawMask[i * 4 + 3];
    
    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;
    out[i * 4 + 3] = a > 128 ? 255 : 0;
  }
  
  // Crop tightly around the polygon
  const cropLeft = 84;
  const cropTop = 72;
  const cropWidth = 636 - cropLeft;
  const cropHeight = 860 - cropTop;
  
  await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile('./public/pagne-officiel.png');
    
  console.log('Saved studio polygon cutout PNG!');
}

createStudioCutout().catch(console.error);
