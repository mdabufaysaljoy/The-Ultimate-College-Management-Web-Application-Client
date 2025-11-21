import Lottie from "lottie-react";
import Science from "../../assets/LottieJSON/scienceChemical.json";
import Humanities from "../../assets/LottieJSON/humanities.json";
import Business from "../../assets/LottieJSON/businessStudies.json";

import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Timeline from "../../components/Timeline/Timeline";
const Departments = () => {
  return (
    <section id="departments" className="py-12 ">
      <SectionHeading>Our Departments</SectionHeading>
      <div className="flex flex-col gap-8 md:hidden">
        <div className="timeline-start timeline-box dark:bg-brand-navyblue border-none bg-brand-blue text-white dark:text-gray-300">
          <h2 className="text-2xl font-bold ">Science </h2>
            <Lottie animationData={Science} className="size-28" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
            laboriosam totam suscipit omnis asperiores libero ut, alias tempora
            culpa, doloremque sed accusantium labore incidunt perferendis
            eligendi magnam! Fugiat, vitae suscipit. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Ipsam porro nulla fugit dolore ut
            quam,{" "}
          </p>
          <ul className="list list-disc ms-12 my-4">
            <li>Physics</li>
            <li>Chemistry</li>
            <li>Higher Mathematics</li>
            <li>Biology</li>
          </ul>
          <p>
            dignissimos maiores? Sapiente eaque distinctio ducimus, corrupti
            error harum quae eius officiis, magnam deleniti possimus. Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Neque similique
            ad maiores tenetur, eligendi commodi nisi dicta debitis consequatur
            voluptatibus et reprehenderit tempora eaque aliquid, omnis inventore
            unde earum eius.
          </p>
        </div>

        <div className="timeline-end timeline-box dark:bg-brand-navyblue border-none bg-brand-blue text-white dark:text-gray-300">
          <h3 className="text-2xl font-bold">Humanities</h3>
            <Lottie animationData={Humanities} className="size-28" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
            harum dolorem quis asperiores, officia, deserunt quibusdam quasi
            soluta minus autem provident consequatur voluptas unde pariatur
            corporis iusto deleniti? Eveniet, dolorem. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Itaque eum nobis officia impedit{" "}
          </p>
          <ul className="list list-disc ms-12 my-4">
            <li>Physics</li>
            <li>Chemistry</li>
            <li>Higher Mathematics</li>
            <li>Biology</li>
          </ul>
          <p>
            accusantium perspiciatis distinctio earum esse a possimus iure fuga
            rerum, quae ea debitis. Debitis optio vel quos? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Excepturi atque similique
            natus aliquid ad debitis exercitationem autem quos corrupti
            aspernatur beatae labore error ea quis, adipisci inventore
            doloremque dicta suscipit.
          </p>
        </div>

        <div className="timeline-start timeline-box dark:bg-brand-navyblue border-none bg-brand-blue text-white dark:text-gray-300">
          <h3 className="text-2xl font-bold">Business studies</h3>
            <Lottie animationData={Business} className="size-28" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            perspiciatis iusto illum dignissimos perferendis sit facilis
            mollitia? Sed qui beatae, nobis numquam ipsam reprehenderit dolorem,
            iste consequatur pariatur nulla modi. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Qui vero doloribus recusandae quo x
          </p>
          <ul className="list list-disc ms-12 my-4">
            <li>Physics</li>
            <li>Chemistry</li>
            <li>Higher Mathematics</li>
            <li>Biology</li>
          </ul>
          <p>
            explicabo laudantium molestias itaque architecto nulla minus
            consequuntur, labore tenetur, ex rerum esse. Laboriosam, odit!
            Repudiandae, minima! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatum dolor aut perferendis dolore obcaecati
            non cum magni voluptatibus architecto! Suscipit quam quidem maiores
            voluptate ea debitis placeat consequuntur esse nulla.
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <Timeline></Timeline>
      </div>
    </section>
  );
};

export default Departments;
