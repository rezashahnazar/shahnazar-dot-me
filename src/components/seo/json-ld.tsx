import { siteConfig } from "@/config/site";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.nameEn,
    alternateName: [siteConfig.name, "Reza Shahnazar Nezhad Khalesi", "رضا شاه نظر نژاد خالصی"],
    url: siteConfig.url,
    image: `${siteConfig.url}/profile-image.png`,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.googleScholar,
      siteConfig.social.medium,
      siteConfig.social.youtube,
      siteConfig.social.threads,
    ],
    jobTitle: ["Cardiologist", "Software Engineer"],
    worksFor: {
      "@type": "Organization",
      name: "Digikala",
      url: "https://www.digikala.com",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Tehran University of Medical Sciences",
        url: "https://tums.ac.ir",
      },
      {
        "@type": "Organization",
        name: "Tehran Heart Center",
        url: "https://tehranheartcenter.ir",
      },
    ],
    knowsAbout: [
      "Cardiovascular Medicine",
      "Software Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Development",
      "Product Management",
    ],
    award: "Gold Medal - Iran Biology Olympiad",
    description: "Cardiologist and software engineer focused on building data-driven and AI-enabled solutions for healthcare and large-scale digital platforms.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.nameEn,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: "Personal website of Reza Shahnazar - Cardiologist, MD & Software Engineer",
    author: {
      "@type": "Person",
      name: siteConfig.nameEn,
    },
    inLanguage: ["fa", "en"],
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.nameEn} - Medical & Technology Professional`,
    url: siteConfig.url,
    description: "Cardiologist and software engineer specializing in AI-enabled healthcare solutions",
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}

