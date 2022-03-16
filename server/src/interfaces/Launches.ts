interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: Date;
    target: string;
    customers: string[];
    upcoming: boolean;
    success: boolean;
}

interface LaunchInput {
    mission: string;
    rocket: string;
    launchDate: Date;
    target: string;
}

export {
    Launch,
    LaunchInput
};