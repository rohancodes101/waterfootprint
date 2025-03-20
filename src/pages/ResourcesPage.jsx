// function ResourcesPage() {
//     return (
//       <div className="container mx-auto py-8">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Resources</h2>
//         <div className="space-y-8">
//           <section>
//             <h3 className="text-2xl font-bold text-blue-600 mb-4">What is a Water Footprint?</h3>
//             <p className="text-gray-700">
//               A water footprint measures the total freshwater used to produce goods and services we consume daily.
//             </p>
//           </section>
//           <section>
//             <h3 className="text-2xl font-bold text-blue-600 mb-4">How to Reduce It</h3>
//             <ul className="list-disc pl-6 text-gray-700">
//               <li>Opt for plant-based foods 🌱.</li>
//               <li>Choose sustainable products.</li>
//               <li>Reduce waste and recycle.</li>
//             </ul>
//           </section>
//         </div>
//       </div>
//     );
//   }
  
//   export default ResourcesPage;
























import { motion } from "framer-motion";
import { IoWater } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";
import { FaRecycle } from "react-icons/fa";

function ResourcesPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 flex items-center justify-center gap-2">
            Resources <IoWater className="text-blue-600 animate-pulse" />
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-2 text-lg">
            Learn about water footprints and how to reduce them.
          </p>
        </motion.div>

        {/* Section 1: What is a Water Footprint? */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <GiWaterDrop className="text-blue-500 text-4xl" />
            <h3 className="text-2xl font-bold text-blue-700">What is a Water Footprint?</h3>
          </div>
          <p className="text-gray-700">
            The term “water footprint” measures the amount of fresh water used to produce goods and services we consume daily. Growing and processing crops and livestock consumes large quantities of water, making the water footprint of food particularly high. Animal products like meat, dairy, and eggs have an even higher water footprint than fruits, vegetables, and beans. Your diet is the largest part of your personal water footprint, and preventing food waste is key—discarded food wastes not just water, but all resources involved in its production.
          </p>
          <img
            src="https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Farming"
            className="mt-4 rounded-lg shadow-md w-full object-cover"
          />
        </motion.section>

        {/* Section 2: Three Components of Water Footprints */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <IoWater className="text-blue-500 text-4xl" />
            <h3 className="text-2xl font-bold text-blue-700">Three Components of Water Footprints</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Blue Water Footprint</h4>
              <p className="text-gray-700">
                The amount of surface water and groundwater required (evaporated or used directly) to produce an item, mainly for crop irrigation.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-green-600 mb-2">Green Water Footprint</h4>
              <p className="text-gray-700">
                The amount of rainwater required (evaporated or used directly) to make an item, such as in dry farming where crops rely solely on rain.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-gray-600 mb-2">Grey Water Footprint</h4>
              <p className="text-gray-700">
                The amount of fresh water needed to dilute pollutants from agricultural runoff or soil leaching to meet EPA water quality standards.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 3: How and Where Food Comes From */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <GiWaterDrop className="text-blue-500 text-4xl" />
            <h3 className="text-2xl font-bold text-blue-700">How and Where Food Comes From</h3>
          </div>
          <p className="text-gray-700">
            Diets heavy in processed foods—like potato chips or ready-made meals—use significantly more water than whole foods. For example, ounce for ounce, potato chips have a higher water footprint than whole potatoes due to water used in growing, cleaning, frying, packaging, and transport. This total water usage is called “virtual water,” encompassing every step from farm to table.
          </p>
          <img
            src="https://media.istockphoto.com/id/1156873334/photo/dairy-factory-in-africa.jpg?s=612x612&w=0&k=20&c=qlGEjmO2Zh6It4L9UcU9zn_KeE0U6tCjfi-NclzvYic="
            alt="Food Processing"
            className="mt-4 rounded-lg shadow-md w-full object-cover"
          />
        </motion.section>

        {/* Section 4: Hidden Water */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <IoWater className="text-blue-500 text-4xl" />
            <h3 className="text-2xl font-bold text-blue-700">Hidden Water</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Hidden water is the unseen water used in producing raw materials and consumer goods like paper, plastic, metal, and fabric. It’s calculated by summing the water required at each production step.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Blue Water</h4>
              <p className="text-gray-700">
                Surface and groundwater evaporated or used directly in production.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-green-600 mb-2">Green Water</h4>
              <p className="text-gray-700">
                Rainwater evaporated or used directly to create a product.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-gray-600 mb-2">Grey Water</h4>
              <p className="text-gray-700">
                Freshwater needed to dilute wastewater to maintain quality standards.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Save Water with the Three Rs */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaRecycle className="text-green-500 text-4xl" />
            <h3 className="text-2xl font-bold text-blue-700">Save Water with the Three Rs</h3>
          </div>
          <p className="text-gray-700 mb-4">
            “Reduce, Reuse, Recycle” saves water by cutting demand for new products. In 2012, the US discarded over 24 million tons of paper and 29 million tons of plastic—both water-intensive materials that can be recycled. Recycling a pound of paper saves 3.5 gallons of water!
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <IoWater className="text-blue-500 text-2xl mt-1" />
              <span className="text-gray-700">
                <strong>Reduce:</strong> Buy fewer disposable goods to lower production water use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <IoWater className="text-blue-500 text-2xl mt-1" />
              <span className="text-gray-700">
                <strong>Reuse:</strong> Opt for thrifted or reusable items, especially clothing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <IoWater className="text-blue-500 text-2xl mt-1" />
              <span className="text-gray-700">
                <strong>Recycle:</strong> Recycle paper and plastic to save gallons of water per item.
              </span>
            </li>
          </ul>
          <img
            src="https://plus.unsplash.com/premium_photo-1683063005230-ec93739b6dd8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVjeWNsaW5nfGVufDB8fDB8fHww"
            alt="Recycling"
            className="mt-4 rounded-lg shadow-md w-full object-cover"
          />
        </motion.section>
      </div>
    </div>
  );
}

export default ResourcesPage;