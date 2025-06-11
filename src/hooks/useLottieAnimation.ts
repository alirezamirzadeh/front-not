import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-web/build/player/lottie_light";
import { inflate } from "pako";

const useLottieAnimation = (filePath: string) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    const loadLottie = async () => {
      if (!containerRef.current || animationLoaded) return;

      setAnimationLoaded(true);

      try {
        const response = await fetch(filePath);
        const uint8Array = new Uint8Array(await response.arrayBuffer());
        const file = inflate(uint8Array, { to: "string" });
        Lottie.loadAnimation({
          container: containerRef.current,
          animationData: JSON.parse(file),
        });
      } catch (error) {
        console.error("Can't download file", error);
      }
    };

    loadLottie();
  }, [animationLoaded, filePath]);

  return containerRef;
};

export default useLottieAnimation;
