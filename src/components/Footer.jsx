// function Footer() {
//     return (
//       <footer className="bg-gray-800 text-white p-4 text-center">
//         <p>&copy; 2023 Water Footprint Calculator | Work in Progress 🚧</p>
//       </footer>
//     );
//   }
  
//   export default Footer;


import { motion } from "framer-motion";
import { IoWater } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-800 to-teal-700 text-white py-8"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-1">
            <IoWater className="text-3xl text-blue-200" />
            <h3 className="text-2xl font-bold">Water Footprint Calculator</h3>
          </div>
          <p className="text-gray-200 mb-1">
            © {new Date().getFullYear()} | All rights reserved
          </p>
          <div className="flex gap-6 mb-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition"
            >
              <FaGithub size={24} />
            </a> 
          </div> 
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;

