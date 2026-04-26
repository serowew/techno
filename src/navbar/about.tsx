import { tutorsData } from "../data/devs";
import "../css/about.css";
import { Link } from "react-router-dom";

const values = [
  { icon: "🤝", title: "Peer-to-Peer", desc: "Learn from fellow students who genuinely understand the struggle." },
  { icon: "💡", title: "No Pressure",  desc: "Chill, friendly sessions built to grow confidence, not stress." },
  { icon: "📍", title: "Local First",  desc: "Made for Filipino students, with tutors who speak your language." },
  { icon: "⚡", title: "Flexible",     desc: "Book on your own schedule — quick help or deep-dives, your call." },
];

const stats = [
  { value: "6+",   label: "Expert Tutors"    },
  { value: "6",    label: "Subjects Covered" },
  { value: "₱150", label: "Starting Rate"    },
  { value: "100%", label: "Student-Focused"  },
];

function About() {
  return (
    <div className="about-page-light">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="abl-hero">
        <p className="abl-eyebrow">Who We Are</p>
        <h1 className="abl-hero-title">
          Learning is better<br />
          <span className="abl-gradient-text">with a friend.</span>
        </h1>
        <p className="abl-hero-sub">
          TutoFriends connects students with peer tutors who make learning
          feel less like work — and more like a conversation.
        </p>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="abl-stats">
        {stats.map((s) => (
          <div className="abl-stat-card" key={s.label}>
            <span className="abl-stat-value">{s.value}</span>
            <span className="abl-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── Mission ──────────────────────────────── */}
      <section className="abl-mission">
        <div className="abl-mission-text">
          <p className="abl-eyebrow">Our Mission</p>
          <h2>Making quality tutoring <span className="abl-gradient-text">accessible</span> to every student.</h2>
          <p>
            We started TutoFriends because asking for help can feel intimidating.
            Traditional tutoring is often expensive and stiff. Our platform brings
            together passionate peer tutors for affordable, relaxed, and effective
            learning sessions — no judgment, just support.
          </p>
          <p>
            Whether you need a quick homework assist or a full exam-prep deep-dive,
            there's a TutoFriend ready for you.
          </p>
        </div>
        <div className="abl-mission-card abl-panel">
          <span className="abl-mission-icon">📚</span>
          <p>"We learn best when we feel safe to ask questions."</p>
          <span className="abl-mission-attr">— The TutoFriends Team</span>
        </div>
      </section>

      {/* ── Values ───────────────────────────────── */}
      <section className="abl-section">
        <p className="abl-eyebrow" style={{ textAlign: "center" }}>What We Stand For</p>
        <h2 className="abl-section-title">Our Values</h2>
        <div className="abl-values-grid">
          {values.map((v) => (
            <div className="abl-value-card abl-panel" key={v.title}>
              <span className="abl-value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────── */}
      <section className="abl-section">
        <p className="abl-eyebrow" style={{ textAlign: "center" }}>The People Behind It</p>
        <h2 className="abl-section-title">Meet the Devs</h2>
        <p className="abl-section-sub">
          The same team you'll find in the <strong>Contact</strong> page —
          click any card there to see their full profile.
        </p>
        <div className="abl-team-grid">
          {tutorsData.map((dev) => (
            <div className="abl-team-card abl-panel" key={dev.id}>
              <div className="abl-team-img-wrap">
                <img src={dev.image} alt={dev.name} className="abl-team-img" />
                <div className="abl-team-img-glow" />
              </div>
              <h3 className="abl-team-name">{dev.name}</h3>
              <span className="abl-team-role">{dev.role}</span>
              <p className="abl-team-desc">{dev.shortDesc}</p>
              <div className="abl-team-tags">
                {dev.expertise.slice(0, 3).map((tag) => (
                  <span className="abl-team-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="abl-cta">
        <div className="abl-cta-inner abl-panel">
          <h2>Ready to find your TutoFriend?</h2>
          <p>Browse our catalog and book a session that fits your schedule.</p>
          <Link to="/catalog" className="abl-cta-btn">Browse Tutors →</Link>
        </div>
      </section>

    </div>
  );
}

export default About;