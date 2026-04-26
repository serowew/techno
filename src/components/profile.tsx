import { useState, useRef, useEffect } from "react";
import { userService, type UserProfile } from "../data/userService";
import { bookingService, type Booking } from "../data/bookingService";
import "../css/profile.css";

type Tab = "info" | "edit" | "password" | "bookings";

const TAB_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "info",     label: "My Info",    icon: "👤" },
  { id: "edit",     label: "Edit",       icon: "✏️" },
  { id: "password", label: "Password",   icon: "🔒" },
  { id: "bookings", label: "Bookings",   icon: "📅" },
];

const STATUS_COLOR: Record<string, string> = {
  upcoming:  "#16a34a",
  completed: "#0074e4",
  cancelled: "#dc2626",
};

const Profile = () => {
  const [profile, setProfile]       = useState<UserProfile | null>(userService.get());
  const [bookings, setBookings]     = useState<Booking[]>(bookingService.getAll());
  const [activeTab, setActiveTab]   = useState<Tab>("info");

  // Edit form state
  const [editName, setEditName]     = useState(profile?.name ?? "");
  const [editBio, setEditBio]       = useState(profile?.bio ?? "");
  const [editEmail, setEditEmail]   = useState(profile?.email ?? "");
  const [editSaved, setEditSaved]   = useState(false);

  // Password form state
  const [currentPw, setCurrentPw]   = useState("");
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [pwError, setPwError]       = useState("");
  const [pwSaved, setPwSaved]       = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = userService.get();
    if (p) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(p);
      setEditName(p.name);
      setEditBio(p.bio);
      setEditEmail(p.email);
    }
    setBookings(bookingService.getAll().reverse());
  }, []);

  /* ── AVATAR ── */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = userService.update({ avatar: reader.result as string });
      setProfile(updated);
    };
    reader.readAsDataURL(file);
  };

  const initials = userService.getInitials(profile?.name ?? "?");

  /* ── SAVE INFO ── */
  const handleSaveInfo = () => {
    if (!editName.trim()) return;
    const updated = userService.update({
      name:  editName.trim(),
      bio:   editBio.trim(),
      email: editEmail.trim(),
    });
    setProfile(updated);
    setEditSaved(true);
    setTimeout(() => setEditSaved(false), 2500);
  };

  /* ── CHANGE PASSWORD ── */
  const handleChangePassword = () => {
    setPwError("");
    if (!currentPw || !newPw || !confirmPw) {
      setPwError("Please fill in all fields.");
      return;
    }
    if (profile?.password && currentPw !== profile.password) {
      setPwError("Current password is incorrect.");
      return;
    }
    if (newPw.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("Passwords do not match.");
      return;
    }
    const updated = userService.update({ password: newPw });
    setProfile(updated);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
  };

  /* ── BOOKING STATS ── */
  const bStats = {
    total:     bookings.length,
    upcoming:  bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    spent:     bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.totalCost, 0),
  };

  const recentBookings = bookings.slice(0, 3);

  const formatDate = (d: string) =>
    new Date(d + "T00:00").toLocaleDateString("en-PH", {
      month: "short", day: "numeric", year: "numeric",
    });

  const joinedDate = profile?.joinedAt
    ? new Date(profile.joinedAt).toLocaleDateString("en-PH", {
        month: "long", year: "numeric",
      })
    : "—";

  return (
    <div className="prof-page">

      {/* ── HERO BANNER ── */}
      <div className="prof-banner">
        <div className="prof-banner-glow" />

        {/* Avatar */}
        <div className="prof-avatar-wrap" onClick={() => fileRef.current?.click()}>
          {profile?.avatar ? (
            <img src={profile.avatar} alt="avatar" className="prof-avatar-img" />
          ) : (
            <div className="prof-avatar-initials">{initials}</div>
          )}
          <div className="prof-avatar-overlay">📷</div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />

        <div className="prof-hero-text">
          <h1 className="prof-hero-name">{profile?.name || "Your Name"}</h1>
          <p className="prof-hero-email">{profile?.email || "your@email.com"}</p>
          {profile?.bio && <p className="prof-hero-bio">{profile.bio}</p>}
          <span className="prof-joined">Member since {joinedDate}</span>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="prof-tabs">
        {TAB_ITEMS.map((t) => (
          <button
            key={t.id}
            className={`prof-tab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            <span className="prof-tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="prof-content">

        {/* ── MY INFO ── */}
        {activeTab === "info" && (
          <div className="prof-panel prof-animate">
            <h2 className="prof-section-title">Account Information</h2>

            <div className="prof-info-grid">
              <div className="prof-info-item">
                <span className="prof-info-label">Full Name</span>
                <span className="prof-info-value">{profile?.name || "—"}</span>
              </div>
              <div className="prof-info-item">
                <span className="prof-info-label">Email</span>
                <span className="prof-info-value">{profile?.email || "—"}</span>
              </div>
              <div className="prof-info-item prof-info-full">
                <span className="prof-info-label">Bio</span>
                <span className="prof-info-value">
                  {profile?.bio || <em className="prof-empty-field">No bio added yet.</em>}
                </span>
              </div>
              <div className="prof-info-item">
                <span className="prof-info-label">Member Since</span>
                <span className="prof-info-value">{joinedDate}</span>
              </div>
            </div>

            <button
              className="prof-edit-shortcut"
              onClick={() => setActiveTab("edit")}
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}

        {/* ── EDIT INFO ── */}
        {activeTab === "edit" && (
          <div className="prof-panel prof-animate">
            <h2 className="prof-section-title">Edit Profile</h2>

            {/* Avatar re-upload */}
            <div className="prof-avatar-edit-row">
              <div className="prof-avatar-sm" onClick={() => fileRef.current?.click()}>
                {profile?.avatar ? (
                  <img src={profile.avatar} alt="avatar" className="prof-avatar-img" />
                ) : (
                  <div className="prof-avatar-initials prof-avatar-initials--sm">{initials}</div>
                )}
                <div className="prof-avatar-overlay">📷</div>
              </div>
              <div>
                <p className="prof-avatar-hint">Click photo to change avatar</p>
                <p className="prof-avatar-hint-sub">JPG, PNG — max 5MB</p>
              </div>
            </div>

            <label className="prof-label">Full Name</label>
            <input
              className="prof-input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Your full name"
            />

            <label className="prof-label">Email</label>
            <input
              className="prof-input"
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="your@email.com"
            />

            <label className="prof-label">Bio</label>
            <textarea
              className="prof-textarea"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Tell tutors a bit about yourself..."
              rows={4}
              maxLength={200}
            />
            <div className="prof-char-count">{editBio.length} / 200</div>

            <button
              className="prof-save-btn"
              onClick={handleSaveInfo}
              disabled={!editName.trim()}
            >
              {editSaved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        )}

        {/* ── CHANGE PASSWORD ── */}
        {activeTab === "password" && (
          <div className="prof-panel prof-animate">
            <h2 className="prof-section-title">Change Password</h2>
            <p className="prof-section-sub">
              Choose a strong password at least 6 characters long.
            </p>

            <label className="prof-label">Current Password</label>
            <input
              className="prof-input"
              type="password"
              placeholder="Enter current password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />

            <label className="prof-label">New Password</label>
            <input
              className="prof-input"
              type="password"
              placeholder="At least 6 characters"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />

            <label className="prof-label">Confirm New Password</label>
            <input
              className="prof-input"
              type="password"
              placeholder="Repeat new password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />

            {/* Strength indicator */}
            {newPw && (
              <div className="prof-strength">
                <div className="prof-strength-bar">
                  <div
                    className="prof-strength-fill"
                    style={{
                      width:
                        newPw.length < 6 ? "25%" :
                        newPw.length < 10 ? "60%" : "100%",
                      background:
                        newPw.length < 6 ? "#dc2626" :
                        newPw.length < 10 ? "#f59e0b" : "#16a34a",
                    }}
                  />
                </div>
                <span className="prof-strength-label">
                  {newPw.length < 6 ? "Weak" : newPw.length < 10 ? "Fair" : "Strong"}
                </span>
              </div>
            )}

            {pwError && <p className="prof-error">⚠ {pwError}</p>}

            <button
              className={`prof-save-btn ${pwSaved ? "prof-save-btn--success" : ""}`}
              onClick={handleChangePassword}
            >
              {pwSaved ? "✓ Password Updated!" : "Update Password"}
            </button>
          </div>
        )}

        {/* ── BOOKING SUMMARY ── */}
        {activeTab === "bookings" && (
          <div className="prof-panel prof-animate">
            <h2 className="prof-section-title">Booking Summary</h2>

            {/* Stats */}
            <div className="prof-bk-stats">
              <div className="prof-bk-stat">
                <span className="prof-bk-num">{bStats.total}</span>
                <span className="prof-bk-lbl">Total</span>
              </div>
              <div className="prof-bk-stat-div" />
              <div className="prof-bk-stat">
                <span className="prof-bk-num" style={{ color: "#16a34a" }}>
                  {bStats.upcoming}
                </span>
                <span className="prof-bk-lbl">Upcoming</span>
              </div>
              <div className="prof-bk-stat-div" />
              <div className="prof-bk-stat">
                <span className="prof-bk-num" style={{ color: "#0074e4" }}>
                  {bStats.completed}
                </span>
                <span className="prof-bk-lbl">Completed</span>
              </div>
              <div className="prof-bk-stat-div" />
              <div className="prof-bk-stat">
                <span className="prof-bk-num">₱{bStats.spent}</span>
                <span className="prof-bk-lbl">Total Spent</span>
              </div>
            </div>

            {/* Recent sessions */}
            <h3 className="prof-recent-title">Recent Sessions</h3>

            {recentBookings.length === 0 ? (
              <div className="prof-bk-empty">
                <span>📭</span>
                <p>No bookings yet. Head to the Catalog to book a session!</p>
              </div>
            ) : (
              <div className="prof-bk-list">
                {recentBookings.map((b) => (
                  <div key={b.id} className="prof-bk-row">
                    <img
                      src={b.tutorImage}
                      alt={b.tutorName}
                      className="prof-bk-avatar"
                    />
                    <div className="prof-bk-info">
                      <span className="prof-bk-name">{b.tutorName}</span>
                      <span className="prof-bk-subject">{b.tutorSubject}</span>
                      <span className="prof-bk-date">
                        {formatDate(b.date)} · {b.time} · {b.duration}hr
                      </span>
                    </div>
                    <div className="prof-bk-right">
                      <span
                        className="prof-bk-status"
                        style={{ color: STATUS_COLOR[b.status] }}
                      >
                        ● {b.status}
                      </span>
                      <span className="prof-bk-cost">₱{b.totalCost}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {bookings.length > 3 && (
              <p className="prof-bk-more">
                +{bookings.length - 3} more — view all in{" "}
                <a href="/bookings" className="prof-bk-link">My Bookings</a>
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;