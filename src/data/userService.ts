export interface UserProfile {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string; // base64 data URL or ""
  joinedAt: string;
}

const USER_KEY = "tutofriends_user";

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  email: "",
  password: "",
  bio: "",
  avatar: "",
  joinedAt: new Date().toISOString(),
};

export const userService = {
  get(): UserProfile | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  save(profile: UserProfile): void {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  },

  register(name: string, email: string, password: string): UserProfile {
    const profile: UserProfile = {
      ...DEFAULT_PROFILE,
      name,
      email,
      password,
      joinedAt: new Date().toISOString(),
    };
    this.save(profile);
    return profile;
  },

  // Returns true if credentials match stored user (or no user yet = mock pass)
  login(email: string, password: string): boolean {
    const stored = this.get();
    if (!stored) return true; // mock: no account stored yet
    return stored.email === email && stored.password === password;
  },

  update(partial: Partial<UserProfile>): UserProfile {
    const current = this.get() ?? { ...DEFAULT_PROFILE };
    const updated = { ...current, ...partial };
    this.save(updated);
    return updated;
  },

  getInitials(name: string): string {
    return name
      .trim()
      .split(" ")
      .map((w) => w[0]?.toUpperCase() ?? "")
      .slice(0, 2)
      .join("");
  },
};