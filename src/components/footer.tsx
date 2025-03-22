import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-cyan-900 text-gray-100 p-16 w-full">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-8 items-start">
          {/* Logo and description - wider */}
          <div className="flex flex-col gap-3 md:col-span-1 xl:col-span-2">
            <Image
              src="/images/seasy-hvit.png"
              alt="Seasy Logo"
              width={160}
              height={55}
              className="mb-1"
            />
            <p className="text-sm max-w-md leading-relaxed text-cyan-50/90">
              Helping businesses track and lower carbon emissions through
              effective data management solutions.
            </p>
          </div>

          {/* Information links - spread out more */}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-white mb-3">
              Information
            </h2>
            <div className="flex flex-col gap-y-2">
              <Link
                href="/"
                className="text-sm text-cyan-50/80 hover:text-white transition-colors hover:translate-x-0.5 duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-cyan-50/80 hover:text-white transition-colors hover:translate-x-0.5 duration-200"
              >
                About us
              </Link>
              <Link
                href="/"
                className="text-sm text-cyan-50/80 hover:text-white transition-colors hover:translate-x-0.5 duration-200"
              >
                News and articles
              </Link>
            </div>
          </div>

          {/* Contact section */}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-white mb-3">Contact</h2>
            <div className="flex flex-col gap-y-2">
              <Link
                href="mailto:info@seasydata.com"
                className="text-sm flex items-center gap-1.5 text-cyan-50/80 hover:text-white transition-colors"
              >
                <span>✉️</span> info@seasydata.com
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-1.5 text-cyan-50/80 hover:text-white transition-colors"
              >
                <Image
                  src="/images/linkedin.svg"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                />
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Supported by */}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-white mb-3">
              Supported by
            </h2>
            <div className="bg-gradient-to-br from-cyan-800/40 to-cyan-700/20 p-3 rounded-lg inline-block shadow-inner">
              <Image
                src="/images/discovery.png"
                alt="NTNU Discovery"
                width={80}
                height={80}
                className="hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Copyright - cleaner look */}
        <div className="mt-8 pt-4 border-t border-cyan-700/30 text-center text-cyan-100/70 text-xs">
          © 2024 Seasy Data. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
