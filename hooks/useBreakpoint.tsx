import { useEffect, useState } from "react";

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>("");
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const width = {
    xs: { min: 0, max: 639 },
    sm: { min: 640, max: 767 },
    md: { min: 768, max: 1128 },
    semilg: { min: 956, max: 1128 },
    lg: { min: 1129, max: 1279 },
    xl: { min: 1280, max: 1744 },
    semixl: { min: 1745, max: 1919 },
    "2xl": { min: 1920, max: Infinity },
  };

  const max = (bp: keyof typeof width) => {
    return innerWidth <= width[bp].max;
  };

  const min = (bp: keyof typeof width) => {
    return innerWidth - 2 >= width[bp].min;
  };

  const calculateBreakpoint = () => {
    const innerWidth = window.innerWidth;
    setInnerWidth(innerWidth);
    // if (innerWidth >= 0 && innerWidth <= 639) {
    //   setBreakpoint("xs");
    // } else if (innerWidth >= 640 && innerWidth <= 767) {
    //   setBreakpoint("sm");
    // } else if (innerWidth >= 768 && innerWidth <= 955) {
    //   setBreakpoint("md");
    // } else if (innerWidth >= 956 && innerWidth <= 1128) {
    //   setBreakpoint("semilg");
    // } else if (innerWidth >= 1129 && innerWidth <= 1279) {
    //   setBreakpoint("lg");
    // } else if (innerWidth >= 1280 && innerWidth <= 1744) {
    //   setBreakpoint("xl");
    // } else if (innerWidth >= 1745 && innerWidth <= 1919) {
    //   setBreakpoint("semixl");
    // } else {
    //   setBreakpoint("2xl");
    // }
    const bp = Object.keys(width).find((bp) => {
      return (
        innerWidth >= width[bp as keyof typeof width].min &&
        innerWidth <= width[bp as keyof typeof width].max
      );
    });
    if (bp) setBreakpoint(bp);
  };

  useEffect(() => {
    calculateBreakpoint();
    window.addEventListener("resize", calculateBreakpoint);
    return () => window.removeEventListener("resize", calculateBreakpoint);
  }, []);

  return {
    breakpoint,
    max,
    min,
    innerWidth,
  };
};
