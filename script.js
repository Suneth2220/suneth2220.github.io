document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar a');
  const toggleViewIcon = document.querySelector('#toggle-view-icon');
  const originalView = document.querySelector('#original-view');
  const minimalView = document.querySelector('#minimal-view');

  if (!menuIcon || !navbar) {
    console.error('Menu icon or navbar not found in the DOM');
    return;
  }

  if (!toggleViewIcon || !originalView || !minimalView) {
    console.error('Toggle view elements not found in the DOM');
    return;
  }

  console.log('Script loaded, setting up event listeners...');

  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Menu icon clicked, toggling navbar...');
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Nav link clicked, closing menu...');
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
      console.log('Clicked outside, closing menu...');
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }
  });

  // Toggle between original and minimal view using icon
  toggleViewIcon.addEventListener('click', () => {
    console.log('Toggle view icon clicked, switching view...');
    if (minimalView.style.display === 'none') {
      originalView.style.display = 'none';
      minimalView.style.display = 'block';
      toggleViewIcon.classList.add('active');
      menuIcon.style.display = 'none';
      // Mark body as being in CV mode to allow CSS overrides
      document.body.classList.add('cv-active');
    } else {
      originalView.style.display = 'block';
      minimalView.style.display = 'none';
      toggleViewIcon.classList.remove('active');
      menuIcon.style.display = window.innerWidth <= 1280 ? 'block' : 'none';
      document.body.classList.remove('cv-active');
    }
  });

  // Show/hide navbar and menu icon based on screen size
  function handleResize() {
    if (window.innerWidth > 1280) {
      navbar.style.display = 'flex';
      menuIcon.style.display = 'none';
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x');
    } else {
      navbar.style.display = 'none';
      menuIcon.style.display = 'block';
    }
    console.log(`Window resized to ${window.innerWidth}px, navbar display: ${navbar.style.display}`);
  }

  // Initial setup
  handleResize();

  // Update on resize
  window.addEventListener('resize', handleResize);
});