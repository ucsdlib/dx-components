//---
// "LIBRARIES" REDIRECT (Solves CORS issues; DT; 20250722)
//---

if (location.href.indexOf('libraries.ucsd.edu') !== -1){location.replace(location.href.replace('libraries.ucsd.edu', 'library.ucsd.edu'));}

//---
// END: "LIBRARIES" REDIRECT
//---

//---
// ADDITIONAL HEATMAPS & ANALYTICS
//--

// SITEIMPROVE
(function(){var sz=document.createElement('script');sz.type='text/javascript';sz.async=true;sz.src='https://siteimproveanalytics.com/js/siteanalyze_8343.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(sz,s);})();

//---
// END: ADDITIONAL HEATMAPS & ANALYTICS
//---

//--LibChat Widget Global Display

(function(){
    var libChat = document.createElement('script');
    libChat.type = 'text/javascript'; libChat.async = true;
    libChat.src = ('https:' === document.location.protocol? 'https://': 'http://') + 'ucsd.libanswers.com/load_chat.php?hash=74628e4904648ead3a94bef0ff36c34e';
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(libChat,firstScript);
})();

//--END LibChat Widget Global Display