export const questions = [
  {
    id: 1,
    axis: 'x',
    text: "On a typical workday, how often do AI tools play a role in what you produce?",
    quote: null,
    options: [
      { text: "Rarely or never. Most of my work is entirely self-directed", score: -2 },
      { text: "Occasionally, for a few tasks.", score: -1 },
      { text: "Regularly, for a handful of tasks", score: 1 },
      { text: "All the time. AI is embedded in most of how I work", score: 2 },
    ]
  },
  {
    id: 2,
    axis: 'y',
    text: "Researchers found that human minds are \"better than Bayesian\" — capable of intuitive leaps, ethical reasoning, and detecting exceptions that AI simply sums across. Knowing that AI can't replicate human thinking, how does that shape how you decide when to bring AI into your work?",
    quote: { text: "Human minds are better than Bayesian in many ways — our somatic markers enable intuitive leaps that a purely Bayesian approach cannot replicate.", source: "Harvard Gazette / Antonio Damasio" },
    options: [
      { text: "It doesn't really factor in, I just decide based on what's in front of me", score: -2 },
      { text: "It's somewhere in the back of my mind but I haven't formalized it", score: -1 },
      { text: "It reinforces general principles I already try to apply", score: 1 },
      { text: "It's part of why I've built specific criteria for when AI is and isn't appropriate", score: 2 },
    ]
  },
  {
    id: 3,
    axis: 'x',
    text: "When you're working on a DX project such as a UX problem, at what point does AI typically enter your process?",
    quote: null,
    options: [
      { text: "I don't use AI at all, I work through design and content problems without it", score: -2 },
      { text: "At the end I might use it to review, summarize, or clean up", score: -1 },
      { text: "I might use it in the middle of the design process when I hit a specific snag", score: 1 },
      { text: "I incorporate AI into the beginning of my design process, it's part of how I frame and approach the problem", score: 2 },
    ]
  },
  {
    id: 4,
    axis: 'y',
    text: "If a colleague asked why you used or didn't use AI for something you just finished, what would your answer sound like?",
    quote: null,
    options: [
      { text: "I'd say it felt like the right decision in that moment", score: -2 },
      { text: "I'd point to a general intuition I have regarding AI use but not a strict set of rules", score: -1 },
      { text: "I'd reference a set of principles I've developed over time", score: 1 },
      { text: "I'd walk them through the framework I use to make that call", score: 2 },
    ]
  },
  {
    id: 5,
    axis: 'x',
    text: "Across the projects you've worked on in the last month, how deeply has AI been involved in what you've produced?",
    quote: null,
    options: [
      { text: "None, I completed all my work without the use of AI", score: -2 },
      { text: "Minor, I used AI here and there for some small tasks", score: -1 },
      { text: "Meaningful, AI contributed to several things I worked on", score: 1 },
      { text: "Central, I used AI on most of what I worked on", score: 2 },
    ]
  },
  {
    id: 6,
    axis: 'y',
    text: "Our team is preparing to launch a new page on the Library Website. Someone suggests using an AI tool to speed up a key part of the build. What's your instinct?",
    quote: null,
    options: [
      { text: "I'd just start working right away and see what happens, I'll figure out if it works as I go", score: -2 },
      { text: "I'd be open to trying the AI tool and see if it feels appropriate to me", score: -1 },
      { text: "I'd weigh the use of AI against my principles that I already have about AI in my work", score: 1 },
      { text: "I'd walk through the AI usage using my personal framework, I have clear criteria for decisions like this", score: 2 },
    ]
  },
  {
    id: 7,
    axis: 'x',
    text: "How do you feel when AI tools aren't available for a task you're working on?",
    quote: null,
    options: [
      { text: "Indifferent", score: -2 },
      { text: "Mildly inconvenienced for certain tasks", score: -1 },
      { text: "Noticeably slowed down, I'd have to rework my approach", score: 1 },
      { text: "Significantly disrupted, AI is load-bearing in my workflow", score: 2 },
    ]
  },
  {
    id: 8,
    axis: 'y',
    text: "Academic library staff report a wide range of comfort levels with AI, alongside shared concerns about ethics and privacy. As someone on the DX team, where we have influence over how the library adopts technology, how defined is your personal ethical framework for AI use?",
    quote: { text: "Library professionals have concerns about AI including but not limited to ethics, privacy, and training.", source: "Tips and Trends: AI Developments and Resources for Academic Librarians" },
    options: [
      { text: "I'm still forming my framework, I haven't landed anywhere firm yet", score: -2 },
      { text: "I have some thoughts about AI and these values but I don't have a fleshed-out perspective", score: -1 },
      { text: "I have a clear personal stance on AI ethics, even if it's not written down", score: 1 },
      { text: "I have an articulated, documented position I can explain and defend", score: 2 },
    ]
  },
  {
    id: 9,
    axis: 'x',
    text: "You're redesigning a section of the library website. This includes new information architecture, updated copy, and a fresh visual direction. Which best describes your approach?",
    quote: null,
    options: [
      { text: "I'd work through all of it myself. All the research, writing, and design decisions are mine to make", score: -2 },
      { text: "I'd do most of it myself but might use AI to pressure-test an idea or unstick a specific problem", score: -1 },
      { text: "I'd bring AI in at several stages, maybe to explore IA options in the landscape review, draft/revise copy, or generate visual concepts alongside my own", score: 1 },
      { text: "AI would be involved throughout the entire design process from initial research and structure to copy and validating designs", score: 2 },
    ]
  },
  {
    id: 10,
    axis: 'y',
    text: "\"With the right priorities and guardrails, AI can help advance science, cure diseases, build new industries, and maintain human dignity.\" How close are you to having your own version of those guardrails defined?",
    quote: { text: "With the right priorities and guardrails, AI can help advance science, cure diseases, build new industries, expand joy, and maintain human dignity.", source: "The Case Against AI Everything, Everywhere, All at Once — TIME" },
    options: [
      { text: "I haven't really created any guidelines, I respond to AI as situations come up", score: -2 },
      { text: "I have some instincts but nothing I'd call guardrails yet", score: -1 },
      { text: "I have working principles I apply, even if they're not written down", score: 1 },
      { text: "I have a clear, documented personal framework I actively use", score: 2 },
    ]
  },
  {
    id: 11,
    axis: 'x',
    text: "When you're writing, whether that's documentation, UX copy, a proposal, or an email, what does your AI use look like?",
    quote: null,
    options: [
      { text: "I write everything myself. AI doesn't play a role at all", score: -2 },
      { text: "I occasionally use it to polish or check something I've already written", score: -1 },
      { text: "I use it to draft, iterate, or think through structure alongside my own writing", score: 1 },
      { text: "It's a core part of my writing process. Most of my written work involves AI at some stage", score: 2 },
    ]
  },
  {
    id: 12,
    axis: 'y',
    text: "How do you stay current on AI developments relevant to your work?",
    quote: null,
    options: [
      { text: "I pick things up passively through articles, conversations, and things that cross my path naturally", score: -2 },
      { text: "I follow along informally. I pay attention when something seems relevant but I'm not deliberate about it", score: -1 },
      { text: "I have a general approach. I have specific sources or people I return to when I want to stay informed", score: 1 },
      { text: "I've identified how I keep up to date with the latest AI developments", score: 2 },
    ]
  },
  {
    id: 13,
    axis: 'x',
    text: "Think about how you approach a problem you haven't solved before such as a new technical challenge, an unfamiliar design pattern, a tricky content decision. What role does AI play in that process?",
    quote: null,
    options: [
      { text: "I research and work through it myself. AI isn't part of my exploration process", score: -2 },
      { text: "I might check AI after I've already formed my own approach", score: -1 },
      { text: "I use AI as one of several inputs while I'm actively figuring it out", score: 1 },
      { text: "AI is usually my first move to understand something new, it's how I orient myself on new problems", score: 2 },
    ]
  },
  {
    id: 14,
    axis: 'y',
    text: "When something goes wrong with an AI-assisted task, what do you do differently next time?",
    quote: null,
    options: [
      { text: "I note it mentally and stay more cautious, but I don't change my approach formally", score: -2 },
      { text: "I adjust my instincts and I'm more careful in similar situations going forward", score: -1 },
      { text: "I update the principles I use to guide when and how I use AI", score: 1 },
      { text: "I revise my framework using what went wrong to refine how I use AI", score: 2 },
    ]
  },
];
