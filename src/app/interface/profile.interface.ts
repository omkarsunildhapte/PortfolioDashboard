export interface Profile {
    titles: string[];
    profileImages: string;
    bannerImages: string;
    name: string;
    email: string;
    birthDay: {
        seconds: number;
        nanoseconds: number;
    };
    phoneNumber: number;
    city: string;
    state: string;
    country: string;
    freelanceStatus: string;
    jobStatus: string;
    mainRoles: string;
    degree: string;
    aboutInformation: string;
    summary: string;
    quotes: string;
    id: string;
}

export interface Facts {
    noHappyClient: number;
    noProject: number;
    noSupport: number;
    noaward: number;
    qutes: string
}