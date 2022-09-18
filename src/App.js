// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import React, { Component } from 'react'
import NewsComponent from './Components/NewsComponent';
import {
  BrowserRouter,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress : 10
  }
  setProgress=(progress)=>{
    this.setState({progress : progress})

  }

  render() {
    return (
     

      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsComponent setProgress={this.setProgress}  key="general" pageSize={12} country='us' category='general' />} />
            <Route path="/business" element={<NewsComponent setProgress={this.setProgress}  key="business" pageSize={12} country='us' category='business' />} />
            <Route path="/entertainment" element={<NewsComponent setProgress={this.setProgress}  key="entertainment" pageSize={12} country='us' category='entertainment' />} />
            <Route path="/health" element={<NewsComponent setProgress={this.setProgress}  key="health" pageSize={12} country='us' category='health' />} />
            <Route path="/science" element={<NewsComponent setProgress={this.setProgress}  key="science" pageSize={12} country='us' category='science' />} />
            <Route path="/sports" element={<NewsComponent setProgress={this.setProgress}  key="sports" pageSize={12} country='us' category='sports' />} />
            <Route path="/technology" element={<NewsComponent setProgress={this.setProgress}  key="technology" pageSize={12} country='us' category='technology' />} />
          </Routes>
        </BrowserRouter>
      </div>


    )
  }
}

