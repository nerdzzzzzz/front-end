// Mock Data for Leaderboard
export const LEADERBOARD_DATA = [
  {
    id: "1",
    name: "Gustavo",
    xp: 2450,
    avatar: require("@/assets/images/people1.jpeg"),
  },
  {
    id: "2",
    name: "Murilo",
    xp: 2130,
    avatar: require("@/assets/images/people2.jpeg"),
  },
  {
    id: "3",
    name: "Nicolas",
    xp: 1980,
    avatar: require("@/assets/images/nicolas.jpeg"),
  },
  {
    id: "4",
    name: "Luigi Segalo",
    xp: 1850,
    avatar: require("@/assets/images/luigi.jpeg"),
  },
  {
    id: "5",
    name: "Brunno",
    xp: 1720,
    avatar: require("@/assets/images/no-pic.jpeg"),
  },
  {
    id: "6",
    name: "You",
    xp: 1650,
    avatar: require("@/assets/images/icaro.jpeg"),
    isCurrentUser: true,
  },
  {
    id: "7",
    name: "Giovanni",
    xp: 1540,
    avatar: require("@/assets/images/giovanni.jpeg"),
  },
  {
    id: "8",
    name: "Fernando",
    xp: 1420,
    avatar: require("@/assets/images/fernando.jpeg"),
  },
  {
    id: "9",
    name: "Luis",
    xp: 1300,
    avatar: require("@/assets/images/luis.jpeg"),
  },
  {
    id: "10",
    name: "Arthur",
    xp: 1100,
    avatar: require("@/assets/images/arthur.jpeg"),
  },
  {
    id: "11",
    name: "Anahe",
    xp: 1100,
    avatar: require("@/assets/images/no-pic.jpeg"),
  },
  {
    id: "12",
    name: "Diogo",
    xp: 1100,
    avatar: require("@/assets/images/diogo.jpeg"),
  },
  {
    id: "13",
    name: "Lucas",
    xp: 1100,
    avatar: require("@/assets/images/no-pic.jpeg"),
  },
  {
    id: "14",
    name: "Chico",
    xp: 1100,
    avatar: "https://i.pravatar.cc/150?u=2042581f4e29026704d",
  },
];

export const PROFILE_DATA = {
  user: {
    name: "Icaro",
    handle: "@icaro",
    joinedDate: "Joined Dez 2025",
    avatar: require("@/assets/images/icaro.jpeg"),
    level: 15,
    currentXP: 1500,
    maxXP: 2000,
  },
  achievements: [
    {
      id: "1",
      title: "FounderNerdz",
      level: "Level 999",
      icon: "DraftingCompass",
      color: "black",
      unlocked: true,
    },
    {
      id: "2",
      title: "UTFPR",
      level: "Level 999",
      icon: "GraduationCap",
      color: "violet",
      unlocked: true,
    },
    {
      id: "3",
      title: "DevNerdz",
      icon: "Terminal",
      color: "blue",
      unlocked: true,
    },
    {
      id: "4",
      title: "Begineer",
      icon: "BookOpen",
      color: "red",
      unlocked: true,
    },
    {
      id: "5",
      title: "Intermediared",
      icon: "ChevronUp",
      color: "red",
      unlocked: false,
    },
    {
      id: "6",
      title: "Advanced",
      level: "Level 1",
      icon: "ChevronsUp",
      color: "red",
      unlocked: false,
    },
  ],
};

export const TIMER_MODES = {
  FOCUS: { time: 25 * 60, label: "Focus" },
  SHORT_BREAK: { time: 5 * 60, label: "Break" },
};

export const LEADERBOARD_CONFIG = {
  title: "NerdzTeam",
};
