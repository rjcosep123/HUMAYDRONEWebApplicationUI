import { useState } from "react";

type Workspace = "technician" | "admin";
type Page =
  | "Overview"
  | "Farms"
  | "Farm Details"
  | "Mission Monitoring"
  | "Mission Details"
  | "Image Gallery"
  | "Detection Review"
  | "Advisory Reports"
  | "System Overview"
  | "Upload & Processing Queue"
  | "Model Monitoring"
  | "User Management"
  | "Audit Logs"
  | "Settings";

const riceImage =
  "https://images.unsplash.com/photo-1751818430523-e61419129a22?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1600";
const riceDetail =
  "https://images.unsplash.com/photo-1751818430533-3e3c7f3f14b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1600";

const techNav: { label: Page; icon: string }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Farms", icon: "field" },
  { label: "Mission Monitoring", icon: "route" },
  { label: "Image Gallery", icon: "image" },
  { label: "Detection Review", icon: "scan" },
  { label: "Advisory Reports", icon: "file" },
];

const adminNav: { label: Page; icon: string }[] = [
  { label: "System Overview", icon: "pulse" },
  { label: "Upload & Processing Queue", icon: "queue" },
  { label: "Model Monitoring", icon: "cpu" },
  { label: "User Management", icon: "users" },
  { label: "Audit Logs", icon: "list" },
  { label: "Settings", icon: "settings" },
];

const paths: Record<string, string> = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  field: "M4 19 9 5l6-2 5 16-6 2-5-2-5 2zM9 5v14m6-16-1 18",
  route: "M5 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 5c0 7 12 3 12 9v5",
  image: "M4 4h16v16H4zM4 16l5-5 4 4 2-2 5 5M15 9h.01",
  scan: "M4 8V4h4m8 0h4v4M4 16v4h4m8 0h4v-4M8 12h8",
  file: "M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h6",
  pulse: "M3 12h4l2-6 4 12 2-6h6",
  queue: "M4 6h16M4 12h16M4 18h10M18 16v5m-2-2 2 2 2-2",
  cpu: "M8 8h8v8H8zM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3",
  users: "M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7-1a3 3 0 0 0 0-6m3 17v-2a4 4 0 0 0-3-3.87",
  list: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6H10a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1v-4a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6h4a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 .6 1v4a1.7 1.7 0 0 0-.6 1z",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm6-2 4 4",
  chevron: "m9 18 6-6-6-6",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  check: "m5 12 4 4L19 6",
  alert: "M12 9v4m0 4h.01M10.3 3.6 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0z",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  plus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6 6 18",
  filter: "M4 5h16l-6 7v5l-4 2v-7z",
  zoom: "M12 5v14M5 12h14",
  download: "M12 3v12m-5-5 5 5 5-5M5 21h14",
};

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.grid} />
    </svg>
  );
}

function Button({ children, variant = "primary", icon, onClick, disabled }: { children: React.ReactNode; variant?: "primary" | "secondary" | "quiet" | "danger"; icon?: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <div role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} className={`button ${variant} ${disabled ? "disabled" : ""}`} onClick={disabled ? undefined : onClick}>
      {icon && <Icon name={icon} size={16} />}<span>{children}</span>
    </div>
  );
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}><span className="badge-dot" />{children}</span>;
}

function DemoLabel() {
  return <span className="demo-label">DEMO DATA</span>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="page-header">
      <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>
      {actions && <div className="header-actions">{actions}</div>}
    </div>
  );
}

const farmRows = [
  ["TAB-03", "Riverside Demo Farm", "Taboc, Opol", "2.46 ha", "Validated", "18 Jun 2024", "12"],
  ["TAB-07", "North Plot", "Taboc, Opol", "1.82 ha", "Draft", "12 Jun 2024", "8"],
  ["OPL-12", "Creekside Parcel", "Poblacion, Opol", "3.14 ha", "Validated", "03 Jun 2024", "15"],
  ["TAB-11", "East Irrigated Field", "Taboc, Opol", "0.96 ha", "Needs review", "28 May 2024", "4"],
];

function MapVisual({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`map ${detailed ? "map-detailed" : ""}`}>
      <div className="map-roads road-a" /><div className="map-roads road-b" />
      <div className="water" />
      <svg className="boundary" viewBox="0 0 600 340" preserveAspectRatio="none">
        <polygon points="152,82 382,54 485,142 430,271 208,286 110,192" />
        {detailed && <polyline points="180,245 220,205 280,220 330,152 420,130" />}
      </svg>
      <div className="map-label label-farm">TAB-03 · 2.46 ha</div>
      <div className="map-label label-road">Purok 4 Road</div>
      {detailed && <><span className="marker m1">1</span><span className="marker m2">2</span><span className="marker m3">3</span></>}
      <div className="map-tools"><div><Icon name="plus" size={15} /></div><div>−</div><div><Icon name="route" size={15} /></div></div>
      <div className="map-caption">Illustrative map only · Not a surveyed boundary</div>
    </div>
  );
}

function Metric({ label, value, note, icon, tone = "" }: { label: string; value: string; note: string; icon: string; tone?: string }) {
  return <Panel className="metric"><div className={`metric-icon ${tone}`}><Icon name={icon} /></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-note">{note}</div></Panel>;
}

function Dashboard({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHeader eyebrow="TECHNICIAN WORKSPACE" title="Good morning, Elena" description="Here’s what needs your attention across the selected service area." actions={<><Button variant="secondary" icon="field">Taboc, Opol</Button><Button icon="plus" onClick={() => go("Mission Monitoring")}>New mission</Button></>} />
      <div className="notice"><Icon name="alert" size={17} /><span>All values and statuses in this prototype are demonstration data. No live drone telemetry is shown.</span><DemoLabel /></div>
      <div className="metrics-grid">
        <Metric label="Registered farms" value="24" note="3 boundaries need review" icon="field" />
        <Metric label="Completed missions" value="86" note="+8 this month" icon="route" />
        <Metric label="Pending reviews" value="7" note="2 marked high priority" icon="scan" tone="amber" />
        <Metric label="Verified findings" value="18" note="Technician-confirmed" icon="check" tone="blue" />
      </div>
      <div className="dashboard-grid">
        <Panel className="map-panel">
          <div className="panel-head"><div><h2>Field coverage</h2><p>Selected area · Taboc, Opol</p></div><Button variant="quiet" onClick={() => go("Farms")}>Open farm map <Icon name="arrow" size={15} /></Button></div>
          <MapVisual />
        </Panel>
        <Panel className="review-panel">
          <div className="panel-head"><div><h2>Pending review</h2><p>7 detections awaiting a decision</p></div><Badge tone="warning">2 priority</Badge></div>
          <div className="review-image"><img src={riceDetail} alt="Aerial view of green agricultural fields used as demonstration imagery" /><span className="bbox one" /><span className="bbox two" /><DemoLabel /></div>
          <div className="review-copy"><div><b>Possible Bacterial Leaf Blight</b><p>IMG-0742 · MSN-240618-07</p></div><Badge tone="warning">87% sample</Badge></div>
          <Button onClick={() => go("Detection Review")}>Review detection</Button>
        </Panel>
      </div>
      <div className="lower-grid">
        <Panel>
          <div className="panel-head"><div><h2>Recent survey missions</h2><p>Latest field image collection activity</p></div><Button variant="quiet" onClick={() => go("Mission Monitoring")}>View all</Button></div>
          <DataTable headers={["Mission", "Farm", "Survey date", "Images", "Status"]} rows={[
            ["MSN-240618-07", "Riverside Demo Farm", "18 Jun 2024", "184", <Badge tone="success">Completed</Badge>],
            ["MSN-240615-03", "North Plot", "15 Jun 2024", "96", <Badge tone="info">Processing</Badge>],
            ["MSN-240612-02", "Creekside Parcel", "12 Jun 2024", "—", <Badge tone="neutral">Planned</Badge>],
          ]} onRow={() => go("Mission Details")} />
        </Panel>
        <Panel className="activity">
          <div className="panel-head"><div><h2>Recent activity</h2><p>Technician review trail</p></div></div>
          {[
            ["Finding verified", "You verified IMG-0731", "14 min"],
            ["Report updated", "ADV-2024-018 moved to review", "1 hr"],
            ["Upload completed", "184 images from MSN-240618-07", "3 hr"],
          ].map((a, i) => <div className="activity-row" key={a[0]}><span className={`activity-icon a${i}`}><Icon name={i === 0 ? "check" : i === 1 ? "file" : "queue"} size={15} /></span><div><b>{a[0]}</b><p>{a[1]}</p></div><small>{a[2]}</small></div>)}
        </Panel>
      </div>
    </>
  );
}

function DataTable({ headers, rows, onRow }: { headers: string[]; rows: React.ReactNode[][]; onRow?: () => void }) {
  return (
    <div className="table-wrap"><table><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i} onClick={onRow}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  );
}

function Toolbar({ placeholder = "Search records..." }: { placeholder?: string }) {
  return <div className="toolbar"><div className="search-box"><Icon name="search" size={16} /><span>{placeholder}</span><kbd>⌘ K</kbd></div><Button variant="secondary" icon="filter">Filters</Button><Button variant="secondary">All status <Icon name="chevron" size={14} /></Button></div>;
}

function Farms({ go }: { go: (p: Page) => void }) {
  return <>
    <PageHeader eyebrow="FIELD REGISTRY" title="Farms" description="Manage farm records and review mapped field boundaries." actions={<Button icon="plus">Add farm</Button>} />
    <Panel><Toolbar placeholder="Search farm name, ID, or locality..." /><DataTable headers={["Farm", "Locality", "Area", "Boundary", "Recent survey", "Missions", ""]} rows={farmRows.map(r => [
      <div className="primary-cell"><span className="farm-avatar"><Icon name="field" size={16} /></span><span><b>{r[1]}</b><small>{r[0]}</small></span></div>, r[2], r[3], <Badge tone={r[4] === "Validated" ? "success" : "warning"}>{r[4]}</Badge>, r[5], r[6], <Icon name="more" />
    ])} onRow={() => go("Farm Details")} /><div className="pagination"><span>Showing 1–4 of 24 farms</span><div><Button variant="secondary" disabled>Previous</Button><Button variant="secondary">Next</Button></div></div></Panel>
  </>;
}

function FarmDetails({ go }: { go: (p: Page) => void }) {
  return <>
    <div className="crumbs"><span onClick={() => go("Farms")}>Farms</span><Icon name="chevron" size={13} /><b>Riverside Demo Farm</b></div>
    <PageHeader eyebrow="TAB-03" title="Riverside Demo Farm" description="Taboc, Opol, Misamis Oriental · Sample farm record" actions={<><Button variant="secondary" icon="field">Edit boundary</Button><Button icon="plus" onClick={() => go("Mission Details")}>Create mission</Button></>} />
    <div className="farm-detail-grid"><Panel className="detail-map"><div className="panel-head"><div><h2>Farm boundary</h2><p>Validated demo geometry · 2.46 ha</p></div><Badge tone="success">Validated</Badge></div><MapVisual detailed /></Panel>
    <Panel><div className="panel-head"><div><h2>Farm profile</h2><p>Registry metadata</p></div><Icon name="more" /></div>
      <div className="metadata">{[["Farm ID","TAB-03"],["Land use","Irrigated rice"],["Area","2.46 hectares"],["Boundary source","Demonstration polygon"],["Added","04 Mar 2024"],["Last updated","18 Jun 2024"]].map(x => <div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div>
      <div className="validation-note"><Icon name="alert" size={17} /><span>This boundary is illustrative and does not represent a surveyed real-world property.</span></div>
    </Panel></div>
    <div className="lower-grid"><Panel><div className="panel-head"><div><h2>Associated missions</h2><p>12 missions linked to this farm</p></div><Button variant="quiet">View all</Button></div><DataTable headers={["Mission", "Date", "Images", "Status"]} rows={[["MSN-240618-07","18 Jun 2024","184",<Badge tone="success">Completed</Badge>],["MSN-240602-04","02 Jun 2024","142",<Badge tone="success">Completed</Badge>],["MSN-240527-02","27 May 2024","—",<Badge tone="error">Failed</Badge>]]} onRow={() => go("Mission Details")} /></Panel>
    <Panel><div className="panel-head"><div><h2>Detection summary</h2><p>Technician-reviewed findings only</p></div></div><div className="finding-stats"><div><strong>3</strong><span>Verified positive</span></div><div><strong>4</strong><span>False alarms</span></div><div><strong>2</strong><span>Field inspections</span></div></div><Button variant="secondary" onClick={() => go("Detection Review")}>Review pending detections</Button></Panel></div>
  </>;
}

function MissionPage({ detail, go }: { detail?: boolean; go: (p: Page) => void }) {
  if (!detail) return <><PageHeader eyebrow="FIELD OPERATIONS" title="Mission monitoring" description="Review image collection missions. Drone control remains in the separate Android application." actions={<Button icon="plus">Plan mission</Button>} /><div className="notice"><Icon name="alert" size={17} /><span>Mission status is simulated for prototype review; this page does not show live aircraft movement.</span><DemoLabel /></div><Panel><Toolbar placeholder="Search mission ID, farm, or operator..." /><DataTable headers={["Mission", "Farm", "Operator", "Date", "Images", "Upload", "Processing", "Status"]} rows={[
    ["MSN-240618-07","Riverside Demo Farm","Marco Reyes","18 Jun 2024","184",<Badge tone="success">Complete</Badge>,<Badge tone="success">Complete</Badge>,<Badge tone="success">Completed</Badge>],
    ["MSN-240615-03","North Plot","Ana Cruz","15 Jun 2024","96",<Badge tone="success">Complete</Badge>,<Badge tone="info">Processing</Badge>,<Badge tone="info">In progress</Badge>],
    ["MSN-240612-02","Creekside Parcel","Marco Reyes","12 Jun 2024","—",<Badge tone="neutral">Not started</Badge>,<Badge tone="neutral">Waiting</Badge>,<Badge tone="neutral">Planned</Badge>],
    ["MSN-240527-02","Riverside Demo Farm","Ana Cruz","27 May 2024","62",<Badge tone="error">Interrupted</Badge>,<Badge tone="neutral">Waiting</Badge>,<Badge tone="error">Failed</Badge>],
  ]} onRow={() => go("Mission Details")} /><div className="pagination"><span>Showing 1–4 of 86 missions</span><div><Button variant="secondary" disabled>Previous</Button><Button variant="secondary">Next</Button></div></div></Panel></>;
  return <><div className="crumbs"><span onClick={() => go("Mission Monitoring")}>Missions</span><Icon name="chevron" size={13} /><b>MSN-240618-07</b></div><PageHeader eyebrow="COMPLETED MISSION" title="MSN-240618-07" description="Riverside Demo Farm · Surveyed 18 Jun 2024" actions={<><Button variant="secondary" icon="download">Export manifest</Button><Button onClick={() => go("Image Gallery")}>View 184 images</Button></>} />
    <div className="mission-layout"><Panel className="detail-map"><div className="panel-head"><div><h2>Flight coverage</h2><p>Recorded route and image positions · Demo visualization</p></div><Badge tone="success">Completed</Badge></div><MapVisual detailed /></Panel><Panel><div className="panel-head"><div><h2>Mission details</h2><p>Collection metadata</p></div></div><div className="metadata">{[["Operator","Marco Reyes"],["Duration","18 min 42 sec"],["Altitude","40 m AGL"],["Images captured","184"],["Upload status","Complete"],["Processing","Complete"]].map(x => <div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div><div className="validation-note"><Icon name="alert" size={17} /><span>Historical mission record only. No live aircraft control is available here.</span></div></Panel></div>
    <Panel><div className="panel-head"><div><h2>Captured imagery</h2><p>Latest images from this mission</p></div><Button variant="quiet" onClick={() => go("Image Gallery")}>Open gallery <Icon name="arrow" size={15} /></Button></div><ImageStrip /></Panel></>;
}

function ImageStrip() {
  return <div className="image-strip">{[0,1,2,3,4].map((n) => <div className="image-card" key={n}><img src={n % 2 ? riceDetail : riceImage} alt="Demo aerial agricultural field capture" /><div><b>IMG-07{42+n}</b><span>18 Jun · 09:{24+n}</span></div>{n === 3 && <Badge tone="warning">No GPS</Badge>}</div>)}</div>;
}

function Gallery({ go }: { go: (p: Page) => void }) {
  return <><PageHeader eyebrow="IMAGERY LIBRARY" title="Image gallery" description="Browse drone-captured field imagery and processing status." actions={<div className="segmented"><span className="active"><Icon name="grid" size={15} /> Grid</span><span><Icon name="list" size={15} /> List</span></div>} /><Panel><Toolbar placeholder="Search image, mission, or farm..." /><div className="filter-summary"><span>Farm: <b>Riverside Demo Farm</b></span><span>Mission: <b>MSN-240618-07</b></span><span>184 results</span></div><div className="gallery-grid">{[0,1,2,3,4,5,6,7].map((n) => <div className="gallery-card" key={n} onClick={() => go("Detection Review")}><div className="gallery-img"><img src={n % 3 ? riceDetail : riceImage} alt="Demo rice field aerial imagery" /><DemoLabel /><span className={`process-dot ${n === 5 ? "failed" : ""}`} /></div><div className="gallery-info"><div><b>IMG-0{742+n}</b><Badge tone={n === 5 ? "error" : n < 3 ? "warning" : "success"}>{n === 5 ? "Failed" : n < 3 ? "Review" : "Processed"}</Badge></div><p>18 Jun 2024 · 09:{24+n}:18</p><span>{n === 6 ? "Location unavailable" : "GPS available"}</span></div></div>)}</div></Panel></>;
}

function DetectionReview({ go }: { go: (p: Page) => void }) {
  const [state, setState] = useState("Pending Review");
  const [dialog, setDialog] = useState<string | null>(null);
  const confirm = () => { if (dialog === "verify") setState("Verified Positive"); if (dialog === "reject") setState("False Alarm"); if (dialog === "inspect") setState("Needs Field Inspection"); setDialog(null); };
  return <><div className="crumbs"><span onClick={() => go("Image Gallery")}>Image gallery</span><Icon name="chevron" size={13} /><b>IMG-0742</b></div>
    <PageHeader eyebrow="AI DETECTION REVIEW" title="Review IMG-0742" description="MSN-240618-07 · Riverside Demo Farm" actions={<><Badge tone={state === "Verified Positive" ? "success" : state === "False Alarm" ? "neutral" : "warning"}>{state}</Badge><Button variant="secondary" onClick={() => go("Advisory Reports")}>Open report</Button></>} />
    <div className="demo-banner"><DemoLabel /><span>This prediction and confidence value are illustrative. They are not real model output.</span></div>
    <div className="detection-layout"><Panel className="viewer-panel"><div className="viewer-tabs"><span>Original</span><span className="active">Annotated</span><div className="viewer-actions"><Icon name="zoom" /><span>100%</span><Icon name="download" /></div></div><div className="image-viewer"><img src={riceDetail} alt="Large aerial agricultural image for detection review" /><span className="detection-box d1"><i>BLB · 87% sample</i></span><span className="detection-box d2"><i>Detection 02</i></span><div className="viewer-controls"><span>+</span><span>−</span><span>↺</span></div></div><div className="image-meta"><span><b>Captured</b>18 Jun 2024 · 09:24:18</span><span><b>Coordinates</b>Available in mission record</span><span><b>Resolution</b>4000 × 3000</span><span><b>Detection</b>2 of 3</span></div></Panel>
      <div className="review-column"><Panel><div className="panel-head"><div><h2>Model prediction</h2><p>Automated screening · Unverified</p></div><Badge tone="info">AI SAMPLE</Badge></div><div className="prediction"><span>Predicted class</span><strong>Bacterial Leaf Blight</strong><div className="confidence"><div><span>Sample confidence</span><b>87%</b></div><div><i /></div></div><div className="metadata compact">{[["Model version","Demo v0.8.2"],["Processing status","Completed"],["Bounding box","Detection 02"],["Inference source","Cloud prototype"]].map(x => <div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div></div></Panel>
      <Panel><div className="panel-head"><div><h2>Technician review</h2><p>Your decision is recorded separately from AI output</p></div></div><label className="field-label">Review notes</label><div className="textarea">Visible discoloration requires technician assessment. Add field observations here…</div><div className="decision-stack"><Button onClick={() => setDialog("verify")} icon="check">Confirm verified finding</Button><Button variant="secondary" onClick={() => setDialog("inspect")} icon="field">Request field inspection</Button><Button variant="quiet" onClick={() => setDialog("reject")} icon="close">Reject as false alarm</Button></div></Panel>
      <Panel><div className="panel-head"><div><h2>Review history</h2><p>Human and system actions</p></div></div><div className="history"><span /><div><b>{state}</b><p>{state === "Pending Review" ? "Awaiting technician assessment" : "Decision recorded by Elena Santos · Just now"}</p></div></div><div className="history muted"><span /><div><b>Prediction generated</b><p>Prototype model · 18 Jun, 09:31</p></div></div></Panel></div></div>
    {dialog && <Modal title={dialog === "verify" ? "Confirm verified finding?" : dialog === "reject" ? "Mark as false alarm?" : "Request field inspection?"} text="This prototype will update the visual review state only. No backend record or advisory recommendation will be created." confirm={dialog === "verify" ? "Confirm finding" : dialog === "reject" ? "Reject detection" : "Request inspection"} onClose={() => setDialog(null)} onConfirm={confirm} danger={dialog === "reject"} />}
  </>;
}

function Modal({ title, text, confirm, onClose, onConfirm, danger }: { title: string; text: string; confirm: string; onClose: () => void; onConfirm: () => void; danger?: boolean }) {
  return <div className="modal-backdrop"><div className="modal"><div className={`modal-icon ${danger ? "danger" : ""}`}><Icon name={danger ? "alert" : "check"} /></div><h2>{title}</h2><p>{text}</p><div className="modal-note"><DemoLabel /><span>Simulated prototype action</span></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>{confirm}</Button></div></div></div>;
}

function Reports() {
  return <><PageHeader eyebrow="FIELD ADVISORY" title="Advisory reports" description="Prepare reviewed field findings for qualified personnel." actions={<Button icon="plus">Create report</Button>} /><div className="report-layout"><Panel><Toolbar placeholder="Search report or farm..." /><div className="report-list">{[["ADV-2024-018","Riverside Demo Farm","Ready for review","warning"],["ADV-2024-015","North Plot","Draft","neutral"],["ADV-2024-011","Creekside Parcel","Finalized","success"]].map((x,i) => <div className={`report-row ${i===0?"selected":""}`} key={x[0]}><span className="file-icon"><Icon name="file" /></span><div><b>{x[0]}</b><p>{x[1]} · 18 Jun 2024</p></div><Badge tone={x[3]}>{x[2]}</Badge></div>)}</div></Panel><Panel className="report-preview"><div className="report-toolbar"><span>Report preview</span><div><Button variant="secondary">Print</Button><Button variant="secondary" icon="download">PDF</Button></div></div><article><div className="report-brand"><LogoMark /><div><b>HUMAYDRONE</b><span>Field Advisory Report</span></div><Badge tone="warning">Ready for review</Badge></div><h2>Reviewed field findings</h2><p className="report-disclaimer">Demonstration report · Recommendations require approval by qualified agricultural personnel.</p><div className="report-meta"><div><span>Farm</span><b>Riverside Demo Farm (TAB-03)</b></div><div><span>Mission</span><b>MSN-240618-07</b></div><div><span>Survey date</span><b>18 Jun 2024</b></div><div><span>Technician</span><b>Elena Santos</b></div></div><div className="report-finding"><img src={riceDetail} alt="Demo field finding" /><div><Badge tone="success">TECHNICIAN VERIFIED</Badge><h3>Bacterial Leaf Blight</h3><p>One reviewed area was confirmed for follow-up. AI screening details remain separate from this verified record.</p></div></div><h3>Approved recommendation</h3><div className="approved-copy">Field inspection and guidance to be entered or authorized by qualified Department of Agriculture personnel.</div></article></Panel></div></>;
}

function AdminOverview({ go }: { go: (p: Page) => void }) {
  return <><PageHeader eyebrow="DEVELOPER–ADMIN WORKSPACE" title="System overview" description="Prototype operational visibility across processing and configuration." actions={<Button variant="secondary">Last 24 hours <Icon name="chevron" size={14} /></Button>} /><div className="notice"><Icon name="alert" size={17} /><span>Service indicators below are demonstration data and do not represent connected systems.</span><DemoLabel /></div><div className="metrics-grid"><Metric label="Backend availability" value="Not connected" note="Configuration placeholder" icon="pulse" /><Metric label="Storage usage" value="42.8 GB" note="Sample capacity: 100 GB" icon="queue" /><Metric label="Upload queue" value="12" note="4 currently processing" icon="queue" tone="blue" /><Metric label="Failed jobs" value="3" note="Needs administrator review" icon="alert" tone="red" /></div>
    <div className="admin-grid"><Panel><div className="panel-head"><div><h2>Processing throughput</h2><p>Illustrative jobs over the last 8 hours</p></div><DemoLabel /></div><div className="bar-chart">{[42,58,36,74,68,86,62,76].map((h,i)=><div key={i}><span style={{height:`${h}%`}} /><small>{i+8}:00</small></div>)}</div></Panel><Panel><div className="panel-head"><div><h2>Operational snapshot</h2><p>Prototype service indicators</p></div></div><div className="service-list">{[["API service","Not connected","neutral"],["Object storage","Configured","success"],["Inference worker","Demo state","info"],["Notification service","Missing","warning"]].map(x=><div key={x[0]}><span><i className={x[2]} />{x[0]}</span><b>{x[1]}</b></div>)}</div></Panel></div>
    <div className="lower-grid"><Panel><div className="panel-head"><div><h2>Recent processing issues</h2><p>Failed jobs requiring investigation</p></div><Button variant="quiet" onClick={()=>go("Upload & Processing Queue")}>Open queue</Button></div><DataTable headers={["Job","Media","Last error","Retries","Status"]} rows={[["JOB-8841","IMG-0759","Inference timeout","2",<Badge tone="error">Failed</Badge>],["JOB-8838","IMG-0751","Missing location metadata","1",<Badge tone="error">Failed</Badge>],["JOB-8812","IMG-0712","Upload interrupted","3",<Badge tone="error">Failed</Badge>]]} onRow={()=>go("Upload & Processing Queue")} /></Panel><Panel className="activity"><div className="panel-head"><div><h2>Admin activity</h2><p>Recent privileged events</p></div></div>{[["Configuration viewed","Admin · 12 min"],["Job retry simulated","JOB-8812 · 42 min"],["Role change opened","Maria L. · 2 hr"]].map(a=><div className="activity-row" key={a[0]}><span className="activity-icon"><Icon name="list" size={15}/></span><div><b>{a[0]}</b><p>{a[1]}</p></div></div>)}</Panel></div></>;
}

function Queue() {
  const [dialog,setDialog]=useState(false); const [retried,setRetried]=useState(false);
  return <><PageHeader eyebrow="PROCESSING OPERATIONS" title="Upload & processing queue" description="Inspect simulated media ingestion and inference jobs." actions={<Button variant="secondary" icon="download">Export log</Button>} /><Panel><Toolbar placeholder="Search job, media, farm, or mission..." /><DataTable headers={["Job","Media","Farm / mission","Uploaded","Status","Retries","Duration","Last error",""]} rows={[
    ["JOB-8844","IMG-0762","TAB-03 / MSN-240618-07","10:42",<Badge tone="neutral">Queued</Badge>,"0","—","—",<Icon name="more"/>],
    ["JOB-8843","IMG-0761","TAB-03 / MSN-240618-07","10:41",<Badge tone="info">Processing</Badge>,"0","1m 08s","—",<Icon name="more"/>],
    ["JOB-8842","IMG-0760","TAB-03 / MSN-240618-07","10:39",<Badge tone="success">Completed</Badge>,"0","2m 14s","—",<Icon name="more"/>],
    ["JOB-8841","IMG-0759","TAB-03 / MSN-240618-07","10:36",<Badge tone={retried?"info":"error"}>{retried?"Queued":"Failed"}</Badge>,retried?"3":"2","4m 00s","Inference timeout",<Button variant="quiet" onClick={()=>setDialog(true)}>Retry</Button>],
  ]} /><div className="pagination"><span>Showing 1–4 of 128 jobs</span><div><Button variant="secondary" disabled>Previous</Button><Button variant="secondary">Next</Button></div></div></Panel>{dialog&&<Modal title="Retry failed job?" text="JOB-8841 will be returned to the simulated queue. This action does not contact a processing service." confirm="Retry job" onClose={()=>setDialog(false)} onConfirm={()=>{setRetried(true);setDialog(false)}} />}</>;
}

function ModelMonitoring() {
  return <><PageHeader eyebrow="MODEL OPERATIONS" title="Model monitoring" description="Separate offline evaluation metadata from operational processing." actions={<Button variant="secondary">Version history</Button>} /><div className="two-col"><Panel><div className="panel-head"><div><h2>Active model</h2><p>Configuration placeholder</p></div><Badge tone="neutral">Not connected</Badge></div><div className="model-version"><Icon name="cpu" size={28}/><div><span>Configured version</span><strong>Demo v0.8.2</strong><p>Deployment status is unknown until a service is connected.</p></div></div><div className="metadata">{[["Model artifact","Placeholder"],["Last configured","18 Jun 2024"],["Serving endpoint","Missing"],["Target classes","BLB, Dead Heart, White Head"]].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div></Panel><Panel><div className="panel-head"><div><h2>Operational metrics</h2><p>Demo values, not live model telemetry</p></div><DemoLabel/></div><div className="finding-stats"><div><strong>2.4s</strong><span>Avg. processing</span></div><div><strong>—</strong><span>Failure rate</span></div><div><strong>128</strong><span>Sample jobs</span></div></div><div className="validation-note"><Icon name="alert" size={17}/><span>Live failure rate is unavailable. Values appear only after service integration.</span></div></Panel></div><Panel><div className="panel-head"><div><h2>Offline evaluation</h2><p>Dataset and metric placeholders</p></div><Badge tone="info">OFFLINE ONLY</Badge></div><DataTable headers={["Evaluation dataset","Version","Evaluated","Accuracy","Precision","Recall","F1"]} rows={[["Not yet documented","—","—","Not available","Not available","Not available","Not available"]]} /></Panel></>;
}

function Users() {
  const [dialog,setDialog]=useState(false); return <><PageHeader eyebrow="ACCESS PROTOTYPE" title="User management" description="Review sample accounts and role assignments." actions={<Button icon="plus">Invite user</Button>} /><div className="notice"><Icon name="alert" size={17}/><span>Account actions are visual only and are not connected to authentication.</span><DemoLabel/></div><Panel><Toolbar placeholder="Search name or email..." /><DataTable headers={["User","Email","Role","Status","Created","Last activity",""]} rows={[
    [<div className="user-cell"><span>ES</span><b>Elena Santos</b></div>,"elena.santos@example.demo",<Badge tone="success">Technician</Badge>,<Badge tone="success">Active</Badge>,"04 Mar 2024","12 min ago",<Button variant="quiet" onClick={()=>setDialog(true)}>Manage</Button>],
    [<div className="user-cell"><span>MR</span><b>Marco Reyes</b></div>,"marco.reyes@example.demo",<Badge tone="info">Operator</Badge>,<Badge tone="success">Active</Badge>,"08 Mar 2024","3 hr ago",<Button variant="quiet" onClick={()=>setDialog(true)}>Manage</Button>],
    [<div className="user-cell"><span>ML</span><b>Maria Lopez</b></div>,"maria.lopez@example.demo",<Badge tone="warning">Admin</Badge>,<Badge tone="success">Active</Badge>,"21 Feb 2024","Yesterday",<Button variant="quiet" onClick={()=>setDialog(true)}>Manage</Button>],
  ]} /></Panel>{dialog&&<Modal title="Change administrator role?" text="Changing administrator access is a privileged action. This prototype will not modify a real account." confirm="Confirm role change" onClose={()=>setDialog(false)} onConfirm={()=>setDialog(false)} />}</>;
}

function Audit() {
  return <><PageHeader eyebrow="ADMINISTRATION" title="Audit logs" description="Investigate technical and administrative events in the prototype." actions={<Button variant="secondary" icon="download">Export CSV</Button>} /><Panel><Toolbar placeholder="Search actor, action, or target..." /><div className="filter-summary"><span>Date: <b>Last 7 days</b></span><span>Outcome: <b>All</b></span><span>Action: <b>All events</b></span></div><DataTable headers={["Timestamp","Actor","Action","Target","Outcome","Metadata"]} rows={[
    ["18 Jun · 10:44","Admin Demo","PROCESSING_RETRY","JOB-8841",<Badge tone="success">Success</Badge>,"retry_count: 2"],
    ["18 Jun · 10:31","Elena Santos","REVIEW_VERIFY","IMG-0742",<Badge tone="success">Success</Badge>,"class: BLB"],
    ["18 Jun · 09:58","System prototype","UPLOAD_FAILED","IMG-0759",<Badge tone="error">Failed</Badge>,"timeout: true"],
    ["17 Jun · 16:12","Maria Lopez","ROLE_DIALOG_OPEN","USR-003",<Badge tone="neutral">Viewed</Badge>,"requested: Admin"],
  ]} /></Panel></>;
}

function Settings() {
  return <><PageHeader eyebrow="CONFIGURATION" title="Settings" description="View prototype preferences and safe integration indicators." /><div className="settings-grid">{[
    ["Application preferences","Regional display and interface behavior",[["Timezone","Asia/Manila"],["Date format","DD MMM YYYY"],["Default workspace","Technician"]]],
    ["Notification preferences","Choose which operational events appear",[["Failed processing jobs","Enabled"],["Pending field reviews","Enabled"],["Weekly summary","Disabled"]]],
    ["Processing configuration","Non-secret processing defaults",[["Max retry attempts","3"],["Concurrent jobs","4"],["Auto-process uploads","Prototype only"]]],
    ["Service integrations","Safe status indicators; no credentials shown",[["Supabase","Missing"],["ML inference service","Missing"],["Object storage","Configured"]]],
    ["Model version information","Read-only prototype metadata",[["Configured model","Demo v0.8.2"],["Deployment status","Unknown"],["Evaluation metadata","Missing"]]],
    ["Security status","Configuration health only",[["Authentication","Not connected"],["Service role key","Status hidden"],["Key rotation","Required before launch"]]],
  ].map((s,i)=><Panel key={s[0]}><div className="settings-head"><span className="settings-icon"><Icon name={i===1?"bell":i===3?"queue":i===4?"cpu":i===5?"settings":"grid"}/></span><div><h2>{s[0]}</h2><p>{s[1]}</p></div></div><div className="settings-rows">{s[2].map(x=><div key={x[0]}><span>{x[0]}</span><b className={x[1]==="Missing"||x[1].includes("Required")?"warning-text":""}>{x[1]}</b></div>)}</div><Button variant="secondary" disabled>Save changes</Button></Panel>)}</div><div className="notice"><Icon name="alert" size={17}/><span>Settings are not persisted in this UI prototype. Secrets and private key material are never displayed.</span></div></>;
}

function LogoMark() {
  return <span className="logo-mark"><svg viewBox="0 0 38 38" fill="none"><path d="M19 33V17m0 7c-7 0-10-4-10-10 7 0 10 4 10 10zm0-4c6 0 9-3 9-9-6 0-9 3-9 9z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 8h6M8 5v6m19-3h6m-3-3v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg></span>;
}

function Sidebar({ workspace, page, setPage, setWorkspace, mobileOpen, setMobileOpen }: { workspace: Workspace; page: Page; setPage: (p: Page)=>void; setWorkspace:(w:Workspace)=>void; mobileOpen:boolean; setMobileOpen:(v:boolean)=>void }) {
  const nav=workspace==="technician"?techNav:adminNav;
  return <aside className={mobileOpen?"open":""}><div className="brand"><LogoMark/><div><b>HUMAYDRONE</b><span>Field Intelligence</span></div><div className="mobile-close" onClick={()=>setMobileOpen(false)}><Icon name="close"/></div></div><div className="workspace-switch"><div className={workspace==="technician"?"active":""} onClick={()=>{setWorkspace("technician");setPage("Overview")}}>Technician</div><div className={workspace==="admin"?"active":""} onClick={()=>{setWorkspace("admin");setPage("System Overview")}}>Admin</div></div><div className="nav-label">{workspace==="technician"?"FIELD OPERATIONS":"SYSTEM OPERATIONS"}</div><nav>{nav.map(n=><div className={(page===n.label||(page==="Farm Details"&&n.label==="Farms")||(page==="Mission Details"&&n.label==="Mission Monitoring"))?"active":""} key={n.label} onClick={()=>{setPage(n.label);setMobileOpen(false)}}><Icon name={n.icon}/><span>{n.label}</span>{n.label==="Detection Review"&&<small>7</small>}{n.label==="Upload & Processing Queue"&&<small>3</small>}</div>)}</nav><div className="sidebar-foot"><div className="prototype-note"><DemoLabel/><p>Interface prototype<br/>No live services connected</p></div><div className="help-link"><Icon name="alert" size={17}/><span>Help & documentation</span></div></div></aside>;
}

function AppContent({ page, go }: { page: Page; go:(p:Page)=>void }) {
  if(page==="Overview") return <Dashboard go={go}/>;
  if(page==="Farms") return <Farms go={go}/>;
  if(page==="Farm Details") return <FarmDetails go={go}/>;
  if(page==="Mission Monitoring") return <MissionPage go={go}/>;
  if(page==="Mission Details") return <MissionPage detail go={go}/>;
  if(page==="Image Gallery") return <Gallery go={go}/>;
  if(page==="Detection Review") return <DetectionReview go={go}/>;
  if(page==="Advisory Reports") return <Reports/>;
  if(page==="System Overview") return <AdminOverview go={go}/>;
  if(page==="Upload & Processing Queue") return <Queue/>;
  if(page==="Model Monitoring") return <ModelMonitoring/>;
  if(page==="User Management") return <Users/>;
  if(page==="Audit Logs") return <Audit/>;
  return <Settings/>;
}

export default function App() {
  const [workspace,setWorkspace]=useState<Workspace>("technician");
  const [page,setPage]=useState<Page>("Overview");
  const [profile,setProfile]=useState(false);
  const [notifs,setNotifs]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  return <div className="app-shell"><Sidebar workspace={workspace} page={page} setPage={setPage} setWorkspace={setWorkspace} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/><div className="app-main"><header><div className="mobile-menu" onClick={()=>setMobileOpen(true)}><Icon name="list"/></div><div className="header-context"><span>HUMAYDRONE</span><i>/</i><b>{workspace==="technician"?"Technician workspace":"Developer–Admin workspace"}</b></div><div className="top-actions"><div className="icon-button" onClick={()=>setNotifs(!notifs)}><Icon name="bell"/><span className="notification-dot"/></div><div className="profile" onClick={()=>setProfile(!profile)}><span className="avatar">ES</span><div><b>Elena Santos</b><span>Demo technician</span></div><Icon name="chevron" size={14}/></div></div>{notifs&&<div className="popover notifications"><div className="popover-head"><b>Notifications</b><Badge tone="warning">3 new</Badge></div><div><b>7 detections await review</b><p>Riverside Demo Farm and 2 others</p></div><div><b>Processing job failed</b><p>JOB-8841 · Inference timeout</p></div><span className="popover-foot">Prototype notifications only</span></div>}{profile&&<div className="popover profile-menu"><div><b>Elena Santos</b><p>elena.santos@example.demo</p></div><span>Profile preferences</span><span onClick={()=>{setWorkspace(workspace==="admin"?"technician":"admin");setPage(workspace==="admin"?"Overview":"System Overview");setProfile(false)}}>Switch workspace</span><span>Sign out (prototype)</span></div>}</header><main><AppContent page={page} go={setPage}/></main></div></div>;
}
