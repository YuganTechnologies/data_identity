"use strict";(self.webpackChunkcollege_erp=self.webpackChunkcollege_erp||[]).push([[506],{92157:function(e,n,r){r.d(n,{Z:function(){return g}});var t=r(74165),s=r(15861),a=r(15671),l=r(43144),c=r(65218),i=function(){function e(){(0,a.Z)(this,e)}return(0,l.Z)(e,null,[{key:"successMessage",value:function(e){return c.ZP.success(e,{position:"top-center"})}},{key:"errorMessage",value:function(e){return c.ZP.error(e,{position:"top-center"})}}]),e}(),o=r(24500),u=r(69334),d=r(5202),h=r(31243),m=r(34948),p=r(36877);function f(){h.Z.defaults.headers.common.Authorization=m.Z.GetToken(),h.Z.defaults.headers.common.UserDetails=JSON.stringify(m.Z.GetUserDetails())}h.Z.defaults.baseURL="https://apidata.yugan.tech/api/user/v1",h.Z.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var x=function(e){return console.log(e),d.Z.dispatch((0,p.zy)()),500===e.response.status?i.errorMessage("Sorry, Something went wrong"):401===e.response.status?(i.errorMessage(e.response.data.message),d.Z.dispatch((0,o.hf)()),d.Z.dispatch((0,u.c1)())):i.errorMessage(e.response.data.message),!1},j=function(){function e(){(0,a.Z)(this,e)}return(0,l.Z)(e,null,[{key:"getRequest",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d.Z.dispatch((0,p.Pl)()),e.next=3,h.Z.get(n,f()).then((function(e){return e})).catch((function(e){return x(e)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"postRequest",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n,r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.Z.post(n,r,f()).then((function(e){return console.log("api",e),e})).catch((function(e){return x(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}()},{key:"updateRequest",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n,r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d.Z.dispatch((0,p.Pl)()),e.next=3,h.Z.patch(n,r,f()).then((function(e){return e})).catch((function(e){return x(e)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}()},{key:"putRequest",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n,r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d.Z.dispatch((0,p.Pl)()),e.next=3,h.Z.put(n,r,f()).then((function(e){return e})).catch((function(e){return x(e)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}()},{key:"deleteRequest",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d.Z.dispatch((0,p.Pl)()),e.next=3,h.Z.delete(n,f()).then((function(e){return e})).catch((function(e){return x(e)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}]),e}(),v=j,Z=function(){function e(){(0,a.Z)(this,e)}return(0,l.Z)(e,null,[{key:"LoginUser",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){var r,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.postRequest("/login",n);case 2:(r=e.sent)?(d.Z.dispatch((0,o.bo)(null===(s=r.data)||void 0===s?void 0:s.token)),d.Z.dispatch((0,u.Ky)(null===(a=r.data)||void 0===a?void 0:a.UserId)),i.successMessage("User Login Successfull")):i.errorMessage("Invalid Credentials");case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"AddStudent",value:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.postRequest("/create-student",n);case 2:e.sent?(i.successMessage("Student Added Successfull"),window.location.reload()):i.errorMessage("Error in Adding");case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}]),e}(),g=Z},14824:function(e,n,r){var t=r(72791),s=r(47022),a=r(89743),l=r(2677),c=r(19089),i=r(11087),o=r(33168),u=r(74427),d=r(80184);n.Z=function(e){var n=e.bottomLinks,r=e.children,h=(0,o.$)().t;return(0,t.useEffect)((function(){return document.body&&document.body.classList.add("authentication-bg"),function(){document.body&&document.body.classList.remove("authentication-bg")}}),[]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"account-pages pt-2 pt-sm-5 pb-4 pb-sm-5",children:(0,d.jsx)(s.Z,{children:(0,d.jsx)(a.Z,{className:"justify-content-center",children:(0,d.jsxs)(l.Z,{md:8,lg:6,xl:5,children:[(0,d.jsxs)(c.Z,{children:[(0,d.jsx)(c.Z.Header,{className:"pt-4 pb-4 text-center bg-primary",children:(0,d.jsx)(i.rU,{to:"/",children:(0,d.jsx)("span",{children:(0,d.jsx)("img",{src:u,alt:"",height:"55"})})})}),(0,d.jsx)(c.Z.Body,{className:"p-4",children:r})]}),n]})})})}),(0,d.jsx)("footer",{className:"footer footer-alt",children:h("2024 \xa9 Yugan")})]})}},51506:function(e,n,r){r.r(n),r.d(n,{default:function(){return _}});var t=r(89743),s=r(2677),a=r(43360),l=r(62797),c=r(33168),i=r(72791),o=r(92506),u=r(80184),d=function(e){var n=e.defaultValues,r=e.validationSchema,t=e.children,s=e.onSubmit;return(0,u.jsx)(o.J9,{enableReinitialize:!0,initialValues:n,validationSchema:r,onSubmit:function(e,n){s(e)},children:function(e){return(0,u.jsx)(o.l0,{children:t})}})},h=r(1413),m=r(74165),p=r(15861),f=r(29439),x=r(95313),j=r(99410),v=r(41418),Z=r.n(v),g=r(75737),N=r.n(g),y=(r(98404),r(66770)),b=r.n(y),w=(r(86009),r(9419)),k=r(70972),C=r.n(k),F=r(93433),I=r(11087),P=r(19089),S=r(43954),B=function(e){var n=(0,i.useState)([]),r=(0,f.Z)(n,2),a=r[0],l=r[1],c=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===e)return"0 Bytes";var r=n<0?0:n,t=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,t)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][t]};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(S.ZP,(0,h.Z)((0,h.Z)({},e),{},{onDrop:function(n){return function(n){var r,t=n;e.showPreview&&(n.map((function(e){return Object.assign(e,{preview:"image"===e.type.split("/")[0]?URL.createObjectURL(e):null,formattedSize:c(e.size)})})),(r=t=(0,F.Z)(a)).push.apply(r,(0,F.Z)(n)),l(t)),e.onFileUpload&&e.onFileUpload(t)}(n)},children:function(e){var n=e.getRootProps,r=e.getInputProps;return(0,u.jsx)("div",{className:"dropzone",children:(0,u.jsxs)("div",(0,h.Z)((0,h.Z)({className:"dz-message needsclick"},n()),{},{children:[(0,u.jsx)("input",(0,h.Z)({},r())),(0,u.jsx)("i",{className:"h3 text-muted dripicons-cloud-upload"}),(0,u.jsx)("h5",{children:"Drop files here or click to upload."})]}))})}})),e.showPreview&&a.length>0&&(0,u.jsx)("div",{className:"dropzone-previews mt-3",id:"uploadPreviewTemplate",children:(a||[]).map((function(e,n){return(0,u.jsx)(P.Z,{className:"mt-1 mb-0 shadow-none border",children:(0,u.jsx)("div",{className:"p-2",children:(0,u.jsxs)(t.Z,{className:"align-items-center",children:[e.preview&&(0,u.jsx)(s.Z,{className:"col-auto",children:(0,u.jsx)("img",{"data-dz-thumbnail":"",className:"avatar-sm rounded bg-light",alt:e.name,src:e.preview})}),!e.preview&&(0,u.jsx)(s.Z,{className:"col-auto",children:(0,u.jsx)("div",{className:"avatar-sm",children:(0,u.jsx)("span",{className:"avatar-title bg-primary rounded",children:e.type.split("/")[0]})})}),(0,u.jsxs)(s.Z,{className:"ps-0",children:[(0,u.jsx)(I.rU,{to:"#",className:"text-muted fw-bold",children:e.name}),(0,u.jsx)("p",{className:"mb-0",children:(0,u.jsx)("strong",{children:e.formattedSize})})]}),(0,u.jsx)(s.Z,{className:"text-end",children:(0,u.jsx)(I.rU,{to:"#",className:"btn btn-link btn-lg text-muted shadow-none",children:(0,u.jsx)("i",{className:"dripicons-cross",onClick:function(){return function(e){var n=(0,F.Z)(a);n.splice(n.indexOf(e),1),l(n)}(n)}})})})]})})},n+"-file")}))})]})};B.defaultProps={showPreview:!0};var U=B,L=r(3466),G=r.n(L),R=function(e){return new Promise((function(n){G().imageFileResizer(e,140,140,"PNG",100,0,(function(e){n(e)}),"base64")}))},M=r(59513),z=r.n(M),V=(0,i.forwardRef)((function(e,n){return(0,u.jsx)("input",{type:"text",className:"form-control date",onClick:e.onClick,value:e.value,onChange:function(){console.log("date value changed")},ref:n})})),D=(0,i.forwardRef)((function(e,n){return(0,u.jsxs)("div",{className:"input-group",ref:n,children:[(0,u.jsx)("input",{type:"text",className:"form-control form-control-light",onClick:e.onClick,value:e.value,readOnly:!0}),(0,u.jsx)("div",{className:"input-group-append",children:(0,u.jsx)("span",{className:"input-group-text bg-primary border-primary text-white",children:(0,u.jsx)("i",{className:"mdi mdi-calendar-range font-13"})})})]})})),q=function(e){var n=!0===(e.hideAddon||!1)?(0,u.jsx)(V,{}):(0,u.jsx)(D,{});return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(z(),{customInput:n,timeIntervals:e.tI,className:Z()("form-control",e.inputClass),selected:e.value,onChange:function(n){return e.onChange(n)},showTimeSelect:e.showTimeSelect,timeFormat:"hh:mm a",timeCaption:e.timeCaption,dateFormat:e.dateFormat||"MM/dd/yyyy",minDate:e.minDate,maxDate:e.maxDate,monthsShown:e.monthsShown,showTimeSelectOnly:e.showTimeSelectOnly,inline:e.inline})})},T=function(e){var n=e.label,r=e.type,t=e.name,s=e.placeholder,a=e.className,l=e.labelClassName,c=e.containerClass,d=e.children,v=e.onChange,g=e.defaultValue,y=e.options,k=(0,i.useState)(!1),F=(0,f.Z)(k,2),I=F[0],P=F[1],S=(0,i.useState)(g),B=(0,f.Z)(S,2),L=B[0],G=B[1],M=function(){var e=(0,p.Z)((0,m.Z)().mark((function e(n,r){var s,a,l,c;return(0,m.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.t1=t,e.next=4,R(null===(s=n.target)||void 0===s||null===(a=s.files)||void 0===a?void 0:a[0]);case 4:return e.t2=e.sent,(0,e.t0)(e.t1,e.t2),e.t3=v,e.next=9,R(null===(l=n.target)||void 0===l||null===(c=l.files)||void 0===c?void 0:c[0]);case 9:e.t4=e.sent,(0,e.t3)(e.t4);case 11:case"end":return e.stop()}}),e)})));return function(n,r){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){G(g)}),[g]);var z=function(){return(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{children:function(e){e.field;var n=e.form,r=(n.touched,n.errors,n.setFieldValue);n.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(w.ZP,{className:"react-select",classNamePrefix:"react-select",options:y,onChange:function(e){return r(t,e.value)},defaultValue:L}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})]})},V=function(){return(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{children:function(e){e.field;var n=e.form,r=(n.touched,n.errors,n.setFieldValue);n.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(w.ZP,{className:"react-select",classNamePrefix:"react-select",options:y,onChange:function(e){return r(t,e.map((function(e){return e.value})))},isMulti:!0}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})]})};return"password"===r?(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(x.Z.Label,{className:l,children:n}),d]}):null,(0,u.jsx)(o.gN,{name:t,children:function(e){var n=e.field,r=e.form,l=r.touched,c=r.errors;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(j.Z,{children:[(0,u.jsx)(x.Z.Control,(0,h.Z)((0,h.Z)({type:I?"text":"password",placeholder:s,className:a,isInvalid:!(!l[t]||!c[t])},n),{},{autoComplete:t})),(0,u.jsx)("div",{className:Z()("input-group-text","input-group-password",{"show-password":I}),"data-password":I?"true":"false",children:(0,u.jsx)("span",{className:"password-eye",onClick:function(){P(!I)}})})]}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})]}):"checkbox"===r||"radio"===r?(0,u.jsx)(x.Z.Group,{className:c,controlId:t,children:(0,u.jsx)(o.gN,{name:t,children:function(e){var s=e.field,l=e.form,c=(l.touched,l.errors),i=l.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(x.Z.Check,(0,h.Z)((0,h.Z)({type:r,label:n,className:a,isInvalid:!(!c||!c[t])},s),{},{checked:null===i||void 0===i?void 0:i[t]})),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",children:e})}})]})}})}):"code-input"===r?(0,u.jsx)(x.Z.Group,{className:c,controlId:t,children:(0,u.jsx)(o.gN,{name:t,children:function(e){e.field;var n=e.form,r=(n.touched,n.errors,n.values,n.setFieldValue);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(C(),{type:"string",fields:6,onChange:function(e){return r(t,e)}}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",children:e})}})]})}})}):"react-phone"===r?(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{name:t,children:function(e){e.field;var n=e.form,r=(n.touched,n.errors),s=n.setFieldValue;n.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(N(),{value:g,onChange:function(e){return s(t,e)},className:a,isInvalid:!(!r||!r[t])}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})]}):"simple-rich-edior"===r?(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{children:function(e){e.field;var n=e.form,r=(n.touched,n.errors,n.setFieldValue),s=n.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(b(),{value:null===s||void 0===s?void 0:s[t],onChange:function(e){return r(t,e)}}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})]}):"react-single-select"===r?(0,u.jsx)(z,{}):"react-multiple-select"===r?(0,u.jsx)(V,{}):"dropzone"===r?(0,u.jsx)(x.Z.Group,{className:c,controlId:t,children:(0,u.jsx)(o.gN,{name:t,children:function(e){e.field;var r=e.form,s=(r.touched,r.errors,r.setFieldValue);r.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(x.Z.Group,{className:"mb-3 mt-3 mt-xl-0",children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)("p",{className:"text-muted font-14",children:"Recommended thumbnail size 800x400 (px)."}),(0,u.jsx)(U,{onFileUpload:function(e){return s(t,e)}})]}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})}):"file"===r?(0,u.jsx)(x.Z.Group,{className:c,controlId:t,children:(0,u.jsx)(o.gN,{name:t,children:function(e){e.field;var c=e.form,i=c.touched,d=c.errors,h=c.setFieldValue;c.values;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(x.Z.Group,{className:"mb-3 mt-3 mt-xl-0",children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)("p",{className:"text-muted font-14",children:"Recommended thumbnail size 800x400 (px)."}),(0,u.jsx)(x.Z.Control,{type:r,placeholder:s,className:a,isInvalid:!(!i[t]||!d[t]),onChange:function(e){return M(e,h)}})]}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",style:{display:"block"},children:e})}})]})}})}):"textarea"===r?(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{name:t,children:function(e){var n=e.field,l=e.form,c=l.touched,i=l.errors;e.meta;return(0,u.jsxs)("div",{children:[(0,u.jsx)(x.Z.Control,(0,h.Z)((0,h.Z)({type:r,placeholder:s,className:a,isInvalid:!(!c[t]||!i[t]),as:"textarea",rows:5},n),{},{autoComplete:t})),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",children:e})}})]})}})]}):"date"===r?(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{name:t,children:function(e){e.field;var n=e.form,r=(n.touched,n.errors,n.setFieldValue),s=n.values;e.meta;return(0,u.jsxs)("div",{children:[(0,u.jsx)(q,{value:(null===s||void 0===s?void 0:s[t])&&new Date(null===s||void 0===s?void 0:s[t]),onChange:function(e){r(t,e)}}),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",children:e})}})]})}})]}):(0,u.jsxs)(x.Z.Group,{className:c,controlId:t,children:[n?(0,u.jsx)(x.Z.Label,{className:l,children:n}):null,(0,u.jsx)(o.gN,{name:t,children:function(e){var n=e.field,l=e.form,c=l.touched,i=l.errors;e.meta;return(0,u.jsxs)("div",{children:[(0,u.jsx)(x.Z.Control,(0,h.Z)((0,h.Z)({type:r,placeholder:s,className:a,isInvalid:!(!c[t]||!i[t])},n),{},{autoComplete:t,min:"1"})),(0,u.jsx)(o.Bc,{name:t,children:function(e){return(0,u.jsx)(x.Z.Control.Feedback,{type:"invalid",children:e})}})]})}})]})},E=r(14824),O=r(92157),A=function(){(0,c.$)().t;return(0,u.jsx)(t.Z,{className:"mt-3",children:(0,u.jsx)(s.Z,{className:"text-center"})})},_=function(){var e=(0,c.$)().t,n=l.Ry().shape({UserId:l.Z_().required(e("Please enter User ID")),Password:l.Z_().required(e("Please enter Password"))});return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(E.Z,{bottomLinks:(0,u.jsx)(A,{}),children:[(0,u.jsxs)("div",{className:"text-center w-75 m-auto",children:[(0,u.jsx)("h4",{className:"text-dark-50 text-center mt-0 fw-bold",children:e("Sign In")}),(0,u.jsx)("p",{className:"text-muted mb-4",children:e("Enter your User ID and password to access admin panel.")})]}),(0,u.jsxs)(d,{onSubmit:function(e){O.Z.LoginUser(e)},validationSchema:n,defaultValues:{UserId:"",Password:""},children:[(0,u.jsx)(T,{label:e("User Id"),type:"text",name:"UserId",placeholder:e("Enter your User ID"),containerClass:"mb-3"}),(0,u.jsx)(T,{label:e("Password"),type:"password",name:"Password",placeholder:e("Enter your Password"),containerClass:"mb-3"}),(0,u.jsx)("div",{className:"mb-3 mb-0 text-center",children:(0,u.jsx)(a.Z,{variant:"primary",type:"submit",disabled:!1,children:e("Log In")})})]})]})})}},74427:function(e,n,r){e.exports=r.p+"static/media/logo.0906190b2c1a7c5157e8.png"}}]);
//# sourceMappingURL=506.0ba58865.chunk.js.map