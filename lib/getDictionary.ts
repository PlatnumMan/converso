const dicitionaries = {
  en: () =>
    import("./../dictionaries/en.json").then((module) => module.default),
  fr: () =>
    import("./../dictionaries/fr.json").then((module) => module.default),
};

const getDicitionary = async (locale: string) => {
  if (!locale || locale === undefined) {
    return dicitionaries["en"]();
  } else {
    return dicitionaries[locale as "en" | "fr"]();
  }
};

export default getDicitionary;
