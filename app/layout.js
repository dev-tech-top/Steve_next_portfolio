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
