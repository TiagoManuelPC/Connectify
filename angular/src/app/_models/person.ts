import { Photo } from "./photo";


export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
    created: Date;
    dateOfBirth: Date;
    emailAddress: string;
    phoneNumber: string;
    gender: string;
    photos: Photo[];
}
