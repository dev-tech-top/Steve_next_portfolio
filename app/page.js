"use client";

import { WelcomeSection, AboutSection, TechnologiesSection, ProjectsSection, WorkSection } from "app/sections";

export default function Page() {
	return (
		<div className="container-md">
			<WelcomeSection />
			<AboutSection />
			<ProjectsSection />
			<TechnologiesSection />
			<WorkSection />
		</div>
	);
}
