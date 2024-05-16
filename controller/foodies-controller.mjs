// controller/foodies-controller.mjs

// Importing controllers for different sections of the website
import { homeController } from './home-controller.mjs';
import { searchController } from './search-controller.mjs';
import { storeController } from './store-controller.mjs';
import { checkoutController } from './checkout-controller.mjs';
import { footerPagesController } from './footer-pages-controller.mjs';

// Exporting all controllers for use in other parts of the application
export { 
    homeController,
    searchController,
    storeController,
    checkoutController,
    footerPagesController,
};