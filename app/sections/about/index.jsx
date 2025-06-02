"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { HeadingDivider } from "components";

export function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex="0"
						ref={ref}
						className="text-xl font-light leading-relaxed"
						style={{
							transform: isInView ? "none" : "translateX(-200px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						<p>
							Accomplished Full-Stack Developer with 8 years of comprehensive experience specializing in React.js and Next.js.
						</p>
						<p>
							Skilled in building scalable, SEO-friendly web applications using advanced techniques like server-side rendering (SSR),
							static site generation (SSG), and serverless API development.
						</p>
						<p className="my-3.5">
							Proven ability to write clean, maintainable code, deploy production-ready solutions
							through CI/CD pipelines, and collaborate effectively within agile teams to deliver impactful results.
						</p>
						Passionate about continuous learning and staying up-to-date with the latest industry trends to consistently deliver innovative and efficient solutions.

					</div>
				</div>

				{/* <TimeLine /> */}
			</section>
		</LazyMotion>
	);
}
