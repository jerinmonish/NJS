function homeData(req, res) {
    return res.json({ 'home': 'one', 'status': 200 });
}

module.exports = { homeData }