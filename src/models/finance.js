import Datetime from '../utils/datetimeUtils.js';

class Finance  {

	static dolarPerHour() {
		return 30;
	}

    static isInput(item) {
        return item.is_entrance;
    }

    static isPaid(item) {
	    return item.status;
    }

    static getValue(item){
    	if(Finance.isInput && item.dolar !== undefined && item.worked_hours !== undefined){
    		return item.dolar * item.worked_hours * Finance.dolarPerHour();
    	}

    	return item.value;
    }

    static getStatus(item){
        if(Finance.isInput(item)){
            if(item.status){
                return 'recebido';
            }
            return 'a-receber';
        } else {
            if(item.status){
                return 'pago';
            }
            let convertedDate = Datetime.fromFirebase(item.date);
            if(Datetime.isExpired(convertedDate)){
                return 'vencido';
            }
            return 'a-vencer';
        }
    }

    static format(value) {
    	return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }
};

export default Finance;