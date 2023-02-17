export const exportTextFile = ({ cutLag, demoLager }) => {
  console.log(demoLager);

  const element = document.createElement("a");
  const file = new Blob(
    [
      `${"Number Amount"}\n`,
      cutLag &&
        cutLag.numbers
          .map((n) => `${n.number.toString()}${" "}${n.amount.toString()} `)
          .join(`\n`),
    ],
    {
      type: "text/plain",
    }
  );
  const MaxAddFile = new Blob(
    [
      `${"Number Amount"}\n`,
      demoLager &&
        demoLager.extraNumb
          .map((n) => `${n.number.toString()}${" "}${n.amount.toString()} `)
          .join(`\n`),
    ],
    {
      type: "text/plain",
    }
  );
  element.href = URL.createObjectURL(MaxAddFile);
  element.download = "2D.txt";
  document.body.appendChild(element);
  element.click();
};

// lagercut handle
export const dissableBtn = () => {};
