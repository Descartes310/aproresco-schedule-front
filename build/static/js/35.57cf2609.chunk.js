(this["webpackJsonpstudent-scheduler"]=this["webpackJsonpstudent-scheduler"]||[]).push([[35],{182:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return c}));var a="https://meet.appui.io:8443",c={GRANT_TYPE:"client_credentials",CLIENT_ID:"1095225836707-p73rgbikb2dbniu8pjdgso14slpir3nf.apps.googleusercontent.com",CLIENT_SECRET:"QBkD6wvItNsLttKtucXjWV1V"}},183:function(t,e,n){"use strict";n.d(e,"C",(function(){return r})),n.d(e,"B",(function(){return u})),n.d(e,"u",(function(){return i})),n.d(e,"F",(function(){return l})),n.d(e,"w",(function(){return s})),n.d(e,"v",(function(){return f})),n.d(e,"t",(function(){return d})),n.d(e,"D",(function(){return h})),n.d(e,"E",(function(){return g})),n.d(e,"y",(function(){return m})),n.d(e,"A",(function(){return p})),n.d(e,"o",(function(){return b})),n.d(e,"m",(function(){return S})),n.d(e,"n",(function(){return v})),n.d(e,"p",(function(){return N})),n.d(e,"q",(function(){return E})),n.d(e,"x",(function(){return O})),n.d(e,"s",(function(){return y})),n.d(e,"z",(function(){return I})),n.d(e,"h",(function(){return D})),n.d(e,"b",(function(){return j})),n.d(e,"a",(function(){return x})),n.d(e,"c",(function(){return C})),n.d(e,"k",(function(){return k})),n.d(e,"r",(function(){return A})),n.d(e,"l",(function(){return T})),n.d(e,"g",(function(){return w})),n.d(e,"i",(function(){return z})),n.d(e,"j",(function(){return P})),n.d(e,"f",(function(){return J})),n.d(e,"d",(function(){return M})),n.d(e,"e",(function(){return B}));var a=n(63),c=n.n(a),o=n(182),r=(btoa(o.a.CLIENT_ID+":"+o.a.CLIENT_SECRET),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"availabilityId";return c.a.get("".concat(o.b,"/search/student-bookings?").concat(e,"=").concat(t)).then((function(t){return console.log(t.data),t.data})).catch((function(t){}))}),u=function(t,e,n,a,r,u){return c.a.get("".concat(o.b,"/search/student-bookings?startDate=").concat(t,"&endDate=").concat(e,"&page=").concat(n,"&size=").concat(a,"&sort=").concat(r,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},i=function(t,e,n,a,r,u){return c.a.get("".concat(o.b,"/search/student-parents?page=").concat(n,"&size=").concat(a,"&sort=").concat(r,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},l=function(t){return c.a.get("".concat(o.b,"/tenant-profile/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},s=function(t,e,n,a,r,u,i,l){return c.a.get("".concat(o.b,"/search/schedules?gradeMin=").concat(t,"&gradeMax=").concat(e,"&startDate=").concat(n,"&endDate=").concat(a,"&page=").concat(r,"&size=").concat(u,"&sort=").concat(i,",").concat(l)).then((function(t){return t.data})).catch((function(t){}))},f=function(t){JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id));return c.a.get("".concat(o.b,"/search/schedules?gradeMin=",0,"&gradeMax=",100,"&page=").concat(0,"&size=").concat(100,"&sort=").concat("startDate",",").concat("asc")).then((function(t){return t.data}))},d=function(){return c.a.get("http://ip-api.com/json").then((function(t){return t.data}))},h=function(t,e,n,a,r,u){return c.a.get("".concat(o.b,"/search/student-profiles?page=").concat(n,"&size=").concat(a,"&sort=").concat(r,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},g=function(t,e,n,a,r,u){return c.a.get("".concat(o.b,"/search/teacher-profiles?page=").concat(n,"&size=").concat(a,"&sort=").concat(r,",").concat(u)).then((function(t){return t.data})).catch((function(t){}))},m=function(t,e,n,a,r,u,i){return c.a.get("".concat(o.b,"/search/customer-messages?category=").concat(t,"&startDate=").concat(e,"&endDate=").concat(n,"&page=").concat(a,"&size=").concat(r,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},p=function(t){return c.a.get("".concat(o.b,"/student-bookings/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},b=function(t,e,n,a,r,u,i){return c.a.get("".concat(o.b,"/search/student-bookings?firstName=").concat(t,"&startDate=").concat(e,"&endDate=").concat(n,"&page=").concat(a,"&size=").concat(r,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},S=function(t,e,n,a,r,u,i){return c.a.get("".concat(o.b,"/search/student-parents?email=").concat(t,"&page=").concat(a,"&size=").concat(r,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},v=function(t,e,n,a,r,u,i,l){return c.a.get("".concat(o.b,"/search/schedules?gradeMin=").concat(t,"&gradeMax=").concat(e,"&startDate=").concat(n,"&endDate=").concat(a,"&page=").concat(r,"&size=").concat(u,"&sort=").concat(i,",").concat(l)).then((function(t){return t.data})).catch((function(t){}))},N=function(t,e,n,a,r,u,i){return c.a.get("".concat(o.b,"/search/student-profiles?firstName=").concat(t,"&page=").concat(a,"&size=").concat(r,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},E=function(t,e,n,a,r,u,i){return c.a.get("".concat(o.b,"/search/teacher-profiles?firstName=").concat(t,"&page=").concat(a,"&size=").concat(r,"&sort=").concat(u,",").concat(i)).then((function(t){return t.data})).catch((function(t){}))},O=function(t,e,n,a,r,u,i,l){return c.a.get("".concat(o.b,"/search/customer-messages?category=").concat(t,"&firstName=").concat(e,"&startDate=").concat(n,"&endDate=").concat(a,"&page=").concat(r,"&size=").concat(u,"&sort=").concat(i,",").concat(l)).then((function(t){return t.data})).catch((function(t){}))},y=function(t){return c.a.get("".concat(o.b,"/search/student-profiles?parentId=").concat(t)).then((function(t){return t.data}))},I=function(t,e,n,a,r){return c.a.get("".concat(o.b,"/search/customer-message-templates?category=").concat(t,"&page=").concat(e,"&size=").concat(n)).then((function(t){return t.data})).catch((function(t){}))},D=function(t){return c.a.get("".concat(o.b,"/student-bookings/disable/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},j=function(t,e){var n=[];e.split(",").forEach((function(t){var e={};e.id=t,n.push(e)}));var a={studentBookings:n};return c.a.patch("".concat(o.b,"/teacher-availability/").concat(t),a).then((function(t){return t.data})).catch((function(t){}))},x=function(t,e){var n={teacherProfile:{conferenceUrl:e}};return c.a.patch("".concat(o.b,"/teacher-availability/").concat(t),n).then((function(t){return t.data})).catch((function(t){}))},C=function(t){return c.a.get("".concat(o.b,"/bridge?open=").concat(t)).then((function(t){return t.data})).catch((function(t){}))},k=function(t,e){return c.a.get("".concat(o.b,"/student-bookings/update/").concat(t,"?subject=").concat(e)).then((function(t){return t})).catch((function(t){}))},A=function(t){return c.a.get("".concat(o.b,"/student-booking/").concat(t)).then((function(t){return t})).catch((function(t){}))},T=function(t,e,n){return c.a.get("".concat(o.b,"/teachers_availabilities/update/").concat(t,"?subjects=").concat(e,"&grades=").concat(n)).then((function(t){return t})).catch((function(t){}))},w=function(t){var e=t.split(","),n="";return e.forEach((function(t,a){a==e.length-1?n+="id="+t:n+="id="+t+"&"})),c.a.delete("".concat(o.b,"/schedule?").concat(n)).then((function(t){return t})).catch((function(t){return console.log(t)}))},z=function(t){var e=t.split(","),n="";return e.forEach((function(t,a){a==e.length-1?n+="id="+t:n+="id="+t+"&"})),c.a.delete("".concat(o.b,"/schedule?").concat(n)).then((function(t){return t})).catch((function(t){return console.log(t)}))},P=function(t){var e=t.split(","),n="";return e.forEach((function(t,a){a==e.length-1?n+="id="+t:n+="id="+t+"&"})),c.a.delete("".concat(o.b,"/schedule?").concat(n)).then((function(t){return t})).catch((function(t){return console.log(t)}))},J=function(t){var e=t.split(","),n="";return e.forEach((function(t,a){a==e.length-1?n+="id="+t:n+="id="+t+"&"})),c.a.delete("".concat(o.b,"/student-parent?").concat(n)).then((function(t){return t})).catch((function(t){return console.log(t)}))},M=function(t){var e=t.split(","),n="";return e.forEach((function(t,a){a==e.length-1?n+="id="+t:n+="id="+t+"&"})),c.a.delete("".concat(o.b,"/teacher-availability?").concat(n)).then((function(t){return t})).catch((function(t){return console.log(t)}))},B=function(t){var e=t.split(","),n="";return e.forEach((function(t,a){a==e.length-1?n+="id="+t:n+="id="+t+"&"})),c.a.delete("".concat(o.b,"/student-booking?").concat(n)).then((function(t){return t})).catch((function(t){return console.log(t)}))}},186:function(t,e,n){"use strict";n.d(e,"q",(function(){return u})),n.d(e,"o",(function(){return i})),n.d(e,"p",(function(){return l})),n.d(e,"s",(function(){return s})),n.d(e,"l",(function(){return f})),n.d(e,"j",(function(){return d})),n.d(e,"r",(function(){return h})),n.d(e,"m",(function(){return g})),n.d(e,"k",(function(){return m})),n.d(e,"n",(function(){return p})),n.d(e,"g",(function(){return b})),n.d(e,"x",(function(){return S})),n.d(e,"h",(function(){return v})),n.d(e,"y",(function(){return N})),n.d(e,"A",(function(){return E})),n.d(e,"i",(function(){return O})),n.d(e,"d",(function(){return y})),n.d(e,"v",(function(){return I})),n.d(e,"a",(function(){return D})),n.d(e,"z",(function(){return j})),n.d(e,"c",(function(){return x})),n.d(e,"u",(function(){return C})),n.d(e,"b",(function(){return k})),n.d(e,"t",(function(){return A})),n.d(e,"f",(function(){return T})),n.d(e,"w",(function(){return w})),n.d(e,"e",(function(){return z}));var a=n(29),c=n(63),o=n.n(c),r=n(182),u=function(t,e){var n=JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id)),a={roles:["supervisor"],tenant:{key:n}};return e?o.a.post("".concat(r.b,"/teacher-profile/").concat(t,"/roles"),a).then((function(t){return t.data})):o.a.delete("".concat(r.b,"/teacher-profile/").concat(t,"/tenant/").concat(n,"/role/supervisor")).then((function(t){return t.data}))},i=function(t,e){var n=JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id)),a={roles:["admin"],tenant:{key:n}};return e?o.a.post("".concat(r.b,"/teacher-profile/").concat(t,"/roles"),a).then((function(t){return t.data})):o.a.delete("".concat(r.b,"/teacher-profile/").concat(t,"/tenant/").concat(n,"/role/admin")).then((function(t){return t.data}))},l=function(t,e){var n={tenants:[{tenant:{key:JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id))}}]};return e?o.a.post("".concat(r.b,"/teacher-profile/").concat(t,"/approval"),n).then((function(t){return t.data})):o.a.delete("".concat(r.b,"/teacher-profile/").concat(t,"/approval"),n).then((function(t){return t.data}))},s=function(t){var e={key:t},n=JSON.parse(localStorage.getItem("id"));return o.a.post("".concat(r.b,"/teacher-profile/").concat(n,"/tenant"),e).then((function(t){return t.data}))},f=function(t,e,n,a){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"firstName",u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"asc";if(null==t||null==e){var i=new Date;i.setDate(i.getDate()-1);var l=i.getDate()<10?"0"+i.getDate():i.getDate(),s=i.getMonth()+1<10?"0"+(i.getMonth()+1):i.getMonth()+1,f=i.getFullYear(),d=i.getHours().toString().padStart(2,"0"),h=i.getMinutes().toString().padStart(2,"0");null!=localStorage.getItem("startDate")&&null!=localStorage.getItem("toStart")||(localStorage.setItem("startDate",f+"-"+s+"-"+l),localStorage.setItem("toStart",s+"%2F"+l+"%2F"+f+"%20"+d+":"+h+":00 -0500"),t=s+"%2F"+l+"%2F"+f+"%20"+d+":"+h+":00 -0500"),null==localStorage.getItem("startTime")&&localStorage.setItem("startTime",i.getHours().toString().padStart(2,"0")+":"+i.getMinutes().toString().padStart(2,"0")),(i=new Date).setDate(i.getDate()+1),l=i.getDate()<10?"0"+i.getDate():i.getDate(),s=i.getMonth()+1<10?"0"+(i.getMonth()+1):i.getMonth()+1,f=i.getFullYear(),d=i.getHours().toString().padStart(2,"0"),h=i.getMinutes().toString().padStart(2,"0"),null!=localStorage.getItem("endDate")&&null!=localStorage.getItem("toEnd")||(localStorage.setItem("endDate",f+"-"+s+"-"+l),localStorage.setItem("toEnd",s+"%2F"+l+"%2F"+f+"%20"+d+":"+h+":00 -0500"),e=s+"%2F"+l+"%2F"+f+"%20"+d+":"+h+":00 -0500"),null==localStorage.getItem("endTime")&&localStorage.setItem("endTime",i.getHours().toString().padStart(2,"0")+":"+i.getMinutes().toString().padStart(2,"0"))}return o.a.get("".concat(r.b,"/search/teacher-availabilities?startDate=").concat(t,"&endDate=").concat(e,"&page=").concat(n,"&size=").concat(a,"&sort=").concat(c,",").concat(u),{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"GET, POST, OPTIONS, DELETE, PATCH","Access-Control-Allow-Credentials":"true"}}).then((function(t){return t.data})).catch((function(t){}))},d=function(t){return o.a.get("".concat(r.b,"/teacher-availabilities/disable/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},h=function(t,e){return o.a.get("".concat(r.b,"/teacher-availabilities/update/").concat(t,"?present=").concat(e)).then((function(t){return t.data})).catch((function(t){}))},g=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return t=null==t?JSON.parse(localStorage.getItem("email")):t,o.a.get("".concat(r.b,"/teacher-profile/email/").concat(t)).then((function(t){return t.data})).catch((function(t){}))},m=function(t,e,n,a,c){var u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"firstName",i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"asc";return o.a.get("".concat(r.b,"/search/teacher-availabilities?firstName=").concat(t,"&startDate=").concat(e,"&endDate=").concat(n,"&page=").concat(a,"&size=").concat(c,"&sort=").concat(u,",").concat(i),{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"GET, POST, OPTIONS, DELETE, PATCH","Access-Control-Allow-Credentials":"true"}}).then((function(t){return t.data}))},p=function(t){var e=new FormData;e.append("token",t),e.append("provider","google");var n={token:t,provider:"google"};return o.a.post("".concat(r.b,"/oauth/verify"),n).then((function(t){localStorage.setItem("token",JSON.stringify(t.data));var e=new Date;return e.setDate(e.getDate()+30),localStorage.setItem("expireAt",e),t}))},b=function(t){return o.a.post("".concat(r.b,"/schedule"),t).then((function(t){return t})).catch((function(t){return console.log(t)}))},S=function(t,e){return o.a.patch("".concat(r.b,"/schedule/").concat(t),e).then((function(t){return t})).catch((function(t){return console.log(t)}))},v=function(t,e,n,a,c,u,i){var l={firstName:t,lastName:e,email:n,schoolName:a,schoolBoard:c,grade:u,parent:{email:i}};return o.a.post("".concat(r.b,"/student-profile"),l).then((function(t){return t})).catch((function(t){return console.log(t)}))},N=function(t,e,n,a,c,u,i,l){var s={firstName:e,lastName:n,email:a,schoolName:c,schoolBoard:u,grade:i,parent:{email:l}};return o.a.patch("".concat(r.b,"/student-profile/").concat(t),s).then((function(t){return t})).catch((function(t){return console.log(t)}))},E=function(t,e,n,a,c,u,i,l){var s={conferenceUrlPrefix:n,displayName:e,key:t,staticWelcomeUrl:i,videoServerUrl:u,maxTeacherPerSupervisor:a,primaryContact:l,supportUrl:c};return o.a.patch("".concat(r.b,"/tenant-profile/").concat(t),s).then((function(t){return t})).catch((function(t){return console.log(t)}))},O=function(t,e,n,a,c,u,i,l){var s={firstName:t,lastName:e,externalEmail:n,schoolName:a,schoolBoard:c,grades:u,phoneNumber:l,subjects:i};return o.a.post("".concat(r.b,"/teacher-profile/register"),s).then((function(t){return t})).catch((function(t){return console.log(t)}))},y=function(t,e){var n={content:e,commenter:{id:JSON.parse(localStorage.getItem("user")).id},tenant:{key:JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id))}};return o.a.post("".concat(r.b,"/student-booking/").concat(t,"/teacher-comment"),n).then((function(t){return t})).catch((function(t){return console.log(t)}))},I=function(t,e){var n={content:e};return o.a.patch("".concat(r.b,"/teacher-comment/").concat(t),n).then((function(t){return t})).catch((function(t){return console.log(t)}))},D=function(t){var e=Object(a.a)(Object(a.a)({},t),{},{approver:{id:JSON.parse(localStorage.getItem("user")).id}});return o.a.post("".concat(r.b,"/teacher-comment/").concat(t.id,"/approval"),e).then((function(t){return t})).catch((function(t){return console.log(t)}))},j=function(t,e,n,a,c,u,i,l,s){var f={firstName:e,lastName:n,schoolName:l,schoolBoard:s,externalEmail:a,grades:c,phoneNumber:i,subjects:u};return o.a.patch("".concat(r.b,"/teacher-profile/update/").concat(t),f).then((function(t){return t})).catch((function(t){return console.log(t)}))},x=function(t,e,n){var a={studentProfile:t,schedule:e,studentComment:n};return o.a.post("".concat(r.b,"/student-booking"),a).then((function(t){return t})).catch((function(t){return console.log(t)}))},C=function(t,e,n,a){var c={studentProfile:e,schedule:n,studentComment:a};return o.a.patch("".concat(r.b,"/student-booking/").concat(t),c).then((function(t){return t})).catch((function(t){return console.log(t)}))},k=function(t,e){var n={teacherProfile:t,schedule:e};return o.a.post("".concat(r.b,"/teacher-availability"),n).then((function(t){return t})).catch((function(t){return console.log(t)}))},A=function(t,e,n){var a={teacherProfile:e,schedule:n};return o.a.patch("".concat(r.b,"/teacher-availability/").concat(t),a).then((function(t){return t})).catch((function(t){return console.log(t)}))},T=function(t,e,n,a,c){var u={phoneNumber:n,countryCode:a,firstName:t,lastName:e,email:c,tenants:[{key:JSON.parse(localStorage.getItem("tenant"+JSON.parse(localStorage.getItem("user")).id))}]};return o.a.post("".concat(r.b,"/student-parent"),u).then((function(t){return t})).catch((function(t){return console.log(t)}))},w=function(t,e,n,a,c,u){var i={phoneNumber:a,countryCode:c,firstName:e,lastName:n,email:u};return o.a.patch("".concat(r.b,"/student-parent/").concat(t),i).then((function(t){return t})).catch((function(t){return console.log(t)}))},z=function(t,e,n,a,c,u,i,l){var s="StudentProfile"==t?"reminder/students":"reminder/teachers";return o.a.get("".concat(r.b,"/").concat(s,"?message=").concat(a,"&subject=").concat(c,"&firstName=").concat(l,"&async=").concat(u,"&saveAstemplate=").concat(i)).then((function(t){return t})).catch((function(t){return console.log(t)}))}},187:function(t,e,n){},559:function(t,e,n){"use strict";n.r(e);var a=n(49),c=n(82),o=n(29),r=(n(116),n(9)),u=(n(187),n(563)),i=n(564),l=n(565),s=n(236),f=n(186),d=n(183),h=n(0),g=n.n(h),m=n(347),p=n(348),b=n(342),S=function(t,e){return Object(o.a)(Object(o.a)({},t),{},Object(c.a)({},e.name,e.value))};e.default=function(){var t=Object(r.g)(),e=Object(r.h)(),n=Object(h.useState)(!1),c=Object(a.a)(n,2),v=c[0],N=c[1],E=Object(h.useState)(!1),O=Object(a.a)(E,2),y=O[0],I=(O[1],Object(h.useState)(e.state.student)),D=Object(a.a)(I,2),j=D[0],x=(D[1],Object(h.useState)(!1)),C=Object(a.a)(x,2),k=C[0],A=C[1],T=Object(h.useState)([]),w=Object(a.a)(T,2),z=w[0],P=w[1],J=Object(h.useState)(null),M=Object(a.a)(J,2),B=M[0],F=M[1],L=Object(h.useState)(""),V=Object(a.a)(L,2),q=(V[0],V[1],Object(h.useState)(e.state.student.lastName)),H=Object(a.a)(q,2),R=H[0],U=H[1],_=Object(h.useReducer)(S,{}),G=Object(a.a)(_,2),Y=G[0],W=G[1],K=u.a.useForm(),Q=Object(a.a)(K,1)[0];Object(h.useEffect)((function(){console.log(j),Y.firstName=j.firstName,U(j.lastName),Y.schoolName=j.schoolName,Y.schoolBoard=j.schoolBoard,Y.email=j.email,Y.grade=j.grade,F(j.parent.email),X()}),[]);var X=function(){Object(d.u)(localStorage.getItem("toStart"),localStorage.getItem("toEnd"),0,100,"firstName","asc").then((function(t){console.log("DATA ==> ",t),t&&t.content?P(t.content):P([])}))},Z=function(t){W({name:t.target.name,value:t.target.value})};return g.a.createElement("div",null,g.a.createElement(i.a,{ghost:!1,title:g.a.createElement("p",{style:{fontSize:"3em",textAlign:"center",marginTop:"20px",marginBottom:"20px"}},"Update Student"),extra:[]},g.a.createElement(u.a,{form:Q,onFinish:function(){Y.firstName&&R&&Y.email&&Y.schoolName&&Y.schoolBoard&&B&&Y.grade?Y.firstName.toString().length<=0||R.toString().length<=0||Y.schoolName.toString().length<=0||Y.schoolBoard.toString().length<=0||Y.email.toString().length<=0||Y.grade.toString().length<=0?alert("Please, fill the form!"):(N(!0),Object(f.y)(j.id,Y.firstName,R,Y.email,Y.schoolName,Y.schoolBoard,Y.grade,B).then((function(e){t.push("/studentprofiles")})).catch((function(t){alert("Error occured when saving data, please retry!"),console.log(t)})).finally((function(){return N(!1)}))):alert("Please, fill the form!")},autoComplete:"off",layout:"vertical",style:{width:"80%",marginLeft:"10%"}},g.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},g.a.createElement(u.a.Item,{label:"Parent Email",required:!0,style:{flex:1,marginRight:"10px"}},g.a.createElement(p.a,{id:"asynchronous-search",options:z,size:"small",inputValue:B,onInputChange:function(t,e){F(e)},onChange:function(t,e){U(e.lastName),F(B)},open:k,defaultValue:j.parent,onOpen:function(){A(!0)},onClose:function(){A(!1)},loading:y,getOptionLabel:function(t){return t.email},renderInput:function(t){return g.a.createElement(m.a,Object.assign({},t,{variant:"outlined",InputProps:Object(o.a)(Object(o.a)({},t.InputProps),{},{endAdornment:g.a.createElement(g.a.Fragment,null,y?g.a.createElement(b.a,{color:"inherit",size:20}):null,t.InputProps.endAdornment)})}))}}))),g.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},g.a.createElement(u.a.Item,{label:"First Name",required:!0,style:{flex:1,marginRight:"10px"}},g.a.createElement(l.a,{type:"text",name:"firstName",onChange:Z,defaultValue:j.firstName})),g.a.createElement(u.a.Item,{label:"Last Name",required:!0,style:{flex:1,marginLeft:"10px"}},g.a.createElement(l.a,{type:"text",name:"lastName",value:R,onChange:function(t){return U(t.target.value)},defaultValue:j.lastName}))),g.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},g.a.createElement(u.a.Item,{label:"Student Email",required:!0,style:{flex:1,marginRight:"10px"}},g.a.createElement(l.a,{type:"email",name:"email",onChange:Z,defaultValue:j.email})),g.a.createElement(u.a.Item,{label:"Student grade",required:!0,style:{flex:1,marginLeft:"10px"}},g.a.createElement(l.a,{type:"number",min:0,max:12,step:1,name:"grade",onChange:Z,defaultValue:j.grade}))),g.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},g.a.createElement(u.a.Item,{label:"School Name",required:!0,style:{flex:1,marginRight:"10px"}},g.a.createElement(l.a,{type:"text",name:"schoolName",onChange:Z,defaultValue:j.schoolName})),g.a.createElement(u.a.Item,{label:"School Board",required:!0,style:{flex:1,marginLeft:"10px"}},g.a.createElement(l.a,{type:"text",name:"schoolBoard",onChange:Z,defaultValue:j.schoolBoard}))),g.a.createElement(u.a.Item,null,g.a.createElement(s.a,{disabled:v,type:"primary",size:"large",htmlType:"submit"},v?"Loading...":"Update Student Profile")))))}}}]);
//# sourceMappingURL=35.57cf2609.chunk.js.map