import fs from 'fs';
import path from 'path';
import { generateSingleFileHtml } from '../src/utils/singleFileGenerator';

const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const html = generateSingleFileHtml();
const targetPath = path.join(outDir, 'nha-rong-nha-dai-tay-nguyen-f03.html');
fs.writeFileSync(targetPath, html, 'utf-8');

console.log(`Successfully generated standalone single HTML file at: ${targetPath}`);
