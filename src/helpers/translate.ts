export function translate(transVariable: string, lang: string): string {
  lang = lang.substring(0, 2);

  const translation = [];

  if (lang === "es") {
    translation["whatIsYourName"] = "¿Cómo te llamas?";
    translation["IAmLingua"] = "Hola, soy Lingua";
  }
  else if (lang === "kr") {
    translation["whatIsYourName"] = "이름이 뭐에요?";
    translation["IAmLingua"] = "저는 링구아라고 해요.";
  }
  else {
    translation["whatIsYourName"] = "What is your name?";
    translation["IAmLingua"] = "Hi, I'm Lingua";
  }

  return translation[transVariable];
}
