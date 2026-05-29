import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Code,
  Mail,
  Linkedin,
  Github,
  Menu,
  X,
  ArrowUp,
  Award,
  ExternalLink,
} from 'lucide-react';

// --- Main App Component ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () =>
      window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();

    const target = document.getElementById(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }

    setIsMenuOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#0f172a] text-white font-sans">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        smoothScroll={smoothScroll}
      />

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
          className="fixed bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

// --- Header ---
const Header = ({ isMenuOpen, setIsMenuOpen, smoothScroll }) => {
  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">

      <div className="w-full px-6 lg:px-16 py-5 flex justify-between items-center">

        <a
          href="#"
          className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          Harsh Devda
        </a>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => smoothScroll(e, link.id)}
              className="text-lg text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              {link.title}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#111827]">
          <nav className="flex flex-col items-center py-5 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => smoothScroll(e, link.id)}
                className="text-lg text-gray-300 hover:text-cyan-400"
              >
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Hero ---
const Hero = ({ smoothScroll }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        <h1 className="text-6xl md:text-8xl font-black mb-6">
          Harsh Devda
        </h1>

        <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
          MERN Stack Developer
        </p>

        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-300 leading-relaxed mb-12">
          Building modern, scalable and user-focused web applications
          with clean UI, smooth UX and powerful MERN stack solutions.
        </p>

        <a
          href="#projects"
          onClick={(e) => smoothScroll(e, 'projects')}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all duration-300 inline-block"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

// --- About ---
const About = () => {
  const skills = [
  'HTML5',
  'CSS3',
  'JavaScript (ES6+)',
  'React.js',
  'React Hooks',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Python',
  'SQL',
  'Tailwind CSS',
  'Framer Motion',
  'REST APIs',
  'JWT Authentication',
  'Responsive Design',
  'Vite',
  'Git',
  'GitHub',
  'Netlify',
  ];

  return (
    <section id="about" className="py-24 bg-[#111827]">

      <div className="w-full px-6 lg:px-16">

        <h2 className="text-5xl font-bold text-center mb-16">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-16">

          <div className="md:w-1/3 text-center">

            <img
              src="/profile.png"
              alt="Harsh Devda"
              className="rounded-full w-72 h-72 mx-auto border-4 border-cyan-400 shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all duration-500"
            />
          </div>

          <div className="md:w-2/3">

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              B.Tech CSIT Graduate and MERN Stack Developer with hands-on experience in building scalable and responsive web applications using React.js, Node.js, Express.js, MongoDB, and Tailwind CSS.

              Built impactful projects like QuickBlog, FitGym, and BookHive, featuring REST APIs, authentication, dashboards, and modern responsive UI. Passionate about creating user-centric digital experiences, solving real-world problems, and continuously improving as a software developer.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Developed impactful projects like QuickBlog,
              FitGym and BookHive featuring authentication,
              dashboards, REST APIs and responsive UI experiences.
            </p>

            <h3 className="text-3xl font-bold mb-6">
              Technical Skills
            </h3>

            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 backdrop-blur-md text-cyan-300 py-2 px-5 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

              <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-3xl font-bold text-cyan-400">
                  10+
                </h3>
                <p className="text-gray-400 mt-2">Projects</p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-3xl font-bold text-cyan-400">
                  15+
                </h3>
                <p className="text-gray-400 mt-2">Technologies</p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-3xl font-bold text-cyan-400">
                  5+
                </h3>
                <p className="text-gray-400 mt-2">Certifications</p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/10">
                <h3 className="text-3xl font-bold text-cyan-400">
                  2025
                </h3>
                <p className="text-gray-400 mt-2">Graduate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Experience ---
const Experience = () => {
  return (
    <section id="experience" className="py-24">

      <div className="w-full px-6 lg:px-16">

        <h2 className="text-5xl font-bold text-center mb-16">
          <Briefcase
            className="inline-block mr-3 text-cyan-400"
            size={40}
          />
          Experience
        </h2>

        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-10 rounded-3xl">

          <p className="text-cyan-400 font-semibold">2025</p>

          <h3 className="text-3xl font-bold mt-3 mb-6">
            MERN Stack Developer
          </h3>

          <ul className="space-y-4 text-gray-300 text-lg">
            <li>✔ Built scalable full-stack applications.</li>
            <li>✔ Designed responsive modern UI.</li>
            <li>✔ Developed REST APIs & MongoDB integrations.</li>
            <li>✔ Worked with React.js & Tailwind CSS.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// --- Projects ---
const Projects = () => {
  const projectData = [
    {
      title: 'QuickBlog',
      description:
        'AI-powered blogging platform using MERN stack.',
      image: '/quickblog.png',
      liveLink: 'https://quickblog07.netlify.app/',
      repoLink: 'https://github.com/harsh07059/QuickBlog-',
    },

    {
      title: 'FitGym',
      description:
        'Modern fitness and gym management application.',
      image: '/fitgym.png',
      liveLink: 'https://fitgym-fitness.netlify.app/',
      repoLink:
        'https://github.com/harsh07059/Fitgym-management-system07',
    },

    {
      title: 'BookHive',
      description:
        'Responsive book management system with modern dashboard and elegant UI.',
      image: '/bookhive.png',
      liveLink:
        'https://book-management-system-bookhive.netlify.app/',
      repoLink:
        'https://github.com/harsh07059/Fitgym-management-system07',
    },

    {
      title: 'HR Cloud',
      description:
        'Modern HR management web application.',
      image: '/hrcloud.png',
      liveLink: 'https://hrmsystem01.netlify.app/',
      repoLink: 'https://github.com/harsh07059/HRM',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#111827]">

      <div className="container mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          <Code
            className="inline-block mr-3 text-cyan-400"
            size={40}
          />
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {projectData.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >

              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover hover:scale-110 transition-all duration-700"
                />
              </div>

              <div className="p-8">

                <h3 className="text-3xl font-bold mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">

                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
                  >
                    Live Demo
                    <ExternalLink size={18} />
                  </a>

                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                  >
                    <Github size={30} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Certifications ---
const Certifications = () => {
  const certs = [
    'AWS Academy Cloud Foundations',
    'AWS Machine Learning Foundations',
    'Java + DSA',
    'React Essential Training',
    'Blockchain Builder Program',
  ];

  return (
    <section id="certifications" className="py-24">

      <div className="w-full px-6 lg:px-16">

        <h2 className="text-5xl font-bold text-center mb-16">
          <Award
            className="inline-block mr-3 text-cyan-400"
            size={40}
          />
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {certs.map((cert, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center hover:scale-105 transition-all duration-300"
            >
              <Award className="text-cyan-400 mr-4" size={24} />

              <p className="text-gray-300">{cert}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact ---
const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-[#111827] text-center"
    >

      <div className="px-6">

        <h2 className="text-5xl font-bold mb-8">
          <Mail
            className="inline-block mr-3 text-cyan-400"
            size={40}
          />
          Get In Touch
        </h2>

        <p className="text-xl text-gray-300 mb-10">
          I’m currently open to new opportunities.
        </p>

        <div className="flex gap-4 justify-center">

  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=Harshdevda0705@gmail.com&su=Portfolio%20Inquiry"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-full"
>
  Email Me
</a>
    

  <a
    href="https://www.linkedin.com/in/harsh-devda101/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-full"
  >
    LinkedIn
  </a>

  <a
    href="https://github.com/harsh07059"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-full"
  >
    GitHub
  </a>

</div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-10">

      <div className="text-center text-gray-400">

        <div className="flex justify-center space-x-8 mb-6">

          <a
            href="https://github.com/harsh07059"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
          >
            <Github size={30} />
          </a>

          <a
            href="https://www.linkedin.com/in/harsh-devda101/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 hover:scale-110 transition-all duration-300"
          >
            <Linkedin size={30} />
          </a>
        </div>

        <p>
          © {new Date().getFullYear()} Harsh Devda.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};