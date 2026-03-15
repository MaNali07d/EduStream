# EduStream – AI Learning OS

## Project Overview

**Project Name**: EduStream  
**Type**: EdTech Web Application  
**Core Functionality**: A comprehensive learning management system with simulated AI features for education, featuring course management, assignments, quizzes, and personalized learning paths.  
**Target Users**: Students, Teachers, and Administrators in educational institutions

---

## UI/UX Specification

### Layout Structure

**Sidebar Navigation (Fixed Left - 280px)**
- Logo and brand name at top
- Navigation links with icons
- User profile section at bottom
- Collapsible on mobile (hamburger menu)

**Main Content Area**
- Header with page title and notification bell
- Content area with padding 24px
- Max-width container: 1400px

**Responsive Breakpoints**
- Mobile: < 768px (sidebar becomes drawer)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**
- Background Primary: #0F0F14 (deep black)
- Background Secondary: #1A1A24 (dark card)
- Background Tertiary: #252532 (elevated surfaces)
- Accent Primary: #6366F1 (indigo-500)
- Accent Secondary: #8B5CF6 (violet-500)
- Accent Gradient: linear-gradient(135deg, #6366F1, #8B5CF6)
- Success: #10B981 (emerald-500)
- Warning: #F59E0B (amber-500)
- Error: #EF4444 (red-500)
- Text Primary: #F9FAFB (gray-50)
- Text Secondary: #9CA3AF (gray-400)
- Text Muted: #6B7280 (gray-500)
- Border: #374151 (gray-700)

**Typography**
- Font Family: "Inter", system-ui, sans-serif
- Heading 1: 32px, font-weight 700
- Heading 2: 24px, font-weight 600
- Heading 3: 20px, font-weight 600
- Body: 14px, font-weight 400
- Small: 12px, font-weight 400

**Spacing System**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects**
- Card shadows: 0 4px 24px rgba(0, 0, 0, 0.3)
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)
- Transitions: 200ms ease-in-out
- Hover states: brightness increase, subtle scale

### Components

**Cards**
- Background: #1A1A24
- Border: 1px solid #374151
- Border radius: 12px
- Padding: 24px
- Hover: subtle glow effect

**Buttons**
- Primary: gradient background, white text
- Secondary: transparent, border, text color
- Sizes: sm (32px), md (40px), lg (48px)
- Hover: brightness increase

**Form Inputs**
- Background: #252532
- Border: 1px solid #374151
- Focus: border-color #6366F1
- Placeholder: #6B7280

**Progress Bars**
- Height: 8px
- Border radius: 4px
- Background: #374151
- Fill: gradient #6366F1 to #8B5CF6

**Badges/Tags**
- Background: #252532
- Border radius: 16px
- Padding: 4px 12px

---

## Functionality Specification

### 1. Authentication System

**Login Page**
- Email and password fields
- Role indicator
- "Remember me" checkbox
- Link to signup

**Signup Page**
- Full name, email, password
- Role selection (Student/Teacher)
- Terms acceptance checkbox

**Session Management**
- Store user in localStorage
- Persist across page refreshes
- Logout functionality

### 2. Dashboard

**Student Dashboard**
- Welcome message with user name
- Enrolled courses grid (max 4)
- Upcoming assignments list (next 5)
- Recent quiz scores
- Progress chart (line chart - 7 days)
- Activity feed

**Teacher Dashboard**
- Total courses count
- Total students
- Pending assignments to grade
- Recent submissions
- Course performance chart

**Admin Dashboard**
- Platform statistics
- User count by role
- Course count
- Recent activity log

### 3. Course Management

**Course List (Browse)**
- Grid view with course cards
- Filter by category
- Search functionality
- Enrollment button

**Course Detail**
- Course title and description
- Instructor info
- Lecture list
- Materials list
- Enrolled students count

**Create Course (Teacher)**
- Title, description, category
- Thumbnail upload (URL)
- Add lectures (title, video URL, description)
- Add materials (title, URL)
- Publish toggle

**Course Player**
- Video player (YouTube embed or HTML5)
- Lecture title and description
- Mark as complete button
- Next/Previous navigation

### 4. Assignment System

**Assignment List**
- Filter: All/Pending/Submitted/Graded
- Due date indicator
- Status badge

**Create Assignment (Teacher)**
- Title, description
- Course selection
- Deadline (date picker)
- Max points
- Instructions

**Submit Assignment (Student)**
- Text area for answers
- File upload simulation
- Submit button
- Deadline warning

**Grade Assignment (Teacher)**
- View submission
- Points input
- Feedback text area
- Submit grade

### 5. Quiz System

**Quiz List**
- Available quizzes
- Completed quizzes with scores
- Time limit indicator

**Create Quiz (Teacher)**
- Title, description
- Course selection
- Time limit
- Add questions (MCQ format)
- Set correct answers

**Take Quiz (Student)**
- Question display (one at a time)
- Options as radio buttons
- Timer display
- Submit button
- Results page with score
- Review answers option

### 6. Student Progress Dashboard

**Progress Overview**
- Overall completion percentage
- Courses enrolled vs completed
- Average quiz score
- Total study time

**Charts**
- Line chart: Quiz scores over time
- Bar chart: Assignment completion
- Radar chart: Skills coverage
- Pie chart: Time spent per course

### 7. Study Assistant (Simulated AI)

**Knowledge Base**
Predefined explanations for topics:
- Neural Networks
- Photosynthesis
- Python Programming
- Data Structures
- Machine Learning
- Web Development
- Mathematics (Algebra, Calculus)
- Physics (Mechanics, Thermodynamics)
- Chemistry (Organic, Inorganic)
- Biology (Cell Biology, Genetics)

**Response Logic**
- Match user question to knowledge base
- Return formatted explanation
- If unknown: "This topic will be covered in upcoming lessons."

**UI**
- Chat interface
- Message bubbles
- Typing indicator simulation
- Suggested questions

### 8. Quiz Generator (Simulated AI)

**Input**
- Text area for study notes
- Generate button

**Processing**
- Split text into sentences
- Identify key sentences (keyword matching)
- Convert to question format
- Generate 3-5 questions

**Output**
- List of generated questions
- Option to add to quiz

### 9. Assignment Feedback (Simulated AI)

**Analysis**
- Word count check (< 50 words: "Too short")
- Sentence clarity (repeated words detection)
- Grammar patterns (basic checks)
- Suggestions generation

**Feedback Types**
- Positive: "Your answer is detailed"
- Improvement: "Try improving sentence clarity"
- Warning: "Add more examples"
- Length: "Consider adding more detail"

### 10. Learning Path Generator

**Input Form**
- Skill level: Beginner/Intermediate/Advanced
- Subject: dropdown with subjects
- Goal: text input

**Templates**
- Data Science (3 paths)
- Web Development (3 paths)
- Mobile Development (3 paths)
- Machine Learning (3 paths)
- Programming Basics (3 paths)

**Output**
- Week-by-week roadmap
- Topic list per week
- Estimated time per topic
- Progress tracking

### 11. Notification System

**Types**
- Assignment due reminder
- Quiz available
- Grade posted
- Course update

**Display**
- Bell icon with badge count
- Dropdown list
- Mark as read
- Time ago display

### 12. Admin Panel

**User Management**
- User list with search
- Role management
- Account status toggle

**Course Management**
- All courses list
- Delete/approve courses

**Statistics**
- Total users
- Active users
- Total courses
- Total submissions

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme applied consistently
- [ ] Sidebar navigation functional
- [ ] Cards have proper shadows and borders
- [ ] Charts render correctly
- [ ] Forms are styled consistently
- [ ] Responsive on mobile/tablet

### Functional Checkpoints
- [ ] User can signup and login
- [ ] Role selection works
- [ ] Dashboard shows relevant data
- [ ] Courses can be created and viewed
- [ ] Enrollments work
- [ ] Assignments can be created and submitted
- [ ] Quizzes can be taken and graded
- [ ] Progress charts display correctly
- [ ] Study Assistant responds to questions
- [ ] Quiz Generator creates questions
- [ ] Assignment Feedback provides suggestions
- [ ] Learning Path generates roadmap
- [ ] Notifications display
- [ ] Admin panel accessible

### Data Persistence
- [ ] User data persists in localStorage
- [ ] Course data persists
- [ ] Quiz results persist
- [ ] Progress tracked across sessions

---

## Technical Implementation

### State Management
- Zustand with localStorage persistence
- Separate stores: auth, courses, assignments, quizzes, notifications

### Routing
- React Router DOM v6
- Protected routes based on role

### Charts
- Recharts library
- Line, Bar, Pie, Radar charts

### Icons
- Lucide React

### Build
- Vite for development and build
- TypeScript strict mode
