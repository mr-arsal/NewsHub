// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import React, { useState } from 'react'
import NewsComponent from './Components/NewsComponent';
import {
  HashRouter,
  // BrowserRouter,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App() {

  const [progress, setProgress] = useState(10)
 
    return (
     

      <div>
        <HashRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsComponent setProgress={setProgress}  key="general" pageSize={12} country='us' category='general' />} />
            <Route path="/business" element={<NewsComponent setProgress={setProgress}  key="business" pageSize={12} country='us' category='business' />} />
            <Route path="/entertainment" element={<NewsComponent setProgress={setProgress}  key="entertainment" pageSize={12} country='us' category='entertainment' />} />
            <Route path="/health" element={<NewsComponent setProgress={setProgress}  key="health" pageSize={12} country='us' category='health' />} />
            <Route path="/science" element={<NewsComponent setProgress={setProgress}  key="science" pageSize={12} country='us' category='science' />} />
            <Route path="/sports" element={<NewsComponent setProgress={setProgress}  key="sports" pageSize={12} country='us' category='sports' />} />
            <Route path="/technology" element={<NewsComponent setProgress={setProgress}  key="technology" pageSize={12} country='us' category='technology' />} />
          </Routes>
        </HashRouter>
      </div>


    )
  
}
export default App;


