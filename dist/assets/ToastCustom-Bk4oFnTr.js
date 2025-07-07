import{c as s,r as a,j as e}from"./index-DhWYa8W4.js";import{X as h}from"./x-Drps6sCP.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=s("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),y=({message:l,type:t="success",duration:c=4e3})=>{const[i,r]=a.useState(!0);if(a.useEffect(()=>{const m=setTimeout(()=>r(!1),c);return()=>clearTimeout(m)},[c]),!i)return null;const n={success:"bg-green-500 text-white",error:"bg-red-500 text-white",warning:"bg-yellow-500 text-black"},o={success:p,error:u,warning:d}[t];return e.jsx("div",{className:"fixed top-5 right-5 z-50",children:e.jsxs("div",{className:`flex items-center gap-3 p-4 rounded-lg shadow-lg ${n[t]}`,children:[e.jsx(o,{className:"w-6 h-6"}),e.jsx("span",{className:"text-sm font-medium",children:l}),e.jsx("button",{onClick:()=>r(!1),className:"ml-auto",children:e.jsx(h,{className:"w-5 h-5"})})]})})};export{y as C};
