class Finance  {

	static dolarPerHour() {
		return 30;
	}

    static isInput(item) {
        return item.is_entrance;
    }

    static getValue(item){
    	if(Finance.isInput && item.dolar != undefined && item.worked_hours != undefined){
    		return item.dolar * item.worked_hours * Finance.dolarPerHour();
    	}

    	return item.value;
    }

    static format(value) {
    	return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }
};

export default Finance;