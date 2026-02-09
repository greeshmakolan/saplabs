const coursesData = [
    {
        id: 1,
        title: "React Basics",
        color: "#6C63FF",
        lessons: [
            {
                id: 101,
                title: "JSX & Components",
                quiz: [
                    { question: "JSX stands for?", options: ["Java XML", "JavaScript XML", "JSON"], answer: "JavaScript XML" },
                    { question: "React component must return?", options: ["HTML", "JSX", "CSS"], answer: "JSX" },
                    { question: "Which one is a functional component?", options: ["class App {}", "function App() {}", "const App = {}"], answer: "function App() {}" }
                ]
            },
            {
                id: 102,
                title: "Props & State",
                quiz: [
                    { question: "Props are?", options: ["Mutable", "Immutable", "Global"], answer: "Immutable" },
                    { question: "useState is a?", options: ["Class", "Hook", "Component"], answer: "Hook" },
                    { question: "State should be updated using?", options: ["direct assignment", "setState/useState", "console.log"], answer: "setState/useState" }
                ]
            },
            {
                id: 103,
                title: "Event Handling",
                quiz: [
                    { question: "How do you handle events in React?", options: ["onClick", "onclick", "click"], answer: "onClick" },
                    { question: "Events are passed as?", options: ["String", "Object", "Number"], answer: "Object" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "JavaScript Advanced",
        color: "#FF6584",
        lessons: [
            {
                id: 201,
                title: "Closures",
                quiz: [
                    { question: "Closure allows?", options: ["Global access", "Lexical scope", "Memory leak"], answer: "Lexical scope" },
                    { question: "Closures are created when?", options: ["Function called", "Function defined", "Variable declared"], answer: "Function defined" }
                ]
            },
            {
                id: 202,
                title: "Promises",
                quiz: [
                    { question: "Promise has?", options: ["resolve & reject", "then only", "catch only"], answer: "resolve & reject" },
                    { question: "Async/Await is?", options: ["Promise syntax", "Syntactic sugar", "Callback"], answer: "Syntactic sugar" }
                ]
            },
            {
                id: 203,
                title: "ES6 Features",
                quiz: [
                    { question: "Which is a new variable keyword in ES6?", options: ["var", "let", "const"], answer: "let" },
                    { question: "Arrow functions are?", options: ["Old syntax", "New syntax", "Not supported"], answer: "New syntax" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Node.js Basics",
        color: "#00BFFF",
        lessons: [
            {
                id: 301,
                title: "Introduction to Node.js",
                quiz: [
                    { question: "Node.js is built on?", options: ["Python", "JavaScript", "Java"], answer: "JavaScript" },
                    { question: "Node.js is?", options: ["Frontend", "Backend", "Database"], answer: "Backend" }
                ]
            },
            {
                id: 302,
                title: "Modules & NPM",
                quiz: [
                    { question: "Default package manager for Node?", options: ["npm", "yarn", "pip"], answer: "npm" },
                    { question: "Modules can be imported using?", options: ["require", "import", "both"], answer: "both" }
                ]
            },
            {
                id: 303,
                title: "Express.js Introduction",
                quiz: [
                    { question: "Express.js is a?", options: ["Library", "Framework", "Database"], answer: "Framework" },
                    { question: "Express uses?", options: ["Middleware", "Component", "Module"], answer: "Middleware" }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Frontend Styling",
        color: "#FFA500",
        lessons: [
            {
                id: 401,
                title: "CSS Basics",
                quiz: [
                    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
                    { question: "Selector defines?", options: ["Style target", "Function", "Variable"], answer: "Style target" }
                ]
            },
            {
                id: 402,
                title: "Flexbox",
                quiz: [
                    { question: "Flexbox main axis?", options: ["Row", "Column", "Both"], answer: "Both" },
                    { question: "justify-content is?", options: ["Align items", "Align content", "Align main axis"], answer: "Align main axis" }
                ]
            },
            {
                id: 403,
                title: "Grid Layout",
                quiz: [
                    { question: "Grid divides layout into?", options: ["Rows", "Columns", "Rows & Columns"], answer: "Rows & Columns" },
                    { question: "Grid template defines?", options: ["Rows", "Columns", "Both"], answer: "Both" }
                ]
            }
        ]
    }
];

export default coursesData;
