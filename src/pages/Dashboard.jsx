//working superrrrrrrrr
// // src/pages/Dashboard.jsx
// import React from 'react';
// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   FaPlus,
//   FaMinus,
//   FaShower,
//   FaToilet,
//   FaTshirt,
//   FaUtensils,
//   FaTeeth,
//   FaHandsWash,
//   FaCoffee,
//   FaGlassWhiskey,
//   FaCar,
//   FaLeaf,
//   FaChartBar,
//   FaWater,
// } from "react-icons/fa";
// import { Bar } from "react-chartjs-2";
// import Chart from "chart.js/auto"; // Import Chart.js auto to register all components

// // Register Chart.js components (should ideally be in index.js, but included here for completeness)
// import {
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const initialActivities = [
//   { name: "Showering", icon: FaShower, liters: 0 },
//   { name: "Toilet Flushing", icon: FaToilet, liters: 0 },
//   { name: "Washing Clothes", icon: FaTshirt, liters: 0 },
//   { name: "Cooking", icon: FaUtensils, liters: 0 },
//   { name: "Brushing Teeth", icon: FaTeeth, liters: 0 },
//   { name: "Washing Hands", icon: FaHandsWash, liters: 0 },
//   { name: "Drinking Coffee/Tea", icon: FaCoffee, liters: 0 },
//   { name: "Drinking Water", icon: FaGlassWhiskey, liters: 0 },
//   { name: "Washing Car", icon: FaCar, liters: 0 },
//   { name: "Watering Plants", icon: FaLeaf, liters: 0 },
// ];

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   state = { hasError: false };

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="text-center text-red-600 p-4">
//           <p>Something went wrong with the chart. Please refresh the page.</p>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// function Dashboard() {

//     const [isReady, setIsReady] = useState(false);
//   const [activities, setActivities] = useState(() => {
//     const saved = localStorage.getItem("waterUsage");
//     return saved ? JSON.parse(saved) : initialActivities;
//   });
//   const [customActivity, setCustomActivity] = useState("");
//   const [showAnalysis, setShowAnalysis] = useState(false);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     localStorage.clear();
//     console.log("localStorage cleared");
//     setIsReady(true);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("waterUsage", JSON.stringify(activities));
//   }, [activities]);

//   useEffect(() => {
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, [showAnalysis]);

//   if (!isReady) return null; // Put this AFTER hooks
//   // Handle increase/decrease water usage
//   const updateLiters = (index, delta) => {
//     const newActivities = [...activities];
//     newActivities[index].liters = Math.max(0, newActivities[index].liters + delta);
//     setActivities(newActivities);
//   };

//   // Add custom activity
//   const addCustomActivity = () => {
//     if (customActivity.trim() && !activities.some((act) => act.name === customActivity)) {
//       setActivities([...activities, { name: customActivity, icon: FaWater, liters: 0 }]);
//       setCustomActivity("");
//     }
//   };

//   // Calculate total water usage
//   const totalLiters = activities.reduce((sum, act) => sum + act.liters, 0);

//   // Chart data
//   const chartData = {
//     labels: activities.map((act) => act.name),
//     datasets: [
//       {
//         label: "Water Usage (Liters)",
//         data: activities.map((act) => act.liters),
//         backgroundColor: "rgba(59, 130, 246, 0.7)",
//         borderColor: "rgba(59, 130, 246, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Daily Activities",
//           color: "#1e3a8a",
//           font: { size: 16 },
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Water Usage (Liters)",
//           color: "#1e3a8a",
//           font: { size: 16 },
//         },
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: { display: true, position: "top" },
//       tooltip: { backgroundColor: "#1e3a8a" },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
//       <div className="container mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-blue-900 flex items-center justify-center gap-2">
//             <FaWater className="text-blue-600 animate-pulse" />
//             Personalized Water Usage Dashboard
//           </h1>
//           <p className="text-gray-600 mt-2 text-lg">
//             Track and analyze your daily water consumption
//           </p>
//         </motion.div>

//         {/* Grid of Activities */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {activities.map((activity, index) => (
//             <motion.div
//               key={activity.name}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   {React.createElement(activity.icon, { className: "text-blue-600 text-2xl" })}
//                   <h3 className="text-xl font-semibold text-gray-800">{activity.name}</h3>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <button
//                   onClick={() => updateLiters(index, -1)}
//                   className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
//                 >
//                   <FaMinus />
//                 </button>
//                 <span className="text-lg font-medium text-gray-700">
//                   {activity.liters} L
//                 </span>
//                 <button
//                   onClick={() => updateLiters(index, 1)}
//                   className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Custom Activity Input */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-md mx-auto mb-12"
//         >
//           <div className="flex items-center gap-4">
//             <input
//               type="text"
//               value={customActivity}
//               onChange={(e) => setCustomActivity(e.target.value)}
//               placeholder="e.g., Gardening"
//               className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//             />
//             <button
//               onClick={addCustomActivity}
//               className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
//             >
//               <FaPlus /> Add
//             </button>
//           </div>
//         </motion.div>

//         {/* Analyze Button */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <button
//             onClick={() => setShowAnalysis(true)}
//             className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-full hover:from-blue-700 hover:to-blue-900 transition-all shadow-md flex items-center gap-2 mx-auto"
//           >
//             <FaChartBar /> Analyze Usage
//           </button>
//         </motion.div>

//         {/* Analysis Dashboard */}
//         {showAnalysis && (
//           <ErrorBoundary>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto"
//             >
//               <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-2">
//                 <FaChartBar className="text-blue-600" />
//                 Water Usage Analysis
//               </h2>
//               <p className="text-gray-700 mb-4">
//                 Total Water Used Today: <span className="font-semibold">{totalLiters} Liters</span>
//               </p>
//               <div className="h-96">
//                 <Bar
//                   data={chartData}
//                   options={chartOptions}
//                   ref={(ref) => {
//                     if (ref && ref.chartInstance) {
//                       chartRef.current = ref.chartInstance;
//                     }
//                   }}
//                 />
//               </div>
//               <div className="mt-6 text-center">
//                 <p className="text-gray-600">
//                   Tip: Try reducing water usage in high-consumption activities like showering or washing clothes!
//                 </p>
//               </div>
//             </motion.div>
//           </ErrorBoundary>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;













































import React from 'react';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaShower,
  FaToilet,
  FaTshirt,
  FaUtensils,
  FaTeeth,
  FaHandsWash,
  FaCoffee,
  FaGlassWhiskey,
  FaCar,
  FaLeaf,
  FaChartBar,
  FaWater,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Register Chart.js components
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialActivities = [
  { name: "Showering", icon: FaShower, liters: 0 },
  { name: "Toilet Flushing", icon: FaToilet, liters: 0 },
  { name: "Washing Clothes", icon: FaTshirt, liters: 0 },
  { name: "Cooking", icon: FaUtensils, liters: 0 },
  { name: "Brushing Teeth", icon: FaTeeth, liters: 0 },
  { name: "Washing Hands", icon: FaHandsWash, liters: 0 },
  { name: "Drinking Coffee/Tea", icon: FaCoffee, liters: 0 },
  { name: "Drinking Water", icon: FaGlassWhiskey, liters: 0 },
  { name: "Washing Car", icon: FaCar, liters: 0 },
  { name: "Watering Plants", icon: FaLeaf, liters: 0 },
];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-600 p-4">
          <p>Something went wrong with the chart. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// IndexedDB setup
const DB_NAME = 'WaterUsageDB';
const STORE_NAME = 'activities';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
  });
}

function getActivitiesFromDB(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('waterUsage');

    request.onsuccess = () => {
      resolve(request.result ? request.result.data : null);
    };
    request.onerror = () => reject(request.error);
  });
}

function saveActivitiesToDB(db, activities) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id: 'waterUsage', data: activities });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function clearDB(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function Dashboard() {
  const [isReady, setIsReady] = useState(false);
  const [activities, setActivities] = useState(initialActivities);
  const [customActivity, setCustomActivity] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const chartRef = useRef(null);
  const dbRef = useRef(null);

  useEffect(() => {
    async function initializeDB() {
      try {
        const db = await openDB();
        dbRef.current = db;
        
        await clearDB(db);
        console.log("IndexedDB cleared");
        
        const savedActivities = await getActivitiesFromDB(db);
        if (savedActivities) {
          setActivities(savedActivities);
        }
        
        setIsReady(true);
      } catch (error) {
        console.error("Error initializing IndexedDB:", error);
        setIsReady(true); // Proceed even if DB fails
      }
    }
    
    initializeDB();
  }, []);

  useEffect(() => {
    if (!dbRef.current || !isReady) return;

    async function saveData() {
      try {
        await saveActivitiesToDB(dbRef.current, activities);
      } catch (error) {
        console.error("Error saving to IndexedDB:", error);
      }
    }
    
    saveData();
  }, [activities, isReady]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      if (dbRef.current) {
        dbRef.current.close();
      }
    };
  }, [showAnalysis]);

  if (!isReady) return null;

  const updateLiters = (index, delta) => {
    const newActivities = [...activities];
    newActivities[index].liters = Math.max(0, newActivities[index].liters + delta);
    setActivities(newActivities);
  };

  const addCustomActivity = () => {
    if (customActivity.trim() && !activities.some((act) => act.name === customActivity)) {
      setActivities([...activities, { name: customActivity, icon: FaWater, liters: 0 }]);
      setCustomActivity("");
    }
  };

  const totalLiters = activities.reduce((sum, act) => sum + act.liters, 0);

  const chartData = {
    labels: activities.map((act) => act.name),
    datasets: [
      {
        label: "Water Usage (Liters)",
        data: activities.map((act) => act.liters),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Daily Activities",
          color: "#1e3a8a",
          font: { size: 16 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Water Usage (Liters)",
          color: "#1e3a8a",
          font: { size: 16 },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { backgroundColor: "#1e3a8a" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 flex items-center justify-center gap-2">
            <FaWater className="text-blue-600 animate-pulse" />
            Personalized Water Usage Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text- lg">
            Track and analyze your daily water consumption
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {React.createElement(activity.icon, { className: "text-blue-600 text-2xl" })}
                  <h3 className="text-xl font-semibold text-gray-800">{activity.name}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => updateLiters(index, -1)}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                >
                  <FaMinus />
                </button>
                <span className="text-lg font-medium text-gray-700">
                  {activity.liters} L
                </span>
                <button
                  onClick={() => updateLiters(index, 1)}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                >
                  <FaPlus />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              placeholder="e.g., Gardening"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <button
              onClick={addCustomActivity}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FaPlus /> Add
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setShowAnalysis(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-full hover:from-blue-700 hover:to-blue-900 transition-all shadow-md flex items-center gap-2 mx-auto"
          >
            <FaChartBar /> Analyze Usage
          </button>
        </motion.div>

        {showAnalysis && (
          <ErrorBoundary>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <FaChartBar className="text-blue-600" />
                Water Usage Analysis
              </h2>
              <p className="text-gray-700 mb-4">
                Total Water Used Today: <span className="font-semibold">{totalLiters} Liters</span>
              </p>
              <div className="h-96">
                <Bar
                  data={chartData}
                  options={chartOptions}
                  ref={(ref) => {
                    if (ref && ref.chartInstance) {
                      chartRef.current = ref.chartInstance;
                    }
                  }}
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Tip: Try reducing water usage in high-consumption activities like showering or washing clothes!
                </p>
              </div>
            </motion.div>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default Dashboard;