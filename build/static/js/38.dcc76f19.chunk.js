(this["webpackJsonpstudent-scheduler"]=this["webpackJsonpstudent-scheduler"]||[]).push([[38],{182:function(t,n,e){"use strict";e.d(n,"b",(function(){return c})),e.d(n,"a",(function(){return a}));var c="https://meet.appui.io:8443",a={GRANT_TYPE:"client_credentials",CLIENT_ID:"1095225836707-p73rgbikb2dbniu8pjdgso14slpir3nf.apps.googleusercontent.com",CLIENT_SECRET:"QBkD6wvItNsLttKtucXjWV1V"}},183:function(t,n,e){"use strict";e.d(n,"C",(function(){return o})),e.d(n,"B",(function(){return u})),e.d(n,"u",(function(){return i})),e.d(n,"F",(function(){return l})),e.d(n,"w",(function(){return s})),e.d(n,"v",(function(){return f})),e.d(n,"t",(function(){return d})),e.d(n,"D",(function(){return h})),e.d(n,"E",(function(){return g})),e.d(n,"y",(function(){return m})),e.d(n,"A",(function(){return p})),e.d(n,"o",(function(){return b})),e.d(n,"m",(function(){return E})),e.d(n,"n",(function(){return N})),e.d(n,"p",(function(){return v})),e.d(n,"q",(function(){return y})),e.d(n,"x",(function(){return k})),e.d(n,"s",(function(){return D})),e.d(n,"z",(function(){return w})),e.d(n,"h",(function(){return j})),e.d(n,"b",(function(){return z})),e.d(n,"a",(function(){return S})),e.d(n,"c",(function(){return x})),e.d(n,"k",(function(){return C})),e.d(n,"r",(function(){return I})),e.d(n,"l",(function(){return O})),e.d(n,"g",(function(){return T})),e.d(n,"i",(function(){return _})),e.d(n,"j",(function(){return L})),e.d(n,"f",(function(){return M})),e.d(n,"d",(function(){return P})),e.d(n,"e",(function(){return A}));var c=e(63),a=e.n(c),r=e(182),o=(btoa(r.a.CLIENT_ID+":"+r.a.CLIENT_SECRET),function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"availabilityId";return a.a.get("".concat(r.b,"/search/student-bookings?").concat(n,"=").concat(t)).then((function(t){return console.log(t.data),t.data})).catch((function(t){}))}),u=function(t,n,e,c,o,u){return a.a.get("".concat(r.b,"/search/student-bookings?startDate=").concat(t,"&endDate=").concat(n,"&page=").concat(e,"&size=").concat(c,"&sort=").concat(o,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},i=function(t,n,e,c,o,u){return a.a.get("".concat(r.b,"/search/student-parents?page=").concat(e,"&size=").concat(c,"&sort=").concat(o,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},l=function(t){return a.a.get("".concat(r.b,"/tenant-profile/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},s=function(t,n,e,c,o,u,i,l){return a.a.get("".concat(r.b,"/search/schedules?gradeMin=").concat(t,"&gradeMax=").concat(n,"&startDate=").concat(e,"&endDate=").concat(c,"&page=").concat(o,"&size=").concat(u,"&sort=").concat(i,",").concat(l)).then((function(t){return t.data})).catch((function(t){}))},f=function(t){JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id));return a.a.get("".concat(r.b,"/search/schedules?gradeMin=",0,"&gradeMax=",100,"&page=").concat(0,"&size=").concat(100,"&sort=").concat("startDate",",").concat("asc")).then((function(t){return t.data}))},d=function(){return a.a.get("http://ip-api.com/json").then((function(t){return t.data}))},h=function(t,n,e,c,o,u){return a.a.get("".concat(r.b,"/search/student-profiles?page=").concat(e,"&size=").concat(c,"&sort=").concat(o,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},g=function(t,n,e,c,o,u){return a.a.get("".concat(r.b,"/search/teacher-profiles?page=").concat(e,"&size=").concat(c,"&sort=").concat(o,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},m=function(t,n,e,c,o,u,i){return a.a.get("".concat(r.b,"/search/customer-messages?category=").concat(t,"&startDate=").concat(n,"&endDate=").concat(e,"&page=").concat(c,"&size=").concat(o,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},p=function(t){return a.a.get("".concat(r.b,"/student-bookings/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},b=function(t,n,e,c,o,u,i){return a.a.get("".concat(r.b,"/search/student-bookings?firstName=").concat(t,"&startDate=").concat(n,"&endDate=").concat(e,"&page=").concat(c,"&size=").concat(o,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},E=function(t,n,e,c,o,u,i){return a.a.get("".concat(r.b,"/search/student-parents?email=").concat(t,"&page=").concat(c,"&size=").concat(o,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},N=function(t,n,e,c,o,u,i,l){return a.a.get("".concat(r.b,"/search/schedules?gradeMin=").concat(t,"&gradeMax=").concat(n,"&startDate=").concat(e,"&endDate=").concat(c,"&page=").concat(o,"&size=").concat(u,"&sort=").concat(i,",").concat(l)).then((function(t){return t.data})).catch((function(t){}))},v=function(t,n,e,c,o,u,i){return a.a.get("".concat(r.b,"/search/student-profiles?firstName=").concat(t,"&page=").concat(c,"&size=").concat(o,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},y=function(t,n,e,c,o,u,i){return a.a.get("".concat(r.b,"/search/teacher-profiles?firstName=").concat(t,"&page=").concat(c,"&size=").concat(o,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},k=function(t,n,e,c,o,u,i,l){return a.a.get("".concat(r.b,"/search/customer-messages?category=").concat(t,"&firstName=").concat(n,"&startDate=").concat(e,"&endDate=").concat(c,"&page=").concat(o,"&size=").concat(u,"&sort=").concat(i,",").concat(l)).then((function(t){return t.data})).catch((function(t){}))},D=function(t){return a.a.get("".concat(r.b,"/search/student-profiles?parentId=").concat(t)).then((function(t){return t.data}))},w=function(t,n,e,c,o){return a.a.get("".concat(r.b,"/search/customer-message-templates?category=").concat(t,"&page=").concat(n,"&size=").concat(e)).then((function(t){return t.data})).catch((function(t){}))},j=function(t){return a.a.get("".concat(r.b,"/student-bookings/disable/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},z=function(t,n){var e=[];n.split(",").forEach((function(t){var n={};n.id=t,e.push(n)}));var c={studentBookings:e};return a.a.patch("".concat(r.b,"/teacher-availability/").concat(t),c).then((function(t){return t.data})).catch((function(t){}))},S=function(t,n){var e={teacherProfile:{conferenceUrl:n}};return a.a.patch("".concat(r.b,"/teacher-availability/").concat(t),e).then((function(t){return t.data})).catch((function(t){}))},x=function(t){return a.a.get("".concat(r.b,"/bridge?open=").concat(t)).then((function(t){return t.data})).catch((function(t){}))},C=function(t,n){return a.a.get("".concat(r.b,"/student-bookings/update/").concat(t,"?subject=").concat(n)).then((function(t){return t})).catch((function(t){}))},I=function(t){return a.a.get("".concat(r.b,"/student-booking/").concat(t)).then((function(t){return t})).catch((function(t){}))},O=function(t,n,e){return a.a.get("".concat(r.b,"/teachers_availabilities/update/").concat(t,"?subjects=").concat(n,"&grades=").concat(e)).then((function(t){return t})).catch((function(t){}))},T=function(t){var n=t.split(","),e="";return n.forEach((function(t,c){c==n.length-1?e+="id="+t:e+="id="+t+"&"})),a.a.delete("".concat(r.b,"/schedule?").concat(e)).then((function(t){return t})).catch((function(t){return console.log(t)}))},_=function(t){var n=t.split(","),e="";return n.forEach((function(t,c){c==n.length-1?e+="id="+t:e+="id="+t+"&"})),a.a.delete("".concat(r.b,"/schedule?").concat(e)).then((function(t){return t})).catch((function(t){return console.log(t)}))},L=function(t){var n=t.split(","),e="";return n.forEach((function(t,c){c==n.length-1?e+="id="+t:e+="id="+t+"&"})),a.a.delete("".concat(r.b,"/schedule?").concat(e)).then((function(t){return t})).catch((function(t){return console.log(t)}))},M=function(t){var n=t.split(","),e="";return n.forEach((function(t,c){c==n.length-1?e+="id="+t:e+="id="+t+"&"})),a.a.delete("".concat(r.b,"/student-parent?").concat(e)).then((function(t){return t})).catch((function(t){return console.log(t)}))},P=function(t){var n=t.split(","),e="";return n.forEach((function(t,c){c==n.length-1?e+="id="+t:e+="id="+t+"&"})),a.a.delete("".concat(r.b,"/teacher-availability?").concat(e)).then((function(t){return t})).catch((function(t){return console.log(t)}))},A=function(t){var n=t.split(","),e="";return n.forEach((function(t,c){c==n.length-1?e+="id="+t:e+="id="+t+"&"})),a.a.delete("".concat(r.b,"/student-booking?").concat(e)).then((function(t){return t})).catch((function(t){return console.log(t)}))}},549:function(t,n,e){"use strict";e.r(n);var c=e(49),a=e(0),r=e.n(a),o=e(86),u=e(236),i=e(564),l=e(293),s=e(532),f=e(343),d=e(204),h=e(263),g=e(9),m=e(183),p=(e(191),e(240)),b=e(237);n.default=function(t){var n=Object(g.h)(),e=(t.match.params,Object(g.g)()),E=Object(a.useState)([]),N=Object(c.a)(E,2),v=N[0],y=N[1],k=Object(a.useState)(!0),D=Object(c.a)(k,2),w=D[0],j=D[1],z=Object(a.useState)(n.state.parent),S=Object(c.a)(z,2),x=S[0];S[1],Object(a.useEffect)((function(){console.log(x),C()}),[]);var C=function(){j(!0),Object(m.s)(n.state.parent.id).then((function(t){y(t.content)})).catch((function(t){console.log(t),y([])})).finally((function(){return j(!1)}))},I=[{title:r.a.createElement("div",null,r.a.createElement("span",null,"Name ")),render:function(t){return r.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},r.a.createElement(o.a,{title:""},r.a.createElement(p.a,{icon:b.a,color:"green",style:{display:0==t.onlineStatus?"block":"none"}}),r.a.createElement(p.a,{icon:b.a,color:"orange",style:{display:1==t.onlineStatus?"block":"none"}}),r.a.createElement(p.a,{icon:b.a,color:"red",style:{display:2==t.onlineStatus?"block":"none"}})),r.a.createElement(o.a,{title:t.firstName+" "+t.lastName},r.a.createElement(u.a,{style:{backgroundColor:"transparent",border:"0px",cursor:"pointer",width:"60%"},onClick:function(n){n.stopPropagation(),e.push("/studentprofiles/".concat(t.id,"/details"),{student:t})}},r.a.createElement("p",{style:{width:"50%",textAlign:"left"}},(t.firstName+" "+t.lastName).length<=20?t.firstName+" "+t.lastName:(t.firstName+" "+t.lastName).substring(0,19)+"..."))))},key:"name",fixed:"left"},{title:r.a.createElement("div",null,r.a.createElement("span",null,"Email")),render:function(t){return r.a.createElement("div",null,t.email)},key:"email"},{title:r.a.createElement("div",null,r.a.createElement("span",null,"Grade")),render:function(t){return r.a.createElement("div",null,t.grade)},key:"grade"},{title:r.a.createElement("div",null,r.a.createElement("span",null,"School Name")),render:function(t){return r.a.createElement("div",null,t.schoolName)},key:"schoolName"}];return r.a.createElement("div",null,x?r.a.createElement(i.a,{ghost:!1,extra:[r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(u.a,{key:"3",type:"primary",style:{display:"flex"},onClick:function(t){t.stopPropagation(),e.push("/parentProfiles/".concat(x.id,"/update"),{parent:x})}},"Edit"))],title:r.a.createElement("p",{style:{fontSize:"3em",textAlign:"center",marginTop:"20px",marginBottom:"20px"}},x.firstName," ",x.lastName)},r.a.createElement(l.a,{gutter:24,style:{marginBottom:"3%"}},r.a.createElement(s.a,{title:"Student informations",hoverable:!0,bordered:!0,style:{width:"48%",marginLeft:"2%"}},r.a.createElement(l.a,{gutter:16},r.a.createElement(f.a,{className:"gutter-row",span:8},r.a.createElement("h4",null,"Email")),r.a.createElement(f.a,{className:"gutter-row",span:14},r.a.createElement("h4",null,x.email))),r.a.createElement(l.a,{gutter:16},r.a.createElement(f.a,{className:"gutter-row",span:8},r.a.createElement("h4",null,"Country Code")),r.a.createElement(f.a,{className:"gutter-row",span:14},r.a.createElement("h4",null,x.countryCode))),r.a.createElement(l.a,{gutter:16},r.a.createElement(f.a,{className:"gutter-row",span:8},r.a.createElement("h4",null,"Phone Number")),r.a.createElement(f.a,{className:"gutter-row",span:14},r.a.createElement("h4",null,x.phoneNumber))),r.a.createElement(l.a,{gutter:16},r.a.createElement(f.a,{className:"gutter-row",span:8},r.a.createElement("h4",null,"Activation Code")),r.a.createElement(f.a,{className:"gutter-row",span:14},r.a.createElement("h4",null,x.activationCode))))),w?r.a.createElement(d.a,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,x.firstName," ",x.lastName,"'s child "),r.a.createElement(h.a,{columns:I,dataSource:v,rowKey:"id"}))):null)}}}]);
//# sourceMappingURL=38.dcc76f19.chunk.js.map