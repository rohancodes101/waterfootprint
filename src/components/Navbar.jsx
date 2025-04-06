// //best best best
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const changeLanguage = (lng) => i18n.changeLanguage(lng);

//   const menuVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <nav className="bg-blue-900/80 backdrop-blur-md text-white py-4 fixed w-full top-0 z-50 shadow-lg">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         {/* Logo and Title */}
//         <Link to="/" className="flex items-center gap-2">
//           <IoWater className="text-blue-300 text-3xl" />
//           <span className="text-2xl font-bold">AquaMeter</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link
//             to="/"
//             className="hover:text-blue-200 transition duration-300"
//           >
//             {t("home")}
//           </Link>
//           <Link
//             to="/calculate"
//             className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition shadow-md"
//           >
//             {t("calculate")}
//           </Link>
//           <Link
//             to="/resources"
//             className="hover:text-blue-200 transition duration-300"
//           >
//             {t("resources")}
//           </Link>
//           <Link
//             to="/dashboard"
//             className="hover:text-blue-200 transition duration-300"
//           >
//             {t("Dashboard")}
//           </Link>
//           <select
//             onChange={(e) => changeLanguage(e.target.value)}
//             className="bg-blue-800/50 text-white p-2 rounded-lg border border-blue-600 hover:bg-blue-800 transition"
//           >
//             <option value="en">English</option>
//             <option value="hi">हिन्दी</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </div>

//         {/* Hamburger Button */}
//         <button
//           className="md:hidden text-white hover:text-blue-200 transition"
//           onClick={toggleMenu}
//         >
//           {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           variants={menuVariants}
//           initial="hidden"
//           animate="visible"
//           className="md:hidden bg-blue-900/90 backdrop-blur-md mt-2 px-4 py-6 space-y-4"
//         >
//           <Link
//             to="/"
//             className="block text-lg hover:text-blue-200 transition"
//             onClick={toggleMenu}
//           >
//             {t("home")}
//           </Link>
//           <Link
//             to="/calculate"
//             className="block text-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition"
//             onClick={toggleMenu}
//           >
//             {t("calculate")}
//           </Link>
//           <Link
//             to="/resources"
//             className="block text-lg hover:text-blue-200 transition"
//             onClick={toggleMenu}
//           >
//             {t("resources")}
//           </Link>
//           <Link
//             to="/dashboard"
//             className="block text-lg hover:text-blue-200 transition"
//             onClick={toggleMenu}
//           >
//             {t("Dashboard")}
//           </Link>
//           <select
//             onChange={(e) => changeLanguage(e.target.value)}
//             className="w-full bg-blue-800/50 text-white p-2 rounded-lg border border-blue-600 hover:bg-blue-800 transition"
//           >
//             <option value="en">English</option>
//             <option value="hi">हिन्दी</option>
//             <option value="te">తెలుగు</option>
//           </select>
//         </motion.div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


































//to the language
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";
// import Translate from "../Translate"; // Import your Translate component

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const changeLanguage = (lng) => i18n.changeLanguage(lng);

//   const menuVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <nav className="bg-blue-900/80 backdrop-blur-md text-white py-4 fixed w-full top-0 z-50 shadow-lg">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         {/* Logo and Title */}
//         <Link to="/" className="flex items-center gap-2">
//           <IoWater className="text-blue-300 text-3xl" />
//           <span className="text-2xl font-bold">AquaMeter</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link
//             to="/"
//             className="hover:text-blue-200 transition duration-300"
//           >
//             {t("home")}
//           </Link>
//           <Link
//             to="/calculate"
//             className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition shadow-md"
//           >
//             {t("calculate")}
//           </Link>
//           <Link
//             to="/resources"
//             className="hover:text-blue-200 transition duration-300"
//           >
//             {t("resources")}
//           </Link>
//           <Link
//             to="/dashboard"
//             className="hover:text-blue-200 transition duration-300"
//           >
//             {t("Dashboard")}
//           </Link>
//           {/* <Translate />  */}
//           <div style={{ marginLeft: '10px' }}>
//             <Translate />
//           </div>
//         </div>

//         {/* Hamburger Button */}
//         <button
//           className="md:hidden text-white hover:text-blue-200 transition"
//           onClick={toggleMenu}
//         >
//           {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           variants={menuVariants}
//           initial="hidden"
//           animate="visible"
//           className="md:hidden bg-blue-900/90 backdrop-blur-md mt-2 px-4 py-6 space-y-4"
//         >
//           <Link
//             to="/"
//             className="block text-lg hover:text-blue-200 transition"
//             onClick={toggleMenu}
//           >
//             {t("home")}
//           </Link>
//           <Link
//             to="/calculate"
//             className="block text-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition"
//             onClick={toggleMenu}
//           >
//             {t("calculate")}
//           </Link>
//           <Link
//             to="/resources"
//             className="block text-lg hover:text-blue-200 transition"
//             onClick={toggleMenu}
//           >
//             {t("resources")}
//           </Link>
//           <Link
//             to="/dashboard"
//             className="block text-lg hover:text-blue-200 transition"
//             onClick={toggleMenu}
//           >
//             {t("Dashboard")}
//           </Link>
//           <Translate /> {/*Render Translate in mobile menu*/}
//         </motion.div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
























import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { motion } from "framer-motion";
import Translate from "../Translate"; // Import your Translate component

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
            className="hover:text-blue-200 transition duration-300 px-3 py-2 rounded"
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
            className="hover:text-blue-200 transition duration-300 px-3 py-2 rounded"
          >
            {t("resources")}
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-blue-200 transition duration-300 px-3 py-2 rounded"
          >
            {t("Dashboard")}
          </Link>
          <div className="relative">
            <Translate /> {/* Render the Translate component */}
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white hover:text-blue-200 transition p-2"
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
            className="block text-lg hover:text-blue-200 transition px-3 py-2 rounded"
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
            className="block text-lg hover:text-blue-200 transition px-3 py-2 rounded"
            onClick={toggleMenu}
          >
            {t("resources")}
          </Link>
          <Link
            to="/dashboard"
            className="block text-lg hover:text-blue-200 transition px-3 py-2 rounded"
            onClick={toggleMenu}
          >
            {t("Dashboard")}
          </Link>
          <div className="relative">
            <Translate /> {/* Render Translate in mobile menu */}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;