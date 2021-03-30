const { Post } = require('../models');

const postData = [{
    title: '6 BigCommerce Design Tips For Big E-commerce Results',
    content: ' How does BigCommerce design work, and how can you create a successful ecommerce site using the platform?',
    user_id: 1
},
{
    title: 'Web DesignWhat is a UX Designer? And What Do They Do All Day?!',
    content: 'What is a UX designer? And what is UX design?',
    user_id: 2
},
{
    title: 'What Is Responsive Web Design? (The Non-Developer’s Cheat Sheet)',
    content: 'Predictions show that, by 2014, mobile will be the dominant form of web browsing. The Web has responded. The answer? Responsive Web Design.',
    user_id: 3
},
{
    title: 'Web DesignMake Websites Mobile-Friendly: 5 Astounding Tips',
    content: 'the WebFX Interactive team will cover how to make websites mobile-friendly. Check it out.',
    user_id: 4
},
{
    title: 'Web DesignTop 5 Web Design Tools & Software Applications',
    content: 'The tools in this article are what’s regarded as the most popular tools used for web design.',
    user_id: 5
}
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;