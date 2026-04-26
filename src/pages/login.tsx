import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../data/userService";
import "../css/style.css";

type Props = {
  onLogin: () => void;
};

const Login = ({ onLogin }: Props) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin]     = useState(true);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");
  const [error, setError]         = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (isLogin) {
      // Validate against stored credentials
      if (!userService.login(email, password)) {
        setError("Incorrect email or password.");
        return;
      }
      onLogin();
      navigate("/");
    } else {
      // Register: persist name, email, password to localStorage
      userService.register(name.trim(), email.trim(), password);
      setError("");
      alert("Account created! You can now log in.");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-container cinematic-fade-in">
      <div className="login-glow" />

      <h1 className="login-title">
        {isLogin ? (
          <>
            <span className="small-text">welcome to</span>
            <span className="brand-name">TutoFriends</span>
          </>
        ) : (
          <span className="create-account">Create Account</span>
        )}
      </h1>

      <form onSubmit={handleSubmit} className="login-form glass-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <p className="login-info">
          {isLogin
            ? "Welcome back. Continue your journey."
            : "Create your account to begin."}
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "#f87171", fontSize: "13px", margin: "0" }}>
            ⚠ {error}
          </p>
        )}

        <button type="submit" className="login-button">
          {isLogin ? "Login" : "Create Account"}
        </button>

        <button
          type="button"
          className="register-button"
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Back to Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;