import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = join(__dirname, '../public/icons/icon-512x512.svg');
const outputDir = join(__dirname, '../public/icons');

// Certifique-se de que o diretório de saída existe
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Gera os ícones em diferentes tamanhos
sizes.forEach(size => {
  sharp(inputFile)
    .resize(size, size)
    .toFile(join(outputDir, `icon-${size}x${size}.png`))
    .then(info => console.log(`Generated ${size}x${size} icon`))
    .catch(err => console.error(`Error generating ${size}x${size} icon:`, err));
}); 