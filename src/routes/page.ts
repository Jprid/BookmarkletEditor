export function unminify(script: string) {
  let s = decodeURI(script)
    .replaceAll("javascript:(", "")
    .replaceAll(")()", "")
    .replaceAll(";", ";\n    ")
    // remove indentation before last closing bracket, rigged up for 1 pair of brackets atm
    .replaceAll(" {", "{\n    ")
    .replaceAll("    }", "}");
  return s;
}
