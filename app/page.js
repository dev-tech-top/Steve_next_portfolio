"use client";

import { WelcomeSection, AboutSection, TechnologiesSection, ProjectsSection, WorkSection, ContactSection } from "app/sections";

export default function Page() {
	return (
		<div className="container-md">
			<WelcomeSection />
			<AboutSection />
			<ProjectsSection />
			<TechnologiesSection />
			<WorkSection />
			<ContactSection />
		</div>
	);
}
