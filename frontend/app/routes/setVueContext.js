module.exports = (req, res, next) => {
  res.locals.context = {
    title: 'СпортТут',
    url: req.url,
    user: req.session.user,
    state: {
    },
  };

  next();
};
