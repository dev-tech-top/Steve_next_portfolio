import { Suspense } from "react";
import { AppHeader, AppFooter, AppMetadata } from "components";
import Loading from "./loading";
import "styles/globals.css";
import { ThemeContext } from "context";
import Chatbot from "../components/Chatbot";

export const metadata = { ...AppMetadata };

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q7DN85R4ZR"></script>
				<script dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-Q7DN85R4ZR');
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
