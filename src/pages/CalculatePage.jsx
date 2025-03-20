// import { useState, useEffect } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { FaSpinner } from "react-icons/fa";
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";
// import waterFootprints from "../waterFootprints.json"; // Adjust path as needed

// function CalculatePage() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [moreDetails, setMoreDetails] = useState("");
//   const [loadingDetails, setLoadingDetails] = useState(false);

//   const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

//   // Autocomplete suggestion logic
//   useEffect(() => {
//     if (input.trim() === "") {
//       setSuggestions([]);
//       return;
//     }
//     const filtered = waterFootprints.filter((item) =>
//       item.Product.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
//   }, [input]);

//   const handleSuggestionClick = (product) => {
//     setInput(product.Product);
//     setSelectedProduct(product);
//     setSuggestions([]);
//   };

//   const handleCalculate = async () => {
//     const words = input.toLowerCase().split(" ");
//     if (words.some((word) => forbiddenWords.includes(word))) {
//       setResult("undefined");
//       setMoreDetails("");
//       return;
//     }

//     setLoading(true);
//     setResult("");
//     setMoreDetails("");

//     if (selectedProduct && selectedProduct.Product.toLowerCase() === input.toLowerCase()) {
//       // Use JSON data if suggestion is selected
//       setResult(`**Water Footprint for ${selectedProduct.Product}: ${selectedProduct["Water Footprint (Liters)"]} Liters**`);
//     } else {
//       // Fallback to AI calculation
//       try {
//         const response = await axios.post(
//           "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
//           {
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `Calculate the water footprint for ${input}, including breakdown by lifecycle stage (growing/production, processing, transportation, additives), total in liters, a relatable comparison, and three recommendations to reduce it with water savings estimates. Format the response in markdown. Do not calculate for inputs containing 'human,' 'woman,' 'man,' 'body,' 'animal,' or 'building.' Return 'undefined' instead.`,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             headers: {
//               "Authorization": `Bearer AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const text = response.data.candidates[0].content.parts[0].text;
//         setResult(text);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setResult("Error occurred while calculating.");
//       }
//     }
//     setLoading(false);
//   };

//   const handleMoreDetails = async () => {
//     if (!result || result === "undefined" || result.includes("Error")) return;

//     setLoadingDetails(true);
//     try {
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Provide a detailed breakdown of the water footprint for ${input}, including specific examples of water usage in growing/production, processing, transportation, and additives (if applicable). Format the response in markdown with clear sections.`,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Authorization": `Bearer AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const text = response.data.candidates[0].content.parts[0].text;
//         setMoreDetails(text);
//       } catch (error) {
//         console.error("Error fetching more details:", error);
//         setMoreDetails("Error occurred while fetching more details.");
//       } finally {
//         setLoadingDetails(false);
//       }
//   };

//   const handleImageProcess = () => {
//     if (fileName) alert(fileName);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-blue-800 flex items-center justify-center gap-2">
//             Calculate Your Water Footprint
//             <IoWater className="text-blue-600 animate-pulse" />
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 rounded-full" />
//           <p className="text-gray-600 mt-2 text-lg">
//             Enter a product to see its water impact.
//           </p>
//         </motion.div>

//         {/* Input Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg mx-auto"
//         >
//           {/* Input and Suggestions Wrapper */}
//           <div className="relative">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => {
//                 setInput(e.target.value);
//                 setSelectedProduct(null); // Reset selected product when typing
//               }}
//               placeholder="e.g., 1 kg rice"
//               className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-800 placeholder-gray-400"
//             />
//             {/* Suggestions Dropdown */}
//             {suggestions.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto border border-gray-200"
//               >
//                 {suggestions.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleSuggestionClick(item)}
//                     className="p-3 hover:bg-blue-100 cursor-pointer text-gray-800 flex justify-between"
//                   >
//                     <span>{item.Product}</span>
//                     <span className="text-blue-600">{item["Water Footprint (Liters)"]} L</span>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </div>
//           <button
//             onClick={handleCalculate}
//             className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? (
//               <FaSpinner className="animate-spin mr-2" />
//             ) : (
//               <IoWater className="mr-2" />
//             )}
//             {loading ? "Calculating..." : "Calculate"}
//           </button>
//         </motion.div>

//         {/* Result Display */}
//         {result && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-12 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto border-l-4 border-blue-400"
//           >
//             <ReactMarkdown
//               components={{
//                 h1: ({ node, ...props }) => (
//                   <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-2">
//                     <IoWater className="text-blue-500" />
//                     <span {...props} />
//                   </h1>
//                 ),
//                 h2: ({ node, ...props }) => (
//                   <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2" {...props} />
//                 ),
//                 p: ({ node, ...props }) => (
//                   <p className="text-gray-700 mb-4" {...props} />
//                 ),
//                 li: ({ node, ...props }) => (
//                   <li className="flex items-start mb-3">
//                     <IoWater className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
//                     <span className="text-gray-800" {...props} />
//                   </li>
//                 ),
//                 strong: ({ node, ...props }) => (
//                   <strong className="text-blue-700" {...props} />
//                 ),
//               }}
//             >
//               {result}
//             </ReactMarkdown>
//             {/* More Details Section */}
//             {selectedProduct && !moreDetails && (
//               <button
//                 onClick={handleMoreDetails}
//                 className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50"
//                 disabled={loadingDetails}
//               >
//                 {loadingDetails ? (
//                   <FaSpinner className="animate-spin mr-2" />
//                 ) : (
//                   <IoWater className="mr-2" />
//                 )}
//                 {loadingDetails ? "Fetching..." : "Get More Details"}
//               </button>
//             )}
//             {moreDetails && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.5 }}
//                 className="mt-6 p-4 bg-blue-50 rounded-lg"
//               >
//                 <ReactMarkdown
//                   components={{
//                     h1: ({ node, ...props }) => (
//                       <h1 className="text-2xl font-bold text-blue-800 mb-4" {...props} />
//                     ),
//                     h2: ({ node, ...props }) => (
//                       <h2 className="text-lg font-semibold text-gray-800 mt-3 mb-1" {...props} />
//                     ),
//                     p: ({ node, ...props }) => (
//                       <p className="text-gray-700 mb-3" {...props} />
//                     ),
//                     li: ({ node, ...props }) => (
//                       <li className="flex items-start mb-2">
//                         <IoWater className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
//                         <span className="text-gray-800" {...props} />
//                       </li>
//                     ),
//                   }}
//                 >
//                   {moreDetails}
//                 </ReactMarkdown>
//               </motion.div>
//             )}
//           </motion.div>
//         )}

//         {/* Image Upload Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mt-12 max-w-lg mx-auto"
//         >
//           <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
//             Or Upload an Image
//           </h3>
//           <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setFileName(e.target.files[0]?.name || "")}
//                 className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
//               />
//               <p className="text-gray-500 mt-2">
//                 Drag & drop an image here or click to upload (Coming Soon!)
//               </p>
//             </div>
//             <button
//               onClick={handleImageProcess}
//               className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md"
//             >
//               Process Image
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default CalculatePage;




















// import { useState, useEffect } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { FaSpinner, FaTint, FaTimes } from "react-icons/fa"; 
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";
// import waterFootprints from "../waterFootprints.json"; 

// function CalculatePage() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [moreDetails, setMoreDetails] = useState("");
//   const [loadingDetails, setLoadingDetails] = useState(false);

//   const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

//   // Autocomplete suggestion logic
//   useEffect(() => {
//     if (input.trim() === "") {
//       setSuggestions([]);
//       return;
//     }
//     const filtered = waterFootprints.filter((item) =>
//       item.Product.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
//   }, [input]);

//   const handleSuggestionClick = (product) => {
//     setInput(product.Product);
//     setSelectedProduct(product);
//     setSuggestions([]);
//   };

//   const handleClearInput = () => {
//     setInput("");
//     setSuggestions([]);
//     setSelectedProduct(null);
//   };

//   const handleCalculate = async () => {
//     const words = input.toLowerCase().split(" ");
//     if (words.some((word) => forbiddenWords.includes(word))) {
//       setResult("undefined");
//       setMoreDetails("");
//       return;
//     }

//     setLoading(true);
//     setResult("");
//     setMoreDetails("");

//     if (selectedProduct && selectedProduct.Product.toLowerCase() === input.toLowerCase()) {
//       // Use JSON data if suggestion is selected
//       setResult(`**Water Footprint for ${selectedProduct.Product}: ${selectedProduct["Water Footprint (Liters)"]} Liters**`);
//     } else {
//       // Fallback to AI calculation
//       try {
//         const response = await axios.post(
//           "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
//           {
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `Calculate the water footprint for ${input}, including breakdown by lifecycle stage (growing/production, processing, transportation, additives), total in liters, a relatable comparison, and three recommendations to reduce it with water savings estimates. Format the response in markdown. Do not calculate for inputs containing 'human,' 'woman,' 'man,' 'body,' 'animal,' or 'building.' Return 'undefined' instead.`,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             headers: {
//               "Authorization": `Bearer AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const text = response.data.candidates[0].content.parts[0].text;
//         setResult(text);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setResult("Error occurred while calculating.");
//       }
//     }
//     setLoading(false);
//   };

//   const handleMoreDetails = async () => {
//     if (!result || result === "undefined" || result.includes("Error")) return;

//     setLoadingDetails(true);
//     try {
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Provide a detailed breakdown of the water footprint for ${input}, including specific examples of water usage in growing/production, processing, transportation, and additives (if applicable). Format the response in markdown with clear sections.`,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Authorization": `Bearer AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const text = response.data.candidates[0].content.parts[0].text;
//         setMoreDetails(text);
//       } catch (error) {
//         console.error("Error fetching more details:", error);
//         setMoreDetails("Error occurred while fetching more details.");
//       } finally {
//         setLoadingDetails(false);
//       }
//   };

//   const handleImageProcess = () => {
//     if (fileName) alert(fileName);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-blue-800 flex items-center justify-center gap-2">
//             Calculate Your Water Footprint
//             <IoWater className="text-blue-600 animate-pulse" />
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 rounded-full" />
//           <p className="text-gray-600 mt-2 text-lg">
//             Enter a product to see its water impact.
//           </p>
//         </motion.div>

//         {/* Input Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg mx-auto"
//         >
//           {/* Input and Suggestions Wrapper */}
//           <div className="relative">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   setSelectedProduct(null); 
//                 }}
//                 placeholder="e.g., 1 kg rice"
//                 required
//                 className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-800 placeholder-gray-400"
//               />
//               {input && (
//                 <button
//                   onClick={handleClearInput}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   <FaTimes size={18} />
//                 </button>
//               )}
//             </div>
//             {/* Suggestions Dropdown */}
//             {suggestions.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto border border-gray-200"
//               >
//                 {suggestions.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleSuggestionClick(item)}
//                     className="p-3 hover:bg-blue-100 cursor-pointer text-gray-800"
//                   >
//                     {item.Product}
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </div>
//           <button
//             onClick={handleCalculate}
//             className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? (
//               <FaSpinner className="animate-spin mr-2" />
//             ) : (
//               <IoWater className="mr-2" />
//             )}
//             {loading ? "Calculating..." : "Calculate"}
//           </button>
//         </motion.div>

//         {/* Result Display */}
//         {result && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-12 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto border-l-4 border-blue-400 text-center" // Added text-center
//           >
//             <ReactMarkdown
//               components={{
//                 h1: ({ node, ...props }) => (
//                   <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center gap-2">
//                     <FaTint className="text-blue-500" /> {/* Changed to FaTint */}
//                     <span {...props} />
//                   </h1>
//                 ),
//                 h2: ({ node, ...props }) => (
//                   <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2" {...props} />
//                 ),
//                 p: ({ node, ...props }) => (
//                   <p className="text-gray-700 mb-4" {...props} />
//                 ),
//                 li: ({ node, ...props }) => (
//                   <li className="flex items-start mb-3 justify-center">
//                     <IoWater className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
//                     <span className="text-gray-800" {...props} />
//                   </li>
//                 ),
//                 strong: ({ node, ...props }) => (
//                   <strong className="text-blue-700" {...props} />
//                 ),
//               }}
//             >
//               {result}
//             </ReactMarkdown>
//             {/* More Details Section */}
//             {selectedProduct && !moreDetails && (
//               <button
//                 onClick={handleMoreDetails}
//                 className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50 center"
//                 disabled={loadingDetails}
//               >
//                 {loadingDetails ? (
//                   <FaSpinner className="animate-spin mr-2" />
//                 ) : (
//                   <IoWater className="mr-2" />
//                 )}
//                 {loadingDetails ? "Fetching..." : "Get More Details"}
//               </button>
//             )}
//             {moreDetails && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 transition={{ duration: 0.5 }}
//                 className="mt-6 p-4 bg-blue-50 rounded-lg text-left" // Keep more details left-aligned for readability
//               >
//                 <ReactMarkdown
//                   components={{
//                     h1: ({ node, ...props }) => (
//                       <h1 className="text-2xl font-bold text-blue-800 mb-4" {...props} />
//                     ),
//                     h2: ({ node, ...props }) => (
//                       <h2 className="text-lg font-semibold text-gray-800 mt-3 mb-1" {...props} />
//                     ),
//                     p: ({ node, ...props }) => (
//                       <p className="text-gray-700 mb-3" {...props} />
//                     ),
//                     li: ({ node, ...props }) => (
//                       <li className="flex items-start mb-2">
//                         <IoWater className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
//                         <span className="text-gray-800" {...props} />
//                       </li>
//                     ),
//                   }}
//                 >
//                   {moreDetails}
//                 </ReactMarkdown>
//               </motion.div>
//             )}
//           </motion.div>
//         )}

//         {/* Image Upload Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mt-12 max-w-lg mx-auto"
//         >
//           <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
//             Or Upload an Image
//           </h3>
//           <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setFileName(e.target.files[0]?.name || "")}
//                 className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
//               />
//               <p className="text-gray-500 mt-2">
//                 Drag & drop an image here or click to upload (Coming Soon!)
//               </p>
//             </div>
//             <button
//               onClick={handleImageProcess}
//               className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md"
//             >
//               Process Image
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default CalculatePage;






























import { useState, useEffect } from "react";
import { FaSpinner, FaTint, FaTimes, FaLeaf, FaRecycle, FaShoppingBag } from "react-icons/fa"; // Added icons for tips
import { IoWater } from "react-icons/io5";
import { motion } from "framer-motion";
import waterFootprints from "../waterFootprints.json";
import { calculateWaterFootprint, getMoreDetails } from "../tunedModel"; // Import new functions

function CalculatePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [moreDetails, setMoreDetails] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);

  const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

  // Autocomplete suggestion logic
  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = waterFootprints.filter((item) =>
      item.Product.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
  }, [input]);

  const handleSuggestionClick = (product) => {
    setInput(product.Product);
    setSelectedProduct(product);
    setSuggestions([]);
  };

  const handleClearInput = () => {
    setInput("");
    setSuggestions([]);
    setSelectedProduct(null);
  };

  const handleCalculate = async () => {
    const words = input.toLowerCase().split(" ");
    if (words.some((word) => forbiddenWords.includes(word))) {
      setResult("undefined");
      setMoreDetails("");
      return;
    }

    setLoading(true);
    setResult("");
    setMoreDetails("");

    if (selectedProduct && selectedProduct.Product.toLowerCase() === input.toLowerCase()) {
      // Use JSON data if suggestion is selected
      setResult({
        breakdown: [
          {
            stage: "Total",
            amount: parseFloat(selectedProduct["Water Footprint (Liters)"]),
            details: "Total water footprint from all lifecycle stages.",
          },
        ],
        total: parseFloat(selectedProduct["Water Footprint (Liters)"]),
        comparison: "Equivalent to filling a small bucket.",
        tips: [
          "Switch to reusable alternatives to save 50 liters per year.",
          "Recycle plastic products to save 20 liters per item.",
          "Choose locally sourced materials to save 10 liters per purchase.",
        ],
      });
      setLoading(false);
    } else {
      // Fallback to AI calculation using tunedModel
      await calculateWaterFootprint(input, setResult, setLoading);
    }
  };

  const handleMoreDetails = async () => {
    if (!result || result === "undefined" || result === "Error occurred while calculating.") return;
    await getMoreDetails(input, setMoreDetails, setLoadingDetails);
  };

  const handleImageProcess = () => {
    if (fileName) alert(fileName);
  };

  // Icons for tips
  const tipIcons = [FaLeaf, FaRecycle, FaShoppingBag];

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
            Calculate Your Water Footprint
            <IoWater className="text-blue-600 animate-pulse" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-2 text-lg">
            Enter a product to see its water impact.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg mx-auto"
        >
          {/* Input and Suggestions Wrapper */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setSelectedProduct(null);
                }}
                placeholder="e.g., 1 kg rice"
                required
                className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-800 placeholder-gray-400"
              />
              {input && (
                <button
                  onClick={handleClearInput}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={18} />
                </button>
              )}
            </div>
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto border border-gray-200"
              >
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="p-3 hover:bg-blue-100 cursor-pointer text-gray-800"
                  >
                    {item.Product}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
          <button
            onClick={handleCalculate}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <IoWater className="mr-2" />
            )}
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </motion.div>

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto border-l-4 border-blue-400 text-center"
          >
            {result === "undefined" || result === "Error occurred while calculating." ? (
              <p className="text-gray-700">{result}</p>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center gap-2">
                  <FaTint className="text-blue-500" />
                  Water Footprint for {input}: {result.total} Liters
                </h1>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Breakdown</h2>
                  {result.breakdown.map((stage, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-gray-700">
                        <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.details}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Comparison:</strong> {result.comparison}
                </p>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Tips to Reduce Water Footprint</h2>
                  {result.tips.map((tip, index) => {
                    const Icon = tipIcons[index % tipIcons.length];
                    return (
                      <div key={index} className="flex items-center justify-center mb-3">
                        <Icon className="text-blue-500 mr-3" />
                        <span className="text-gray-800">{tip}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {/* More Details Section */}
            {selectedProduct && !moreDetails && result !== "undefined" && result !== "Error occurred while calculating." && (
              <button
                onClick={handleMoreDetails}
                className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50 mx-auto"
                disabled={loadingDetails}
              >
                {loadingDetails ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <IoWater className="mr-2" />
                )}
                {loadingDetails ? "Fetching..." : "Get More Details"}
              </button>
            )}
            {moreDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-blue-50 rounded-lg text-left"
              >
                {moreDetails === "undefined" || moreDetails === "Error occurred while fetching more details." ? (
                  <p className="text-gray-700">{moreDetails}</p>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Breakdown</h2>
                    {moreDetails.detailedBreakdown.map((stage, index) => (
                      <div key={index} className="mb-3">
                        <p className="text-gray-700">
                          <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.example}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Image Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-lg mx-auto"
        >
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            Or Upload an Image
          </h3>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
              />
              <p className="text-gray-500 mt-2">
                Drag & drop an image here or click to upload (Coming Soon!)
              </p>
            </div>
            <button
              onClick={handleImageProcess}
              className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md"
            >
              Process Image
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CalculatePage;