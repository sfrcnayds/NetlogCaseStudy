export enum Period {
    Daily,
    Monthly,
    Yearly
}

export interface PeriodTypeSelect {
    type: Period;
    name: string;
}

export const periodTypes: Array<PeriodTypeSelect> = [
    {type: Period.Daily, name: 'Günlük'},
    {type: Period.Monthly, name: 'Aylık'},
    {type: Period.Yearly, name: 'Yıllık'}
];
