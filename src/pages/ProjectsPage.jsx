import { useMemo, useState } from "react";
import ProjectCard from "../components/shared/ProjectCard";
import SectionTitle from "../components/shared/SectionTitle";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch = activeCategory === "All" || project.category === activeCategory;
      const searchMatch =
        !query.trim() ||
        `${project.title} ${project.description} ${project.tags.join(" ")}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  return (
    <section className="container page-top-gap">
      <SectionTitle
        title="My Projects"
        subtitle="A collection of my data analysis, visualization, and AI automation work"
      />

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search projects by keyword"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
          aria-label="Search projects"
        />

        <div className="chip-list" role="tablist" aria-label="Project category filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count">
        Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
      </p>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
