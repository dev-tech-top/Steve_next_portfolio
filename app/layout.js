"use client";

import { Suspense, useEffect, useState } from "react";
import { AppHeader, AppFooter, AppMetadata } from "components";
import Loading from "./loading";
import "styles/globals.css";
import { ThemeContext } from "context";
import Chatbot from "../components/Chatbot";

export default function RootLayout({ children }) {
	const [ip, setIp] = useState(null);

	useEffect(() => {
		fetch('https://api.ipify.org?format=json')
			.then(res => res.json())
			.then(data => {
				setIp(data.ip);
				if (typeof window !== 'undefined') {
					window.__VISITOR_IP__ = data.ip;
				}
			})
			.catch(err => console.error('Failed to fetch IP:', err));
	}, []);

	return (
		<html lang="en">
			<head>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q7DN85R4ZR"></script>
				<script dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-Q7DN85R4ZR',{
						user_id: "${typeof window !== 'undefined' && window.__VISITOR_IP__ ? window.__VISITOR_IP__ : ''}"});
				`
				}} />
			</head>
			<body>
				<ThemeContext>
					<AppHeader />
					<Suspense fallback={<Loading />}>{children}</Suspense>
					<AppFooter />
					<Chatbot />
				</ThemeContext>
			</body>
		</html>
	);
}
