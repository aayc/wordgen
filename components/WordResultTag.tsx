import { WordResult } from "../utils/types";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { useRef } from "react";

type WordResultTagProps = {
  word: WordResult;
};

function copyText(toast: any, text: string) {
  navigator.clipboard.writeText(text);
  toast.current.show({
    severity: "success",
    summary: "Copied",
    detail: "Copied text to clipboard",
  });
}

export default function WordResultTag(props: WordResultTagProps) {
  const toast = useRef(null);
  const options = [
    {
      label: "Check domain availability",
      icon: "pi pi-check",
      command: () => {
        (toast as any).current.show({
          severity: "info",
          summary: "Coming soon",
          detail:
            "This feature will be released in a future version, please check back later.",
        });
      },
    },
    {
      label: "Generate similar words",
      icon: "pi pi-refresh",
      command: () => {
        (toast as any).current.show({
          severity: "info",
          summary: "Coming soon",
          detail:
            "This feature will be released in a future version, please check back later.",
        });
      },
    },
    {
      label: "Copy to clipboard",
      icon: "pi pi-copy",
      command: () => {
        copyText(toast, props.word.word);
      },
    },
  ];
  return (
    <>
      <Toast ref={toast}></Toast>
      <SplitButton
        label={props.word.word}
        model={options}
        onClick={(_) => copyText(toast, props.word.word)}
        className="p-button-sm p-button-success font-weight-normal mx-2 my-2"
      ></SplitButton>
    </>
  );
}
