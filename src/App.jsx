import { useEffect, useRef } from "react";
import "./App.css";
import Hero from "./Hero";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

function App() {
  const sun = useRef(null);
  const infoSection = useRef(null);
  const section2 = useRef(null);

  const timeOfDay = useRef(null);
  const timeContainer = useRef(null);
  const time = useRef(null);

  const darkTransition = useRef(null);

  const animationFrame = useRef(null);
  const animationText1 = useRef(null);
  const animationText2 = useRef(null);
  const animationText3 = useRef(null);
  const animationText4 = useRef(null);

  const quote = useRef(null);

  const lenis = useLenis(({ scroll }) => {
    // console.log(scroll);
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: infoSection.current,
        start: "-1 top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.set(sun.current, {
      width: "100vw",
      height: "100vw",
      translateY: "85vh",
      borderRadius: "50%",
      backgroundColor: "#F9C516",
      filter: "blur(100px)",
    });

    tl.to(sun.current, {
      width: "75px",
      height: "75px",
      translateY: "-50%",
      borderRadius: "50%",
      filter: "blur(0px)",
    });

    const darkTl = gsap.timeline({
      scrollTrigger: {
        trigger: darkTransition.current,
        start: "top center",
        end: "center center",
        scrub: true,
      },

      ease: "none",
    });

    darkTl.set(timeOfDay.current.children, {
      backgroundColor: "#F5F5F5",
      color: "#212121",
    });

    darkTl.to(
      [
        timeOfDay.current.children[1],
        timeOfDay.current.children[2],
        timeOfDay.current.children[3],
        timeOfDay.current.children[4],
        timeOfDay.current.children[5],
      ],
      {
        backgroundColor: "#212121",
        color: "#f5f5f5",
      }
    );

    const darkSun = gsap.timeline({
      scrollTrigger: {
        trigger: darkTransition.current,
        start: "top center",
        end: "center center",
        scrub: true,
      },
    });

    gsap.set(timeContainer.current, {
      background: "none",
    });

    darkSun.to(timeContainer.current.children[0], {
      backgroundColor: "#F5F5F5",
    });

    darkTl.add(darkSun);

    const darkTextTl = gsap.timeline({
      scrollTrigger: {
        trigger: darkTransition.current,
        start: "top center",
        end: "center center",
        scrub: true,
      },
    });

    darkTextTl.to(timeContainer.current.children[1], {
      color: "#F5F5F5",
    });

    darkTl.add(darkTextTl);

    const animationTl = gsap.timeline({
      scrollTrigger: {
        trigger: animationFrame.current,
        start: "top top",
        end: "+=" + window.innerHeight * 5,
        scrub: true,

        pin: true,
      },
    });

    gsap.set(animationFrame.current.children[0].children[0], {
      display: "block",
    });

    for (let i = 0; i < 142; i++) {
      animationTl.to(animationFrame.current.children[0].children[i], {
        display: "block",
        duration: 0.2, // Adjust the duration as needed
      });

      if (i !== 141) {
        animationTl.to(
          animationFrame.current.children[0].children[i],
          {
            display: "none",
            duration: 0.2, // Adjust the duration as needed
          },
          `+=0.1`
        ); // Adjust the delay as needed
      }
    }

    const animationTextTl = gsap.timeline({
      scrollTrigger: {
        trigger: animationFrame.current,
        start: "top top",
        end: "+=" + window.innerHeight * 5,
        scrub: true,
      },
    });

    animationTextTl

      .to(animationText1.current, {
        opacity: 0,
        duration: 0.5,
      })
      .to(animationText2.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to(animationText2.current, {
        opacity: 0,
        duration: 0.5,
      })
      .to(animationText3.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to(animationText3.current, {
        opacity: 0,
        duration: 0.5,
      })
      .to(animationText4.current, {
        opacity: 1,
        duration: 0.5,
      });

    animationTl.add(animationTextTl);

    const text = new SplitType(quote.current.children[0], {
      types: "chars, lines",
      linesClass: "line",
    });

    const textReadTl = gsap.timeline({
      scrollTrigger: {
        trigger: quote.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    textReadTl.from(text.chars, {
      opacity: 0.2,
      stagger: 0.2,
    });

    const timeTl = gsap.timeline({
      scrollTrigger: {
        trigger: timeContainer.current,
        start: "top center",
        end: "+=" + window.innerHeight * 2,
        scrub: true,
        pin: true,
      },
    });

    timeTl.to(time.current, {
      textContent: 22,
      duration: 0.5,
      snap: { textContent: 4 },

      ease: "none",
    });

    return () => {
      tl.kill();
      darkTl.kill();
      animationTl.kill();
      animationTextTl.kill();

      textReadTl.kill();
      timeTl.kill();

      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <ReactLenis root>
      <div
        className="w-screen overflow-x-hidden relative"
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-row justify-between items-center absolute w-screen px-7 pt-8 top-0 z-10">
          <div
            className="w-[100px] h-[18px] z-10"
            style={{
              backgroundImage: `url("assets/logo.png")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className={`flex text-[15px] bg-white bg-opacity-15 rounded-lg px-3 py-[8px] text-white text-nowrap justify-center align-center`}
          >
            Order now
          </div>
        </div>
        <Hero />
        {/* <div className="bg-black flex justify-center items-center h-screen w-screen p-0 m-0">
          you should not be here (lmk if you see this)
        </div> */}

        <div
          className="w-screen h-screen overflow-x-hidden bg-[#F5F5F5] relative"
          ref={infoSection}
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-0">
            <div className="text-[#18181A]  text-[130px] font-semibold  flex flex-row items-center gap-6 z-10">
              Light{" "}
              <div
                style={{
                  backgroundImage: `url(assets/heavn_0414.avif)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-[192px] h-[112px] rounded-[28px]"
              />
              that
            </div>
            <div className="  text-[130px] font-semibold -mt-12 z-10">
              feels like sun.
            </div>

            <p className="text-[#18181A] text-[18px] font-normal w-[50%] text-center leading-6 z-10">
              As the first hybrid of desk and daylight luminaire, <br />
              HEAVN One delivers ideal light at any time of day and <br />
              enhances your well-being and performance.
            </p>
          </div>
          <div
            className="w-[75px] h-[75px] absolute bottom-[10px] left-[50%] translate-x-[-50%] bg-[#F9C516] z-0 rounded-full blur-[0px]"
            ref={sun}
          />
        </div>

        <div className="w-screen bg-[#F0F0F0]" ref={section2}>
          <div className=" flex flex-row justify-between border-b-[1px] border-[#d4d4d4] py-16">
            <div className="flex flex-row justify-left text-[#18181A] text-[24px] font-medium w-full mx-32 overflow-hidden">
              Automatic light adjustment.
            </div>
            <div className="flex flex-row items-left text-[#4a4a4a] text-[48px] font-semibold w-full mx-64 leading-[50px] overflow-hidden">
              Your working day
              <br />
              with HEAVN One
            </div>
          </div>

          <div
            className="flex flex-col w-screen items-center divide-y-[1px] divide-[#d4d4d4] relative"
            ref={timeOfDay}
          >
            <div
              className="flex flex-row items-center absolute top-16 left-[50%] translate-x-[-35%] gap-4 w-[200px] bg-none"
              ref={timeContainer}
            >
              <div className="w-[75px] h-[75px]  bg-[#F9C516] z-10 rounded-full" />
              <div className="text-[36px] font-medium">
                <span
                  ref={time}
                  // disable decimals
                >
                  08
                </span>
                :00
              </div>
            </div>
            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_0156.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px] overflow-hidden">
                    The energy boost <br />
                    in the morning.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap overflow-hidden">
                    The full-spectrum daylight lamp that can be switched on at
                    the front is a real wake-up call. With an effect of up to
                    10,000 lux, you reactivate your bodily functions for more
                    vitality, wakefulness and concentration.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_0712.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px] overflow-hidden">
                    Full light. Full focus.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap overflow-hidden">
                    The downward desk illumination provides wide-area
                    illumination with linear, shadow-free light. For effortless
                    work with documents or on the monitor.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_2595.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px] overflow-hidden">
                    Sets the scene perfectly.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap overflow-hidden">
                    The switchable, frontal light function acts like a soft box
                    and creates a natural brightening of area around the face.
                    For a perfect appearance in video conferences!
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row justify-between w-screen"
              ref={darkTransition}
            >
              <div
                style={{
                  backgroundImage: "url(assets/heavn_2364.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px] overflow-hidden">
                    Outside dark.
                    <br />
                    Inside atmospheric.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap overflow-hidden">
                    The indirect light of HEAVN One creates an atmospheric
                    ambience and eliminates the cave feeling of typical desk
                    lamps.
                    <br />
                    <br />
                    The comfortable room illumination is easy on the eyes when
                    working on a monitor and enhances well-being and
                    concentration when it is already dark outside.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between w-screen">
              <div
                style={{
                  backgroundImage: "url(assets/heavn_2495.avif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[50vh]"
              />
              <div className="flex flex-col justify-start items-start pl-[20vw] pt-16 w-full">
                <div className="flex flex-col w-1/2 gap-4">
                  <h1 className=" text-[36px] font-medium w-full leading-[45px] overflow-hidden">
                    Healthy sleep.
                    <br />
                    Ideal regeneration.
                  </h1>
                  <p className=" text-[16px] font-normal text-wrap overflow-hidden">
                    In the evening, the light from HEAVN One becomes warmer and
                    stimulates the production of the sleep hormone melatonin in
                    your body.
                    <br />
                    <br />
                    The result is healthy sleep - the best foundation for
                    sustainable performance at work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-screen bg-black">
            <div className="text-[#f5f5f5] text-[48px] font-semibold text-center mt-32 leading-[55px] w-full overflow-hidden">
              Revolutionize{" "}
              <span className="text-[#999999]">
                your
                <br />
                working day
              </span>
            </div>

            <div
              className="flex flex-col justify-center items-center h-screen w-screen relative"
              ref={animationFrame}
            >
              <div className="w-screen h-screen bg-black">
                {" "}
                {[...Array(142)].map((_, i) => (
                  <img
                    src={`assets/animation/${i + 1}.jpeg`}
                    alt=""
                    key={i + 1}
                    className="w-screen h-screen"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "none",
                    }}
                  />
                ))}
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 right-64 opacity-100"
                ref={animationText1}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full overflow-hidden">
                  Elegant design.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full overflow-hidden">
                  For tasteful offices.
                </p>
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 left-64 opacity-0"
                ref={animationText2}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full overflow-hidden">
                  3 lights become HEAVN One.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full overflow-hidden">
                  Desk lamp. Ceiling spotlight. Daylight.
                </p>
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 right-64 opacity-0"
                ref={animationText3}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full overflow-hidden">
                  Intuitive control.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full overflow-hidden">
                  Also by app.
                </p>
              </div>

              <div
                className="flex flex-col items-center justify-center w-auto h-[200px] absolute bottom-32 left-64 opacity-0"
                ref={animationText4}
              >
                <p className="text-[#f5f5f5] text-[18px] font-normal text-left w-full overflow-hidden">
                  Always a full smartphone battery.
                </p>
                <p className="text-[#999999] text-[18px] font-normal text-left w-full overflow-hidden">
                  With wireless charging.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center w-full gap-4 bg-[#f5f5f5] mt-[500vh]">
              <div className="flex flex-col items-center justify-center w-[50%] py-16">
                <div className="text-[#18181A] text-[24px] font-medium overflow-hidden">
                  30 days risk-free trial.
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex flex-col justify-center w-3/4 py-16 gap-4">
                  <div className="text-[#18181A] text-[48px] font-semibold overflow-hidden">
                    Get your HEAVN One now.
                  </div>
                  <div className="text-[#18181A] text-[16px] font-normal w-3/4 overflow-hidden">
                    Order HEAVN One in our online store and try it out without
                    any obligation. You can return the luminaire within 30 days
                    of ordering without giving a reason and receive a full
                    refund.
                  </div>

                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-row justify-between py-4 border-t-[1px] border-[#d4d4d4]">
                      <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                        Promise
                      </div>
                      <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                        30-day money-back
                      </div>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-t-[1px] border-[#d4d4d4]">
                      <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                        Delivery
                      </div>
                      <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                        3 to 4 days
                      </div>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-y-[1px] border-[#d4d4d4]">
                      <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                        Price
                      </div>
                      <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                        €1290
                      </div>
                    </div>

                    <div
                      className={`flex text-[15px] bg-[#E4E4E4] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[110px] mt-5 cursor-pointer`}
                    >
                      Order now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-screen h-screen"
          style={{
            backgroundImage: `url(assets/heavn_0001.avif)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="w-screen px-32 py-16 bg-[#F5F5F5] text-[#18181A] flex flex-col items-center">
          <div
            className="text-[72px] font-semibold max-w-[1400px] leading-[80px] overflow-hidden no-overflow"
            ref={quote}
          >
            <h1>
              “I recommend anyone who wants to use their time effectively and
              increase their efficiency to test the HEAVN One.”
            </h1>
          </div>

          <p className="text-[36px] text-[#999999] font-medium w-full max-w-[1300px] mt-8 text-left">
            Frank Thelen, Investor
          </p>
        </div>

        <div className="flex flex-row items-center justify-center h-screen w-screen gap-4 bg-[#f5f5f5] relative">
          <div className="absolute top-0 left-[50%] translate-x-[-50%]"></div>
          <div className="w-1/2 items-right justify-end flex">
            <div className="flex flex-col justify-center w-3/4 py-16 gap-4">
              <div className="text-[#18181A] text-[48px] font-semibold overflow-hidden">
                Technical details.
              </div>
              <div className="text-[#18181A] text-[16px] font-normal w-3/4 overflow-hidden">
                HEAVN One was developed in close cooperation with leading sleep
                researchers and doctors. A well thought-out concept, which is
                also reflected in the technical data.
              </div>

              <div
                className={`flex text-[15px] bg-[#E4E4E4] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[166px] mt-5 cursor-pointer`}
              >
                Download catalog
              </div>
            </div>
          </div>
          <div className="w-1/2 items-right flex">
            <div className="flex flex-col justify-center items-right w-3/4 py-16 gap-4">
              <div className="flex flex-col w-4/5">
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                    Dimensions and weight
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                    Light characteristics
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                    Sensors and options
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                    Phys. electrical properties
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-t-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                    Planning data
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center py-4 border-y-[1px] border-[#d4d4d4] cursor-pointer">
                  <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                    More
                  </div>
                  <div className="text-[#999999] text-[16px] font-normal mr-5 animate-rotateLeft hover:animate-rotateRight rotate-0 transition-transform ease-in-out">
                    +
                  </div>
                </div>

                <div
                  className={`flex text-[15px] bg-[#E4E4E4] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[110px] mt-5 cursor-pointer`}
                >
                  Order now
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-screen h-screen"
          style={{
            backgroundImage: `url(assets/heavn_0170.avif)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="flex flex-row items-center justify-center h-[45vh] w-screen gap-4 bg-[#18181A] relative">
          <div className="absolute top-0 left-[50%] translate-x-[-50%]"></div>
          <div className="w-1/2 items-right justify-end flex">
            <div className="flex flex-col justify-center w-3/4 py-16 gap-4">
              <div className="text-[#F5F5F5] text-[48px] font-semibold overflow-hidden">
                Technical details.
              </div>
              <div className="text-[#999999] text-[16px] font-normal w-3/4 overflow-hidden">
                <span className="text-[#F5F5F5]">
                  97% of all testers are already convinced.{" "}
                </span>
                Try out HEAVN One for 30 days without obligation. Order
                risk-free in our online shop with our money-back guarantee, if
                you&apos;re not happy
              </div>

              <div
                className={`flex text-[15px] bg-[#F5F5F5] rounded-lg px-3 py-[10px] text-[#18181A] text-nowrap justify-center align-center w-[110px] mt-5 cursor-pointer`}
              >
                Order now
              </div>
            </div>
          </div>
          <div className="w-1/2 items-right flex">
            <div className="flex flex-col justify-center items-right w-3/4 py-16">
              <div className="flex flex-col w-4/5">
                <div className="text-[#999999] text-[16px] font-normal overflow-hidden">
                  <p>
                    Designed in <span className="text-[#F5F5F5]">Germany</span>
                  </p>
                  <div className="relative overflow-hidden">
                    <a
                      href="https://youtu.be/i9B3IX-JWOA"
                      target="_blank"
                      className="w-full"
                    >
                      <div
                        className="h-[288px] w-[456px] overflow-hidden rounded-lg cursor-pointer relative"
                        style={{
                          backgroundImage:
                            "url(https://i.ytimg.com/vi/i9B3IX-JWOA/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLD3ejw_rfx7tW8ya_zCb1-vowSJmw)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div className="bg-[#F5F5F5] w-[75px] h-[75px] flex flex-row justify-center items-center rounded-full opacity-90 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-8"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#202021] flex flex-col items-center justify-center h-[30vh] w-screen">
          <div className="flex flex-col items-center justify-center h-[30vh] max-w-[1400px] gap-16  divide-y-[1px] divide-[#606061]">
            <div className="flex flex-row gap-36">
              <div className="flex flex-col gap-4">
                <div
                  style={{
                    backgroundImage: `url("assets/logo.png")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "112px",
                    height: "22px",
                  }}
                />
                <p className="text-[#999999] text-[16px] font-normal">
                  Website made by{" "}
                  <span className="text-[#F5F5F5]">
                    studio<sup>22</sup>
                  </span>
                  <br />
                  Cloned by{" "}
                  <span className="text-[#F5F5F5]">@MatthewYakligian</span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[#F5F5F5] text-[18px] font-medium">
                  Products
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  HEAVN One
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  HEAVN Pure
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Find retailer
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[#F5F5F5] text-[18px] font-medium">
                  Company
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  About us
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Light knowledge
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Magazine
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[#F5F5F5] text-[18px] font-medium">More</p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Contact
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Support
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Downloads
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[#F5F5F5] text-[18px] font-medium">
                  Subscribe to the newsletter
                </p>

                <input
                  className="w-[300px] h-[40px] rounded-[8px] bg-[#27272A] text-[16px] focus:outline-none font-normal p-4 text-[#F5F5F5]"
                  placeholder="E-Mail"
                />
                <button className="w-[300px] h-[50px] rounded-[8px] bg-[#F5F5F5] text-[16px] p-2 font-normal text-[#18181A]">
                  Sign up
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-4 mt-4">
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  © 2024 | HEAVN
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Imprint
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Privacy Policy
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Cookie Policy
                </p>
                <p className="text-[#F5F5F5] text-[16px] font-normal">
                  Terms of Service
                </p>
              </div>

              <div className="flex flex-row items-center gap-4 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                  fill="#F5F5F5"
                  className="size-8"
                >
                  <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  className="size-7"
                >
                  <g clip-path="url(#clip0_963_5644)">
                    <path
                      d="M10 2.76147C12.6719 2.76147 12.9883 2.77319 14.0391 2.82007C15.0156 2.86304 15.543 3.0271 15.8945 3.16382C16.3594 3.34351 16.6953 3.56226 17.043 3.90991C17.3945 4.26147 17.6094 4.59351 17.7891 5.05835C17.9258 5.40991 18.0898 5.94116 18.1328 6.91382C18.1797 7.96851 18.1914 8.28491 18.1914 10.9529C18.1914 13.6248 18.1797 13.9412 18.1328 14.9919C18.0898 15.9685 17.9258 16.4959 17.7891 16.8474C17.6094 17.3123 17.3906 17.6482 17.043 17.9959C16.6914 18.3474 16.3594 18.5623 15.8945 18.7419C15.543 18.8787 15.0117 19.0427 14.0391 19.0857C12.9844 19.1326 12.668 19.1443 10 19.1443C7.32813 19.1443 7.01172 19.1326 5.96094 19.0857C4.98438 19.0427 4.45703 18.8787 4.10547 18.7419C3.64063 18.5623 3.30469 18.3435 2.95703 17.9959C2.60547 17.6443 2.39063 17.3123 2.21094 16.8474C2.07422 16.4959 1.91016 15.9646 1.86719 14.9919C1.82031 13.9373 1.80859 13.6209 1.80859 10.9529C1.80859 8.28101 1.82031 7.9646 1.86719 6.91382C1.91016 5.93726 2.07422 5.40991 2.21094 5.05835C2.39063 4.59351 2.60938 4.25757 2.95703 3.90991C3.30859 3.55835 3.64063 3.34351 4.10547 3.16382C4.45703 3.0271 4.98828 2.86304 5.96094 2.82007C7.01172 2.77319 7.32813 2.76147 10 2.76147ZM10 0.960693C7.28516 0.960693 6.94531 0.972412 5.87891 1.01929C4.81641 1.06616 4.08594 1.23804 3.45313 1.48413C2.79297 1.74194 2.23438 2.08179 1.67969 2.64038C1.12109 3.19507 0.78125 3.75366 0.523438 4.40991C0.277344 5.04663 0.105469 5.77319 0.0585938 6.83569C0.0117188 7.90601 0 8.24585 0 10.9607C0 13.6755 0.0117188 14.0154 0.0585938 15.0818C0.105469 16.1443 0.277344 16.8748 0.523438 17.5076C0.78125 18.1677 1.12109 18.7263 1.67969 19.281C2.23438 19.8357 2.79297 20.1794 3.44922 20.4333C4.08594 20.6794 4.8125 20.8513 5.875 20.8982C6.94141 20.9451 7.28125 20.9568 9.99609 20.9568C12.7109 20.9568 13.0508 20.9451 14.1172 20.8982C15.1797 20.8513 15.9102 20.6794 16.543 20.4333C17.1992 20.1794 17.7578 19.8357 18.3125 19.281C18.8672 18.7263 19.2109 18.1677 19.4648 17.5115C19.7109 16.8748 19.8828 16.1482 19.9297 15.0857C19.9766 14.0193 19.9883 13.6794 19.9883 10.9646C19.9883 8.24976 19.9766 7.90991 19.9297 6.84351C19.8828 5.78101 19.7109 5.05054 19.4648 4.41772C19.2188 3.75366 18.8789 3.19507 18.3203 2.64038C17.7656 2.08569 17.207 1.74194 16.5508 1.48804C15.9141 1.24194 15.1875 1.07007 14.125 1.02319C13.0547 0.972412 12.7148 0.960693 10 0.960693Z"
                      fill="white"
                    />
                    <path
                      d="M10 5.82397C7.16406 5.82397 4.86328 8.12476 4.86328 10.9607C4.86328 13.7966 7.16406 16.0974 10 16.0974C12.8359 16.0974 15.1367 13.7966 15.1367 10.9607C15.1367 8.12476 12.8359 5.82397 10 5.82397ZM10 14.2927C8.16016 14.2927 6.66797 12.8005 6.66797 10.9607C6.66797 9.12085 8.16016 7.62866 10 7.62866C11.8398 7.62866 13.332 9.12085 13.332 10.9607C13.332 12.8005 11.8398 14.2927 10 14.2927Z"
                      fill="white"
                    />
                    <path
                      d="M16.5391 5.62085C16.5391 6.28491 16 6.82007 15.3398 6.82007C14.6758 6.82007 14.1406 6.28101 14.1406 5.62085C14.1406 4.95679 14.6797 4.42163 15.3398 4.42163C16 4.42163 16.5391 4.96069 16.5391 5.62085Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_963_5644">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.960693)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  className="size-7"
                >
                  <g clip-path="url(#clip0_963_5645)">
                    <path
                      d="M20 10.9607C20 5.43784 15.5229 0.960693 10 0.960693C4.47715 0.960693 0 5.43784 0 10.9607C0 15.9519 3.65684 20.089 8.4375 20.8392V13.8513H5.89844V10.9607H8.4375V8.75757C8.4375 6.25132 9.93047 4.86694 12.2146 4.86694C13.3084 4.86694 14.4531 5.06226 14.4531 5.06226V7.52319H13.1922C11.95 7.52319 11.5625 8.29409 11.5625 9.08569V10.9607H14.3359L13.8926 13.8513H11.5625V20.8392C16.3432 20.089 20 15.9519 20 10.9607Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_963_5645">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.960693)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
