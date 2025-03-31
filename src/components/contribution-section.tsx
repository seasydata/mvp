import BodyText from "./styles/body-text";
import Heading from "./styles/heading";

const ContributionSection: React.FC = () => {
  return (
    <section className="w-full mx-auto my-40 h-auto">
      <div className="flex flex-col justify-start gap-2">
        <Heading className="pb-8">
          Our Contribution to Emission Reduction
        </Heading>
        <div className="flex flex-row sm:flex-col justify-between gap-4">
          {/* First Block */}
          <div className="flex flex-row items-start gap-4">
            <div className="text-[200px] sm:text-[100px] font-extrabold text-[#F2F2F2] leading-none">
              1
            </div>
            <BodyText className="font-normal text-[22px] md:text-[18px] sm:text-[14px] leading-[36px] md:leading[18px] sm:leading-[24px] tracking-normal flex items-start pt-6">
              Our mission is to streamline emission data sharing so that
              businesses can lay their focus on strategies for reducing climate
              gas emissions.
            </BodyText>
          </div>

          {/* Second Block */}
          <div className="flex flex-row items-start gap-4">
            <div className="text-[200px] sm:text-[100px] font-extrabold text-[#F2F2F2] leading-none">
              2
            </div>
            <BodyText className="font-normal text-[22px] md:text-[18px] sm:text-[14px] leading-[36px] md:leading[18px] sm:leading-[24px] tracking-normal flex items-start pt-6">
              By simplifying the collection and sharing of climate gas data from
              the value chain, we go beyond compliance - empowering businesses
              to make smarter, more conscious decisions.
            </BodyText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributionSection;
