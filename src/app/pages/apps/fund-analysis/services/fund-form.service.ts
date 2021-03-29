import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FundFormResponse} from '../../../../api-services/interfaces/fund-form-response';
import {FundDataResponse} from '../../../../api-services/interfaces/fund-data-response';

@Injectable({
    providedIn: 'root'
})
export class FundFormService {

    private dataSource = new BehaviorSubject<FundDataResponse>(null);
    currentData = this.dataSource.asObservable();

    changeData(data){
        this.dataSource.next(data);
    }
}
