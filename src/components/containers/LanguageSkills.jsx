import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getLanguageskills } from "../../fetchers";
import { staggerContainer, staggerItem } from "../../lib/motion";
import { ProgressBar } from "../elements";

const LanguageSkills = () => {
  const { data } = useQuery("language-skills", getLanguageskills);

  if (!data) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer(0.1)}
      className="grid grid-cols-2 gap-7"
    >
      {data?.map((skill) => (
        <motion.div
          variants={staggerItem}
          className="col-span-2 md:col-span-1"
          key={skill.id}
        >
          <ProgressBar skill={skill} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LanguageSkills;
