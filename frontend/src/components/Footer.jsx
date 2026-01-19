// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   FaSquareXTwitter,
//   FaSquareInstagram,
//   FaYoutube,
//   FaLinkedin,
// } from "react-icons/fa6";

// import { FaGithubSquare } from 'react-icons/fa';
// const Footer = () => {
//   const { isAuthenticated } = useSelector((state) => state.user);
//   return (
//     <>
//       <footer>
//         <div>
//           <img src="/logo.png" alt="logo" />
//         </div>
//         <div>
//           <h4>Support</h4>
//           <ul>
//             <li>Hyderabad,Telangana</li>
//             <li>chprashanthbabu0936@gmail.com</li>
//             <li>+91 9573999685</li>
//           </ul>
//         </div>

//         <div>
//           <h4>Quick Links</h4>
//           <ul>
//             <li to={"/"}>
//               <Link>Home</Link>
//             </li>
//             <li to={"/jobs"}>
//               <Link>Jobs</Link>
//             </li>
//             {isAuthenticated && (
//               <li>
//                 <Link to={"/dashboard"}>Dashboard</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div>
//           <h4>Follow Us</h4>
//           <ul>
//             <li>

//                 <a href="www.linkedin.com/in/prashanth0936" target="_blank" ><span>
//                   <FaLinkedin />
//                 </span>
//                 <span>LinkedIn</span></a>

//             </li>

//             <li>

//                 <a href="https://github.com/PRASHANTHBABU0936" target="_blank" ><span>
//                   <FaGithubSquare />
//                 </span>
//                 <span>Github</span></a>
//             </li>

//           </ul>
//         </div>
//       </footer>
//       <div className="copyright">
//         &copy; 
//       </div>
//     </>
//   );
// };

// export default Footer;




import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaLinkedin,
} from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer className="footerType">
        <div className="footer-container">
          <div className="footer-col logo-col">
            <img src="/logo.png" alt="logo" />
            <p className="footer-desc">
              Connecting talent with opportunities across the nation.
            </p>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>Hyderabad, Telangana</li>
              <li>chprashanthbabu0936@gmail.com</li>
              <li>+91 9573999685</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/prashanth0936"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/PRASHANTHBABU0936"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithubSquare />
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Niche Nest. All rights reserved.
        </div>
      </footer>

      <div className="copyright">
        &copy; {new Date().getFullYear()} JoB PortaL
      </div>
    </>
  );
};

export default Footer;
