export type Service = {
  id: number;
  title: string;
  desc: string;
  tag: string;
  icon: string;
  price: string;
};

export const servicesData: Service[] = [
  {
    id: 1,
    title: "1-on-1 Tutoring",
    desc: "Personalized sessions tailored to your learning pace and goals.",
    tag: "Popular",
    icon: "🎯",
    price: "₱30/hr",
  },
  {
    id: 2,
    title: "Homework Help",
    desc: "Quick assistance for assignments and difficult problems.",
    tag: "Quick Help",
    icon: "📝",
    price: "₱15/hr",
  },
  {
    id: 3,
    title: "Chill Learning",
    desc: "Relaxed, pressure-free sessions with friendly tutors.",
    tag: "Beginner",
    icon: "😊",
    price: "₱20/hr",
  },
  {
    id: 4,
    title: "Skill Learning",
    desc: "Learn coding, tools, and real-world practical skills.",
    tag: "Skill",
    icon: "💻",
    price: "₱35/hr",
  },
  {
    id: 5,
    title: "Exam Prep",
    desc: "Prepare for exams with focused guided review sessions.",
    tag: "Focused",
    icon: "📚",
    price: "₱25/hr",
  },
  {
    id: 6,
    title: "Group Study",
    desc: "Learn together with peers in a collaborative environment.",
    tag: "Beginner",
    icon: "👥",
    price: "₱10/hr",
  },
];

export const filterTags = ["All", "Popular", "Beginner", "Skill", "Quick Help", "Focused"];