export const exportTextFile = (cutLag) => {
  console.log(cutLag);
  const element = document.createElement("a");
  const file = new Blob(
    [
      `${"Number Amount"}\n`,
      cutLag.numbers
        .map((n) => `${n.number.toString()}${" "}${n.amount.toString()} `)
        .join(`\n`),
    ],
    {
      type: "text/plain",
    }
  );
  element.href = URL.createObjectURL(file);
  element.download = "2D.txt";
  document.body.appendChild(element);
  element.click();
};
