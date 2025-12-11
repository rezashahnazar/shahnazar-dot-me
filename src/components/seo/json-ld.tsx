import { siteConfig } from "@/config/site";

export function JsonLd() {
  const monthToNumber: Record<string, number> = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const birthMonthNumber = monthToNumber[siteConfig.birthDate.month] ?? 10;
  const birthDateIso = `${siteConfig.birthDate.year}-${String(birthMonthNumber).padStart(2, "0")}-${String(
    siteConfig.birthDate.day
  ).padStart(2, "0")}`;

  const personId = `${siteConfig.url}/#reza-shahnazar`;
  const websiteId = `${siteConfig.url}/#website`;
  const profilePageId = `${siteConfig.url}/#profile`;
  const profileImageUrl = `${siteConfig.url}/profile-image.png`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.nameEn,
    alternateName: [siteConfig.name, "Reza Shahnazar Nezhad Khalesi", "رضا شاه نظر نژاد خالصی"],
    url: siteConfig.url,
    image: profileImageUrl,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.googleScholar,
      siteConfig.social.medium,
      siteConfig.social.youtube,
      siteConfig.social.threads,
    ],
    jobTitle: ["Cardiologist", "Software Engineer"],
    givenName: "Reza",
    familyName: "Shahnazar",
    additionalName: ["Nezhad Khalesi", "نژاد خالصی"],
    birthDate: birthDateIso,
    nationality: {
      "@type": "Country",
      name: "Iran",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    knowsLanguage: ["fa-IR", "en-US"],
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
    description:
      "Reza Shahnazar (رضا شاه‌نظر) is a cardiologist (MD) and software engineer focused on data-driven systems, AI product development, and healthcare and large-scale digital platforms.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.nameEn,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: "Personal website of Reza Shahnazar - Cardiologist, MD & Software Engineer",
    publisher: { "@id": personId },
    inLanguage: ["fa", "en"],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": profilePageId,
    url: siteConfig.url,
    name: siteConfig.title,
    description: `${siteConfig.nameEn} (${siteConfig.name}) - Cardiologist, MD & Software Engineer`,
    inLanguage: "fa-IR",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    primaryImageOfPage: profileImageUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}

