import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Physical AI & Robotics",
  tagline: "Bridging digital AI with physical humanoid robots",

  // Set the production url of your site here
  url: "https://ayesha-aziz123.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/Humanoid-Robotics-textbook/",
  trailingSlash: false,

  projectName: "Humanoid-Robotics-textbook", // Repository ka naam
  organizationName: "ayesha-aziz123", // Aapka GitHub username
  deploymentBranch: "gh-pages-new",
  // onBrokenLinks: 'warn',
  // onBrokenMarkdownLinks: 'warn',

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        // Removed blog plugin as it's not relevant for a textbook
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Physical AI & Robotics",

      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Book",
        },
        {
          href: "https://github.com/ayesha-aziz123/Humanoid-Robotics-textbook",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "GitHub Issues",
              href: "https://github.com/ayesha-aziz123/Humanoid-Robotics-textbook/issues",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Project GitHub",
              href: "https://github.com/ayesha-aziz123/Humanoid-Robotics-textbook",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Robotics. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
