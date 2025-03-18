import Image from "next/image";
const Content1: React.FC = () => {
  return (
    <section className="w-90% xl:w-full flex flex-col lg-and-up:flex-row justify-center my-8 lg:my-16">
      <Image
        src="/images/team-picture.png"
        alt="Team picture"
        width={989}
        height={753}
        className="object-cover"
      />
    </section>
  );
};
export default Content1;
