import{c as s,r as a,j as e}from"./index-Dnxtm2pS.js";import{C as h}from"./circle-check-big-DeL1DauF.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=s("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),f=({message:l,type:t="success",duration:r=4e3})=>{const[i,c]=a.useState(!0);if(a.useEffect(()=>{const m=setTimeout(()=>c(!1),r);return()=>clearTimeout(m)},[r]),!i)return null;const n={success:"bg-green-500 text-white",error:"bg-red-500 text-white",warning:"bg-yellow-500 text-black"},o={success:h,error:u,warning:d}[t];return e.jsx("div",{className:"fixed top-5 right-5 z-50",children:e.jsxs("div",{className:`flex items-center gap-3 p-4 rounded-lg shadow-lg ${n[t]}`,children:[e.jsx(o,{className:"w-6 h-6"}),e.jsx("span",{className:"text-sm font-medium",children:l}),e.jsx("button",{onClick:()=>c(!1),className:"ml-auto",children:e.jsx(p,{className:"w-5 h-5"})})]})})};export{f as C};
