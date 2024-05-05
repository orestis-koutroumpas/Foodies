// model.mjs

import fs from 'fs';
import path from 'path';

// Function to read data from stores_data.json
export const getAllStores = () => {
    try {
        const data = fs.readFileSync('C:/Users/okout/Programming Files/Internet Programming Course 2023-2024/Foodies/model/stores_data.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading stores_data.json:', error);
        return null;
    }
};
