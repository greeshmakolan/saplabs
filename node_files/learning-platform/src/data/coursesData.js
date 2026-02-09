const coursesData = [
    // 1️⃣ React Basics
    {
        id: 1,
        title: "React Basics",
        color: "#6C63FF",
        lessons: [
            {
                id: 101,
                title: "JSX & Components",
                content: "Learn JSX syntax and how to create functional components in React.",
                quiz: [
                    { id: 1, question: "JSX stands for?", options: ["Java XML", "JavaScript XML", "JSON"], answer: "JavaScript XML" },
                    { id: 2, question: "React component must return?", options: ["HTML", "JSX", "CSS"], answer: "JSX" },
                    { id: 3, question: "Which one is a functional component?", options: ["class App {}", "function App() {}", "const App = {}"], answer: "function App() {}" }
                ]
            },
            {
                id: 102,
                title: "Props & State",
                content: "Understand props for passing data and state for managing component-specific data.",
                quiz: [
                    { id: 4, question: "Props are?", options: ["Mutable", "Immutable", "Global"], answer: "Immutable" },
                    { id: 5, question: "useState is a?", options: ["Class", "Hook", "Component"], answer: "Hook" },
                    { id: 6, question: "State should be updated using?", options: ["direct assignment", "setState/useState", "console.log"], answer: "setState/useState" }
                ]
            },
            {
                id: 103,
                title: "Event Handling",
                content: "Learn how to handle user interactions with event handlers in React.",
                quiz: [
                    { id: 7, question: "How do you handle events in React?", options: ["onClick", "onclick", "click"], answer: "onClick" },
                    { id: 8, question: "Events are passed as?", options: ["String", "Object", "Number"], answer: "Object" }
                ]
            }
        ]
    },

    // 2️⃣ JavaScript Advanced
    {
        id: 2,
        title: "JavaScript Advanced",
        color: "#FF6584",
        lessons: [
            {
                id: 201,
                title: "Closures",
                content: "Closures allow functions to access variables from an outer scope even after the outer function has executed.",
                quiz: [
                    { id: 9, question: "Closure allows?", options: ["Global access", "Lexical scope", "Memory leak"], answer: "Lexical scope" },
                    { id: 10, question: "Closures are created when?", options: ["Function called", "Function defined", "Variable declared"], answer: "Function defined" }
                ]
            },
            {
                id: 202,
                title: "Promises",
                content: "Promises are used for asynchronous operations, allowing better handling of callbacks.",
                quiz: [
                    { id: 11, question: "Promise has?", options: ["resolve & reject", "then only", "catch only"], answer: "resolve & reject" },
                    { id: 12, question: "Async/Await is?", options: ["Promise syntax", "Syntactic sugar", "Callback"], answer: "Syntactic sugar" }
                ]
            },
            {
                id: 203,
                title: "ES6 Features",
                content: "Learn new ES6 features like let/const, arrow functions, template literals, and more.",
                quiz: [
                    { id: 13, question: "Which is a new variable keyword in ES6?", options: ["var", "let", "const"], answer: "let" },
                    { id: 14, question: "Arrow functions are?", options: ["Old syntax", "New syntax", "Not supported"], answer: "New syntax" }
                ]
            }
        ]
    },

    // 3️⃣ Node.js Basics
    {
        id: 3,
        title: "Node.js Basics",
        color: "#00BFFF",
        lessons: [
            {
                id: 301,
                title: "Introduction to Node.js",
                content: "Node.js allows running JavaScript on the server. Learn its features and architecture.",
                quiz: [
                    { id: 15, question: "Node.js is built on?", options: ["Python", "JavaScript", "Java"], answer: "JavaScript" },
                    { id: 16, question: "Node.js is?", options: ["Frontend", "Backend", "Database"], answer: "Backend" }
                ]
            },
            {
                id: 302,
                title: "Modules & NPM",
                content: "Learn how to use Node modules and the Node Package Manager (NPM) to manage dependencies.",
                quiz: [
                    { id: 17, question: "Default package manager for Node?", options: ["npm", "yarn", "pip"], answer: "npm" },
                    { id: 18, question: "Modules can be imported using?", options: ["require", "import", "both"], answer: "both" }
                ]
            },
            {
                id: 303,
                title: "Express.js Introduction",
                content: "Express.js is a web framework for Node.js to build APIs and web applications efficiently.",
                quiz: [
                    { id: 19, question: "Express.js is a?", options: ["Library", "Framework", "Database"], answer: "Framework" },
                    { id: 20, question: "Express uses?", options: ["Middleware", "Component", "Module"], answer: "Middleware" }
                ]
            }
        ]
    },

    // 4️⃣ Frontend Styling
    {
        id: 4,
        title: "Frontend Styling",
        color: "#FFA500",
        lessons: [
            {
                id: 401,
                title: "CSS Basics",
                content: "Learn the fundamentals of CSS to style HTML elements.",
                quiz: [
                    { id: 21, question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
                    { id: 22, question: "Selector defines?", options: ["Style target", "Function", "Variable"], answer: "Style target" }
                ]
            },
            {
                id: 402,
                title: "Flexbox",
                content: "Flexbox is a layout module that allows distributing space and aligning items in a container.",
                quiz: [
                    { id: 23, question: "Flexbox main axis?", options: ["Row", "Column", "Both"], answer: "Both" },
                    { id: 24, question: "justify-content is?", options: ["Align items", "Align content", "Align main axis"], answer: "Align main axis" }
                ]
            },
            {
                id: 403,
                title: "Grid Layout",
                content: "CSS Grid allows creating complex layouts with rows and columns.",
                quiz: [
                    { id: 25, question: "Grid divides layout into?", options: ["Rows", "Columns", "Rows & Columns"], answer: "Rows & Columns" },
                    { id: 26, question: "Grid template defines?", options: ["Rows", "Columns", "Both"], answer: "Both" }
                ]
            }
        ]
    }
];

export default coursesData;
