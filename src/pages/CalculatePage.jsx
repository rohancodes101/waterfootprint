
// import { useState, useEffect } from "react";
// import { FaSpinner, FaTint, FaTimes, FaLeaf, FaRecycle, FaShoppingBag } from "react-icons/fa";
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";
// import waterFootprints from "../waterFootprints.json";
// import { calculateWaterFootprint, getMoreDetails } from "../tunedModel";
// import { useTranslation } from "react-i18next";
// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
// import MarkdownIt from 'markdown-it';

// function CalculatePage() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [moreDetails, setMoreDetails] = useState("");
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const { t } = useTranslation();
//   const [imageResult, setImageResult] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [imagePreviewSrc, setImagePreviewSrc] = useState(null);
//   const [geminiOutput, setGeminiOutput] = useState("");
//   const [showGeminiOutput, setShowGeminiOutput] = useState(false);

//   const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

//   useEffect(() => {
//     if (input.trim() === "") {
//       setSuggestions([]);
//       return;
//     }
//     const filtered = waterFootprints.filter((item) =>
//       item.Product.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(filtered.slice(0, 5));
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
//       setResult({
//         breakdown: [
//           {
//             stage: "Total",
//             amount: parseFloat(selectedProduct["Water Footprint (Liters)"]),
//             details: "Total water footprint from all lifecycle stages.",
//           },
//         ],
//         total: parseFloat(selectedProduct["Water Footprint (Liters)"]),
//         comparison: "Equivalent to filling a small bucket.",
//         tips: [
//           "Switch to reusable alternatives to save 50 liters per year.",
//           "Recycle plastic products to save 20 liters per item.",
//           "Choose locally sourced materials to save 10 liters per purchase.",
//         ],
//       });
//       setLoading(false);
//     } else {
//       await calculateWaterFootprint(input, setResult, setLoading);
//     }
//   };

//   const handleMoreDetails = async () => {
//     if (!result || result === "undefined" || result === "Error occurred while calculating.") return;
//     await getMoreDetails(input, setMoreDetails, setLoadingDetails);
//   };

//   const handleImageProcess = async () => {
//     if (!fileName) return;

//     setImageLoading(true);
//     setGeminiOutput("");
//     setShowGeminiOutput(false);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       setImagePreviewSrc(e.target.result);
//       const imageBase64 = e.target.result.split(",")[1];

//       try {
//         let API_KEY = 'AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s'; //Replace with your API Key
//         const genAI = new GoogleGenerativeAI(API_KEY);
//         const model = genAI.getGenerativeModel({
//           model: "gemini-1.5-flash",
//           safetySettings: [
//             {
//               category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//               threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//             },
//           ],
//         });

//         const contents = [
//           {
//             role: 'user',
//             parts: [
//               { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
//               { text: "You have to analyze the image and give me only one word as to what is visible in the image. such as food, or any eatable, or any daily using stuff for which we can calculate the water footprint, if any any other non-relevant images like nature photo, or human, or any living being detected, Decline the request politely, No daily items found." }
//             ]
//           }
//         ];

//         const result = await model.generateContentStream({ contents });
//         let buffer = [];
//         let md = new MarkdownIt();
//         for await (let response of result.stream) {
//           buffer.push(response.text());
//         }
//         setGeminiOutput(md.render(buffer.join('')));
//         setShowGeminiOutput(true);

//       } catch (e) {
//         setGeminiOutput(`<hr>${e}`);
//         setShowGeminiOutput(true);
//       } finally {
//         setImageLoading(false);
//       }
//     };
//     reader.readAsDataURL(fileName);
//   };

//   const tipIcons = [FaLeaf, FaRecycle, FaShoppingBag];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12">
//              <div className="container mx-auto px-4">
//      {/* Header */}
//          <motion.div
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
//             className="mt-12 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto border-l-4 border-blue-400 text-center"
//           >
//             {result === "undefined" || result === "Error occurred while calculating." ? (
//               <p className="text-gray-700">{result}</p>
//             ) : (
//               <>
//                 <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center gap-2">
//                   <FaTint className="text-blue-500" />
//                   Water Footprint for {input}: <br />
//                   {result.total} Liters
//                     {/* {input}: {result.total}   */}

//                 </h1>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Breakdown</h2>
//                   {result.breakdown.map((stage, index) => (
//                     <div key={index} className="mb-2">
//                       <p className="text-gray-700">
//                         <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.details}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-4">
//                   <strong>Comparison:</strong> {result.comparison}
//                 </p>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Tips to Reduce Water Footprint</h2>
//                   {result.tips.map((tip, index) => {
//                     const Icon = tipIcons[index % tipIcons.length];
//                     return (
//                       <div key={index} className="flex items-center justify-center mb-3">
//                         <Icon className="text-blue-500 mr-3" />
//                         <span className="text-gray-800">{tip}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//             {/* More Details Section */}
//             {selectedProduct && !moreDetails && result !== "undefined" && result !== "Error occurred while calculating." && (
//               <button
//                 onClick={handleMoreDetails}
//                 className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50 mx-auto"
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
//                 className="mt-6 p-4 bg-blue-50 rounded-lg text-left"
//               >
//                 {moreDetails === "undefined" || moreDetails === "Error occurred while fetching more details." ? (
//                   <p className="text-gray-700">{moreDetails}</p>
//                 ) : (
//                   <>
//                     <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Breakdown</h2>
//                     {moreDetails.detailedBreakdown.map((stage, index) => (
//                       <div key={index} className="mb-3">
//                         <p className="text-gray-700">
//                           <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.example}
//                         </p>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </motion.div>
//             )}
//           </motion.div>
//         )}


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
//                 onChange={(e) => setFileName(e.target.files[0])}
//                 className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
//               />
//               <p className="text-gray-500 mt-2">
//                 Drag & drop an image here or click to upload.
//               </p>
//             </div>
//             <button
//               onClick={handleImageProcess}
//               className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md"
//               disabled={imageLoading || !fileName}
//             >
//               {imageLoading ? <FaSpinner className="animate-spin mr-2" /> : "Process Image"}
//             </button>
//           </div>
//         </motion.div>

//         {showGeminiOutput && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-8 p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto"
//           >
//             {imagePreviewSrc && <img src={imagePreviewSrc} alt="Preview" className="mb-4 max-w-full" />}
//             <div dangerouslySetInnerHTML={{ __html: geminiOutput }} />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CalculatePage;








































































// //best so far, all greatttttt
// import { useState, useEffect } from "react";
// import { FaSpinner, FaTint, FaTimes, FaLeaf, FaRecycle, FaShoppingBag } from "react-icons/fa";
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";
// import waterFootprints from "../waterFootprints.json";
// import { calculateWaterFootprint, getMoreDetails } from "../tunedModel";
// import { useTranslation } from "react-i18next";
// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
// import MarkdownIt from 'markdown-it';

// function CalculatePage() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [moreDetails, setMoreDetails] = useState("");
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const { t } = useTranslation();
//   const [imagePreviewSrc, setImagePreviewSrc] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [geminiOutput, setGeminiOutput] = useState("");
//   const [showGeminiOutput, setShowGeminiOutput] = useState(false);

//   const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

//   useEffect(() => {
//     if (input.trim() === "") {
//       setSuggestions([]);
//       return;
//     }
//     const filtered = waterFootprints.filter((item) =>
//       item.Product.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(filtered.slice(0, 5));
//   }, [input]);

//   // Handle file upload and immediate preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFileName(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImagePreviewSrc(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreviewSrc(null);
//     }
//     setGeminiOutput(""); // Reset output when new file is uploaded
//     setShowGeminiOutput(false);
//   };

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
//       setResult({
//         breakdown: [
//           {
//             stage: "Total",
//             amount: parseFloat(selectedProduct["Water Footprint (Liters)"]),
//             details: "Total water footprint from all lifecycle stages.",
//           },
//         ],
//         total: parseFloat(selectedProduct["Water Footprint (Liters)"]),
//         comparison: "Equivalent to filling a small bucket.",
//         tips: [
//           "Switch to reusable alternatives to save 50 liters per year.",
//           "Recycle plastic products to save 20 liters per item.",
//           "Choose locally sourced materials to save 10 liters per purchase.",
//         ],
//       });
//       setLoading(false);
//     } else {
//       await calculateWaterFootprint(input, setResult, setLoading);
//     }
//   };

//   const handleMoreDetails = async () => {
//     if (!result || result === "undefined" || result === "Error occurred while calculating.") return;
//     await getMoreDetails(input, setMoreDetails, setLoadingDetails);
//   };

//   const handleImageProcess = async () => {
//     if (!fileName) return;

//     setImageLoading(true);
//     setGeminiOutput("");
//     setShowGeminiOutput(false);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const imageBase64 = e.target.result.split(",")[1];

//       try {
//         let API_KEY = 'AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s'; // Replace with your actual API Key
//         const genAI = new GoogleGenerativeAI(API_KEY);
//         const model = genAI.getGenerativeModel({
//           model: "gemini-1.5-flash",
//           safetySettings: [
//             {
//               category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//               threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//             },
//           ],
//         });

//         const contents = [
//           {
//             role: 'user',
//             parts: [
//               { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
//               { text: "You have to analyze the image and give me only one word as to what is visible in the image. such as food, or any eatable, or any daily using stuff for which we can calculate the water footprint, if any any other non-relevant images like nature photo, or human, or any living being detected, Decline the request politely, No daily items found." }
//             ]
//           }
//         ];

//         const result = await model.generateContentStream({ contents });
//         let buffer = [];
//         let md = new MarkdownIt();
//         for await (let response of result.stream) {
//           buffer.push(response.text());
//         }
//         setGeminiOutput(md.render(buffer.join('')));
//         setShowGeminiOutput(true);

//       } catch (e) {
//         setGeminiOutput(`<hr>${e}`);
//         setShowGeminiOutput(true);
//       } finally {
//         setImageLoading(false);
//       }
//     };
//     reader.readAsDataURL(fileName);
//   };

//   const tipIcons = [FaLeaf, FaRecycle, FaShoppingBag];

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
//             className="mt-12 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto border-l-4 border-blue-400 text-center"
//           >
//             {result === "undefined" || result === "Error occurred while calculating." ? (
//               <p className="text-gray-700">{result}</p>
//             ) : (
//               <>
//                 <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center gap-2">
//                   <FaTint className="text-blue-500" />
//                   Water Footprint for {input}: <br />
//                   {result.total} Liters
//                 </h1>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Breakdown</h2>
//                   {result.breakdown.map((stage, index) => (
//                     <div key={index} className="mb-2">
//                       <p className="text-gray-700">
//                         <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.details}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-4">
//                   <strong>Comparison:</strong> {result.comparison}
//                 </p>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Tips to Reduce Water Footprint</h2>
//                   {result.tips.map((tip, index) => {
//                     const Icon = tipIcons[index % tipIcons.length];
//                     return (
//                       <div key={index} className="flex items-center justify-center mb-3">
//                         <Icon className="text-blue-500 mr-3" />
//                         <span className="text-gray-800">{tip}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//             {selectedProduct && !moreDetails && result !== "undefined" && result !== "Error occurred while calculating." && (
//               <button
//                 onClick={handleMoreDetails}
//                 className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50 mx-auto"
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
//                 className="mt-6 p-4 bg-blue-50 rounded-lg text-left"
//               >
//                 {moreDetails === "undefined" || moreDetails === "Error occurred while fetching more details." ? (
//                   <p className="text-gray-700">{moreDetails}</p>
//                 ) : (
//                   <>
//                     <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Breakdown</h2>
//                     {moreDetails.detailedBreakdown.map((stage, index) => (
//                       <div key={index} className="mb-3">
//                         <p className="text-gray-700">
//                           <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.example}
//                         </p>
//                       </div>
//                     ))}
//                   </>
//                 )}
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
//                 onChange={handleFileChange}
//                 className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
//               />
//               <p className="text-gray-500 mt-2">
//                 Drag & drop an image here or click to upload.
//               </p>
//             </div>
//             {/* Small Image Preview */}
//             {imagePreviewSrc && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="mt-4 flex justify-center"
//               >
//                 <img 
//                   src={imagePreviewSrc} 
//                   alt="Preview" 
//                   className="w-24 h-24 object-cover rounded-lg shadow-md" 
//                 />
//               </motion.div>
//             )}
//             <button
//               onClick={handleImageProcess}
//               className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
//               disabled={imageLoading || !fileName}
//             >
//               {imageLoading && (
//                 <FaSpinner className="animate-spin mr-2" />
//               )}
//               {imageLoading ? "Processing..." : "Process Image"}
//             </button>
//           </div>
//         </motion.div>

//         {/* Compact Output Display */}
//         {showGeminiOutput && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-8 p-4 bg-white rounded-2xl shadow-lg max-w-md mx-auto text-center"
//           >
//             <h3 className="text-lg font-semibold text-blue-800 mb-2">Image Analysis Result</h3>
//             <div 
//               className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800"
//               dangerouslySetInnerHTML={{ __html: geminiOutput }} 
//             />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CalculatePage;




































































// //Production Ready for Giri
// import { useState, useEffect } from "react";
// import { FaSpinner, FaTint, FaTimes, FaLeaf, FaRecycle, FaShoppingBag } from "react-icons/fa";
// import { IoWater } from "react-icons/io5";
// import { motion } from "framer-motion";
// import waterFootprints from "../waterFootprints.json";
// import { calculateWaterFootprint, getMoreDetails } from "../tunedModel";
// import { useTranslation } from "react-i18next";
// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
// import MarkdownIt from 'markdown-it';

// function CalculatePage() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [moreDetails, setMoreDetails] = useState("");
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const { t } = useTranslation();
//   const [imagePreviewSrc, setImagePreviewSrc] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [geminiOutput, setGeminiOutput] = useState("");
//   const [showGeminiOutput, setShowGeminiOutput] = useState(false);
//   const [imageAnalysisResult, setImageAnalysisResult] = useState(""); // Store the object detected text
//   const [showAnalysisButton, setShowAnalysisButton] = useState(false);

//   const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

//   useEffect(() => {
//     if (input.trim() === "") {
//       setSuggestions([]);
//       return;
//     }
//     const filtered = waterFootprints.filter((item) =>
//       item.Product.toLowerCase().includes(input.toLowerCase())
//     );
//     setSuggestions(filtered.slice(0, 5));
//   }, [input]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFileName(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImagePreviewSrc(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreviewSrc(null);
//     }
//     setGeminiOutput("");
//     setShowGeminiOutput(false);
//     setShowAnalysisButton(false); // Hide the button when a new file is uploaded
//   };

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
//       setResult({
//         breakdown: [
//           {
//             stage: "Total",
//             amount: parseFloat(selectedProduct["Water Footprint (Liters)"]),
//             details: "Total water footprint from all lifecycle stages.",
//           },
//         ],
//         total: parseFloat(selectedProduct["Water Footprint (Liters)"]),
//         comparison: "Equivalent to filling a small bucket.",
//         tips: [
//           "Switch to reusable alternatives to save 50 liters per year.",
//           "Recycle plastic products to save 20 liters per item.",
//           "Choose locally sourced materials to save 10 liters per purchase.",
//         ],
//       });
//       setLoading(false);
//     } else {
//       await calculateWaterFootprint(input, setResult, setLoading);
//     }
//   };

//   const handleMoreDetails = async () => {
//     if (!result || result === "undefined" || result === "Error occurred while calculating.") return;
//     await getMoreDetails(input, setMoreDetails, setLoadingDetails);
//   };

//   const handleImageProcess = async () => {
//     if (!fileName) return;

//     setImageLoading(true);
//     setGeminiOutput("");
//     setShowGeminiOutput(false);
//     setShowAnalysisButton(false);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const imageBase64 = e.target.result.split(",")[1];

//       try {
//         let API_KEY = 'AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s'; // Replace with your actual API Key
//         const genAI = new GoogleGenerativeAI(API_KEY);
//         const model = genAI.getGenerativeModel({
//           model: "gemini-1.5-flash",
//           safetySettings: [
//             {
//               category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//               threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//             },
//           ],
//         });

//         const contents = [
//           {
//             role: 'user',
//             parts: [
//               { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
//               { text: "You have to analyze the image and give me only one word as to what is visible in the image. such as food, or any eatable, or any daily using stuff for which we can calculate the water footprint, if any any other non-relevant images like nature photo, or human, or any living being detected, Decline the request politely, No daily items found." }
//             ]
//           }
//         ];

//         const result = await model.generateContentStream({ contents });
//         let buffer = [];
//         let md = new MarkdownIt();
//         for await (let response of result.stream) {
//           buffer.push(response.text());
//         }
//         setGeminiOutput(md.render(buffer.join('')));
//         setShowGeminiOutput(true);
//         setImageAnalysisResult(buffer.join('').replace(/<[^>]*>?/gm, ''));//remove html tags
//         setShowAnalysisButton(true);

//       } catch (e) {
//         setGeminiOutput(`<hr>${e}`);
//         setShowGeminiOutput(true);
//       } finally {
//         setImageLoading(false);
//       }
//     };
//     reader.readAsDataURL(fileName);
//   };

//   const handleWaterFootprintAnalysis = async () => {
//     if (imageAnalysisResult) {
//       await getMoreDetails(imageAnalysisResult, setMoreDetails, setLoadingDetails);
//     }
//   };

//   const tipIcons = [FaLeaf, FaRecycle, FaShoppingBag];
  
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
//             className="mt-12 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto border-l-4 border-blue-400 text-center"
//           >
//             {result === "undefined" || result === "Error occurred while calculating." ? (
//               <p className="text-gray-700">{result}</p>
//             ) : (
//               <>
//                 <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center gap-2">
//                   <FaTint className="text-blue-500" />
//                   Water Footprint for {input}: <br />
//                   {result.total} Liters
//                 </h1>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Breakdown</h2>
//                   {result.breakdown.map((stage, index) => (
//                     <div key={index} className="mb-2">
//                       <p className="text-gray-700">
//                         <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.details}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-4">
//                   <strong>Comparison:</strong> {result.comparison}
//                 </p>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Tips to Reduce Water Footprint</h2>
//                   {result.tips.map((tip, index) => {
//                     const Icon = tipIcons[index % tipIcons.length];
//                     return (
//                       <div key={index} className="flex items-center justify-center mb-3">
//                         <Icon className="text-blue-500 mr-3" />
//                         <span className="text-gray-800">{tip}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//             {selectedProduct && !moreDetails && result !== "undefined" && result !== "Error occurred while calculating." && (
//               <button
//                 onClick={handleMoreDetails}
//                 className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 flex items-center justify-center transition-all duration-300 shadow-md disabled:opacity-50 mx-auto"
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
//                 className="mt-6 p-4 bg-blue-50 rounded-lg text-left"
//               >
//                 {moreDetails === "undefined" || moreDetails === "Error occurred while fetching more details." ? (
//                   <p className="text-gray-700">{moreDetails}</p>
//                 ) : (
//                   <>
//                     <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Breakdown</h2>
//                     {moreDetails.detailedBreakdown.map((stage, index) => (
//                       <div key={index} className="mb-3">
//                         <p className="text-gray-700">
//                           <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.example}
//                         </p>
//                       </div>
//                     ))}
//                   </>
//                 )}
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
//                 onChange={handleFileChange}
//                 className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
//               />
//               <p className="text-gray-500 mt-2">
//                 Drag & drop an image here or click to upload.
//               </p>
//             </div>
//             {/* Small Image Preview */}
//             {imagePreviewSrc && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="mt-4 flex justify-center"
//               >
//                 <img 
//                   src={imagePreviewSrc} 
//                   alt="Preview" 
//                   className="w-24 h-24 object-cover rounded-lg shadow-md" 
//                 />
//               </motion.div>
//             )}
//             <button
//               onClick={handleImageProcess}
//               className="cursor-pointer mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
//               disabled={imageLoading || !fileName}
//             >
//               {imageLoading && (
//                 <FaSpinner className="animate-spin mr-2" />
//               )}
//               {imageLoading ? "Processing..." : "Process Image"}
//             </button>
//           </div>
//         </motion.div>

//         {/* Compact Output Display */}
//         {showGeminiOutput && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-8 p-4 bg-white rounded-2xl shadow-lg max-w-md mx-auto text-center"
//           >
//             <h3 className="text-lg font-semibold text-blue-800 mb-2">Image Analysis Result</h3>
//             <div
//               className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800"
//               dangerouslySetInnerHTML={{ __html: geminiOutput }}
//             />
//             {showAnalysisButton && (
//               <button
//                 onClick={handleWaterFootprintAnalysis}
//                 className="cursor-pointer mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
//                 disabled={loadingDetails}
//               >
//                 {loadingDetails ? <FaSpinner className="animate-spin mr-2" /> : "Analyze Water Footprint"}
//               </button>
//             )}
//           </motion.div>
//         )}

//         {moreDetails && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             transition={{ duration: 0.5 }}
//             className="mt-6 p-4 bg-blue-50 rounded-lg text-left max-w-3xl mx-auto"
//           >
//             {moreDetails === "undefined" || moreDetails === "Error occurred while fetching more details." ? (
//               <p className="text-gray-700">{moreDetails}</p>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Water Footprint Analysis</h2>
//                 {moreDetails.detailedBreakdown.map((stage, index) => (
//                   <div key={index} className="mb-3">
//                     <p className="text-gray-700">
//                       <strong>{stage.stage}:</strong> {stage.amount} Liters - {stage.example}
//                     </p>
//                   </div>
//                 ))}
//               </>
//             )}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CalculatePage;

































//Production Ready for Giri
import { useState, useEffect } from "react";
import { FaSpinner, FaTint, FaTimes, FaLeaf, FaRecycle, FaShoppingBag } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { motion } from "framer-motion";
import waterFootprints from "../waterFootprints.json";
import { calculateWaterFootprint, getMoreDetails } from "../tunedModel";
import { useTranslation } from "react-i18next";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import translate from 'open-google-translator';

function CalculatePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [moreDetails, setMoreDetails] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { t } = useTranslation();
  const [imagePreviewSrc, setImagePreviewSrc] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [geminiOutput, setGeminiOutput] = useState("");
  const [showGeminiOutput, setShowGeminiOutput] = useState(false);
  const [imageAnalysisResult, setImageAnalysisResult] = useState(""); // Store the object detected text
  const [showAnalysisButton, setShowAnalysisButton] = useState(false);


  const forbiddenWords = ["human", "woman", "man", "body", "animal", "building"];

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = waterFootprints.filter((item) =>
      item.Product.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [input]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviewSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewSrc(null);
    }
    setGeminiOutput("");
    setShowGeminiOutput(false);
    setShowAnalysisButton(false); // Hide the button when a new file is uploaded
  };

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
      await calculateWaterFootprint(input, setResult, setLoading);
    }
  };

  const handleMoreDetails = async () => {
    if (!result || result === "undefined" || result === "Error occurred while calculating.") return;
    await getMoreDetails(input, setMoreDetails, setLoadingDetails);
  };

  const handleImageProcess = async () => {
    if (!fileName) return;

    setImageLoading(true);
    setGeminiOutput("");
    setShowGeminiOutput(false);
    setShowAnalysisButton(false);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageBase64 = e.target.result.split(",")[1];

      try {
        let API_KEY = 'AIzaSyCxt0PSZD8rdAYWuh-tGXp45-WtmCPtP-s'; // Replace with your actual API Key
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        });

        const contents = [
          {
            role: 'user',
            parts: [
              { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
              { text: "You have to analyze the image and give me only one word as to what is visible in the image. such as food, or any eatable, or any daily using stuff for which we can calculate the water footprint, if any any other non-relevant images like nature photo, or human, or any living being detected, Decline the request politely, No daily items found." }
            ]
          }
        ];

        const result = await model.generateContentStream({ contents });
        let buffer = [];
        let md = new MarkdownIt();
        for await (let response of result.stream) {
          buffer.push(response.text());
        }
        setGeminiOutput(md.render(buffer.join('')));
        setShowGeminiOutput(true);
        setImageAnalysisResult(buffer.join('').replace(/<[^>]*>?/gm, ''));//remove html tags
        setShowAnalysisButton(true);

      } catch (e) {
        setGeminiOutput(`<hr>${e}`);
        setShowGeminiOutput(true);
      } finally {
        setImageLoading(false);
      }
    };
    reader.readAsDataURL(fileName);
  };

  const handleWaterFootprintAnalysis = async () => {
    if (imageAnalysisResult) {
      await getMoreDetails(imageAnalysisResult, setMoreDetails, setLoadingDetails);
    }
  };

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
                  Water Footprint for {input}: <br />
                  {result.total} Liters
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
                onChange={handleFileChange}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
              />
              <p className="text-gray-500 mt-2">
                Drag & drop an image here or click to upload.
              </p>
            </div>
            {/* Small Image Preview */}
            {imagePreviewSrc && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex justify-center"
              >
                <img 
                  src={imagePreviewSrc} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-lg shadow-md" 
                />
              </motion.div>
            )}
            <button
              onClick={handleImageProcess}
              className="cursor-pointer mt-4 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
              disabled={imageLoading || !fileName}
            >
              {imageLoading && (
                <FaSpinner className="animate-spin mr-2" />
              )}
              {imageLoading ? "Processing..." : "Process Image"}
            </button>
          </div>
        </motion.div>

        {/* Compact Output Display */}
        {showGeminiOutput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 p-4 bg-white rounded-2xl shadow-lg max-w-md mx-auto text-center"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Image Analysis Result</h3>
            <div
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800"
              dangerouslySetInnerHTML={{ __html: geminiOutput }}
            />
            {showAnalysisButton && (
              <button
                onClick={handleWaterFootprintAnalysis}
                className="cursor-pointer mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center"
                disabled={loadingDetails}
              >
                {loadingDetails ? <FaSpinner className="animate-spin mr-2" /> : "Analyze Water Footprint"}
              </button>
            )}
          </motion.div>
        )}

        {moreDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg text-left max-w-3xl mx-auto"
          >
            {moreDetails === "undefined" || moreDetails === "Error occurred while fetching more details." ? (
              <p className="text-gray-700">{moreDetails}</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Detailed Water Footprint Analysis</h2>
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
      </div>
    </div>
  );
}

export default CalculatePage;









