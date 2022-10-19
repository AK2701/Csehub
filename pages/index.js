import { useState, useEffect, useRef } from 'react';
import { Homepage, YearCard } from '../components';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import client from '../utils/sanityconnect';
import imageUrlBuilder from '@sanity/image-url';
import ReactAudioPlayer from 'react-audio-player';


const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}


const Home = ({ years }) => {
  const ref = useRef();
  const scrollY = () => {
    ref.current.scrollTo(2)
  }



  return (
    <Parallax ref={ref} pages={2} style={{
      backgroundImage: `url('/assets/dragonbg.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <ParallaxLayer
        speed={3}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Homepage scrollY={scrollY} />
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={2} style={{ backgroundColor: 'black' }}>
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        speed={0.2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}>
        <div className='w-screen md:flex flex-wrap md:flex-nowrap items-center justify-center'>
          <audio id='audio-player' src="music.mp3" autoplay />
          {
            years.map((year, index) => {
              return (
                <YearCard
                  key={index}
                  title={year.year}
                  slug={year.slug.current}
                  url={year.image}
                />
              )
            })
          }

        </div>
      </ParallaxLayer>
    </Parallax >
  )
}

export async function getStaticProps() {
  const years = await client.fetch('*[_type == "year"] | order(_createdAt asc)');
  years.map(year => {
    year.image = urlFor(year.image).url();
  });
  console.log(years);

  return {
    props: {
      years
    }
  }
}

export default Home