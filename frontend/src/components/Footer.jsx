import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className=" w-full mx-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex  md:grid-cols-1">
          <div className="mt-5 ">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Niina's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/tata-vicram-ako-ateba-piere-a42338241/ "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin Profile
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/Vicram123 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Profile
                </Footer.Link>
                <Footer.Link
                  href="/about "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Niina's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Facebook
                </Footer.Link>
                <Footer.Link href="#" rel="noopener noreferrer">
                  X
                </Footer.Link>
                <Footer.Link
                  href="# "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/Vicram123 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
                <Footer.Link
                  href="/about "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Niina's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Niina's Dev"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={FaFacebook} />
            <Footer.Icon href="#" icon={FaInstagram} />
            <Footer.Icon href="#" icon={FaTwitter} />
            <Footer.Icon href="https://github.com/Vicram123" icon={FaGithub} />
            <Footer.Icon
              href="https://www.linkedin.com/in/tata-vicram-ako-ateba-piere-a42338241/"
              icon={FaLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
