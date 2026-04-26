import { useState } from "react";
import type { TutorListing } from "../data/catalogData";
import { bookingService } from "../data/bookingService";
import "../css/BookingModal.css";

type Step = "datetime" | "duration" | "message" | "payment" | "confirmed";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

const DURATIONS = [
  { label: "1 hr",    value: 1   },
  { label: "1.5 hrs", value: 1.5 },
  { label: "2 hrs",   value: 2   },
  { label: "3 hrs",   value: 3   },
];

const STEP_LABELS: Record<Step, string> = {
  datetime:  "Date & Time",
  duration:  "Duration",
  message:   "Message",
  payment:   "Payment",
  confirmed: "Done",
};

const STEPS: Step[] = ["datetime", "duration", "message", "payment"];

type Props = {
  tutor: TutorListing;
  onClose: () => void;
};

const BookingModal = ({ tutor, onClose }: Props) => {
  const [step, setStep]           = useState<Step>("datetime");
  const [date, setDate]           = useState("");
  const [time, setTime]           = useState("");
  const [duration, setDuration]   = useState<number>(1);
  const [message, setMessage]     = useState("");
  const [cardName, setCardName]   = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv]     = useState("");

  const rateNum = parseInt(tutor.rate.replace(/[^\d]/g, ""), 10) || 0;
  const total   = rateNum * duration;
  const today   = new Date().toISOString().split("T")[0];

  const currentIdx = STEPS.indexOf(step);
  const progress   = step === "confirmed" ? 100 : ((currentIdx + 1) / STEPS.length) * 100;

  const handleConfirm = () => {
    bookingService.add({
      tutorId:      tutor.id,
      tutorName:    tutor.name,
      tutorImage:   tutor.image,
      tutorSubject: tutor.subject,
      tutorRate:    tutor.rate,
      date,
      time,
      duration,
      message,
      totalCost:    total,
    });
    setStep("confirmed");
  };

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
  };

  const isPaymentValid =
    cardName.trim() &&
    cardNumber.replace(/\s/g, "").length === 16 &&
    cardExpiry.length === 5 &&
    cardCvv.length === 3;

  return (
    <div className="bm-overlay" onClick={onClose}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>

        <button className="bm-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── TUTOR STRIP ── */}
        {step !== "confirmed" && (
          <div className="bm-header">
            <div className="bm-tutor-strip">
              <img src={tutor.image} alt={tutor.name} className="bm-avatar" />
              <div className="bm-tutor-meta">
                <span className="bm-tutor-name">{tutor.name}</span>
                <span className="bm-tutor-subject">{tutor.subject}</span>
              </div>
              <span className="bm-tutor-rate">{tutor.rate}</span>
            </div>

            {/* Progress */}
            <div className="bm-progress-track">
              <div className="bm-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="bm-step-pills">
              {STEPS.map((s, i) => (
                <span
                  key={s}
                  className={`bm-pill ${
                    i < currentIdx ? "done" : i === currentIdx ? "active" : ""
                  }`}
                >
                  {i < currentIdx ? "✓" : i + 1}
                  <span className="bm-pill-label">{STEP_LABELS[s]}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ══ STEP 1: DATE & TIME ══ */}
        {step === "datetime" && (
          <div className="bm-step bm-animate">
            <h2 className="bm-step-title">📅 Pick a Date & Time</h2>

            <label className="bm-label">Select Date</label>
            <input
              type="date"
              className="bm-input"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="bm-label">Select Time Slot</label>
            <div className="bm-time-grid">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`bm-time-btn ${time === slot ? "active" : ""}`}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button
              className="bm-next-btn"
              disabled={!date || !time}
              onClick={() => setStep("duration")}
            >
              Next →
            </button>
          </div>
        )}

        {/* ══ STEP 2: DURATION ══ */}
        {step === "duration" && (
          <div className="bm-step bm-animate">
            <h2 className="bm-step-title">⏱️ Session Duration</h2>
            <p className="bm-hint">Choose how long you'd like your session to be.</p>

            <div className="bm-dur-grid">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  className={`bm-dur-card ${duration === d.value ? "active" : ""}`}
                  onClick={() => setDuration(d.value)}
                >
                  <span className="bm-dur-time">{d.label}</span>
                  <span className="bm-dur-price">₱{rateNum * d.value}</span>
                </button>
              ))}
            </div>

            <div className="bm-total-row">
              <span>Estimated Total</span>
              <strong className="bm-total-amount">₱{total}</strong>
            </div>

            <div className="bm-nav-row">
              <button className="bm-back-btn" onClick={() => setStep("datetime")}>← Back</button>
              <button className="bm-next-btn" onClick={() => setStep("message")}>Next →</button>
            </div>
          </div>
        )}

        {/* ══ STEP 3: MESSAGE ══ */}
        {step === "message" && (
          <div className="bm-step bm-animate">
            <h2 className="bm-step-title">💬 Message to Tutor</h2>
            <p className="bm-hint">
              Let <strong>{tutor.name}</strong> know what topics you'd like to focus on.
              <span className="bm-optional"> (optional)</span>
            </p>

            <textarea
              className="bm-textarea"
              placeholder={`e.g. Hi ${tutor.name}! I need help with...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
            <div className="bm-char-count">{message.length} / 300</div>

            <div className="bm-nav-row">
              <button className="bm-back-btn" onClick={() => setStep("duration")}>← Back</button>
              <button className="bm-next-btn" onClick={() => setStep("payment")}>Next →</button>
            </div>
          </div>
        )}

        {/* ══ STEP 4: PAYMENT ══ */}
        {step === "payment" && (
          <div className="bm-step bm-animate">
            <h2 className="bm-step-title">💳 Payment</h2>

            {/* Booking summary */}
            <div className="bm-summary">
              <div className="bm-sum-row"><span>📅 Date</span><span>{date}</span></div>
              <div className="bm-sum-row"><span>🕐 Time</span><span>{time}</span></div>
              <div className="bm-sum-row">
                <span>⏱ Duration</span>
                <span>{duration} hr{duration !== 1 ? "s" : ""}</span>
              </div>
              <div className="bm-sum-row bm-sum-total">
                <span>Total</span>
                <strong>₱{total}</strong>
              </div>
            </div>

            <label className="bm-label">Cardholder Name</label>
            <input
              className="bm-input"
              placeholder="Juan Dela Cruz"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <label className="bm-label">Card Number</label>
            <input
              className="bm-input bm-card-input"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              maxLength={19}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />

            <div className="bm-row-2">
              <div>
                <label className="bm-label">Expiry</label>
                <input
                  className="bm-input"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                />
              </div>
              <div>
                <label className="bm-label">CVV</label>
                <input
                  className="bm-input"
                  placeholder="123"
                  maxLength={3}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                />
              </div>
            </div>

            <p className="bm-secure-note">🔒 Your Information is Secured </p>

            <div className="bm-nav-row">
              <button className="bm-back-btn" onClick={() => setStep("message")}>← Back</button>
              <button
                className="bm-confirm-btn"
                disabled={!isPaymentValid}
                onClick={handleConfirm}
              >
                Confirm Booking ✓
              </button>
            </div>
          </div>
        )}

        {/* ══ CONFIRMED ══ */}
        {step === "confirmed" && (
          <div className="bm-confirmed bm-animate">
            <div className="bm-confirmed-icon">🎉</div>
            <h2 className="bm-confirmed-title">Booking Confirmed!</h2>
            <p className="bm-confirmed-sub">
              Your session with <strong>{tutor.name}</strong> is all set.
            </p>
            <div className="bm-confirmed-card">
              <div className="bm-confirmed-row">
                <span>📅</span><span>{date} at {time}</span>
              </div>
              <div className="bm-confirmed-row">
                <span>⏱</span>
                <span>{duration} hr{duration !== 1 ? "s" : ""}</span>
              </div>
              <div className="bm-confirmed-row">
                <span>💰</span><span>₱{total} paid</span>
              </div>
            </div>
            <p className="bm-confirmed-note">
              Check <strong>My Bookings</strong> to view or manage your sessions.
            </p>
            <button className="bm-next-btn" onClick={onClose}>Done</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;