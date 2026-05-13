import CountUp from "react-countup";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CollegeBuilding from "../../assets/alternativeOfCollegeBuilding.jpg";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
const About = () => {
  return (
    <section id="about" className="py-8 sm:py-12 font-heading">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <h2 className="text-4xl font-bold"> Quest for Excellence </h2>
      <p className="font-semibold text-lg ">
        The mission of UIU is to create excellent human resources with
        intellectual, creative, technical, moral and practical skills to serve
        community, industry and region. We do it by developing integrated,
        interactive, involved and caring relationships among teachers, students,
        guardians and employers.
      </p>
      <PrimaryButton>More About UIU</PrimaryButton>
      </div>
    </section>
  );
};

export default About;
