import Image from "next/image";
import BodyText from "../styles/body-text";
import Link from "next/link";


const teamMembers = [
  { name: "Hanna Snefjellå Løvås", image: "hanna.png", email: "hanna", phone: "904 70 046" },
  { name: "Anna Leonora Brekkhus", image: "leo.png", email: "anna.leonora", phone: "468 32 099" },
  { name: "Johan Storesund", image: "johan.png", email: "johan" },
  { name: "Iril Straumbotn", image: "iril.png", email: "iril" },
];

const TeamPictures: React.FC = () => {
  return (
    <section className="relative w-full py-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-4 md-and-down:grid-cols-2 gap-x-12 md:gap-x-4 gap-y-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div className="relative w-[240px] sm:w-[130px] md:w-[200px] sm:h-[130px] md:h-[200px] h-[240px] overflow-hidden">
              <Image
                src={`/images/${member.image}`}
                alt={member.name}
                width={240}
                height={240}
              />
            </div>
            <BodyText>{member.name}</BodyText>
            <Link
              href={`mailto:${member.email}@seasydata.com`}
              rel="noopener noreferrer"
              className="py-2 transition-colors duration-300"
              >
              <BodyText>{member.email}@&#8203;seasydata.com</BodyText> {/* &#8203; is a wrapping point for smaller viewports */}
            </Link>
            {member.phone && 
              <Link
                href={`tel:${member.phone}`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#0A1A44] hover:text-[#0A1A44] transition-colors duration-300">
                <BodyText>+47 {member.phone}</BodyText>
              </Link>
            }
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPictures;
