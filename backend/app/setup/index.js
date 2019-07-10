const UserModel = require('../../models').user;
const UserInfoModel = require('../../models').user_info;
const UserStatusModel = require('../../models').user_status;
const UserResumeModel = require('../../models').user_resume;
const UserAlbumsModel = require('../../models').user_albums;
const UserPhotosModel = require('../../models').user_photos;

const PhotoCommentsModel = require('../../models').photo_comments;

const UserDialogsModel = require('../../models').user_dialogs;
const UserMessagesModel = require('../../models').user_messages;
const UserToDialogModel = require('../../models').user_to_dialog;

const GeoCityModel = require('../../models').geo_city;
const GeoCountryModel = require('../../models').geo_country;
const SportTypeModel = require('../../models').sport_type;

const models = {
  User: UserModel,
  UserInfo: UserInfoModel,
  UserStatus: UserStatusModel,
  UserResume: UserResumeModel,
  UserAlbums: UserAlbumsModel,
  UserPhotos: UserPhotosModel,
  PhotoComments: PhotoCommentsModel,
  UserDialogs: UserDialogsModel,
  UserMessages: UserMessagesModel,
  UserToDialog: UserToDialogModel,
  GeoCity: GeoCityModel,
  GeoCountry: GeoCountryModel,
  SportType: SportTypeModel
}
module.exports = models;
