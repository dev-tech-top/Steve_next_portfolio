import React from "react";

const DemoLink = ({ href, title = "Go to live address" }) => (
  <div className="flex items-center gap-2">
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="icon-link-btn flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
      title={title}
      href={href}
    >
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1.2em"
        width="1.2em"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
      <span>Demo</span>
    </a>
  </div>
);

export default DemoLink;
