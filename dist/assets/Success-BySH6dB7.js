import{A as h,r as n,x as j,j as e,C as p,z as i}from"./index-Dnxtm2pS.js";import{B as r}from"./button-ujtkwOP2.js";import{C as g}from"./circle-check-big-DeL1DauF.js";const N="http://localhost:9090/order/customer",b=async a=>(await h.post(`${N}/success`,{token:a})).data,v=()=>{const[a,c]=n.useState(),{token:t}=j(),[o,m,d]=n.useActionState(async(y,x)=>{var l;try{const s=await b(x.slice(6));return c(s),null}catch(s){return((l=s==null?void 0:s.response)==null?void 0:l.data)||"Error de autenticación"}},null);return n.useEffect(()=>{t&&m(t)},[t]),e.jsx("div",{className:"min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4",children:d?e.jsxs("div",{className:"h-screen w-full flex justify-center items-center flex-col gap-1",children:[e.jsx("p",{className:"loader"}),e.jsx("span",{children:"Recuperando datos"})]}):e.jsx("div",{className:"w-full max-w-md",children:o?e.jsxs("div",{className:"text-center flex flex-col gap-4",children:[e.jsx("h3",{children:"Sesion exipirada"}),e.jsx(r,{className:"w-full bg-black hover:bg-gray-800 text-white",onClick:()=>window.window.location.href="/",children:"Voler al inicio"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4",children:e.jsx(g,{className:"h-10 w-10 text-green-600"})}),e.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Cita Confirmada!"}),e.jsx("p",{className:"text-gray-600 mt-2",children:"Su cita ha sido reservada con éxito."})]}),e.jsx(p,{className:"mb-6",children:e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Transaction Details"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Transaction ID"}),e.jsx("span",{className:"font-medium",children:a==null?void 0:a.ID})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Fecha de Aprobacion"}),e.jsx("span",{className:"font-medium",children:new Date(a!=null&&a.Created_at?a==null?void 0:a.Created_at:"").toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"})})]}),e.jsx(i,{className:"my-2"}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Servicio"}),e.jsx("span",{className:"font-medium",children:a==null?void 0:a.title})]}),e.jsx(i,{className:"my-2"}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Cita"}),e.jsxs("span",{className:"font-medium",children:[" ",new Date(a!=null&&a.schedule_day_date?a==null?void 0:a.schedule_day_date:"").toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"}),", ",a==null?void 0:a.schedule_start_time]})]}),e.jsx(i,{className:"my-2 border-b"}),e.jsxs("div",{className:"flex justify-between text-lg font-semibold",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{className:"text-green-400",children:["$",a==null?void 0:a.price.toFixed(2)]})]})]})]})}),e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6",children:[e.jsx("h3",{className:"font-medium text-amber-800 mb-2",children:"Importante"}),e.jsx("p",{className:"text-amber-700 text-sm",children:"Si necesita reprogramar el horario, hágalo con al menos 24 horas de anticipación."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{className:"w-full bg-black hover:bg-gray-800 text-white",onClick:()=>window.print(),children:"Descargar comprobante"}),e.jsx(r,{variant:"outline",className:"w-full",onClick:()=>window.window.location.href="/",children:"Voler al inicio"})]}),e.jsxs("div",{className:"text-center mt-8",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Gracias por elegir nuestra barberia!"}),e.jsxs("p",{className:"text-sm text-gray-500 mt-1",children:["Tenes una consulta? Comunicate con nostros en ",e.jsx("span",{className:"font-medium",children:"support@classiccuts.com"})]})]})]})})})};export{v as default};
