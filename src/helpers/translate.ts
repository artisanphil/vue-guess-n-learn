export function translate(transVariable: string, lang: string): string {
  lang = lang.substring(0, 2);

  const translation = [];

  if (lang === "es") {
    translation["whatIsYourName"] = "¿Cómo te llamas?";
    translation["IAmLingua"] = "Hola, soy Lingua";
  }
  else {
    translation["whatIsYourName"] = "What is your name?";
    translation["IAmLingua"] = "Hi, I'm Lingua";
  }

  return translation[transVariable];
}
