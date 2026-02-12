document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // Intersection Observer for fade-in animations
  // ============================================
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Observe all elements with .fade-in class
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ============================================
  // Form Submission Handling
  // ============================================
  function handleFormSubmit(form, confirmationEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.hidden = true;
          confirmationEl.hidden = false;
          
          // If this is the signup form, trigger counter increment
          if (form.classList.contains('signup-form')) {
            incrementCounter();
          }
        } else {
          submitBtn.textContent = 'Something went wrong. Try again?';
          submitBtn.disabled = false;
        }
      } catch (error) {
        submitBtn.textContent = 'Something went wrong. Try again?';
        submitBtn.disabled = false;
      }
    });
  }

  // Wire up signup form
  const signupForm = document.querySelector('.signup-form');
  const signupConfirmation = document.querySelector('.signup-confirmation');
  if (signupForm && signupConfirmation) {
    handleFormSubmit(signupForm, signupConfirmation);
  }

  // Wire up feedback form
  const feedbackForm = document.querySelector('.feedback-form');
  const feedbackConfirmation = document.querySelector('.feedback-confirmation');
  if (feedbackForm && feedbackConfirmation) {
    handleFormSubmit(feedbackForm, feedbackConfirmation);
  }

  // ============================================
  // Signup Counter
  // ============================================
  let counterAnimated = false;
  
  function incrementCounter() {
    const counterEl = document.querySelector('.counter-number');
    if (counterEl) {
      const currentCount = parseInt(counterEl.textContent) || 0;
      counterEl.textContent = currentCount + 1;
    }
  }

  // Counter starts at 0, showing "Be among the first to know" message
  // No fake seed number per Decision #1
});
