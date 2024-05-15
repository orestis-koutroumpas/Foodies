// routes/data.mjs

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Derive the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let rawdata = fs.readFileSync(path.join(__dirname, 'coffees.json'));
let productsData = JSON.parse(rawdata);

export function getProductsData() {
    return productsData;
}