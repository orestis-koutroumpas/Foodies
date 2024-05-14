// controller/footer-pages-controller.mjs

export async function footerPagesController(req, res) { 
    try {
        let pageTitle;
        let template;
        let renderCss = []; 
        
        // Determine which page to render based on the URL
        switch (req.url) {
            case '/about':
                pageTitle = 'About Us';
                template = 'about';
                renderCss.push('/css/footer-pages-styles.css');
                break;
            case '/privacy-policy':
                pageTitle = 'Privacy Policy';
                template = 'privacy-policy';
                renderCss.push('/css/footer-pages-styles.css');
                break;
            case '/terms-of-use':
                pageTitle = 'Terms of Use';
                template = 'terms-of-use';
                renderCss.push('/css/footer-pages-styles.css');
                break;
            default:
                res.status(404).send('Page not found');
                return;
        }
        res.render(template, { pageTitle, renderCss });
    } catch (error) {
        console.error('Error rendering page:', error);
        res.status(500).send('Internal Server Error');    
    }
}