import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { FaN, FaRegCircleQuestion, FaRegClock, FaRegEnvelopeOpen, FaYoutube } from "react-icons/fa6";

function GithubNavigation() {
  const links = [
    { label: "SignIn", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "SignUp", icon: <FaTachometerAlt className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-github-navigation">
      <li style={{padding:"12px"}}>
        <Link to="/Kanbas">  <FaN className="fs-2 f-2" color="red" size="60px" /></Link>
      </li>
      {links.map((link, index) => (
        <li
          key={index}
          className={pathname.includes(link.label) ? "wd-active" : ""}
        >
          <Link to={link.label.includes('Courses') ? `/Kanbas/Courses/RS101/Home` :`/Kanbas/${link.label}` }>
            <i>{link.icon}</i> {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default GithubNavigation;