import React from "react";
import { Progress } from "@nextui-org/react";

export default function ProgressBar() {
  return (
    <Progress
      size="sm"
      radius="sm"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        label: "tracking-wider font-medium text-black",
        value: "text-foreground/60",
      }}
      label="Space used"
      value={75}
      showValueLabel={true}
    />
  );
}

