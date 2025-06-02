const author = "Steve Bayard";
const description =
	"Software developer from Canada, who loves to develop beautiful websites, single page applications, customer relationship management or code from scratch using React and Next.js";
const url = "https://Steve-Bayard.vercel.app";
export const AppMetadata = {
	metadataBase: new URL("https://Steve-Bayard.vercel.app/"),
	title: {
		default: `Portfolio | ${author}`,
		template: `%s | ${author}`
	},
	description: description,
	icons: {
		icon: "/favicon.png"
	},
	keywords: [
		"Steve Bayard",
		"Steve Bayard - Senior software developer",
		"Senior Full-stack developer",
		"Portfolio website",
		"Senior software Developer Portfolio"
	],
	creator: author,
	authors: [{ name: author, url: url }],
	colorScheme: "dark",
	openGraph: {
		title: `${author} | Portfolio`,
		description: description,
		url: url,
		siteName: `${author} | Portfolio`,
		images: [
			{
				url: " https://steve-portfolio-ebon.vercel.app/",
				width: 800,
				height: 600,
				alt: "My personal portfolio website"
			},
			{
				url: " https://steve-portfolio-ebon.vercel.app/",
				width: 1800,
				height: 1600,
				alt: "My personal portfolio website"
			}
		],
		locale: "en-US",
		type: "website"
	}
};
