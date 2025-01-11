import { Language, StampIcon } from "./types";

export const LANGUAGES: Language[] = [
  // Langages principaux
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "php", name: "PHP" },
  { id: "csharp", name: "C#" },
  { id: "cpp", name: "C++" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "ruby", name: "Ruby" },
  { id: "swift", name: "Swift" },
  { id: "kotlin", name: "Kotlin" },

  // Web
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "scss", name: "SCSS" },
  { id: "jsx", name: "JSX" },
  { id: "tsx", name: "TSX" },

  // Base de données
  { id: "sql", name: "SQL" },
  { id: "mongodb", name: "MongoDB" },
  { id: "graphql", name: "GraphQL" },

  // Configuration
  { id: "json", name: "JSON" },
  { id: "yaml", name: "YAML" },
  { id: "toml", name: "TOML" },
  { id: "ini", name: "INI" },
  { id: "docker", name: "Dockerfile" },

  // Shell
  { id: "bash", name: "Bash" },
  { id: "powershell", name: "PowerShell" },

  // Autres
  { id: "markdown", name: "Markdown" },
  { id: "latex", name: "LaTeX" },
  { id: "r", name: "R" },
  { id: "matlab", name: "MATLAB" },
];

export const SITE_URL = "https://snippet.timoner.com";

export const STAMP_ICONS: StampIcon[] = [
  // Validation et erreurs
  { id: "check", emoji: "✅", label: "Validated" },
  { id: "error", emoji: "❌", label: "Error" },
  { id: "warning", emoji: "⚠️", label: "Warning" },
  { id: "info", emoji: "ℹ️", label: "Information" },
  { id: "question", emoji: "❓", label: "Question" },
  { id: "exclamation", emoji: "❗", label: "Important" },

  // Basic emojis
  { id: "smile", emoji: "🙂", label: "Smile" },
  { id: "sad", emoji: "🙁", label: "Sad" },
  { id: "laugh", emoji: "😄", label: "Laugh" },
  { id: "wink", emoji: "😉", label: "Wink" },
  { id: "love", emoji: "😍", label: "Love" },
  { id: "cool", emoji: "😎", label: "Cool" },
  { id: "thinking", emoji: "🤔", label: "Thinking" },
  { id: "mindblown", emoji: "🤯", label: "Mind Blown" },
  { id: "worried", emoji: "😟", label: "Worried" },
  { id: "confused", emoji: "😕", label: "Confused" },
  { id: "crazy", emoji: "🤪", label: "Crazy" },
  { id: "nerd", emoji: "🤓", label: "Nerd" },

  // Reactions
  { id: "party", emoji: "🎉", label: "Party" },
  { id: "fire", emoji: "🔥", label: "Fire" },
  { id: "hundred", emoji: "💯", label: "Perfect" },
  { id: "clap", emoji: "👏", label: "Clap" },
  { id: "tada", emoji: "🎊", label: "Tada" },
  { id: "trophy", emoji: "🏆", label: "Trophy" },
  { id: "medal", emoji: "🥇", label: "Medal" },
  { id: "sparkles", emoji: "✨", label: "Sparkles" },

  // Tech
  { id: "bug", emoji: "🐛", label: "Bug" },
  { id: "rocket", emoji: "🚀", label: "Rocket" },
  { id: "robot", emoji: "🤖", label: "Robot" },
  { id: "alien", emoji: "👾", label: "Alien" },
  { id: "laptop", emoji: "💻", label: "Laptop" },
  { id: "gear", emoji: "⚙️", label: "Settings" },
  { id: "tools", emoji: "🛠️", label: "Tools" },
  { id: "microscope", emoji: "🔬", label: "Debug" },

  // Communication
  { id: "eyes", emoji: "👀", label: "Eyes" },
  { id: "shush", emoji: "🤫", label: "Shush" },
  { id: "think", emoji: "💭", label: "Think" },
  { id: "speak", emoji: "💬", label: "Speak" },
  { id: "point", emoji: "👉", label: "Point" },
  { id: "handshake", emoji: "🤝", label: "Collaboration" },
  { id: "writing", emoji: "✍️", label: "Writing" },
  { id: "megaphone", emoji: "📢", label: "Announce" },

  // Misc
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "star", emoji: "⭐", label: "Star" },
  { id: "rainbow", emoji: "🌈", label: "Rainbow" },
  { id: "clock", emoji: "⏰", label: "Clock" },
  { id: "target", emoji: "🎯", label: "Target" },
  { id: "idea", emoji: "💡", label: "Idea" },
  { id: "magic", emoji: "🪄", label: "Magic" },
  { id: "lock", emoji: "🔒", label: "Security" },
]; 