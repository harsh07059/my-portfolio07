import React, { useState, useEffect } from 'react';
import { Briefcase, Code, Mail, Linkedin, Github, Menu, X, ArrowUp, Award, GraduationCap, Sparkles } from 'lucide-react';

// --- Main App Component ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // --- Scroll to top functionality ---
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // --- Smooth scroll for navigation ---
    const smoothScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Adjust for fixed header height
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false); // Close menu on navigation
    };

    return (
        <div className="bg-gray-900 text-gray-100 font-sans leading-normal tracking-wider">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} smoothScroll={smoothScroll} />
            <main className="pt-20">
                <Hero smoothScroll={smoothScroll} />
                <About />
                <Experience />
                <Projects />
                <Certifications />
                <Contact />
            </main>
            <Footer />
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </div>
    );
}

// --- Header Component ---
const Header = ({ isMenuOpen, setIsMenuOpen, smoothScroll }) => {
    const navLinks = [
        { id: 'about', title: 'About' },
        { id: 'experience', title: 'Experience' },
        { id: 'projects', title: 'Projects' },
        { id: 'certifications', title: 'Certifications' },
        { id: 'contact', title: 'Contact' },
    ];

    return (
        <header className="bg-gray-900/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors">
                    Harsh Devda
                </a>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                        <a key={link.id} href={`#${link.id}`} onClick={(e) => smoothScroll(e, link.id)} className="text-lg text-gray-300 hover:text-teal-400 transition-colors duration-300">
                            {link.title}
                        </a>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <nav className="flex flex-col items-center py-4">
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={(e) => smoothScroll(e, link.id)} className="py-2 text-lg text-gray-300 hover:text-teal-400 transition-colors duration-300">
                                {link.title}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

// --- Typing Effect Component ---
const TypingEffect = ({ titles }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        if (isDeleting) {
            if (subIndex === 0) {
                setIsDeleting(false);
                setIndex((prevIndex) => (prevIndex + 1) % titles.length);
            } else {
                const timeout = setTimeout(() => {
                    setText(titles[index].substring(0, subIndex - 1));
                    setSubIndex(subIndex - 1);
                }, 100);
                return () => clearTimeout(timeout);
            }
        } else {
            if (subIndex === titles[index].length) {
                const waitTimeout = setTimeout(() => setIsDeleting(true), 2000);
                 return () => clearTimeout(waitTimeout);
            } else {
                const timeout = setTimeout(() => {
                    setText(titles[index].substring(0, subIndex + 1));
                    setSubIndex(subIndex + 1);
                }, 150);
                return () => clearTimeout(timeout);
            }
        }
    }, [subIndex, isDeleting, index, titles]);

    return (
        <span className="border-r-2 border-teal-400 pr-1">{text}</span>
    );
};

// --- Hero Section Component ---
const Hero = ({ smoothScroll }) => {
    const jobTitles = ["MERN Stack Developer", "Frontend Specialist", "React.js Expert"];
    return (
        <section id="home" className="min-h-screen flex items-center bg-gray-900">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
                    Harsh Devda
                </h1>
                <p className="text-2xl md:text-4xl text-teal-400 mb-8 h-12">
                   <TypingEffect titles={jobTitles} />
                </p>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-12">
                    Passionate about building clean, responsive, and user-focused web applications with the MERN stack. Let's create something amazing together.
                </p>
                <a href="#projects" onClick={(e) => smoothScroll(e, 'projects')} className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105">
                    View My Work
                </a>
            </div>
        </section>
    );
};

// --- About Section Component ---
const About = () => {
    const skills = ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'];
    return (
        <section id="about" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    About Me
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/3 text-center">
                        <img 
                            src="https://placehold.co/400x400/1a202c/4fd1c5?text=HD" 
                            alt="Harsh Devda" 
                            className="rounded-full w-64 h-64 mx-auto border-4 border-teal-400 shadow-lg"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1a202c/4fd1c5?text=Error'; }}
                        />
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-lg text-gray-300 mb-6">
                            I'm a frontend and MERN stack developer with a B.Tech in CSIT (Class of 2025), passionate about building clean, responsive, and user-focused web applications. My core tech stack includes React.js, JavaScript, Tailwind CSS, and the MERN stack.
                        </p>
                        <p className="text-lg text-gray-300 mb-8">
                           I've delivered impactful projects like HRCloud, which improved HR efficiency by 40% through automation and smart UI/UX. With certifications in AWS Cloud and Machine Learning, I bring a well-rounded, problem-solving mindset to development.
                        </p>
                        <h3 className="text-2xl font-semibold text-white mb-4">Technical Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map(skill => (
                                <span key={skill} className="bg-gray-700 text-teal-300 py-2 px-4 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Experience Section ---
const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    <Briefcase className="inline-block mr-3 text-teal-400" size={40} />
                    Professional Experience
                </h2>
                <div className="relative border-l-2 border-teal-500 pl-10">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-teal-500 rounded-full border-4 border-gray-900"></div>
                    <div className="mb-12">
                        <p className="text-sm text-gray-400">June 2023</p>
                        <h3 className="text-2xl font-bold text-teal-400 mt-1">Frontend Developer Intern</h3>
                        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
                            <li>Built a modern HR system using React.js, Tailwind CSS, and Framer Motion for enhanced UI/UX.</li>
                            <li>Implemented employee management, attendance tracking, and secure authentication features.</li>
                            <li>Integrated real-time validations and analytics dashboards for improved data handling.</li>
                            <li>Ensured seamless navigation with React Router and responsive cross-device design.</li>
                            <li>Deployed on Netlify using CI/CD workflows for smooth and stable updates.</li>
                        </ul>
                    </div>
                </div>
                 <div className="relative border-l-2 border-teal-500 pl-10 mt-12">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-teal-500 rounded-full border-4 border-gray-900"></div>
                    <div>
                        <p className="text-sm text-gray-400">2021 - 2025</p>
                        <h3 className="text-2xl font-bold text-teal-400 mt-1">B.Tech in CSIT</h3>
                        <p className="text-lg text-gray-300">IPS Academy, Institute of Engineering & Science</p>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- Projects Section Component ---
const Projects = () => {
    const projectData = [
        {
            title: 'HR Cloud - Modern HR Management System',
            description: 'A full-featured HR web application using React.js, Tailwind CSS, and Framer Motion. Implemented employee management, attendance tracking, and document handling with real-time validations. Designed responsive UI with analytics dashboards and automated workflows, reducing HR ops time by 40%.',
            image: 'https://placehold.co/600x400/1a202c/4fd1c5?text=HR+Cloud',
            tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
            liveLink: 'https://hrmsystem01.netlify.app/',
            repoLink: '#', // Add your GitHub repo link
        },
    ];

    return (
        <section id="projects" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    <Code className="inline-block mr-3 text-teal-400" size={40} />
                    Academic Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
                    {projectData.map((project, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-64 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1a202c/4fd1c5?text=Image+Failed'; }}
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-gray-600 text-teal-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-semibold">Live Demo</a>
                                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Github size={24} /></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Certifications Section ---
const Certifications = () => {
    const certs = [
        "AWS Academy Cloud Foundations",
        "AWS Academy Machine Learning Foundations",
        "Blockchain Builder Innovator Program (FIIT-IIT DELHI)",
        "C & C++ Course (Universal Informatics)",
        "Java + DSA (Apna College - Alpha 3.0)"
    ];
    return (
        <section id="certifications" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    <Award className="inline-block mr-3 text-teal-400" size={40} />
                    Certifications
                </h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certs.map((cert, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg flex items-center shadow-md">
                            <Award className="text-teal-400 mr-4 flex-shrink-0" size={24} />
                            <p className="text-gray-300">{cert}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- Contact Section Component with Gemini API ---
const Contact = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [generatedSnippet, setGeneratedSnippet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateSnippet = async () => {
        if (!jobDescription.trim()) {
            setError('Please paste a job description first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedSnippet('');

        const mySkillsAndSummary = `
            Summary: I'm a frontend and MERN stack developer with a B.Tech in CSIT (Class of 2025), passionate about building clean, responsive, and user-focused web applications. I've delivered impactful projects like HRCloud, which improved HR efficiency by 40% through automation and smart UI/UX. With certifications in AWS Cloud and Machine Learning, I bring a well-rounded, problem-solving mindset to development.
            Skills: HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, Tailwind CSS.
        `;

        const prompt = `
            Based on my profile below, write a short and compelling paragraph (3-4 sentences) for a cover letter, highlighting why I am a strong candidate for the following job description. Be confident and professional.

            My Profile:
            ${mySkillsAndSummary}

            Job Description:
            ${jobDescription}
        `;

        let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = ""; // API key is handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        let retries = 3;
        let delay = 1000;

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    setGeneratedSnippet(text);
                    setIsLoading(false);
                    return; // Success, exit loop
                } else {
                     throw new Error("Invalid response structure from API.");
                }
            } catch (e) {
                console.error("API call failed:", e);
                if (i < retries - 1) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    setError("Sorry, something went wrong while generating the snippet. Please try again later.");
                    setIsLoading(false);
                }
            }
        }
    };


    return (
        <section id="contact" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                    <Mail className="inline-block mr-3 text-teal-400" size={40} />
                    Get In Touch
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                    I'm currently open to new opportunities. Feel free to reach out directly or use the AI assistant below to see how my skills match your needs.
                </p>
                <a href="mailto:Harshdevda0705@gmail.com" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 inline-block">
                    Say Hello
                </a>

                {/* --- Gemini API Feature --- */}
                <div className="max-w-3xl mx-auto mt-16 bg-gray-900 p-8 rounded-lg shadow-2xl text-left">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <Sparkles className="text-teal-400 mr-3" />
                        AI-Powered Cover Letter Assistant
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Paste a job description below, and I'll generate a cover letter snippet showing how my skills align with the role.
                    </p>
                    <textarea
                        className="w-full h-40 p-4 bg-gray-800 border-2 border-gray-700 rounded-md text-gray-300 focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <button
                        onClick={handleGenerateSnippet}
                        disabled={isLoading}
                        className="mt-4 w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                             "✨ Generate Cover Letter Snippet"
                        )}
                    </button>
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                    {generatedSnippet && (
                        <div className="mt-6 p-6 bg-gray-800 border-l-4 border-teal-500 rounded-r-lg">
                            <h4 className="text-lg font-semibold text-white mb-2">Generated Snippet:</h4>
                            <p className="text-gray-300 whitespace-pre-wrap">{generatedSnippet}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => {
    return (
        <footer className="bg-gray-900 py-8">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://github.com/harsh07059" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors"><Github size={28} /></a>
                    <a href="https://www.linkedin.com/in/harsh-devda101/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors"><Linkedin size={28} /></a>
                </div>
                <p>&copy; {new Date().getFullYear()} Harsh Devda. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
