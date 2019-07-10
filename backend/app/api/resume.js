const api = {};

api.getResume = (UserResume) => (req, res) => {

  const userId = req.query.user_id;

  UserResume.findAll({
    attributes: ['id', 'name', 'value'],
    where: {
      user_id: userId,
    }
  })
  .then((resume) => {

    let result = {
      about: '',
      education: [],
      job: []
    };

    resume.map(item => {
      if (item.name == 'resume') {
        result[item.name] = item.value;
      } else {
        result[item.name] = JSON.parse(item.value);
      }
    })

    res.json({ success: true, result });

  })

}

api.editResume = (User, UserResume, Token) => (req, res) => {
  if (Token) {

    const userId = req.body.user_id,
          name = req.body.name,
          data = req.body.data;

    User.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      UserResume.findOne({
        where: {
          user_id: userId,
          name: name,
        }
      })
      .then((obj) => {
        if (obj) {
          obj.update(data);
        }
        else {
          UserResume.create({
            user_id: userId,
            name: name,
            ...data
          })
        }

        res.json({ success: true, message: '' });
      })
    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
