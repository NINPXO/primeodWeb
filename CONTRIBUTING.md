# Contributing to PrimeOS Dashboard

Thank you for your interest in contributing to PrimeOS! This document provides guidelines and instructions for contributing.

---

## 🚀 How to Contribute

### Reporting Issues
- Check existing issues before creating new ones
- Use clear, descriptive titles
- Include steps to reproduce the issue
- Attach screenshots if applicable
- Mention your environment (browser, OS, Node version)

### Suggesting Enhancements
- Use "enhancement" label for feature requests
- Describe the use case and expected behavior
- Provide mockups or examples if helpful
- Explain the benefits and any potential drawbacks

### Code Contributions

#### 1. Setup Development Environment
```bash
git clone https://github.com/your-username/primeodWeb.git
cd primeodWeb
npm install
npm run start
```

#### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/your-bug-name
```

#### 3. Make Your Changes
- Follow the code style guidelines (see below)
- Write clean, readable code
- Add or update tests as needed
- Commit with clear messages using conventional commits

#### 4. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

Then open a PR on GitHub with:
- Clear description of changes
- Reference to related issues (if any)
- Screenshots for UI changes
- Test results

---

## 📋 Code Style Guidelines

### General Rules
- Use TypeScript for all new code
- Follow [Angular Style Guide](https://angular.io/guide/styleguide)
- Use meaningful variable and function names
- Keep functions focused and small (< 20 lines preferred)
- Add comments for complex logic

### TypeScript/Component Guidelines
```typescript
// ✅ Good
export class DashboardComponent {
  private storageService = inject(StorageService);
  tasks$ = this.storageService.tasks;

  addTask(title: string): void {
    this.storageService.addTask(title);
  }
}

// ❌ Avoid
export class DashboardComponent {
  constructor(private storage: StorageService) {}
}
```

### Naming Conventions
- **Components**: `PascalCase` with `.component` suffix (e.g., `DashboardComponent`)
- **Services**: `PascalCase` with `.service` suffix (e.g., `StorageService`)
- **Signals**: camelCase (e.g., `tasks`, `currentView`)
- **Methods**: camelCase, verb-based (e.g., `addTask`, `calculateProgress`)
- **CSS Classes**: kebab-case (e.g., `.task-item-inline`, `.goal-card`)

### SCSS/CSS Guidelines
```scss
// ✅ Good: Use CSS variables for colors
.task-card {
  background: var(--colorLight);
  border-bottom: 3px solid var(--colorBlue);
  padding: 1.5rem;
}

// ✅ Good: Use semantic layout
.task-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

// ❌ Avoid: Hard-coded colors
.task-card {
  background: #f9f7f7;
  color: #20033c;
}
```

### File Structure
```
feature-name/
├── feature-name.component.ts      // Component logic
├── feature-name.component.html    // Template
├── feature-name.component.scss    // Styles
└── feature-name.component.spec.ts // Tests
```

---

## 🧪 Testing Guidelines

### Unit Tests
- Write tests for all services and public methods
- Aim for > 80% code coverage
- Use Jasmine matchers effectively
- Mock dependencies properly

```typescript
// Example test
describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should add a task', () => {
    service.addTask('Test Task');
    expect(service.tasks().length).toBe(1);
  });
});
```

### Running Tests
```bash
npm run test                    # Run all tests once
npm run test -- --watch       # Watch mode
npm test -- --code-coverage   # With coverage report
```

---

## 📝 Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build, dependencies, config

**Examples:**
```
feat(dashboard): add weekly view for task planning
fix(daily-log): resolve progress calculation error in milestone tracking
docs(readme): update installation instructions
test(storage-service): add test coverage for signal updates
```

---

## 🔍 Before Submitting PR

- [ ] Code follows style guidelines
- [ ] New tests added and passing
- [ ] Existing tests still pass: `npm run test`
- [ ] Build successful: `npm run build`
- [ ] No console warnings/errors
- [ ] Commit messages are clear and descriptive
- [ ] PR description explains the changes
- [ ] Screenshots attached (for UI changes)
- [ ] No unrelated changes included

---

## 📚 Project Architecture Notes

### Signals Pattern
PrimeOS uses Angular Signals for all state:
- Create signals in `StorageService`
- Components inject and use signals via `computed()` when needed
- Avoid direct service property modifications; use service methods

### Feature Modules
Each feature folder is mostly self-contained:
- Import only necessary services
- Communicate with other features through `StorageService`
- Keep feature-specific logic in the feature component

### Adding a New Feature
1. Create feature folder: `src/app/features/feature-name/`
2. Generate component: `ng g component features/feature-name --skip-tests`
3. Add route in `app.routes.ts`
4. Update sidebar navigation in `layout/sidebar/`
5. Implement feature logic using Signals
6. Add tests: `feature-name.component.spec.ts`
7. Update documentation

---

## 🎯 Priority Areas

We're especially interested in contributions in these areas:
- [ ] Performance optimization
- [ ] Mobile responsiveness improvements
- [ ] Additional data export formats (CSV, PDF)
- [ ] Dark mode support
- [ ] Accessibility (a11y) improvements
- [ ] Internationalization (i18n)
- [ ] End-to-end tests
- [ ] Documentation improvements

---

## ❓ Questions?

- Open a GitHub Discussion
- Check existing issues for answers
- Review closed PRs for context on similar changes

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making PrimeOS better! 🙏**
