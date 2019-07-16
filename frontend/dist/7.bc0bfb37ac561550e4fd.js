webpackJsonp([7],{464:function(e,t,i){"use strict";function o(e){i(686)}Object.defineProperty(t,"__esModule",{value:!0});var a=i(567),s=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,function(){return a[e]})}(r);var n=i(696),l=i(18),d=o,c=l(s.a,n.a,!1,d,null,null);t.default=c.exports},481:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={checkNumber:function(e){return e.keyCode>47&&e.keyCode<58||e.keyCode>95&&e.keyCode<106||8==e.keyCode||46==e.keyCode||37==e.keyCode||39==e.keyCode||(e.preventDefault(),!1)},isValidUrl:function(e){return/http(s?):\/\/[-\w\.]{3,}\.[A-Za-z]{2,3}/.test(e)},returnVideoBlock:function(e,t){if(e.indexOf("youtube.com")>-1||e.indexOf("youtu.be")>-1){var i="",o=e.split("?");return o.length>1?o.map(function(e){0==e.indexOf("v=")&&(i=e.replace("v=",""))}):i=e.split("/").pop(),"small"==t?'<div class="image" style="background-image: url(https://img.youtube.com/vi/'+i+'/mqdefault.jpg)"></div>':'<div class="image" style="background-image: url(https://img.youtube.com/vi/'+i+'/hqdefault.jpg)"></div>'}},returnVideoLink:function(e){if(e.indexOf("youtube.com")>-1||e.indexOf("youtu.be")>-1){var t="",i=e.split("?");return i.length>1?i.map(function(e){0==e.indexOf("v=")&&(t=e.replace("v=",""))}):t=e.split("/").pop(),"https://www.youtube.com/embed/"+t+"?rel=0&showinfo=0"}return e}}},567:function(e,t,i){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(12),s=o(a),r=i(21),n=i(86),l=o(n),d=i(688),c=o(d),u=i(692),p=o(u);t.default={name:"user-alboms",metaInfo:function(){return{title:"Видео"}},asyncData:function(e){var t=e.store,i=e.route;return t.dispatch("videos/getVideos",{user_id:i.params.id})},components:{ModalLayout:l.default,AddVideo:p.default,VideoList:c.default},computed:(0,s.default)({},(0,r.mapState)("profile",["user_profile"]),(0,r.mapState)("user",["user"]),(0,r.mapState)("videos",["videos","addVideo"])),methods:(0,s.default)({},(0,r.mapMutations)("videos",["CHANGE_ADD_VIDEO_MODAL"]))}},568:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(481),a=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default={props:["link","item"],methods:{returnBlock:function(e){return a.default.returnVideoBlock(e,"small")}}}},569:function(e,t,i){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(7),s=o(a),r=i(8),n=o(r),l=i(12),d=o(l),c=i(21),u=i(481),p=o(u),m=i(86),f=o(m);t.default={components:{ModalLayout:f.default},data:function(){return{title:"",video:"",link:"",resp:{status:null,mess:""},percent:0,loading:!1,errors:{title:"",video:"",link:""}}},computed:(0,d.default)({},(0,c.mapState)("user",["user"]),(0,c.mapState)("videos",["addVideo"])),watch:{title:function(){this.errors.title=""},link:function(){this.errors.video="",this.errors.link=""},previews:function(){this.resp.status=null,this.resp.mess=""}},methods:(0,d.default)({},(0,c.mapActions)("videos",["addNewVideo"]),(0,c.mapMutations)("videos",["CHANGE_ADD_VIDEO_MODAL"]),{close:function(){this.loading=!1,this.percent=0,this.title="",this.video="",this.link="",this.resp={status:null,mess:""},this.errors={title:"",video:"",link:""},this.CHANGE_ADD_VIDEO_MODAL({bg:!1,modal:!1})},uploadVideo:function(e){this.errors.video="";var t=e.target.files[0];this.video={file:t,src:URL.createObjectURL(t)}},deletePreview:function(){this.video=""},send:function(){var e=this;return(0,n.default)(s.default.mark(function t(){var i,o;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.resp={status:null,mess:""},""!=e.title){t.next=4;break}return e.errors.title="Введите заголовок",t.abrupt("return",!1);case 4:if(""!=e.video||""!=e.link){t.next=7;break}return e.errors.video="Выберите видео или вставьте ссылку",t.abrupt("return",!1);case 7:if(""==e.link){t.next=16;break}if(!p.default.isValidUrl(e.link)){t.next=14;break}if(-1!=e.link.indexOf("youtube.com")||-1!=e.link.indexOf("youtu.be")){t.next=12;break}return e.errors.link="Некорректная ссылка",t.abrupt("return",!1);case 12:t.next=16;break;case 14:return e.errors.link="Некорректная ссылка",t.abrupt("return",!1);case 16:return i=new FormData,i.append("title",e.title),""!=e.video?i.append("file",e.video.file):""!=e.link&&i.append("link",e.link),e.loading=!0,t.next=22,e.addNewVideo({data:i,onProgress:e.onProgress});case 22:o=t.sent,e.$store.dispatch("videos/getVideosMain",{user_id:e.$route.params.id}),e.resp.status=o.success,e.resp.mess=o.message,o.success&&setTimeout(function(){e.close()},2e3);case 27:case"end":return t.stop()}},t,e)}))()},onProgress:function(e){this.percent=e}})}},686:function(e,t,i){var o=i(687);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(455)("60b5c5bb",o,!0,{})},687:function(e,t,i){t=e.exports=i(454)(!1),t.push([e.i,".video-page{max-width:970px;min-width:970px}.video-page__video{width:100%;border-radius:5px 5px 0 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;min-height:500px}.video-page__video .iframe{border-radius:5px 5px 0 0;width:100%;height:500px}.video-page__video .video{border-radius:5px 5px 0 0;width:100%;height:100%}.video-page__about{width:100%;padding:35px 70px 35px 30px}.video-page__about .user-info{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:20px}.video-page__about .user-info .image{width:40px;height:40px;border-radius:50%}.video-page__about .user-info__block{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;margin-left:10px}.video-page__about .user-info__block-name{margin-bottom:5px;color:#000}.video-page__about .user-info__block-date{font-size:.75rem;color:#9e9e9e}.video-page__about .about-info{width:100%;position:relative}.video-page__about .about-info__text{line-height:25px;color:#000}.video-page__about .about-info__text .description{font-family:Ubuntu,sans-serif;font-size:.85rem;font-style:italic;color:#b3b3b3}.video-page__about .about-info__edit{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.video-page__about .about-info__edit-textarea{width:100%;padding:10px 15px;border-radius:5px;-webkit-box-shadow:0 5px 8px 2px rgba(0,4,7,.03);box-shadow:0 5px 8px 2px rgba(0,4,7,.03);border:1px solid #e9e9e9;color:#000;margin-bottom:20px;-webkit-transition:all .3s;transition:all .3s;resize:none}.video-page__about .about-info__edit-textarea:focus{border:1px solid #000}.video-page__about .about-info__edit-btns{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.video-page__about .about-info__edit-btns .btn{margin-left:30px}.video-page__about .about-info .edit{position:absolute;top:0;right:-30px}.video-page__comments-list{background:#f9f9f9;width:100%;padding:10px 30px;border-top:1px solid #eee;border-bottom:1px solid #eee}.video-page__comments-list .commentsItem{width:100%;border-bottom:1px solid #eee;padding:20px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.video-page__comments-list .commentsItem-avatar{margin-right:10px;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto}.video-page__comments-list .commentsItem-avatar .image{width:40px;height:40px;border-radius:50%}.video-page__comments-list .commentsItem-comment{width:100%;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;padding-top:5px}.video-page__comments-list .commentsItem-comment__name{font-size:.75rem;color:#b3b3b3;margin-bottom:5px}.video-page__comments-list .commentsItem-comment__name .date{margin-left:30px}.video-page__comments-list .commentsItem-comment__text{width:100%;color:#000}.video-page__comments-list .commentsItem:last-child{border-bottom:none}.video-page__comments-form{width:100%;padding:35px 100px 20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.video-page__comments-form .inpt{width:100%;padding:10px 15px;border-radius:5px;-webkit-box-shadow:0 5px 8px 2px rgba(0,4,7,.03);box-shadow:0 5px 8px 2px rgba(0,4,7,.03);border:1px solid #e9e9e9;color:#000;font-size:.85rem;-webkit-transition:all .3s;transition:all .3s}.video-page__comments-form .inpt:focus{border:1px solid #000}.video-page__comments-form .btn{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;margin-left:30px}",""])},688:function(e,t,i){"use strict";function o(e){i(689)}Object.defineProperty(t,"__esModule",{value:!0});var a=i(568),s=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,function(){return a[e]})}(r);var n=i(691),l=i(18),d=o,c=l(s.a,n.a,!1,d,null,null);t.default=c.exports},689:function(e,t,i){var o=i(690);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(455)("d2fe5628",o,!0,{})},690:function(e,t,i){t=e.exports=i(454)(!1),t.push([e.i,"",""])},691:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("router-link",{staticClass:"itemCard",attrs:{to:""+e.link}},[i("div",{staticClass:"itemCard-video"},[e.item.src&&e.item.video?i("video",{staticClass:"video",attrs:{src:"/api/"+e.item.src+"/"+e.item.video,preload:"auto",muted:"muted"},domProps:{muted:!0}}):i("div",{staticClass:"itemCard-video__cover",domProps:{innerHTML:e._s(e.returnBlock(e.item.link))}}),i("span",{staticClass:"play"},[i("img",{attrs:{src:"/img/icons/video-play.png"}})])]),i("div",{staticClass:"itemCard-body"},[i("div",{staticClass:"itemCard-body__text"},[e._v("\n      "+e._s(e.item.title)+"\n    ")])])])},a=[],s={render:o,staticRenderFns:a};t.a=s},692:function(e,t,i){"use strict";function o(e){i(693)}Object.defineProperty(t,"__esModule",{value:!0});var a=i(569),s=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,function(){return a[e]})}(r);var n=i(695),l=i(18),d=o,c=l(s.a,n.a,!1,d,null,null);t.default=c.exports},693:function(e,t,i){var o=i(694);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(455)("5287006c",o,!0,{})},694:function(e,t,i){t=e.exports=i(454)(!1),t.push([e.i,'.add-video{max-width:570px;min-width:570px}.add-video .modalBlock-form__half{display:-webkit-box;display:-ms-flexbox;display:flex}.add-video .modalBlock-form__half .modalBlock-form__line{width:55%;position:relative}.add-video .modalBlock-form__half .modalBlock-form__line:first-child{width:45%}.add-video .modalBlock-form__half .modalBlock-form__line:first-child:after{content:"\\438\\43B\\438";position:absolute;right:30px;top:30px;bottom:0;margin:auto;font-size:.75rem;color:#818181}.add-video .cover{position:relative;width:90px;height:70px;border-radius:5px;background-repeat:no-repeat;background-size:cover;background-position:50%}.add-video .cover .delete{position:absolute;top:0;right:-12px}.add-video .cover .video{overflow:hidden;width:100%;height:100%;border-radius:5px}.add-video .cover .video video{width:auto;height:auto;max-height:100%}',""])},695:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("modal-layout",{attrs:{bgShow:e.addVideo.bg,modalShow:e.addVideo.modal},on:{close:function(t){return e.close()}}},[i("div",{staticClass:"modalBlock add-video"},[i("div",{staticClass:"modalBlock-title"},[e._v("\n      Добавление видео\n    ")]),e.loading?i("div",{staticClass:"modalBlock-body"},[i("div",{staticClass:"modalBlock-body__loading"},[i("div",{staticClass:"modalBlock-body__loading-bar"},[i("div",{staticClass:"modalBlock-body__loading-bar__bg",style:"width: "+e.percent+"%"})]),i("div",{staticClass:"modalBlock-body__loading-text"},[null==e.resp.status?i("span",[e._v("\n            Дождитесь загрузки\n          ")]):i("span",{staticClass:"res-mess",class:1==e.resp.status?"success":"error"},[e._v("\n            "+e._s(e.resp.mess)+"\n          ")])])])]):i("div",[i("div",{staticClass:"modalBlock-form normal-form"},[i("div",{staticClass:"modalBlock-form__line"},[i("label",{staticClass:"label",attrs:{for:"title"}},[e._v("\n            Заголовок\n          ")]),i("div",{staticClass:"modalBlock-form__line-input"},[i("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.title,expression:"title",modifiers:{trim:!0}}],staticClass:"textarea",attrs:{col:"2",placeholder:"Введите заголовок"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.errors.title?i("span",{staticClass:"error-mess"},[e._v("\n              "+e._s(e.errors.title)+"\n            ")]):e._e()])]),i("div",{staticClass:"modalBlock-form__half"},[i("div",{staticClass:"modalBlock-form__line"},[i("label",{staticClass:"label",attrs:{for:""}},[e._v("\n            Загрузка\n          ")]),e.video?i("div",{staticClass:"modalBlock-form__line-input"},[i("div",{staticClass:"cover"},[i("a",{staticClass:"delete",attrs:{href:"/delete"},on:{click:function(t){return t.preventDefault(),e.deletePreview()}}},[i("img",{attrs:{src:"/img/icons/closedel.png"}})]),i("div",{staticClass:"video"},[i("video",{attrs:{src:""+e.video.src}})])])]):i("div",{staticClass:"modalBlock-form__line-input"},[i("label",{staticClass:"btn addNew",class:""!=e.link?"disabled":"",attrs:{for:"uploadVideo"}},[i("input",{attrs:{type:"file",id:"uploadVideo",accept:"video/*",disabled:""!=e.link},on:{change:e.uploadVideo}}),e._v("\n              Загрузить видео\n            ")]),e.errors.video?i("span",{staticClass:"error-mess"},[e._v("\n              "+e._s(e.errors.video)+"\n            ")]):e._e()])]),i("div",{staticClass:"modalBlock-form__line"},[i("label",{staticClass:"label",attrs:{for:"link"}},[e._v("\n              Вставьте ссылку на видео\n            ")]),i("div",{staticClass:"modalBlock-form__line-input"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.link,expression:"link",modifiers:{trim:!0}}],staticClass:"inpt",attrs:{type:"text",id:"link",disabled:""!=e.video,placeholder:"Ссылка на видео"},domProps:{value:e.link},on:{input:function(t){t.target.composing||(e.link=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.errors.link?i("span",{staticClass:"error-mess"},[e._v("\n                "+e._s(e.errors.link)+"\n              ")]):e._e()])])])]),i("div",{staticClass:"modalBlock-btn twoBtns"},[i("button",{staticClass:"btn addNew",on:{click:function(t){return e.close()}}},[e._v("\n          Отменить\n        ")]),i("button",{staticClass:"btn send",on:{click:function(t){return e.send()}}},[e._v("\n          Сохранить\n        ")]),null!=e.resp.status?i("span",{staticClass:"res-mess",class:1==e.resp.status?"success":"error"},[e._v("\n          "+e._s(e.resp.mess)+"\n        ")]):e._e()])])])])},a=[],s={render:o,staticRenderFns:a};t.a=s},696:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.addVideo.modal?e._e():i("modal-layout",{attrs:{bgShow:!0,modalShow:!0},on:{close:function(t){return e.$router.push("/user/"+e.$route.params.id)}}},[i("div",{staticClass:"modalBlock video-page"},[i("div",{staticClass:"modalBlock-title"},[e._v("\n        Видео\n      ")]),i("div",{staticClass:"modalBlock-cards"},[e.user_profile.id==e.user.user_id?i("a",{staticClass:"itemCard addCard",attrs:{href:"/add"},on:{click:function(t){return t.preventDefault(),e.CHANGE_ADD_VIDEO_MODAL({bg:!0,modal:!0})}}},[i("div",{staticClass:"addBtn"},[i("img",{attrs:{src:"/img/icons/bigplus.png"}})]),i("div",{staticClass:"addText"},[e._v("\n            Добавить видео\n          ")])]):e._e(),e._l(e.videos,function(t,o){return i("video-list",{key:o,attrs:{item:t,link:e.$route.path+"/"+t.id}})})],2)])]),e.user_profile.id==e.user.user_id?i("add-video"):e._e()],1)},a=[],s={render:o,staticRenderFns:a};t.a=s}});