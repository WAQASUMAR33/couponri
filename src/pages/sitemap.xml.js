import axios from 'axios';

function generateSitemap(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`;
}

function escapeXml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function createURL(loc, changefreq, priority, lastmod = new Date().toISOString()) {
    return `<url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${escapeXml(changefreq)}</changefreq>
    <priority>${escapeXml(priority.toString())}</priority>
  </url>`;
}

export async function getServerSideProps({ res }) {
    const api = 'https://www.couponri.com/api';
    const urls = [];

    try {
        const [blogs, blogcategories, companies, offers, categories, categorycoupons] = await Promise.all([
            axios.get(`${api}/blog`).catch(() => null),
            axios.get(`${api}/blogcategory`).catch(() => null),
            axios.get(`${api}/company`).catch(() => null),
            // axios.get(`${api}/offers`).catch(() => null),
            axios.get(`${api}/category`).catch(() => null),
            axios.get(`${api}/category_coupon`).catch(() => null),
        ]);

        if (blogs?.data) {
            blogs.data.forEach(blog =>
                urls.push(createURL(`https://www.couponri.com/blog/${blog.web_slug}`, 'always', '0.6', blog.updatedAt))
            );
        }
        if (blogcategories?.data) {
            blogcategories.data.forEach(blogcategory =>
                urls.push(createURL(`https://www.couponri.com/blogcategories/${blogcategory.web_slug}`, 'always', '0.6', blogcategory.updatedAt))
            );
        }
        if (companies?.data) {
            companies.data.forEach(company =>
                urls.push(createURL(`https://www.couponri.com/store/${company.web_slug}`, 'always', '0.7'))
            );
        }
        // if (offers?.data) {
        //     offers.data.forEach(offer =>
        //         urls.push(createURL(`https://www.couponri.com/offers/${offer.offer_title}`, 'always', '0.8'))
        //     );
        // }
        if (categories?.data) {
            categories.data.forEach(category =>
                urls.push(createURL(`https://www.couponri.com/category/${category.web_slug}`, 'always', '0.5'))
            );
        }
        if (categorycoupons?.data) {
            categorycoupons.data.forEach(category =>
                urls.push(createURL(`https://www.couponri.com/pages/categorycoupons/${category.web_slug}`, 'always', '0.5'))
            );
        }
        // Add static URLs
        urls.push(createURL('https://www.couponri.com/', 'daily', '1.0'));
        urls.push(createURL('https://www.couponri.com/pages/aboutus', 'always', '0.8'));
        urls.push(createURL('https://www.couponri.com/pages/contactus', 'always', '0.8'));
        urls.push(createURL('https://www.couponri.com/pages/submitoffer', 'daily', '0.8'));
        urls.push(createURL('https://www.couponri.com/blog', 'daily', '0.8'));
        urls.push(createURL('https://www.couponri.com/store', 'daily', '0.8'));
        urls.push(createURL('https://www.couponri.com/categories', 'daily', '0.8'));
        urls.push(createURL('https://www.couponri.com/pages/privacypolicy', 'always', '0.8'));


        const sitemap = generateSitemap(urls);

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.statusCode = 500;
        res.end();
    }

    return {
        props: {},
    };
}

export default function Sitemap() {
    return null;
}
