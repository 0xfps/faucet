"use client"

import { MIN_WIDTH } from "@/utils/constants";
import { useEffect, useState } from "react";

export const useGetWindowSize = () => {
    const [windowSize, setWindowSize] = useState(MIN_WIDTH);

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize(window.innerWidth);
        };

        updateWindowSize();
        window.addEventListener('resize', updateWindowSize);

        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

    return windowSize;
};