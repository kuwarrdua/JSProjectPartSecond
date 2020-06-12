const viewPath = ('pages');

exports.home = (req,res) => {
    res.render(`${viewPath}/home`);
};

exports.about = (req,res) => {
    res.render(`${viewPath}/about`);
};

exports.contact = (req,res) => {
    res.render(`${viewPath}/contact`);
};

