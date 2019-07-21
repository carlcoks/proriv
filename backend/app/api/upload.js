const fs = require('fs'),
      path = require('path'),
      Busboy = require('busboy'),
      sharp = require('sharp'),
      crypto = require('crypto'),
      async = require('async'),
      rimraf = require("rimraf"),
      { Op } = require('sequelize');

// const readXlsxFile = require('read-excel-file/node');
const xlsx = require('node-xlsx');

const api = {};

api.uploadFile = (Users, Peoples, Service, Vectors, Token) => (req, res) => {
  if (Token) {

    const userId = req.query.user_id;
    const uploadDir = 'public/files';

    Users.findOne({
      attributes: ['id'],
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) return res.status(401).send({ success: false, message: 'Пользователь не найден!' });

      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        let type = fieldname.split('_').pop();

        let newFileName = crypto.randomBytes(12).toString('hex'); // создаём случайное имя файла без расширения
        let MiMe = mimetype.split("/").pop(); // берём расширение
        let fileName = newFileName+'.xlsx'; // новое имя файла с расширением

        let saveTo = path.join(uploadDir, fileName);
        file.pipe(fs.createWriteStream(saveTo));

        file.on('end', function() {

          let tablePeople = xlsx.parse(saveTo);

          tablePeople = tablePeople[0]['data'];

          let array = [], vectors = [];

          if (tablePeople && tablePeople.length > 0 && tablePeople[0].length > 3) {

            tablePeople.forEach(function(item, i, arr) {

              if (i != 0) {

                let model = {
                  people_id: item[0],
                  birthday: item[1] != "NULL" ? item[1] : 0,
                  city: item[2] != "NULL" ? item[2] : 0,
                  family: item[3] == "NULL" ? 0 : item[3] == 'Женат' || item[3] == 'Замужем' ? 1 : 0,
                  job: item[4] != "NULL" ? item[4] : 0,
                  gender: item[5] == "NULL" ? 0 : item[5] == 'Женский' ? 2 : item[5] == 'Мужской' ? 1 : 0,
                  license: item[6] != "NULL" ? item[6] : 0,
                  cars: item[7] != "NULL" ? item[7] : 0,
                  childs: item[8] != "NULL" ? item[8] : 0,
                };

                let vector = {
                  0: item[1] != "NULL" ? item[1] : 0,
                  1: item[3] == "NULL" ? 0 : item[3] == 'Женат' || item[3] == 'Замужем' ? 1 : 0,
                  2: item[5] == "NULL" ? 0 : item[5] == 'Женский' ? 2 : item[5] == 'Мужской' ? 1 : 0,
                  3: item[6] != "NULL" ? item[6] : 0,
                  4: item[7] != "NULL" ? item[7] : 0,
                  5: item[8] != "NULL" ? item[8] : 0,
                };

                array.push(model);
                vectors.push({people_id: item[0], vector: JSON.stringify(vector)});
              }

            })

            let endPeoples = [];

            // Peoples.bulkCreate(array)
            //   .then(() => {
              Vectors.findAll()
                .then(allVecs => {

                  allVecs.map((item, its) => {
                    let vec1 = JSON.parse(item.vector);

                    vectors.map(newvect => {
                      let vec2 = JSON.parse(newvect.vector);

                      let top = 0, bot1 = 0, bot2 = 0;

                      Array.from(Array(6)).map((el, i) => {
                        if (i != 0)
                          top += parseFloat(vec1[i]*vec2[i]);
                      });

                      Array.from(Array(6)).map((el, i) => {
                        if (i != 0)
                          bot1 += parseFloat(Math.pow(vec1[i], 2));
                      });
                      bot1 = parseFloat(Math.sqrt(bot1));

                      Array.from(Array(6)).map((el, i) => {
                        if (i != 0)
                          bot2 += parseFloat(Math.pow(vec2[i], 2));
                      });
                      bot2 = parseFloat(Math.sqrt(bot2));

                      const angle = parseFloat(top / (parseFloat(bot1 * bot2)));
                      if (angle.toFixed(2) > 0.8)
                        endPeoples.push(item.people_id);

                    })

                  })

                  Service.findAll({
                    attributes: [],
                    where: {
                      people_id: {
                        [Op.in]: endPeoples
                      }
                    }
                  })
                  .then((recs) => {

                    res.json({ success: true, result: recs });

                  })

                })


                // Vectors.bulkCreate(vectors)
                //   .then(() => {
                //     res.json({ success: true });
                //   })

              // })

          } else {

            // tablePeople.forEach(function(item, i, arr) {
            //
            //   if (i != 0) {
            //
            //     let model = {
            //       name: item[0] != "NULL" ? item[0] : '',
            //       people_id: item[1] != "NULL" && item[1] != '' ? item[1] : 0,
            //       service_id: item[2] != "NULL" && item[2] != '' ? item[2] : 0,
            //     };
            //
            //     array.push(model)
            //   }
            //
            // })
            //
            // Service.bulkCreate(array)
            //   .then(() => {
                res.json({ success: true });
              // })

          }

        })

      })

      busboy.on('field', function(fieldname, value){
      });

      busboy.on('finish', function() {
      })

      return req.pipe(busboy);

    })

  } else return res.status(403).send({ success: false, message: 'Вы не авторизованы!' });
}

module.exports = api;
