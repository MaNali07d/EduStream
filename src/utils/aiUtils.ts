// Knowledge base for Study Assistant
// Using plain strings instead of template literals to avoid parsing issues
export const knowledgeBase = [
  {
    keywords: ['neural network', 'neural networks', 'deep learning', 'deep neural', 'perceptron'],
    topic: 'Neural Networks',
    explanation: "Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) organized in layers.\n\n**Key Concepts:**\n- Neuron: The basic unit that receives input, processes it, and produces output\n- Layers: Input layer (receives data), Hidden layers (process data), Output layer (produces results)\n- Weights: Connections between neurons that get adjusted during training\n- Activation Functions: Functions like Sigmoid, ReLU, and Tanh that determine if a neuron fires\n\n**How They Learn:**\n1. Forward Propagation: Data flows through the network\n2. Loss Calculation: Compare predicted output to actual\n3. Backpropagation: Adjust weights to reduce error\n4. Repeat until convergence\n\n**Common Types:**\n- Feedforward Neural Networks (FNN)\n- Convolutional Neural Networks (CNN) - for images\n- Recurrent Neural Networks (RNN) - for sequences\n- Transformers - for NLP"
  },
  {
    keywords: ['photosynthesis', 'plant food', 'chlorophyll', 'light reaction', 'dark reaction'],
    topic: 'Photosynthesis',
    explanation: "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose.\n\n**The Equation:**\n6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2\n\n**Two Main Stages:**\n\n1. **Light-Dependent Reactions** (in thylakoid membranes):\n   - Chlorophyll absorbs light energy\n   - Water is split into oxygen and hydrogen\n   - ATP and NADPH are produced\n\n2. **Light-Independent Reactions** (in stroma):\n   - Also called Calvin Cycle\n   - Uses ATP and NADPH to convert CO2 into glucose\n   - Doesn't require light directly\n\n**Key Factors:**\n- Light intensity\n- CO2 concentration\n- Temperature\n- Water availability\n\n**Why It Matters:**\n- Produces oxygen for respiration\n- Forms base of food chains\n- Removes CO2 from atmosphere"
  },
  {
    keywords: ['python', 'programming', 'coding', 'variable', 'function', 'loop'],
    topic: 'Python Programming',
    explanation: "Python is a high-level, interpreted programming language known for its readability and versatility.\n\n**Basics:**\n- Variables: Containers for storing data\n  - Numbers: x = 5\n  - Strings: name = \"Hello\"\n  - Lists: nums = [1, 2, 3]\n\n- Functions: Reusable blocks of code\n  def greet(name):\n      return f\"Hello, {name}!\"\n\n- Conditionals: Making decisions\n  if x > 10:\n      print(\"Big\")\n  elif x > 5:\n      print(\"Medium\")\n  else:\n      print(\"Small\")\n\n- Loops: Repeating actions\n  for i in range(5):\n      print(i)\n\n**Key Features:**\n- Interpreted (no compilation)\n- Dynamic typing\n- Extensive libraries (NumPy, Pandas, TensorFlow)\n- Cross-platform\n\n**Common Uses:**\n- Web Development (Django, Flask)\n- Data Science and ML\n- Automation and Scripting"
  },
  {
    keywords: ['data structure', 'array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash'],
    topic: 'Data Structures',
    explanation: "Data structures are ways of organizing and storing data for efficient access and modification.\n\n**Linear Structures:**\n- Array: Fixed-size, indexed elements\n- Linked List: Nodes with pointers\n- Stack: LIFO (Last In, First Out)\n- Queue: FIFO (First In, First Out)\n\n**Hierarchical Structures:**\n- Binary Tree: Each node has up to 2 children\n- Binary Search Tree: Sorted tree for fast lookup\n- Heap: Complete binary tree for priority queue\n\n**Hash-based:**\n- Hash Table: Key-value pairs with O(1) average lookup\n- Hash Functions: Map keys to array indices\n\n**Graphs:**\n- Directed/Undirected: Edges with/without direction\n- Weighted: Edges with costs\n- Representations: Adjacency matrix or list\n\n**Time Complexity (Big O):**\n- Array access: O(1)\n- Search: O(n) to O(log n) with BST\n- Insert/Delete: O(n) to O(1) with hash table"
  },
  {
    keywords: ['machine learning', 'ml', 'supervised', 'unsupervised', 'classification', 'regression'],
    topic: 'Machine Learning',
    explanation: "Machine Learning is a subset of AI that enables systems to learn and improve from experience without explicit programming.\n\n**Main Types:**\n\n1. **Supervised Learning** (labeled data)\n   - Classification: Predicting categories (spam/not spam)\n   - Regression: Predicting continuous values (price prediction)\n\n2. **Unsupervised Learning** (unlabeled data)\n   - Clustering: Grouping similar items\n   - Dimensionality Reduction: Reducing features\n\n3. **Reinforcement Learning**\n   - Agent learns through rewards/penalties\n   - Used in games, robotics\n\n**Common Algorithms:**\n- Linear/Logistic Regression\n- Decision Trees and Random Forests\n- Support Vector Machines (SVM)\n- K-Nearest Neighbors\n- Neural Networks and Deep Learning\n\n**Process:**\n1. Collect and clean data\n2. Split into train/test sets\n3. Choose and train model\n4. Evaluate performance\n5. Tune hyperparameters\n6. Deploy and monitor"
  },
  {
    keywords: ['web development', 'html', 'css', 'javascript', 'frontend', 'backend', 'react'],
    topic: 'Web Development',
    explanation: "Web development involves creating websites and applications for the internet.\n\n**Three Core Technologies:**\n\n1. **HTML** (Structure)\n   - Headings, paragraphs, lists\n   - Links and images\n   - Forms and inputs\n   - Semantic elements (header, nav, article)\n\n2. **CSS** (Style)\n   - Selectors and properties\n   - Flexbox and Grid layouts\n   - Animations and transitions\n   - Responsive design (media queries)\n\n3. **JavaScript** (Behavior)\n   - Variables, functions, objects\n   - DOM manipulation\n   - Event handling\n   - Fetch API for data\n\n**Modern Frameworks:**\n- React, Vue, Angular (Frontend)\n- Node.js, Express (Backend)\n- MongoDB, PostgreSQL (Database)\n\n**Development Process:**\n1. Planning and design\n2. Frontend development\n3. Backend development\n4. Testing and debugging\n5. Deployment"
  },
  {
    keywords: ['calculus', 'derivative', 'integral', 'limit', 'differentiation', 'integration'],
    topic: 'Calculus',
    explanation: "Calculus is the mathematical study of continuous change, consisting of derivatives and integrals.\n\n**Key Concepts:**\n\n1. **Limits**\n   - The value a function approaches\n   - Foundation of calculus\n   - f(x) as x approaches a\n\n2. **Derivatives** (Differential Calculus)\n   - Rate of change\n   - Slope of tangent line\n   - Rules: Power, Product, Quotient, Chain\n   \n   Basic Rules:\n   - d/dx(x^n) = nx^(n-1)\n   - d/dx(sin x) = cos x\n   - d/dx(e^x) = e^x\n\n3. **Integrals** (Integral Calculus)\n   - Area under curve\n   - Antiderivative\n   - Definite and Indefinite integrals\n   \n   Fundamental Theorem:\n   Integral of f(x)dx = F(x) + C\n\n**Applications:**\n- Physics (velocity, acceleration)\n- Economics (marginal cost)\n- Engineering (signal processing)\n- Machine Learning (optimization)"
  },
  {
    keywords: ['algebra', 'equation', 'polynomial', 'quadratic', 'linear', 'variable'],
    topic: 'Algebra',
    explanation: "Algebra is the branch of mathematics dealing with symbols and rules for manipulating those symbols.\n\n**Fundamentals:**\n\n1. **Variables and Expressions**\n   - x, y, z represent unknown values\n   - 2x + 5 = 15 (linear equation)\n\n2. **Equations**\n   - Linear: ax + b = c\n   - Quadratic: ax^2 + bx + c = 0\n   - Solution methods: factoring, quadratic formula\n\n3. **Polynomials**\n   - Terms: coefficients times variables raised to powers\n   - Degree: highest power\n   - Operations: add, subtract, multiply, divide\n\n4. **Factoring**\n   - GCF: greatest common factor\n   - Difference of squares: a^2 - b^2 = (a+b)(a-b)\n   - Trinomials: (x+a)(x+b)\n\n**Key Formulas:**\n- (a+b)^2 = a^2 + 2ab + b^2\n- (a-b)^2 = a^2 - 2ab + b^2\n- a^2 - b^2 = (a+b)(a-b)\n- Quadratic Formula: x = (-b +/- sqrt(b^2-4ac)) / 2a"
  },
  {
    keywords: ['physics', 'mechanics', 'newton', 'force', 'motion', 'velocity', 'acceleration'],
    topic: 'Physics - Mechanics',
    explanation: "Mechanics is the branch of physics dealing with motion and forces.\n\n**Core Concepts:**\n\n1. **Kinematics** (Motion)\n   - Displacement (Delta x)\n   - Velocity (v = Delta x/Delta t)\n   - Acceleration (a = Delta v/Delta t)\n   - Equations of motion:\n     - v = v0 + at\n     - x = x0 + v0t + 1/2at^2\n     - v^2 = v0^2 + 2a Delta x\n\n2. **Dynamics** (Forces)\n   - Newton's Laws:\n     1. Inertia: object at rest stays at rest\n     2. F = ma (force = mass times acceleration)\n     3. Action-reaction pairs\n   - Friction: f = mu N\n   - Gravity: F = Gm1m2/r^2\n\n3. **Energy and Work**\n   - Work: W = Fd cos(theta)\n   - Kinetic Energy: KE = 1/2mv^2\n   - Potential Energy: PE = mgh\n   - Conservation of Energy\n\n4. **Momentum**\n   - p = mv\n   - Conservation of momentum\n   - Impulse: J = Delta p = F Delta t"
  },
  {
    keywords: ['biology', 'cell', 'dna', 'rna', 'protein', 'gene', 'genetics'],
    topic: 'Biology - Cell and Genetics',
    explanation: "Biology is the study of living organisms, from cells to ecosystems.\n\n**Cell Biology:**\n\n1. **Cell Structure**\n   - Prokaryotic: no nucleus (bacteria)\n   - Eukaryotic: nucleus plus organelles\n   - Key organelles: mitochondria, ribosomes, ER\n\n2. **Cell Division**\n   - Mitosis: identical daughter cells\n   - Meiosis: gametes (half chromosomes)\n\n3. **DNA and RNA**\n   - DNA: double helix, genetic blueprint\n   - RNA: messenger, transfer, ribosomal\n   - Base pairing: A-T, G-C\n\n**Genetics:**\n\n1. **Inheritance**\n   - Genes: units of heredity\n   - Alleles: gene variants\n   - Dominant vs Recessive\n   - Punnett Square: predicts offspring\n\n2. **DNA Replication**\n   - Semi-conservative process\n   - Enzymes: helicase, polymerase\n\n3. **Protein Synthesis**\n   - Transcription: DNA to mRNA\n   - Translation: mRNA to Protein\n   - Codons: 3 bases = 1 amino acid\n\n4. **Mutations**\n   - Changes in DNA sequence\n   - Types: substitution, insertion, deletion\n   - Can be beneficial, neutral, or harmful"
  },
  {
    keywords: ['chemistry', 'atom', 'molecule', 'bond', 'reaction', 'periodic'],
    topic: 'Chemistry - Atoms and Bonds',
    explanation: "Chemistry studies matter, its properties, composition, structure, and changes.\n\n**Atomic Structure:**\n\n1. **Subatomic Particles**\n   - Protons: positive charge, defines element\n   - Neutrons: no charge, mass\n   - Electrons: negative, in orbitals\n\n2. **Electron Configuration**\n   - Shells (energy levels)\n   - Orbital types: s, p, d, f\n   - Octet rule: 8 electrons = stable\n\n**Chemical Bonds:**\n\n1. **Ionic Bonds**\n   - Metal plus Non-metal\n   - Electron transfer\n   - Example: NaCl (table salt)\n\n2. **Covalent Bonds**\n   - Non-metals share electrons\n   - Single, double, triple bonds\n   - Example: H2O (water)\n\n3. **Metallic Bonds**\n   - Metal atoms share electrons\n   - Conducts electricity\n\n**Periodic Table:**\n- Groups (columns): similar properties\n- Periods (rows): energy levels\n- Key groups: Alkali, Halogens, Noble gases\n\n**Chemical Reactions:**\n- Reactants to Products\n- Types: synthesis, decomposition, single/double replacement\n- Balancing equations: mass conservation"
  },
  {
    keywords: ['database', 'sql', 'query', 'table', 'record', 'schema', 'relational'],
    topic: 'Databases and SQL',
    explanation: "Databases are organized collections of data stored electronically.\n\n**Relational Databases:**\n\n1. **Structure**\n   - Tables (relations)\n   - Rows (records/tuples)\n   - Columns (attributes/fields)\n   - Primary Key: unique identifier\n   - Foreign Key: links tables\n\n2. **SQL** (Structured Query Language)\n   \n   Basic Commands:\n   - SELECT name, age FROM users WHERE age > 18\n   - INSERT INTO users (name, email) VALUES ('John', 'j@email.com')\n   - UPDATE users SET age = 20 WHERE id = 1\n   - DELETE FROM users WHERE id = 1\n   \n   Joins:\n   - INNER: matching records\n   - LEFT: all left plus matching right\n   - RIGHT: all right plus matching left\n\n3. **Key Concepts**\n   - Indexes: speed up queries\n   - Normalization: reduce redundancy\n   - Transactions: ACID properties\n   - Views: virtual tables\n\n**NoSQL Databases:**\n- Document: JSON-like (MongoDB)\n- Key-Value: Redis\n- Column: Cassandra\n- Graph: Neo4j"
  },
  {
    keywords: ['api', 'rest', 'endpoint', 'http', 'request', 'json', 'crud'],
    topic: 'REST APIs',
    explanation: "APIs (Application Programming Interfaces) allow software to communicate.\n\n**REST** (Representational State Transfer):\n\n1. **HTTP Methods**\n   - GET: Retrieve data\n   - POST: Create new data\n   - PUT/PATCH: Update data\n   - DELETE: Remove data\n\n2. **URL Structure**\n   https://api.example.com/users/123\n   - Base URL: https://api.example.com\n   - Endpoint: /users/:id\n   - Query params: ?page=1&limit=10\n\n3. **Status Codes**\n   - 200: Success\n   - 201: Created\n   - 400: Bad Request\n   - 401: Unauthorized\n   - 404: Not Found\n   - 500: Server Error\n\n4. **Request/Response Format**\n   Request:\n   POST /users\n   { \"name\": \"John\", \"email\": \"j@email.com\" }\n   \n   Response:\n   { \"id\": 1, \"name\": \"John\", \"email\": \"j@email.com\" }\n\n**Best Practices:**\n- Use nouns for endpoints\n- Version your API (/v1/)\n- Return appropriate status codes\n- Document your API"
  },
  {
    keywords: ['git', 'version control', 'commit', 'branch', 'merge', 'github'],
    topic: 'Git and Version Control',
    explanation: "Git is a distributed version control system for tracking code changes.\n\n**Basic Concepts:**\n\n1. **Repository**\n   - Project folder with Git tracking\n   - Local and remote versions\n\n2. **Key Commands**\n   - git init - Initialize repo\n   - git clone url - Copy remote repo\n   - git status - Check changes\n   - git add file - Stage changes\n   - git commit -m \"msg\" - Save changes\n   - git push - Upload to remote\n   - git pull - Download from remote\n\n3. **Branching**\n   - git branch - List branches\n   - git branch name - Create branch\n   - git checkout branch - Switch branch\n   - git merge branch - Combine branches\n\n4. **Workflows**\n   - Feature branch: work on features separately\n   - Pull requests: propose changes\n   - Code review: discuss before merge\n\n**GitHub Features:**\n- Issues: Track bugs/tasks\n- Pull Requests: Code review\n- Actions: CI/CD automation\n- Projects: Kanban boards"
  },
  {
    keywords: ['agile', 'scrum', 'sprint', 'standup', 'kanban', 'project management'],
    topic: 'Agile and Project Management',
    explanation: "Agile is an iterative approach to project management and software development.\n\n**Agile Principles:**\n1. Customer satisfaction through early delivery\n2. Welcome changing requirements\n3. Deliver working software frequently\n4. Business and developers work together daily\n5. Build projects around motivated individuals\n6. Face-to-face conversation\n7. Working software is primary measure\n8. Sustainable development\n9. Continuous attention to technical excellence\n10. Simplicity: maximize work not done\n\n**Scrum Framework:**\n\n1. **Roles**\n   - Product Owner: defines features\n   - Scrum Master: facilitates process\n   - Development Team: builds software\n\n2. **Events**\n   - Sprint: 2-4 week cycle\n   - Daily Standup: 15 min daily\n   - Sprint Review: demo work\n   - Retrospective: improve process\n\n3. **Artifacts**\n   - Product Backlog: all features\n   - Sprint Backlog: current work\n   - Increment: deliverable product\n\n**Kanban:**\n- Visual workflow\n- Limit work in progress\n- Continuous delivery\n- Cards plus Columns plus Limits"
  },
];

// Knowledge base for AI Study Assistant
export const getAIResponse = (question: string): string => {
  const questionLower = question.toLowerCase();
  
  // Find matching topic
  for (const entry of knowledgeBase) {
    const hasKeyword = entry.keywords.some(keyword => 
      questionLower.includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      return entry.explanation;
    }
  }
  
  // Default response for unknown topics
  return "This topic will be covered in upcoming lessons. For now, try exploring related topics in your course materials or check the learning resources section.";
};

// Quiz Generator from study notes
export const generateQuizFromNotes = (notes: string): string[] => {
  const sentences = notes.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const questions: string[] = [];
  
  // Keywords that indicate important concepts
  const conceptIndicators = [
    'is a', 'are', 'refers to', 'means', 'involves', 'describes',
    'process of', 'type of', 'method of', 'way to', 'used for',
    'important', 'key', 'main', 'primary', 'essential'
  ];
  
  const whatIndicators = ['what', 'which', 'who', 'where', 'when', 'why', 'how'];
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length < 30) continue;
    
    // Check if sentence contains a definition or explanation
    const hasConcept = conceptIndicators.some(indicator => 
      trimmed.toLowerCase().includes(indicator)
    );
    
    if (hasConcept) {
      // Extract the key subject from the sentence
      const words = trimmed.split(/\s+/);
      
      // Try to find a noun phrase at the beginning
      let questionStart = '';
      for (let i = 0; i < Math.min(5, words.length); i++) {
        if (words[i].length > 3 && !['that', 'which', 'this', 'these', 'those'].includes(words[i].toLowerCase())) {
          questionStart = words.slice(0, i + 1).join(' ');
          break;
        }
      }
      
      if (questionStart) {
        // Generate a question
        const whatQuestion = whatIndicators[Math.floor(Math.random() * 3)];
        questions.push(whatQuestion.charAt(0).toUpperCase() + whatQuestion.slice(1) + " is " + questionStart.toLowerCase() + "?");
      }
    }
    
    // Stop if we have enough questions
    if (questions.length >= 5) break;
  }
  
  // If we don't have enough, create basic fill-in-the-blank questions
  if (questions.length < 3) {
    const keyTerms = extractKeyTerms(notes);
    keyTerms.forEach(term => {
      if (questions.length < 5) {
        questions.push("What is " + term + "?");
      }
    });
  }
  
  // Return unique questions
  return [...new Set(questions)].slice(0, 5);
};

// Helper to extract key terms from text
const extractKeyTerms = (text: string): string[] => {
  const words = text.split(/\s+/);
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'of', 'in', 'to', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once', 'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'also', 'now', 'here', 'there', 'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'when', 'where', 'why', 'how']);
  
  const termCounts: Record<string, number> = {};
  
  words.forEach((word, index) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (cleanWord.length > 4 && !stopWords.has(cleanWord)) {
      // Check if next word exists to form a phrase
      const nextWord = words[index + 1]?.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (nextWord && nextWord.length > 3 && !stopWords.has(nextWord)) {
        const phrase = cleanWord + " " + nextWord;
        termCounts[phrase] = (termCounts[phrase] || 0) + 1;
      }
    }
  });
  
  return Object.entries(termCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term]) => term);
};

// Assignment Feedback Generator
export interface AssignmentFeedback {
  feedback: string[];
  score: number;
  suggestions: string[];
}

export const generateAssignmentFeedback = (content: string): AssignmentFeedback => {
  const feedback: string[] = [];
  const suggestions: string[] = [];
  let score = 0;
  
  // Word count analysis
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  if (wordCount < 50) {
    feedback.push("Your answer seems quite short.");
    suggestions.push("Try adding more detail to strengthen your response.");
  } else if (wordCount < 150) {
    feedback.push("Your answer has a moderate length.");
    score += 30;
  } else if (wordCount < 300) {
    feedback.push("Your answer is detailed.");
    score += 50;
  } else {
    feedback.push("Your answer is very comprehensive!");
    score += 70;
  }
  
  // Sentence structure analysis
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);
  
  if (avgWordsPerSentence > 25) {
    feedback.push("Some sentences are quite long.");
    suggestions.push("Try breaking longer sentences into shorter ones for better clarity.");
  } else {
    feedback.push("Good sentence structure.");
    score += 10;
  }
  
  // Repeated words analysis
  const wordFrequency: Record<string, number> = {};
  const cleanedWords = words.map(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase());
  
  cleanedWords.forEach(word => {
    if (word.length > 3) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  // Find words repeated more than 5 times
  const repeatedWords = Object.entries(wordFrequency)
    .filter(([_, count]) => count > 5)
    .map(([word]) => word);
  
  if (repeatedWords.length > 0) {
    feedback.push("Consider varying your vocabulary. Words like \"" + repeatedWords.slice(0, 3).join(', ') + "\" appear frequently.");
  } else {
    score += 10;
  }
  
  // Check for key elements
  const contentLower = content.toLowerCase();
  const hasIntroduction = contentLower.includes('introduction') || contentLower.includes('first') || contentLower.includes('main');
  const hasConclusion = contentLower.includes('conclusion') || contentLower.includes('finally') || contentLower.includes('summary');
  
  if (hasIntroduction && hasConclusion) {
    feedback.push("Good structure with introduction and conclusion.");
    score += 10;
  } else if (hasIntroduction || hasConclusion) {
    suggestions.push("Consider adding both an introduction and conclusion for better structure.");
  }
  
  // Check for examples
  const hasExamples = contentLower.includes('example') || contentLower.includes('for instance') || contentLower.includes('such as');
  if (hasExamples) {
    feedback.push("Good use of examples to support your points.");
    score += 10;
  } else {
    suggestions.push("Adding specific examples would strengthen your answer.");
  }
  
  // Ensure score doesn't exceed 100
  score = Math.min(score, 100);
  
  return {
    feedback,
    score,
    suggestions,
  };
};

// Learning Path Templates
export interface LearningPathTemplate {
  subject: string;
  skillLevel: string;
  path: {
    week: number;
    title: string;
    topics: string[];
    estimatedHours: number;
  }[];
}

export const learningPathTemplates: LearningPathTemplate[] = [
  // Data Science Paths
  {
    subject: 'Data Science',
    skillLevel: 'beginner',
    path: [
      { week: 1, title: 'Python Fundamentals', topics: ['Variables and Data Types', 'Basic Operators', 'String Manipulation', 'Input and Output'], estimatedHours: 10 },
      { week: 2, title: 'Data Structures', topics: ['Lists', 'Dictionaries', 'Tuples', 'Sets'], estimatedHours: 12 },
      { week: 3, title: 'Control Flow', topics: ['If Statements', 'Loops', 'Functions', 'Scope'], estimatedHours: 10 },
      { week: 4, title: 'Introduction to NumPy', topics: ['NumPy Arrays', 'Array Operations', 'Broadcasting', 'Practice Problems'], estimatedHours: 15 },
      { week: 5, title: 'Data Analysis with Pandas', topics: ['DataFrames', 'Data Cleaning', 'Data Visualization Basics', 'Mini Project'], estimatedHours: 18 },
      { week: 6, title: 'Statistics Fundamentals', topics: ['Descriptive Statistics', 'Probability Basics', 'Distributions', 'Hypothesis Testing'], estimatedHours: 15 },
      { week: 7, title: 'Data Visualization', topics: ['Matplotlib', 'Seaborn', 'Interactive Charts', 'Storytelling with Data'], estimatedHours: 12 },
      { week: 8, title: 'Machine Learning Intro', topics: ['What is ML?', 'Linear Regression', 'Classification', 'Model Evaluation'], estimatedHours: 15 },
    ],
  },
  {
    subject: 'Data Science',
    skillLevel: 'intermediate',
    path: [
      { week: 1, title: 'Advanced Python', topics: ['List Comprehensions', 'Generators', 'Decorators', 'Context Managers'], estimatedHours: 12 },
      { week: 2, title: 'Feature Engineering', topics: ['Missing Values', 'Encoding', 'Scaling', 'Feature Selection'], estimatedHours: 15 },
      { week: 3, title: 'Supervised Learning', topics: ['Linear Models', 'Decision Trees', 'Random Forests', 'XGBoost'], estimatedHours: 18 },
      { week: 4, title: 'Model Evaluation', topics: ['Cross-Validation', 'Hyperparameter Tuning', 'Metrics', 'Overfitting and Underfitting'], estimatedHours: 15 },
      { week: 5, title: 'Unsupervised Learning', topics: ['K-Means', 'Hierarchical Clustering', 'PCA', 'Anomaly Detection'], estimatedHours: 15 },
      { week: 6, title: 'Deep Learning Basics', topics: ['Neural Networks', 'TensorFlow and Keras', 'CNNs', 'Image Classification'], estimatedHours: 20 },
      { week: 7, title: 'NLP Fundamentals', topics: ['Text Preprocessing', 'Bag of Words', 'TF-IDF', 'Sentiment Analysis'], estimatedHours: 15 },
      { week: 8, title: 'ML Pipeline and Deployment', topics: ['MLflow', 'Model Serving', 'APIs', 'Best Practices'], estimatedHours: 12 },
    ],
  },
  {
    subject: 'Data Science',
    skillLevel: 'advanced',
    path: [
      { week: 1, title: 'Advanced Deep Learning', topics: ['Transformers', 'Attention Mechanisms', 'BERT', 'GPT Models'], estimatedHours: 20 },
      { week: 2, title: 'Computer Vision', topics: ['Object Detection', 'YOLO', 'Segmentation', 'GANs'], estimatedHours: 20 },
      { week: 3, title: 'Advanced NLP', topics: ['LLMs', 'Fine-tuning', 'Question Answering', 'Text Generation'], estimatedHours: 20 },
      { week: 4, title: 'MLOps', topics: ['Docker', 'Kubernetes', 'CI/CD for ML', 'ML Pipelines'], estimatedHours: 18 },
      { week: 5, title: 'Distributed Training', topics: ['GPU Computing', 'Horovod', 'Ray', 'Large Scale ML'], estimatedHours: 18 },
      { week: 6, title: 'Reinforcement Learning', topics: ['Q-Learning', 'DQN', 'Policy Gradients', 'AlphaGo Overview'], estimatedHours: 20 },
      { week: 7, title: 'Research Methods', topics: ['Paper Reading', 'Reproducibility', 'A/B Testing', 'Causal Inference'], estimatedHours: 15 },
      { week: 8, title: 'Capstone Project', topics: ['Problem Definition', 'Solution Design', 'Implementation', 'Presentation'], estimatedHours: 25 },
    ],
  },
  // Web Development Paths
  {
    subject: 'Web Development',
    skillLevel: 'beginner',
    path: [
      { week: 1, title: 'HTML Basics', topics: ['Document Structure', 'Headings and Text', 'Links and Images', 'Lists and Tables'], estimatedHours: 10 },
      { week: 2, title: 'CSS Fundamentals', topics: ['Selectors', 'Box Model', 'Colors and Typography', 'Layout Basics'], estimatedHours: 12 },
      { week: 3, title: 'CSS Layouts', topics: ['Flexbox', 'Grid', 'Positioning', 'Responsive Design'], estimatedHours: 15 },
      { week: 4, title: 'JavaScript Basics', topics: ['Variables', 'Data Types', 'Operators', 'Control Flow'], estimatedHours: 12 },
      { week: 5, title: 'JavaScript Functions', topics: ['Functions', 'Scope', 'Arrays', 'Objects'], estimatedHours: 15 },
      { week: 6, title: 'DOM Manipulation', topics: ['Selecting Elements', 'Event Handling', 'DOM Tree', 'Dynamic Content'], estimatedHours: 15 },
      { week: 7, title: 'Form Handling', topics: ['Form Elements', 'Validation', 'Submission', 'Data Processing'], estimatedHours: 10 },
      { week: 8, title: 'Mini Project', topics: ['Portfolio Website', 'Responsive Design', 'Deployment', 'Code Review'], estimatedHours: 15 },
    ],
  },
  {
    subject: 'Web Development',
    skillLevel: 'intermediate',
    path: [
      { week: 1, title: 'Modern JavaScript', topics: ['ES6 Plus Features', 'Arrow Functions', 'Destructuring', 'Modules'], estimatedHours: 12 },
      { week: 2, title: 'Async JavaScript', topics: ['Promises', 'Async/Await', 'Fetch API', 'Error Handling'], estimatedHours: 15 },
      { week: 3, title: 'React Fundamentals', topics: ['Components', 'JSX', 'Props', 'State'], estimatedHours: 15 },
      { week: 4, title: 'React Hooks', topics: ['useState', 'useEffect', 'useContext', 'Custom Hooks'], estimatedHours: 15 },
      { week: 5, title: 'React Router', topics: ['Routing', 'Dynamic Routes', 'Nested Routes', 'Navigation'], estimatedHours: 10 },
      { week: 6, title: 'State Management', topics: ['Context API', 'Redux Basics', 'Redux Toolkit', 'Async Actions'], estimatedHours: 15 },
      { week: 7, title: 'Backend Integration', topics: ['REST APIs', 'Authentication', 'JWT', 'Error Boundaries'], estimatedHours: 15 },
      { week: 8, title: 'Full Stack Project', topics: ['Project Planning', 'Implementation', 'Testing', 'Deployment'], estimatedHours: 20 },
    ],
  },
  {
    subject: 'Web Development',
    skillLevel: 'advanced',
    path: [
      { week: 1, title: 'Advanced React', topics: ['Server Components', 'Performance Optimization', 'Testing', 'TypeScript'], estimatedHours: 15 },
      { week: 2, title: 'Node.js Deep Dive', topics: ['Event Loop', 'Streams', 'Buffers', 'Performance'], estimatedHours: 15 },
      { week: 3, title: 'Database Design', topics: ['SQL Fundamentals', 'Schema Design', 'Indexing', 'Transactions'], estimatedHours: 15 },
      { week: 4, title: 'Authentication and Security', topics: ['OAuth', 'JWT', 'Sessions', 'Security Best Practices'], estimatedHours: 15 },
      { week: 5, title: 'Microservices', topics: ['Architecture', 'Docker', 'Message Queues', 'API Gateway'], estimatedHours: 18 },
      { week: 6, title: 'Testing and CI/CD', topics: ['Unit Testing', 'Integration Testing', 'GitHub Actions', 'Deployment'], estimatedHours: 15 },
      { week: 7, title: 'Performance', topics: ['Caching', 'CDN', 'Code Splitting', 'Monitoring'], estimatedHours: 12 },
      { week: 8, title: 'Capstone Project', topics: ['Architecture', 'Implementation', 'Scaling', 'Production Deployment'], estimatedHours: 25 },
    ],
  },
  // Machine Learning Paths
  {
    subject: 'Machine Learning',
    skillLevel: 'beginner',
    path: [
      { week: 1, title: 'Math Foundations', topics: ['Linear Algebra', 'Calculus Basics', 'Probability', 'Statistics'], estimatedHours: 15 },
      { week: 2, title: 'Python for ML', topics: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn Intro'], estimatedHours: 18 },
      { week: 3, title: 'Linear Regression', topics: ['Cost Function', 'Gradient Descent', 'Model Evaluation', 'Regularization'], estimatedHours: 15 },
      { week: 4, title: 'Classification', topics: ['Logistic Regression', 'K-Nearest Neighbors', 'Naive Bayes', 'Decision Trees'], estimatedHours: 18 },
      { week: 5, title: 'Model Evaluation', topics: ['Confusion Matrix', 'Precision and Recall', 'F1 Score', 'Cross-Validation'], estimatedHours: 12 },
      { week: 6, title: 'Feature Engineering', topics: ['Missing Data', 'Categorical Encoding', 'Scaling', 'Feature Selection'], estimatedHours: 15 },
      { week: 7, title: 'Ensemble Methods', topics: ['Bagging', 'Random Forests', 'Boosting', 'XGBoost'], estimatedHours: 15 },
      { week: 8, title: 'ML Project', topics: ['Problem Definition', 'Data Analysis', 'Model Building', 'Presentation'], estimatedHours: 18 },
    ],
  },
  {
    subject: 'Machine Learning',
    skillLevel: 'intermediate',
    path: [
      { week: 1, title: 'Neural Networks', topics: ['Perceptrons', 'Activation Functions', 'Backpropagation', 'Architecture'], estimatedHours: 18 },
      { week: 2, title: 'Deep Learning', topics: ['TensorFlow and Keras', 'CNNs', 'Image Classification', 'Transfer Learning'], estimatedHours: 20 },
      { week: 3, title: 'NLP Basics', topics: ['Text Preprocessing', 'Word Embeddings', 'RNNs', 'LSTM'], estimatedHours: 18 },
      { week: 4, title: 'Advanced NLP', topics: ['Attention', 'Transformers', 'BERT', 'GPT'], estimatedHours: 20 },
      { week: 5, title: 'Unsupervised Learning', topics: ['Clustering', 'Dimensionality Reduction', 'Anomaly Detection', 'Recommendation'], estimatedHours: 15 },
      { week: 6, title: 'Reinforcement Learning', topics: ['MDPs', 'Q-Learning', 'Deep Q-Networks', 'Policy Gradients'], estimatedHours: 18 },
      { week: 7, title: 'MLOps', topics: ['Model Deployment', 'Monitoring', 'ML Pipelines', 'Versioning'], estimatedHours: 15 },
      { week: 8, title: 'Capstone Project', topics: ['Research', 'Implementation', 'Optimization', 'Deployment'], estimatedHours: 22 },
    ],
  },
  {
    subject: 'Machine Learning',
    skillLevel: 'advanced',
    path: [
      { week: 1, title: 'Advanced Deep Learning', topics: ['Advanced Architectures', 'GANs', 'VAEs', 'Diffusion Models'], estimatedHours: 20 },
      { week: 2, title: 'Computer Vision', topics: ['Object Detection', 'Segmentation', 'Tracking', '3D Vision'], estimatedHours: 20 },
      { week: 3, title: 'Large Language Models', topics: ['Architecture', 'Fine-tuning', 'Prompt Engineering', 'RLHF'], estimatedHours: 22 },
      { week: 4, title: 'Multimodal Learning', topics: ['Vision-Language Models', 'Audio Processing', 'Cross-Modal', 'Multimodal RAG'], estimatedHours: 18 },
      { week: 5, title: 'Distributed ML', topics: ['GPU Training', 'Data Parallelism', 'Model Parallelism', 'Federated Learning'], estimatedHours: 18 },
      { week: 6, title: 'Research Methods', topics: ['Paper Analysis', 'Reproducibility', 'Experimental Design', 'Writing'], estimatedHours: 15 },
      { week: 7, title: 'AI Safety and Ethics', topics: ['Bias and Fairness', 'Interpretability', 'Privacy', 'Alignment'], estimatedHours: 12 },
      { week: 8, title: 'Research Project', topics: ['Literature Review', 'Methodology', 'Experiments', 'Paper Writing'], estimatedHours: 28 },
    ],
  },
  // Mobile Development Paths
  {
    subject: 'Mobile Development',
    skillLevel: 'beginner',
    path: [
      { week: 1, title: 'JavaScript Review', topics: ['ES6 Plus', 'Async/Await', 'Modules', 'DOM'], estimatedHours: 10 },
      { week: 2, title: 'React Native Setup', topics: ['Environment', 'Expo', 'Project Structure', 'Components'], estimatedHours: 12 },
      { week: 3, title: 'Core Components', topics: ['View', 'Text', 'Image', 'Touchable'], estimatedHours: 12 },
      { week: 4, title: 'Styling', topics: ['StyleSheet', 'Flexbox', 'Themes', 'Responsive'], estimatedHours: 12 },
      { week: 5, title: 'Navigation', topics: ['React Navigation', 'Stack', 'Tab', 'Drawer'], estimatedHours: 15 },
      { week: 6, title: 'State and Data', topics: ['useState', 'useEffect', 'AsyncStorage', 'Context'], estimatedHours: 15 },
      { week: 7, title: 'Lists and Forms', topics: ['FlatList', 'SectionList', 'TextInput', 'Forms'], estimatedHours: 12 },
      { week: 8, title: 'First App', topics: ['Planning', 'Implementation', 'Testing', 'Play Store'], estimatedHours: 18 },
    ],
  },
  {
    subject: 'Mobile Development',
    skillLevel: 'intermediate',
    path: [
      { week: 1, title: 'Advanced Navigation', topics: ['Nested Navigation', 'Deep Linking', 'Auth Flow', 'Params'], estimatedHours: 12 },
      { week: 2, title: 'State Management', topics: ['Redux', 'Zustand', 'MobX', 'Selectors'], estimatedHours: 15 },
      { week: 3, title: 'Backend Integration', topics: ['REST APIs', 'GraphQL', 'WebSockets', 'Firebase'], estimatedHours: 18 },
      { week: 4, title: 'Native Modules', topics: ['Native Code', 'Custom Components', 'Performance', 'Bridge'], estimatedHours: 15 },
      { week: 5, title: 'Animations', topics: ['Reanimated', 'Gesture Handler', 'Shared Element', 'Lottie'], estimatedHours: 15 },
      { week: 6, title: 'Maps and Location', topics: ['Google Maps', 'Location API', 'Geocoding', 'Markers'], estimatedHours: 12 },
      { week: 7, title: 'Push Notifications', topics: ['Expo Notifications', 'FCM', 'Local Notifications', 'Badges'], estimatedHours: 10 },
      { week: 8, title: 'App Store', topics: ['App Store Connect', 'Play Console', 'Publishing', 'ASO'], estimatedHours: 12 },
    ],
  },
  {
    subject: 'Mobile Development',
    skillLevel: 'advanced',
    path: [
      { week: 1, title: 'Performance', topics: ['Profiling', 'Optimization', 'Memory Management', 'Battery'], estimatedHours: 15 },
      { week: 2, title: 'Testing', topics: ['Jest', 'Testing Library', 'E2E Testing', 'CI/CD'], estimatedHours: 15 },
      { week: 3, title: 'Offline First', topics: ['Realm', 'WatermelonDB', 'Sync', 'Conflict Resolution'], estimatedHours: 15 },
      { week: 4, title: 'Advanced Graphics', topics: ['Skia', 'Custom Drawing', 'AR/VR', 'Games'], estimatedHours: 18 },
      { week: 5, title: 'Security', topics: ['Encryption', 'Biometrics', 'Secure Storage', 'SSL Pinning'], estimatedHours: 12 },
      { week: 6, title: 'Monetization', topics: ['In-App Purchases', 'Ads', 'Subscriptions', 'Analytics'], estimatedHours: 12 },
      { week: 7, title: 'Architecture', topics: ['Clean Architecture', 'DDD', 'TDD', 'Code Generation'], estimatedHours: 15 },
      { week: 8, title: 'Enterprise App', topics: ['Architecture', 'Implementation', 'Security', 'Enterprise Store'], estimatedHours: 22 },
    ],
  },
  // Programming Basics Paths
  {
    subject: 'Programming Basics',
    skillLevel: 'beginner',
    path: [
      { week: 1, title: 'Introduction', topics: ['What is Programming?', 'How Computers Work', 'Setting Up', 'First Program'], estimatedHours: 8 },
      { week: 2, title: 'Variables and Data', topics: ['Variables', 'Data Types', 'Operators', 'Input and Output'], estimatedHours: 10 },
      { week: 3, title: 'Control Flow', topics: ['If/Else', 'Loops', 'Switch', 'Logical Operators'], estimatedHours: 12 },
      { week: 4, title: 'Functions', topics: ['Defining Functions', 'Parameters', 'Return Values', 'Scope'], estimatedHours: 12 },
      { week: 5, title: 'Data Structures', topics: ['Arrays', 'Lists', 'Dictionaries', 'Sets'], estimatedHours: 15 },
      { week: 6, title: 'Strings', topics: ['String Operations', 'Formatting', 'Searching', 'Parsing'], estimatedHours: 10 },
      { week: 7, title: 'File Handling', topics: ['Reading Files', 'Writing Files', 'JSON', 'CSV'], estimatedHours: 10 },
      { week: 8, title: 'Project', topics: ['Planning', 'Implementation', 'Debugging', 'Presentation'], estimatedHours: 15 },
    ],
  },
  {
    subject: 'Programming Basics',
    skillLevel: 'intermediate',
    path: [
      { week: 1, title: 'OOP Basics', topics: ['Classes', 'Objects', 'Methods', 'Constructors'], estimatedHours: 12 },
      { week: 2, title: 'OOP Principles', topics: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], estimatedHours: 15 },
      { week: 3, title: 'Error Handling', topics: ['Exceptions', 'Try/Catch', 'Custom Errors', 'Debugging'], estimatedHours: 12 },
      { week: 4, title: 'Testing', topics: ['Unit Tests', 'Test Driven Development', 'Assertions', 'Coverage'], estimatedHours: 15 },
      { week: 5, title: 'Git and Version Control', topics: ['Commits', 'Branches', 'Merging', 'GitHub'], estimatedHours: 12 },
      { week: 6, title: 'Modules and Packages', topics: ['Import/Export', 'Virtual Environments', 'pip/npm', 'Dependencies'], estimatedHours: 10 },
      { week: 7, title: 'APIs', topics: ['What is an API?', 'HTTP Requests', 'JSON', 'REST'], estimatedHours: 12 },
      { week: 8, title: 'Final Project', topics: ['Full Application', 'Testing', 'Documentation', 'Deployment'], estimatedHours: 18 },
    ],
  },
  {
    subject: 'Programming Basics',
    skillLevel: 'advanced',
    path: [
      { week: 1, title: 'Design Patterns', topics: ['Singleton', 'Factory', 'Observer', 'Strategy'], estimatedHours: 15 },
      { week: 2, title: 'Algorithms', topics: ['Sorting', 'Searching', 'Recursion', 'Complexity'], estimatedHours: 18 },
      { week: 3, title: 'Data Structures', topics: ['Linked Lists', 'Trees', 'Graphs', 'Hash Tables'], estimatedHours: 18 },
      { week: 4, title: 'Functional Programming', topics: ['Lambda', 'Map/Filter/Reduce', 'Immutability', 'Currying'], estimatedHours: 15 },
      { week: 5, title: 'Concurrency', topics: ['Threads', 'Async/Await', 'Promises', 'Parallel Processing'], estimatedHours: 15 },
      { week: 6, title: 'Databases', topics: ['SQL', 'NoSQL', 'ORMs', 'Transactions'], estimatedHours: 15 },
      { week: 7, title: 'Security', topics: ['OWASP', 'Authentication', 'Encryption', 'Best Practices'], estimatedHours: 12 },
      { week: 8, title: 'Capstone', topics: ['Architecture', 'Implementation', 'Testing', 'Production'], estimatedHours: 22 },
    ],
  },
];

export const generateLearningPath = (
  subject: string,
  skillLevel: string,
  goal: string
): { week: number; title: string; topics: string[]; estimatedHours: number }[] => {
  // Find matching template
  const template = learningPathTemplates.find(
    t => t.subject.toLowerCase() === subject.toLowerCase() && 
         t.skillLevel.toLowerCase() === skillLevel.toLowerCase()
  );
  
  if (template) {
    return template.path;
  }
  
  // Default fallback
  return [
    { week: 1, title: 'Getting Started', topics: ['Introduction to ' + subject, 'Setting Up Environment', 'Basic Concepts', 'First Project'], estimatedHours: 10 },
    { week: 2, title: 'Core Concepts', topics: ['Fundamentals', 'Data Types', 'Control Flow', 'Functions'], estimatedHours: 12 },
    { week: 3, title: 'Building Blocks', topics: ['Data Structures', 'Object-Oriented Programming', 'Error Handling', 'Testing'], estimatedHours: 15 },
    { week: 4, title: 'Advanced Topics', topics: ['Design Patterns', 'Best Practices', 'Performance', 'Security'], estimatedHours: 15 },
  ];
};