webpackJsonp([8],{495:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(605),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);var r=s(760);var l=function(t){s(750)},u=s(16)(n.a,r.a,!1,l,null,null);e.default=u.exports},605:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l(s(10)),n=s(23),a=l(s(752)),r=l(s(756));function l(t){return t&&t.__esModule?t:{default:t}}e.default={initialMutations:["lenta/RESET_LENTA"],asyncData:function(t){var e=t.store,s=t.route;return e.dispatch("lenta/getLenta",{user_id:s.params.id})},components:{AddNew:a.default,ListItem:r.default},computed:(0,i.default)({},(0,n.mapState)("lenta",["lenta"]),(0,n.mapState)("user",["user"]),(0,n.mapState)("profile",["user_profile"])),methods:(0,i.default)({},(0,n.mapActions)("lenta",["deleteInLenta"]),{deleteItem:function(t,e){this.deleteInLenta({id:e})}})}},606:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(s(10)),n=s(23),a=r(s(197));function r(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{text:"",previews:[],resp:{status:null,mess:""}}},watch:{text:function(){this.resp.status=null,this.resp.mess=""},previews:function(){this.resp.status=null,this.resp.mess=""}},computed:(0,i.default)({},(0,n.mapState)("profile",["user_profile"]),(0,n.mapState)("user",["user"])),methods:(0,i.default)({},(0,n.mapActions)("lenta",["addItem"]),{returnAvatar:function(){var t=this.user_profile,e="",s="";return t.user_profile&&(e=t.user_profile.src,s=t.user_profile.image),a.default.returnAvatarMini(t.gender,e,s)},uploadFiles:function(t){var e=["mpg","mpeg","mp4","mov","avi"],s=t.target.files;if(this.previews.length+s.length>8)return this.resp.status=!1,this.resp.mess="Не более 8 фотографий",!1;for(var i=0;i<s.length;i++){var n=s[i],a=n.name.split(".").pop(),r="image";e.indexOf(a)>-1&&(r="video"),this.previews.push({file:n,type:r,src:URL.createObjectURL(n)})}},deletePreview:function(t){this.previews.splice(t,1)},send:function(){if(""==this.text&&0==this.previews.length)return this.resp.status=!1,this.resp.mess="",!1;var t=1,e=new FormData;e.append("text",this.text),this.previews.length>0&&(e.append("length",this.previews.length),this.previews.map(function(t,s){e.append("img"+s+"_"+t.type,t.file)}),t=0),e.append("justtext",t),this.addItem(e),this.text="",this.previews=[]}})}},607:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=s(197),a=(i=n)&&i.__esModule?i:{default:i};e.default={props:["item","admin","profile","lengthFiles"],data:function(){return{showEdit:!1}},methods:{returnAvatar:function(){var t=this.profile,e=void 0,s=void 0;return t.user_info&&(e=t.user_info.src,s=t.user_info.image),a.default.returnAvatarMini(t.gender,e,s)},returnDate:function(t){var e=new Date(t),s=e.getDate();s=s<10?"0"+s:s;var i=e.getMonth()+1;i=i<10?"0"+i:i;var n=e.getFullYear(),a=e.getHours();a=a<10?"0"+a:a;var r=e.getMinutes();return s+"."+i+"."+n+" "+a+":"+(r=r<10?"0"+r:r)},returnImg:function(t,e){var s="";return 1==this.lengthFiles?s="big_":2==this.lengthFiles?s="same_":3==this.lengthFiles?s="small_":4==this.lengthFiles?s="same_":5!=this.lengthFiles||3!=e&&4!=e?5==this.lengthFiles?s="small_":6==this.lengthFiles?s="small_":7!=this.lengthFiles||4!=e&&5!=e&&6!=e?7==this.lengthFiles?s="mini_":8==this.lengthFiles&&(s="mini_"):s="small_":s="same_","/api/"+this.item.src+"/"+t.src+"/"+s+t.image},returnClass:function(t){return 1==this.lengthFiles?"itemOne":2==this.lengthFiles?"itemTwo":3==this.lengthFiles?"itemThree":4==this.lengthFiles?"itemTwo":5!=this.lengthFiles||3!=t&&4!=t?5==this.lengthFiles?"itemThree":6==this.lengthFiles?"itemThree":7!=this.lengthFiles||4!=t&&5!=t&&6!=t?7==this.lengthFiles?"itemFour":8==this.lengthFiles?"itemFour":void 0:"itemThree":"itemTwo"}}}},750:function(t,e,s){var i=s(751);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s(508)("187c9127",i,!0,{})},751:function(t,e,s){(t.exports=s(507)(!1)).push([t.i,"",""])},752:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(606),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);var r=s(755);var l=function(t){s(753)},u=s(16)(n.a,r.a,!1,l,null,null);e.default=u.exports},753:function(t,e,s){var i=s(754);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s(508)("50d7345c",i,!0,{})},754:function(t,e,s){(t.exports=s(507)(!1)).push([t.i,"",""])},755:function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.user.user_id==t.user_profile.id?s("div",{staticClass:"lenta-add"},[s("div",{staticClass:"lenta-add__form"},[s("div",{staticClass:"user"},[s("img",{staticClass:"user-img",attrs:{src:t.returnAvatar()}})]),s("div",{staticClass:"form"},[s("div",{staticClass:"form-input"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.text,expression:"text",modifiers:{trim:!0}}],staticClass:"inpt",attrs:{type:"text",placeholder:"Введите ваше сообщение"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s("label",{staticClass:"btn addfile"},[s("input",{attrs:{type:"file",multiple:"",accept:"image/*"},on:{change:t.uploadFiles}}),s("img",{attrs:{src:"/img/icons/skrepka.png"}})])])]),s("div",{staticClass:"btns"},[s("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.send()}}},[s("img",{attrs:{src:"/img/icons/send.png"}})])])]),s("div",{staticClass:"lenta-add__previews"},[t._l(t.previews,function(e,i){return s("div",{key:i,staticClass:"lenta-add__previews-item"},[s("a",{staticClass:"delete",attrs:{href:"/delete",title:"Удалить"},on:{click:function(e){return e.preventDefault(),t.deletePreview(i)}}},[s("img",{attrs:{src:"/img/icons/closedel.png"}})]),"image"==e.type?s("div",{staticClass:"lenta-add__previews-item__img",style:"background-image: url("+e.src+")"}):s("div",{staticClass:"lenta-add__previews-item__img"},[s("video",{attrs:{src:""+e.src}})])])}),null!=t.resp.status?s("span",{staticClass:"error-mess",class:1==t.resp.status?"success":"error"},[t._v("\n      "+t._s(t.resp.mess)+"\n    ")]):t._e()],2)]):t._e()},staticRenderFns:[]};e.a=i},756:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(607),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);var r=s(759);var l=function(t){s(757)},u=s(16)(n.a,r.a,!1,l,null,null);e.default=u.exports},757:function(t,e,s){var i=s(758);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s(508)("1f80abba",i,!0,{})},758:function(t,e,s){(t.exports=s(507)(!1)).push([t.i,"",""])},759:function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"lenta-list__item"},[s("div",{staticClass:"item-top"},[s("div",{staticClass:"item-top__user"},[s("img",{staticClass:"image",attrs:{src:t.returnAvatar()}}),s("div",{staticClass:"info"},[s("div",{staticClass:"info-name"},[t._v("\n          "+t._s(t.profile.firstname)+" "+t._s(t.profile.lastname)+"\n        ")]),s("div",{staticClass:"info-date"},[t._v("\n          "+t._s(t.returnDate(t.item.date_created))+"\n        ")])])]),t.admin?s("div",{staticClass:"item-top__edit",on:{mouseleave:function(e){t.showEdit=!1}}},[s("button",{staticClass:"btn",on:{click:function(e){e.preventDefault(),t.showEdit=!0}}},[s("img",{attrs:{src:"/img/icons/lentaedit.png"}})]),s("transition",{attrs:{name:"slideTopBlock"}},[t.showEdit?s("div",{staticClass:"edit-list"},[s("div",{staticClass:"edit-list__item",on:{click:function(e){return e.preventDefault(),t.$emit("delete")}}},[s("img",{attrs:{src:"/img/icons/delete_d.png"}}),s("span",[t._v("\n              Удалить\n            ")])])]):t._e()])],1):t._e()]),s("div",{staticClass:"content"},[s("div",{staticClass:"content-text"},[t._v(t._s(t.item.text))]),s("div",{staticClass:"content-files"},t._l(t.item.lenta_files,function(e,i){return s("div",{key:i,staticClass:"content-files__item",class:t.returnClass(i)},[s("img",{attrs:{src:t.returnImg(e,i)}})])}),0)])])},staticRenderFns:[]};e.a=i},760:function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"lenta"},[s("add-new"),s("div",{staticClass:"lenta-list"},t._l(t.lenta,function(e,i){return s("list-item",{key:i,attrs:{item:e,admin:t.user.user_id==t.user_profile.id,profile:t.user_profile,lengthFiles:e.lenta_files.length},on:{delete:function(s){return t.deleteItem(s,e.id)}}})}),1)],1)},staticRenderFns:[]};e.a=i}});