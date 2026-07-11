export interface Lead {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  scope: 'standard' | 'advanced';
  notes?: string;
  timestamp: string;
}

export type Locale = 'FR' | 'EN';

export const TRANSLATIONS = {
  FR: {
    navHome: "Accueil",
    navPillars: "Piliers",
    navShowcase: "Composants",
    navConfig: "Configurateur",
    tryFree: "Démarrer",
    contactLicence: "Gabarit v1.0.0",

    // Slide 1: Accueil
    heroBadge: "Gabarit de cadre d'application minimaliste",
    heroHeadingLine1: "L'art du design",
    heroHeadingLine2: "propulsé par une",
    heroHeadingLine3: "architecture propre.",
    heroDesc: "Un cadre applicatif d'exception doté de transitions fluides et d'un défilement sticky avec angles arrondis. Conçu pour servir de base haut de gamme à tout projet web moderne.",
    heroCtaQuote: "Interactive Demo",
    heroCtaServices: "Explorer le Gabarit",
    liveUtc: "Horloge Système",
    serverHealth: "État Serveur",
    serverOk: "OPÉRATIONNEL",

    // Slide 2: Piliers
    whyUsTitle: "Principes Directeurs",
    whyUsSubtitle: "L'Ingénierie de la Fluidité",
    whyUsDesc: "Notre architecture logicielle privilégie la réactivité, le typage strict et des transitions fluides préservant la mise en page.",
    pillar1Title: "Stylisation Tailwind",
    pillar1Desc: "Entièrement stylisé avec des classes utilitaires pour des layouts modernes et légers.",
    pillar2Title: "Transitions Fluides",
    pillar2Desc: "Héritage d'empilement sticky calculé dynamiquement avec des angles adoucis permanents.",
    pillar3Title: "Sécurité TypeScript",
    pillar3Desc: "Règles strictes de typage à travers tout le projet pour une maintenance sans effort.",
    pillar4Title: "Composants Modulaires",
    pillar4Desc: "Séparation complète des préoccupations permettant des intégrations ou modifications aisées.",

    // Slide 3: Showcase
    showcaseTitle: "Gabarit de Composants",
    showcaseSubtitle: "Grilles & Éléments Interactifs",
    showcaseDesc: "Exemples de jetons de conception, cartes de contenu et grilles bento adaptatives.",
    card1Title: "Jeton de Couleur A",
    card1Badge: "Orange Éclat",
    card1Desc: "Notre couleur d'accentuation dynamique symbolisant l'énergie et les points d'interaction importants du produit.",
    card2Title: "Jeton de Couleur B",
    card2Badge: "Beige Naturel",
    card2Desc: "Un fond doux à faible contraste procurant un grand confort visuel et un aspect haut de gamme.",
    card3Title: "Jeton de Couleur C",
    card3Badge: "Charbon Profond",
    card3Desc: "Une nuance sombre pour structurer les textes et créer un contraste parfait.",

    // Slide 4: Configurator Form
    formTitle: "Formulaire",
    formSubtitle: "Configuration Interactive",
    formScopeLabel: "Type de Projet",
    formScopeStandard: "Configuration Standard",
    formScopeAdvanced: "Configuration Avancée",
    formAreaLabel: "Valeur de Variable",
    formAreaSubtitle: "Faites glisser pour modifier l'évaluation globale",
    formFirstName: "Prénom",
    formLastName: "Nom",
    formEmail: "Adresse courriel",
    formPhone: "Numéro de téléphone",
    formSuccessTitle: "Données Soumises !",
    formSuccessNotice: "L'état local a été mis à jour avec succès. Vos informations sont mémorisées.",
    formCtaPrev: "Précédent",
    formCtaNext: "Suivant",
    formCtaSubmit: "Valider",
    footerCopy: "© 2026 Template Inc. Tous droits réservés."
  },
  EN: {
    navHome: "Home",
    navPillars: "Piliers",
    navShowcase: "Showcase",
    navConfig: "Configurator",
    tryFree: "Get Started",
    contactLicence: "Template v1.0.0",

    // Slide 1: Accueil
    heroBadge: "Minimalist application framework template",
    heroHeadingLine1: "The art of design",
    heroHeadingLine2: "powered by clean",
    heroHeadingLine3: "architecture.",
    heroDesc: "A premium application framework featuring fluid transitions and sticky scrolling with soft rounded corners. Built to serve as an elegant foundation for any modern web project.",
    heroCtaQuote: "Interactive Demo",
    heroCtaServices: "Explore Template",
    liveUtc: "System Clock",
    serverHealth: "Server Status",
    serverOk: "ONLINE",

    // Slide 2: Piliers
    whyUsTitle: "Core Principles",
    whyUsSubtitle: "Engineered Performance",
    whyUsDesc: "Our software architecture prioritizes responsiveness, strict type-safety, and smooth layout-preserving transitions.",
    pillar1Title: "Tailwind Styling",
    pillar1Desc: "Fully styled using utility classes for modern, lightweight, and responsive layouts.",
    pillar2Title: "Fluid Transitions",
    pillar2Desc: "Dynamically calculated sticky stacking layers with seamless soft rounded corner clips.",
    pillar3Title: "TypeScript Safety",
    pillar3Desc: "Strict type validation throughout the project for frictionless maintenance.",
    pillar4Title: "Modular Components",
    pillar4Desc: "Clean separation of concerns allowing easy customization and expansion.",

    // Slide 3: Showcase
    showcaseTitle: "Component Showcase",
    showcaseSubtitle: "Grids & Interactive Elements",
    showcaseDesc: "Examples of design tokens, content cards, and adaptive bento grid layouts.",
    card1Title: "Color Token A",
    card1Badge: "Bright Orange",
    card1Desc: "Our dynamic accent color representing high energy and primary user interaction points.",
    card2Title: "Color Token B",
    card2Badge: "Natural Beige",
    card2Desc: "A soft, low-contrast canvas background delivering elegant visual comfort.",
    card3Title: "Color Token C",
    card3Badge: "Deep Charcoal",
    card3Desc: "A dark premium shade designed for structured typography and balanced contrast.",

    // Slide 4: Configurator Form
    formTitle: "Configurator",
    formSubtitle: "Interactive State Controls",
    formScopeLabel: "Project Type",
    formScopeStandard: "Standard Scope",
    formScopeAdvanced: "Advanced Scope",
    formAreaLabel: "Variable Value",
    formAreaSubtitle: "Slide to adjust the global evaluation metric",
    formFirstName: "First Name",
    formLastName: "Last Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formSuccessTitle: "Submission Successful!",
    formSuccessNotice: "The local React state has been updated. Your input values are captured.",
    formCtaPrev: "Previous",
    formCtaNext: "Next",
    formCtaSubmit: "Submit",
    footerCopy: "© 2026 Template Inc. All rights reserved."
  }
};
