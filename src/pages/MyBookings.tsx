import { useState, useEffect } from "react";
import { bookingService, type Booking } from "../data/bookingService";
import "../css/myBookings.css";

type FilterType = "all" | "upcoming" | "completed" | "cancelled";

const STATUS_ICONS: Record<string, string> = {
  upcoming:  "🟢",
  completed: "🔵",
  cancelled: "🔴",
};

const STATUS_COLORS: Record<string, string> = {
  upcoming:  "#16a34a",
  completed: "#0074e4",
  cancelled: "#dc2626",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter]     = useState<FilterType>("all");

  const reload = () => setBookings(bookingService.getAll().reverse());

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { reload(); }, []);

  const counts = {
    all:       bookings.length,
    upcoming:  bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const formatDate = (dateStr: string) =>
    new Date(dateStr + "T00:00").toLocaleDateString("en-PH", {
      weekday: "short",
      year:    "numeric",
      month:   "short",
      day:     "numeric",
    });

  const handleCancel = (id: string) => {
    bookingService.cancel(id);
    reload();
  };

  const handleRemove = (id: string) => {
    bookingService.remove(id);
    reload();
  };

  return (
    <div className="mybk-page">
      {/* Header */}
      <div className="mybk-header">
        <h1>My Bookings</h1>
        <p>Track and manage all your tutoring sessions in one place.</p>
      </div>

      {/* Stats row */}
      <div className="mybk-stats">
        <div className="mybk-stat">
          <span className="mybk-stat-num">{counts.upcoming}</span>
          <span className="mybk-stat-label">Upcoming</span>
        </div>
        <div className="mybk-stat-divider" />
        <div className="mybk-stat">
          <span className="mybk-stat-num">{counts.completed}</span>
          <span className="mybk-stat-label">Completed</span>
        </div>
        <div className="mybk-stat-divider" />
        <div className="mybk-stat">
          <span className="mybk-stat-num">{counts.all}</span>
          <span className="mybk-stat-label">Total</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mybk-filters">
        {(["all", "upcoming", "completed", "cancelled"] as FilterType[]).map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="mybk-filter-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Booking list */}
      {filtered.length === 0 ? (
        <div className="mybk-empty">
          <div className="mybk-empty-icon">📭</div>
          <p>
            {filter === "all"
              ? "You haven't made any bookings yet."
              : `No ${filter} bookings found.`}
          </p>
          {filter === "all" && (
            <p className="mybk-empty-sub">
              Head to the <strong>Catalog</strong> to book a tutoring session!
            </p>
          )}
        </div>
      ) : (
        <div className="mybk-list">
          {filtered.map((booking) => (
            <div key={booking.id} className={`mybk-card mybk-card--${booking.status}`}>
              {/* Left: avatar */}
              <img
                src={booking.tutorImage}
                alt={booking.tutorName}
                className="mybk-avatar"
              />

              {/* Center: info */}
              <div className="mybk-info">
                <div className="mybk-top-row">
                  <div>
                    <h3 className="mybk-tutor-name">{booking.tutorName}</h3>
                    <p className="mybk-subject">{booking.tutorSubject}</p>
                  </div>
                  <span
                    className="mybk-status-badge"
                    style={{ color: STATUS_COLORS[booking.status] }}
                  >
                    {STATUS_ICONS[booking.status]} {booking.status}
                  </span>
                </div>

                <div className="mybk-details">
                  <span className="mybk-detail">📅 {formatDate(booking.date)}</span>
                  <span className="mybk-detail">🕐 {booking.time}</span>
                  <span className="mybk-detail">
                    ⏱ {booking.duration} hr{booking.duration !== 1 ? "s" : ""}
                  </span>
                  <span className="mybk-detail mybk-cost">₱{booking.totalCost}</span>
                </div>

                {booking.message && (
                  <p className="mybk-message">"{booking.message}"</p>
                )}
              </div>

              {/* Right: actions */}
              <div className="mybk-actions">
                {booking.status === "upcoming" && (
                  <button
                    className="mybk-cancel-btn"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </button>
                )}
                {booking.status === "cancelled" && (
                  <button
                    className="mybk-remove-btn"
                    onClick={() => handleRemove(booking.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;