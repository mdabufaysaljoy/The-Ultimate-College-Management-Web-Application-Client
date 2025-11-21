import About from "../About/About";
import Departments from "../Departments/Departments";
import Notice from "../../components/Notice/Notice";
import SimpleSlider from "../../components/Swiper/Swiper";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <div className="relative w-fit mx-auto md:pt-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-balooda-bangla py-8 text-center">
          নটর ডেম কলেজ
        </h1>
        {/* <p className="absolute top-32 -left-16 font-trio-bangla">উৎকর্ষ সাধনে অদম্য</p>
        <p className="absolute top-32 -right-16 font-trio-bangla">শৃংখলা রক্ষায় অনন্য</p> */}
        
      </div>
      <SimpleSlider></SimpleSlider>
      <About></About>
      <Departments></Departments>
      <Notice></Notice>
      <Contact></Contact>
    </div>
  );
};

export default Home;
