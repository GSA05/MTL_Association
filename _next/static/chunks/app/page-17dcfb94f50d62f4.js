(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{47943:function(){},55024:function(){},31216:function(e,t,n){Promise.resolve().then(n.bind(n,47104)),Promise.resolve().then(n.bind(n,87290)),Promise.resolve().then(n.bind(n,90541)),Promise.resolve().then(n.bind(n,15167)),Promise.resolve().then(n.bind(n,63776)),Promise.resolve().then(n.bind(n,58110))},47104:function(e,t,n){"use strict";n.r(t);var l=n(57437),i=n(67245),r=n(14703),a=n(30415),d=n.n(a),s=n(87623);function Changes(){let{changes:e}=(0,i.lx)(),t=(0,i.VW)();return(0,l.jsx)("section",{children:(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,l.jsx)("h1",{children:"Разница расчетного и текущего:"}),(null==e?void 0:e.length)>0?(0,l.jsxs)("table",{cellSpacing:"16px",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Аккаунт"}),(0,l.jsx)("th",{children:"Вес голоса"}),(0,l.jsx)("th",{children:"Изменения"})]})}),(0,l.jsx)("tbody",{children:null==e?void 0:e.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:(0,r.r)(e.id)}),(0,l.jsx)("td",{children:e.weight}),(0,l.jsx)("td",{children:e.diff})]},e.id))})]}):"Нет изменений",t&&(0,l.jsx)("p",{style:{width:"600px",wordWrap:"break-word"},children:t.toXDR().toString("base64")})]})})}t.default=d()(()=>Promise.resolve(Changes),{ssr:!1,loading:(0,s.a)()})},87290:function(e,t,n){"use strict";n.r(t);var l=n(57437),i=n(67245),r=n(14703),a=n(30415),d=n.n(a),s=n(87623);function CurrentC(){let{currentC:e,error:t,mutate:n,isLoading:a,isValidating:d}=(0,i.vP)();return(0,l.jsx)("section",{children:(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,l.jsx)("h1",{children:"Актуальный состав Совета"}),(a||d)&&(0,l.jsx)("div",{children:"Загрузка..."}),(0,l.jsxs)("table",{cellSpacing:"16px",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Аккаунт"}),(0,l.jsx)("th",{children:"Голоса"})]})}),(0,l.jsx)("tbody",{children:null==e?void 0:e.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:(0,r.r)(e.id)}),(0,l.jsx)("td",{children:e.count})]},e.id))})]})]})})}t.default=d()(()=>Promise.resolve(CurrentC),{ssr:!1,loading:(0,s.a)()})},90541:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var l=n(57437),i=n(14703),r=n(45266);let Tree=e=>{var t;let{member:n}=e,a=(0,r.z)(n);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("li",{children:(0,l.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,i.r)(n.id)," ",a-n.count>0?a+" = "+n.count+" + "+(a-n.count):a]})},n.id),!!(null===(t=n.children)||void 0===t?void 0:t.length)&&(0,l.jsx)("ul",{children:n.children.map(e=>(0,l.jsx)(Tree,{member:e},"".concat(e.id,"_children")))},"".concat(n.id,"_children"))]})};var a=n(67245),d=n(30415),s=n.n(d),o=n(87623);function DelegateTree(){var e,t;let{tree:n,isLoading:i,isValidating:d,mutate:s,error:o}=(0,a.Aj)();return(0,l.jsx)("section",{children:(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,l.jsx)("h1",{children:"Проверка делегаций для Совета:"}),(i||d)&&(0,l.jsx)("div",{children:"Загрузка..."}),(0,l.jsx)("ul",{children:null==n?void 0:null===(t=n.map(e=>({...e,delegations:(0,r.z)(e)})))||void 0===t?void 0:null===(e=t.sort((e,t)=>t.delegations-e.delegations||e.id.localeCompare(t.id)))||void 0===e?void 0:e.map((e,t)=>(0,l.jsxs)("div",{children:[e.count>0?(0,l.jsx)(Tree,{member:e},e.id):null,19===t&&(0,l.jsx)("hr",{})]},e.id))},"tree"),o&&(0,l.jsx)("div",{style:{color:"red"},children:o()})]})})}var c=s()(()=>Promise.resolve(DelegateTree),{ssr:!1,loading:(0,o.a)()})},14703:function(e,t,n){"use strict";n.d(t,{r:function(){return Link}});var l=n(57437);let Link=e=>e?(0,l.jsx)("a",{href:"https://stellar.expert/explorer/public/account/".concat(e),target:"_blank",className:"stellar_address",children:e.replace(e.substring(4,e.length-4),"...")}):null},87623:function(e,t,n){"use strict";n.d(t,{a:function(){return Loader}});var l=n(57437);let Loader=()=>()=>(0,l.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:(0,l.jsx)("div",{children:"Загрузка..."})})},15167:function(e,t,n){"use strict";n.r(t);var l=n(57437),i=n(67245),r=n(14703),a=n(30415),d=n.n(a),s=n(87623),o=n(24033);function Members(){var e,t;let{members:n,isLoading:a,isValidating:d,mutate:s}=(0,i.Y5)(),c=(0,o.useRouter)();return c.replace("https://voleum-org.github.io/MTL_Association"),(0,l.jsx)("section",{children:(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,l.jsx)("h1",{children:"Индивидуальные участники Ассоциации"}),(a||d)&&(0,l.jsx)("div",{children:"Загрузка..."}),(0,l.jsxs)("table",{cellSpacing:"16px",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{}),(0,l.jsx)("th",{children:"Аккаунт"}),(0,l.jsx)("th",{children:"MTLAP"}),(0,l.jsx)("th",{children:"Делегат в Собрании"}),(0,l.jsx)("th",{children:"Делегат в Совете"})]})}),(0,l.jsx)("tbody",{children:null===(t=n.filter(e=>!e.removed))||void 0===t?void 0:null===(e=t.sort((e,t)=>t.count-e.count||e.id.localeCompare(t.id)))||void 0===e?void 0:e.map((e,t)=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{style:{textAlign:"right",paddingRight:"16px"},children:t+1}),(0,l.jsx)("td",{children:(0,r.r)(e.id)}),(0,l.jsx)("td",{children:e.count}),(0,l.jsx)("td",{children:(0,r.r)(e.delegateA)}),(0,l.jsx)("td",{children:(0,r.r)(e.delegateC)})]},e.id))})]})]})})}t.default=d()(()=>Promise.resolve(Members),{ssr:!1,loading:(0,s.a)()})},63776:function(e,t,n){"use strict";n.r(t);var l=n(57437),i=n(14703),r=n(67245),a=n(30415),d=n.n(a),s=n(87623);function NewC(){let{newC:e,isLoading:t,isValidating:n,mutate:a}=(0,r.Wt)();return(0,l.jsx)("section",{children:(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,l.jsx)("h1",{children:"Ожидаемый состав Совета"}),(t||n)&&(0,l.jsx)("div",{children:"Загрузка..."}),(0,l.jsxs)("table",{cellSpacing:"16px",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Аккаунт"}),(0,l.jsx)("th",{children:"Токены"}),(0,l.jsx)("th",{children:"Голоса"})]})}),(0,l.jsx)("tbody",{children:null==e?void 0:e.map(e=>{var t,n;return(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:(0,i.r)(e.id)}),(0,l.jsx)("td",{children:null!==(t=e.delegations)&&void 0!==t&&t?e.count+" = "+(e.count-(null!==(n=e.delegations)&&void 0!==n?n:0))+" + "+e.delegations:e.count}),(0,l.jsx)("td",{children:e.weight})]},e.id)})})]})]})})}t.default=d()(()=>Promise.resolve(NewC),{ssr:!1,loading:(0,s.a)()})},58110:function(e,t,n){"use strict";n.r(t);var l=n(57437),i=n(67245),r=n(30415),a=n.n(r);function Refresh(){let{changes:e,isLoading:t,isValidating:n,mutate:r,date:a}=(0,i.lx)();return(0,l.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:t||n?(0,l.jsx)("div",{children:"Загрузка..."}):(0,l.jsxs)(l.Fragment,{children:["Данные на ",a&&new Date(a).toLocaleString(),(0,l.jsx)("button",{onClick:()=>{localStorage.clear(),r()},style:{width:"320px",height:"32px",margin:"16px"},children:"Обновить"})]})})}t.default=a()(()=>Promise.resolve(Refresh),{ssr:!1})},67245:function(e,t,n){"use strict";n.d(t,{lx:function(){return T},vP:function(){return C},Y5:function(){return P},Wt:function(){return S},VW:function(){return I},Aj:function(){return D}});var l=n(57437),i=n(69108),r=n(42333);let a={mainAccount:"GCNVDZIHGX473FEI7IXCUAEXUJ4BGCKEMHF36VYP5EMS7PX2QBLAMTLA",mtlapToken:"MTLAP"};var d=n(7006),s=n.n(d),o=n(30954),c=n.n(o),u=n(47520),h=n.n(u),g=n(48911),m=n.n(g),v=n(83705),x=n.n(v),f=n(92166),j=n(45266),p=n(14703),b=n(2265),y=n(30210);let w=new i.Server("https://horizon.stellar.org"),_=new i.Asset(a.mtlapToken,a.mainAccount),C=(0,y.sU)({currentC:[],error:null,isLoading:!1,isValidating:!1,mutate:()=>Promise.resolve(void 0)},()=>{let e=(0,r.ZP)("currentC",async()=>{var e,t;let n=JSON.parse((null===(e=localStorage)||void 0===e?void 0:e.getItem("currentC"))||"null"),l=new Date;if(l.setDate(l.getDate()-1),!(!n||!n.data||new Date(n.date).getTime()<l.getTime()))return n.data;{let e=await w.loadAccount(a.mainAccount);return null===(t=localStorage)||void 0===t||t.setItem("currentC",JSON.stringify({data:e,date:new Date})),e}},{revalidateOnFocus:!1,revalidateIfStale:!1}),{data:t,error:n,mutate:l,isLoading:i,isValidating:d}=e,s=(0,b.useMemo)(()=>null==t?void 0:t.signers.filter(e=>e.key!==a.mainAccount).map(e=>({id:e.key,count:e.weight})).sort((e,t)=>t.count-e.count),[t]);return{currentC:s,error:n,mutate:l,isLoading:i,isValidating:d}}),asyncWhile=async function(e,t){var n;let l=await t();return(e=e.concat(null==l?void 0:l.records),(null==l?void 0:null===(n=l.records)||void 0===n?void 0:n.length)>0)?await asyncWhile(e,l.next):e},P=(0,y.sU)({data:[],isLoading:!1,isValidating:!1,members:[],mutate:()=>Promise.resolve(void 0),date:null},()=>{var e;let t=JSON.parse((null===(e=localStorage)||void 0===e?void 0:e.getItem("members"))||"null"),n=(null==t?void 0:t.date)||null,l=(0,r.ZP)("members",async()=>{let e=JSON.parse(localStorage.getItem("members")||"null"),t=new Date;if(t.setDate(t.getDate()-1),!(!e||new Date(e.date).getTime()<t.getTime()))return e.data;{var n;let e=[],t=await w.accounts().forAsset(_).call();return e=e.concat(t.records,await asyncWhile(e,t.next)),null===(n=localStorage)||void 0===n||n.setItem("members",JSON.stringify({data:e,date:new Date})),e}},{revalidateOnFocus:!1,revalidateIfStale:!1}),[i,a]=(0,b.useMemo)(()=>{var e;let t=[],n=[];return null==l||null===(e=l.data)||void 0===e||e.forEach(e=>{var l;let i=atob(e.data_attr.mtla_a_delegate||e.data_attr.mtla_delegate||""),r=atob(e.data_attr.mtla_c_delegate||e.data_attr.mtla_delegate||"");""!==i&&n.push(i),""!==r&&n.push(r),t.push({id:e.account_id,count:Number((null===(l=e.balances.find(e=>"credit_alphanum12"===e.asset_type&&e.asset_code===_.getCode()&&e.asset_issuer===_.getIssuer()))||void 0===l?void 0:l.balance)||0),delegateA:i,delegateC:r})}),[t,n]},[l.data]),[d,s]=(0,b.useState)([]);return(0,b.useEffect)(()=>{(async()=>{let e=c()(m()(a),i,(e,t)=>e===t.id);(null==e?void 0:e.length)>0&&s(await enrichMembers(x()(i,"id"),e,10))})()},[i,a,n]),{data:l.data,isLoading:l.isLoading,isValidating:l.isValidating,mutate:l.mutate,members:d,date:n}}),D=(0,y.sU)({tree:[],isLoading:!1,isValidating:!1,error:void 0,mutate:()=>Promise.resolve(void 0),date:null},()=>{let{members:e,isLoading:t,isValidating:n,mutate:i,date:r}=P(),[a,d]=(0,b.useMemo)(()=>{let t;let n=(0,f.arrayToTree)(e,{parentId:"delegateC",dataField:null});try{(0,f.arrayToTree)(e,{parentId:"delegateC",dataField:null,throwIfOrphans:!0})}catch(n){var i;let e=null===(i=/\[(.+?)\]/.exec(n))||void 0===i?void 0:i[1];t=()=>(0,l.jsxs)(l.Fragment,{children:["В делигациях есть циклические ссылки или ссылки на недействительных участников",e?(0,l.jsxs)(l.Fragment,{children:[" (",(0,p.r)(e),")"]}):"","!"]})}return[n,t]},[e]);return{tree:a,isLoading:t,isValidating:n,mutate:i,error:d,date:r}}),S=(0,y.sU)({newC:[],isLoading:!1,isValidating:!1,mutate:()=>Promise.resolve(void 0),date:null},()=>{let{tree:e,isLoading:t,isValidating:n,mutate:l,date:i}=D(),r=(0,b.useMemo)(()=>e.filter(e=>e.count>0).map(e=>({...e,count:(0,j.z)(e),delegations:(0,j.z)(e)-e.count,weight:Math.floor(Math.log10(Math.max((0,j.z)(e),2)-1)+1)})).splice(0,20).sort((e,t)=>t.count-e.count||e.id.localeCompare(t.id)),[e]);return{newC:r,isLoading:t,isValidating:n,mutate:l,date:i}}),T=(0,y.sU)({changes:[],isLoading:!1,isValidating:!1,mutate:()=>[Promise.resolve(void 0),Promise.resolve(void 0)],date:null},()=>{let{currentC:e=[],mutate:t,isLoading:n,isValidating:l}=C(),{newC:i,isLoading:r,isValidating:a,mutate:d,date:o}=S(),c=(0,b.useMemo)(()=>{if(!(null==i?void 0:i.length)||!(null==e?void 0:e.length))return[];let t={},n=s()(e,i,"id");n.forEach(e=>t[e.id]=0);let l=s()(i,e,"id");l.forEach(e=>t[e.id]=e.weight);let r=h()(i,e,(e,t)=>e.id===t.id&&e.weight!==t.count);r.forEach(e=>t[e.id]=e.weight);let a=e.reduce((e,t)=>({...e,[t.id]:t.count}),{});return Object.keys(t).map(e=>{var n;let l=null!==(n=a[e])&&void 0!==n?n:0,i=t[e];return{id:e,weight:i,diff:0===l?"новый":i<l?"- ".concat(l-i):"+ ".concat(i-l)}})},[e,i]),u=(0,b.useCallback)(()=>[d(),t()],[d,t]),g=(0,b.useMemo)(()=>r||n,[r,n]),m=(0,b.useMemo)(()=>a||l,[a,l]);return{changes:c,isLoading:g,isValidating:m,mutate:u,date:o}}),enrichMembers=async(e,t,n)=>{let l=[...e],i=[];if(n>0&&(null==t?void 0:t.length)>0){(await Promise.all(t.map(async e=>{var t,n,l;let r=JSON.parse((null===(t=localStorage)||void 0===t?void 0:t.getItem("accounts"))||"null"),a=new Date;a.setDate(a.getDate()-1);let d=null==r?void 0:null===(n=r.data)||void 0===n?void 0:n[e];if(!(!d||new Date(r.date).getTime()<a.getTime()))return d;{let t=await w.loadAccount(e),n=atob(t.data_attr.mtla_a_delegate||t.data_attr.mtla_delegate||""),a=atob(t.data_attr.mtla_c_delegate||t.data_attr.mtla_delegate||"");""!==n&&i.push(n),""!==a&&i.push(a);let d={id:e,count:0,delegateA:n,delegateC:a,removed:!0};return r={data:{...null==r?void 0:r.data,[e]:d},date:new Date},null===(l=localStorage)||void 0===l||l.setItem("accounts",JSON.stringify(r)),d}}))).forEach(e=>l.push(e));let e=c()(m()(i),l,(e,t)=>e===t.id);(null==e?void 0:e.length)>0&&(l=await enrichMembers(l,e,n-1))}return l},I=(0,y.sU)(null,()=>{let{newC:e,isLoading:t}=S(),{changes:n,isLoading:l}=T(),d=(0,r.ZP)((null==e?void 0:e.length)>0&&(null==n?void 0:n.length)>0&&!t&&!l&&"account",()=>w.loadAccount(a.mainAccount),{revalidateOnFocus:!1,revalidateIfStale:!1}),s=(0,b.useMemo)(()=>{if(!((null==e?void 0:e.length)>0&&(null==n?void 0:n.length)>0&&!t&&!l))return null;let r=e.reduce((e,t)=>e+t.weight,0),a=Math.floor(r/2+1);if(d.data){let e=new i.TransactionBuilder(d.data,{fee:"100000",networkPassphrase:i.Networks.PUBLIC});e.addMemo(i.Memo.text("Update sign weights"));let t=0,l=n[n.length-1];if(n.forEach(n=>{let r=i.Operation.setOptions({signer:{ed25519PublicKey:i.Keypair.fromPublicKey(n.id).publicKey(),weight:n.weight},...l.id===n.id&&{masterWeight:0,lowThreshold:a,medThreshold:a,highThreshold:a}});e.addOperation(r),t++}),t)return e.setTimeout(30).build().toEnvelope()}return null},[e,n,t,l,d.data]);return s})},45266:function(e,t,n){"use strict";n.d(t,{z:function(){return sumCount}});let sumCount=e=>{var t,n;return e?e.count+ +((null===(t=e.children)||void 0===t?void 0:t.length)?null===(n=e.children)||void 0===n?void 0:n.map(sumCount).reduce((e,t)=>e+t,0):0):0}}},function(e){e.O(0,[638,488,971,864,744],function(){return e(e.s=31216)}),_N_E=e.O()}]);