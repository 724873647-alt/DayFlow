import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, CheckCircle2, Circle, Clock3, Command, Compass, Flame, Plus, Search, Send, Sparkles, Target, Trash2, TrendingUp, X } from "lucide-react";

type Task = { id:string; title:string; dueDate:string|null; priority:"low"|"medium"|"high"; completed:boolean; category:string; createdAt:string };
type Tab = "plan"|"news"|"tasks"|"summary";
const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const today = new Date().toISOString().slice(0,10);
const dateLabel = new Intl.DateTimeFormat("zh-CN",{weekday:"long",month:"long",day:"numeric"}).format(new Date());
const starter: Task[] = [
 {id:"demo-1",title:"规划本周最重要的三件事",dueDate:today,priority:"high",completed:false,category:"个人",createdAt:new Date().toISOString()},
 {id:"demo-2",title:"留出 30 分钟阅读时间",dueDate:today,priority:"medium",completed:false,category:"成长",createdAt:new Date().toISOString()},
 {id:"demo-3",title:"整理桌面与工作空间",dueDate:today,priority:"low",completed:true,category:"生活",createdAt:new Date().toISOString()}
];
const tabs:{id:Tab;label:string;icon:typeof CalendarDays}[]=[{id:"plan",label:"计划",icon:CalendarDays},{id:"news",label:"资讯",icon:Compass},{id:"tasks",label:"任务",icon:CheckCircle2},{id:"summary",label:"总结",icon:TrendingUp}];

export default function App(){
 const [tab,setTab]=useState<Tab>("plan");
 const [tasks,setTasks]=useState<Task[]>([]);
 const [online,setOnline]=useState(false);
 const [draft,setDraft]=useState("");
 const [priority,setPriority]=useState<Task["priority"]>("medium");
 const [showAdd,setShowAdd]=useState(false);
 const [assistant,setAssistant]=useState(false);
 const [query,setQuery]=useState("");
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [aiText,setAiText]=useState("");
 const [aiReply,setAiReply]=useState("你好！我是 DayFlow 助手。你可以告诉我想完成什么，我会帮你整理成清晰的下一步。");
 useEffect(()=>{fetch(API+"/tasks").then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{setTasks(d.tasks);setOnline(true)}).catch(()=>{setTasks(starter);setOnline(false)})},[]);
 const done=tasks.filter(t=>t.completed).length;
 const pending=tasks.filter(t=>!t.completed);
 const progress=tasks.length?Math.round(done/tasks.length*100):0;
 const visible=useMemo(()=>tasks.filter(t=>t.title.toLowerCase().includes(query.toLowerCase())),[tasks,query]);
 async function persist(next:Task[]){setTasks(next);if(online){try{const r=await fetch(API+"/tasks/sync",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({tasks:next})});if(!r.ok)throw Error();}catch{setOnline(false);setNotice("与服务器同步失败，当前显示内容暂留在本次页面中。");}}}
 async function addTask(){const title=draft.trim();if(!title)return;const task:Task={id:crypto.randomUUID(),title,dueDate:today,priority,completed:false,category:"收件箱",createdAt:new Date().toISOString()};const next=[task,...tasks];await persist(next);setDraft("");setShowAdd(false);setTab("tasks");}
 async function toggle(id:string){await persist(tasks.map(t=>t.id===id?{...t,completed:!t.completed}:t))}
 async function remove(id:string){await persist(tasks.filter(t=>t.id!==id))}
 async function ask(){if(!query.trim())return;setBusy(true);try{const r=await fetch(API+"/ai/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:query})});const d=await r.json();setAiReply(d.reply||"AI 服务暂不可用。");}catch{setAiReply("AI 服务尚未配置。请在服务端配置真实模型 API Key 后使用，我不会用模拟内容冒充 AI 回复。");}setQuery("");setBusy(false)}
 return <div className="app-shell">
  <aside className="sidebar"><div className="brand"><div className="brand-mark"><Command size={20}/></div><span>DayFlow</span></div><div className="workspace-label">个人工作台</div><nav>{tabs.map(t=><button key={t.id} className={tab===t.id?"nav-item active":"nav-item"} onClick={()=>setTab(t.id)}><t.icon size={18}/>{t.label}</button>)}</nav><div className="sidebar-bottom"><div className="sync-status"><span className={online?"status-dot":"status-dot offline"}/>{online?"已连接数据库":"演示模式 · API 未连接"}</div><div className="profile"><div className="avatar">D</div><div><b>我的空间</b><small>专注每一个当下</small></div></div></div></aside>
  <main className="main"><header className="topbar"><div className="mobile-brand"><div className="brand-mark"><Command size={17}/></div>DayFlow</div><div className="breadcrumb">工作台 <span>/</span> {tabs.find(t=>t.id===tab)?.label}</div><button className="icon-button search-trigger" onClick={()=>{setTab("tasks");document.getElementById("task-search")?.focus()}}><Search size={18}/></button></header>
  <div className="content">
   {notice&&<div className="notice">{notice}<button onClick={()=>setNotice("")}><X size={15}/></button></div>}
   {tab==="plan"&&<><div className="eyebrow">{dateLabel}</div><div className="page-heading"><div><h1>把今天，过得有条理。</h1><p>每一步都算数，慢慢来就很好。</p></div><button className="primary-button" onClick={()=>setShowAdd(true)}><Plus size={17}/> 新建任务</button></div>
    <div className="hero-card"><div className="hero-copy"><span className="hero-kicker"><Sparkles size={14}/> 今日节奏</span><h2>专注当下，<br/>让重要的事发生。</h2><p>今天已完成 {done} 项，还有 {pending.length} 项待处理。</p><button className="hero-link" onClick={()=>setTab("tasks")}>查看今日任务 <span>→</span></button></div><div className="progress-ring" style={{background:"conic-gradient(#fff "+progress+"%,rgba(255,255,255,.2) 0)"}}><div><strong>{progress}%</strong><small>已完成</small></div></div><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/></div>
    <section className="section"><div className="section-head"><div><h3>今日安排</h3><p>从一件小事开始</p></div><button className="text-button" onClick={()=>setTab("tasks")}>全部任务 <span>→</span></button></div><div className="task-list">{tasks.filter(t=>t.dueDate===today).slice(0,5).map(t=><TaskRow key={t.id} task={t} onToggle={toggle} onDelete={remove}/>) }{!tasks.some(t=>t.dueDate===today)&&<Empty text="今天还没有安排，给自己设定一个小目标吧。"/>}</div></section>
    <div className="insight-grid"><div className="mini-card"><div className="mini-icon blue"><Target size={18}/></div><span>待完成任务</span><b>{pending.length}<small> 项</small></b><p>一步一步推进</p></div><div className="mini-card"><div className="mini-icon amber"><Flame size={18}/></div><span>今日完成</span><b>{done}<small> 项</small></b><p>每一次完成都值得</p></div><div className="mini-card"><div className="mini-icon violet"><Clock3 size={18}/></div><span>今日进度</span><b>{progress}<small>%</small></b><p>保持自己的节奏</p></div></div>
   </>}
   {tab==="tasks"&&<><div className="eyebrow">保持清晰，持续前进</div><div className="page-heading"><div><h1>任务清单</h1><p>把想法变成行动，把行动变成习惯。</p></div><button className="primary-button" onClick={()=>setShowAdd(true)}><Plus size={17}/> 新建任务</button></div><div className="toolbar"><div className="search-box"><Search size={17}/><input id="task-search" placeholder="搜索任务..." value={query} onChange={e=>setQuery(e.target.value)}/></div><span className="muted">{visible.length} 项任务</span></div><div className="task-list card-list">{visible.map(t=><TaskRow key={t.id} task={t} onToggle={toggle} onDelete={remove}/>)}{!visible.length&&<Empty text="没有找到任务。试试新建一项吧。"/>}</div></>}
   {tab==="news"&&<><div className="eyebrow">保持好奇，持续输入</div><div className="page-heading"><div><h1>资讯探索</h1><p>精选信息，让输入更有价值。</p></div></div><div className="empty-panel"><div className="empty-symbol"><Compass size={26}/></div><h3>你的资讯空间正在准备中</h3><p>资讯源接入、频道订阅和真实 AI 摘要将在后续迭代中完成。这里不会展示伪造的新闻或摘要。</p><span className="feature-tag">下一阶段 · 资讯聚合与 AI 摘要</span></div></>}
   {tab==="summary"&&<><div className="eyebrow">回顾进步，发现节奏</div><div className="page-heading"><div><h1>今日总结</h1><p>看见自己的努力，也看见下一步。</p></div></div><div className="summary-card"><div><span>任务完成率</span><h2>{progress}%</h2><p>今天完成了 {done} 项任务，共有 {tasks.length} 项任务记录。</p></div><div className="summary-bar"><span style={{width:progress+"%"}}/></div></div><div className="insight-grid"><div className="mini-card"><span>已完成</span><b>{done}<small> 项</small></b></div><div className="mini-card"><span>待处理</span><b>{pending.length}<small> 项</small></b></div><div className="mini-card"><span>总任务</span><b>{tasks.length}<small> 项</small></b></div></div><div className="reflection"><Sparkles size={18}/><div><b>给今天的自己一句话</b><p>完成比完美更重要。为已经付出的努力点个赞。</p></div></div></>}
  </div></main>
  <nav className="mobile-tabs">{tabs.map(t=><button key={t.id} className={tab===t.id?"selected":""} onClick={()=>setTab(t.id)}><t.icon size={20}/><span>{t.label}</span></button>)}</nav>
  <button className="ai-fab" onClick={()=>setAssistant(true)} aria-label="打开 AI 助手"><Sparkles size={21}/></button>
  {showAdd&&<div className="modal-backdrop" onClick={()=>setShowAdd(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><h3>新建任务</h3><button className="icon-button" onClick={()=>setShowAdd(false)}><X size={18}/></button></div><label>任务名称</label><input autoFocus value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="例如：完成项目方案初稿"/><label>优先级</label><div className="priority-options">{(["low","medium","high"] as const).map(p=><button key={p} className={priority===p?"chosen":""} onClick={()=>setPriority(p)}>{p==="low"?"低":p==="medium"?"中":"高"}</button>)}</div><button className="primary-button full" onClick={addTask} disabled={!draft.trim()}>创建任务</button></div></div>}
  {assistant&&<div className="assistant-backdrop" onClick={()=>setAssistant(false)}><div className="assistant-panel" onClick={e=>e.stopPropagation()}><div className="assistant-head"><div className="assistant-avatar"><Sparkles size={18}/></div><div><b>DayFlow AI</b><small>智能工作助手</small></div><button className="icon-button" onClick={()=>setAssistant(false)}><X size={19}/></button></div><div className="assistant-body"><div className="assistant-message">{aiReply}</div><div className="assistant-note">AI 功能需要配置真实模型服务后启用。</div></div><div className="assistant-input"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="告诉我你正在计划什么..." onKeyDown={e=>e.key==="Enter"&&ask()}/><button onClick={ask} disabled={busy||!query.trim()}><Send size={17}/></button></div></div></div>}
 </div>
}
function TaskRow({task,onToggle,onDelete}:{task:Task;onToggle:(id:string)=>void;onDelete:(id:string)=>void}){return <div className={"task-row "+(task.completed?"completed":"")}><button className="check-button" onClick={()=>onToggle(task.id)}>{task.completed?<CheckCircle2 size={20}/>:<Circle size={20}/>}</button><div className="task-info"><b>{task.title}</b><div><span className={"priority "+task.priority}>{task.priority==="high"?"高优先级":task.priority==="medium"?"中优先级":"低优先级"}</span><span className="task-category">{task.category}</span></div></div><button className="delete-button" onClick={()=>onDelete(task.id)} aria-label="删除任务"><Trash2 size={16}/></button></div>}
function Empty({text}:{text:string}){return <div className="empty-inline"><Check size={18}/>{text}</div>}
