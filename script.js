const { useState } = React;

const TABS = [
  ['overview', 'Executive Overview'],
  ['consumer', 'Consumer Insights'],
  ['distribution', 'Sales & Distribution'],
  ['retail', 'Retail & Rural Penetration'],
  ['campaign', 'Campaign Performance'],
  ['financial', 'Financial Impact'],
  ['admin', 'Admin Panel'],
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [view, setView] = useState('employee');

  const isAdminVisible = view === 'admin';

  const handleViewChange = (event) => {
    const next = event.target.value;
    setView(next);

    if (next !== 'admin' && activeTab === 'admin') {
      setActiveTab('overview');
    }
  };

  const menuClass = (id) => {
    const isActive = id === activeTab ? 'active' : '';
    const isHidden = id === 'admin' && !isAdminVisible ? 'admin-hidden' : '';
    return `menu-item ${isActive} ${isHidden}`.trim();
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-dot"></div>
          <div>
            <h1>Coca-Cola</h1>
            <p>Tihar Ki Thandak</p>
          </div>
        </div>

        <nav className="menu">
          {TABS.map(([id, label]) => (
            <button key={id} className={menuClass(id)} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="filters">
            <span>Campaign: <strong>Bastar Dussehra</strong></span>
            <span>Region: <strong>Chhattisgarh</strong></span>
          </div>
          <div className="selectors">
            <label>
              Time
              <select defaultValue="Week 5–6 (Peak)">
                <option>Week 1–2</option>
                <option>Week 3–4</option>
                <option>Week 5–6 (Peak)</option>
                <option>Week 7–8</option>
              </select>
            </label>
            <label>
              View
              <select value={view} onChange={handleViewChange}>
                <option value="employee">Employee View</option>
                <option value="admin">Admin View</option>
              </select>
            </label>
          </div>
        </header>

        {activeTab === 'overview' && <Overview />}
        {activeTab === 'consumer' && <Consumer />}
        {activeTab === 'distribution' && <Distribution />}
        {activeTab === 'retail' && <Retail />}
        {activeTab === 'campaign' && <Campaign />}
        {activeTab === 'financial' && <Financial />}
        {activeTab === 'admin' && isAdminVisible && <Admin />}
      </main>
    </div>
  );
}

const Overview = () => (
  <section className="tab active"><h2>Executive Overview</h2><p className="sub">Top-level snapshot for festival-led market penetration.</p><div className="kpi-grid"><article className="kpi success"><h3>Total Sales Volume</h3><p>12.4M bottles</p><small>+22% vs baseline</small></article><article className="kpi neutral"><h3>Festival Sales Growth</h3><p>24.1%</p><small>Target: 20–25%</small></article><article className="kpi positive"><h3>Rural Penetration</h3><p>39%</p><small>+11 pp uplift</small></article><article className="kpi warning"><h3>Active Retailers</h3><p>2,680</p><small>Target: 3,000</small></article></div><div className="panel-grid"><article className="panel"><h3>Sales Growth Trend</h3><div className="bars"><div style={{ '--h': '38%' }}>W1</div><div style={{ '--h': '48%' }}>W2</div><div style={{ '--h': '62%' }}>W3</div><div style={{ '--h': '74%' }}>W4</div><div style={{ '--h': '83%' }}>W5</div><div style={{ '--h': '89%' }}>W6</div></div></article><article className="panel"><h3>Rural vs Urban Split</h3><div className="split"><div className="rural">Rural 68%</div><div className="urban">Urban 32%</div></div><p className="note">Rural growth driven by Thandak Break Points and village retail coverage.</p></article><article className="panel"><h3>Beverage Category Share</h3><ul><li>Carbonated Soft Drinks <strong>54%</strong></li><li>Packaged Water <strong>18%</strong></li><li>Juices <strong>16%</strong></li><li>Energy Drinks <strong>12%</strong></li></ul></article></div></section>
);

const Consumer = () => (
  <section className="tab active"><h2>Consumer Insights</h2><div className="panel-grid two"><article className="panel"><h3>Segment Mix</h3><ul><li>Rural Youth: <strong>46%</strong></li><li>Festival Hosts: <strong>34%</strong></li><li>Festival Attendees: <strong>20%</strong></li></ul><p className="note">Jobs-to-be-done: refresh energy, serve guests quickly, amplify social bonding.</p></article><article className="panel"><h3>Digital Engagement</h3><ul><li>#ThandakKaTihar posts: <strong>18.6K</strong></li><li>Influencer reach: <strong>2.3M</strong></li><li>Engagement rate: <strong>7.8%</strong></li></ul></article></div><article className="panel full"><h3>District Heatmap (Engagement Index)</h3><div className="heatmap"><span className="hot">Bastar</span><span className="warm">Jagdalpur</span><span className="warm">Dantewada</span><span>Raipur</span><span>Bilaspur</span><span>Kanker</span></div></article></section>
);

const Distribution = () => (
  <section className="tab active"><h2>Sales & Distribution</h2><article className="panel full"><h3>Distribution Funnel</h3><p className="funnel">Distributor <span>→</span> Sub-distributor <span>→</span> Village Retailers <span>→</span> Festival Stalls <span>→</span> Consumers</p></article><div className="panel-grid two"><article className="panel"><h3>District Sales Leaderboard (Crates)</h3><ol><li>Bastar — 145K</li><li>Raipur — 118K</li><li>Jagdalpur — 109K</li><li>Durg — 91K</li></ol></article><article className="panel"><h3>SKU Performance</h3><ul><li>200ml RGB: <strong>41%</strong></li><li>600ml PET: <strong>26%</strong></li><li>1.25L: <strong>19%</strong></li><li>2L: <strong>14%</strong></li></ul></article></div></section>
);

const Retail = () => (
  <section className="tab active"><h2>Retail & Rural Penetration</h2><div className="kpi-grid mini"><article className="kpi positive"><h3>New Retailers Added</h3><p>2,680</p></article><article className="kpi neutral"><h3>Rural Outlet Penetration</h3><p>44%</p></article><article className="kpi warning"><h3>Cold Storage Coverage</h3><p>61%</p></article></div><div className="panel-grid two"><article className="panel"><h3>Retailer Ranking</h3><ol><li>Kirana Point, Bastar — 98 score</li><li>Jagdalpur Bazaar Hub — 95 score</li><li>Dantewada Haat Stall — 92 score</li></ol></article><article className="panel"><h3>Geo-Spatial Signals</h3><p>Demand clusters identified in Bastar belt with low-cold-chain pockets in South Dantewada. Auto-alerts trigger on stock-out probability above 70%.</p></article></div></section>
);

const Campaign = () => (
  <section className="tab active"><h2>Campaign Performance (AIDA)</h2><div className="panel-grid two"><article className="panel"><h3>Funnel Metrics</h3><ul><li>Awareness (Impressions): <strong>8.1M</strong></li><li>Interest (Engaged users): <strong>1.9M</strong></li><li>Desire (Coupon opens): <strong>430K</strong></li><li>Action (Redemptions): <strong>165K</strong></li></ul></article><article className="panel"><h3>Event Activation Performance</h3><ul><li>Thandak Zone footfall: <strong>312K</strong></li><li>Sampling conversions: <strong>38%</strong></li><li>Influencer content completion: <strong>96%</strong></li></ul></article></div></section>
);

const Financial = () => (
  <section className="tab active"><h2>Financial Impact</h2><div className="kpi-grid"><article className="kpi neutral"><h3>Campaign Cost</h3><p>₹4.0 Cr</p></article><article className="kpi success"><h3>Revenue Generated</h3><p>₹6.6 Cr</p></article><article className="kpi positive"><h3>Profit Margin</h3><p>18.7%</p></article><article className="kpi success"><h3>ROI</h3><p>1.65x</p></article></div><article className="panel full"><h3>Revenue vs Marketing Spend Forecast</h3><p>AI-assisted model predicts sustained post-festival uplift of 12% with optimized retailer replenishment and continued WhatsApp coupon cycles.</p></article></section>
);

const Admin = () => (
  <section className="tab active"><h2>Admin Control Center</h2><div className="panel-grid two"><article className="panel"><h3>Admin Features</h3><ul><li>User access management (Regional Manager / Sales Manager / Distributor)</li><li>Data upload: POS, distributor sales, campaign files</li><li>KPI target customization and widget configuration</li><li>Alert management for low stock, declining sales, and distribution gaps</li></ul></article><article className="panel"><h3>Execution Timeline</h3><ul><li>Week 1–2: Distribution expansion & warehouse pre-stock</li><li>Week 3–4: Pre-festival media burst & retailer visibility</li><li>Week 5–6: Peak activation & live monitoring</li><li>Week 7–8: Post-event engagement & performance review</li></ul></article></div><article className="panel full"><h3>Risk Matrix</h3><ul><li>Traditional drink preference → Mitigation: ₹10 entry packs + welcome ritual messaging</li><li>Cold-chain gaps → Mitigation: solar coolers + route optimization</li><li>Supply chain disruption → Mitigation: district-level buffer stock and auto-alerts</li></ul></article></section>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Dashboard />);
