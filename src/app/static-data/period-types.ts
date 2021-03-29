export enum Period {
    Daily,
    Weekly,
    Monthly
}

export interface PeriodTypeSelect {
    type: Period;
    name: string;
}

export const periodTypes: Array<PeriodTypeSelect> = [
    {type: Period.Daily, name: 'Günlük'},
    {type: Period.Weekly, name: 'Haftalık'},
    {type: Period.Monthly, name: 'Aylık'}
];
