"use client";

import { WelcomeSection, AboutSection, TechnologiesSection, ProjectsSection, WorkSection, ContactSection } from "app/sections";
import { useEffect } from "react";

export default function Page() {
	useEffect(() => {
		// Get visitor info from browser
		const info = {
			userAgent: navigator.userAgent,
			language: navigator.language,
			platform: navigator.platform,
			timestamp: new Date().toISOString(),
		};
		// Send visitor info to /api/info
		fetch('/api/info', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(info)
		});
	}, []);

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
