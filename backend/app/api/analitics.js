const jwt = require('jsonwebtoken'),
      config = require('../../config');

const api = {};

api.analitics = (Users, Peoples, Service, Vectors, Token) => (req, res) => {
	if(Token) {
		const userId = req.query.user_id,
			  serviceId = req.params.id;

		let people = [],
			peopleData = {},
			serviceData = {};

		peopleData.birthday = {};
		peopleData.city = {};
		peopleData.family = {};
		peopleData.job = {};
		peopleData.gender = {};
		peopleData.license = {};
		peopleData.cars = {};
		peopleData.childs = {};

		serviceData.birthday = {};
		serviceData.city = {};
		serviceData.family = {};
		serviceData.job = {};
		serviceData.gender = {};
		serviceData.license = {};
		serviceData.cars = {};
		serviceData.childs = {};



		Peoples.findAll({

		}).then((peoples) => {
			peoples.forEach(function(item, i, arr) {

				people[item.dataValues.people_id] = {
					birthday: item.dataValues.birthday,
					city: item.dataValues.city,
					family: item.dataValues.family,
					job: item.dataValues.job,
					gender: item.dataValues.gender,
					license: item.dataValues.license,
					cars: item.dataValues.cars,
					childs: item.dataValues.childs
				};

				if(peopleData.birthday[item.dataValues.birthday]) {
					peopleData.birthday[item.dataValues.birthday] = peopleData.birthday[item.dataValues.birthday] + 1;
				} else {
					peopleData.birthday[item.dataValues.birthday] = 1;
				}

				if(peopleData.city[item.dataValues.city]) {
					peopleData.city[item.dataValues.city] = peopleData.city[item.dataValues.city] + 1;
				} else {
					peopleData.city[item.dataValues.city] = 1;
				}

				if(peopleData.family[item.dataValues.family]) {
					peopleData.family[item.dataValues.family] = peopleData.family[item.dataValues.family] + 1;
				} else {
					peopleData.family[item.dataValues.family] = 1;
				}

				if(peopleData.job[item.dataValues.job]) {
					peopleData.job[item.dataValues.job] = peopleData.job[item.dataValues.job] + 1;
				} else {
					peopleData.job[item.dataValues.job] = 1;
				}

				if(peopleData.gender[item.dataValues.gender]) {
					peopleData.gender[item.dataValues.gender] = peopleData.gender[item.dataValues.gender] + 1;
				} else {
					peopleData.gender[item.dataValues.gender] = 1;
				}

				if(peopleData.license[item.dataValues.license]) {
					peopleData.license[item.dataValues.license] = peopleData.license[item.dataValues.license] + 1;
				} else {
					peopleData.license[item.dataValues.license] = 1;
				}

				if(peopleData.cars[item.dataValues.cars]) {
					peopleData.cars[item.dataValues.cars] = peopleData.cars[item.dataValues.cars] + 1;
				} else {
					peopleData.cars[item.dataValues.cars] = 1;
				}

				if(peopleData.childs[item.dataValues.childs]) {
					peopleData.childs[item.dataValues.childs] = peopleData.childs[item.dataValues.childs] + 1;
				} else {
					peopleData.childs[item.dataValues.childs] = 1;
				}
			});

			Service.findAll({
				attributes: ['people_id'],
			    where: {
			      service_id: serviceId,
			    },
			}).then((service) => {
				service.forEach(function(value, i, arr) {
					if(people[value.dataValues.people_id] != undefined) {
						if(serviceData.birthday[people[value.dataValues.people_id].birthday]) {
							serviceData.birthday[people[value.dataValues.people_id].birthday] = serviceData.birthday[people[value.dataValues.people_id].birthday] + 1;
						} else {
							serviceData.birthday[people[value.dataValues.people_id].birthday] = 1;
						}

						if(serviceData.city[people[value.dataValues.people_id].city]) {
							serviceData.city[people[value.dataValues.people_id].city] = serviceData.city[people[value.dataValues.people_id].city] + 1;
						} else {
							serviceData.city[people[value.dataValues.people_id].city] = 1;
						}

						if(serviceData.family[people[value.dataValues.people_id].family]) {
							serviceData.family[people[value.dataValues.people_id].family] = serviceData.family[people[value.dataValues.people_id].family] + 1;
						} else {
							serviceData.family[people[value.dataValues.people_id].family] = 1;
						}

						if(serviceData.job[people[value.dataValues.people_id].job]) {
							serviceData.job[people[value.dataValues.people_id].job] = serviceData.job[people[value.dataValues.people_id].job] + 1;
						} else {
							serviceData.job[people[value.dataValues.people_id].job] = 1;
						}

						if(serviceData.gender[people[value.dataValues.people_id].gender]) {
							serviceData.gender[people[value.dataValues.people_id].gender] = serviceData.gender[people[value.dataValues.people_id].gender] + 1;
						} else {
							serviceData.gender[people[value.dataValues.people_id].gender] = 1;
						}

						if(serviceData.license[people[value.dataValues.people_id].license]) {
							serviceData.license[people[value.dataValues.people_id].license] = serviceData.license[people[value.dataValues.people_id].license] + 1;
						} else {
							serviceData.license[people[value.dataValues.people_id].license] = 1;
						}

						if(serviceData.cars[people[value.dataValues.people_id].cars]) {
							serviceData.cars[people[value.dataValues.people_id].cars] = serviceData.cars[people[value.dataValues.people_id].cars] + 1;
						} else {
							serviceData.cars[people[value.dataValues.people_id].cars] = 1;
						}

						if(serviceData.childs[people[value.dataValues.people_id].childs]) {
							serviceData.childs[people[value.dataValues.people_id].childs] = serviceData.childs[people[value.dataValues.people_id].childs] + 1;
						} else {
							serviceData.childs[people[value.dataValues.people_id].childs] = 1;
						}
					}
				});

				res.json({ 
					success: true,
					result: { 
						peopleData: peopleData,
						serviceData: serviceData,
					},
				});
			})
		})

		// Service.findAll({
		// 	attributes: ['people_id'],
		// 	where: {
		// 		service_id: serviceId
		// 	}
		// })
		// .then(service => {
		// 	console.log(service.service);
		// })

	}
}

module.exports = api;