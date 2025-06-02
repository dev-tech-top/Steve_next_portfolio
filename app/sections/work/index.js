"use client";

import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { HeadingDivider, Loader } from "components";

const TimeLineData = [
    { year: "May 2022  –  Apr 2025", title: "Senior Software Engineer", company: "Symetris", text: "Built secure healthcare platforms with React, Next.js, Node.js, and PostgreSQL.", location: "Montreal, QC " },
    { year: "May 2020  –  Apr 2022", title: "Full-Stack Developer", company: "CodeHarbor Studio ", text: "Developed e-commerce and B2B apps using React, Node.js, and Stripe.", location: "Ontario" },
    { year: "Aug 2017  –  Jan 2020", title: "Full-Stack Developer", company: "Paradem Consulting ", text: "Delivered custom web apps with React and Node.js for various sectors.", location: "Montreal, QC" },
];

export function WorkSection() {
    /// TODO: Add color mode support
    const colorMode = "dark";
    const [, setActiveItem] = useState(0);
    const carouselRef = useRef(null);
    // const animRef = useRef(null);
    const isInView = useInView(carouselRef, { once: true });

    const scroll = (node, left) => {
        return node.scrollTo({ left, behavior: "smooth" });
    };

    const handleClick = (e, i) => {
        e.preventDefault();

        if (carouselRef.current) {
            const scrollLeft = Math.floor(
                carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length)
            );

            scroll(carouselRef.current, scrollLeft);
        }
    };

    const handleScroll = () => {
        if (carouselRef.current) {
            const index = Math.round(
                (carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) *
                TimeLineData.length
            );

            setActiveItem(index);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            scroll(carouselRef.current, 0);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <LazyMotion features={domAnimation}>
            <section id="work" className="section">
                <HeadingDivider title="Work Experience" />
                <ul
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex flex-row flex-nowrap gap-5 justify-between overflow-x-auto snap-x cursor-pointer hide-scroll-bar mt-4"
                >
                    <>
                        {TimeLineData.map((item, index) => {
                            return (
                                <li
                                    id={`carousel__item-${index}`}
                                    key={index}
                                    className="flex flex-col gap-3 snap-start"
                                    onClick={(e) => handleClick(e, index)}
                                    style={{
                                        transform: isInView
                                            ? "none"
                                            : `${index === 0 ? "translateY(250px)" : `translateY(${200 / index}px)`}`,
                                        opacity: isInView ? 1 : 0,
                                        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${index === 0 ? 0.5 : 1.05 * index
                                            }s`
                                    }}
                                >

                                    <p className="font-bold text-xl">{`${item.title}`}</p>
                                    <div className="flex flex-col flex-wrap gap-x-2">
                                        <div className="flex flex-wrap items-center gap-x-2 snap-start text-sm sm:text-base">
                                            <p className="italic">{`${item.company} — `} </p>
                                            <p className="ml-1"> {`${item.location}`} </p>
                                        </div>
                                        <h2 className="ml-1">{`${item.year}`}</h2>
                                    </div>
                                    <p className="tracking-wide " tabIndex="0">
                                        {item.text}
                                    </p>
                                </li>
                            );
                        })}
                    </>
                </ul>
            </section>

        </LazyMotion>
    );
}
