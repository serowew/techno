/* TUTOR/SERVICE DATA */

export interface Tutor {
  id: number;
  name: string;
  role: string;
  image: string;
  shortDesc: string;
  bio: string;
  expertise: string[];

}

export const tutorsData: Tutor[] = [
  {
    id: 1,
    name: "Ralph",
    role: "Dev",
    image: "pics/ral.jpg",
    shortDesc: "react and typescript expert",
    bio: "Ralph is a passionate developer with 5+ years of experience in React and TypeScript. Specializing in building modern, scalable web applications. Known for making complex topics simple and enjoyable.",
    expertise: ["Calculus", "Algebra", "Pre-Calculus", "Statistics", "Geometry"],
    
  },
  {
    id: 2,
    name: "RJ",
    role: "Keyboard Warrior",
    image: "pics/chon.png",
    shortDesc: "Full-stack web development expert",
    bio: " 67676776767676776767676767676767676767676767677676767767676767767667677",
    expertise: ["React", "JavaScript", "Node.js", "Python", "CSS"],
    
  },
  {
    id: 3,
    name: "Shane",
    role: "Code WArrior",
    image: "pics/acal.png",
    shortDesc: "Specialized in Roblox and Afking",
    bio: "Shane guides roblox players to his domain expansion",
    expertise: ["Essay Writing", "Literature", "Grammar", "Public Speaking", "Creative Writing"],
    
  },
  {
    id: 4,
    name: "LG",
    role: "MOney Tycoon",
    image: "pics/lg.png",
    shortDesc: "Advanced MOney Tycoon",
    bio: "LG brings money to life ",
    expertise: ["Classical Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics"],
    
  },
  {
    id: 5,
    name: "Emnil",
    role: "Gamer",
    image: "pics/emi.png",
    shortDesc: "English Or Spanish",
    bio: "THE FIRST ONE TO MOVE IS --- GAY El primero en moverse es gay. ",
    expertise: ["Spanish", "French", "Conversational Skills", "Grammar", "Culture"],
    
  },
  {
    id: 6,
    name: "aMONGUS",
    role: "TUNGTUNG SAHUR",
    image: "pics/ral.jpg",
    shortDesc: "MLBB PLAYERS NUMBER 1 SASUKE SA KONOHA",
    bio: "aMONGUS IS BATAK MAG EMEL BAKA SUYOU USER YAN TAS SASUKE PA LALA",
    expertise: ["Business Strategy", "Marketing", "Entrepreneurship", "Finance", "Leadership"],
    
  }
];
