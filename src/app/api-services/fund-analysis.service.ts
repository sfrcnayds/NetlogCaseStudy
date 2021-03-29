import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FundCodeResponse} from './interfaces/fund-code-response';
import {FundFormResponse} from './interfaces/fund-form-response';

@Injectable({
    providedIn: 'root'
})
export class FundAnalysisService {

    constructor(private http: HttpClient) {
    }

    getFundCodes(fundTypeId: number) {
        const fundCodeURL = `https://ws.spk.gov.tr/PortfolioValues/api/Funds/${fundTypeId}`;
        return this.http.get<Array<FundCodeResponse>>(fundCodeURL);
    }

    getFundData(fundCode: string, fundTypeId: number, dateBegin: string, dateEnd: string) {
        const fundDataURL = `https://ws.spk.gov.tr/PortfolioValues/api/PortfoyDegerleri/${fundCode}/${fundTypeId}/${dateBegin}/${dateEnd}`;
        return this.http.get<Array<FundFormResponse>>(fundDataURL);
    }
}
