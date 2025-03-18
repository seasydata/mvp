import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0A1A44] text-gray-300 py-8 w-full">
      <div className="border-b-[1px] border-b-[#F9FAFA] py-8">
        <div className="w-[85%] mx-auto px-8 flex justify-between py-6">
          <div className="w-[100%] grid sm:grid-cols-2 grid-cols-3 gap-3">
            <div className="sm:hidden">
              <Image
                src="/images/seasy-hvit.png"
                alt="Seasy Logo"
                width={200}
                height={200}
              />
            </div>

            <div>
              <h2 className="text-[#F9FAFA] font-roboto font-bold sm:text-[16px] text-[24px] mb-4">
                Information
              </h2>
              <ul className="font-roboto text-[12px] md-and-up:text-[18px] font-medium space-y-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About us
                  </Link>
                </li>
                <li>
                  {/* <Link href="/articles" className="hover:underline"> */}
                  <Link href="/" className="hover:underline">
                    News and articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Image
                      src="/images/linkedin.svg"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                    />
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:info@seasydata.com"
                    className="flex items-center gap-2 hover:underline"
                  >
                    ✉️ info@seasydata.com
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#F9FAFA] font-roboto font-bold sm:text-[16px] text-[24px] mb-6">
                Supported by
              </h2>
              <div className="inline-block">
                <Image
                  src="/images/discovery.png"
                  alt="NTNU Discovery"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-[#C8C8C8] text-[12px]">
        © 2024 All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
