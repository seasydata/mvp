import BodyText from "../styles/body-text";

const Content1: React.FC = () => {
  return (
    <section className="relative w-full py-12">
      <div className="flex flex-col pb-12">
        <BodyText className="!font-bold">Seasy Data</BodyText>
        <BodyText>1234 Sample Street</BodyText>
      </div>
      <div className="py-12">
        <BodyText className="!font-bold">42143214832748923</BodyText>
      </div>
    </section>
  );
};
export default Content1;
