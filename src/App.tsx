import React, { useEffect, useMemo, useState } from 'react';
import {
  Menu,
  X,
  Github as GitHub,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import RotatingText from './components/RotatingText';

type FormStatus = 'success' | 'error' | null;

type Project = {
  title: string;
  period: string;
  role?: string;
  status?: string;
  highlights: string[];
  stack: string;
  link: string;
};

type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

const portfolio = {
  brand: 'Jainil.dev',
  fullName: 'Jainil Parekh',
  rotatingRoles: [
    'ML Engineer',
    'AI Developer',
    'Data scientist',
    'Data Analyst',
  ],
  heroSubtitle:
    'I build production-ready AI applications using ML and large language models.',
  heroDescription:
    'Experienced in ML pipelines, LLM-powered systems, and scalable backend APIs.',
  headline: '',
  heroImage: '/profile.png',
  resumeUrl: '#',
  formEndpoint: 'https://formspree.io/f/your-form-id',
  social: {
    github: 'https://github.com/jainil-parekh',
    linkedin: 'https://www.linkedin.com/in/jainil1609/',
    email: 'jainilparekh249@gmail.com',
  },
  about:
    'I am a developer with hands-on experience in both data science and web development. I have worked on production-ready ML pipelines, model deployment workflows, and responsive React interfaces. I enjoy turning complex workflows into clean, scalable systems that are easy to maintain.',
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'TU Darmstadt',
      period: 'Present',
      notes: 'Specialization in Data Science.',
    },
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Add Your Bachelor University',
      period: 'Add Bachelor Dates',
      notes: 'Replace this with your bachelor institution, dates, and any academic highlights.',
    },
  ],
  certifications: [
    {
      title: 'AWS: Introduction to Generative AI',
      issuer: 'AWS / Credly',
      link: 'https://www.credly.com/badges/acda08c7-7a85-4d19-b11a-02d6b54a294e/public_url',
      note: 'Strongest direct signal for your current LLM and AI application positioning.',
    },
    {
      title: 'AWS: Machine Learning Foundations',
      issuer: 'AWS / Credly',
      link: 'https://www.credly.com/badges/862011f6-5e98-4c33-9581-48cf2c8a9a9c/public_url',
      note: 'Relevant cloud ML foundation credential aligned with your engineering portfolio.',
    },
    {
      title: 'IBM: Python for Data Science, AI & Development',
      issuer: 'IBM / Coursera',
      link: 'https://coursera.org/verify/DRCT822DY9YV',
      note: 'Good supporting certificate for Python, AI, and applied data science fundamentals.',
    },
    {
      title: 'AWS Cloud Practitioner Essentials',
      issuer: 'AWS',
      link: 'https://drive.google.com/file/d/1vx6DzLQoSw-YJZKCS9guBsK402_MnnuW/view?usp=sharing',
      note: 'Useful baseline cloud credential that supports deployment and infrastructure awareness.',
    },
    {
      title: 'HackerRank SQL',
      issuer: 'HackerRank / TU Darmstadt',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7277253500068114432/',
      note: 'Top 4 at TU Darmstadt, strong signal for SQL proficiency in a competitive academic setting.',
    },
    {
      title: '5 Star Coder on HackerRank',
      issuer: 'HackerRank',
      link: 'https://www.hackerrank.com/profile/jainilparekh249',
      note: 'Supports your problem-solving and coding fundamentals profile.',
    },
  ],
  skills: [
    {
      category: 'Programming',
      items: ['Python', 'SQL', 'JavaScript', 'C', 'Object-Oriented Programming', 'Data Structures & Algorithms'],
    },
    {
      category: 'ML & AI',
      items: [
        'Scikit-learn',
        'TensorFlow',
        'Keras',
        'OpenCV',
        'CNNs',
        'Feature Engineering',
        'Model Evaluation',
        'Sentence Transformers',
        'Hybrid ML + LLM Systems',
      ],
    },
    {
      category: 'Generative AI',
      items: [
        'LLM Applications',
        'Prompt Engineering',
        'RAG Concepts',
        'Vector Embeddings',
        'Semantic Search',
        'LangChain',
        'ChromaDB',
      ],
    },
    {
      category: 'Data Analysis',
      items: [
        'Pandas',
        'NumPy',
        'Data Cleaning',
        'Exploratory Data Analysis',
        'Data Visualization',
        'Statistical Analysis',
        'Power BI',
        'Excel',
      ],
    },
    {
      category: 'Backend & APIs',
      items: ['FastAPI', 'REST APIs', 'API Design', 'Webhooks', 'Model Deployment'],
    },
    {
      category: 'Web Development',
      items: ['ReactJS', 'HTML', 'CSS', 'Bootstrap', 'Responsive Design'],
    },
    {
      category: 'Tools',
      items: [
        'Git/GitHub',
        'Docker (Basic)',
        'Streamlit',
        'Postman',
        'Jupyter Notebook',
      ],
    },
  ],
  experience: [
    {
      role: 'Data Science Intern',
      company: 'Zummit Infolabs Pvt. Ltd. · Bengaluru, India',
      period: 'March 2024 - August 2024',
      bullets: [
        'Designed and implemented an end-to-end MLOps pipeline for model training, retraining, and deployment.',
        'Built robust data processing pipelines to improve data consistency and model stability.',
        'Deployed machine learning models with inference APIs in a cloud environment and supported performance evaluation and documentation.',
      ],
    },
    {
      role: 'Web Developer Intern',
      company: 'M Square Technologies Pvt. Ltd. · Surat, India',
      period: 'May 2023 - October 2023',
      bullets: [
        'Developed responsive and reusable ReactJS components for production web interfaces.',
        'Implemented interactive UI functionality with React Hooks and improved mobile responsiveness.',
        'Collaborated with designers and developers using Git/GitHub, delivered features on time, and improved usability and performance.',
      ],
    },
  ] as Experience[],
  projects: [
    {
      title: 'Enterprise Log Classification API: A Hybrid ML Pipeline',
      period: '2025',
      role: 'AI/ML Engineer',
      status: 'Deployed & Tested',
      highlights: [
        'Designed a three-tier classification pipeline using regex, semantic ML, and LLM fallback to balance accuracy, cost, and latency.',
        'Built FastAPI endpoints for single-log inference and large asynchronous CSV batches handling 100k+ log records.',
        'Reduced expensive LLM usage by routing routine cases through deterministic rules and local models before escalation.',
      ],
      stack:
        'Python, FastAPI, Uvicorn, Scikit-Learn, SentenceTransformers (all-MiniLM-L6-v2), Groq API (LLaMA-3 70B), Pandas, Pydantic',
      link: 'https://github.com/jainil-parekh/Hybrid-log-classification',
    },
    {
      title: 'AI-Powered B2B Lead Generation Engine',
      period: '2025',
      role: 'AI/ML Developer',
      status: 'Deployed (Local/Prototype)',
      highlights: [
        'Automated the flow from public job posting to qualified B2B lead using scraping, prompt engineering, and LLM generation.',
        'Generated tailored outreach emails by mapping hiring pain points to concrete AI and software consulting solutions.',
        'Wrapped the full workflow in a Streamlit interface for fast input, review, and iteration during sales research.',
      ],
      stack:
        'Python, Streamlit, Web Scraping, LLMs, Prompt Engineering, Context Injection',
      link: '#',
    },
    {
      title: 'Real-Time Drowsiness Detection System',
      period: '2025',
      role: 'Computer Vision / ML Project',
      status: 'Built & Evaluated',
      highlights: [
        'Built a real-time vision pipeline that monitors eye state from webcam input and detects fatigue continuously.',
        'Achieved 91% detection accuracy using a lightweight CNN setup optimized for low-latency inference.',
        'Integrated automatic alerting and live OpenCV processing for a complete end-to-end safety prototype.',
      ],
      stack:
        'Python, TensorFlow, Keras, OpenCV, NumPy, MobileNet CNN',
      link: '#',
    },
    {
      title: 'Food Ordering Chatbot API',
      period: '2025',
      role: 'Backend Engineering Project',
      status: 'Production-Ready Architecture',
      highlights: [
        'Built a FastAPI backend that powers conversational food-ordering flows through Dialogflow webhook integration.',
        'Structured API endpoints for dynamic responses, backend actions, and scalable request handling.',
        'Designed the system as a production-oriented chatbot service rather than a simple demo workflow.',
      ],
      stack:
        'Python, FastAPI, Dialogflow, Uvicorn, REST APIs, Webhooks',
      link: '#',
    },
    {
      title: 'LLM-Powered Entity Matching: Architecture, Scalability, and Strategy Optimization',
      period: 'February - March 2026',
      role: 'Data Engineer / AI Pipeline Architect',
      status: 'TU Darmstadt Reproducibility Study & Pipeline Engineering',
      highlights: [
        'Orchestrated 50,000+ concurrent GPT-5-Mini requests across 8 entity-matching benchmarks under a strict 40M token budget.',
        'Engineered SHA-256 request caching, resilient parsing, and token-scaling safeguards to survive proxy failures and resume cleanly.',
        'Derived strategy insights across pairwise, listwise, and tournament prompting to inform a cost-aware hybrid matching pipeline.',
      ],
      stack:
        'Python, OpenAI API, GPT-5-Mini, Multithreading, SHA-256 Caching, REST APIs, Regex Parsers, JSON Modeling, F1/Precision/Recall Evaluation',
      link: '#',
    },
    {
      title: 'EdTech Course Analytics Dashboard',
      period: '2024',
      role: 'Data Analytics Project',
      status: 'Insights Delivered',
      highlights: [
        'Analyzed course performance, language distribution, instructor effectiveness, and engagement trends from online learning data.',
        'Built interactive dashboards that turned raw education metrics into decision-ready business insights.',
        'Focused the analysis on practical questions such as course popularity, ratings, enrollments, and subtitle impact.',
      ],
      stack: 'Power BI, Python, Pandas, Excel, SQL',
      link: '#',
    },
    {
      title: 'Customer Behavior Data Analysis',
      period: '2025',
      role: 'Data Analytics Project',
      status: 'Completed',
      highlights: [
        'Performed exploratory analysis to uncover customer segments, purchase behavior, and revenue patterns.',
        'Handled missing values, outliers, and correlation analysis to improve the reliability of the final insights.',
        'Translated customer data into business-facing observations that support targeting and decision-making.',
      ],
      stack: 'Python, Pandas, NumPy, Matplotlib, Seaborn',
      link: '#',
    },
  ] as Project[],
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(null);

  const sections = useMemo(() => ['home', 'about', 'projects', 'experience', 'skills', 'education', 'certifications', 'contact'], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 40);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    window.scrollTo({ top: element.offsetTop - 76, behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(portfolio.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Form request failed');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setFormStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-300/30 selection:text-white">
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b border-slate-800 bg-slate-950/95 backdrop-blur' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-bold text-cyan-300 transition hover:text-cyan-200">
              {portfolio.brand}
            </button>

            <div className="hidden items-center gap-8 md:flex">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${activeSection === section ? 'bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30' : 'text-slate-300 hover:bg-slate-800/60 hover:text-cyan-200'}`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen((prev) => !prev)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-800 bg-slate-900 md:hidden">
            <div className="container mx-auto flex flex-col gap-3 px-6 py-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-left text-sm uppercase tracking-wide ${activeSection === section ? 'text-cyan-400' : 'text-slate-200'}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.20),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
        <div className="absolute -left-16 top-20 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
        <div className="absolute -right-12 bottom-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="container relative z-10 mx-auto px-6 pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-4xl reveal-up">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">Portfolio</p>
              <h1 className="text-4xl font-black leading-tight text-white drop-shadow-[0_2px_24px_rgba(34,211,238,0.2)] md:text-6xl">{portfolio.fullName}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-2xl font-semibold md:text-3xl">
                <span className="text-slate-200">I am a</span>
                <RotatingText
                  texts={portfolio.rotatingRoles}
                  auto
                  loop
                  staggerFrom="last"
                  staggerDuration={0.02}
                  rotationInterval={2000}
                  mainClassName="text-cyan-400"
                  splitLevelClassName="overflow-hidden"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                />
              </div>
              <p className="mt-4 max-w-3xl text-lg text-slate-300">{portfolio.heroSubtitle}</p>
              <p className="mt-3 max-w-3xl text-slate-400">{portfolio.heroDescription}</p>
              {portfolio.headline && <p className="mt-3 max-w-3xl text-slate-300">{portfolio.headline}</p>}

              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="rounded-md bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_10px_35px_rgba(34,211,238,0.3)]"
                >
                  View Projects
                </button>
                <a
                  href={portfolio.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-cyan-300/50 bg-slate-900/50 px-6 py-3 font-medium text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300/10"
                >
                  <Download size={16} /> Resume
                </a>
              </div>

              <div className="mt-8 flex gap-5">
                <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-300 transition hover:-translate-y-1 hover:text-cyan-300" aria-label="LinkedIn">
                  <Linkedin size={22} />
                </a>
                <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 transition hover:-translate-y-1 hover:text-cyan-300" aria-label="GitHub">
                  <GitHub size={22} />
                </a>
                <a href={`mailto:${portfolio.social.email}`} className="text-slate-300 transition hover:-translate-y-1 hover:text-cyan-300" aria-label="Email">
                  <Mail size={22} />
                </a>
              </div>
            </div>

            <div className="reveal-up mx-auto w-full max-w-md lg:max-w-lg">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900/70 p-3 shadow-[0_20px_80px_rgba(8,47,73,0.45)] backdrop-blur">
                  <div className="absolute inset-x-6 top-4 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
                  <img
                    src={portfolio.heroImage}
                    alt={portfolio.fullName}
                    className="h-[520px] w-full rounded-[1.4rem] object-cover object-top md:h-[620px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-400 transition hover:text-cyan-300"
          aria-label="Scroll to About"
        >
          <ChevronRight size={22} className="rotate-90" />
        </button>
      </section>

      <section id="about" className="border-t border-slate-800 bg-slate-900/90 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />
          <p className="mt-6 max-w-3xl text-slate-300">{portfolio.about}</p>
        </div>
      </section>

      <section id="projects" className="border-t border-slate-800 bg-slate-900 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.projects.map((project) => (
              <article key={project.title} className="flex h-full flex-col rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-6 shadow-sm shadow-slate-950/50 transition hover:-translate-y-1.5 hover:border-cyan-400/30">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span className="text-xs uppercase tracking-wide text-cyan-300">{project.period}</span>
                </div>
                {(project.role || project.status) && (
                  <p className="mt-2 text-sm text-slate-400">
                    {project.role ? `Role: ${project.role}` : ''}
                    {project.role && project.status ? ' · ' : ''}
                    {project.status ? `Status: ${project.status}` : ''}
                  </p>
                )}
                <ul className="mt-4 space-y-2 text-slate-300">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-400">{project.stack}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-cyan-300 transition hover:text-cyan-200"
                >
                  View Project <ExternalLink size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="border-t border-slate-800 bg-slate-950 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Experience <span className="text-cyan-400">Timeline</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />

          <div className="mt-10 space-y-6">
            {portfolio.experience.map((item) => (
              <article key={`${item.role}-${item.company}`} className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950/50 transition hover:-translate-y-1 hover:border-cyan-400/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <span className="text-sm text-cyan-300">{item.period}</span>
                </div>
                <p className="mt-1 text-slate-300">{item.company}</p>
                <ul className="mt-4 space-y-2 text-slate-300">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="border-t border-slate-800 bg-slate-900 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Technical <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />

          <div className="mt-10 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-6 shadow-[0_18px_60px_rgba(8,47,73,0.25)] md:p-8">
            <div className="space-y-6">
              {portfolio.skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-xl font-semibold text-cyan-400">{skillGroup.category}</h4>
                  <p className="mt-2 text-lg leading-relaxed text-slate-100">{skillGroup.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="border-t border-slate-800 bg-slate-950 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Education <span className="text-cyan-400">Background</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />

          <div className="mt-10 space-y-6">
            {portfolio.education.map((item) => (
              <article key={`${item.degree}-${item.institution}`} className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950/50 transition hover:-translate-y-1 hover:border-cyan-400/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                  <span className="text-sm text-cyan-300">{item.period}</span>
                </div>
                <p className="mt-1 text-slate-300">{item.institution}</p>
                <p className="mt-4 text-slate-300">{item.notes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="border-t border-slate-800 bg-slate-900 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Certifications <span className="text-cyan-400">& Credentials</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {portfolio.certifications.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 p-6 shadow-sm shadow-slate-950/50 transition hover:-translate-y-1 hover:border-cyan-400/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-cyan-300">{item.issuer}</p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-cyan-300/30 px-3 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300/10 hover:text-cyan-100"
                  >
                    View <ExternalLink size={14} />
                  </a>
                </div>
                <p className="mt-4 text-slate-300">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-800 bg-slate-950 py-20">
        <div className="container mx-auto px-6 reveal-up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400/60" />

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white">Send a message</h3>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)] disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus === 'success' && <p className="text-sm text-emerald-400">Message sent successfully.</p>}
                {formStatus === 'error' && <p className="text-sm text-red-400">Submission failed. Update your Formspree endpoint and try again.</p>}
              </form>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Contact details</h3>
              <div className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Email:</span> {portfolio.social.email}
                </p>
                <p>
                  <span className="font-semibold text-white">LinkedIn:</span>{' '}
                  <a className="text-cyan-300 hover:text-cyan-200" href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer">
                    {portfolio.social.linkedin}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">GitHub:</span>{' '}
                  <a className="text-cyan-300 hover:text-cyan-200" href={portfolio.social.github} target="_blank" rel="noopener noreferrer">
                    {portfolio.social.github}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p>© {new Date().getFullYear()} {portfolio.fullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
