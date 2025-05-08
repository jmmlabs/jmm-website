export interface TimelineEvent {
  title: string;
  description: string;
  images: string[];
  date: string;
}

export interface TimelineModalHeaderProps {
  readonly title: string;
  readonly date: string;
  readonly onClose: () => void;
}

export interface TimelineModalMainImageProps {
  readonly image: string;
  readonly title: string;
  readonly onZoom: () => void;
}

export interface TimelineModalThumbnailsProps {
  readonly images: string[];
  readonly selectedIdx: number;
  readonly onSelect: (idx: number) => void;
  readonly thumbnailRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  // New unified navigation and loading props
  readonly canImagePrev: boolean;
  readonly canImageNext: boolean;
  readonly handleImagePrev: () => void;
  readonly handleImageNext: () => void;
  readonly loading: boolean;
}

export interface TimelineModalDescriptionProps {
  readonly description: string;
  readonly descriptionRef: React.RefObject<HTMLDivElement | null>;
}

export interface TimelineModalNavigationProps {
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly disablePrev: boolean;
  readonly disableNext: boolean;
}

export interface TimelineModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly card: TimelineEvent;
  readonly currentIdx: number;
  readonly total: number;
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly events: TimelineEvent[];
}
