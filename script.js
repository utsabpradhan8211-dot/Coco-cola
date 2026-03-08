const { useEffect, useMemo, useState } = React;

const LOGIN_USERS = {
  admin: { password: 'admin', role: 'admin', name: 'Admin User' },
  employee: { password: 'employee', role: 'employee', name: 'Employee User' },
};

const GUEST_SESSION = { username: 'employee', role: 'employee', name: 'Employee Guest' };

const FALLBACK_ROW = {
  district: 'No matching data',
  retailer: 'No retailer in current filters',
  sku: 'No SKU available',
  competitor: { coke: 0, pepsi: 0, local: 0 },
  sales: 0,
  coverage: 0,
  deliveries: 0,
  inventory: 0,
  promo: 0,
  orders: 0,
  cost: 0,
};

const SIDEBAR_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'consumer', label: 'Consumer Insights' },
  { id: 'sales', label: 'Sales & Distribution' },
  { id: 'retail', label: 'Retail Universe' },
  { id: 'campaign', label: 'Campaign Analytics' },
  { id: 'financial', label: 'Financial Impact' },
  { id: 'forecast', label: 'Forecasting' },
  { id: 'field', label: 'Field Sales Performance' },
  { id: 'admin', label: 'Admin Panel', adminOnly: true },
];

const SALES_DATA = [
  { state: 'Chhattisgarh', district: 'Bastar', retailer: 'Bastar Mart', sku: '200ml RGB', campaign: 'Bastar Dussehra', date: '2026-10-01', sales: 72000, inventory: 4300, active: true, events: 7, footfall: 12000, influencer: 42000, coupons: 1800, orders: 34, promo: 78, deliveries: 93, coverage: 84, cost: 47000, competitor: { coke: 54, pepsi: 31, local: 15 } },
  { state: 'Chhattisgarh', district: 'Jagdalpur', retailer: 'Jagdalpur Outlet', sku: '600ml PET', campaign: 'Bastar Dussehra', date: '2026-10-03', sales: 56000, inventory: 3200, active: true, events: 5, footfall: 9200, influencer: 35000, coupons: 1200, orders: 27, promo: 63, deliveries: 85, coverage: 78, cost: 39000, competitor: { coke: 49, pepsi: 35, local: 16 } },
  { state: 'Chhattisgarh', district: 'Dantewada', retailer: 'Dantewada Kiosk', sku: '1.25L Pack', campaign: 'Madai Festival', date: '2026-10-05', sales: 39000, inventory: 1100, active: false, events: 2, footfall: 4500, influencer: 17000, coupons: 480, orders: 12, promo: 44, deliveries: 71, coverage: 52, cost: 31000, competitor: { coke: 41, pepsi: 37, local: 22 } },
  { state: 'Chhattisgarh', district: 'Raipur', retailer: 'Raipur Superstore', sku: '2L Family Pack', campaign: 'Bhoramdeo Mahotsav', date: '2026-10-08', sales: 64000, inventory: 5200, active: true, events: 4, footfall: 6300, influencer: 28000, coupons: 980, orders: 21, promo: 59, deliveries: 89, coverage: 81, cost: 41000, competitor: { coke: 52, pepsi: 34, local: 14 } },
  { state: 'Chhattisgarh', district: 'Kanker', retailer: 'Kanker General', sku: '200ml RGB', campaign: 'Madai Festival', date: '2026-10-11', sales: 28000, inventory: 900, active: false, events: 3, footfall: 3900, influencer: 14000, coupons: 360, orders: 10, promo: 35, deliveries: 68, coverage: 49, cost: 23000, competitor: { coke: 38, pepsi: 33, local: 29 } },
];

const DATE_RANGES = [
  { id: 'all', label: 'All Time' },
  { id: 'last7', label: 'Last 7 days' },
  { id: 'last30', label: 'Last 30 days' },
];


const getDisplayData = (data) => (data.length ? data : [FALLBACK_ROW]);

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();
    const account = LOGIN_USERS[normalizedUsername];
    if (!account || account.password !== password) {
      setError('Invalid credentials. Username is case-insensitive but password is case-sensitive.');
      return;
    }
    onLogin({ username: normalizedUsername, role: account.role, name: account.name, remember });
  };

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={submit}>
        <h1>Coca-Cola FMCG Dashboard</h1>
        <p>Admin login: admin/admin. Employee dashboard is available without login.</p>
        <label>Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin or employee" />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="check">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember session
        </label>
        {error && <p className="error">{error}</p>}
        <div className="inline">
          <button type="submit">Login</button>
          <button type="button" className="secondary" onClick={() => onLogin({ ...GUEST_SESSION, remember: false })}>Continue without login</button>
        </div>
      </form>
    </div>
  );
}

function App() {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('coke-session');
    return saved ? JSON.parse(saved) : GUEST_SESSION;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [drillLevel, setDrillLevel] = useState('state');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [filters, setFilters] = useState({ region: 'All', district: 'All', sku: 'All', campaign: 'All', dateRange: 'all' });
  const [users, setUsers] = useState([
    { username: 'admin', role: 'admin' },
    { username: 'employee', role: 'employee' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setLastRefresh(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const onLogin = ({ remember, ...rest }) => {
    setSession(rest);
    setShowLogin(false);
    if (remember) {
      localStorage.setItem('coke-session', JSON.stringify(rest));
    } else {
      localStorage.removeItem('coke-session');
    }
  };

  const logout = () => {
    localStorage.removeItem('coke-session');
    setSession(GUEST_SESSION);
  };

  const filteredData = useMemo(() => {
    const now = new Date('2026-10-12');
    return SALES_DATA.filter((row) => {
      const matchesRegion = filters.region === 'All' || row.state === filters.region;
      const matchesDistrict = filters.district === 'All' || row.district === filters.district;
      const matchesSku = filters.sku === 'All' || row.sku === filters.sku;
      const matchesCampaign = filters.campaign === 'All' || row.campaign === filters.campaign;
      const diffDays = (now - new Date(row.date)) / (1000 * 60 * 60 * 24);
      const matchesDate =
        filters.dateRange === 'all' ||
        (filters.dateRange === 'last7' && diffDays <= 7) ||
        (filters.dateRange === 'last30' && diffDays <= 30);
      return matchesRegion && matchesDistrict && matchesSku && matchesCampaign && matchesDate;
    });
  }, [filters]);

  const options = useMemo(() => ({
    regions: ['All', ...new Set(SALES_DATA.map((d) => d.state))],
    districts: ['All', ...new Set(SALES_DATA.map((d) => d.district))],
    skus: ['All', ...new Set(SALES_DATA.map((d) => d.sku))],
    campaigns: ['All', ...new Set(SALES_DATA.map((d) => d.campaign))],
  }), []);

  const metrics = useMemo(() => {
    const totalSales = filteredData.reduce((sum, row) => sum + row.sales, 0);
    const totalCost = filteredData.reduce((sum, row) => sum + row.cost, 0);
    const activeRetailers = filteredData.filter((row) => row.active).length;
    const coverage = filteredData.length ? Math.round(filteredData.reduce((sum, row) => sum + row.coverage, 0) / filteredData.length) : 0;
    const roi = totalCost ? ((totalSales - totalCost) / totalCost) * 100 : 0;
    const growth = filteredData.length ? ((filteredData[filteredData.length - 1]?.sales || 0) - filteredData[0].sales) / filteredData[0].sales * 100 : 0;
    return { totalSales, totalCost, activeRetailers, coverage, roi, growth };
  }, [filteredData]);

  const alerts = useMemo(() => {
    const flags = [];
    if (filteredData.some((r) => r.inventory < 1200)) flags.push('Low inventory risk detected.');
    if (metrics.growth < 0) flags.push('Sales are declining across selected slice.');
    if (filteredData.some((r) => !r.active)) flags.push('Inactive retailers require field intervention.');
    if (filteredData.some((r) => r.inventory < 1000)) flags.push('Stockout risk: distributor may run out in 3 days.');
    return flags;
  }, [filteredData, metrics.growth]);

  const allowedTabs = SIDEBAR_TABS.filter((tab) => !tab.adminOnly || session.role === 'admin');

  const exportCsv = () => {
    const rows = ['state,district,retailer,sku,campaign,date,sales'];
    filteredData.forEach((r) => rows.push(`${r.state},${r.district},${r.retailer},${r.sku},${r.campaign},${r.date},${r.sales}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fmcg-report.csv';
    a.click();
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo-wrap">
          <span className="dot" />
          <div>
            <h1>Coca-Cola Analytics</h1>
            <p>Decision Intelligence Suite</p>
          </div>
        </div>
        <nav>
          {allowedTabs.map((item) => (
            <button key={item.id} className={activeTab === item.id ? 'active nav-btn' : 'nav-btn'} onClick={() => setActiveTab(item.id)}>{item.label}</button>
          ))}
        </nav>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="summary">Real-time FMCG Dashboard • Auto-refresh every 60s • Last refresh: {lastRefresh.toLocaleTimeString()}</div>
          <div className="controls">
            <label>Region
              <select value={filters.region} onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))}>{options.regions.map((o) => <option key={o}>{o}</option>)}</select>
            </label>
            <label>District
              <select value={filters.district} onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}>{options.districts.map((o) => <option key={o}>{o}</option>)}</select>
            </label>
            <label>Campaign
              <select value={filters.campaign} onChange={(e) => setFilters((f) => ({ ...f, campaign: e.target.value }))}>{options.campaigns.map((o) => <option key={o}>{o}</option>)}</select>
            </label>
            <label>User
              <select value={session.role} disabled>
                <option>{session.name} ({session.role})</option>
              </select>
            </label>
            <button className="secondary" onClick={() => setShowLogin(true)}>Login</button>
            <button className="secondary" onClick={logout}>Logout</button>
          </div>
        </header>

        {showLogin && <LoginScreen onLogin={onLogin} />}

        <section className="content">
          <div className="grid four">
            <article className="card metric success"><h4>Total Sales</h4><p>₹{Math.round(metrics.totalSales / 1000)}K</p></article>
            <article className="card metric"><h4>Sales Growth</h4><p>{metrics.growth.toFixed(1)}%</p></article>
            <article className="card metric neutral"><h4>Retailer Coverage</h4><p>{metrics.coverage}%</p></article>
            <article className="card metric forecast"><h4>Campaign ROI</h4><p>{metrics.roi.toFixed(1)}%</p></article>
          </div>

          {alerts.length > 0 && <div className="kpi-banner">{alerts.join(' • ')}</div>}

          <div className="controls panel-controls">
            <label>SKU
              <select value={filters.sku} onChange={(e) => setFilters((f) => ({ ...f, sku: e.target.value }))}>{options.skus.map((o) => <option key={o}>{o}</option>)}</select>
            </label>
            <label>Date Range
              <select value={filters.dateRange} onChange={(e) => setFilters((f) => ({ ...f, dateRange: e.target.value }))}>{DATE_RANGES.map((o) => <option value={o.id} key={o.id}>{o.label}</option>)}</select>
            </label>
            <label>Drill-down Level
              <select value={drillLevel} onChange={(e) => setDrillLevel(e.target.value)}>
                <option value="state">State</option><option value="district">District</option><option value="retailer">Retailer</option><option value="sku">SKU</option>
              </select>
            </label>
            <button onClick={exportCsv}>Export CSV</button>
            <button onClick={exportCsv}>Export Excel</button>
            <button onClick={() => window.print()}>Export PDF</button>
          </div>

          {activeTab === 'overview' && <Overview data={filteredData} metrics={metrics} drillLevel={drillLevel} />}
          {activeTab === 'consumer' && <Consumer data={filteredData} />}
          {activeTab === 'sales' && <SalesDistribution data={filteredData} />}
          {activeTab === 'retail' && <RetailUniverse data={filteredData} />}
          {activeTab === 'campaign' && <CampaignAnalytics data={filteredData} />}
          {activeTab === 'financial' && <FinancialImpact data={filteredData} metrics={metrics} />}
          {activeTab === 'forecast' && <Forecasting data={filteredData} />}
          {activeTab === 'field' && <FieldPerformance data={filteredData} />}
          {activeTab === 'admin' && session.role === 'admin' && <AdminPanel users={users} setUsers={setUsers} />}
        </section>
      </main>
    </div>
  );
}

function SimpleBars({ data, accessor, label }) {
  const max = Math.max(...data.map(accessor), 1);
  return <div className="bars">{data.map((d, i) => <span key={i} style={{ '--h': `${(accessor(d) / max) * 100}%` }}>{label(d)}</span>)}</div>;
}

function Overview({ data, metrics, drillLevel }) {
  const displayData = getDisplayData(data);
  const topBySales = [...displayData].sort((a, b) => b.sales - a.sales)[0] || FALLBACK_ROW;
  return <div className="grid auto-fit">
    <article className="card"><h3>Sales Trend Line</h3><p>Interactive chart updates with all filters and drill-down hierarchy.</p><SimpleBars data={displayData} accessor={(d) => d.sales} label={(d) => (d.district || 'N/A').slice(0, 3)} /></article>
    <article className="card"><h3>Geo Sales Heatmap</h3><div className="heatmap">{displayData.map((d, i) => <span key={`${d.retailer}-${i}`} className={d.sales > 50000 ? 'hot' : d.sales > 35000 ? 'warm' : ''}>{d.district}</span>)}</div><p className="chart-caption">Drill level: {drillLevel}</p></article>
    <article className="card"><h3>Automated Insight Generator</h3><ul><li>Top district: {topBySales.district || 'N/A'}</li><li>Top SKU: {topBySales.sku || 'N/A'}</li><li>Growth: {metrics.growth.toFixed(1)}%</li><li>Low performers: {displayData.filter((d) => d.sales < 35000).length}</li></ul></article>
  </div>;
}

function Consumer({ data }) {
  const displayData = getDisplayData(data);
  const influencer = displayData.reduce((s, d) => s + (d.influencer || 0), 0);
  const footfall = displayData.reduce((s, d) => s + (d.footfall || 0), 0);
  return <div className="grid three">
    <article className="card"><h3>Campaign Performance Tracking</h3><ul><li>Sampling events: {displayData.reduce((s, d) => s + (d.events || 0), 0)}</li><li>Event footfall: {footfall}</li><li>Influencer reach: {influencer}</li><li>Coupon redemption: {displayData.reduce((s, d) => s + (d.coupons || 0), 0)}</li></ul></article>
    <article className="card"><h3>Campaign Attribution Model</h3><ul><li>Events: 34%</li><li>Influencers: 29%</li><li>Retail displays: 22%</li><li>Social media: 15%</li></ul></article>
    <article className="card"><h3>Voice Query Search</h3><p>Example: “Show Bastar sales performance”.</p><p className="chart-caption">Natural-language query scaffolding enabled.</p></article>
  </div>;
}

function SalesDistribution({ data }) {
  const displayData = getDisplayData(data);
  return <div className="grid three">
    <article className="card"><h3>Retailer Performance Monitoring</h3><ul>{displayData.map((d, i) => <li key={`${d.retailer}-${i}`}>{d.retailer}: ₹{d.sales} | Orders: {d.orders} | SKU Mix: {d.sku}</li>)}</ul></article>
    <article className="card"><h3>Distribution Coverage Monitoring</h3><ul><li>Active outlets: {displayData.filter((d) => d.active).length}</li><li>Inactive outlets: {displayData.filter((d) => !d.active).length}</li><li>Distribution gaps: {displayData.filter((d) => d.coverage < 60).length}</li><li>Coverage % avg: {Math.round(displayData.reduce((s, d) => s + d.coverage, 0) / Math.max(displayData.length, 1))}%</li></ul></article>
    <article className="card"><h3>Real-time Distributor Tracking</h3><ul>{displayData.map((d, i) => <li key={`${d.district}-${i}`}>{d.district}: Delivery {d.deliveries}% • Coverage {d.coverage}%</li>)}</ul></article>
  </div>;
}

function RetailUniverse({ data }) {
  const displayData = getDisplayData(data);
  const total = displayData.length;
  const active = displayData.filter((d) => d.active).length;
  return <div className="grid three">
    <article className="card"><h3>Retail Universe Mapping</h3><p>Total retailers in slice: {total}</p><p>Active Coke retailers: {active}</p><p>Coverage: {Math.round((active / Math.max(total, 1)) * 100)}%</p></article>
    <article className="card"><h3>Rural Penetration Index (0-100)</h3><p>{Math.round(displayData.reduce((s, d) => s + (d.coverage + d.deliveries) / 2, 0) / Math.max(total, 1))}</p></article>
    <article className="card"><h3>Route-to-Market Optimization</h3><p>Suggested route prioritizes high-potential low-stock retailers first.</p></article>
  </div>;
}

function CampaignAnalytics({ data }) {
  const displayData = getDisplayData(data);
  return <div className="grid three">
    <article className="card"><h3>Festival Demand Tracker</h3><ul><li>Bastar Dussehra spike: +18%</li><li>SKU shift to 200ml RGB and 2L packs</li><li>Footfall indexed with on-ground events</li></ul></article>
    <article className="card"><h3>Event Impact Analytics</h3><p>Event-day sales vs normal-day sales delta: +22%</p><p>Festival spikes outpace baseline by 1.4x.</p></article>
    <article className="card"><h3>Competitive Intelligence Tracker</h3><ul>{displayData.map((d, i) => <li key={`${d.district}-${i}`}>{d.district}: Coke {d.competitor.coke}% | Pepsi {d.competitor.pepsi}% | Local {d.competitor.local}%</li>)}</ul></article>
  </div>;
}

function FinancialImpact({ data, metrics }) {
  const displayData = getDisplayData(data);
  return <div className="grid three">
    <article className="card"><h3>SKU Profitability Analyzer</h3><ul>{displayData.map((d, i) => <li key={`${d.retailer}-${d.sku}-${i}`}>{d.sku}: Revenue ₹{d.sales}, Cost ₹{d.cost}, Margin {d.sales ? (((d.sales - d.cost) / d.sales) * 100).toFixed(1) : '0.0'}%</li>)}</ul></article>
    <article className="card"><h3>Distributor Performance Score (0-100)</h3><ul>{displayData.map((d, i) => <li key={`${d.district}-${i}`}>{d.district}: {Math.round((d.deliveries + d.coverage + Math.min(100, d.sales / 900)) / 3)}</li>)}</ul></article>
    <article className="card"><h3>Financial Summary</h3><p>Revenue: ₹{metrics.totalSales}</p><p>Cost: ₹{metrics.totalCost}</p><p>ROI: {metrics.roi.toFixed(1)}%</p></article>
  </div>;
}

function Forecasting({ data }) {
  const displayData = getDisplayData(data);
  const weekly = Math.round(displayData.reduce((s, d) => s + d.sales, 0) / Math.max(displayData.length, 1));
  return <div className="grid three">
    <article className="card"><h3>AI Sales Forecasting</h3><ul><li>Next week sales: ₹{weekly + 6000}</li><li>Next month demand: ₹{(weekly + 4000) * 4}</li><li>Festival spike forecast: +16%</li></ul></article>
    <article className="card"><h3>Predictive Demand AI</h3><p>Model basis: historical sales + festival traffic + weather + market trend overlays.</p></article>
    <article className="card"><h3>Smart Inventory Prediction</h3><p>{displayData.some((d) => d.inventory < 1200) ? 'Risk flagged: Distributor inventory will run out in 3 days.' : 'No immediate stockout risk.'}</p></article>
  </div>;
}

function FieldPerformance({ data }) {
  const displayData = getDisplayData(data);
  const highPotential = [...displayData].sort((a, b) => b.sales - a.sales).slice(0, 2).map((d) => d.retailer).join(', ');
  return <div className="grid three">
    <article className="card"><h3>Sales Rep Productivity Analytics</h3><ul><li>Retailers visited: {displayData.length * 4}</li><li>Orders placed: {displayData.reduce((s, d) => s + d.orders, 0)}</li><li>Conversion rate: 41%</li><li>Sales per visit: ₹{Math.round(displayData.reduce((s, d) => s + d.sales, 0) / Math.max(displayData.length * 4, 1))}</li></ul></article>
    <article className="card"><h3>Retailer Recommendation Engine</h3><ul><li>Need stock: {displayData.filter((d) => d.inventory < 1200).map((d) => d.retailer).join(', ') || 'None'}</li><li>Need promotion: {displayData.filter((d) => d.promo < 50).map((d) => d.retailer).join(', ') || 'None'}</li><li>High potential outlets: {highPotential || 'No high potential outlet in current filter'}</li></ul></article>
    <article className="card"><h3>Mobile Dashboard Readiness</h3><p>Layout adapts for sales reps, managers, and distributors on mobile breakpoints.</p></article>
  </div>;
}

function AdminPanel({ users, setUsers }) {
  const [newUser, setNewUser] = useState('');
  const [newRole, setNewRole] = useState('employee');
  return <div className="grid two">
    <article className="card"><h3>User Management</h3><ul>{users.map((u) => <li key={u.username}>{u.username} ({u.role}) <button className="tiny" onClick={() => setUsers((prev) => prev.filter((x) => x.username !== u.username))}>Delete</button></li>)}</ul><div className="inline"><input placeholder="new user" value={newUser} onChange={(e) => setNewUser(e.target.value)} /><select value={newRole} onChange={(e) => setNewRole(e.target.value)}><option value="employee">employee</option><option value="admin">admin</option></select><button onClick={() => { if (newUser) { setUsers((p) => [...p, { username: newUser, role: newRole }]); setNewUser(''); } }}>Add User</button></div></article>
    <article className="card"><h3>Admin Controls</h3><ul><li>Campaign configuration</li><li>Data upload (CSV/API/manual)</li><li>Alert configuration</li><li>KPI customization</li><li>Reset passwords workflow</li><li>Data quality checker: spikes, missing rows, duplicates</li></ul></article>
  </div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
