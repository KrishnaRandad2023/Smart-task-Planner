# Visual Guide: Task History & Sidebar

## 📱 Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Desktop Layout (lg+)                      │
├─────────────┬───────────────────────────────────────────────┤
│             │  Header: [UserMenu] [ThemeToggle]             │
│             │                                                │
│  SIDEBAR    │  Main Content Area                            │
│             │  ┌──────────────────────────────────┐        │
│  [Logo]     │  │  Task History Cards              │        │
│             │  │  ┌────────────────────────┐     │        │
│  📊 Dashboard│  │  Goal: Launch Product     │     │        │
│  (Active)   │  │  Duration: 2 weeks        │     │        │
│             │  │  Created: Oct 14, 2025    │     │        │
│  📚 History │  │  [Expand ▼]               │     │        │
│             │  │  └────────────────────────┘     │        │
│             │  │                                  │        │
│  [ProTip]   │  │  [More Cards...]                │        │
│             │  └──────────────────────────────────┘        │
│             │                                                │
└─────────────┴───────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Mobile Layout (< lg)                      │
├─────────────────────────────────────────────────────────────┤
│  [≡ Menu]  Header: [UserMenu] [ThemeToggle]                │
│                                                               │
│  Main Content (Full Width)                                   │
│  ┌──────────────────────────────────────────────┐          │
│  │  Task History Cards                           │          │
│  │  ┌────────────────────────────────────┐      │          │
│  │  │ Goal: Launch Product                │      │          │
│  │  │ [Details...]                        │      │          │
│  │  └────────────────────────────────────┘      │          │
│  └──────────────────────────────────────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Sidebar States

### Expanded (Desktop)

```
┌─────────────────────────┐
│ ✨ Task Planner     [<] │  ← Collapse button
├─────────────────────────┤
│                         │
│ 🏠 Dashboard            │  ← Active (gradient)
│    Create new plans     │
│                         │
│ 📚 Task History         │
│    View past plans      │
│                         │
├─────────────────────────┤
│ ✨ Pro Tip              │
│ Use detailed goals for  │
│ better AI results       │
└─────────────────────────┘
```

### Collapsed (Desktop)

```
┌────┐
│ ✨ │ [>]  ← Expand button
├────┤
│    │
│ 🏠 │  ← Active
│    │
│ 📚 │
│    │
├────┤
│ ✨ │
└────┘
```

### Mobile Menu (Overlay)

```
┌───────────────────┐
│ ✨ Task Planner [X]│  ← Close button
├───────────────────┤
│                   │
│ 🏠 Dashboard      │  ← Full width
│    Create plans   │
│                   │
│ 📚 Task History   │
│    View history   │
│                   │
├───────────────────┤
│ ✨ Pro Tip        │
│ [Tips...]         │
└───────────────────┘
```

## 📊 Task History Card States

### Collapsed Card

```
┌─────────────────────────────────────────────────────┐
│ 🎯 Launch a product in 2 weeks               [▼]   │
│                                                      │
│ ⏱️ 2 weeks  📅 October 14, 2025  📝 12 tasks       │
└─────────────────────────────────────────────────────┘
```

### Expanded Card

```
┌─────────────────────────────────────────────────────┐
│ 🎯 Launch a product in 2 weeks               [▲]   │
│                                                      │
│ ⏱️ 2 weeks  📅 October 14, 2025  📝 12 tasks       │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Task Breakdown                                       │
│ ┌──────────────────────────────────────────────┐   │
│ │ 1. Market Research  [HIGH] [PENDING]         │   │
│ │    Conduct market analysis...                │   │
│ │    📅 Day 1  ⏱️ 2 days  🔗 0 dependencies    │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │ 2. Design MVP  [MEDIUM] [IN-PROGRESS]        │   │
│ │    Create minimum viable product...          │   │
│ │    📅 Day 3  ⏱️ 5 days  🔗 1 dependencies    │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│ [More tasks...]                                      │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Timeline View                                        │
│ [Gantt Chart with colorful bars]                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## 🎨 Color Coding

### Priority Badges

```
[HIGH]     → 🔴 Red background
[MEDIUM]   → 🟡 Yellow background
[LOW]      → 🟢 Green background
```

### Status Badges

```
[PENDING]      → ⚪ Gray background
[IN-PROGRESS]  → 🔵 Blue background + glow effect
[COMPLETED]    → 🟢 Green background + faded
```

## 🖱️ Interactive Elements

### Sidebar Navigation

```
Hover Effect:
┌─────────────────────────┐
│ 🏠 Dashboard            │ ← Light background on hover
│    Create new plans     │
└─────────────────────────┘

Active State:
┌─────────────────────────┐
│ 🏠 Dashboard            │ ← Gradient blue-to-purple
└─────────────────────────┘
```

### User Menu Dropdown

```
Click Avatar:
┌──────────────────────────┐
│ 👤 My Account            │
├──────────────────────────┤
│ 📧 user@example.com      │
│ 📚 Task History       →  │  ← Clickable
├──────────────────────────┤
│ 🚪 Logout                │  ← Red text
└──────────────────────────┘
```

### Task Card Actions

```
Collapsed:  [Goal Title] [▼]  ← Click to expand
Expanded:   [Goal Title] [▲]  ← Click to collapse
```

## 📐 Responsive Breakpoints

```
Mobile:     < 1024px  → Sidebar hidden, hamburger menu
Desktop:    ≥ 1024px  → Sidebar visible, collapsible
```

## 🎯 Empty State

```
┌───────────────────────────────────────┐
│                                       │
│              📅                       │
│                                       │
│       No Task History Yet             │
│                                       │
│  Start by creating your first task    │
│  plan on the home page                │
│                                       │
│  ┌──────────────────────────┐        │
│  │ 🎯 Create Task Plan      │        │
│  └──────────────────────────┘        │
│                                       │
└───────────────────────────────────────┘
```

## 🔄 Navigation Flow

```
User Journey:

1. Login
   ↓
2. Dashboard (Create tasks)
   ↓
3. Generate task plan
   ↓
4. Click "Task History" in sidebar OR user menu
   ↓
5. View all past plans
   ↓
6. Click ▼ to expand a plan
   ↓
7. See task details + timeline graph
   ↓
8. Click ▲ to collapse
   ↓
9. Click "Dashboard" to create more
```

## 💡 Pro Tips Display

```
Expanded Sidebar:
┌─────────────────────────┐
│ ✨ Pro Tip              │
│ ───────────────────────│
│ Use detailed goals for  │
│ better AI-generated     │
│ task breakdowns         │
└─────────────────────────┘

Collapsed Sidebar:
┌────┐
│ ✨ │  ← Just the icon
└────┘
```

## 🎨 Animation Effects

### Sidebar Toggle

```
Expanded → Collapsed:
[264px width] --300ms--> [64px width]
[Show text]              [Hide text]
```

### Card Expand

```
Collapsed → Expanded:
[Auto height] --smooth--> [Full content height]
[▼ icon]                  [▲ icon]
```

### Mobile Menu

```
Closed → Open:
[-100% translate] --300ms--> [0% translate]
[No backdrop]                [Dark backdrop]
```

## 🎯 Key Visual Elements

1. **Gradient Backgrounds**

   - Active sidebar items
   - User avatars
   - Primary buttons
   - Card headers

2. **Shadows & Depth**

   - Card shadows on hover
   - Sidebar shadow
   - Dropdown menu shadow

3. **Icons**

   - Sparkles (✨) for branding
   - Home (🏠) for dashboard
   - History (📚) for task history
   - Calendar (📅) for dates
   - Clock (⏱️) for duration
   - Target (🎯) for goals

4. **Badges**
   - Rounded pill shapes
   - Color-coded backgrounds
   - Small font size
   - Medium font weight

---

**Status**: Complete visual guide for Task History & Sidebar features
**Next**: Implement and test the features!
