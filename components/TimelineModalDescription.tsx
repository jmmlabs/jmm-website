import React from "react";
import type { TimelineModalDescriptionProps } from "./TimelineModal.types";

const TimelineModalDescription: React.FC<Readonly<TimelineModalDescriptionProps>> = ({ description, descriptionRef }) => (
  <div
    ref={descriptionRef}
    className="overflow-y-auto text-base md:text-lg text-muted-foreground mb-2 text-center w-full break-words bg-muted/70 py-2"
    style={{ height: '220px' }}
    tabIndex={0}
  >
    {description}
  </div>
);

export default TimelineModalDescription;
