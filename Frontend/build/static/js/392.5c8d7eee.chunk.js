"use strict";(self.webpackChunkcollege_erp=self.webpackChunkcollege_erp||[]).push([[392],{99392:function(A,e,s){s.r(e),s.d(e,{default:function(){return E}});var a=s(29439),n=s(72791),l=s(11087),i=s(59434),o=s(41418),t=s.n(o),c=s(31955),r=s(48771),d=s(24500),u=s(59569),p=s(80184),m=function(A){var e=u,s=(0,n.useState)(!1),o=(0,a.Z)(s,2),c=o[0],m=o[1],B=(0,i.I0)(),j=function(){m(!c)};return(0,p.jsxs)(r.Z,{show:c,onToggle:j,children:[(0,p.jsxs)(r.Z.Toggle,{variant:"link",id:"dropdown-profile",as:l.rU,to:"#",onClick:j,className:"nav-link dropdown-toggle nav-user arrow-none me-0",children:[(0,p.jsx)("span",{className:"account-user-avatar",children:(0,p.jsx)("img",{src:e,className:"rounded-circle",alt:"user"})}),(0,p.jsx)("span",{children:(0,p.jsx)("span",{className:"account-position",children:A.userTitle})})]}),(0,p.jsx)(r.Z.Menu,{align:"end",className:"dropdown-menu-animated topbar-dropdown-menu profile-dropdown",children:(0,p.jsxs)("div",{onClick:j,children:[(0,p.jsx)("div",{className:"dropdown-header noti-title",children:(0,p.jsx)("h6",{className:"text-overflow m-0",children:"Welcome !"})}),A.menuItems.map((function(A,e){return"Logout"===A.label?(0,p.jsxs)(l.rU,{onClick:function(){return B((0,d.hf)())},to:A.redirectTo,className:"dropdown-item notify-item",children:[(0,p.jsx)("i",{className:t()(A.icon,"me-1")}),(0,p.jsx)("span",{children:A.label})]},e+"-profile-menu"):(0,p.jsxs)(l.rU,{to:A.redirectTo,className:"dropdown-item notify-item",children:[(0,p.jsx)("i",{className:t()(A.icon,"me-1")}),(0,p.jsx)("span",{children:A.label})]},e+"-profile-menu")}))]})})]})},B=s(45184),j=s(51140),Q=s(74427),x=[{label:"Logout",icon:"mdi mdi-logout",redirectTo:"/account/logout"}],E=function(A){var e=A.hideLogo,s=A.navCssClasses,o=A.openLeftMenuCallBack,r=A.topbarDark,d=(0,i.I0)(),u=(0,n.useState)(!1),E=(0,a.Z)(u,2),R=E[0],N=E[1],v=(0,i.v9)((function(A){return A.User})).UserDetails,f=s||"",g=e?"":"container-fluid",w=(0,i.v9)((function(A){return A.Setting})),F=w.LayoutType,U=w.LeftSideBarType,W=(w.LayoutColor,function(){switch(N((function(A){return!A})),o&&o(),F){case c.RR:window.innerWidth>=768&&("fixed"!==U&&"scrollable"!==U||d((0,c.Pr)(c.H9)),"condensed"===U&&d((0,c.Pr)(c.Qi)));break;case c.D5:document.body&&document.body.classList.toggle("hide-menu")}});return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("div",{className:t()("navbar-custom",f),children:(0,p.jsxs)("div",{className:g,children:[!e&&(0,p.jsxs)(l.rU,{to:"/",className:"topnav-logo",children:[(0,p.jsx)("span",{className:"topnav-logo-lg",children:(0,p.jsx)("img",{src:Q,alt:"logo",height:"16"})}),(0,p.jsx)("span",{className:"topnav-logo-sm",children:(0,p.jsx)("img",{src:r?j:B,alt:"logo",height:"16"})})]}),(0,p.jsx)("ul",{className:"list-unstyled topbar-menu float-end mb-0",children:(0,p.jsx)("li",{className:"dropdown notification-list",children:(0,p.jsx)(m,{profilePic:null===v||void 0===v?void 0:v.Image,menuItems:x,username:(null===v||void 0===v?void 0:v.FirstName)+" "+(null===v||void 0===v?void 0:v.LastName),userTitle:null===v||void 0===v?void 0:v.Roles})})}),(F===c.RR||F===c.D5)&&(0,p.jsx)("button",{className:"button-menu-mobile open-left",onClick:W,children:(0,p.jsx)("i",{className:"mdi mdi-menu"})}),F===c.py&&(0,p.jsx)(l.rU,{to:"#",className:t()("navbar-toggle",{open:R}),onClick:W,children:(0,p.jsxs)("div",{className:"lines",children:[(0,p.jsx)("span",{}),(0,p.jsx)("span",{}),(0,p.jsx)("span",{})]})}),F===c.vt&&(0,p.jsx)(l.rU,{to:"#",className:"button-menu-mobile disable-btn",onClick:W,children:(0,p.jsxs)("div",{className:"lines",children:[(0,p.jsx)("span",{}),(0,p.jsx)("span",{}),(0,p.jsx)("span",{})]})})]})})})}},74427:function(A,e,s){A.exports=s.p+"static/media/logo.0906190b2c1a7c5157e8.png"},51140:function(A,e,s){A.exports=s.p+"static/media/logo_sm.832f238cae7cd6f2f4b6.png"},45184:function(A,e,s){A.exports=s.p+"static/media/logo_sm_dark.832f238cae7cd6f2f4b6.png"},59569:function(A){A.exports="data:image/jpeg;base64,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"}}]);
//# sourceMappingURL=392.5c8d7eee.chunk.js.map