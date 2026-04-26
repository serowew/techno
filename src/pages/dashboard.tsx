import Cylinder from "../components/Cylinder";
import "../css/style.css";

const stats = [
  { value: "24",   label: "Sessions Today",  icon: "📅", trend: "+3" },
  { value: "6",    label: "Active Tutors",    icon: "🎓", trend: "+1" },
  { value: "4.9",  label: "Avg. Rating",      icon: "⭐", trend: "+0.1" },
  { value: "138",  label: "Happy Students",   icon: "🙌", trend: "+12" },
];

const subjects = [
  { label: "Mathematics",    count: 42, color: "#0074e4" },
  { label: "Science",        count: 38, color: "#6c3bff" },
  { label: "English",        count: 31, color: "#0074e4" },
  { label: "Programming",    count: 27, color: "#6c3bff" },
  { label: "History",        count: 19, color: "#0074e4" },
  { label: "Filipino",       count: 15, color: "#6c3bff" },
];

const maxCount = Math.max(...subjects.map((s) => s.count));

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div style={{ width: "100%", textAlign: "center", paddingTop: "20px", marginBottom: "40px" }}>
        <h1 className="todays">TODAYS MOST PICK</h1>
      </div>
      <Cylinder />

      {/* ── STATS STRIP ── */}
      <div className="db-stats-strip">
        {stats.map((s, i) => (
          <div
            className="db-stat-card"
            key={s.label}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="db-stat-icon">{s.icon}</span>
            <div className="db-stat-body">
              <span className="db-stat-value">{s.value}</span>
              <span className="db-stat-label">{s.label}</span>
            </div>
            <span className="db-stat-trend">{s.trend}</span>
          </div>
        ))}
      </div>

      {/* ── TRENDING SUBJECTS ── */}
      <div className="db-trending">
        <div className="db-trending-header">
          <p className="db-eyebrow">This Week</p>
          <h2 className="db-trending-title">Trending Subjects</h2>
        </div>
        <div className="db-subject-list">
          {subjects.map((s, i) => (
            <div
              className="db-subject-row"
              key={s.label}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="db-subject-rank">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="db-subject-name">{s.label}</span>
              <div className="db-subject-bar-track">
                <div
                  className="db-subject-bar-fill"
                  style={{
                    width: `${(s.count / maxCount) * 100}%`,
                    background: `linear-gradient(90deg, ${s.color}, ${
                      s.color === "#0074e4" ? "#6c3bff" : "#0074e4"
                    })`,
                  }}
                />
              </div>
              <span className="db-subject-count">{s.count} sessions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;