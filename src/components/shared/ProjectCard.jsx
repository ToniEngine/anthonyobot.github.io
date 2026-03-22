import { assetPath } from "../../utils/assetPath";
import Reveal from "./Reveal";

export default function ProjectCard({ project }) {
  return (
    <Reveal className="project-card">
      <article>
        <div className="project-image">
          <img src={assetPath(project.image)} alt={project.title} loading="lazy" />
        </div>
        <div className="project-content">
          <a href={project.link} target="_blank" rel="noreferrer">
            <h3>{project.title}</h3>
          </a>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={`${project.id}-${tag}`} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
