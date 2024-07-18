import React, {useState} from 'react';
import Hero from './components/Hero.jsx'
import Programs from './components/Programs/Programs.jsx'
import Titles from './components/Titles/Titles.jsx'
import About from './components/About/About.jsx'
import Campus from './components/Campus/Campus.jsx'
import Testimonials from './components/Testimonials/Testimonials.jsx';
import Contact from './components/Contact/Contact.jsx'
import Bottom from './components/Footer.jsx'
import VideoPlayer from './components/VideoPlayer/VideoPlayer.jsx'

export default function Applog() {
  const [playState, setPlayState] = useState(false);

  return (
    <div>
      <Hero />
      <div className="container">
      <Titles subTitle='Our PROGRAM' title='What We Offer'/>
      <Programs />
      <About setPlayState={setPlayState}/>
      <Titles subTitle='Gallery' title='Campus Photos'/>
      <Campus />
      <Titles subTitle='TESTIMONIALS' title='What Student Says'/>
      <Testimonials/>
        <Titles subTitle='Contact Us' title='Get in Touch'/>
        <Contact/>
        <Bottom />
     </div>
     <VideoPlayer playState={playState} setPlayState={setPlayState} />
    </div>
  );
};