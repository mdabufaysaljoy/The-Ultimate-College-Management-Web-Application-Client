import CountUp from "react-countup";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CollegeBuilding from "../../assets/alternativeOfCollegeBuilding.jpg";
const About = () => {
  return (
    <section id="about" className="py-8 sm:py-12 font-heading">
      <SectionHeading>🏢 About Our Institution</SectionHeading>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-4">
          <img src={CollegeBuilding} alt="" className="w-full" />
        </div>
        <div className="flex-8 flex flex-col justify-between">
          <div>
            <p>
              Welcome to <b> [College or Institution Name]</b>, a place where
              knowledge, innovation, and growth come together. Since our
              establishment, we have been dedicated to creating an environment
              where students can achieve academic excellence and develop the
              skills needed for a successful future.
            </p>
            <br />
            <p>
              Our institution believes in embracing modern technology to improve
              education and administration. With the implementation of The
              Ultimate College Management System, we are moving towards a
              smarter, faster, and more organized digital experience.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">
              {" "}
              We are committed to:
            </h3>
            <ul className="space-y-2 pl-5">
              <li>📚 Providing high-quality education for every student</li>
              <li>👩‍🏫 Supporting teachers with the best resources and tools</li>
              <li>
                💻 Adopting advanced digital solutions for efficient management{" "}
              </li>
              <li>🌍 Building a strong, future-ready institution</li>
            </ul>
            <br />
            <p>
              By integrating this modern web application, our college ensures
              transparency, accuracy, and convenience for students, teachers,
              and staff alike.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 md:gap-6 w-fit mx-auto my-12">
            <span className="btn btn-primary md:btn-xl">
              Students admitted: <CountUp end={768} duration={10}></CountUp>
            </span>
            <span className="btn btn-secondary md:btn-xl">
              Permanent Teachers:{" "}
              <CountUp className="" end={35} duration={6}></CountUp>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
