interface AvailabilitySlot {
    from: string; // ISO 8601 datetime string
    to: string;   // ISO 8601 datetime string
}

export interface StudyRoom {
    id: number;
    name: string;
    description: string;
    image: string; // URL
    capacity: number;
    formid: number;
    isBookableAsWhole: boolean;
    isEventLocation: boolean;
    zoneId: number;
    google: boolean;
    exchange: boolean;
    filter_ids: number[];
    availability: AvailabilitySlot[];
}