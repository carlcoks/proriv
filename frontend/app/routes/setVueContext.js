module.exports = (req, res, next) => {
  res.locals.context = {
    title: 'Dolinger Analytics',
    url: req.url,
    user: req.session.user,
    state: {
    },
  };

  next();
};
