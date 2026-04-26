import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TutorCard from "../components/TutorCard";
import { catalogData } from "../data/catalogData";
import { filterTags } from "../data/servicesData";
import "../css/catalog.css";

function Catalog() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // If navigated from Services page with a filter pre-selected,
  // or from Dashboard "View Profile" with a search name pre-filled
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tag = params.get("filter");
    const searchParam = params.get("search");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tag) setActiveFilter(tag);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (searchParam) setSearch(searchParam);
  }, [location.search]);

  const filtered = catalogData.filter((tutor) => {
    const matchesFilter =
      activeFilter === "All" || tutor.services.includes(activeFilter);
    const matchesSearch =
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="catalog-page">
      {/* Header */}
      <div className="catalog-header">
        <h1>Find a Tutor</h1>
        <p>Browse tutors by subject or service type and book a session.</p>
      </div>

      {/* Search */}
      <input
        type="text"
        className="catalog-search"
        placeholder="Search by name or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter Buttons — reuses same tags as Services */}
      <div className="catalog-filters">
        {filterTags.map((tag) => (
          <button
            key={tag}
            className={`filter-btn ${activeFilter === tag ? "active" : ""}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="catalog-count">
        {filtered.length} tutor{filtered.length !== 1 ? "s" : ""} found
        {activeFilter !== "All" ? ` for "${activeFilter}"` : ""}
      </p>

      {/* Grid */}
      <div className="catalog-grid">
        {filtered.length > 0 ? (
          filtered.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))
        ) : (
          <p className="catalog-empty">No tutors match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;