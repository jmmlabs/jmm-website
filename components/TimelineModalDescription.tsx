import React from "react";
import type { TimelineModalDescriptionProps } from "./TimelineModal.types";

const TimelineModalDescription: React.FC<Readonly<TimelineModalDescriptionProps>> = ({ description, descriptionRef }) => (
  <div
    ref={descriptionRef}
    className="overflow-y-auto text-base md:text-lg text-muted-foreground mb-2 text-center w-full max-w-2xl break-words rounded bg-muted/70 px-3 py-2"
    style={{ height: '220px' }}
    tabIndex={0}
  >
    {description}
  </div>
);

export default TimelineModalDescription;
