import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isLoading, setIsLoading] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const HandleContact = e => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required.',
        icon: 'error',
      });
      return;
    }
    setIsLoading(true);

    const templateParams = {
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
    };

    emailjs.send('service_w6vyssg', 'template_clxemam', templateParams, '5Ymfx9w-5o8_5AUXZ').then(
      function() {
        setContactForm({ name: '', email: '', message: '' });
        setIsLoading(false);
        window.location.reload();
      },
      function(error) {
        setIsLoading(false);
        alert('FAILED...', JSON.stringify(error));
      },
    );
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <form style={{ textAlign: 'start' }} onSubmit={HandleContact}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={e => {
              setContactForm({ ...contactForm, name: e.target.value });
            }}
            value={contactForm.name}
            placeholder="John Doe"
            style={{
              width: '100%',
              padding: '15px 15px',
              margin: '5px 0px',
              border: '2px solid #64ffda',
              fontWeight: 'bold',
            }}
          />
          <small>The one where you tell me your name.</small>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={e => {
              setContactForm({ ...contactForm, email: e.target.value });
            }}
            placeholder="johndoe@exmaple.com"
            style={{
              width: '100%',
              padding: '15px 15px',
              margin: '5px 0px',
              border: '2px solid #64ffda',
              fontWeight: 'bold',
            }}
          />
          <small>The one where you tell me how i can contact you back.</small>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            placeholder="Type your message here"
            value={contactForm.message}
            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
            rows={13}
            style={{
              width: '100%',
              padding: '15px 15px',
              margin: '5px 0px',
              border: '2px solid #64ffda',
              fontWeight: 'bold',
            }}></textarea>
          <small>The one where you tell me what I can do to help you.</small>
        </div>
        <button className="email-link" disabled={isLoading} type="submit">
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </StyledContactSection>
  );
};

export default Contact;
