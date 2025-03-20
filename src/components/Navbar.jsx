// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { FaBars, FaTimes } from "react-icons/fa";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const changeLanguage = (lng) => i18n.changeLanguage(lng);

//   return (
//     <nav className="bg-blue-600 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">Water Footprint</Link>
//         <div className="hidden md:flex space-x-4 items-center">
//           <Link to="/" className="hover:text-gray-300">{t("home")}</Link>
//           <Link to="/calculate" className="hover:text-gray-300">{t("calculate")}</Link>
//           <Link to="/resources" className="hover:text-gray-300">{t("resources")}</Link>
//           <select
//             onChange={(e) => changeLanguage(e.target.value)}
//             className="bg-blue-700 text-white p-1 rounded"
//           >
//             <option value="en">English</option>
//             <option value="hi">हिन्दी</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>
//         <button className="md:hidden" onClick={toggleMenu}>
//           {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="md:hidden mt-2 space-y-2">
//           <Link to="/" className="block hover:text-gray-300" onClick={toggleMenu}>{t("home")}</Link>
//           <Link to="/calculate" className="block hover:text-gray-300" onClick={toggleMenu}>{t("calculate")}</Link>
//           <Link to="/resources" className="block hover:text-gray-300" onClick={toggleMenu}>{t("resources")}</Link>
//           <select
//             onChange={(e) => changeLanguage(e.target.value)}
//             className="bg-blue-700 text-white p-1 rounded w-full"
//           >
//             <option value="en">English</option>
//             <option value="hi">हिन्दी</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
















import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className="bg-blue-900/80 backdrop-blur-md text-white py-4 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <IoWater className="text-blue-300 text-3xl" />
          <span className="text-2xl font-bold">AquaMeter</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-200 transition duration-300"
          >
            {t("home")}
          </Link>
          <Link
            to="/calculate"
            className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition shadow-md"
          >
            {t("calculate")}
          </Link>
          <Link
            to="/resources"
            className="hover:text-blue-200 transition duration-300"
          >
            {t("resources")}
          </Link>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-blue-800/50 text-white p-2 rounded-lg border border-blue-600 hover:bg-blue-800 transition"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white hover:text-blue-200 transition"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="md:hidden bg-blue-900/90 backdrop-blur-md mt-2 px-4 py-6 space-y-4"
        >
          <Link
            to="/"
            className="block text-lg hover:text-blue-200 transition"
            onClick={toggleMenu}
          >
            {t("home")}
          </Link>
          <Link
            to="/calculate"
            className="block text-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition"
            onClick={toggleMenu}
          >
            {t("calculate")}
          </Link>
          <Link
            to="/resources"
            className="block text-lg hover:text-blue-200 transition"
            onClick={toggleMenu}
          >
            {t("resources")}
          </Link>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="w-full bg-blue-800/50 text-white p-2 rounded-lg border border-blue-600 hover:bg-blue-800 transition"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
          </select>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;