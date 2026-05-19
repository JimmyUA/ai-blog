const BLOG_POSTS = [
  {
    id: "autonomous-engineers-rise",
    title: "The Rise of Autonomous Software Engineers: Myth or Reality?",
    summary: "An in-depth analysis of recent AI news surrounding autonomous software engineering agents, evaluating their capabilities, limitations, and the future of human-AI collaboration in development.",
    category: "AI News",
    tags: ["AI Agents", "Coding", "Software Engineering"],
    date: "May 18, 2026",
    readTime: "6 min read",
    coverImage: "assets/autonomous_engineers.png",
    author: {
      name: "Sergii Prykhodko",
      title: "Software Engineer & AI Enthusiast",
      avatar: "assets/avatar.png"
    },
    content: `
      <p>The developer community has been abuzz with announcements of autonomous AI software engineers. These agents promise to go beyond simple autocomplete (like Copilot) to ingest entire codebases, fix complex bugs, run tests, and even deploy web applications independently.</p>
      
      <p>But how close are we actually to true autonomy in software engineering? In this article, we'll dive deep into the current state of autonomous coding agents, separate the marketing hype from real-world capabilities, and discuss what this means for human developers.</p>
      
      <h2>What Makes an Agent "Autonomous"?</h2>
      <p>Unlike traditional LLMs that respond to a single prompt, autonomous agents operate in a feedback loop. A typical software engineering agent includes:</p>
      <ul>
        <li><strong>Planning Engine:</strong> Breaking down a complex user request (e.g., "Add Google OAuth to this Express app") into logical steps.</li>
        <li><strong>Environment Access:</strong> The ability to run commands, edit files, and execute code within a sandboxed terminal.</li>
        <li><strong>Self-Correction:</strong> Parsing compiler errors, linting issues, or failing test suites and rewriting the code to fix them.</li>
        <li><strong>Web Browsing:</strong> Looking up documentation or API references when encountering unfamiliar libraries.</li>
      </ul>
      
      <blockquote>
        "The shift from passive completion tools to goal-oriented autonomous systems represents a major leap in software productivity."
      </blockquote>
      
      <h2>Current State of the Art</h2>
      <p>State-of-the-art benchmarks show that autonomous agents are incredibly proficient at solving medium-difficulty standalone bugs (e.g. issues on GitHub). However, they still face significant challenges when working on large, legacy codebases with minimal documentation. Their primary limitations include:</p>
      <ol>
        <li><strong>Context Window Saturation:</strong> As the codebase grows, it becomes harder for the model to remember all dependencies and subtle architecture rules.</li>
        <li><strong>Hallucinations in Complex Logic:</strong> While syntax is usually correct, deep logical errors in multi-layered microservice environments can still slip through.</li>
        <li><strong>Token Efficiency and Cost:</strong> Running dozens of validation loops can become expensive, sometimes costing more in API tokens than paying a human developer for the equivalent time.</li>
      </ol>
      
      <h2>The Future: Copilots to Autopilots</h2>
      <p>We are not looking at the replacement of software engineers. Instead, we are entering the era of the <strong>Force Multiplier</strong>. Developers who learn to orchestrate, debug, and guide autonomous agents will be able to build products at 10x the speed. The role is shifting from writing syntax to defining architectures, writing comprehensive tests, and reviewing agent-generated pull requests.</p>
      
      <p>In our next post, we will explore exactly how to build one of these agents yourself using lightweight open-source tooling.</p>
    `
  },
  {
    id: "building-multi-agent-frameworks",
    title: "Building with Multi-Agent Frameworks: LangChain vs. CrewAI",
    summary: "A technical evaluation of the leading multi-agent development libraries, showing how to coordinate multiple specialized AI agents to solve complex automation tasks.",
    category: "AI Tooling",
    tags: ["AI Agents", "LangChain", "CrewAI", "Python"],
    date: "May 12, 2026",
    readTime: "8 min read",
    coverImage: "assets/multi_agents.png",
    author: {
      name: "Sergii Prykhodko",
      title: "Software Engineer & AI Enthusiast",
      avatar: "assets/avatar.png"
    },
    content: `
      <p>As developers transition from building single-prompt chatbots to complex workflows, <strong>Multi-Agent Orchestration</strong> has emerged as the leading design pattern. Instead of asking a single LLM to be a researcher, writer, programmer, and editor all at once, we define multiple specialized agents and let them collaborate.</p>
      
      <p>In this post, we compare two of the most popular frameworks for building these systems: <strong>LangChain (LangGraph)</strong> and <strong>CrewAI</strong>.</p>
      
      <h2>Why Multiple Agents?</h2>
      <p>Designing a system with multiple agents follows standard software engineering principles: modularity and separation of concerns. By limiting the scope of each agent (e.g., giving one agent access only to web search and another access only to a local SQLite database), we minimize hallucinations and maximize accuracy.</p>
      
      <h2>CrewAI: Role-Playing Simplicity</h2>
      <p>CrewAI is designed around a clean, intuitive "role-playing" paradigm. You define your agents, their specific tools, and the tasks they need to perform. The framework handles the collaboration process under the hood.</p>
      
      <pre><code>from crewai import Agent, Task, Crew

# Define a researcher agent
researcher = Agent(
    role='Market Analyst',
    goal='Research emerging trends in AI tooling',
    backstory='An expert analyst with a keen eye for tech trends.',
    tools=[search_tool],
    verbose=True
)

# Define tasks and assemble the crew
task = Task(description='Identify top 3 tools in 2026', agent=researcher)
crew = Crew(agents=[researcher], tasks=[task])
result = crew.kickoff()</code></pre>
      
      <h2>LangGraph: State-Based Control</h2>
      <p>While CrewAI is excellent for sequential and hierarchical flows, it can feel restrictive for complex, cyclical processes. This is where <strong>LangGraph</strong> shines. It treats the multi-agent system as a state machine graph. You have nodes (agents or tool executions) and edges (decisions on what node to execute next, often driven by router LLMs).</p>
      
      <h3>Key Differences:</h3>
      <ul>
        <li><strong>Control Flow:</strong> CrewAI is highly opinionated and quick to write. LangGraph offers low-level control, allowing you to define precise loops and conditional state updates.</li>
        <li><strong>Memory Management:</strong> LangGraph has excellent built-in state persistence, making it highly suitable for long-running conversations.</li>
        <li><strong>Learning Curve:</strong> CrewAI can be learned in an afternoon; LangGraph requires a solid understanding of graph theory and State objects.</li>
      </ul>
      
      <h2>Which One Should You Choose?</h2>
      <p>For standard tasks like content generation pipelines, automated email responses, or basic web-scraping agents, <strong>CrewAI</strong> is our recommendation. It gets you up and running with minimal boilerplate.</p>
      
      <p>For custom enterprise workflows where you need to guarantee exact execution paths, manage human-in-the-loop approvals, or build cyclic feedback loops, <strong>LangGraph</strong> is the clear winner.</p>
    `
  },
  {
    id: "tutorial-local-llms-ollama",
    title: "Guide: Running and Tuning Local LLMs with Ollama and Llama 3",
    summary: "Learn how to set up, run, and interact with open-source Large Language Models locally on your machine, saving API costs and ensuring 100% data privacy.",
    category: "Tutorials",
    tags: ["Local LLM", "Ollama", "Llama 3", "Privacy"],
    date: "April 28, 2026",
    readTime: "10 min read",
    coverImage: "assets/local_llms.png",
    author: {
      name: "Sergii Prykhodko",
      title: "Software Engineer & AI Enthusiast",
      avatar: "assets/avatar.png"
    },
    content: `
      <p>Relying on commercial APIs like OpenAI or Anthropic is excellent for prototyping, but it comes with challenges: recurring costs, rate limits, internet dependence, and potential privacy concerns. Running open-source models <strong>locally</strong> solves all of these issues.</p>
      
      <p>In this guide, we will show you how to set up and run state-of-the-art models like Meta's Llama 3 on your own computer using <strong>Ollama</strong>, and how to connect it to your development projects.</p>
      
      <h2>Prerequisites</h2>
      <p>Running LLMs locally requires decent hardware. For optimal performance:</p>
      <ul>
        <li><strong>Apple Silicon Mac (M1/M2/M3):</strong> Highly recommended due to unified memory architecture. 8GB can run 8B models; 16GB+ is ideal for 8B-70B models.</li>
        <li><strong>Windows/Linux:</strong> An NVIDIA GPU with at least 8GB of VRAM (e.g., RTX 3060/4060) is recommended.</li>
      </ul>
      
      <h2>Step 1: Installing Ollama</h2>
      <p>Ollama is a lightweight utility that packages LLM dependencies, weights, and runtimes into a single application. To install it:</p>
      <ol>
        <li>Go to <a href="https://ollama.com" target="_blank">ollama.com</a> and download the installer for your OS.</li>
        <li>Run the installer and complete the setup.</li>
        <li>Open your terminal and run the following command to download and start Llama 3 (8 Billion parameters):</li>
      </ol>
      
      <pre><code>ollama run llama3</code></pre>
      
      <p>Ollama will download the model weights (approx. 4.7 GB) and start an interactive chat session directly in your terminal. You can now prompt the model offline!</p>
      
      <h2>Step 2: Connecting to Ollama via API</h2>
      <p>One of the best features of Ollama is that it runs a local server in the background (typically at <code>http://localhost:11434</code>) exposing a fully OpenAI-compatible REST API. You can query it using simple JavaScript:</p>
      
      <pre><code>const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama3',
    prompt: 'Explain quantum computing in one sentence.',
    stream: false
  })
});
const data = await response.json();
console.log(data.response);</code></pre>
      
      <h2>Step 3: Creating a Custom Model File</h2>
      <p>You can customize the system prompt, temperature, and parameters of any model using a <code>Modelfile</code>, similar to a Dockerfile. Create a file named <code>Modelfile</code>:</p>
      
      <pre><code>FROM llama3

# Set the temperature (higher = more creative, lower = more coherent)
PARAMETER temperature 0.3

# Set the system prompt
SYSTEM """
You are a helpful Senior Software Architect. Answer all technical questions with clean code examples and architectural trade-offs.
"""</code></pre>
      
      <p>Then, build and run your custom model using the terminal:</p>
      <pre><code>ollama create arch-bot -f ./Modelfile
ollama run arch-bot</code></pre>
      
      <h2>Conclusion</h2>
      <p>Running local models is a game changer for developer workflows, automated testing, and secure data processing. With models getting smaller and more efficient, local AI is no longer a compromise—it's a viable production architecture.</p>
    `
  }
];
