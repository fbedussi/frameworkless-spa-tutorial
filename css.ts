export const css = (strings: TemplateStringsArray, ...values: string[]) => {
  var rules = strings[0]
  for (let i = 0; i < values.length; i++) {
    rules += values[i] + strings[i + 1]
  }

  if (!rules.trim().length) {
    return
  }

  const sheet = new CSSStyleSheet()
  sheet.replaceSync(rules)
  document.adoptedStyleSheets.push(sheet)
}
