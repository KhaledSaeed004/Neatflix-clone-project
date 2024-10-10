import { useState, useEffect } from "react";

function useScreenSize() {
    const [screenSize, setScreenSize] = useState("lg");

    useEffect(() => {
        const handleResize = () => {
            const sm = window.matchMedia("(max-width: 640px)");
            const md = window.matchMedia("(max-width: 768px)");
            const lg = window.matchMedia("(max-width: 1024px)");

            if (sm.matches) {
                setScreenSize("sm");
            } else if (md.matches) {
                setScreenSize("md");
            } else if (lg.matches) {
                setScreenSize("lg");
            } else {
                setScreenSize("xl");
            }
        };

        // Set initial screen size
        handleResize();

        window.addEventListener("resize", handleResize);

        // Clean up on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Only run once on mount/unmount

    return screenSize;
}

export default useScreenSize;
