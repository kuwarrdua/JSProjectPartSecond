const viewPath = ('pages');

exports.home = (req,res) => {
    res.render(`${viewPath}/home`, {
        pageTitle: 'Welcome Home'
    });
};

exports.about = (req,res) => {
    res.render(`${viewPath}/about`, {
        pageTitle: 'About me'
    });
};

exports.contact = (req,res) => {
    res.render(`${viewPath}/contact`, {
        pageTitle: 'Contact Page'
    });
};

