import{r as a,D as r,j as e,B as i}from"./index-Dnxtm2pS.js";const o=()=>{const{filteredSchedulesByDay:l,SelectScheduleTimeHandler:t}=a.useContext(r);return console.log(l),e.jsx("section",{className:"w-full h-full p-4 bg-gray-50 overflow-hidden overflow-y-scroll",children:l&&l.length>0?e.jsx("ul",{className:"space-y-4  ",children:l.map(s=>e.jsxs("li",{className:"flex items-center justify-between p-4 rounded-lg border shadow-sm hover:bg-slate-100 hover:scale-[1.01] transition-all",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-lg font-semibold text-gray-800",children:s.Start_time}),e.jsx("p",{className:`text-sm ${s.Available?"text-green-600":"text-gray-500"}`,children:s.Available?"Disponible":"Ocupado"})]}),e.jsx("div",{children:s.Available?e.jsx(i,{text:"Reservar",onClickAction:()=>t(s)}):e.jsx("span",{className:"px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg select-none",children:"No Disponible"})})]},s.ID))}):e.jsx("div",{className:"flex items-center justify-center h-full",children:e.jsx("span",{className:"text-gray-700 text-lg",children:"No hay horarios disponibles."})})})};export{o as default};
