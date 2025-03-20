// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion } from "framer-motion";
// import { FaWater, FaLeaf } from "react-icons/fa";

// function HomePage() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const slides = [
//     { src: "https://source.unsplash.com/1600x900/?water", text: "Water is life." },
//     { src: "https://source.unsplash.com/1600x900/?river", text: "Conserve our rivers." },
//     { src: "https://source.unsplash.com/1600x900/?lake", text: "Every drop counts." },
//   ];

//   const stats = [
//     { icon: <FaWater />, value: 1385, unit: "m³/year", label: "Avg. water footprint per person" },
//     { icon: <FaWater />, value: 15415, unit: "liters", label: "Water for 1 kg beef" },
//     { icon: <FaLeaf />, value: 92, unit: "%", label: "Agriculture water use" },
//   ];

//   const funFacts = [
//     "A cotton t-shirt takes 2,500 liters of water to produce!",
//     "One apple needs 70 liters to grow 🍎.",
//     "A cup of coffee? That’s 140 liters of water ☕.",
//   ];

//   return (
//     <div>
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index}>
//             <img src={slide.src} alt="Water" className="w-full h-96 object-cover" />
//             <p className="text-center text-white bg-black bg-opacity-50 py-2">{slide.text}</p>
//           </div>
//         ))}
//       </Slider>
//       <div className="container mx-auto py-8">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Water Footprint Stats</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               className="bg-white p-6 rounded-lg shadow-md text-center"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="text-4xl text-blue-600 mb-4">{stat.icon}</div>
//               <motion.span
//                 className="text-5xl font-bold text-green-600"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 1 }}
//               >
//                 {stat.value}
//               </motion.span>
//               <span className="text-xl ml-2">{stat.unit}</span>
//               <p className="mt-2 text-gray-600">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <div className="bg-gray-100 py-8">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Fun Facts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {funFacts.map((fact, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-md"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p className="text-gray-700">{fact}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;








import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FaWater, FaLeaf } from "react-icons/fa";
import { GiCow, GiCoffeeCup } from "react-icons/gi";
import { IoWater } from "react-icons/io5";

function HomePage() {
  const controls = useAnimation();

  // Animation for stats counter
  const animateCounter = async (target, duration) => {
    await controls.start({ opacity: 1 });
    return { value: target, transition: { duration } };
  };

  useEffect(() => {
    controls.start({ opacity: 0 });
  }, [controls]);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const slides = [
    { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", text: "Every drop matters." },
    { src: "https://i0.wp.com/eos.org/wp-content/uploads/2024/06/hands-water.jpg?fit=1200%2C675&ssl=1", text: "Conserve to preserve." },
    { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716", text: "Smart usage, sustainable future." },
  ];

  const stats = [
    { icon: <FaWater className="text-blue-500" />, value: 1385, unit: "m³/year", label: "Avg. Water Footprint per Person", duration: 2 },
    { icon: <GiCow className="text-green-600" />, value: 15415, unit: "liters", label: "Water for 1 kg Beef", duration: 2.5 },
    { icon: <FaLeaf className="text-teal-500" />, value: 92, unit: "%", label: "Agriculture Water Use", duration: 1.8 },
  ];

  const funFacts = [
    { text: "A cotton t-shirt takes 2,500 liters of water!", icon: <IoWater className="text-blue-600" /> },
    { text: "One apple needs 70 liters to grow 🍎.", icon: <FaLeaf className="text-green-500" /> },
    { text: "A cup of coffee? That’s 140 liters ☕.", icon: <GiCoffeeCup className="text-brown-600" /> },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Discover Your Water Footprint
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Understand how much water your daily choices consume and learn to conserve our precious resource.
          </p>
          <Link
            to="/calculate"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg"
          >
            Calculate Now
          </Link>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="relative">
                <img src={slide.src} alt="Water" className="w-full h-80 object-cover rounded-lg shadow-md" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent py-4 text-center">
                  <p className="text-white text-lg font-semibold">{slide.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
            Water Footprint Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <motion.span
                  className="text-6xl font-bold text-blue-600"
                  initial={{ value: 0 }}
                  whileInView={() => animateCounter(stat.value, stat.duration)}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-xl ml-2 text-gray-600">{stat.unit}</span>
                <p className="mt-4 text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
            Did You Know?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition transform"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-3xl mb-4">{fact.icon}</div>
                <p className="text-gray-800 font-medium">{fact.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;