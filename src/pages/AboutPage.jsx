import SectionTitle from "../components/shared/SectionTitle";
import Reveal from "../components/shared/Reveal";
import { aboutParagraphs, skills } from "../data/site";
import { assetPath } from "../utils/assetPath";

const highlights = [
  { label: "Years of Experience", value: "3+" },
  { label: "Portfolio Projects", value: "20+" },
  { label: "Published Articles", value: "10+" }
];

export default function AboutPage() {
  return (
    <section className="container page-top-gap">
      <SectionTitle title="About Me" subtitle="Get to know me better" />

      <div className="about-content">
        <Reveal className="about-text">
          <h3>Hello! I'm a Python Developer and Data Analyst</h3>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h4 className="sub-heading">Skills & Technologies</h4>
          <div className="skills">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>

          <div className="highlight-grid">
            {highlights.map((item) => (
              <div key={item.label} className="highlight-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="about-image">
          <img src={assetPath("profile.png")} alt="Anthony Obot" className="profile-image" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}
