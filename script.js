const { useMemo, useState } = React;

const NAV_ITEMS = [
  { id: 'overview', label: 'Executive Overview' },
  { id: 'consumer', label: 'Consumer Insights' },
  { id: 'distribution', label: 'Sales & Distribution' },
  { id: 'campaign', label: 'Campaign Performance' },
  { id: 'retail', label: 'Retail & Rural Penetration' },
  { id: 'financial', label: 'Financial Impact' },
  { id: 'slides', label: '4-Slide Strategy' },
  { id: 'admin', label: 'Admin Panel' },
];

const kpis = {
  totalSales: '12.8M bottles',
  festivalGrowth: '+24%',
  ruralPenetration: '42%',
  activeRetailers: '3,180',
};

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [region, setRegion] = useState('Chhattisgarh');
  const [time, setTime] = useState('Festival Peak (Week 5-6)');
  const [campaign, setCampaign] = useState('Bastar Dussehra');
  const [view, setView] = useState('employee');

  const tabs = useMemo(
    () => NAV_ITEMS.filter((item) => item.id !== 'admin' || view === 'admin'),
    [view],
  );

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo-wrap">
          <span className="dot" />
          <div>
            <h1>Coca-Cola GTM</h1>
            <p>Tihar Ki Thandak Dashboard</p>
          </div>
        </div>
        <nav>
          {tabs.map((item) => (
            <button
              key={item.id}
              className={activeTab === item.id ? 'active nav-btn' : 'nav-btn'}
              onClick={() => setActiveTab(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="summary">[Logo] Campaign: {campaign} | Region: {region} | Time: {time}</div>
          <div className="controls">
            <label>
              Campaign
              <select value={campaign} onChange={(e) => setCampaign(e.target.value)}>
                <option>Bastar Dussehra</option>
                <option>Bhoramdeo Mahotsav</option>
                <option>Madai Festival</option>
              </select>
            </label>
            <label>
              Region
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option>Chhattisgarh</option>
                <option>Bastar</option>
                <option>Jagdalpur</option>
                <option>Dantewada</option>
              </select>
            </label>
            <label>
              Time
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option>Week 1-2</option>
                <option>Week 3-4</option>
                <option>Festival Peak (Week 5-6)</option>
                <option>Week 7-8</option>
                <option>Post Festival</option>
              </select>
            </label>
            <label>
              View
              <select value={view} onChange={(e) => setView(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
        </header>

        <section className="content">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'consumer' && <Consumer />}
          {activeTab === 'distribution' && <Distribution />}
          {activeTab === 'campaign' && <CampaignTab />}
          {activeTab === 'retail' && <Retail />}
          {activeTab === 'financial' && <Financial />}
          {activeTab === 'slides' && <Slides />}
          {activeTab === 'admin' && view === 'admin' && <Admin />}
        </section>
      </main>
    </div>
  );
}

function KPICards() {
  return (
    <div className="grid four">
      <article className="card metric success"><h4>Total Sales Volume</h4><p>{kpis.totalSales}</p><small>Source: Distributor Sales + Retail POS</small></article>
      <article className="card metric"><h4>Festival Sales Growth</h4><p>{kpis.festivalGrowth}</p><small>vs prior festival period</small></article>
      <article className="card metric neutral"><h4>Rural Penetration</h4><p>{kpis.ruralPenetration}</p><small>Retail density + market reach index</small></article>
      <article className="card metric forecast"><h4>Active Retailers</h4><p>{kpis.activeRetailers}</p><small>3,000 target achieved</small></article>
    </div>
  );
}

function Overview() {
  return (
    <>
      <h2>Executive Overview</h2>
      <p className="subtitle">Marketing Intelligence Dashboard Framework: Data Sources → Analytics Engine → Decision Dashboard → Action Layer.</p>
      <KPICards />
      <div className="grid three">
        <article className="card">
          <h3>Sales Growth Trend</h3>
          <div className="bars">
            <span style={{ '--h': '44%' }}>W1</span><span style={{ '--h': '58%' }}>W2</span><span style={{ '--h': '71%' }}>W3</span><span style={{ '--h': '86%' }}>W4</span><span style={{ '--h': '92%' }}>W5</span>
          </div>
        </article>
        <article className="card">
          <h3>Rural vs Urban Sales Split</h3>
          <div className="split"><strong className="rural">Rural 68%</strong><strong className="urban">Urban 32%</strong></div>
          <p>Drill-down available by region → district → retailer.</p>
        </article>
        <article className="card">
          <h3>Beverage Category Share</h3>
          <ul>
            <li>Sparkling beverages: 56%</li>
            <li>Juice-based beverages: 24%</li>
            <li>Hydration category: 20%</li>
          </ul>
        </article>
      </div>
    </>
  );
}

function Consumer() {
  return (
    <>
      <h2>Consumer Insights</h2>
      <p className="subtitle">STP + Jobs-to-be-Done tracking for rural youth, family hosts, and festival attendees.</p>
      <div className="grid three">
        <article className="card">
          <h3>Segment Mix</h3>
          <ul>
            <li>Rural Youth: 47%</li>
            <li>Family Hosts: 34%</li>
            <li>Festival Attendees: 19%</li>
          </ul>
        </article>
        <article className="card">
          <h3>Engagement Metrics</h3>
          <ul>
            <li>Social engagement: 9.8%</li>
            <li>#ThandakKaTihar posts: 34,200</li>
            <li>Influencer reach: 4.2M</li>
          </ul>
        </article>
        <article className="card">
          <h3>District Heatmap</h3>
          <div className="heatmap">
            <span className="hot">Bastar</span>
            <span className="hot">Jagdalpur</span>
            <span className="warm">Dantewada</span>
            <span>Raipur</span>
            <span>Bilaspur</span>
            <span>Kanker</span>
          </div>
        </article>
      </div>
    </>
  );
}

function Distribution() {
  return (
    <>
      <h2>Sales & Distribution</h2>
      <p className="subtitle">GTM Funnel: Distributor → Sub-distributor → Retailer → Consumer.</p>
      <div className="grid three">
        <article className="card">
          <h3>District Sales Leaderboard</h3>
          <ol><li>Bastar - 2.2M crates</li><li>Raipur - 1.9M crates</li><li>Jagdalpur - 1.6M crates</li></ol>
        </article>
        <article className="card">
          <h3>SKU Performance</h3>
          <ul><li>200ml RGB: 39%</li><li>600ml PET: 28%</li><li>1.25L + 2L Packs: 33%</li></ul>
        </article>
        <article className="card">
          <h3>Out-of-Stock Alerts</h3>
          <p><strong>5.6%</strong> OOS (target {'<'} 4%).</p>
          <p>Auto-alert active for Bastar and Dantewada distributors.</p>
        </article>
      </div>
    </>
  );
}

function CampaignTab() {
  return (
    <>
      <h2>Campaign Performance</h2>
      <p className="subtitle">AIDA Funnel + Event Conversion Performance.</p>
      <div className="grid three">
        <article className="card">
          <h3>AIDA Funnel</h3>
          <ul><li>Awareness: 7.4M impressions</li><li>Interest: 1.9M engagements</li><li>Desire: 412K coupon intents</li><li>Action: 168K redemptions</li></ul>
        </article>
        <article className="card">
          <h3>Event Metrics</h3>
          <ul><li>Thandak zone footfall: 210K</li><li>Sampling conversion: 38%</li><li>Coke Folk Night attendance: 42K</li></ul>
        </article>
        <article className="card">
          <h3>Channel Analytics</h3>
          <ul><li>Instagram: 4.8M reach</li><li>YouTube Shorts: 2.1M views</li><li>WhatsApp referrals: 320K clicks</li></ul>
        </article>
      </div>
    </>
  );
}

function Retail() {
  return (
    <>
      <h2>Retail & Rural Penetration</h2>
      <p className="subtitle">Rural Penetration Index = Retail Density + Sales Growth + Cold Storage Availability.</p>
      <div className="grid three">
        <article className="card">
          <h3>Retailer Coverage Map (GIS)</h3>
          <ul><li>Kirana stores: 2,250</li><li>Haat market points: 570</li><li>Festival stalls: 360</li></ul>
        </article>
        <article className="card">
          <h3>Rural KPI Tracker</h3>
          <ul><li>New retailers added: 3,180</li><li>Rural penetration uplift: +14 pts</li><li>Cold storage available: 72%</li></ul>
        </article>
        <article className="card">
          <h3>Top Outlet Ranking</h3>
          <ol><li>Jagdalpur Chowk Kirana</li><li>Bastar Haat Express</li><li>Dantewada Festival Stall #4</li></ol>
        </article>
      </div>
    </>
  );
}

function Financial() {
  return (
    <>
      <h2>Financial Impact</h2>
      <p className="subtitle">State activation budget ₹4 Cr with forecasted post-festival sales lift.</p>
      <div className="grid three">
        <article className="card">
          <h3>Financial Metrics</h3>
          <ul><li>Campaign cost: ₹4.0 Cr</li><li>Revenue generated: ₹11.4 Cr</li><li>Profit margin: 23%</li><li>ROI: 2.85x</li></ul>
        </article>
        <article className="card">
          <h3>Budget Split</h3>
          <ul><li>On-ground activation: ₹1.5 Cr</li><li>Distribution expansion: ₹1.0 Cr</li><li>Retail visibility: ₹0.8 Cr</li><li>Digital + influencer: ₹0.7 Cr</li></ul>
        </article>
        <article className="card">
          <h3>Forecast</h3>
          <p>AI demand model predicts additional <strong>+12%</strong> sales in 30 days post-festival.</p>
          <p>Real-time risk alerts enabled for low inventory and declining district velocity.</p>
        </article>
      </div>
    </>
  );
}

function Slides() {
  return (
    <>
      <h2>Case Competition 4-Slide Structure</h2>
      <p className="subtitle">Consulting-style structure using STP, JTBD, 4Ps, AIDA, GTM funnel, and KPI framework.</p>
      <div className="grid two">
        <article className="card">
          <h3>Slide 1: Problem + Insight + Festival</h3>
          <p><strong>Frameworks:</strong> Market Gap + STP + Jobs-to-be-Done.</p>
          <ul><li>Underpenetrated rural packaged beverage market</li><li>Targets: rural youth (primary), family hosts (secondary)</li><li>Core insight: “refreshment enables celebrations to continue”</li><li>Festival anchor: Bastar Dussehra (75 days, 1M+ attendees)</li></ul>
        </article>
        <article className="card">
          <h3>Slide 2: Big Idea + Occasion Creation</h3>
          <p><strong>Campaign:</strong> Tihar ki Thandak | Tagline: Jashn Bada, Thandak Zaroori.</p>
          <ul><li>Procession break points</li><li>Festival welcome drink ritual</li><li>Community sharing bottles (1.25L/2L)</li><li>AIDA funnel-led communication</li></ul>
        </article>
        <article className="card">
          <h3>Slide 3: Portfolio + GTM + Activation</h3>
          <p><strong>Frameworks:</strong> 4Ps + Rural distribution funnel.</p>
          <ul><li>Product portfolio by segment (200ml, 600ml, 1.25L+)</li><li>Price entry at ₹10–₹15</li><li>3,000 outlet expansion via haats + stalls</li><li>Thandak zones and tribal cultural activations</li></ul>
        </article>
        <article className="card">
          <h3>Slide 4: Digital + Financials + Risks</h3>
          <p><strong>Frameworks:</strong> 360° marketing + KPI + risk matrix.</p>
          <ul><li>#ThandakKaTihar UGC and creator strategy</li><li>KPI goals: sales + distribution + brand recall</li><li>Budget: ₹4 Cr, ROI tracking</li><li>Scalability model: Festival → Ritual → Beverage Occasion</li></ul>
        </article>
      </div>
    </>
  );
}

function Admin() {
  return (
    <>
      <h2>Admin Panel</h2>
      <p className="subtitle">Strategic controls for user access, KPI customization, data integration, and alerts.</p>
      <div className="grid two">
        <article className="card"><h3>User Access Management</h3><p>Assign roles: Regional manager, Sales manager, Distributor.</p></article>
        <article className="card"><h3>Data Upload & Integration</h3><p>Upload distributor sales, retail reports, social and campaign metrics.</p></article>
        <article className="card"><h3>Campaign Configuration</h3><p>Adjust campaign timeline, budget allocation, and promotion rules.</p></article>
        <article className="card"><h3>Alert Management & KPI Controls</h3><p>Define thresholds for stock-outs, declining sales, and distribution gaps.</p></article>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
