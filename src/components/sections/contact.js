import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

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

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <form style={{ textAlign: 'start' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name</label>
          <input
            type="text"
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
          <label>Email Address</label>
          <input
            type="email"
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
          <label>Message</label>
          <textarea
            placeholder="Type your message here"
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
        <button className="email-link">Send Message</button>
      </form>
    </StyledContactSection>
  );
};

export default Contact;
