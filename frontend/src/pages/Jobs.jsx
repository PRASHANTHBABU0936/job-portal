import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error, pagination } = useSelector((state) => state.jobs);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");


  console.log("Jobs State:", { jobs, loading, error, pagination });

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
    setCurrentPage(1); // Reset to page 1 on filter change
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(fetchJobs(city, niche, searchKeyword, currentPage));
  }, [dispatch, city, niche, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on search
    dispatch(fetchJobs(city, niche, searchKeyword, 1));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const cities = [
    "All",
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Quetta",
    "Peshawar",
    "Sialkot",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Mardan",
    "Mingora",
    "Sheikhupura",
    "Mandi Bahauddin",
    "Larkana",
    "Nawabshah",
  ];

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (jobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="card-logo">
                        {element.companyName ? element.companyName[0].toUpperCase() : "C"}
                      </div>
                      <div className="card-content">
                        <p className="title">{element.title}</p>
                        <div className="company-location">
                          <span>{element.companyName}</span>
                          <span>•</span>
                          <span>{element.location}</span>
                        </div>
                        <div className="tags">
                          <span className="tag">Rs. {element.salary}</span>
                          <span className="tag">{element.jobType || "Full Time"}</span>
                          {element.hiringMultipleCandidates === "Yes" && (
                            <span className="tag" style={{ color: "var(--secondary)", background: "#ECFDF5", borderColor: "var(--secondary)" }}>Urgent Hiring</span>
                          )}
                        </div>
                      </div>
                      <div className="card-actions">
                        <span className="posted-date">Posted: {element.jobPostedOn?.substring(0, 10)}</span>
                        <Link
                          className="btn-apply"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  );
                })) : (
                  /************************************************************/
                  /* BUG No.2 */
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <img
                      src="/not_found.png"
                      alt="job-not-found"
                      style={{ maxWidth: "400px", width: "100%", opacity: 0.8 }}
                    />
                    <p style={{ color: "#64748b", marginTop: "1rem" }}>
                      No jobs found matching your criteria.
                    </p>
                  </div>)
                  /************************************************************/




                }
              </div>
            </div>
          </div>
        </section>
      )}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "2rem" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ padding: "0.5rem 1rem", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            Previous
          </button>
          <span>
            Showing {(currentPage - 1) * 25 + 1}-{Math.min(currentPage * 25, pagination.count)} of {pagination.count}
          </span>
          <button
            disabled={currentPage === pagination.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{ padding: "0.5rem 1rem", cursor: currentPage === pagination.totalPages ? "not-allowed" : "pointer" }}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Jobs;
