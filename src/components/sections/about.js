import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'HTML5',
    'CSS3',
    'React',
    'Vue.js or Angular',
    'Node.js',
    'WordPress',
    'jQuery',
    'Express.js',
    'MongoDB',
    'SQL',
    'Jest or Mocha',
    'React Testing Library',
    'Git',
    'Agile Tools',
    'Webpack or Parcel',
    'Redux or Flux',
    'Responsive Design',
    'Accessibility',
    'Collaboration',
    'Team work',
    'Problem Solving',
    'Communication',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Rocco and I enjoy Collaboration is at the core of my work ethic, as
              demonstrated by my ability to effectively work within teams to achieve common goals.
              Proficient in technologies like JavaScript and React, I seamlessly integrate with team
              members to contribute to the development process. My proficiency in React enables me
              to build high-performance applications that meet and exceed user expectations.
            </p>

            <p>
              I thrive in dynamic environments, adapting quickly to new tools and frameworks. With
              experience in content management and a diverse background spanning medical, social,
              and education industries, I bring versatility to every project. My familiarity with
              Agile methodologies ensures that our products meet the highest standards through
              rigorous testing and code quality assurance.
            </p>

            <p>
              As a proactive team player, I take ownership of managing code changes and ensuring
              product integrity through version control systems. My experience in product management
              underscores my commitment to delivering high-quality applications, setting and
              upholding standards crucial to team success. Overall, my blend of technical expertise,
              collaborative spirit, and commitment to excellence makes me a valuable asset to any
              development team.
            </p>

            <p>Here are a few skills I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        {/* <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic> */}
      </div>
    </StyledAboutSection>
  );
};

export default About;
