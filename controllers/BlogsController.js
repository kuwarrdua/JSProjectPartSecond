const viewPath = ('blogs');
const Blog = require('../models/blog');

exports.index = async (req,res) => {
    try{
        const blogs = await Blog.find();
        res.render(`${viewPath}/index`, {
        pageTitle: 'Archieve',
        blogs: blogs  
        });
    }catch(error){
        req.flasg('danger', `There was an error displaying the archieve: ${error} `);
        res.redirect('/');
    }
};

exports.show = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render(`${viewPath}/show`, {
            pageTitle: blog.title,
            blog: blog   
        });
    } catch(error){
        req.flasg('danger', `There was an error displaying the archieve: ${error} `);
        res.redirect('/');
    }
};

exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Blog'
    });
};

exports.create = async (req,res) => {
    //to show our body of json content
    // console.log(`Blog body: ${JSON.stringify(req.body, null, 2)}`);

try{
const blog = await Blog.create(req.body);
req.flash('success', 'Blog created successfully');
res.redirect(`/blogs/${blog.id}`);
}catch (err){
    req.flash('danger',`There was a error creating this blog: ${err}`);
    //sending them already filled page
    res.redirect('/new');
}
};


exports.edit = (req,res) => {
    
};

exports.update = (req,res) => {
    res.send('Wowza');
};

exports.delete = (req,res) => {
    res.send('Goodbye');
};