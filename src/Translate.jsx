// import React, { useEffect } from 'react';

// function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
//         'google_translate_element'
//       );
//     };
//   }, []);

//   return <div id="google_translate_element"></div>;
// }

// export default Translate;









//comparatively better

// import React, { useEffect } from 'react';

// function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en' },
//         // { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
//         'google_translate_element'
//       );
//     };
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .translate-widget .goog-te-gadget .goog-te-banner {
//             display: none !important;
//           }
//           .translate-widget .goog-te-gadget .goog-te-menu-value span {
//             color: white !important;
//           }
//           .translate-widget .goog-te-gadget {
//             font-size: 14px !important;
//           }
//           .translate-widget .goog-te-gadget select {
//             background-color: #1e40af !important;
//             color: white !important;
//             border: none !important;
//             padding: 4px 8px !important;
//             border-radius: 4px !important;
//           }
//         `}
//       </style>
//       <div id="google_translate_element" className="translate-widget" />
//     </>
//   );
// }

// export default Translate;


















// import React, { useEffect } from 'react';

// function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en' },
//         'google_translate_element'
//       );


      
//       // Function to remove the "Powered by Google Translate" element
//       const removeGoogleTranslatePoweredBy = () => {
//         const poweredByElement = document.querySelector('.goog-te-gadget .goog-te-powered-by');
//         const logoLink = document.querySelector('.goog-te-gadget .goog-logo-link');

//         if (poweredByElement) {
//             poweredByElement.style.color = 'white';
//           }
//         if (logoLink) {
//           logoLink.style.display = 'none';
//         }
//         if(selectLanguage){
//             selectLanguage.style.color = 'white';
//         }
//     };
//           // Call the removal function after the widget is initialized
//       setTimeout(removeGoogleTranslatePoweredBy, 500); // Delay to ensure widget is fully rendered
//     };
//     function removeBranding() {
//         const brandingElements = document.querySelectorAll('.VIpgJd-ZVi9od-l4eHX-hSRGPd');
//         brandingElements.forEach((element) => element.remove());
//       }
      
//       const observer = new MutationObserver((mutations) => {
//         removeBranding();
//       });
 

//     // // MutationObserver to remove the "Powered by Google" element
//     // const observer = new MutationObserver((mutations) => {
//     //   const poweredByElement = document.querySelector('.goog-te-banner');
//     //   if (poweredByElement) {
//     //     poweredByElement.remove(); // Remove the element entirely
//     //     observer.disconnect(); // Stop observing once removed
//     //   }
//     // });

    

//     // Start observing the document body for added nodes
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .translate-widget .goog-te-gadget .goog-te-menu-value span {
//             color: white !important;
//           }
//           .translate-widget .goog-te-gadget {
//             font-size: 14px !important;
//           }
//           .translate-widget .goog-te-gadget select {
//             background-color: #1e40af !important;
//             color: white !important;
//             border: none !important;
//             padding: 4px 8px !important;
//             border-radius: 4px !important;
//           }
//         `}
//       </style>
//       <div id="google_translate_element" className="translate-widget" />
//     </>
//   );
// }

// export default Translate;


















// //working great 

// import React, { useEffect } from 'react';

// function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en' },
//         'google_translate_element'
//       );

//       // Function to remove the "Powered by Google Translate" element
//       const removeGoogleTranslatePoweredBy = () => {
//         const poweredByElement = document.querySelector('.goog-te-gadget .goog-te-powered-by');
//         const logoLink = document.querySelector('.goog-te-gadget .goog-logo-link');

//         if (poweredByElement) {
//             poweredByElement.style.color = 'white';
//           }
//         if (logoLink) {
//           logoLink.style.display = 'none';
//         }
//         if(selectLanguage){
//             selectLanguage.style.color = 'white';
//         }
//       };

//       // Call the removal function after the widget is initialized
//       setTimeout(removeGoogleTranslatePoweredBy, 500); // Delay to ensure widget is fully rendered
//     };
//     function removeBranding() {
//         const brandingElements = document.querySelectorAll('.VIpgJd-ZVi9od-l4eHX-hSRGPd');
//         brandingElements.forEach((element) => element.remove());
//       }
      
//       const observer = new MutationObserver((mutations) => {
//         removeBranding();
//       });
      
//       observer.observe(document.body, {
//         childList: true,
//         subtree: true,
//       });
//   }, []);

//   return (
//     <>
//       <div id="google_translate_element" className="translate-widget" />
//     </>
//   );
// }

// export default Translate;






























// //give giri

// import React, { useEffect } from 'react';

// function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en' },
//         'google_translate_element'
//       );


      
//       // Function to remove the "Powered by Google Translate" element
//       const removeGoogleTranslatePoweredBy = () => {
//         const poweredByElement = document.querySelector('.goog-te-gadget .goog-te-powered-by');
//         const logoLink = document.querySelector('.goog-te-gadget .goog-logo-link');

//         if (poweredByElement) {
//             poweredByElement.remove();
//             // poweredByElement.style.color = '#4960A5';
//           }
//         if (logoLink) {
//           logoLink.style.display = 'none';
//         }
//         if(selectLanguage){
//             selectLanguage.style.color = 'white';
//         }
//     };
//           // Call the removal function after the widget is initialized
//       setTimeout(removeGoogleTranslatePoweredBy, 500); // Delay to ensure widget is fully rendered
//     };
//     function removeBranding() {
//         const brandingElements = document.querySelectorAll('.VIpgJd-ZVi9od-l4eHX-hSRGPd');
//         brandingElements.forEach((element) => element.remove());
//       }
      
//       const observer = new MutationObserver((mutations) => {
//         removeBranding();
//       });
 
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .translate-widget .goog-te-gadget .goog-te-menu-value span {
//             color: #3C57A5 !important;
//           }
//           .translate-widget .goog-te-gadget {
//             font-size: 14px !important;
//           }
//           .translate-widget .goog-te-gadget select {
//             background-color: #1e40af !important;
//             color: white !important;
//             border: none !important;
//             padding: 4px 8px !important;
//             border-radius: 4px !important;
//           }
//         `}
//       </style>
//       <div id="google_translate_element" className="translate-widget" />
//     </>
//   );
// }

// export default Translate;















// //give giri
// import React, { useEffect } from 'react';

// function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement('script');
//     addScript.setAttribute(
//       'src',
//       'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//     );
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: 'en' },
//         'google_translate_element'
//       );

//       // Function to remove "Powered by Google Translate" text by content
//       const removePoweredByText = () => {
//         const textNodes = document.evaluate(
//           "//text()[contains(., 'Powered by')]",
//           document,
//           null,
//           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//           null
//         );

//         for (let i = 0; i < textNodes.snapshotLength; i++) {
//           const textNode = textNodes.snapshotItem(i);
//           if (textNode.textContent.trim() === 'Powered by') {
//               if (textNode.parentNode) {
//                   textNode.parentNode.remove();
//               }
//           }
//         }

//         const selectLanguage = document.querySelector('.goog-te-gadget .goog-te-combo');
//         if(selectLanguage){
//             selectLanguage.style.color = 'white';
//         }
//       };

//       // Call the removal function after the widget is initialized
//       setTimeout(removePoweredByText, 500); // Delay to ensure widget is fully rendered
//     };

//     function removeBranding() {
//       const brandingElements = document.querySelectorAll('.VIpgJd-ZVi9od-l4eHX-hSRGPd');
//       brandingElements.forEach((element) => element.remove());
//     }

//     const observer = new MutationObserver((mutations) => {
//       removeBranding();
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           .translate-widget .goog-te-gadget .goog-te-menu-value span {
//             color: #3C57A5 !important;
//           }
//           .translate-widget .goog-te-gadget {
//             font-size: 14px !important;
//           }
//           .translate-widget .goog-te-gadget select {
//             background-color: #1e40af !important;
//             color: white !important;
//             border: none !important;
//             padding: 4px 8px !important;
//             border-radius: 4px !important;
//           }
//         `}
//       </style>
//       <div id="google_translate_element" className="translate-widget" />
//     </>
//   );
// }

// export default Translate;













































//give giri
import React, { useEffect } from 'react';

function Translate() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
  
      setTimeout(() => {
        // Remove branding
        const branding = document.querySelectorAll('.VIpgJd-ZVi9od-l4eHX-hSRGPd');
        branding.forEach(el => el.style.display = 'none');
  
        // Optional: tweak select styling
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.style.color = 'white';
        }
      }, 1500); // delay to allow widget to render
    };
  
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);
  

  return (
    <>
      <style>
        {`
          .translate-widget .goog-te-gadget .goog-te-menu-value span {
            color: #3C57A5 !important;
          }
          .translate-widget .goog-te-gadget {
            font-size: 14px !important;
          }
          .translate-widget .goog-te-gadget select {
            background-color: #1e40af !important;
            color: white !important;
            border: none !important;
            padding: 4px 8px !important;
            border-radius: 4px !important;
          }
        `}
      </style>
      <div id="google_translate_element" className="translate-widget" />
    </>
  );
}

export default Translate;