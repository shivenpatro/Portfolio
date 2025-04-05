"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[143],{9143:(e,t,i)=>{i.r(t),i.d(t,{ResumeModal:()=>h});var a=i(4994),s=i(8112),r=i(7819),n=i(7694);let o=(0,n.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var l=i(8063);let c=(0,n.A)("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);var d=i(343),m=i(3802);let h=e=>{let{isOpen:t,onClose:i}=e,[n,h]=(0,m.useState)({dataScienceResumeExists:!1,softwareEngineeringResumeExists:!1});(0,m.useEffect)(()=>{let e=async()=>{try{let e=!1,t=!1;try{e=(await fetch("/Shiven_Data_Science_Resume.pdf",{method:"HEAD",headers:{"Cache-Control":"no-cache"}})).ok}catch(e){console.log("Could not check data science resume")}try{t=(await fetch("/Shiven_Softeware_Engineering_Resume.pdf",{method:"HEAD",headers:{"Cache-Control":"no-cache"}})).ok}catch(e){console.log("Could not check software engineering resume")}h({dataScienceResumeExists:e,softwareEngineeringResumeExists:t})}catch(e){console.error("Error checking resume files:",e),h({dataScienceResumeExists:!1,softwareEngineeringResumeExists:!1})}};t&&e()},[t]);let x=e=>{let t="data-science"===e?"Shiven_Data_Science_Resume.pdf":"Shiven_Softeware_Engineering_Resume.pdf";if(!("data-science"===e?n.dataScienceResumeExists:n.softwareEngineeringResumeExists)){alert("The ".concat(e," resume is not available yet. Please upload it to the public folder."));return}let a=document.createElement("a");a.href="/".concat(t),a.setAttribute("download",t),a.setAttribute("target","_blank"),document.body.appendChild(a),a.click(),document.body.removeChild(a),i()};return(0,a.jsx)(s.N,{children:t&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.P.div,{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:i}),(0,a.jsx)(r.P.div,{className:"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md",initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},transition:{type:"spring",damping:20,stiffness:300},children:(0,a.jsx)("div",{className:"bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-indigo-500/20",children:(0,a.jsxs)("div",{className:"relative p-6",children:[(0,a.jsx)(r.P.button,{className:"absolute top-4 right-4 text-gray-400 hover:text-white",onClick:i,whileHover:{rotate:90},transition:{duration:.2},children:(0,a.jsx)(o,{className:"w-6 h-6"})}),(0,a.jsx)("h3",{className:"text-2xl font-bold mb-2 text-white",children:"Choose Resume Type"}),(0,a.jsx)("p",{className:"text-gray-300 mb-6",children:"Select the resume that best matches your interests"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)(r.P.button,{className:"group relative flex flex-col items-center p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-500/30 hover:border-indigo-400 transition-all duration-300",onClick:()=>x("data-science"),whileHover:{y:-5},transition:{type:"spring",stiffness:400,damping:10},disabled:!n.dataScienceResumeExists,children:[(0,a.jsx)(r.P.div,{className:"absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",initial:{opacity:0},whileHover:{opacity:1}}),(0,a.jsxs)("div",{className:"relative z-10 flex flex-col items-center",children:[(0,a.jsx)("div",{className:"mb-4 p-3 bg-indigo-600/30 rounded-full",children:(0,a.jsx)(l.A,{className:"w-8 h-8 text-indigo-300"})}),(0,a.jsx)("h4",{className:"text-xl font-semibold text-white mb-2",children:"Data Science"}),(0,a.jsx)("p",{className:"text-gray-300 text-center text-sm",children:"ML, Data Analysis & AI focused resume"}),(0,a.jsxs)(r.P.div,{className:"mt-4 flex items-center text-indigo-400 font-medium",initial:{x:-5,opacity:0},whileHover:{x:0,opacity:1},children:[(0,a.jsx)(c,{className:"w-4 h-4 mr-1"})," Download"]})]})]}),(0,a.jsxs)(r.P.button,{className:"group relative flex flex-col items-center p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-all duration-300",onClick:()=>x("software-engineering"),whileHover:{y:-5},transition:{type:"spring",stiffness:400,damping:10},disabled:!n.softwareEngineeringResumeExists,children:[(0,a.jsx)(r.P.div,{className:"absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",initial:{opacity:0},whileHover:{opacity:1}}),(0,a.jsxs)("div",{className:"relative z-10 flex flex-col items-center",children:[(0,a.jsx)("div",{className:"mb-4 p-3 bg-purple-600/30 rounded-full",children:(0,a.jsx)(d.A,{className:"w-8 h-8 text-purple-300"})}),(0,a.jsx)("h4",{className:"text-xl font-semibold text-white mb-2",children:"Software Engineering"}),(0,a.jsx)("p",{className:"text-gray-300 text-center text-sm",children:"Web Dev, Programming & Software focused resume"}),(0,a.jsxs)(r.P.div,{className:"mt-4 flex items-center text-purple-400 font-medium",initial:{x:-5,opacity:0},whileHover:{x:0,opacity:1},children:[(0,a.jsx)(c,{className:"w-4 h-4 mr-1"})," Download"]})]})]})]}),(!n.dataScienceResumeExists||!n.softwareEngineeringResumeExists)&&(0,a.jsx)("p",{className:"mt-4 text-amber-400 text-sm text-center",children:"Note: Please upload your resume PDFs to the public folder for the download functionality to work properly."})]})})})]})})}}}]);