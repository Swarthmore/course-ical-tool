(this["webpackJsonpcourse-search"]=this["webpackJsonpcourse-search"]||[]).push([[0],{323:function(e,t,r){"use strict";r.r(t);var n=r(0),c=r.n(n),i=r(24),a=r.n(i),s=r(33),o=r(326),u=r(67),l=r(332);var d=r(34),j=r(329),f=r(11),b=j.a.Search;function h(e){return Object(f.jsx)("div",{className:"CourseSearch",children:Object(f.jsx)(b,Object(d.a)({},e))})}var m=r(53),O=r(328),v=r(330),x=r(327),g=r(331);function p(e){var t=e.day,r=Object(m.a)(e,["day"]);return Object(f.jsx)(g.a,Object(d.a)(Object(d.a)({color:function(e){switch(e){case"SU":return"magenta";case"M":return"volcano";case"T":return"orange";case"W":return"green";case"TH":return"cyan";case"F":return"gold";case"SA":return"geekblue";default:return"red"}}(t)},r),{},{style:{width:"1.8rem",height:"1.8rem",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"},children:t}))}var y=r(57),w=r(45),I=r(333),S=r(42),k=r(41),C=r(167),_=r(58),T=r.n(_);function E(e,t){var r=T()(e,"HH:mm a"),n=T()(t,"HH:mm a"),c=T.a.duration(n.diff(r));return{minutes:c.get("minutes"),hours:c.get("hours")}}function F(e){if("M"===e)return 1;if("T"===e)return 2;if("W"===e)return 3;if("TH"===e)return 4;if("F"===e)return 5;if("S"===e)return 6;if("U"===e)return 0;throw new Error("Provided day is invalid")}function H(e){if("M"===e)return k.a.MO;if("T"===e)return k.a.TU;if("W"===e)return k.a.WE;if("TH"===e)return k.a.TH;if("F"===e)return k.a.FR;if("S"===e)return k.a.SA;if("U"===e)return k.a.SU;throw new Error("Provided day is invalid")}function R(e,t,r){try{var n=T()("".concat(e," ").concat(r),"MM-DD-YYYY hh:mm a");do{n=n.add(1,"days")}while(n.day()!==F(t));return n}catch(c){throw c}}function Y(e){var t=e.course,r=Object(m.a)(e,["course"]),n=function(e){var t=function(e){switch(e.semester){case"fall_2021":return["08/30/2021","12/18/2021"];case"spring_2022":return["01/18/2022","04/29/2021"];default:throw new Error("Invalid semester provided.")}}(e),r=Object(s.a)(t,2),n=function(e,t,r){var n=e.title,c=e.department,i=e.section,a=e.times,s=e.instructors;if(Object(m.a)(e,["title","department","section","times","instructors"]),a){var o,u,l=[],j=T()(r),f=Object(S.a)(a);try{for(f.s();!(o=f.n()).done;){var b=o.value,h=b.day,O=b.start_time,v=b.end_time,x=R(t,h,O),g=Object(d.a)({start:(u=x,u.format("YYYY-M-D-H-m").split("-").map((function(e){return+e}))),duration:E(O,v),recurrenceRule:p(h,j),status:"CONFIRMED",title:[c,n,i].join(" "),description:n},s&&{organizer:{name:s[0].name,email:s[0].email}});l.push(g)}}catch(y){f.e(y)}finally{f.f()}return Object(C.createEvents)(l)}function p(e,t){return new k.a({freq:k.a.WEEKLY,byweekday:H(e),until:t.toDate()}).toString().split("RRULE:")[1]}}(e,r[0],r[1]);if(!n)throw new Error("No response received from ical generator");if(n.value){var c=function(e){var t=e.course_id,r=e.reg_id,n=e.semester;return"".concat([t,r,n.replace("_","")].join("_"))}(e),i=new Blob([n.value],{type:"text/calendar"}),a=document.createElement("a"),o=URL.createObjectURL(i);a.href=o,a.setAttribute("download",c+".ics"),a.click()}else n.error?console.error(n.error):console.error("There was a problem generating iCal file")};return Object(f.jsx)(y.a,{title:"Download iCal for this course",placement:"left",children:Object(f.jsx)(w.a,Object(d.a)(Object(d.a)({type:"primary",shape:"circle",icon:Object(f.jsx)(I.a,{})},r),{},{onClick:function(){return n(t)}}))})}T()().tz("America/New_York").format(),T.a.suppressDeprecationWarnings=!0;var D=r(174),M=r.n(D),L=O.a.Paragraph;function U(e){var t=e.courses,r=Object(m.a)(e,["courses"]),n=t.map((function(e,t){return Object(d.a)({key:t.toString()},e)})),c=function(e){var t=e.split(",");return t[1].trim()+" "+t[0].trim()},i=M()(),a=[{title:"Registration Id",dataIndex:"reg_id",key:"reg_id",responsive:["lg"]},{title:"Department",dataIndex:"department",key:"department",responsive:["lg"]},{title:"Course",dataIndex:"title",key:"course",render:function(e,t){var r=t.title,n=t.instructors,a=void 0===n?[]:n,s=t.times,o=void 0===s?[]:s,u=t.reg_id;return i.sm?i.md?r:Object(f.jsxs)("div",{children:[Object(f.jsx)(L,{strong:!0,children:r}),Object(f.jsxs)(L,{children:["Registration Id",Object(f.jsx)("br",{}),u]}),a.length>0&&Object(f.jsxs)(L,{children:["Instructors",a.map((function(e,t){return Object(f.jsx)("div",{children:c(e.name)},t)}))]})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)(L,{strong:!0,children:r}),Object(f.jsxs)(L,{children:["Registration Id",Object(f.jsx)("br",{}),u]}),Object(f.jsxs)(L,{children:["Times",o.map((function(e,t){return Object(f.jsxs)("div",{children:[e.day," ",e.start_time,"-",e.end_time]},t)}))]}),a.length>0&&Object(f.jsxs)(L,{children:["Instructors",a.map((function(e,t){return Object(f.jsx)("div",{children:c(e.name)},t)}))]})]})}},{title:"Instructors",dataIndex:"instructors",key:"instructors",render:function(e){return e?Object(f.jsx)(v.b,{direction:"vertical",align:"center",children:e.map((function(e,t){return Object(f.jsxs)("div",{children:[Object(f.jsx)(L,{children:c(e.name)}),Object(f.jsx)(L,{children:e.email})]},t)}))}):""},responsive:["md"]},{title:"Times",dataIndex:"times",key:"times",render:function(e){return e?Object(f.jsx)(v.b,{direction:"vertical",align:"center",children:e.map((function(e,t){return Object(f.jsx)("div",{children:Object(f.jsxs)(L,{style:{display:"flex",alignItems:"center"},children:[Object(f.jsx)(p,{day:e.day}),e.start_time," - ",e.end_time]})},t)}))}):""},responsive:["sm"]},{title:"Credits",dataIndex:"credits",key:"credits",responsive:["lg"]},{title:"Semester",dataIndex:"semester",key:"semester",render:function(e){switch(e){case"fall_2021":return"Fall 2021";default:return e}},responsive:["lg"]},{title:"Action",key:"action",render:function(e,t){return Object(f.jsx)(Y,{course:t})}}];return Object(f.jsx)("div",{className:"CourseTable",children:Object(f.jsx)(x.a,Object(d.a)({dataSource:n,columns:a},r))})}var A=function(){var e=Object(n.useState)([]),t=Object(s.a)(e,2),r=t[0],c=t[1],i=function(e){var t=Object(n.useState)([]),r=Object(s.a)(t,2),c=r[0],i=r[1],a=Object(n.useState)(!0),o=Object(s.a)(a,2),u=o[0],l=o[1],d=Object(n.useState)(null),j=Object(s.a)(d,2),f=j[0],b=j[1];return Object(n.useEffect)((function(){l(!0),b(null),fetch(e).then((function(e){return e.json()})).then((function(e){i(e)})).catch((function(e){return b(e)})).finally((function(){l(!1)}))}),[e]),{fetching:u,courses:c,error:f}}("https://secure.swarthmore.edu/trico-course-guide/courses.json"),a=i.courses,d=i.error,j=i.fetching;return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)(o.a,{children:[Object(f.jsx)(o.a.Header,{children:Object(f.jsx)(u.a,{theme:"dark",mode:"horizontal",selectable:!1,children:Object(f.jsx)(u.a.Item,{children:"Course Search"},"1")})}),Object(f.jsxs)(o.a.Content,{children:[d&&Object(f.jsx)(l.a,{message:d,type:"error"}),Object(f.jsx)(h,{placeholder:"Begin typing to filter courses",enterButton:"search",allowClear:!0,size:"large",onSearch:function(e){c(e?a.filter((function(t){return t.title.toLowerCase().includes(e.toLowerCase())})):a)}}),Object(f.jsx)(U,{courses:r,loading:j})]})]})})},N=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,334)).then((function(t){var r=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;r(e),n(e),c(e),i(e),a(e)}))};r(321);a.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(A,{})}),document.getElementById("root")),N()}},[[323,1,2]]]);
//# sourceMappingURL=main.f0679957.chunk.js.map