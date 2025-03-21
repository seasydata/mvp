import BodyText from "../styles/body-text";

const Content2: React.FC = () => {
  return (
    <section className="relative w-full py-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-32 flex justify-center">
      <div className="w-[917px] max-w-full text-center flex flex-col justify-center items-center gap-6">
        <BodyText>
          At Seasy Data, we&apos;re driven by a shared passion for green
          technology and a deep commitment to facilitating for a greener world.
          Our interdisciplinary team brings together expertise in computer
          science, environmental analysis, energy calculations, and GHG
          reporting.
        </BodyText>
        <BodyText>Get to know us better by clicking our image.</BodyText>
      </div>
    </section>
  );
};
export default Content2;
