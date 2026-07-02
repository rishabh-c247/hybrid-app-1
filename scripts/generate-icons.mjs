/**
 * Generates PNG app icons for PWA and Capacitor.
 * Uses only Node.js built-in modules — no extra dependencies.
 * Replace the generated icons with proper branded artwork before release.
 */

import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'icons');

mkdirSync(OUT_DIR, { recursive: true });

// CRC32 lookup table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crcTable[i] = c;
}
function crc32(buf) {
    let crc = 0xffffffff;
    for (const b of buf) crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
    const typeBytes = Buffer.from(type, 'ascii');
    const len = Buffer.allocUnsafe(4);
    len.writeUInt32BE(data.length, 0);
    const crcVal = Buffer.allocUnsafe(4);
    crcVal.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 0);
    return Buffer.concat([len, typeBytes, data, crcVal]);
}

function makePng(size, bgR, bgG, bgB, fgR, fgG, fgB) {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR
    const ihdr = Buffer.allocUnsafe(13);
    ihdr.writeUInt32BE(size, 0);
    ihdr.writeUInt32BE(size, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 2; // RGB
    ihdr[10] = ihdr[11] = ihdr[12] = 0;

    // IDAT: draw a simple rounded square icon
    const half = size / 2;
    const padding = size * 0.18;
    const innerSize = size - padding * 2;
    // Draw 3 horizontal "layer" bars centered
    const barH = Math.round(innerSize * 0.14);
    const gap = Math.round(innerSize * 0.12);
    const totalH = barH * 3 + gap * 2;
    const startY = Math.round(half - totalH / 2);
    const startX = Math.round(padding);
    const endX = Math.round(size - padding);

    const rawRows = [];
    for (let y = 0; y < size; y++) {
        const row = Buffer.allocUnsafe(1 + size * 3);
        row[0] = 0; // filter: None
        for (let x = 0; x < size; x++) {
            let r = bgR, g = bgG, b = bgB;

            // Draw 3 layer bars (Layers icon approximation)
            for (let bar = 0; bar < 3; bar++) {
                const barY = startY + bar * (barH + gap);
                if (y >= barY && y < barY + barH && x >= startX && x < endX) {
                    r = fgR; g = fgG; b = fgB;
                }
            }

            const idx = 1 + x * 3;
            row[idx] = r;
            row[idx + 1] = g;
            row[idx + 2] = b;
        }
        rawRows.push(row);
    }

    const raw = Buffer.concat(rawRows);
    const compressed = deflateSync(raw, { level: 9 });

    return Buffer.concat([
        signature,
        chunk('IHDR', ihdr),
        chunk('IDAT', compressed),
        chunk('IEND', Buffer.alloc(0)),
    ]);
}

const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

// Dark background, white layers icon
const BG = [15, 15, 15];
const FG = [255, 255, 255];

for (const size of sizes) {
    const png = makePng(size, ...BG, ...FG);
    const file = join(OUT_DIR, `icon-${size}.png`);
    writeFileSync(file, png);
    console.log(`✓ icon-${size}.png`);
}

console.log('\nIcons generated in public/icons/');
console.log('Replace with proper branded artwork before release.\n');
