import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import ag1 from '~/assets/ag1.png';
import mdb from '~/assets/mdb.png';
import sd1 from '~/assets/sd1.png';
import sd2 from '~/assets/sd2.png';
import tt1 from '~/assets/tt1.png';
import mm1 from '~/assets/mm1.png';
import mm2 from '~/assets/mm2.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const details = useRef();

  useEffect(() => {
    const initialSections = [intro, projectOne, projectTwo, projectThree, details];
    const additionalSections = showMore ? [projectFour, projectFive] : [];
    const sections = [...initialSections, ...additionalSections];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections, showMore]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Margdarshak: Future of smart traffic management"
        description="Developing a prototype of a smart traffic management system using IoT and ML algorithms (under development)"
        buttonText="View project"
        buttonLink="https://www.linkedin.com/posts/mehul-singh-73154b251_smarttraffic-trafficmanagement-machinelearning-activity-7249790864292540416-oD0-"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${mdb} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="StoreDoc: Secure Storage Solution"
        description="A robust storage system with multiple layers of security to safeguard your data."
        buttonText="View website"
        buttonLink="https://storedoc.vercel.app/sign-in"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${sd1} 375w, ${sd1} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${sd2} 375w, ${sd2} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="TopperTown AI: Study assistance designed for excellence!"
        description="Generates study material based on your input! Notes/Flashcards/Quizes/FAQs + a lot more ! (under development)"
        buttonText="View project"
        buttonLink="https://toppertown.vercel.app/"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${tt1} 1280w, ${tt1} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />

      {!showMore && (
        <div className="flex justify-center my-8">
          <button
            onClick={() => setShowMore(true)}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More Projects
          </button>
        </div>
      )}

      {showMore && (
        <>
          <ProjectSummary
            id="project-4"
            alternate
            sectionRef={projectFour}
            visible={visibleSections.includes(projectFour.current)}
            index={4}
            title="MeetMe: A web app for vid calling people virtually!"
            description="Host and record meeets endlessly! Introducing personal meet rooms now."
            buttonText="View website"
            buttonLink="https://storedoc.vercel.app/sign-in"
            model={{
              type: 'phone',
              alt: 'App login screen',
              textures: [
                {
                  srcSet: `${mm1} 375w, ${mm1} 750w`,
                  placeholder: gamestackTexturePlaceholder,
                },
                {
                  srcSet: `${mm2} 375w, ${mm2} 750w`,
                  placeholder: gamestackTexture2Placeholder,
                },
              ],
            }}
          />
          <ProjectSummary
            id="project-5"
            sectionRef={projectFive}
            visible={visibleSections.includes(projectFive.current)}
            index={5}
            title="AirGlobe: Your world mapped and updated with information. Now assisted with AI"
            description="A web app that helps you find the temperature, air quality, and atmospheric conditions of any location around the world."
            buttonText="View project"
            buttonLink="https://air-globe.vercel.app/"
            model={{
              type: 'laptop',
              alt: 'Annotating a biomedical image in the Slice app',
              textures: [
                {
                  srcSet: `${ag1} 800w, ${ag1} 1920w`,
                  placeholder: sliceTexturePlaceholder,
                },
              ],
            }}
          />
        </>
      )}

      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};