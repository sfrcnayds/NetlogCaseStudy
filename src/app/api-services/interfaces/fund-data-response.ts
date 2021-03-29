import {Period} from '../../static-data/period-types';
import {FundFormResponse} from './fund-form-response';

export interface FundDataResponse {
    period: Period,
    data: Array<FundFormResponse>
}
