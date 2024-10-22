export interface Feedback {
    firstName: string;
    lastName: string;
    email: string;
    rating: number;
    comment: string;
}

export interface HousingLocation {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
    feedbacks: Feedback[];
}
