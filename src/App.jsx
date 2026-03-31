import { useState, useEffect, useCallback } from "react";

const LOGO_NAV = "data:image/png;base64,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";
const LOGO_HERO = "data:image/png;base64,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231SGUBOiIxGEMRFF13E6tWrrVG3cFTccccdvPbaaycchXVCZDQCGrKzs7n//vtDsklYsKDrOoqisG7duhC+WDqjhZ8UJ5OORj3ZG1npRix8l4Q8mbBASzJaOGNgOb0tWGS0YMEiowWLjBYsWGS0YJHRggWLjBZ+tjilELKjOb6FEOYmflmWzbrUrTf2q2rw1kbyUVmWj7nHuuW1WjtUjc+BI9ZBjXv8XPZmG+092npuy7E0xt/ol5Ho//v6+H172X9qnBan99GWgk50ecgg2ImQ6FQqIhgP+0x8UOdKEc8TJqPxwLt168aUKVNCgiW8Xi8bN25k7dq1AEyYMIGBAwdSUFDAf//7X/O3drudO++8k8jISD766CPi4+MZP348c+bMYf/+/SEpUox/9+rVi6uvvpqlS5eyadMmMyJk/PjxDBkyhMLCQt566y3zHjabjTvvvJOoqCgWLlzIjh07zIfaOqHA95H6+84/1RfF+O7222/H4XAwa9Ys81yjzb169eKmm24iPT2duro69u3bx0cffURJSQl33303mzZtYunSpUclrvHZpZdeyoABA5g9ezbV1dVnZB3vk0qB98tf/lIcC7feeqsAxH//+1/zsx49epjZyiZPnmx+fs0114gpU6YIIYR46KGHBCAcDofo3Lmz6Nixo7A1JxJ96qmnhBBCXH311QIQTqdTAOK1114zr9W7d2/zHpdeeqn5uZFqz263mzkljb4YeSAvv/xy8fLLL4sOHTqYKflkWT7ifOP6siwLRVGEoijmOcbfLc9rnVVNVVXz/JYpomVZFkVFRaKhoSHkepIkiYEDB4ra2lohhBC6rotAICCEEOLZZ58VaWlpQgghXn/9dbOPLe8py7JwOBwCEO+++675LGjOHncmZX07aQOmsbGRQCDAiy++SN++fenXrx9XXXUVQgjuuOMOAOrr60395/bbbzcrItx9992mbiSEYO3atWiaxgUXXABAhw4d2LVrFzt37iQ1NRWACy64AL/fz+bNm0Om74aGBvMed955pylRZsyYYd7D7XYD4PP50HUdm82GzWZD0zTzt2PHjuWee+7B5XKhaZqZjErXdRwOB6qqmlO4IVE0TUPTNLMtxt/GecZvAOx2u9ke43wj2ZXT6UTXdcrLy6msrDxCB585cyZRUVE88MADJCcnk5aWxujRo3n33XdxuVwEAgHq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";

import { supabase } from './supabase.js';

const BMW_MODELS=["R 1300 GS","R 1300 GS Adventure","R 1250 GS","R 1250 GS Adventure","R 1250 RT","R 1250 RS","R 1250 R","S 1000 RR","S 1000 R","S 1000 XR","M 1000 RR","M 1000 R","M 1000 XR","F 900 R","F 900 XR","F 900 GS","F 900 GS Adventure","F 850 GS","F 800 GS","G 310 R","G 310 GS","R 18","R 18 Classic","R 18 B","R 18 Transcontinental","R 18 Roctane","R 12","R 12 nineT","R 12 S","R 12 G/S","K 1600 GTL","K 1600 GT","K 1600 B","K 1600 Grand America","R 1300 RT","CE 04","CE 02","C 400 GT","C 400 X"];
const BLOOD=["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const ROLES=["Presidente","Vicepresidente","Tesorero","Secretario","Capitán de Ruta","Escoba","Miembro"];
const CITIES=["Ibagué","Bogotá","Medellín","Cali","Armenia","Pereira","Manizales","Neiva","Villavicencio","Bucaramanga","Barranquilla","Cartagena","Santa Marta","Cúcuta","Pasto","Popayán","Montería","Tunja"];
const EVENT_TYPES=["Rodada Grupal","Encuentro Social","Taller Mecánico","Viaje / Travesía"];
const MOTO_COLORS=["Negro","Blanco","Gris","Azul","Rojo","Verde","Amarillo","Naranja","Racing Red","HP Blue","Ice Grey","Triple Black","Kalamata","Light White","Black Storm"];
const SHIRTS=["XS","S","M","L","XL","XXL"];
const DEPTS=["Tolima","Cundinamarca","Quindío","Risaralda","Caldas","Huila","Valle del Cauca","Antioquia","Santander","Boyacá","Atlántico","Bolívar","Meta","Nariño","Cauca","Norte de Santander","Córdoba"];

const CSS=`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap');
:root{--fh:'Instrument Sans',sans-serif;--fb:'Plus Jakarta Sans',sans-serif;--bk:#1a1a1a;--g9:#262626;--g7:#555;--g5:#8a8a8a;--g3:#c4c4c4;--g2:#e2e2e2;--g1:#f0f0f0;--g0:#f8f8f8;--w:#fff;--blue:#0066b1;--acc:#1a73e8;--grn:#1e8e3e;--org:#e37400;--red:#d93025;--cy:#FCD116;--cb:#003893;--cr:#CE1126}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:var(--fb);background:var(--w);color:var(--bk);-webkit-font-smoothing:antialiased}
@keyframes rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes slide{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.rise{animation:rise .5s cubic-bezier(.22,1,.36,1) both}.slide{animation:slide .4s cubic-bezier(.22,1,.36,1) both}.fade{animation:fadeIn .3s ease both}
.clift{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease}.clift:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.08)}
.trow{transition:background .15s}.trow:hover{background:var(--g0)!important}
.bh{transition:all .25s cubic-bezier(.22,1,.36,1)}.bh:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.1)}
.abtn{transition:background .2s;border-radius:4px}.abtn:hover{background:var(--g1)}
::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-thumb{background:var(--g3);border-radius:3px}
.nl{position:relative}.nl::after{content:'';position:absolute;bottom:-1px;left:50%;width:0;height:2px;background:var(--bk);transition:all .3s;transform:translateX(-50%)}.nl.ac::after{width:100%}.nl.acb::after{background:var(--acc);width:100%}
.mcard{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);border-radius:12px;overflow:hidden;color:#fff;position:relative}
.mcard::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.02) 10px,rgba(255,255,255,.02) 20px)}
`;

function Tri(){return <div style={{display:"flex",height:3}}><div style={{flex:2,background:"var(--cy)"}}/><div style={{flex:1,background:"var(--cb)"}}/><div style={{flex:1,background:"var(--cr)"}}/></div>;}
function Ic({d,s=18,c="var(--bk)"}){return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;}
const ic={users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",cal:"M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18",plus:"M12 5v14M5 12h14",x:"M18 6L6 18M6 6l12 12",search:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",edit:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",trash:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",moto:"M5 17a3 3 0 100-6 3 3 0 000 6zM19 17a3 3 0 100-6 3 3 0 000 6zM9 14h6M19 14l-2-5h-4l-3 3H7l-2 2M13 9V6h2l3 3M9 6h4",map:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z",star:"M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z",check:"M20 6L9 17l-5-5",settings:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z",img:"M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3L14.5 12l4.5 6H5l3.5-4.5z",userPlus:"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6",userCheck:"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M8.5 11a4 4 0 100-8 4 4 0 000 8zM17 11l2 2 4-4",card:"M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM2 10h20",lock:"M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",logout:"M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"};

function EvBadge({type}){const m={"Rodada Grupal":{bg:"#e8f0fe",c:"#1a73e8"},"Encuentro Social":{bg:"#e6f4ea",c:"#1e8e3e"},"Taller Mecánico":{bg:"#fef7e0",c:"#e37400"},"Viaje / Travesía":{bg:"#fce8e6",c:"#d93025"}};const s=m[type]||m["Rodada Grupal"];return <span style={{display:"inline-block",padding:"4px 12px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"var(--fh)",background:s.bg,color:s.c,textTransform:"uppercase",letterSpacing:".05em"}}>{type}</span>;}
function RBadge({role}){const g=["Presidente","Vicepresidente"].includes(role);return <span style={{display:"inline-block",padding:"4px 12px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"var(--fh)",background:g?"var(--bk)":"var(--g1)",color:g?"#fff":"var(--g7)"}}>{role}</span>;}

function Modal({open,onClose,title,children,footer,wide}){if(!open) return null;return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"5vh 16px",overflowY:"auto"}}><div className="fade" onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:8,width:"100%",maxWidth:wide?920:760,margin:"auto",boxShadow:"0 24px 80px rgba(0,0,0,.2)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"22px 28px",borderBottom:"1px solid var(--g2)"}}><h2 style={{fontSize:20,fontFamily:"var(--fh)",fontWeight:700}}>{title}</h2><button onClick={onClose} className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}}><Ic d={ic.x} s={18} c="var(--g5)"/></button></div><div style={{padding:"24px 28px",maxHeight:"70vh",overflowY:"auto"}}>{children}</div>{footer&&<div style={{padding:"16px 28px",borderTop:"1px solid var(--g2)",display:"flex",justifyContent:"flex-end",gap:10}}>{footer}</div>}</div></div>;}
function Confirm({open,onClose,onOk,msg}){if(!open) return null;return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div className="fade" onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:8,maxWidth:380,width:"100%",padding:28}}><p style={{fontSize:15,color:"var(--g7)",marginBottom:24,lineHeight:1.6}}>{msg}</p><div style={{display:"flex",justifyContent:"flex-end",gap:10}}><button onClick={onClose} className="bh" style={BG}>Cancelar</button><button onClick={onOk} className="bh" style={{...BP,background:"var(--red)"}}>Eliminar</button></div></div></div>;}

const IS={padding:"10px 14px",border:"1px solid var(--g2)",borderRadius:6,fontSize:14,color:"var(--bk)",outline:"none",width:"100%",fontFamily:"var(--fb)"};
const BP={padding:"10px 26px",background:"var(--bk)",border:"none",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:"var(--fh)",color:"#fff",display:"inline-flex",alignItems:"center",gap:7};
const BPblue={...BP,background:"var(--acc)"};
const BG={padding:"10px 26px",background:"none",border:"1px solid var(--g2)",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"var(--fh)",color:"var(--g7)",display:"inline-flex",alignItems:"center",gap:7};
const BS=(a)=>({padding:"7px 16px",background:a?"var(--bk)":"none",border:a?"none":"1px solid var(--g2)",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"var(--fh)",color:a?"#fff":"var(--g5)"});
const BF={padding:"8px 18px",background:"none",border:"1px solid var(--g2)",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"var(--fh)",color:"var(--g7)"};
const BD={...BF,border:"1px solid #fdd",color:"var(--red)"};
function Field({label,children,span}){return <div style={{display:"flex",flexDirection:"column",gap:5,gridColumn:span?"1/-1":undefined}}><label style={{fontSize:11,fontWeight:700,fontFamily:"var(--fh)",color:"var(--g5)",textTransform:"uppercase",letterSpacing:".1em"}}>{label}</label>{children}</div>;}
function SH({title,color}){return <div style={{fontSize:12,fontWeight:700,fontFamily:"var(--fh)",color:color||"var(--bk)",marginBottom:14,paddingBottom:8,borderBottom:"2px solid "+(color||"var(--bk)"),textTransform:"uppercase",letterSpacing:".08em"}}>{title}</div>;}

/* Helper: full name from member */
const fullName=(m)=>[m.first_name,m.second_name,m.first_lastname,m.second_lastname].filter(Boolean).join(" ");
const initials=(m)=>{const n=fullName(m);return n.split(" ").map(w=>w[0]).slice(0,2).join("");};

/* Image upload to Supabase Storage */
const uploadImage=async(file)=>{
  const ext=file.name.split(".").pop();
  const name=`${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  const{data,error}=await supabase.storage.from("images").upload(name,file,{cacheControl:"3600",upsert:false});
  if(error) throw error;
  const{data:{publicUrl}}=supabase.storage.from("images").getPublicUrl(name);
  return publicUrl;
};

function ImageUpload({value,onChange,label="Imagen"}){
  const[uploading,setUploading]=useState(false);
  const handleFile=async(e)=>{
    const file=e.target.files?.[0];if(!file)return;
    setUploading(true);
    try{const url=await uploadImage(file);onChange(url);}
    catch(err){alert("Error al subir: "+err.message);}
    finally{setUploading(false);}
  };
  const copyUrl=()=>{if(value){navigator.clipboard.writeText(value);alert("URL copiada!");}};
  return <Field label={label}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
    <input style={{...IS,flex:1}} value={value||""} onChange={e=>onChange(e.target.value)} placeholder="https://... o sube una imagen"/>
    <label className="bh" style={{...BPblue,cursor:"pointer",flexShrink:0,fontSize:12,padding:"10px 14px"}}>{uploading?"Subiendo...":"Subir"}<input type="file" accept="image/*" onChange={handleFile} style={{display:"none"}} disabled={uploading}/></label>
    {value&&<button type="button" onClick={copyUrl} className="bh" style={{...BG,flexShrink:0,fontSize:12,padding:"10px 14px"}}>Copiar URL</button>}
  </div>
  {value&&<img src={value} alt="" style={{width:120,height:80,objectFit:"cover",borderRadius:6,marginTop:8,border:"1px solid var(--g2)"}}/>}
  </Field>;
}

/* ── MEMBERSHIP CARD ── */
function MembershipCard({member}){
  const fmtD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("es-CO",{day:"2-digit",month:"2-digit",year:"numeric"}):"—";
  return <div className="mcard" style={{width:"100%",maxWidth:480}}><div style={{position:"relative",zIndex:1}}>
    <div style={{padding:"20px 24px 16px",borderBottom:"1px solid rgba(255,255,255,.1)"}}><div style={{fontSize:11,fontFamily:"var(--fh)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.6)"}}>BMW MOTORRAD CLUB IBAGUÉ COLOMBIA</div><div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{member.email}</div></div>
    <div style={{padding:"16px 24px",display:"flex",gap:16}}><div style={{flex:1}}>
      <div style={{fontSize:10,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".1em",fontWeight:600,marginBottom:2}}>Nombre</div>
      <div style={{fontSize:16,fontFamily:"var(--fh)",fontWeight:700,marginBottom:12}}>{fullName(member)}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px"}}>
        {[["No. Socio",member.claf_num||"—"],["RH",member.blood_type],["Alergias",member.allergies||"Ninguna"],["Vencimiento",fmtD(member.exp_date)],["Emergencia",member.emerg_phone1||"—"],["Contacto",member.emerg_name||"—"]].map(([l,v],i)=> <div key={i}><div style={{fontSize:9,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".1em",fontWeight:600}}>{l}</div><div style={{fontSize:12,fontWeight:600}}>{v}</div></div>)}
      </div>
    </div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",flexShrink:0}}><img src={LOGO_NAV} alt="Logo" style={{height:80,opacity:.9}}/></div></div>
    <Tri/>
  </div></div>;
}

/* ── LOGIN FORM ── */
function LoginForm({onLogin,onClose}){
  const[email,setEmail]=useState("");const[pass,setPass]=useState("");const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const handle=async()=>{setErr("");setLoading(true);
    const{error}=await supabase.auth.signInWithPassword({email,password:pass});
    setLoading(false);if(error){setErr("Email o contraseña incorrectos");}else{onLogin();}
  };
  return <div style={{maxWidth:340}}><div style={{textAlign:"center",marginBottom:24}}><div style={{width:48,height:48,borderRadius:12,background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><Ic d={ic.lock} s={22} c="var(--acc)"/></div><h3 style={{fontSize:18,fontFamily:"var(--fh)",fontWeight:700}}>Acceso Administrador</h3><p style={{fontSize:13,color:"var(--g5)",marginTop:4}}>Ingresa con tu cuenta de admin.</p></div>
    <Field label="Email"><input style={IS} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@club.com"/></Field>
    <div style={{height:12}}/>
    <Field label="Contraseña"><input style={IS} type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handle()}/></Field>
    {err&&<p style={{color:"var(--red)",fontSize:12,marginTop:8}}>{err}</p>}
    <div style={{display:"flex",gap:10,marginTop:20}}><button onClick={onClose} className="bh" style={BG}>Cancelar</button><button onClick={handle} className="bh" style={{...BPblue,flex:1,justifyContent:"center"}} disabled={loading}>{loading?"Ingresando...":"Ingresar"}</button></div>
  </div>;
}

/* ── MEMBER FORM (all fields from registration form) ── */
function MemberForm({member,onSave,onCancel}){
  const empty={first_name:"",second_name:"",first_lastname:"",second_lastname:"",doc_type:"CC",doc_number:"",doc_place:"",doc_date:"",birth_date:"",birth_place:"",sex:"M",eps:"",blood_type:"O+",allergies:"",address:"",city:"Ibagué",department:"Tolima",phone:"",email:"",instagram:"",profession:"",shirt_size:"M",photo_url:"",emerg_name:"",emerg_relationship:"",emerg_phone1:"",emerg_phone2:"",moto_reference:BMW_MODELS[0],moto_year:"2024",moto_color:MOTO_COLORS[0],moto_plate:"",moto_plate_city:"",moto_chassis_code:"",moto_vin:"",moto_engine_num:"",soat_start:"",soat_end:"",techno_start:"",techno_end:"",claf_num:"",inscription_num:"",role:"Miembro",join_date:new Date().toISOString().split("T")[0],exp_date:""};
  const[f,setF]=useState(member||empty);
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const h=()=>{if(!f.first_name||!f.first_lastname||!f.doc_number||!f.phone||!f.moto_reference||!f.moto_plate){alert("Completa: Nombre, Apellido, Documento, Teléfono, Moto y Placa");return;}onSave(f);};

  const G=({children,cols=2})=><div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:14,marginBottom:24}}>{children}</div>;

  return <>
    <SH title="Datos Personales" color="var(--acc)"/>
    <G cols={4}>
      <Field label="Primer Nombre *"><input style={IS} value={f.first_name} onChange={e=>u("first_name",e.target.value)}/></Field>
      <Field label="Segundo Nombre"><input style={IS} value={f.second_name||""} onChange={e=>u("second_name",e.target.value)}/></Field>
      <Field label="Primer Apellido *"><input style={IS} value={f.first_lastname} onChange={e=>u("first_lastname",e.target.value)}/></Field>
      <Field label="Segundo Apellido"><input style={IS} value={f.second_lastname||""} onChange={e=>u("second_lastname",e.target.value)}/></Field>
    </G>
    <G cols={4}>
      <Field label="Tipo Doc."><select style={IS} value={f.doc_type} onChange={e=>u("doc_type",e.target.value)}><option>CC</option><option>CE</option><option>Pasaporte</option></select></Field>
      <Field label="Número Doc. *"><input style={IS} value={f.doc_number} onChange={e=>u("doc_number",e.target.value)}/></Field>
      <Field label="Lugar Expedición"><input style={IS} value={f.doc_place||""} onChange={e=>u("doc_place",e.target.value)}/></Field>
      <Field label="Fecha Expedición"><input style={IS} type="date" value={f.doc_date||""} onChange={e=>u("doc_date",e.target.value)}/></Field>
    </G>
    <G cols={4}>
      <Field label="Fecha Nacimiento"><input style={IS} type="date" value={f.birth_date||""} onChange={e=>u("birth_date",e.target.value)}/></Field>
      <Field label="Lugar Nacimiento"><input style={IS} value={f.birth_place||""} onChange={e=>u("birth_place",e.target.value)}/></Field>
      <Field label="Sexo"><select style={IS} value={f.sex||"M"} onChange={e=>u("sex",e.target.value)}><option value="M">Masculino</option><option value="F">Femenino</option></select></Field>
      <Field label="EPS"><input style={IS} value={f.eps||""} onChange={e=>u("eps",e.target.value)}/></Field>
    </G>
    <G cols={4}>
      <Field label="RH"><select style={IS} value={f.blood_type} onChange={e=>u("blood_type",e.target.value)}>{BLOOD.map(b=><option key={b}>{b}</option>)}</select></Field>
      <Field label="Alergias"><input style={IS} value={f.allergies||""} onChange={e=>u("allergies",e.target.value)} placeholder="Ninguna"/></Field>
      <Field label="Profesión"><input style={IS} value={f.profession||""} onChange={e=>u("profession",e.target.value)}/></Field>
      <Field label="Talla Camiseta"><select style={IS} value={f.shirt_size||"M"} onChange={e=>u("shirt_size",e.target.value)}>{SHIRTS.map(s=><option key={s}>{s}</option>)}</select></Field>
    </G>
    <G cols={3}>
      <Field label="Dirección"><input style={IS} value={f.address||""} onChange={e=>u("address",e.target.value)}/></Field>
      <Field label="Ciudad"><select style={IS} value={f.city} onChange={e=>u("city",e.target.value)}>{CITIES.map(c=><option key={c}>{c}</option>)}</select></Field>
      <Field label="Departamento"><select style={IS} value={f.department||"Tolima"} onChange={e=>u("department",e.target.value)}>{DEPTS.map(d=><option key={d}>{d}</option>)}</select></Field>
    </G>
    <G cols={3}>
      <Field label="Celular *"><input style={IS} value={f.phone} onChange={e=>u("phone",e.target.value)}/></Field>
      <Field label="Email"><input style={IS} type="email" value={f.email||""} onChange={e=>u("email",e.target.value)}/></Field>
      <Field label="Instagram"><input style={IS} value={f.instagram||""} onChange={e=>u("instagram",e.target.value)} placeholder="@usuario"/></Field>
    </G>

    <SH title="Contacto de Emergencia" color="var(--red)"/>
    <G cols={4}>
      <Field label="Nombre Contacto"><input style={IS} value={f.emerg_name||""} onChange={e=>u("emerg_name",e.target.value)}/></Field>
      <Field label="Parentesco"><input style={IS} value={f.emerg_relationship||""} onChange={e=>u("emerg_relationship",e.target.value)}/></Field>
      <Field label="Celular 1"><input style={IS} value={f.emerg_phone1||""} onChange={e=>u("emerg_phone1",e.target.value)}/></Field>
      <Field label="Celular 2"><input style={IS} value={f.emerg_phone2||""} onChange={e=>u("emerg_phone2",e.target.value)}/></Field>
    </G>

    <SH title="Motocicleta" color="var(--org)"/>
    <G cols={3}>
      <Field label="Referencia BMW *"><select style={IS} value={f.moto_reference} onChange={e=>u("moto_reference",e.target.value)}>{BMW_MODELS.map(m=><option key={m}>{m}</option>)}</select></Field>
      <Field label="Modelo / Año"><input style={IS} value={f.moto_year||""} onChange={e=>u("moto_year",e.target.value)}/></Field>
      <Field label="Color"><select style={IS} value={f.moto_color||MOTO_COLORS[0]} onChange={e=>u("moto_color",e.target.value)}>{MOTO_COLORS.map(c=><option key={c}>{c}</option>)}</select></Field>
    </G>
    <G cols={3}>
      <Field label="Placa *"><input style={{...IS,textTransform:"uppercase"}} value={f.moto_plate} onChange={e=>u("moto_plate",e.target.value)}/></Field>
      <Field label="Ciudad Matrícula"><input style={IS} value={f.moto_plate_city||""} onChange={e=>u("moto_plate_city",e.target.value)}/></Field>
      <Field label="Código de Chasis"><input style={IS} value={f.moto_chassis_code||""} onChange={e=>u("moto_chassis_code",e.target.value)}/></Field>
    </G>
    <G cols={2}>
      <Field label="Número de Chasis (VIN)"><input style={IS} value={f.moto_vin||""} onChange={e=>u("moto_vin",e.target.value)}/></Field>
      <Field label="Número de Motor"><input style={IS} value={f.moto_engine_num||""} onChange={e=>u("moto_engine_num",e.target.value)}/></Field>
    </G>
    <G cols={4}>
      <Field label="SOAT Inicio"><input style={IS} type="date" value={f.soat_start||""} onChange={e=>u("soat_start",e.target.value)}/></Field>
      <Field label="SOAT Fin"><input style={IS} type="date" value={f.soat_end||""} onChange={e=>u("soat_end",e.target.value)}/></Field>
      <Field label="Técnico-Mecánica Inicio"><input style={IS} type="date" value={f.techno_start||""} onChange={e=>u("techno_start",e.target.value)}/></Field>
      <Field label="Técnico-Mecánica Fin"><input style={IS} type="date" value={f.techno_end||""} onChange={e=>u("techno_end",e.target.value)}/></Field>
    </G>

    <SH title="Membresía" color="var(--grn)"/>
    <G cols={4}>
      <Field label="No. Inscripción"><input style={IS} value={f.inscription_num||""} onChange={e=>u("inscription_num",e.target.value)}/></Field>
      <Field label="No. Socio CLAF"><input style={IS} value={f.claf_num||""} onChange={e=>u("claf_num",e.target.value)} placeholder="BMWCLAF-0000"/></Field>
      <Field label="Fecha Ingreso"><input style={IS} type="date" value={f.join_date||""} onChange={e=>u("join_date",e.target.value)}/></Field>
      <Field label="Fecha Vencimiento"><input style={IS} type="date" value={f.exp_date||""} onChange={e=>u("exp_date",e.target.value)}/></Field>
    </G>
    <G cols={2}>
      <Field label="Rol"><select style={IS} value={f.role} onChange={e=>u("role",e.target.value)}>{ROLES.map(r=><option key={r}>{r}</option>)}</select></Field>
      <ImageUpload label="Foto del Miembro" value={f.photo_url} onChange={v=>u("photo_url",v)}/>
    </G>
    <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:12}}><button onClick={onCancel} className="bh" style={BG}>Cancelar</button><button onClick={h} className="bh" style={BP}>Guardar Miembro</button></div>
  </>;
}

/* ── EVENT FORM ── */
function EventForm({event,onSave,onCancel}){
  const[f,setF]=useState(event||{title:"",type:EVENT_TYPES[0],date:"",end_date:"",time:"",location:"",city:"Ibagué",description:"",max_participants:"",featured:false,image:""});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const h=()=>{if(!f.title||!f.date||!f.location){alert("Completa: Título, Fecha y Lugar");return;}onSave(f);};
  return <>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
      <Field label="Título *" span><input style={IS} value={f.title} onChange={e=>u("title",e.target.value)}/></Field>
      <Field label="Tipo"><select style={IS} value={f.type} onChange={e=>u("type",e.target.value)}>{EVENT_TYPES.map(t=><option key={t}>{t}</option>)}</select></Field>
      <Field label="Cupo"><input style={IS} value={f.max_participants||""} onChange={e=>u("max_participants",e.target.value)}/></Field>
      <Field label="Fecha Inicio *"><input style={IS} type="date" value={f.date} onChange={e=>u("date",e.target.value)}/></Field>
      <Field label="Fecha Fin"><input style={IS} type="date" value={f.end_date||""} onChange={e=>u("end_date",e.target.value)}/></Field>
      <Field label="Hora"><input style={IS} type="time" value={f.time||""} onChange={e=>u("time",e.target.value)}/></Field>
      <Field label="Ciudad"><input style={IS} value={f.city} onChange={e=>u("city",e.target.value)}/></Field>
      <Field label="Lugar *" span><input style={IS} value={f.location} onChange={e=>u("location",e.target.value)}/></Field>
      <ImageUpload label="Imagen del Evento" value={f.image} onChange={v=>u("image",v)}/>
      <Field label="Descripción" span><textarea style={{...IS,minHeight:70,resize:"vertical"}} value={f.description||""} onChange={e=>u("description",e.target.value)}/></Field>
    </div>
    <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"var(--g7)",marginBottom:8}}><input type="checkbox" checked={f.featured||false} onChange={e=>u("featured",e.target.checked)} style={{accentColor:"var(--acc)",width:16,height:16}}/> Evento Destacado</label>
    <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}}><button onClick={onCancel} className="bh" style={BG}>Cancelar</button><button onClick={h} className="bh" style={BP}>Guardar Evento</button></div>
  </>;
}

/* ── MEMBER DETAIL ── */
function MemberDetail({member,onEdit,showCard,setShowCard}){
  const fmtD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("es-CO",{year:"numeric",month:"long",day:"numeric"}):"—";
  const Row=({label,value})=><div style={{padding:"7px 0"}}><div style={{fontSize:10,fontFamily:"var(--fh)",color:"var(--g5)",textTransform:"uppercase",letterSpacing:".12em",fontWeight:700,marginBottom:3}}>{label}</div><div style={{fontSize:14,fontWeight:500}}>{value||"—"}</div></div>;
  const Sec=({title,color,children,cols=2})=><div style={{marginBottom:22}}><div style={{fontSize:11,fontFamily:"var(--fh)",fontWeight:700,color,marginBottom:12,paddingBottom:7,borderBottom:"1px solid var(--g1)",textTransform:"uppercase",letterSpacing:".08em"}}>{title}</div><div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:"2px 28px"}}>{children}</div></div>;

  if(showCard) return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20}}><MembershipCard member={member}/><button className="bh" onClick={()=>setShowCard(false)} style={BG}>Volver al Detalle</button></div>;

  return <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
      <div><h2 style={{fontSize:24,fontFamily:"var(--fh)",fontWeight:700,marginBottom:4}}>{fullName(member)}</h2><div style={{fontSize:12,color:"var(--acc)",fontFamily:"var(--fh)",fontWeight:600,marginBottom:8}}>{member.claf_num||"Sin número CLAF"}</div><div style={{display:"flex",gap:6}}><RBadge role={member.role}/><span style={{padding:"4px 12px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"var(--fh)",background:"#fce8e6",color:"var(--red)"}}>{member.blood_type}</span></div></div>
      <div style={{display:"flex",gap:6}}><button onClick={()=>setShowCard(true)} className="bh" style={{...BF,display:"flex",alignItems:"center",gap:5}}><Ic d={ic.card} s={14} c="var(--acc)"/> Carnet</button><button onClick={()=>onEdit(member)} className="bh" style={{...BF,display:"flex",alignItems:"center",gap:5}}><Ic d={ic.edit} s={14} c="var(--g5)"/> Editar</button></div>
    </div>
    <Sec title="Datos Personales" color="var(--acc)" cols={3}><Row label="Documento" value={`${member.doc_type||"CC"} ${member.doc_number}`}/><Row label="Expedición" value={member.doc_place}/><Row label="Nacimiento" value={fmtD(member.birth_date)}/><Row label="Lugar Nac." value={member.birth_place}/><Row label="Sexo" value={member.sex==="M"?"Masculino":"Femenino"}/><Row label="EPS" value={member.eps}/><Row label="Alergias" value={member.allergies}/><Row label="Profesión" value={member.profession}/><Row label="Talla" value={member.shirt_size}/></Sec>
    <Sec title="Contacto" color="var(--acc)"><Row label="Celular" value={member.phone}/><Row label="Email" value={member.email}/><Row label="Dirección" value={member.address}/><Row label="Ciudad" value={`${member.city}, ${member.department||""}`}/><Row label="Instagram" value={member.instagram}/></Sec>
    <Sec title="Emergencia" color="var(--red)"><Row label="Contacto" value={member.emerg_name}/><Row label="Parentesco" value={member.emerg_relationship}/><Row label="Celular 1" value={member.emerg_phone1}/><Row label="Celular 2" value={member.emerg_phone2}/></Sec>
    <Sec title="Motocicleta" color="var(--org)" cols={3}><Row label="Referencia" value={member.moto_reference}/><Row label="Año" value={member.moto_year}/><Row label="Color" value={member.moto_color}/><Row label="Placa" value={member.moto_plate?.toUpperCase()}/><Row label="Ciudad Placa" value={member.moto_plate_city}/><Row label="VIN" value={member.moto_vin}/><Row label="Motor" value={member.moto_engine_num}/><Row label="SOAT" value={member.soat_end?`Hasta ${fmtD(member.soat_end)}`:"—"}/><Row label="Técnico-Mec." value={member.techno_end?`Hasta ${fmtD(member.techno_end)}`:"—"}/></Sec>
    <Sec title="Membresía" color="var(--grn)"><Row label="No. Inscripción" value={member.inscription_num}/><Row label="No. CLAF" value={member.claf_num}/><Row label="Ingreso" value={fmtD(member.join_date)}/><Row label="Vencimiento" value={fmtD(member.exp_date)}/></Sec>
  </>;
}

/* ══════════ MAIN APP ══════════ */
export default function App(){
  const[page,setPage]=useState("home");
  const[adminTab,setAdminTab]=useState("members");
  const[members,setMembers]=useState([]);
  const[events,setEvents]=useState([]);
  const[regs,setRegs]=useState([]);// {event_id, member_id}
  const[modalM,setModalM]=useState(null);
  const[modalE,setModalE]=useState(null);
  const[viewM,setViewM]=useState(null);
  const[viewE,setViewE]=useState(null);
  const[del,setDel]=useState(null);
  const[search,setSearch]=useState("");
  const[adminSearch,setAdminSearch]=useState("");
  const[eFilter,setEFilter]=useState("all");
  const[eTime,setETime]=useState("upcoming");
  const[showCard,setShowCard]=useState(false);
  const[showLogin,setShowLogin]=useState(false);
  const[user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);
  const isAdmin=!!user;

  // Check auth + load data
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user||null);});
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user||null);});
    loadData();
    return()=>subscription.unsubscribe();
  },[]);

  const loadData=async()=>{
    setLoading(true);
    const[mRes,eRes,rRes]=await Promise.all([
      supabase.from("members").select("*").order("role"),
      supabase.from("events").select("*").order("date"),
      supabase.from("event_registrations").select("event_id,member_id"),
    ]);
    if(mRes.data) setMembers(mRes.data);
    if(eRes.data) setEvents(eRes.data);
    if(rRes.data) setRegs(rRes.data);
    setLoading(false);
  };

  const handleLogin=()=>{setShowLogin(false);setPage("admin");loadData();};
  const handleLogout=async()=>{await supabase.auth.signOut();setUser(null);setPage("home");};

  // CRUD Members
  const saveMember=async(m)=>{
    const{id,...data}=m;
    // Clean empty strings to null for date fields
    for(const k of["doc_date","birth_date","soat_start","soat_end","techno_start","techno_end","join_date","exp_date"]){if(data[k]==="")data[k]=null;}
    if(data.max_participants==="")data.max_participants=null;
    if(id){await supabase.from("members").update(data).eq("id",id);}
    else{await supabase.from("members").insert(data);}
    setModalM(null);loadData();
  };
  const deleteMember=async(id)=>{await supabase.from("members").delete().eq("id",id);setDel(null);setViewM(null);loadData();};

  // CRUD Events
  const saveEvent=async(ev)=>{
    const{id,...data}=ev;
    if(data.max_participants==="")data.max_participants=null;
    for(const k of["date","end_date"]){if(data[k]==="")data[k]=null;}
    if(id){await supabase.from("events").update(data).eq("id",id);}
    else{await supabase.from("events").insert(data);}
    setModalE(null);loadData();
  };
  const deleteEvent=async(id)=>{await supabase.from("events").delete().eq("id",id);setDel(null);setViewE(null);loadData();};

  // Registrations
  const toggleReg=async(eventId,memberId)=>{
    const has=regs.some(r=>r.event_id===eventId&&r.member_id===memberId);
    if(has){await supabase.from("event_registrations").delete().eq("event_id",eventId).eq("member_id",memberId);}
    else{await supabase.from("event_registrations").insert({event_id:eventId,member_id:memberId});}
    const{data}=await supabase.from("event_registrations").select("event_id,member_id");
    if(data)setRegs(data);
  };
  const getRegs=(eventId)=>regs.filter(r=>r.event_id===eventId);

  const fmtD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("es-CO",{day:"numeric",month:"short",year:"numeric"}):"";
  const now=new Date().toISOString().split("T")[0];
  const fMembers=members.filter(m=>{if(!search)return true;const s=search.toLowerCase();return fullName(m).toLowerCase().includes(s)||m.moto_reference?.toLowerCase().includes(s)||m.moto_plate?.toLowerCase().includes(s);});
  const fEvents=events.filter(ev=>{if(eFilter!=="all"&&ev.type!==eFilter)return false;if(eTime==="upcoming"&&ev.date<now)return false;if(eTime==="past"&&ev.date>=now)return false;return true;}).sort((a,b)=>eTime==="past"?b.date.localeCompare(a.date):a.date.localeCompare(b.date));
  const featured=events.filter(ev=>ev.featured&&ev.date>=now).sort((a,b)=>a.date.localeCompare(b.date));
  const aM=members.filter(m=>{if(!adminSearch)return true;const s=adminSearch.toLowerCase();return fullName(m).toLowerCase().includes(s)||m.doc_number?.includes(s)||m.moto_reference?.toLowerCase().includes(s);});
  const aE=events.filter(ev=>{if(!adminSearch)return true;const s=adminSearch.toLowerCase();return ev.title?.toLowerCase().includes(s)||ev.city?.toLowerCase().includes(s);});
  const th={padding:"11px 14px",textAlign:"left",fontSize:10,fontWeight:700,fontFamily:"var(--fh)",color:"var(--g5)",textTransform:"uppercase",letterSpacing:".1em",borderBottom:"2px solid var(--g2)",background:"var(--g0)"};
  const td={padding:"14px",fontSize:13,borderBottom:"1px solid var(--g1)",verticalAlign:"middle"};
  const W={maxWidth:1200,margin:"0 auto",padding:"0 32px"};
  const EvImg=({src,h=180})=>src?<div style={{width:"100%",height:h,backgroundImage:`url(${src})`,backgroundSize:"cover",backgroundPosition:"center",backgroundColor:"var(--g1)"}}/>:<div style={{width:"100%",height:h,background:"linear-gradient(135deg,var(--g1),var(--g0))",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic d={ic.img} s={32} c="var(--g3)"/></div>;

  if(loading) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"var(--fh)",color:"var(--g5)"}}><p>Cargando...</p></div>;

  return <>
    <style>{CSS}</style>
    <div style={{background:"var(--w)",minHeight:"100vh",color:"var(--bk)"}}>
      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--g2)"}}>
        <div style={{...W,display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}} onClick={()=>setPage("home")}><img src={LOGO_NAV} alt="BMW Motorrad Club Ibagué Colombia" style={{height:44}}/></div>
          <div style={{display:"flex",alignItems:"center"}}>
            {[["home","Inicio"],["members","Miembros"],["events","Eventos"]].map(([k,l])=> <button key={k} className={`nl ${page===k?"ac":""}`} onClick={()=>setPage(k)} style={{padding:"8px 20px",background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"var(--fh)",fontWeight:page===k?700:500,color:page===k?"var(--bk)":"var(--g5)"}}>{l}</button>)}
            {isAdmin?<button className={`nl ${page==="admin"?"acb":""}`} onClick={()=>setPage("admin")} style={{padding:"8px 20px",background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"var(--fh)",fontWeight:page==="admin"?700:500,color:page==="admin"?"var(--acc)":"var(--g5)"}}>Admin</button>
            :<button className="bh" onClick={()=>setShowLogin(true)} style={{marginLeft:8,padding:"6px 16px",background:"none",border:"1px solid var(--g2)",borderRadius:6,cursor:"pointer",fontSize:12,fontFamily:"var(--fh)",fontWeight:600,color:"var(--g5)",display:"flex",alignItems:"center",gap:5}}><Ic d={ic.lock} s={14} c="var(--g5)"/>Admin</button>}
            {isAdmin&&<button className="bh" onClick={handleLogout} style={{marginLeft:4,padding:"6px 12px",background:"none",border:"none",cursor:"pointer"}} title="Cerrar sesión"><Ic d={ic.logout} s={16} c="var(--g5)"/></button>}
          </div>
        </div>
      </nav>

      {/* HOME */}
      {page==="home"&&<>
        <div style={{position:"relative",overflow:"hidden",minHeight:420}}>
          {/* Background image */}
          <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1635073908681-b4dfbd6015e8?q=80&w=1470&auto=format&fit=crop)",backgroundSize:"cover",backgroundPosition:"center 40%"}}/>
          {/* Dark overlay */}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.2) 100%)"}}/>
          <Tri/>
          {/* Content */}
          <div style={{position:"relative",zIndex:1,padding:"60px 32px 48px",maxWidth:1200,margin:"0 auto"}}>
            <div className="rise" style={{maxWidth:480}}>
              <img src={LOGO_HERO} alt="Club Logo" style={{height:160,marginBottom:20}}/>
              <div style={{width:48,height:2,background:"var(--acc)",marginBottom:20,borderRadius:1}}/>
              <p style={{fontSize:16,color:"rgba(255,255,255,.7)",lineHeight:1.8,fontWeight:300}}>Unidos por la pasión de rodar. Comunidad oficial de motociclistas BMW Motorrad en el corazón musical de Colombia.</p>
            </div>
          </div>
        </div>
        <div style={{...W,paddingTop:48,paddingBottom:64}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18,marginBottom:48}}>
            {[[members.length,"Miembros","var(--acc)",ic.users],[members.length,"Motos","var(--org)",ic.moto],[events.filter(e=>e.date>=now).length,"Próx. Eventos","var(--grn)",ic.cal],[0,"Km Rodados","var(--red)",ic.map]].map(([n,l,c,d],i)=> <div key={i} className="rise" style={{animationDelay:`${i*.08}s`,padding:"28px 24px",border:"1px solid var(--g2)",borderRadius:8,borderLeft:`4px solid ${c}`,display:"flex",alignItems:"center",gap:16}}><div style={{width:44,height:44,borderRadius:10,background:c+"12",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic d={d} s={22} c={c}/></div><div><div style={{fontSize:32,fontFamily:"var(--fh)",fontWeight:800,lineHeight:1}}>{n}</div><div style={{fontSize:11,fontFamily:"var(--fh)",color:"var(--g5)",textTransform:"uppercase",letterSpacing:".1em",fontWeight:600,marginTop:3}}>{l}</div></div></div>)}
          </div>
          {featured.length>0&&<><h2 className="rise" style={{fontSize:28,fontFamily:"var(--fh)",fontWeight:800,marginBottom:6}}>Eventos Destacados</h2><p className="rise" style={{fontSize:14,color:"var(--g5)",marginBottom:28}}>Próximos eventos del club.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:18,marginBottom:48}}>{featured.slice(0,3).map((ev,i)=> <div key={ev.id} className="clift rise" style={{animationDelay:`${.3+i*.1}s`,border:"1px solid var(--g2)",borderRadius:8,overflow:"hidden",cursor:"pointer"}} onClick={()=>setViewE(ev)}><EvImg src={ev.image} h={160}/><div style={{padding:"20px 22px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><EvBadge type={ev.type}/><span style={{fontSize:11,color:"var(--g5)",display:"flex",alignItems:"center",gap:4}}><Ic d={ic.users} s={13} c="var(--g3)"/>{getRegs(ev.id).length}/{ev.max_participants||"∞"}</span></div><h3 style={{fontSize:18,fontFamily:"var(--fh)",fontWeight:700,marginBottom:8}}>{ev.title}</h3><div style={{fontSize:13,color:"var(--g7)",marginBottom:4}}>{fmtD(ev.date)} {ev.time&&`· ${ev.time}`}</div><div style={{fontSize:13,color:"var(--g5)"}}>{ev.city}</div></div></div>)}</div>
          </>}
          <div className="rise" style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}><button className="bh" style={BG} onClick={()=>setPage("members")}>Ver Miembros</button><button className="bh" style={BG} onClick={()=>setPage("events")}>Ver Eventos</button></div>
        </div>
      </>}

      {/* MEMBERS (public) */}
      {page==="members"&&<div style={{...W,paddingTop:40,paddingBottom:60}}>
        <h2 className="rise" style={{fontSize:28,fontFamily:"var(--fh)",fontWeight:800,marginBottom:4}}>Miembros</h2>
        <p className="rise" style={{fontSize:14,color:"var(--g5)",marginBottom:24}}>Directorio del BMW Motorrad Club Ibagué.</p>
        <div className="rise" style={{display:"flex",alignItems:"center",gap:8,padding:"9px 16px",border:"1px solid var(--g2)",borderRadius:8,maxWidth:400,marginBottom:24}}><Ic d={ic.search} s={16} c="var(--g3)"/><input placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{border:"none",outline:"none",fontSize:13,flex:1,fontFamily:"var(--fb)"}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {fMembers.map((m,i)=> <div key={m.id} className="clift rise" style={{animationDelay:`${.1+i*.04}s`,border:"1px solid var(--g2)",borderRadius:8,padding:"20px 22px",display:"flex",gap:16}}>
            <div style={{width:48,height:48,borderRadius:12,background:"var(--g9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontFamily:"var(--fh)",fontWeight:700,color:"#fff",flexShrink:0}}>{initials(m)}</div>
            <div style={{flex:1}}><div style={{fontSize:15,fontFamily:"var(--fh)",fontWeight:700,marginBottom:5}}>{fullName(m)}</div><div style={{display:"flex",gap:5,marginBottom:5}}><RBadge role={m.role}/></div><div style={{fontSize:12,color:"var(--g5)"}}>{m.city}</div></div>
          </div>)}
        </div>
      </div>}

      {/* EVENTS (public) */}
      {page==="events"&&<div style={{...W,paddingTop:40,paddingBottom:60}}>
        <h2 className="rise" style={{fontSize:28,fontFamily:"var(--fh)",fontWeight:800,marginBottom:4}}>Eventos</h2>
        <p className="rise" style={{fontSize:14,color:"var(--g5)",marginBottom:24}}>Calendario del club.</p>
        <div className="rise" style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>{["upcoming","past"].map(t=> <button key={t} className="bh" style={BS(eTime===t)} onClick={()=>setETime(t)}>{t==="upcoming"?"Próximos":"Pasados"}</button>)}<div style={{width:1,background:"var(--g2)",margin:"0 6px"}}/><button className="bh" style={BS(eFilter==="all")} onClick={()=>setEFilter("all")}>Todos</button>{EVENT_TYPES.map(t=> <button key={t} className="bh" style={BS(eFilter===t)} onClick={()=>setEFilter(t)}>{t.split("/")[0].trim()}</button>)}</div>
        {fEvents.length===0?<div style={{textAlign:"center",padding:60}}><h3 style={{fontSize:18,fontFamily:"var(--fh)",color:"var(--g5)"}}>Sin eventos</h3></div>:
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:18}}>{fEvents.map((ev,i)=> <div key={ev.id} className="clift slide" style={{animationDelay:`${.1+i*.06}s`,border:"1px solid var(--g2)",borderRadius:8,overflow:"hidden",cursor:"pointer"}} onClick={()=>setViewE(ev)}><EvImg src={ev.image} h={140}/><div style={{padding:"18px 22px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><EvBadge type={ev.type}/>{ev.featured&&<span style={{fontSize:10,fontFamily:"var(--fh)",color:"var(--org)",fontWeight:700}}>★</span>}</div><h3 style={{fontSize:17,fontFamily:"var(--fh)",fontWeight:700,marginBottom:6}}>{ev.title}</h3><div style={{fontSize:12,color:"var(--g7)",marginBottom:4}}>{fmtD(ev.date)} {ev.time&&`· ${ev.time}`}</div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"var(--g5)"}}>{ev.city}</span><span style={{fontSize:11,color:"var(--acc)",fontWeight:600}}>{getRegs(ev.id).length} inscritos</span></div></div></div>)}</div>}
      </div>}

      {/* ADMIN */}
      {page==="admin"&&isAdmin&&<div style={{...W,paddingTop:40,paddingBottom:60}}>
        <div className="rise" style={{display:"flex",alignItems:"center",gap:10,marginBottom:28}}><div style={{width:44,height:44,borderRadius:10,background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic d={ic.settings} s={22} c="var(--acc)"/></div><div><h2 style={{fontSize:26,fontFamily:"var(--fh)",fontWeight:800}}>Administración</h2><p style={{fontSize:13,color:"var(--g5)"}}>{user?.email}</p></div></div>
        <div className="rise" style={{display:"flex",gap:0,borderBottom:"2px solid var(--g2)",marginBottom:20}}>{[["members","Miembros",ic.users,members.length],["events","Eventos",ic.cal,events.length]].map(([k,l,d,c])=> <button key={k} onClick={()=>{setAdminTab(k);setAdminSearch("")}} style={{padding:"13px 26px",background:"none",border:"none",borderBottom:adminTab===k?"2px solid var(--acc)":"2px solid transparent",marginBottom:-2,cursor:"pointer",fontSize:14,fontFamily:"var(--fh)",fontWeight:adminTab===k?700:500,color:adminTab===k?"var(--acc)":"var(--g5)",display:"flex",alignItems:"center",gap:7}}><Ic d={d} s={16} c={adminTab===k?"var(--acc)":"var(--g3)"}/>{l}<span style={{background:adminTab===k?"#e8f0fe":"var(--g1)",color:adminTab===k?"var(--acc)":"var(--g5)",padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700}}>{c}</span></button>)}</div>
        <div className="rise" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginBottom:18}}><div style={{display:"flex",alignItems:"center",gap:8,padding:"9px 16px",border:"1px solid var(--g2)",borderRadius:8,flex:1,maxWidth:400}}><Ic d={ic.search} s={16} c="var(--g3)"/><input placeholder="Buscar..." value={adminSearch} onChange={e=>setAdminSearch(e.target.value)} style={{border:"none",outline:"none",fontSize:13,flex:1,fontFamily:"var(--fb)"}}/></div><button className="bh" style={BPblue} onClick={()=>adminTab==="members"?setModalM("new"):setModalE("new")}><Ic d={ic.plus} s={14} c="#fff"/>{adminTab==="members"?"Nuevo Miembro":"Nuevo Evento"}</button></div>

        {adminTab==="members"&&<div className="rise" style={{border:"1px solid var(--g2)",borderRadius:8,overflow:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}><thead><tr><th style={th}>Miembro</th><th style={th}>No. CLAF</th><th style={th}>Motocicleta</th><th style={th}>Placa</th><th style={th}>Ciudad</th><th style={th}>Rol</th><th style={th}>RH</th><th style={{...th,textAlign:"right"}}>Acciones</th></tr></thead><tbody>
          {aM.length===0?<tr><td colSpan={8} style={{...td,textAlign:"center",padding:48,color:"var(--g5)"}}>Sin resultados</td></tr>:aM.map(m=> <tr key={m.id} className="trow"><td style={td}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:34,height:34,borderRadius:8,background:"var(--g9)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontFamily:"var(--fh)",fontWeight:700,flexShrink:0}}>{initials(m)}</div><div><div style={{fontWeight:600,fontSize:13}}>{fullName(m)}</div><div style={{fontSize:11,color:"var(--g5)"}}>{m.email}</div></div></div></td><td style={{...td,fontSize:12,color:"var(--acc)",fontWeight:600}}>{m.claf_num||"—"}</td><td style={td}><span style={{fontSize:12,fontWeight:600,color:"var(--org)"}}>{m.moto_reference}</span><br/><span style={{fontSize:11,color:"var(--g5)"}}>{m.moto_year}</span></td><td style={{...td,fontSize:13,fontWeight:700,fontFamily:"var(--fh)",letterSpacing:".06em"}}>{m.moto_plate?.toUpperCase()}</td><td style={{...td,fontSize:12,color:"var(--g7)"}}>{m.city}</td><td style={td}><RBadge role={m.role}/></td><td style={td}><span style={{padding:"3px 10px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"var(--fh)",background:"#fce8e6",color:"var(--red)"}}>{m.blood_type}</span></td><td style={{...td,textAlign:"right"}}><div style={{display:"flex",gap:2,justifyContent:"flex-end"}}><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>{setViewM(m);setShowCard(true)}}><Ic d={ic.card} s={16} c="var(--acc)"/></button><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>{setViewM(m);setShowCard(false)}}><Ic d={ic.eye} s={16} c="var(--g5)"/></button><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>setModalM(m)}><Ic d={ic.edit} s={16} c="var(--acc)"/></button><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>setDel({t:"m",id:m.id})}><Ic d={ic.trash} s={16} c="var(--red)"/></button></div></td></tr>)}</tbody></table></div>}

        {adminTab==="events"&&<div className="rise" style={{border:"1px solid var(--g2)",borderRadius:8,overflow:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:800}}><thead><tr><th style={th}>Evento</th><th style={th}>Tipo</th><th style={th}>Fecha</th><th style={th}>Ciudad</th><th style={th}>Inscritos</th><th style={th}>Estado</th><th style={{...th,textAlign:"right"}}>Acciones</th></tr></thead><tbody>
          {aE.length===0?<tr><td colSpan={7} style={{...td,textAlign:"center",padding:48,color:"var(--g5)"}}>Sin resultados</td></tr>:aE.map(ev=>{const past=ev.date<now;const rc=getRegs(ev.id).length;const mx=ev.max_participants||999;return <tr key={ev.id} className="trow" style={{opacity:past?.5:1}}><td style={td}><div style={{display:"flex",alignItems:"center",gap:10}}>{ev.image&&<img src={ev.image} alt="" style={{width:40,height:28,objectFit:"cover",borderRadius:4,flexShrink:0}}/>}<div><div style={{fontWeight:600,fontSize:13}}>{ev.title}</div><div style={{fontSize:11,color:"var(--g5)"}}>{ev.location}</div></div></div></td><td style={td}><EvBadge type={ev.type}/></td><td style={{...td,fontSize:12,whiteSpace:"nowrap"}}>{fmtD(ev.date)}</td><td style={{...td,fontSize:12}}>{ev.city}</td><td style={td}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:60,height:6,background:"var(--g1)",borderRadius:3,overflow:"hidden"}}><div style={{width:`${Math.min(100,rc/mx*100)}%`,height:"100%",background:rc>=mx?"var(--red)":"var(--acc)",borderRadius:3}}/></div><span style={{fontSize:12,fontWeight:600,fontFamily:"var(--fh)"}}>{rc}/{ev.max_participants||"∞"}</span></div></td><td style={td}>{ev.featured&&<span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"var(--fh)",background:"#fef7e0",color:"var(--org)",marginRight:4}}>★</span>}<span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"var(--fh)",background:past?"var(--g1)":"#e6f4ea",color:past?"var(--g5)":"var(--grn)"}}>{past?"Pasado":"Próximo"}</span></td><td style={{...td,textAlign:"right"}}><div style={{display:"flex",gap:2,justifyContent:"flex-end"}}><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>setViewE(ev)}><Ic d={ic.eye} s={16} c="var(--g5)"/></button><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>setModalE(ev)}><Ic d={ic.edit} s={16} c="var(--acc)"/></button><button className="abtn" style={{background:"none",border:"none",cursor:"pointer",padding:6}} onClick={()=>setDel({t:"e",id:ev.id})}><Ic d={ic.trash} s={16} c="var(--red)"/></button></div></td></tr>})}
          </tbody></table></div>}
      </div>}

      {/* Not admin trying to access admin */}
      {page==="admin"&&!isAdmin&&<div style={{...W,paddingTop:80,textAlign:"center"}}><Ic d={ic.lock} s={48} c="var(--g3)"/><h2 style={{fontSize:22,fontFamily:"var(--fh)",color:"var(--g5)",marginTop:16}}>Acceso restringido</h2><p style={{fontSize:14,color:"var(--g5)",marginTop:8}}>Necesitas iniciar sesión como administrador.</p><button className="bh" style={{...BPblue,marginTop:20}} onClick={()=>setShowLogin(true)}>Iniciar Sesión</button></div>}

      {/* MODALS */}
      <Modal open={showLogin} onClose={()=>setShowLogin(false)} title="Login"><LoginForm onLogin={handleLogin} onClose={()=>setShowLogin(false)}/></Modal>
      <Modal open={!!modalM} onClose={()=>setModalM(null)} title={modalM==="new"?"Nuevo Miembro":"Editar Miembro"} wide><MemberForm member={modalM!=="new"?modalM:null} onSave={saveMember} onCancel={()=>setModalM(null)}/></Modal>
      <Modal open={!!modalE} onClose={()=>setModalE(null)} title={modalE==="new"?"Crear Evento":"Editar Evento"}><EventForm event={modalE!=="new"?modalE:null} onSave={saveEvent} onCancel={()=>setModalE(null)}/></Modal>
      <Modal open={!!viewM} onClose={()=>{setViewM(null);setShowCard(false)}} title={showCard?"Carnet":"Detalle del Miembro"} footer={isAdmin&&<><button className="bh" style={BD} onClick={()=>setDel({t:"m",id:viewM?.id})}>Eliminar</button><button className="bh" style={BF} onClick={()=>{setViewM(null);setShowCard(false)}}>Cerrar</button></>}>{viewM&&<MemberDetail member={viewM} onEdit={m=>{setViewM(null);setModalM(m)}} showCard={showCard} setShowCard={setShowCard}/>}</Modal>

      {/* Event detail with registrations */}
      <Modal open={!!viewE} onClose={()=>setViewE(null)} title="Detalle del Evento" wide footer={isAdmin&&<><button className="bh" style={BD} onClick={()=>setDel({t:"e",id:viewE?.id})}>Eliminar</button><button className="bh" style={BF} onClick={()=>{setViewE(null);setModalE(viewE)}}>Editar</button><button className="bh" style={BF} onClick={()=>setViewE(null)}>Cerrar</button></>}>
        {viewE&&<div style={{display:"grid",gridTemplateColumns:isAdmin?"1fr 300px":"1fr",gap:28}}>
          <div>{viewE.image&&<img src={viewE.image} alt="" style={{width:"100%",height:200,objectFit:"cover",borderRadius:8,marginBottom:18}}/>}<div style={{display:"flex",gap:6,marginBottom:14}}><EvBadge type={viewE.type}/>{viewE.featured&&<span style={{fontSize:10,fontFamily:"var(--fh)",color:"var(--org)",fontWeight:700,padding:"4px 12px",background:"#fef7e0",borderRadius:4}}>★</span>}</div><h2 style={{fontSize:24,fontFamily:"var(--fh)",fontWeight:800,marginBottom:16}}>{viewE.title}</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 28px",marginBottom:20}}>{[["Fecha",fmtD(viewE.date)+(viewE.end_date&&viewE.end_date!==viewE.date?" — "+fmtD(viewE.end_date):"")],viewE.time&&["Hora",viewE.time],["Lugar",viewE.location],["Ciudad",viewE.city],viewE.max_participants&&["Cupo",viewE.max_participants]].filter(Boolean).map(([l,v],i)=> <div key={i}><div style={{fontSize:10,fontFamily:"var(--fh)",color:"var(--g5)",textTransform:"uppercase",letterSpacing:".12em",fontWeight:700,marginBottom:3}}>{l}</div><div style={{fontSize:14,fontWeight:500}}>{v}</div></div>)}</div>{viewE.description&&<><div style={{fontSize:10,fontFamily:"var(--fh)",color:"var(--g5)",textTransform:"uppercase",letterSpacing:".12em",fontWeight:700,marginBottom:6}}>Descripción</div><p style={{fontSize:14,color:"var(--g7)",lineHeight:1.8}}>{viewE.description}</p></>}</div>
          {isAdmin&&<div style={{borderLeft:"1px solid var(--g2)",paddingLeft:28}}>
            <div style={{fontSize:12,fontFamily:"var(--fh)",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--acc)",marginBottom:4}}>Inscritos</div>
            <div style={{fontSize:24,fontFamily:"var(--fh)",fontWeight:800,marginBottom:12}}>{getRegs(viewE.id).length}<span style={{fontSize:14,color:"var(--g5)",fontWeight:400}}>/{viewE.max_participants||"∞"}</span></div>
            <div style={{width:"100%",height:6,background:"var(--g1)",borderRadius:3,overflow:"hidden",marginBottom:16}}><div style={{width:`${Math.min(100,getRegs(viewE.id).length/(viewE.max_participants||999)*100)}%`,height:"100%",background:"var(--acc)",borderRadius:3}}/></div>
            <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:340,overflowY:"auto"}}>{members.map(m=>{const isR=getRegs(viewE.id).some(r=>r.member_id===m.id);return <div key={m.id} onClick={()=>toggleReg(viewE.id,m.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:6,border:`1px solid ${isR?"var(--acc)":"var(--g2)"}`,background:isR?"#e8f0fe":"transparent",cursor:"pointer",transition:"all .2s"}}><div style={{width:26,height:26,borderRadius:6,background:isR?"var(--acc)":"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontFamily:"var(--fh)",fontWeight:700,color:isR?"#fff":"var(--g5)",flexShrink:0}}>{isR?<Ic d={ic.check} s={14} c="#fff"/>:initials(m)}</div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:isR?"var(--acc)":"var(--bk)"}}>{fullName(m)}</div><div style={{fontSize:10,color:"var(--g5)"}}>{m.moto_reference}</div></div></div>})}</div>
          </div>}
        </div>}
      </Modal>

      <Confirm open={!!del} onClose={()=>setDel(null)} onOk={()=>{if(del?.t==="m")deleteMember(del.id);else deleteEvent(del.id);}} msg={del?.t==="m"?"¿Eliminar este miembro?":"¿Eliminar este evento?"}/>

      {/* FOOTER */}
      <footer style={{background:"var(--g0)",padding:"40px 32px 24px",borderTop:"1px solid var(--g2)"}}>
        <div style={{...W,display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
          <Tri/>
          <div style={{display:"flex",alignItems:"flex-start",gap:40,flexWrap:"wrap",justifyContent:"center",marginTop:8}}>
            {[{t:"BMW Motorrad Club",s:"Ibagué Colombia",icon:"moto"},{t:"BMW Motorrad Club",s:"Colombia",icon:"moto"},{t:"BMW Clubs",s:"Latin America\nFederation",icon:"globe"},{t:"BMW Clubs",s:"International Council",icon:"globe"}].map((item,i)=> <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:200}}>
              <svg width={36} height={36} viewBox="0 0 100 100" style={{marginBottom:10}}><circle cx="50" cy="50" r="48" fill="none" stroke="#999" strokeWidth="2.5"/><path d="M50 7L50 50L7 50A43 43 0 0150 7Z" fill="var(--blue)"/><path d="M50 93L50 50L93 50A43 43 0 0150 93Z" fill="var(--blue)"/><path d="M50 7L50 50L93 50A43 43 0 0050 7Z" fill="#fff"/><path d="M50 93L50 50L7 50A43 43 0 0050 93Z" fill="#fff"/></svg>
              <div style={{width:"100%",height:1,background:"var(--g3)",marginBottom:10}}/>
              <div style={{fontSize:14,fontFamily:"var(--fh)",fontWeight:700,color:"var(--bk)",lineHeight:1.3,marginBottom:2}}>{item.t}</div>
              {item.s.split("\n").map((line,j)=> <div key={j} style={{fontSize:14,fontFamily:"var(--fh)",fontWeight:400,color:"var(--g5)",lineHeight:1.3}}>{line}</div>)}
              <div style={{width:"100%",aspectRatio:"16/10",marginTop:10,borderRadius:4,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:item.icon==="globe"?"var(--acc)":"var(--g1)"}}>{item.icon==="globe"?<svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>:<Ic d={ic.moto} s={48} c="var(--g3)"/>}</div>
              <div style={{width:"100%",height:1,background:"var(--g3)",marginTop:10}}/>
            </div>)}
          </div>
          <div style={{fontSize:11,fontFamily:"var(--fh)",color:"var(--g3)",fontWeight:300,letterSpacing:".1em"}}>Make Life a Ride</div>
        </div>
      </footer>
    </div>
  </>;
}
