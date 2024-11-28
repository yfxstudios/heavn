import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const bg = useRef(null);
  const centerLogo = useRef(null);
  const sideText = useRef(null);
  const centerText = useRef(null);

  const heroImg = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bg.current,
        start: "-1 top",
        end: "bottom top",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    tl.to([centerLogo.current, sideText.current], {
      opacity: 0,
    }).to(centerText.current, {
      opacity: 1,
    });

    const heroImgTl = gsap.timeline({
      scrollTrigger: {
        trigger: bg.current,
        start: "-1 top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
    });

    heroImgTl.set(heroImg.current, {
      scale: 1.01,
    });

    heroImgTl.to(heroImg.current, {
      scale: 1.4,
    });

    tl.add(heroImgTl);

    return () => {
      tl.kill();
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-x-hidden" ref={bg}>
      <div
        className="w-screen h-screen absolute top-0 left-0 scale-[101%] overflow-hidden"
        style={{
          backgroundImage: `url("assets/hero.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transformOrigin: "center",
        }}
        ref={heroImg}
      />
      <div
        className="w-full h-full"
        style={
          {
            // backgroundImage: `url("assets/hero.jpg")`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
          }
        }
      >
        <div
          className="flex flex-col justify-center items-center h-[85%] opacity-100"
          ref={centerLogo}
        >
          <div className="flex flex-col items-end opacity-100">
            <div className="flex flex-row items-center relative top-[72px] right-2">
              <span className="text-white text-[33px] font-medium">H</span>
              <span className="text-white text-[33px] font-medium">E</span>
              <span className="text-white text-[33px] font-medium">A</span>
              <span className="text-white text-[33px] font-medium">V</span>
              <span className="text-white text-[33px] font-medium">N</span>
            </div>
            <div>
              <span className="text-white text-[120px] font-medium tracking-tight">
                O
              </span>
              <span className="text-white text-[120px] font-medium tracking-tight">
                n
              </span>
              <span className="text-white text-[120px] font-medium tracking-tight">
                e
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-start absolute top-[50vh] translate-y-[-50%] right-20"
          ref={sideText}
        >
          <p className="text-white text-[18px] font-normal">
            The world&apos;s brightest desk luminaire.
          </p>
          <span className="text-gray-400 text-[18px] font-normal">
            <div></div> Scroll to learn more.
          </span>
        </div>

        <div
          className="flex flex-col justify-center items-start absolute top-[50vh] translate-y-[-50%] left-[50%] translate-x-[-50%] opacity-0 w-[400px]"
          ref={centerText}
        >
          <span className="text-[14px] text-gray-400 font-normal">
            HEAVN One
          </span>
          <span className="text-[26px] text-white font-medium">
            Brightens up your workday
            <span className="text-[26px] text-gray-400 font-medium tracking-tighter">
              ,
            </span>
          </span>
          <span className="text-[24px] text-gray-300 font-normal">
            reduces tiredness and improves your sleep.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
