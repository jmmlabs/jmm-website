import React from "react";
import type { TimelineModalDescriptionProps } from "./TimelineModal.types";

const TimelineModalDescription: React.FC<Readonly<TimelineModalDescriptionProps>> = ({ description, descriptionRef }) => (
  <div
    ref={descriptionRef}
    className="w-full h-full overflow-y-auto text-base md:text-lg text-muted-foreground mb-2 break-words custom-scrollbar"
    
    tabIndex={0}
  >
    <div className="px-4 py-2 md:px-6 md:py-3">{description}</div>
  </div>
);

export default TimelineModalDescription;
