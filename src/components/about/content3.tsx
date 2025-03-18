import Link from "next/link";
import Image from "next/image";
import BodyText from "../styles/body-text";

const teamMembers = [
  { name: "Hanna Snefjellå Løvås", link: "/", image: "/images/hanna.png" },
  { name: "Anna Leonora Brekkhus", link: "/", image: "/images/leo.png" },
  { name: "Johan Storesund", link: "/", image: "/images/johan.png" },
  { name: "Iril Straumbotn", link: "/", image: "/images/iril.png" },
];

const Content3: React.FC = () => {
  return (
    <section className="relative w-full py-12">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-4 md-and-down:grid-cols-2 gap-x-12 md:gap-x-4 gap-y-8">
        {teamMembers.map((member, index) => (
          <Link
            key={index}
            href={member.link}
            className="flex flex-col items-center"
          >
            <div className="relative w-[240px] sm:w-[130px] md:w-[200px] sm:h-[130px] md:h-[200px] h-[240px] overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                width={240}
                height={240}
              />
            </div>
            <BodyText>{member.name}</BodyText>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Content3;
