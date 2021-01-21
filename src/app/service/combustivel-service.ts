import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SelectItem } from 'primeng/components/common/api';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class CombustivelService{

    constructor(){}

    getCombustivel(){

        return of<SelectItem>(
            {label: 'Álcool', value: 'A'},
            {label: 'Diesel', value: 'D'},
            {label: 'Gasolina', value: 'G'},
            {label: 'Flex', value: 'F'},
            {label: 'Multi-Fuel', value: 'M'},
            {label: 'Híbrido', value: 'H'},
            {label: 'Elétrico', value: 'E'},
            {label: 'Sem Combustível', value: 'S'}
        );
    }

}