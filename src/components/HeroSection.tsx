import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);

  const totalVideos = 4;
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const upcomingVideoIndex = (index: number) => (index % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#current-video", { visibility: "visible" });
        gsap.to("#current-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef?.current?.play();
          },
        });

        gsap.from("#next-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef?.current?.play();
          },
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(18% 0%, 72% 0%, 90% 90%, -3% 100%)",
      borderRadius: "6px",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => upcomingVideoIndex(prevIndex));
  };

  const getVideoSrc = (index: number): string => `videos/hero-${index}.mp4`;

  const handleVideoLoad = () => {
    console.log("Handling video load: ", loadedVideos);
    setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
  };

  return (
    <div className="relative w-screen h-dvh overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative w-screen h-dvh overflow-hidden z-10 bg-blue-75 rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute z-50 absolute-center overflow-hidden rounded-lg size-64 cursor-pointer">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex(currentIndex))}
                loop
                muted
                id="next-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="current-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-75">
              Redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClassName="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default HeroSection;
