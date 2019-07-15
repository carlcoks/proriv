const UserModel = require('../../models').user;
const UserInfoModel = require('../../models').user_info;
const UserStatusModel = require('../../models').user_status;
const UserFreeModel = require('../../models').user_free;
const UserBookmarksModel = require('../../models').user_bookmarks;

const UserResumeModel = require('../../models').user_resume;
const UserGoalsModel = require('../../models').user_goals;
const UserLentaModel = require('../../models').user_lenta;
const LentaFilesModel = require('../../models').lenta_files;
const UserVideokursiModel = require('../../models').user_videokursi;

const UserRewardsModel = require('../../models').user_rewards;

const UserAlbumsModel = require('../../models').user_albums;
const UserPhotosModel = require('../../models').user_photos;
const PhotoCommentsModel = require('../../models').photo_comments;

const UserVideosModel = require('../../models').user_videos;

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
  UserFree: UserFreeModel,
  UserBookmarks: UserBookmarksModel,
  UserResume: UserResumeModel,
  UserGoals: UserGoalsModel,
  UserLenta: UserLentaModel,
  LentaFiles: LentaFilesModel,
  UserVideokursi: UserVideokursiModel,
  UserRewards: UserRewardsModel,
  UserAlbums: UserAlbumsModel,
  UserPhotos: UserPhotosModel,
  PhotoComments: PhotoCommentsModel,
  UserVideos: UserVideosModel,
  UserDialogs: UserDialogsModel,
  UserMessages: UserMessagesModel,
  UserToDialog: UserToDialogModel,
  GeoCity: GeoCityModel,
  GeoCountry: GeoCountryModel,
  SportType: SportTypeModel
}
module.exports = models;
