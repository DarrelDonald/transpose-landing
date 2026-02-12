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
  // Interest "I Want This" Button
  // ============================================
  const interestBtn = document.getElementById('interest-btn');
  const interestForm = document.getElementById('interest-form');

  if (interestBtn && interestForm) {
    interestBtn.addEventListener('click', async () => {
      // Log click to Formspree silently
      const timestampInput = document.getElementById('interest-timestamp');
      if (timestampInput) {
        timestampInput.value = new Date().toISOString();
      }

      try {
        await fetch(interestForm.action, {
          method: 'POST',
          body: new FormData(interestForm),
          headers: { 'Accept': 'application/json' }
        });
      } catch (e) {
        // Silent fail — don't block UX for analytics
      }

      // Visual feedback
      interestBtn.textContent = '✓ You want this!';
      interestBtn.classList.add('clicked');

      // Scroll to signup section
      const signupSection = document.getElementById('signup');
      if (signupSection) {
        setTimeout(() => {
          signupSection.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }
    });
  }
});
