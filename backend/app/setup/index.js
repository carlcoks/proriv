const UsersModel = require('../../models').users;
const PeoplesModel = require('../../models').peoples;
const ServiceModel = require('../../models').service;
const VectorsModel = require('../../models').vectors;

const models = {
  Users: UsersModel,
  Peoples: PeoplesModel,
  Service: ServiceModel,
  Vectors: VectorsModel,
}
module.exports = models;
