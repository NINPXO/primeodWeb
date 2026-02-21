# PrimeOS Dashboard

A high-fidelity learning management and productivity dashboard built with **Angular 17** (standalone components). PrimeOS helps you track complex, multi-year learning paths through a hierarchical goal-tracking system, perfect for exam preparation (GATE, competitive exams) and skill development.

![Angular](https://img.shields.io/badge/Angular-17.3-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Key Features

- **Hierarchical Progress Tracking**
  - Goals → Sub-goals (Milestones) → Tasks
  - Automatic progress calculation from task completion
  - Visual progress indicators

- **Dashboard & Planning**
  - Daily task overview with temporal bucketing (Today, This Week, Backlog)
  - Monthly milestone navigation
  - Time-aware task prioritization

- **Flexible Daily Logging**
  - Quick text notes for daily entries
  - Structured "Progress Logs" that update task statuses
  - Link logs to specific tasks and track completion

- **Comprehensive Task Management**
  - Task types: Practice, Questions, Video, Book
  - Status tracking: Pending, In Progress, Completed
  - Attach resources (links, files) to tasks
  - Duration and target end date tracking

- **Data Management**
  - Export application data to JSON
  - Import data from backup files
  - Full application reset functionality
  - LocalStorage persistence with automatic sync

- **Rich UI Design**
  - Responsive layout using CSS variables and Grid/Flexbox
  - Gradient cards and modern shadows
  - Sidebar navigation with PrimeOS branding
  - Color-coded sections (Pink, Blue, Orange, Blurple)

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend Framework** | Angular 17.3 |
| **Component System** | Standalone Components |
| **State Management** | Angular Signals |
| **Styling** | SCSS (Sass) |
| **HTTP Client** | RxJS 7.8 |
| **Data Parsing** | XLSX (Excel support) |
| **Persistence** | Browser LocalStorage |
| **Language** | TypeScript 5.4 |
| **Build Tool** | Angular CLI 17.3 |
| **Testing** | Karma + Jasmine |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 17.3: `npm install -g @angular/cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/primeodWeb.git
cd primeodWeb

# Install dependencies
npm install

# Start development server
npm run start
```

The application will be available at **http://localhost:4200**

### Build for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/primeos` directory.

---

## 📁 Project Structure

```
primeos/
├── src/
│   ├── app/
│   │   ├── features/               # Feature modules (domain-based)
│   │   │   ├── dashboard/          # Main dashboard view
│   │   │   ├── daily-log/          # Daily logging feature
│   │   │   ├── progress/           # Progress tracking & visualization
│   │   │   ├── goals/              # Goal management
│   │   │   ├── learning-plan/      # Learning plan overview
│   │   │   ├── notes/              # Notes feature
│   │   │   └── data-management/    # Import/Export/Reset
│   │   ├── services/               # Core services
│   │   │   ├── storage.service.ts  # Single source of truth (Signals)
│   │   │   └── csv.service.ts      # CSV/Excel utilities
│   │   ├── components/             # Reusable UI components
│   │   │   └── modal/              # Modal component
│   │   ├── layout/                 # Global layout
│   │   │   ├── sidebar/
│   │   │   └── footer/
│   │   ├── app.component.*         # Root component
│   │   ├── app.routes.ts           # Routing configuration
│   │   └── app.config.ts           # App configuration
│   ├── assets/                     # Static assets
│   ├── styles/                     # Global styles
│   │   └── styles.scss             # CSS variables & theme
│   └── main.ts                     # Application entry point
├── scripts/                        # Development & utility scripts
│   ├── generate_seed.js           # Data seeding script
│   ├── parse_excel.js             # Excel parser
│   └── sample-data.json           # Sample seed data
├── angular.json                   # Angular configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

---

## 🎨 Architecture

### State Management (Signals)

PrimeOS uses **Angular Signals** for centralized state management through `StorageService`:

```typescript
// Example: StorageService manages all state
goals = signal<Goal[]>([]);
subGoals = signal<SubGoal[]>([]);
tasks = signal<Task[]>([]);

// Components react to signal changes automatically
goalProgress = computed(() => calculateProgress(this.goals()));
```

### Data Model

```typescript
interface Goal {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

interface SubGoal {
  id: string;
  goalId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
}

interface Task {
  id: string;
  subGoalId: string;
  title: string;
  description: string;
  duration: string;
  targetEndDate: string;
  type: 'Practice' | 'Questions' | 'Video' | 'Book';
  status: 'Pending' | 'In Progress' | 'Completed';
  links: Link[];
  files: File[];
}
```

### Progress Calculation

Progress flows **upward** from tasks:
1. **Task Status** → Updated by daily logs
2. **SubGoal Progress** → (Completed Tasks / Total Tasks) × 100
3. **Goal Progress** → Average of child SubGoal progress

---

## 💾 Available Commands

```bash
# Development
npm run start          # Start dev server (http://localhost:4200)
npm run watch         # Watch mode for development
npm run build         # Production build

# Testing
npm run test          # Run unit tests with Karma
npm test -- --watch  # Watch mode for tests

# Utilities (in ./scripts)
node scripts/generate_seed.js      # Generate seed data
node scripts/parse_excel.js        # Parse Excel file
```

---

## 🎨 Color Palette

PrimeOS uses a modern color scheme via CSS variables:

| Variable | Color | Usage |
|----------|-------|-------|
| `--colorLight` | #f9f7f7 | Background |
| `--colorDark` | #20033c | Text/Headers |
| `--colorPink` | #ff2ede | Accent/Highlights |
| `--colorBlue` | #3760f1 | Primary actions |
| `--colorOrange` | #ef6a14 | Secondary highlights |
| `--colorBlurple` | #883fff | Tertiary accents |

---

## 📝 Usage Examples

### Create a Goal
1. Navigate to **Goals** section
2. Click "Create Goal"
3. Enter goal title and description
4. System assigns unique ID and creation date

### Add Progress Log
1. Go to **Daily Logs**
2. Select task from dropdown
3. Update status (Pending → In Progress → Completed)
4. System updates goal/sub-goal progress automatically

### Export Data
1. Open **Data Management**
2. Click "Export Data"
3. Receive JSON backup file
4. Store securely for recovery

### Import Data
1. Open **Data Management**
2. Click "Import Data"
3. Select previously exported JSON file
4. System validates and restores data

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test file
npm test -- --include='**/dashboard.component.spec.ts'

# Run with coverage
npm test -- --code-coverage
```

---

## 🐛 Known Issues & Limitations

- Browser LocalStorage has size limits (~5-10MB depending on browser)
- Excel parsing requires specific sheet structure (see `scripts/parse_excel.js`)
- No offline sync if multiple tabs/windows edit simultaneously

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "feat: add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Open** a Pull Request with a description

### Code Style
- Follow Angular style guide
- Use standalone components
- Leverage Angular Signals for state
- Add unit tests for new features
- Document complex logic with comments

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

---

## 🙋 Support

- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Documentation**: Check the `/docs` directory for detailed guides

---

## 👨‍💻 Author

**Created with ❤️ for learners and productivity enthusiasts**

---

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Signals Guide](https://angular.io/guide/signals)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy Learning! 🎓**
