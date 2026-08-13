const ROLE_LABELS={maintenance:"維修窗口",control:"修管單位",quality:"品質機號窗口",quality_lead:"品質主窗口",correction:"品質勘正承辦人",general:"一般使用者"};
let state={user:null,role:"maintenance",page:"dashboard",orderView:"pending",packageScope:[],selectedOrder:null,selectedCorrection:null,orderFilter:{stage:"",aircraft:"",package:"",q:""},archiveFilter:{aircraft:"",package:"",wo:"",procedure:"",mr:"",serial:"",topSerial:"",title:"",ocr:"",dateFrom:"",dateTo:"",corrected:""}};

let orders=[
{id:1,package:"STY-B-58501-260801",wo:"2608001",task:"1",aircraftType:"A350-900",aircraft:"B-58501",date:"2026-08-01",title:"HYDRAULIC SYSTEM INSPECTION",procedure:"A2-291001-01-A-01",mr:"MR-2608-0001",serial:"HYD-000501",topSerial:"TOP-HYD-01",receipt:"已收到",match:"配對完成",confirm:"未確認",stage:"維修待送",assignee:"2400151",issue:false,issueText:"",sent:false,archived:false,corrected:false,attachments:1,ocr:"Hydraulic system inspection mechanic inspector signature",updated:"2026-08-05 08:42"},
{id:2,package:"STY-B-58501-260801",wo:"2608002",task:"1",aircraftType:"A350-900",aircraft:"B-58501",date:"2026-08-01",title:"LANDING GEAR VISUAL CHECK",procedure:"A2-321101-02-B-03",mr:"MR-2608-0002",serial:"LG-000221",topSerial:"TOP-LG-02",receipt:"尚未收到",match:"待配對",confirm:"未確認",stage:"已接收待處理",assignee:"2400151",issue:true,issueText:"有清單無檔案",sent:false,archived:false,corrected:false,attachments:0,ocr:"",updated:"2026-08-05 08:18"},
{id:3,package:"STY-B-58501-260801",wo:"2608003",task:"2",aircraftType:"A350-900",aircraft:"B-58501",date:"2026-08-01",title:"CABIN DOOR FUNCTION TEST",procedure:"A2-521001-03-A-02",mr:"MR-2608-0003",serial:"DOOR-00009",topSerial:"TOP-DOOR-03",receipt:"重複文件",match:"配對異常",confirm:"未確認",stage:"配對異常",assignee:"2400151",issue:true,issueText:"疑似收到兩份文件",sent:false,archived:false,corrected:false,attachments:2,ocr:"Cabin door test duplicate scan",updated:"2026-08-05 07:55"},
{id:4,package:"PRE-B-58211-260802",wo:"2608011",task:"1",aircraftType:"A321neo",aircraft:"B-58211",date:"2026-08-02",title:"ENGINE OIL SERVICING",procedure:"A2-791001-01-A-04",mr:"MR-2608-0011",serial:"ENG-000712",topSerial:"TOP-ENG-01",receipt:"已收到",match:"配對完成",confirm:"已確認",stage:"修管處理中",assignee:"2300087",issue:false,issueText:"",sent:true,archived:false,corrected:false,attachments:0,ocr:"Engine oil servicing quantity and signature",updated:"2026-08-04 16:31"},
{id:5,package:"PRE-B-58211-260802",wo:"2608012",task:"1",aircraftType:"A321neo",aircraft:"B-58211",date:"2026-08-02",title:"BRAKE WEAR CHECK",procedure:"A2-324201-02-C-01",mr:"MR-2608-0012",serial:"BRK-000301",topSerial:"TOP-LG-02",receipt:"已收到",match:"配對完成",confirm:"已確認",stage:"修管處理中",assignee:"2300087",issue:true,issueText:"Inspector stamp unclear",sent:true,archived:false,corrected:false,attachments:1,ocr:"Brake wear check inspector stamp unclear",updated:"2026-08-04 16:45"},
{id:6,package:"TRC-B-58302-260803",wo:"2608021",task:"1",aircraftType:"A330-900",aircraft:"B-58302",date:"2026-08-03",title:"APU OPERATIONAL CHECK",procedure:"A2-491001-01-B-02",mr:"MR-2608-0021",serial:"APU-000118",topSerial:"TOP-APU-01",receipt:"已收到",match:"配對完成",confirm:"已確認",stage:"品質處理中",assignee:"2200108",issue:false,issueText:"",sent:true,archived:false,corrected:false,attachments:0,ocr:"APU operational check mechanic inspector date",updated:"2026-08-05 08:10"},
{id:7,package:"TRC-B-58302-260803",wo:"2608022",task:"3",aircraftType:"A330-900",aircraft:"B-58302",date:"2026-08-03",title:"FUEL FILTER REPLACEMENT",procedure:"A2-281001-04-A-01",mr:"MR-2608-0022",serial:"FLT-000099",topSerial:"TOP-FUEL-01",receipt:"已收到",match:"配對完成",confirm:"已確認",stage:"待歸檔",assignee:"2200108",issue:false,issueText:"",sent:true,archived:false,corrected:false,attachments:1,ocr:"Fuel filter replacement signed and stamped",updated:"2026-08-05 08:24"},
{id:8,package:"STY-B-58503-260731",wo:"2607081",task:"1",aircraftType:"A350-900",aircraft:"B-58503",date:"2026-07-31",title:"OXYGEN PRESSURE CHECK",procedure:"A2-351001-01-A-03",mr:"MR-2607-0081",serial:"OXY-000133",topSerial:"TOP-OXY-01",receipt:"已收到",match:"配對完成",confirm:"已確認",stage:"已完成",assignee:"2200120",issue:false,issueText:"",sent:true,archived:true,corrected:false,attachments:0,ocr:"Oxygen pressure 1850 psi mechanic signature",updated:"2026-08-01 10:12"},
{id:9,package:"STY-B-58503-260731",wo:"2607082",task:"2",aircraftType:"A350-900",aircraft:"B-58503",date:"2026-07-31",title:"EMERGENCY LIGHT TEST",procedure:"A2-331001-07-C-01",mr:"MR-2607-0082",serial:"LGT-000710",topSerial:"TOP-ELEC-03",receipt:"已收到",match:"配對完成",confirm:"已確認",stage:"已完成",assignee:"2200120",issue:false,issueText:"",sent:true,archived:true,corrected:true,attachments:1,ocr:"Emergency light functional test corrected version",updated:"2026-08-02 14:22"},
{id:10,package:"PRE-B-58209-260804",wo:"2608031",task:"1",aircraftType:"A321neo",aircraft:"B-58209",date:"2026-08-04",title:"WINDSHIELD HEAT TEST",procedure:"A2-301001-06-A-02",mr:"MR-2608-0031",serial:"WIN-000402",topSerial:"TOP-WIN-01",receipt:"已收到",match:"配對完成",confirm:"已取消",stage:"已取消",assignee:"-",issue:false,issueText:"",sent:false,archived:false,corrected:false,attachments:0,ocr:"Cancelled work order",updated:"2026-08-04 09:03"},
{id:11,package:"TRC-B-58301-260804",wo:"2608041",task:"1",aircraftType:"A330-900",aircraft:"B-58301",date:"2026-08-04",title:"FLIGHT CONTROL LUBRICATION",procedure:"A2-271001-18-B-04",mr:"MR-2608-0041",serial:"FCL-000128",topSerial:"TOP-FC-04",receipt:"有檔案無清單",match:"配對失敗",confirm:"未確認",stage:"配對異常",assignee:"2400151",issue:true,issueText:"UM 無對應 WO",sent:false,archived:false,corrected:false,attachments:0,ocr:"Flight control lubrication scan",updated:"2026-08-05 08:58"},
{id:12,package:"STY-B-58502-260805",wo:"2608051",task:"1",aircraftType:"A350-900",aircraft:"B-58502",date:"2026-08-05",title:"AVIONICS COOLING CHECK",procedure:"A2-211001-19-A-01",mr:"MR-2608-0051",serial:"AVN-000551",topSerial:"TOP-AV-02",receipt:"已收到",match:"配對完成",confirm:"未確認",stage:"駁回待修正",assignee:"2400151",issue:true,issueText:"日期欄位未填",sent:false,archived:false,corrected:false,attachments:1,ocr:"Avionics cooling check missing date",updated:"2026-08-05 09:05"}];

let corrections=[
{id:"COR-2026-0007",orderId:9,package:"STY-B-58503-260731",wo:"2607082",aircraft:"B-58503",reason:"簽署資料錯誤",location:"第 2 頁 Inspector 欄",description:"Inspector 日期誤植，需重新簽署並上傳修正版。",person:"2400151",status:"待品質承辦複核",node:"品質勘正承辦人",age:"3 小時",deadline:"2026-08-06 17:00",version:"V2"},
{id:"COR-2026-0008",orderId:8,package:"STY-B-58503-260731",wo:"2607081",aircraft:"B-58503",reason:"文件內容錯誤",location:"Cover Page",description:"Procedure ID 與 UM 資料不一致。",person:"2300087",status:"待當事人處理",node:"當事人",age:"1 天 2 小時",deadline:"2026-08-05 16:00",version:"V1"}];

const content=document.getElementById("content"),modal=document.getElementById("modal"),modalCard=document.getElementById("modalCard");
document.getElementById("loginForm").addEventListener("submit",e=>{e.preventDefault();const id=loginId.value.trim(),password=loginPassword.value;if(!/^2\d{6}$/.test(id)){loginError.textContent="人員 ID 請輸入 2XXXXXX 格式。";return}if(password.length<8){loginError.textContent="Password 請輸入至少 8 碼。";return}state.user=id;state.role=loginRole.value;roleSwitch.value=state.role;userChip.textContent=id;loginPage.classList.add("hidden");appPage.classList.remove("hidden");render()});
roleSwitch.addEventListener("change",e=>{state.role=e.target.value;state.orderView="pending";state.orderFilter={stage:"",aircraft:"",package:"",q:""};render()});logoutBtn.addEventListener("click",()=>location.reload());menuBtn.addEventListener("click",()=>document.body.classList.toggle("menu-open"));
document.querySelectorAll(".sidebar nav button").forEach(btn=>btn.addEventListener("click",()=>{state.page=btn.dataset.page;state.selectedOrder=null;document.body.classList.remove("menu-open");render()}));modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));const count=s=>orders.filter(o=>o.stage===s).length;const checkedIds=()=>[...document.querySelectorAll(".row-check:checked")].map(x=>Number(x.value));const now=()=>new Date().toLocaleString("zh-TW",{hour12:false}).replaceAll("/","-");
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}function openModal(html,large=false){modalCard.className=`modal-card${large?" large":""}`;modalCard.innerHTML=html;modal.classList.add("open")}function closeModal(){modal.classList.remove("open")}function switchPage(p){state.page=p;render()}function setOrderStageFilter(stage){state.orderFilter={stage,aircraft:"",package:"",q:""};state.page="orders";render()}
function render(){document.querySelectorAll(".sidebar nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===state.page));({dashboard:renderDashboard,orders:renderOrders,corrections:renderCorrections,archive:renderArchive,analytics:renderAnalytics}[state.page]||renderDashboard)()}
function pageHead(t,d,r=""){return`<div class="page-head"><div><h1>${t}</h1><p>${d}</p></div>${r}</div>`}

function renderDashboard(){const active=orders.filter(o=>o.stage!=="已取消"),cardsByRole={maintenance:[["已接收待處理",count("已接收待處理"),"info","已取得清單或文件，尚待確認"],["維修待送",count("維修待送"),"primary","已確認，尚未送交修管"],["駁回待修正",count("駁回待修正"),"danger","後續單位退回之工單"],["配對異常",count("配對異常"),"warning","缺件、重複或配對失敗"]],control:[["修管處理中",count("修管處理中"),"primary","維修已送交修管"],["品質退回",count("品質退回"),"danger","品質退回修管確認"],["已送品質",count("品質處理中")+count("待歸檔"),"success","已完成修管處理"]],quality:[["我的待辦",count("品質處理中"),"primary","依機號分派給本人"],["待歸檔",count("待歸檔"),"warning","品質確認完成"],["已完成",count("已完成"),"success","已完成正式歸檔"]],quality_lead:[["單位整體待辦",count("品質處理中")+count("待歸檔"),"primary","品質單位全部案件"],["待分派／分派異常",1,"danger","無有效機號窗口"],["待歸檔",count("待歸檔"),"warning","品質確認完成"]],correction:[["待品質承辦處理",corrections.filter(c=>c.status.includes("品質")).length,"primary","初審、複核或重送"],["待當事人處理",corrections.filter(c=>c.node==="當事人").length,"warning","等待當事人修正"],["即將逾期",1,"danger","接近目前節點期限"]],general:[["待本人處理之勘正",corrections.filter(c=>c.node==="當事人").length,"primary","指派給本人的案件"],["本人提出之勘正",1,"info","查看目前流程進度"]]},cards=cardsByRole[state.role]||cardsByRole.maintenance,valid=["已接收待處理","維修待送","駁回待修正","配對異常","修管處理中","品質處理中","待歸檔","已完成"],progress=[["已接收",active.filter(o=>o.receipt==="已收到").length],["維修待送",count("維修待送")],["修管處理中",count("修管處理中")],["品質處理中",count("品質處理中")],["待歸檔",count("待歸檔")],["已完成",count("已完成")]],recent=[...orders].sort((a,b)=>b.updated.localeCompare(a.updated)).slice(0,6);
content.innerHTML=pageHead("個人工作總覽","依目前角色顯示待辦、異常與整體進度。",`<span class="role-tag">${ROLE_LABELS[state.role]}</span>`)+`<div class="card-grid">${cards.map(c=>`<button class="metric ${c[2]}" onclick="${valid.includes(c[0])?`setOrderStageFilter('${c[0]}')`:"switchPage('corrections')"}"><span>${c[0]}</span><strong>${c[1]}</strong><small>${c[3]}</small></button>`).join("")}</div><div class="two-col"><section class="panel"><div class="panel-head"><h2>異常警示</h2><span>可點入工單清單處理</span></div><div class="alert-grid"><button onclick="setOrderStageFilter('已接收待處理')"><strong>${active.filter(o=>o.receipt==="尚未收到").length}</strong><span>有清單無檔案</span></button><button onclick="setOrderStageFilter('配對異常')"><strong>${active.filter(o=>["配對異常","配對失敗"].includes(o.match)).length}</strong><span>配對異常</span></button><button onclick="setOrderStageFilter('配對異常')"><strong>${active.filter(o=>o.receipt==="重複文件").length}</strong><span>重複文件</span></button><button onclick="switchPage('orders')"><strong>${active.filter(o=>o.issue).length}</strong><span>問題標記</span></button></div></section><section class="panel"><div class="panel-head"><h2>整體進度</h2><span>各階段工單數</span></div><div class="progress-list">${progress.map(p=>`<div><span>${p[0]}</span><div class="bar"><i style="width:${Math.min(p[1]*14,100)}%"></i></div><b>${p[1]}</b></div>`).join("")}</div></section></div><section class="panel"><div class="panel-head"><h2>最近更新</h2><button class="linklike" onclick="switchPage('orders')">查看全部</button></div><div class="table-wrap"><table><thead><tr><th>PACKAGE</th><th>WO/Task</th><th>機號</th><th>Procedure ID</th><th>狀態</th><th>更新時間</th></tr></thead><tbody>${recent.map(o=>`<tr><td><button class="linklike" onclick="openPackage('${o.package}')">${o.package}</button></td><td>${o.wo}/${o.task}</td><td>${o.aircraft}</td><td>${o.procedure}</td><td><span class="badge">${o.stage}</span></td><td>${o.updated}</td></tr>`).join("")}</tbody></table></div></section>`}

function getRoleOrderConfig(){
  const configs={
    maintenance:{
      pending:["已接收待處理","維修待送","配對異常","駁回待修正"],
      processed:["修管處理中","品質處理中","待歸檔","已完成"]
    },
    control:{
      pending:["修管處理中","品質退回"],
      processed:["品質處理中","待歸檔","已完成"]
    },
    quality:{
      pending:["品質處理中","待歸檔"],
      processed:["已完成"]
    },
    quality_lead:{
      pending:["品質處理中","待歸檔"],
      processed:["已完成"]
    },
    correction:{pending:[],processed:[]},
    general:{pending:[],processed:[]}
  };
  return configs[state.role]||configs.maintenance;
}

function getRoleScopedOrders(view=state.orderView){
  const config=getRoleOrderConfig();
  const stages=view==="processed"?config.processed:config.pending;
  return orders.filter(o=>stages.includes(o.stage));
}

function setOrderView(view){
  state.orderView=view;
  state.orderFilter={stage:"",aircraft:"",package:"",q:""};
  state.selectedOrder=null;
  renderOrders();
}

function renderOrders(){
  const f=state.orderFilter;
  const config=getRoleOrderConfig();
  const scoped=getRoleScopedOrders();
  const allowedStages=state.orderView==="processed"?config.processed:config.pending;

  let data=scoped.filter(o=>
    (!f.stage||o.stage===f.stage)&&
    (!f.aircraft||o.aircraft===f.aircraft)&&
    (!f.package||o.package.toLowerCase().includes(f.package.toLowerCase()))
  );

  if(f.q){
    const q=f.q.toLowerCase();
    data=data.filter(o=>[o.package,o.wo,o.title,o.aircraft,o.procedure,o.mr]
      .some(v=>v.toLowerCase().includes(q)));
  }

  const aircrafts=[...new Set(scoped.map(o=>o.aircraft))].sort();
  const packageIds=[...new Set(data.map(o=>o.package))];
  state.packageScope=packageIds;

  const packageCards=packageIds.map(pkg=>{
    const items=data.filter(o=>o.package===pkg);
    const aircraft=items[0]?.aircraft||"";
    const issueCount=items.filter(o=>o.issue).length;
    const sentCount=items.filter(o=>o.sent).length;
    return `<button type="button" class="pkg-card" onclick="openPackage('${pkg}')">
      <strong>${pkg}</strong>
      <span>${aircraft}｜${items.length} 張工單</span>
      <small>問題 ${issueCount}｜已送 ${sentCount}</small>
    </button>`;
  }).join("");

  const pendingCount=getRoleScopedOrders("pending").length;
  const processedCount=getRoleScopedOrders("processed").length;
  const isProcessed=state.orderView==="processed";

  content.innerHTML=pageHead(
    "工單確認與簽核",
    `預設顯示「${ROLE_LABELS[state.role]}」目前站點可處理的工單。`,
    isProcessed
      ? `<span class="role-tag">已處理紀錄｜唯讀</span>`
      : `<div class="head-actions"><button class="btn" onclick="batchAction('confirm')">批次確認</button><button class="btn primary" onclick="batchAction('send')">批次送出</button></div>`
  )
  +`<section class="panel order-mode-bar">
      <div class="tab-group">
        <button type="button" class="tab-btn ${!isProcessed?"active":""}" onclick="setOrderView('pending')">
          待本站點處理 <b>${pendingCount}</b>
        </button>
        <button type="button" class="tab-btn ${isProcessed?"active":""}" onclick="setOrderView('processed')">
          本站點已處理 <b>${processedCount}</b>
        </button>
      </div>
      <span>目前站點：${ROLE_LABELS[state.role]}</span>
    </section>`
  +`<section class="panel pkg-browser">
      <div class="panel-head">
        <h2>${isProcessed?"已處理 PACKAGE":"待處理 PACKAGE"} 快速選擇</h2>
        <span>只列出目前頁籤與篩選條件內的 PACKAGE</span>
      </div>
      <div class="pkg-browser-controls">
        <button type="button" class="btn" onclick="scrollPackageList(-1)" ${packageIds.length?"":"disabled"}>← 往前</button>
        <select id="quickPackageSelect" onchange="if(this.value)openPackage(this.value)" ${packageIds.length?"":"disabled"}>
          <option value="">${packageIds.length?"選擇 PACKAGE...":"目前沒有 PACKAGE"}</option>
          ${packageIds.map((pkg,index)=>`<option value="${pkg}">${index+1}. ${pkg}</option>`).join("")}
        </select>
        <button type="button" class="btn primary" onclick="scrollPackageList(1)" ${packageIds.length?"":"disabled"}>往後 →</button>
      </div>
      <div id="packageCardList" class="pkg-card-list">
        ${packageCards||`<div class="empty">目前站點沒有${isProcessed?"已處理":"待處理"}工單。</div>`}
      </div>
    </section>`
  +`<form id="orderFilter" class="filter panel">
      <label>處理階段
        <select id="fStage">
          <option value="">目前頁籤全部階段</option>
          ${allowedStages.map(x=>`<option ${f.stage===x?"selected":""}>${x}</option>`).join("")}
        </select>
      </label>
      <label>機號
        <select id="fAircraft">
          <option value="">全部</option>
          ${aircrafts.map(x=>`<option ${f.aircraft===x?"selected":""}>${x}</option>`).join("")}
        </select>
      </label>
      <label>PACKAGE<input id="fPackage" value="${esc(f.package)}" placeholder="STY/PRE/TRC-B-XXXXX-YYMMDD"></label>
      <label>關鍵字<input id="fQ" value="${esc(f.q)}" placeholder="WO、Procedure ID、MR ID..."></label>
      <button class="btn primary">套用篩選</button>
      <button type="button" class="btn" onclick="clearOrderFilter()">清除</button>
    </form>`
  +`<section class="panel">
      <div class="panel-head">
        <h2>${isProcessed?"已處理工單":"待本站點處理工單"}</h2>
        <span>共 ${data.length} 筆</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            ${isProcessed?"":"<th><input type='checkbox' onchange='toggleAll(this)'></th>"}
            <th>PACKAGE</th><th>WO/Task</th><th>機型/機號</th><th>Procedure ID</th>
            <th>接收/配對</th><th>處理狀態</th><th>承辦人</th>
          </tr></thead>
          <tbody>
            ${data.length?data.map(o=>`<tr class="${o.issue?"row-issue":""}">
              ${isProcessed?"":`<td><input class="row-check" type="checkbox" value="${o.id}"></td>`}
              <td><button class="linklike" onclick="openPackage('${o.package}')">${o.package}</button></td>
              <td><strong>${o.wo}/${o.task}</strong><small>${o.title}</small></td>
              <td>${o.aircraftType}<small>${o.aircraft}</small></td>
              <td>${o.procedure}</td>
              <td>${o.receipt}<small>${o.match}</small></td>
              <td><span class="badge">${o.stage}</span>${o.issue?`<small class="danger-text">⚠ ${esc(o.issueText)}</small>`:""}</td>
              <td>${o.assignee}</td>
            </tr>`).join(""):`<tr><td colspan="${isProcessed?7:8}" class="empty">沒有符合條件的工單。</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>`;

  orderFilter.addEventListener("submit",e=>{
    e.preventDefault();
    state.orderFilter={stage:fStage.value,aircraft:fAircraft.value,package:fPackage.value,q:fQ.value};
    renderOrders();
  });
}
function scrollPackageList(direction){
  const list=document.getElementById("packageCardList");
  if(list)list.scrollBy({left:direction*420,behavior:"smooth"});
}
function clearOrderFilter(){state.orderFilter={stage:"",aircraft:"",package:"",q:""};renderOrders()}function toggleAll(el){document.querySelectorAll(".row-check").forEach(x=>x.checked=el.checked)}
function batchAction(action){const ids=checkedIds();if(!ids.length){toast("請先勾選工單。");return}let changed=0,skipped=[];ids.forEach(id=>{const o=orders.find(x=>x.id===id);if(!o||o.stage==="已取消")return;if(action==="confirm"){if(o.receipt==="已收到"&&o.match==="配對完成"){o.confirm="已確認";o.stage="維修待送";changed++}else skipped.push(o.wo)}if(action==="send"){if(o.confirm!=="已確認"||o.issue){skipped.push(o.wo);return}if(state.role==="maintenance"){o.stage="修管處理中";o.assignee="2300087"}else if(state.role==="control"){o.stage="品質處理中";o.assignee="2200108"}else{o.stage="待歸檔"}o.sent=true;changed++}o.updated=now()});toast(`已處理 ${changed} 張。${skipped.length?" 未符合條件："+skipped.join("、"):""}`);render()}

function openPackage(pkg){
  const scopedPackageIds=state.packageScope?.length
    ?state.packageScope
    :[...new Set(getRoleScopedOrders().map(o=>o.package))];

  const packageIds=scopedPackageIds.includes(pkg)
    ?scopedPackageIds
    :[...new Set([...scopedPackageIds,pkg])];

  const currentIndex=packageIds.indexOf(pkg);
  const previousPackage=currentIndex>0?packageIds[currentIndex-1]:null;
  const nextPackage=currentIndex>=0&&currentIndex<packageIds.length-1?packageIds[currentIndex+1]:null;
  const items=orders.filter(o=>o.package===pkg);
  const pendingStages=getRoleOrderConfig().pending;
  const isProcessed=state.orderView==="processed";

  state.selectedOrder=items[0]?.id||null;

  content.innerHTML=pageHead(
    pkg,
    isProcessed
      ?"本站點已處理紀錄，保留 PACKAGE 全部工單供查閱。"
      :"PACKAGE 內顯示全部應收工單，僅目前站點可處理項目提供操作。",
    `<div class="summary-chips"><span>總數 ${items.length}</span><span>已收 ${items.filter(o=>o.receipt==="已收到").length}</span><span>問題 ${items.filter(o=>o.issue).length}</span><span>已送 ${items.filter(o=>o.sent).length}</span></div>`
  )
  +`<section class="panel pkg-nav">
      <button class="btn" ${previousPackage?"":"disabled"} onclick="${previousPackage?`openPackage('${previousPackage}')`:""}">← 上一個 PKG</button>
      <label>
        <span>快速切換目前頁籤的 PACKAGE</span>
        <select onchange="openPackage(this.value)">
          ${packageIds.map((id,index)=>`<option value="${id}" ${id===pkg?"selected":""}>${index+1}. ${id}</option>`).join("")}
        </select>
      </label>
      <span class="pkg-position">${currentIndex+1} / ${packageIds.length}</span>
      <button class="btn primary" ${nextPackage?"":"disabled"} onclick="${nextPackage?`openPackage('${nextPackage}')`:""}">下一個 PKG →</button>
    </section>`
  +`<div class="workspace">
      <section class="panel order-pane">
        <div class="panel-head">
          <h2>工單清單</h2>
          ${isProcessed
            ?`<span>已處理紀錄僅供查看</span>`
            :`<div><button class="btn small" onclick="batchAction('confirm')">確認勾選</button> <button class="btn small primary" onclick="batchAction('send')">送出勾選</button></div>`}
        </div>
        <div class="order-list">
          ${items.map(o=>{
            const actionable=!isProcessed&&pendingStages.includes(o.stage);
            return `<article class="order-card ${o.issue?"problem":""}" onclick="selectOrder(${o.id})">
              ${isProcessed
                ?`<span></span>`
                :`<input class="row-check" type="checkbox" value="${o.id}" ${actionable?"":"disabled"} onclick="event.stopPropagation()">`}
              <div>
                <strong>${o.wo}/${o.task}</strong>
                <span>${o.title}</span>
                <small>${o.procedure}</small>
              </div>
              <div class="order-status">
                <span class="badge">${o.receipt}</span>
                <small>${o.stage}</small>
                ${actionable?"":`<small class="readonly-text">${isProcessed?"已處理":"非目前站點"}</small>`}
              </div>
            </article>`;
          }).join("")}
        </div>
      </section>
      <section class="panel preview-pane">
        <div class="panel-head"><h2>文件預覽</h2><span id="previewWo"></span></div>
        <div id="previewToolbar" class="preview-toolbar"></div>
        <div id="docPreview" class="document-preview"></div>
      </section>
    </div>`;

  selectOrder(state.selectedOrder);
}
function selectOrder(id){
  state.selectedOrder=id;
  const o=orders.find(x=>x.id===id);
  if(!o)return;

  const actionable=state.orderView==="pending"&&getRoleOrderConfig().pending.includes(o.stage);
  previewWo.textContent=`${o.wo}/${o.task}`;
  previewToolbar.innerHTML=actionable
    ?`<button class="btn small" onclick="markIssue()">標記有問題</button><button class="btn small primary" onclick="confirmCurrent()">確認本張</button>`
    :`<span class="readonly-note">${state.orderView==="processed"?"本站點已處理紀錄，僅供查看。":"此工單目前不在本站點處理階段。"}</span>`;

  docPreview.innerHTML=`<div class="paper">
    <h3>MAINTENANCE WORK RECORD</h3>
    <div class="paper-grid">
      <div><label>PACKAGE</label><strong>${o.package}</strong></div>
      <div><label>WO / TASK</label><strong>${o.wo} / ${o.task}</strong></div>
      <div><label>AIRCRAFT</label><strong>${o.aircraftType} / ${o.aircraft}</strong></div>
      <div><label>EXECUTION DATE</label><strong>${o.date}</strong></div>
      <div><label>PROCEDURE ID</label><strong>${o.procedure}</strong></div>
      <div><label>ASSIGNEE ID</label><strong>${o.assignee}</strong></div>
    </div>
    <h4>${o.title}</h4>
    <p>此區模擬瀏覽器內嵌 PDF 文件。</p>
    <p>Receipt：${o.receipt}　｜　Match：${o.match}</p>
    <p>OCR Cover Page：${o.ocr||"No OCR content"}</p>
    <hr>
    <p>Mechanic Signature：____________________</p>
    <p>Inspector Stamp：_____________________</p>
  </div>`;
}
function markIssue(){const o=orders.find(x=>x.id===state.selectedOrder);if(!o)return;const text=prompt("請輸入問題說明：",o.issueText||"簽署或文件內容需確認");if(text===null)return;o.issue=true;o.issueText=text;o.updated=now();toast("問題標記已更新。");openPackage(o.package)}function confirmCurrent(){const o=orders.find(x=>x.id===state.selectedOrder);if(!o)return;if(o.receipt!=="已收到"||o.match!=="配對完成"){toast("文件尚未完整接收或配對。");return}o.confirm="已確認";o.stage="維修待送";o.updated=now();toast("工單已確認。");openPackage(o.package)}

function renderCorrections(){const s=corrections.find(c=>c.id===state.selectedCorrection);content.innerHTML=pageHead("工單勘正作業","建立、初審、主管核准、當事人修正及品質複核。",`<button class="btn primary" onclick="showCreateCorrection()">建立勘正單</button>`)+`<div class="two-col"><section class="panel"><div class="panel-head"><h2>勘正案件清單</h2><span>${corrections.length} 件</span></div><div class="case-list">${corrections.map(c=>`<article class="case-card ${s?.id===c.id?"selected":""}" onclick="state.selectedCorrection='${c.id}';renderCorrections()"><div><strong>${c.id}</strong><span>${c.status}</span></div><p>${c.package}｜WO ${c.wo}｜${c.aircraft}</p><small>目前節點：${c.node}　停留：${c.age}</small></article>`).join("")}</div></section><section class="panel">${s?`<div class="panel-head"><h2>${s.id}</h2><span class="badge">${s.status}</span></div><div class="detail-grid"><div><label>PACKAGE</label><strong>${s.package}</strong></div><div><label>WO</label><strong>${s.wo}</strong></div><div><label>機號</label><strong>${s.aircraft}</strong></div><div><label>當事人</label><strong>${s.person}</strong></div><div><label>勘正原因</label><strong>${s.reason}</strong></div><div><label>錯誤位置</label><strong>${s.location}</strong></div></div><div class="note-box"><label>問題說明</label><p>${s.description}</p></div><div class="flowline">${["品質承辦初審","品質主管","當事人","當事人主管","品質承辦複核","最終核准"].map((x,i,a)=>`<span>${x}</span>${i<a.length-1?"<i>→</i>":""}`).join("")}</div><div class="head-actions"><button class="btn danger" onclick="correctionAction('reject')">退回</button><button class="btn primary" onclick="correctionAction('approve')">核准並送下一節點</button></div>`:`<div class="empty-preview"><p>請從左側選擇案件查看詳細內容。</p></div>`}</section></div>`}
function showCreateCorrection(){openModal(`<div class="panel-head"><h2>建立勘正單</h2><button class="icon-close" onclick="closeModal()">×</button></div><label>原工單<select id="cOrder">${orders.map(o=>`<option value="${o.id}">${o.package}｜${o.wo}｜${o.aircraft}</option>`).join("")}</select></label><label>勘正原因<select id="cReason"><option>簽署資料錯誤</option><option>文件內容錯誤</option><option>附件錯誤</option><option>其他</option></select></label><label>錯誤位置<input id="cLocation" placeholder="例如：第 2 頁 Inspector 欄"></label><label>問題說明<textarea id="cDescription"></textarea></label><label>當事人 ID<input id="cPerson" value="2400151"></label><button class="btn primary wide" onclick="createCorrection()">送出勘正單</button>`)}
function createCorrection(){const person=cPerson.value.trim();if(!/^2\d{6}$/.test(person)){toast("當事人 ID 請使用 2XXXXXX 格式。");return}const o=orders.find(x=>x.id===Number(cOrder.value)),id=`COR-2026-${String(corrections.length+9).padStart(4,"0")}`;corrections.push({id,orderId:o.id,package:o.package,wo:o.wo,aircraft:o.aircraft,reason:cReason.value,location:cLocation.value||"未填寫",description:cDescription.value||"未填寫",person,status:"待品質承辦初審",node:"品質勘正承辦人",age:"剛剛",deadline:"2026-08-07 17:00",version:"V1"});o.corrected=true;state.selectedCorrection=id;closeModal();toast(`已建立勘正單 ${id}`);renderCorrections()}
function correctionAction(action){const c=corrections.find(x=>x.id===state.selectedCorrection);if(!c)return;const flow={"待品質承辦初審":["待品質主管核准","品質勘正承辦人主管"],"待品質主管核准":["待當事人處理","當事人"],"待當事人處理":["待當事人主管核准","當事人主管"],"待當事人主管核准":["待品質承辦複核","品質勘正承辦人"],"待品質承辦複核":["待最終核准","品質勘正承辦人主管"],"待最終核准":["已完成","已結案"]};if(action==="reject"){const r=prompt("請輸入退回原因：","資料需補充");if(r===null)return;c.status="已退回";c.node="前一處理節點";toast("案件已退回並記錄原因。")}else{[c.status,c.node]=flow[c.status]||["已完成","已結案"];toast(`案件已送至：${c.node}`)}renderCorrections()}

function clearArchiveFilter(){
  state.archiveFilter={
    aircraft:"",package:"",wo:"",procedure:"",mr:"",
    serial:"",topSerial:"",title:"",ocr:"",
    dateFrom:"",dateTo:"",corrected:""
  };
  renderArchive();
}

function renderArchive(){
  const f=state.archiveFilter;
  let data=orders.filter(o=>o.archived);

  const contains=(value,keyword)=>
    !keyword||String(value||"").toLowerCase().includes(keyword.trim().toLowerCase());

  data=data.filter(o=>
    contains(o.aircraft,f.aircraft)&&
    contains(o.package,f.package)&&
    contains(o.wo,f.wo)&&
    contains(o.procedure,f.procedure)&&
    contains(o.mr,f.mr)&&
    contains(o.serial,f.serial)&&
    contains(o.topSerial,f.topSerial)&&
    contains(o.title,f.title)&&
    contains(o.ocr,f.ocr)&&
    (!f.dateFrom||o.date>=f.dateFrom)&&
    (!f.dateTo||o.date<=f.dateTo)&&
    (!f.corrected||
      (f.corrected==="yes"&&o.corrected)||
      (f.corrected==="no"&&!o.corrected))
  );

  const activeConditions=[
    ["機號",f.aircraft],["PACKAGE",f.package],["WO ID",f.wo],
    ["Procedure ID",f.procedure],["MR ID",f.mr],
    ["Serial Number",f.serial],["TOP Serial Number",f.topSerial],
    ["工單名稱",f.title],["OCR 關鍵字",f.ocr],
    ["執行日期起",f.dateFrom],["執行日期迄",f.dateTo],
    ["勘正狀態",f.corrected==="yes"?"曾勘正":f.corrected==="no"?"未勘正":""]
  ].filter(x=>x[1]);

  const conditionSummary=activeConditions.length
    ?activeConditions.map(x=>`<span>${x[0]}：${esc(x[1])}</span>`).join("")
    :`<span>目前未設定搜尋條件，顯示全部已歸檔工單。</span>`;

  content.innerHTML=
    pageHead(
      "已歸檔工單查詢與調閱",
      "各搜尋欄位可同時輸入，系統會以全部條件交集查找符合的工單。"
    )
    +`<form id="archiveSearch" class="panel archive-search-form">
        <div class="panel-head">
          <h2>複合條件搜尋</h2>
          <span>空白欄位不列入搜尋</span>
        </div>

        <div class="archive-search-grid">
          <label>機號
            <input id="aAircraft" value="${esc(f.aircraft)}" placeholder="B-58XXX">
          </label>
          <label>PACKAGE
            <input id="aPackage" value="${esc(f.package)}" placeholder="STY/PRE/TRC-B-XXXXX-YYMMDD">
          </label>
          <label>WO ID
            <input id="aWo" value="${esc(f.wo)}" maxlength="7" placeholder="7 碼 WO ID">
          </label>
          <label>Procedure ID
            <input id="aProcedure" value="${esc(f.procedure)}" placeholder="A2-XXXXXX-XX-X-XX">
          </label>

          <label>MR ID
            <input id="aMr" value="${esc(f.mr)}" placeholder="MR ID">
          </label>
          <label>Serial Number
            <input id="aSerial" value="${esc(f.serial)}" placeholder="Serial Number">
          </label>
          <label>TOP Serial Number
            <input id="aTopSerial" value="${esc(f.topSerial)}" placeholder="TOP Serial Number">
          </label>
          <label>工單名稱
            <input id="aTitle" value="${esc(f.title)}" placeholder="工單名稱或部分文字">
          </label>

          <label class="archive-wide">OCR 關鍵字
            <input id="aOcr" value="${esc(f.ocr)}" placeholder="Cover Page OCR 關鍵字">
          </label>
          <label>執行日期起
            <input id="aDateFrom" type="date" value="${esc(f.dateFrom)}">
          </label>
          <label>執行日期迄
            <input id="aDateTo" type="date" value="${esc(f.dateTo)}">
          </label>
          <label>是否曾勘正
            <select id="aCorrected">
              <option value="" ${!f.corrected?"selected":""}>全部</option>
              <option value="yes" ${f.corrected==="yes"?"selected":""}>曾勘正</option>
              <option value="no" ${f.corrected==="no"?"selected":""}>未勘正</option>
            </select>
          </label>
        </div>

        <div class="archive-search-actions">
          <button class="btn primary">搜尋</button>
          <button type="button" class="btn" onclick="clearArchiveFilter()">清除全部條件</button>
        </div>
      </form>

      <section class="panel archive-condition-panel">
        <div class="panel-head">
          <h2>目前搜尋條件</h2>
          <span>條件間採 AND 搜尋</span>
        </div>
        <div class="condition-chips">${conditionSummary}</div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>搜尋結果</h2>
          <span>${data.length} 筆｜OCR 範圍：Cover Page</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PACKAGE</th><th>WO</th><th>機號</th>
                <th>Procedure ID</th><th>MR ID</th>
                <th>歸檔版本</th><th>勘正</th><th>調閱</th>
              </tr>
            </thead>
            <tbody>
              ${data.length?data.map(o=>`<tr>
                <td>${o.package}</td>
                <td>${o.wo}/${o.task}</td>
                <td>${o.aircraft}</td>
                <td>${o.procedure}</td>
                <td>${o.mr}</td>
                <td>V${o.corrected?2:1}</td>
                <td>${o.corrected?"曾勘正":"否"}</td>
                <td><button class="btn small" onclick="showArchive(${o.id})">開啟</button></td>
              </tr>`).join(""):`<tr><td colspan="8" class="empty">沒有符合全部條件的已歸檔工單。</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>`;

  archiveSearch.addEventListener("submit",e=>{
    e.preventDefault();
    state.archiveFilter={
      aircraft:aAircraft.value.trim(),
      package:aPackage.value.trim(),
      wo:aWo.value.trim(),
      procedure:aProcedure.value.trim(),
      mr:aMr.value.trim(),
      serial:aSerial.value.trim(),
      topSerial:aTopSerial.value.trim(),
      title:aTitle.value.trim(),
      ocr:aOcr.value.trim(),
      dateFrom:aDateFrom.value,
      dateTo:aDateTo.value,
      corrected:aCorrected.value
    };
    renderArchive();
  });
}
function showArchive(id){const o=orders.find(x=>x.id===id);openModal(`<div class="panel-head"><h2>${o.package}｜WO ${o.wo}</h2><button class="icon-close" onclick="closeModal()">×</button></div><div class="detail-grid"><div><label>機號</label><strong>${o.aircraft}</strong></div><div><label>Procedure ID</label><strong>${o.procedure}</strong></div><div><label>MR ID</label><strong>${o.mr}</strong></div><div><label>有效版本</label><strong>V${o.corrected?2:1}</strong></div><div><label>Serial Number</label><strong>${o.serial}</strong></div><div><label>TOP Serial Number</label><strong>${o.topSerial}</strong></div></div><div class="note-box"><label>OCR Cover Page</label><p>${o.ocr}</p></div><div class="paper"><h3>ARCHIVED MAINTENANCE RECORD</h3><p>${o.title}</p><p>此區模擬有效歸檔版本、附件、簽核歷程、勘正歷程與歷史版本調閱。</p></div>`,true)}

function renderAnalytics(){const data=orders.filter(o=>o.stage!=="已取消"),summary={month:data.filter(o=>o.date.startsWith("2026-08")&&o.receipt==="已收到").length,year:data.filter(o=>o.date.startsWith("2026")).length,all:data.length,archived:data.filter(o=>o.archived).length},counter={};data.forEach(o=>counter[o.aircraftType]=(counter[o.aircraftType]||0)+1);const max=Math.max(...Object.values(counter),1);content.innerHTML=pageHead("統計分析與報表","統計以單張 WO／Task 為唯一計數基準。",`<span class="updated">最後更新：2026-08-05 09:15</span>`)+`<div class="card-grid"><div class="metric primary"><span>本月接收完成</span><strong>${summary.month}</strong><small>2026 年 8 月</small></div><div class="metric info"><span>本年度工單</span><strong>${summary.year}</strong><small>2026 年</small></div><div class="metric success"><span>系統累計工單</span><strong>${summary.all}</strong><small>DEMO 資料</small></div><div class="metric warning"><span>已正式歸檔</span><strong>${summary.archived}</strong><small>目前有效版本</small></div></div><div class="two-col"><section class="panel"><div class="panel-head"><h2>依機型統計</h2><span>工單數量與占比</span></div><div class="chart-list">${Object.entries(counter).map(([k,v])=>`<div><label><span>${k}</span><b>${v}（${(v/data.length*100).toFixed(1)}%）</b></label><div class="chart-bar"><i style="width:${v/max*100}%"></i></div></div>`).join("")}</div></section><section class="panel"><div class="panel-head"><h2>報表輸出</h2><span>DEMO 預覽</span></div><div class="report-box"><label>報表類型<select><option>月報</option><option>年報</option><option>自訂期間</option></select></label><label>輸出格式<select><option>Excel</option><option>PDF</option></select></label><div class="note-box"><p>報表包含統計期間、產製時間、產製人、篩選條件、總工單數及分組結果。</p></div><button class="btn primary wide" onclick="toast('DEMO：報表產製完成')">產製報表</button></div></section></div>`}
