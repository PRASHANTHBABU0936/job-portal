import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <>
      <article className="application_page">
        <div className="application-split-container">
          {/* Left Column: Job Details */}
          <div className="job-details-column">
            <header>
              <h3>{singleJob.title}</h3>
              {singleJob.personalWebsite && (
                <Link target="_blank" to={singleJob.personalWebsite.url} className="company-link">
                  {singleJob.personalWebsite.title}
                </Link>
              )}
              <div className="tags-row">
                <span className="info-tag"><FaLocationDot /> {singleJob.location}</span>
                <span className="info-tag"><IoMdCash /> {singleJob.salary}</span>
              </div>
            </header>
            <hr className="divider" />
            <section className="job-description-content">
              <h4>Job Description</h4>
              <p>{singleJob.introduction}</p>

              {singleJob.qualifications && (
                <div className="requirements-section">
                  <h4>Qualifications</h4>
                  <ul>
                    {qualifications.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.responsibilities && (
                <div className="requirements-section">
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.offers && (
                <div className="requirements-section">
                  <h4>What We Offer</h4>
                  <ul>
                    {offering.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            <hr className="divider" />
            <footer>
              <p><strong>Job Niche:</strong> {singleJob.jobNiche}</p>
            </footer>
          </div>

          {/* Right Column: Application Form */}
          <div className="application-form-column">
            <form onSubmit={handlePostApplication} className="application-form">
              <h3>Apply Now</h3>
              <p className="form-subtitle">Fill out the form below to submit your application.</p>

              <div className="form-group">
                <label>Job Title</label>
                <input type="text" value={singleJob.title || ""} disabled className="disabled-input" />
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="1234567890"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="City, Country"
                />
              </div>

              {user && user.role === "Job Seeker" && (
                <>
                  <div className="form-group">
                    <label>Cover Letter</label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={6}
                      placeholder="Why are you a good fit for this role?"
                    />
                  </div>
                  <div className="form-group">
                    <label>Resume</label>
                    <input type="file" onChange={resumeHandler} className="file-input" />
                  </div>
                </>
              )}

              {isAuthenticated ? (
                user.role === "Job Seeker" ? (
                  <div className="form-actions">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                ) : (
                  <div className="form-actions">
                    <p style={{ textAlign: "center", color: "#ef4444" }}>
                      Only Job Seekers can apply for jobs.
                    </p>
                  </div>
                )
              ) : (
                <div className="form-actions">
                  <Link className="btn btn-primary" to={"/login"}>
                    Login to Apply
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostApplication;
