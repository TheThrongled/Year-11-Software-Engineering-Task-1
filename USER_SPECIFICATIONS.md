SYSTEM TECHNICAL SPECIFICATIONS
This section defines the technical architecture, data structures, and logic required to implement the functional requirements while adhering to the established constraints.
1. Architectural Overview
The system will follow a Client-Server architecture optimized for local execution and web accessibility.

    Frontend: A responsive Single Page Application (SPA) built using HTML5, CSS3, and Vanilla JavaScript to minimize framework bloat.
    Backend: A lightweight Python-based web server (e.g., Flask or FastAPI) to handle logic, user authentication, and tutorial routing.
    Data Persistence: A local SQLite database to store user profiles, progress, and credentials (ensuring the <100MB constraint).

2. Detailed Component Specifications
Component
	Technical Specification
Authentication System	Implementation of SHA-256 hashing for passwords. Session management via Secure Cookies or JWT (JSON Web Tokens).
Responsive Engine	CSS Media Queries with a "Mobile-First" approach. Breakpoints defined for Mobile (375px), Tablet (768px), and Desktop (1024px+).
Tutorial Engine	An Observer Pattern logic that monitors user input fields and triggers immediate DOM updates to provide real-time feedback.
Encryption	Use of TLS 1.3 for data in transit and AES-256 for sensitive local data storage.
3. Data Schema (Core Entities)
To support the "View Progress" and "Account Management" requirements, the database must include:

    User Table: UserID (PK), Username, Email_Hash, Password_Salt, Account_Created_Date.
    Progress Table: ProgressID (PK), UserID (FK), ModuleID, Completion_Status, Last_Accessed_Timestamp.
    Content Table: ModuleID (PK), Title, Content_Blob, Required_Input, Expected_Output.

4. System Logic & Interface Rules

    Input Validation: All user inputs (forms, tutorial code snippets) must be sanitized on the server side to prevent SQL Injection and XSS (Cross-Site Scripting).
    Navigation Logic: A centralized router.js file will manage menu navigation without full page reloads, ensuring the "3-second load time" is maintained after initial entry.
    Feedback Loop: The system shall compare user input against a key-value pair in the Content Table. If 

, trigger "Success" state; else, return "Hint" based on error type.

5. Deployment & Version Control

    Collaboration: A shared GitHub Repository with a main branch (for stable releases) and feature branches (for individual partner commits).
