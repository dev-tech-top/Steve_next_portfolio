import { Suspense, useRef } from "react";
import { domAnimation, LazyMotion, useInView } from "framer-motion";
import { HeadingDivider, Loader } from "components";
import Error from "../../error";
import { ErrorBoundary } from "react-error-boundary";
import { Projects } from "../../projects/components/Projects";

export function ProjectsSection() {
	const btnRef = useRef(null);
	const isBtnInView = useInView(btnRef, { once: true });

	const projects = [
		{
			description: "",
			images: Array(4)
				.fill(0)
				.map((_, index) => ({
					original: `assets/e-shop${index}.jpg`,
					thumbnail: `assets/e-shop${index}.jpg`,
					originalAlt: "E-commerce website",
					thumbnailAlt: "E-commerce website",
					description: "E-commerce website"
				})),
			liveUrl: "https://strideon.ca/",
			stack: [
				"Next",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Emotion",
				"Sass",
				"Redux",
				"Zustand",
				"Ant Design",
				"Shadcn UI",
				"Node",
				"Express",
				"Next API",
				"GraphQL",
				"Strapi",
				"NextAuth.js",
				"Firebase Auth",
				"Auth0"
			],
			title: "Online fashion retail platform"
		},
		{
			description: "",
			images: Array(4)
				.fill(0)
				.map((_, index) => ({
					original: `assets/health${index}.jpg`,
					thumbnail: `assets/health${index}.jpg`,
					originalAlt: "Healthcare organization website",
					thumbnailAlt: "Healthcare organization website",
					description: "Healthcare organization website"
				})),

			liveUrl: "https://www.covenanthealth.ca/",
			stack: [
				"Drupal 10",
				"PHP",
				"Twig",
				"HTML5",
				"CSS3",
				"SASS/SCSS",
				"JavaScript (ES6+)",
				"jQuery",
				"Composer",
				"Drush",
				"Postman",
				"Git",
				"Pantheon"
			],
			title: "Health services provider"
		},
		{
			description: "",
			images: Array(4)
				.fill(0)
				.map((_, index) => ({
					original: `assets/chat${index}.jpg`,
					thumbnail: `assets/chat${index}.jpg`,
					originalAlt: "Business communication tool",
					thumbnailAlt: "Business communication tool",
					description: "Business communication tool"
				})),
			liveUrl: "https://paqt.chat/",
			stack: [
				"React",
				"Vue",
				"Tailwind CSS",
				"Bootstrap",
				"SCSS",
				"Node",
				"PHP",
				"WebSockets",
				"Socket.IO",
				"RESTful",
				"GraphQL",
				"PostgreSQL",
				"OAuth 2.0",
				"JWT",
				"AWS",
				"Heroku",
				"Jenkins",
				"GitHub",
				"Docker"
			],
			title: "Legal-tech SaaS platform"
		}
	];
	return (
		<LazyMotion features={domAnimation}>
			<section id="projects" className="section">
				<HeadingDivider title="Latest projects" />
				<div className="h-10 md:h-14" />

				<div className="flex flex-col items-center gap-8 md:gap-14">
					<Suspense
						fallback={
							<div className="flex-center">
								<Loader />
							</div>
						}
					>
						<ErrorBoundary FallbackComponent={Error}>
							<Projects projects={projects} />
						</ErrorBoundary>
					</Suspense>
				</div>
			</section>
		</LazyMotion>
	);
}
