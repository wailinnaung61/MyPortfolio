import { useAppContext } from "@/context/appContext";

const TimelineItem = ({ timeline: { title, meta, text, year } }) => {
  const { isDark } = useAppContext();
  return (
    <div
      className={`timeline relative block items-start rounded-full border-white border-opacity-20 first:mt-0 md:flex ${
        isDark ? "" : "bg-[#f7f8fa]"
      }`}
    >
      <span
        className={`timeline-year absolute top-0 left-12 mt-7 mr-12 min-w-[115px] rounded-full ${
          isDark
            ? "bg-primary bg-opacity-10 text-white"
            : "bg-[#e6eeea] text-gray-800"
        } p-1 text-center text-sm leading-none md:relative md:left-0`}
      >
        {year}
      </span>
      <div
        className={`timeline-right relative border-l-4 pt-16 pl-12 md:pt-6 ${
          isDark
            ? "border-white border-opacity-20"
            : "border-gray-300 border-opacity-80"
        }`}
      >
        <span
          className={`absolute -left-0.5 top-0 mt-1 h-full w-0 rounded-full ${
            isDark ? "bg-white bg-opacity-20" : "bg-gray-200 bg-opacity-80"
          }`}
        >
          <span
            className={`absolute left-0 top-6 z-10 inline-block h-6 w-6 -translate-x-1/2 transform rounded-full border-4 ${
              isDark
                ? "border-white border-opacity-20 bg-grey"
                : "border-gray-300 border-opacity-80 bg-white"
            }`}
          ></span>
          <span
            className={`absolute left-0 right-full top-6 -z-10 mt-2.5 h-1 w-8 translate-x-0 transform rounded-full ${
              isDark ? "bg-white bg-opacity-20" : "bg-gray-300 bg-opacity-80"
            } md:left-1/2 md:w-20 md:-translate-x-1/2`}
          ></span>
        </span>
        <h5 className="mb-0 text-primary">{title}</h5>
        <p className="mb-2 text-heading">{meta}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
