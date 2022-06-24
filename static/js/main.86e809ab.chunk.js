(this["webpackJsonpqped-github-pages"]=this["webpackJsonpqped-github-pages"]||[]).push([[0],{539:function(e){e.exports=JSON.parse('{"type":"object","properties":{"name":{"type":"string","minLength":1},"description":{"title":"Long Description","type":"string"},"done":{"type":"boolean"},"due_date":{"type":"string","format":"date"},"rating":{"type":"integer","maximum":5},"recurrence":{"type":"string","enum":["Never","Daily","Weekly","Monthly"]},"recurrence_interval":{"type":"integer"}},"required":["name","due_date"]}')},540:function(e){e.exports=JSON.parse('{"type":"VerticalLayout","elements":[{"type":"Control","label":"Completed","scope":"#/properties/done"},{"type":"Control","scope":"#/properties/name"},{"type":"HorizontalLayout","elements":[{"type":"Control","scope":"#/properties/due_date"},{"type":"Control","scope":"#/properties/rating"}]},{"type":"HorizontalLayout","elements":[{"type":"Control","scope":"#/properties/recurrence"},{"type":"Control","scope":"#/properties/recurrence_interval","rule":{"effect":"HIDE","condition":{"type":"LEAF","scope":"#/properties/recurrence","expectedValue":"Never"}}}]},{"type":"Control","scope":"#/properties/description","options":{"multi":true}}]}')},815:function(e,t,r){},870:function(e,t,r){"use strict";r.r(t);var n=r(80),a=r(931),o=r(354),i=r(83),c=r.n(i),s=r(11),l=r(16),p=r(0),d=r(22),u=r(536),m=r(493),j=r(279),b=r.p+"static/media/logo.103b5fa1.svg",h=(r(815),r(539)),g=r(540),O=r(351),y=r(500),f=r(2),x=function(e){var t=e.id,r=e.value,n=e.updateValue,a=Object(p.useState)(null),o=Object(s.a)(a,2),i=o[0],c=o[1];return Object(f.jsxs)("div",{id:"#/properties/rating",className:"rating",children:[Object(f.jsx)(y.a,{shrink:!0,style:{marginTop:"0.8em"},children:"Rating"}),Object(f.jsx)("div",{style:{cursor:"pointer",fontSize:"18px"},children:[0,1,2,3,4].map((function(e){var a=null!==i&&void 0!==i?i:r;return Object(f.jsx)("span",{onMouseOver:function(){return c(e+1)},onMouseOut:function(){return c(null)},onClick:function(){return n(e+1)},children:e<a?"\u2605":"\u2606"},"".concat(t,"_").concat(e))}))})]})},v=Object(d.withJsonFormsControlProps)((function(e){var t=e.data,r=e.handleChange,n=e.path;return Object(f.jsx)(x,{value:t,updateValue:function(e){return r(n,e)}})})),C=r(18),N=Object(C.rankWith)(3,Object(C.scopeEndsWith)("rating")),k=r(930),A=Object(k.a)({container:{padding:"1em",width:"100%"},title:{textAlign:"center",padding:"0.25em"},dataContent:{display:"flex",justifyContent:"center",borderRadius:"0.25em",backgroundColor:"#cecece",marginBottom:"1rem"},resetButton:{margin:"auto !important",display:"block !important"},demoform:{margin:"auto",padding:"1rem"}}),D={name:"Send email to Adrian",description:"Confirm if you have passed the subject\nHereby ...",done:!0,recurrence:"Daily",rating:3},E=[].concat(Object(l.a)(O.materialRenderers),[{tester:N,renderer:v}]),J=function(){var e=A(),t=Object(p.useState)(D),r=Object(s.a)(t,2),n=r[0],a=r[1],o=Object(p.useMemo)((function(){return JSON.stringify(n,null,2)}),[n]);return Object(f.jsxs)(p.Fragment,{children:[Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)("img",{src:b,className:"App-logo",alt:"logo"}),Object(f.jsx)("h1",{className:"App-title",children:"Welcome to the QPED-project's configurator"}),Object(f.jsx)("p",{className:"App-intro",children:"Easily configure our checkers for Quarterfall."})]})}),Object(f.jsxs)(u.a,{container:!0,justifyContent:"center",spacing:1,className:e.container,children:[Object(f.jsxs)(u.a,{item:!0,sm:6,children:[Object(f.jsx)(j.a,{variant:"h4",className:e.title,children:"Configuration Editor"}),Object(f.jsx)("div",{className:e.demoform,children:Object(f.jsx)(d.JsonForms,{schema:h,uischema:g,data:n,renderers:E,cells:O.materialCells,onChange:function(e){e.errors;var t=e.data;return a(t)}})})]}),Object(f.jsxs)(u.a,{item:!0,sm:6,children:[Object(f.jsx)(j.a,{variant:"h4",className:e.title,children:"Configuration Data"}),Object(f.jsx)("div",{className:e.dataContent,children:Object(f.jsx)("pre",{id:"boundData",children:o})}),Object(f.jsx)(m.a,{className:e.resetButton,onClick:function(){navigator.clipboard.writeText(n)},color:"primary",variant:"contained",children:"Copy to clipboard"}),Object(f.jsx)(m.a,{className:e.resetButton,onClick:function(){a({})},color:"primary",variant:"contained",children:"Clear data"})]})]})]})},S=Object(n.b)({components:{MuiFormControl:{styleOverrides:{root:{margin:"0.8em 0"}}}}});c.a.render(Object(f.jsxs)(a.a,{theme:S,children:[Object(f.jsx)(o.b,{}),Object(f.jsx)(J,{})]}),document.getElementById("root"))}},[[870,1,2]]]);
//# sourceMappingURL=main.86e809ab.chunk.js.map