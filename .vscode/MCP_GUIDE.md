# MCP Configuration - Library Management System

## Overview

Model Context Protocol (MCP) is configured to give GitHub Copilot access to:
- **MySQL Database** - Query and analyze the LMS database
- **Project Files** - Understand your entire codebase

## ✅ Configured Servers

### 1. **mysql-library**
Access to your MySQL database for the Library Management System.

```
Type: SQLite/Database
Database: lms
Host: localhost:3306
User: root
```

**Capabilities:**
- Query all tables (books, members, issue_records)
- Get database statistics
- Analyze data relationships

### 2. **project-files**
File system access to your entire project structure.

```
Type: Filesystem
Path: Project root directory
Includes: Backend (Java/Spring) + Frontend (React)
```

**Capabilities:**
- Analyze code structure
- Review configuration files
- Understand project organization
- Generate code based on existing patterns

## 🚀 How to Use

### Step 1: Restart VS Code
After configuration, restart VS Code to activate MCP:
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Reload Window" and press Enter

### Step 2: Ask Copilot Questions
Open Copilot Chat and ask about your project:

**Database Questions:**
- "Show me all books in the database"
- "Get member statistics"
- "List all issued books"
- "Query books with low availability"
- "Get issue record details"

**Code Questions:**
- "Explain the Book entity structure"
- "Review the BookController implementation"
- "Analyze the MemberManagement component"
- "How are API calls made in the frontend?"
- "What's the flow of the book issue process?"

**Architecture Questions:**
- "What are the main components in this project?"
- "How does the frontend communicate with the backend?"
- "Describe the database schema"
- "What are the key services in the backend?"

### Step 3: Use MCP Queries
Ask Copilot to generate SQL queries:
```
"Create a SQL query to find the top 5 most issued books"
"Write a query to get members with overdue books"
"Generate a report of all active issues"
```

## 📚 Project Structure

```
.
├── librarymanagementsystem/     # Spring Boot Backend
│   ├── src/main/java/...       # Java code
│   ├── pom.xml                 # Maven config
│   └── .vscode/                # Backend MCP config
├── frontend/                    # React Frontend
│   ├── src/                    # React components
│   ├── package.json            # NPM config
│   └── .vscode/                # Frontend MCP config
└── .vscode/                    # Project-level MCP config
    ├── mcp.json               # MCP servers
    ├── settings.json          # VS Code settings
    └── extensions.json        # Recommended extensions
```

## 🔧 Database Details

**Connection Info:**
```
Host: localhost
Port: 3306
Database: lms
Username: root
Password: [configured]
```

**Available Tables:**
- `books` - Book catalog
- `members` - Member information
- `issue_records` - Book issue/return history

## ⚙️ Configuration Files

### `.vscode/mcp.json` (Project Root)
Main MCP server configuration with database and filesystem access.

### `.vscode/librarymanagementsystem/mcp.json` (Backend)
Backend-specific MCP configuration.

### `.vscode/frontend/mcp.json` (Frontend)
Frontend-specific MCP configuration.

## 🐛 Troubleshooting

### MCP Not Connecting?
1. **Ensure MySQL is running**
   ```bash
   mysql -u root -p040613
   ```

2. **Verify database exists**
   ```bash
   SHOW DATABASES;  # Should see 'lms'
   ```

3. **Restart VS Code**
   - `Ctrl+Shift+P` → "Reload Window"

4. **Check MCP Status**
   - Open Copilot Chat
   - It should show MCP connection status

### Database Connection Issues?
- Verify host: localhost
- Verify port: 3306
- Verify database: lms exists
- Verify user credentials are correct

## 💡 Tips for Better Results

1. **Be Specific** - Ask detailed questions about your code
2. **Provide Context** - Reference file names or class names
3. **Use Follow-ups** - Build on previous questions
4. **Check Responses** - Verify generated code before using

## 📖 Learn More

- [MCP Documentation](https://modelcontextprotocol.io)
- [GitHub Copilot](https://github.com/features/copilot)
- [VS Code Settings](https://code.visualstudio.com/docs/getstarted/settings)

---

**Your MCP is now fully configured!** Ask Copilot anything about your library management system. 🎯
