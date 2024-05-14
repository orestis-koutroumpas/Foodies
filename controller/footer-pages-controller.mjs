// controller/footer-pages-controller.mjs

export async function footerPagesController(req, res) { 
    try {
        let pageTitle;
        let template;
        let renderCss = []; // Initialize the renderCss array
        
        // Determine which page to render based on the URL
        switch (req.url) {
            case '/about':
                pageTitle = 'About Us';
                template = 'about';
                renderCss.push('/css/footer-pages-styles.css'); // Add the CSS file path for the about page
                break;
            case '/privacy-policy':
                pageTitle = 'Privacy Policy';
                template = 'privacy-policy';
                renderCss.push('/css/footer-pages-styles.css'); // Add the CSS file path for the privacy policy page
                break;
            case '/terms-of-use':
                pageTitle = 'Terms of Use';
                template = 'terms-of-use';
                renderCss.push('/css/footer-pages-styles.css'); // Add the CSS file path for the terms of use page
                break;
            default:
                res.status(404).send('Page not found');
                return;
        }

        // Pass the renderCss array to the template
        res.render(template, { pageTitle, renderCss });
    } catch (error) {
        console.error('Error rendering page:', error);
        res.status(500).send('Internal Server Error');    
    }
}