import Image from "next/image";
import logo from "../../public/avatar.jpg";
import { FaGithub, FaGraduationCap, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <Image
          src={logo}
          alt="Bipin Saha"
          placeholder="blur"
          className="rounded-full w-40"
        />
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/bipin-saha" target="_blank">
            <FaGithub className="text-5xl" />
          </a>
          <a href="https://www.linkedin.com/in/bipinsaha/" target="_blank">
            <FaLinkedin className="text-5xl" />
          </a>
          <a href="https://x.com/saha_bipin" target="_blank">
            <FaXTwitter className="text-5xl" />
          </a>
          <a
            href="https://scholar.google.com/citations?user=3oJ0SboAAAAJ&hl=en&oi=ao"
            target="_blank"
          >
            <FaGraduationCap className="text-6xl" />
          </a>
        </div>
        <p>
          Bipin Saha <br />
          Copyright &copy; {new Date().getFullYear()} - All right reserved
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
