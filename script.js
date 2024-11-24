document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
  
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    // Function to update theme UI elements
    function updateThemeUI(theme) {
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
        }
        if (themeText) {
            themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }
        lucide.createIcons();
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
      });
    });
  
    // Set skill levels with percentages
    document.querySelectorAll('.skill-progress').forEach(skill => {
      const level = skill.getAttribute('data-level');
      skill.style.width = `${level}%`;
    });
  
    // Single Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);
  
    // Observe all elements that should fade in
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  
    // Form submission with EmailJS
    const form = document.getElementById('contact-form');
    const formMessage = document.createElement('div');
    formMessage.style.marginTop = '1rem';
    formMessage.style.textAlign = 'center';
    
    if (form) {
      form.appendChild(formMessage);
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // EmailJS configuration
        const serviceID = 'service_eejqq7p';
        const templateID = 'template_vvvgpbh';

        emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.style.color = 'green';
            form.reset();
          })
          .catch((err) => {
            formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            formMessage.style.color = 'red';
            console.error('EmailJS error:', err);
          })
          .finally(() => {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
      });
    }

    // Typing Animation
    const text = "Siddharth";
    const typingText = document.querySelector('.typing-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing animation when page loads
    window.addEventListener('load', () => {
        typingText.textContent = '';  // Clear initial text
        setTimeout(typeWriter, 500);  // Start after a small delay
    });

    // Skills hover effect and animation
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progress = card.querySelector('.skill-progress');
            const level = progress.getAttribute('data-level');
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = `${level}%`;
            }, 50);
        });
    });

    // Animate skills on scroll
    const animateSkills = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const level = progress.getAttribute('data-level');
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = `${level}%`;
                }, 200);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });
});
  
  // Function to scroll to projects section
  function scrollToProjects() {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  }

