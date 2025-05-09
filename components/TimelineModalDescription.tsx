import React from "react";
import type { TimelineModalDescriptionProps } from "./TimelineModal.types";

const TimelineModalDescription: React.FC<Readonly<TimelineModalDescriptionProps>> = ({ description, descriptionRef }) => (
  <div
    ref={descriptionRef}
    className="w-full h-full overflow-y-auto text-base md:text-lg text-muted-foreground mb-2 break-words py-2"
    
    tabIndex={0}
  >
    {description}
  </div>
);

export default TimelineModalDescription;
