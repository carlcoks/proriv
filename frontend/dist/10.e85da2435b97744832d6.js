webpackJsonp([10],{492:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(599),r=s.n(a);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);var n=s(738);var l=function(t){s(728)},o=s(16)(r.a,n.a,!1,l,null,null);e.default=o.exports},599:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(s(10)),r=s(23),i=o(s(87)),n=o(s(730)),l=o(s(734));function o(t){return t&&t.__esModule?t:{default:t}}e.default={name:"user-rewards",metaInfo:function(){return{title:"Награды"}},asyncData:function(t){var e=t.store,s=t.route;return e.dispatch("rewards/getRewards",{user_id:s.params.id})},components:{ModalLayout:i.default,RewardList:n.default,AddReward:l.default},computed:(0,a.default)({},(0,r.mapState)("profile",["user_profile"]),(0,r.mapState)("user",["user"]),(0,r.mapState)("rewards",["rewards","addReward"])),methods:(0,a.default)({},(0,r.mapMutations)("rewards",["CHANGE_ADD_REWARD_MODAL"]))}},600:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["item"]}},601:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=d(s(5)),r=d(s(6)),i=d(s(10)),n=s(23),l=d(s(8)),o=d(s(87));function d(t){return t&&t.__esModule?t:{default:t}}e.default={components:{ModalLayout:o.default},data:function(){return{title:"",preview:"",desc:"",resp:{status:null,mess:""},percent:0,loading:!1}},computed:(0,i.default)({},(0,n.mapState)("user",["user"]),(0,n.mapState)("rewards",["addReward"])),watch:{preview:function(){this.resp.status=null,this.resp.mess=""}},methods:(0,i.default)({},(0,n.mapMutations)("rewards",["CHANGE_ADD_REWARD_MODAL"]),{close:function(){this.loading=!1,this.percent=0,this.title="",this.desc="",this.preview="",this.resp={status:null,mess:""},this.CHANGE_ADD_REWARD_MODAL({bg:!1,modal:!1})},deletePreview:function(){this.preview=""},changeUpload:function(t){var e=t.target.files[0],s=(new Image,this),a=new FileReader;a.onload=function(t){var a=t.target.result;s.preview={file:e,src:a}},a.readAsDataURL(e)},send:function(){var t=this;return(0,r.default)(a.default.mark(function e(){var s,r,i;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.resp={status:null,mess:""},""!=t.preview){e.next=5;break}return t.resp.status=!1,t.resp.mess="Вы не выбрали фотографию",e.abrupt("return",!1);case 5:if(""!=t.title){e.next=9;break}return t.resp.status=!1,t.resp.mess="Вы не ввели заголовок",e.abrupt("return",!1);case 9:return(s=new FormData).append("title",t.title),s.append("desc",t.desc),s.append("image",t.preview.file),e.prev=13,t.loading=!0,e.next=17,l.default.post("/api/v1/rewards",s,{headers:{Authorization:"Bearer "+t.user.token},params:{user_id:t.user.user_id},onUploadProgress:function(t){var e=parseInt(Math.round(100*t.loaded/t.total));return this.onProgress(e),e}.bind(t)});case 17:r=e.sent,t.resp.status=r.data.success,t.resp.mess=r.data.message,t.$store.dispatch("rewards/getRewards",{user_id:t.$route.params.id}),t.$store.dispatch("rewards/getRewardsMain",{user_id:t.$route.params.id}),setTimeout(function(){t.close()},2e3),e.next=29;break;case 25:e.prev=25,e.t0=e.catch(13),(i=e.t0.response)&&(t.resp.status=!1,t.resp.mess=i.data.message);case 29:case"end":return e.stop()}},e,t,[[13,25]])}))()},onProgress:function(t){this.percent=t}})}},728:function(t,e,s){var a=s(729);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(508)("aed77840",a,!0,{})},729:function(t,e,s){(t.exports=s(507)(!1)).push([t.i,".albums-page{max-width:940px;min-width:940px}",""])},730:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(600),r=s.n(a);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);var n=s(733);var l=function(t){s(731)},o=s(16)(r.a,n.a,!1,l,null,null);e.default=o.exports},731:function(t,e,s){var a=s(732);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(508)("fe9068fc",a,!0,{})},732:function(t,e,s){(t.exports=s(507)(!1)).push([t.i,"",""])},733:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"itemCard hover-desc"},[s("div",{staticClass:"itemCard-image"},[s("img",{staticClass:"img",attrs:{src:"/api/"+t.item.src+"/cover_"+t.item.image}})]),s("div",{staticClass:"itemCard-body"},[s("div",{staticClass:"itemCard-body__text"},[t._v("\n      "+t._s(t.item.title)+"\n    ")])]),s("div",{staticClass:"itemCard-description"},[t._v("\n    "+t._s(t.item.description)+"\n  ")])])},staticRenderFns:[]};e.a=a},734:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(601),r=s.n(a);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);var n=s(737);var l=function(t){s(735)},o=s(16)(r.a,n.a,!1,l,null,null);e.default=o.exports},735:function(t,e,s){var a=s(736);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(508)("3e8b46e8",a,!0,{})},736:function(t,e,s){(t.exports=s(507)(!1)).push([t.i,".add-album{max-width:570px;min-width:570px}",""])},737:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("modal-layout",{attrs:{bgShow:t.addReward.bg,modalShow:t.addReward.modal},on:{close:function(e){return t.close()}}},[s("div",{staticClass:"modalBlock add-album"},[s("div",{staticClass:"modalBlock-title"},[t._v("\n      Добавление награды\n    ")]),t.loading?s("div",{staticClass:"modalBlock-body"},[s("div",{staticClass:"modalBlock-body__loading"},[s("div",{staticClass:"modalBlock-body__loading-bar"},[s("div",{staticClass:"modalBlock-body__loading-bar__bg",style:"width: "+t.percent+"%"})]),s("div",{staticClass:"modalBlock-body__loading-text"},[null==t.resp.status?s("span",[t._v("\n            Дождитесь загрузки\n          ")]):s("span",{staticClass:"res-mess",class:1==t.resp.status?"success":"error"},[t._v("\n            "+t._s(t.resp.mess)+"\n          ")])])])]):s("div",[s("div",{staticClass:"modalBlock-form normal-form"},[s("div",{staticClass:"modalBlock-form__line"},[s("label",{staticClass:"label"},[t._v("\n            Фотография награды\n          ")]),t.preview?s("div",{staticClass:"modalBlock-form__line-imglist"},[s("div",{staticClass:"modalBlock-form__line-imglist__item"},[s("a",{staticClass:"delete",attrs:{href:"/delete"},on:{click:function(e){return e.preventDefault(),t.deletePreview()}}},[s("img",{attrs:{src:"/img/icons/closedel.png"}})]),s("label",{attrs:{for:"item"}},[s("div",{staticClass:"modalBlock-form__line-imglist__item-img",style:"background-image: url("+t.preview.src+")"})])])]):s("div",{staticClass:"modalBlock-form__line-input"},[s("label",{staticClass:"btn addNew",attrs:{for:"uploadReward"}},[s("input",{attrs:{type:"file",id:"uploadReward",accept:".jpg, .jpeg, .png"},on:{change:t.changeUpload}}),t._v("\n              Зарузить фото\n            ")])])]),s("div",{staticClass:"modalBlock-form__line"},[s("label",{staticClass:"label",attrs:{for:"title"}},[t._v("\n            Заголовок награды\n          ")]),s("div",{staticClass:"modalBlock-form__line-input"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.title,expression:"title",modifiers:{trim:!0}}],staticClass:"textarea",attrs:{rows:"2",id:"title"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),s("div",{staticClass:"modalBlock-form__line"},[s("label",{staticClass:"label",attrs:{for:"desc"}},[t._v("\n            Подробнее о награде\n          ")]),s("div",{staticClass:"modalBlock-form__line-input"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.desc,expression:"desc",modifiers:{trim:!0}}],staticClass:"textarea",attrs:{rows:"6",id:"desc"},domProps:{value:t.desc},on:{input:function(e){e.target.composing||(t.desc=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])]),s("div",{staticClass:"modalBlock-btn twoBtns"},[s("button",{staticClass:"btn addNew",on:{click:function(e){return t.close()}}},[t._v("\n          Отмена\n        ")]),s("button",{staticClass:"btn send",on:{click:function(e){return t.send()}}},[t._v("\n          Сохранить\n        ")]),null!=t.resp.status?s("span",{staticClass:"res-mess",class:1==t.resp.status?"success":"error"},[t._v("\n          "+t._s(t.resp.mess)+"\n        ")]):t._e()])])])])},staticRenderFns:[]};e.a=a},738:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.addReward.modal?t._e():s("modal-layout",{attrs:{bgShow:!0,modalShow:!0},on:{close:function(e){return t.$router.push("/user/"+t.$route.params.id)}}},[s("div",{staticClass:"modalBlock albums-page"},[s("div",{staticClass:"modalBlock-title"},[t._v("\n        Награды\n      ")]),s("div",{staticClass:"modalBlock-cards"},[t.user_profile.id==t.user.user_id?s("a",{staticClass:"itemCard addCard",attrs:{href:"/add"},on:{click:function(e){return e.preventDefault(),t.CHANGE_ADD_REWARD_MODAL({bg:!0,modal:!0})}}},[s("div",{staticClass:"addBtn"},[s("img",{attrs:{src:"/img/icons/bigplus.png"}})]),s("div",{staticClass:"addText"},[t._v("\n            Добавить награду\n          ")])]):t._e(),t._l(t.rewards,function(t,e){return s("reward-list",{key:e,attrs:{item:t}})})],2)])]),t.user_profile.id==t.user.user_id?s("add-reward"):t._e()],1)},staticRenderFns:[]};e.a=a}});