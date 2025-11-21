import { Diamond } from "lucide-react";

const SectionHeading = ({children}) => {
  return (
    <div className="md:w-1/2 text-center mx-auto mb-12">
      <div className="divider dark:divider-warning divider-neutral">
        <Diamond className="w-8"></Diamond>
      </div>
      <h1 className="capitalize font-heading text-xl sm:text-2xl md:text-3xl font-black">
        {children}
      </h1>
      <div className="divider dark:divider-warning divider-neutral">
        <Diamond className="w-8"></Diamond>
      </div>
    </div>
  );
}

export default SectionHeading