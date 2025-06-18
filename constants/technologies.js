
import { AiFillHtml5, AiOutlineAntDesign, AiFillGithub, AiFillGitlab } from "react-icons/ai";
import { DiCss3, DiVisualstudio, DiPostgresql, DiMysql } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaWordpressSimple, FaFigma, FaTrello, FaPhp, FaNode, FaAws, FaDrupal, FaDocker } from "react-icons/fa";
import { SiTypescript, SiJquery, SiStrapi, SiComposer, SiDrupal, SiNginx, SiVercel, SiNetlify, SiPostman, SiJest, SiCypress } from "react-icons/si";
import { BsBootstrap, BsFiletypeSass } from "react-icons/bs";
import { TbBrandNextjs, TbBrandTailwind, TbBrandMongodb } from "react-icons/tb";
import AdobeXDIcon from "public/assets/svg/adobexd.svg";
import ZeplinIcon from "public/assets/svg/zeplin.svg";
import WebstormIcon from "public/assets/svg/webstorm.svg";
import JiraIcon from "public/assets/svg/jira.svg";
import MuiIcon from "public/assets/svg/mui.svg";
import ExpressIcon from "public/assets/svg/express.svg";
import { Zap } from 'lucide-react';

export const TECHNOLOGIES = [
	{
		category: "Front-end",
		items: [
			{ name: "HTML5", icon: <AiFillHtml5 size={32} /> },
			{ name: "CSS3", icon: <DiCss3 size={32} /> },
			{ name: "SASS/SCSS", icon: <BsFiletypeSass size={32} /> },
			{ name: "JavaScript", icon: <IoLogoJavascript size={32} /> },
			{ name: "TypeScript", icon: <SiTypescript size={32} /> },
			{ name: "jQuery", icon: <SiJquery size={32} /> },
			{ name: "React.js", icon: <FaReact size={32} /> },
			{ name: "Next.js", icon: <TbBrandNextjs size={32} /> },
			{ name: "Tailwind CSS", icon: <TbBrandTailwind size={32} /> },
			{ name: "Ant Design", icon: <AiOutlineAntDesign size={32} /> },
			{ name: "Bootstrap", icon: <BsBootstrap size={32} /> },
			{ name: "Shadcn UI", icon: <Zap className="text-purple-500" size={32} /> }
		]
	},
	{
		category: "Backend & CMS",
		items: [
			{ name: "Node.js", icon: <FaNode size={32} /> },
			{ name: "Express.js", icon: <ExpressIcon size={32} /> },
			{ name: "PHP", icon: <FaPhp size={32} /> },
			{ name: "MySQL", icon: <DiMysql size={32} /> },
			{ name: "PostgreSQL", icon: <DiPostgresql size={32} /> },
			{ name: "MongoDB", icon: <TbBrandMongodb size={32} /> },
			{ name: "Drupal", icon: <FaDrupal size={32} /> },
			{ name: "Strapi", icon: <SiStrapi size={32} /> },
			{ name: "Headless WordPress", icon: <FaWordpressSimple size={32} /> },
			{ name: "Composer", icon: <SiComposer size={32} /> },
			{ name: "Drush", icon: <SiDrupal size={32} /> }
		]
	},
	{
		category: "DevOps & Deployment",
		items: [
			{ name: "GitHub", icon: <AiFillGithub size={32} /> },
			{ name: "GitLab", icon: <AiFillGitlab size={32} /> },
			{ name: "Docker", icon: <FaDocker size={32} /> },
			{ name: "Nginx", icon: <SiNginx size={32} /> },
			{ name: "AWS", icon: <FaAws size={32} /> },
			{ name: "Vercel", icon: <SiVercel size={32} /> },
			{ name: "Netlify", icon: <SiNetlify size={32} /> }
		]
	},
	{
		category: "Tools & Testing",
		items: [
			{ name: "Jira", icon: <JiraIcon size={32} /> },
			{ name: "Trello", icon: <FaTrello size={32} /> },
			{ name: "Figma", icon: <FaFigma size={32} /> },
			{ name: "Zeplin", icon: <ZeplinIcon size={32} /> },
			{ name: "Adobe XD", icon: <AdobeXDIcon size={32} /> },
			{ name: "VS Code", icon: <DiVisualstudio size={32} /> },
			{ name: "WebStorm", icon: <WebstormIcon size={32} /> },
			{ name: "Postman", icon: <SiPostman size={32} /> },
			{ name: "Jest", icon: <SiJest size={32} /> },
			{ name: "Cypress", icon: <SiCypress size={32} /> },
		]
	}
];
