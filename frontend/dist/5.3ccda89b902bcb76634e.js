webpackJsonp([5],{450:function(t,e,a){"use strict";function s(t){a(601)}Object.defineProperty(e,"__esModule",{value:!0});var r=a(491),i=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,function(){return r[t]})}(n);var u=a(607),l=a(16),o=s,c=l(i.a,u.a,!1,o,null,null);e.default=c.exports},491:function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=a(8),i=s(r),n=a(20),u=a(86),l=s(u),o=a(603),c=s(o);e.default={name:"user-album",asyncData:function(t){var e=t.store,a=t.route;return e.dispatch("albums/getAlbum",{user_id:a.params.id,album_id:a.params.album})},components:{ModalLayout:l.default,PhotoList:c.default},computed:(0,i.default)({},(0,n.mapState)("profile",["user_profile"]),(0,n.mapState)("user",["user"]),(0,n.mapState)("albums",["single"]))}},492:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["link","item"]}},601:function(t,e,a){var s=a(602);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(445)("52e1f0d3",s,!0,{})},602:function(t,e,a){e=t.exports=a(444)(!1),e.push([t.i,".albums-page{max-width:940px;min-width:940px}",""])},603:function(t,e,a){"use strict";function s(t){a(604)}Object.defineProperty(e,"__esModule",{value:!0});var r=a(492),i=a.n(r);for(var n in r)"default"!==n&&function(t){a.d(e,t,function(){return r[t]})}(n);var u=a(606),l=a(16),o=s,c=l(i.a,u.a,!1,o,null,null);e.default=c.exports},604:function(t,e,a){var s=a(605);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(445)("0e7d3c1a",s,!0,{})},605:function(t,e,a){e=t.exports=a(444)(!1),e.push([t.i,"",""])},606:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{staticClass:"itemCard",attrs:{to:""+t.link}},[a("div",{staticClass:"itemCard-image"},[a("img",{staticClass:"img",attrs:{src:"/api/"+t.item.src+"/cover_"+t.item.image}})])])},r=[],i={render:s,staticRenderFns:r};e.a=i},607:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.single?a("div",[a("modal-layout",{attrs:{bgShow:!0,modalShow:!0},on:{close:function(e){return t.$router.push("/user/"+t.$route.params.id+"/albums")}}},[a("div",{staticClass:"modalBlock albums-page"},[a("div",{staticClass:"modalBlock-title"},[a("div",{staticClass:"abs-left"},[a("button",{staticClass:"btn addNew",on:{click:function(e){return t.$router.push("/user/"+t.$route.params.id+"/albums")}}},[a("img",{attrs:{src:"/img/icons/arrow-back.png"}}),t._v("\n            Альбомы\n          ")])]),t._v("\n        "+t._s(t.single[0].user_album.title)+"\n      ")]),a("div",{staticClass:"modalBlock-cards"},[t.user_profile.id==t.user.user_id?a("a",{staticClass:"itemCard addCard",attrs:{href:"/add"},on:{click:function(t){t.preventDefault()}}},[a("div",{staticClass:"addBtn"},[a("img",{attrs:{src:"/img/icons/bigplus.png"}})]),a("div",{staticClass:"addText"},[t._v("\n            Добавить фото\n          ")])]):t._e(),t._l(t.single,function(e,s){return a("photo-list",{key:s,attrs:{item:e,link:"/user/"+t.$route.params.id+"/photos/"+e.id}})})],2)])])],1):t._e()},r=[],i={render:s,staticRenderFns:r};e.a=i}});