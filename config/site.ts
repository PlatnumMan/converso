export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Converso",
  description:
    "Welcome to Fiston's Personal Blog, where a young software engineer shares his love for programming and knowledge with the world. Join Fiston as he explores various programming topics, offering practical tips, tutorials, and industry insights. Let's code, learn, and create remarkable things together.",
  currentlyAt: "Maurecourt",
  socialLinks: {
    twitter: "https://twitter.com/iamdroid3",
    youtube: "https://youtube.com/@root-plat",
    github: "https://github.com/PlatnumMan",
    linkedin: "https://www.linkedin.com/in/fiston-n-707776260/",
    instagram: "https://www.instagram.com/fiston.us/",
  },
};

export default siteConfig;
