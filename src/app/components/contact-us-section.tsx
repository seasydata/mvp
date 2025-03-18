import Heading from "./styles/heading";
import SubHeading from "./styles/sub-heading";
import BodyText from "./styles/body-text";

const ContactUsSection: React.FC = () => {
  return (
    <section className=" pb-10 w-full mx-auto py-14 h-[600px] grid md-and-down:grid-cols-1 grid-cols-2">
      <div>
        <Heading className="pb-4 pt-4">Want to meet?</Heading>
        <SubHeading>contact us</SubHeading>
        <BodyText className="mb-4 py-8 w-[387px] font-normal text-[22px] leading-[36px]">
          We&apos;re always up for a chat - and we <b>love</b> talking about
          cutting emissions. We&apos;ve got coffee, we don&apos;t bite
          (promise!), and we&apos;ll even pretend to laugh at your jokes.
        </BodyText>
        <div className="flex items-center justify-start bg-[#FBFBFB] w-[222px] h-[71px]">
          <BodyText className="pl-2 font-normal text-[22px] leading-[36px] text-center">
            Drop us an email!
          </BodyText>
        </div>
      </div>
      <div className="p-6">{/*Filler image*/}</div>
      <br />
    </section>
  );
};
export default ContactUsSection;
