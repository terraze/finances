import React from "react";
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

    static dolar(value) {
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'USD', minimumFractionDigits: 2});
    }

    static getBillsForWeek(week, account, bills, transactions) {
        let weekStart = Datetime.weekStartDay(week);
        let weekEnd = Datetime.weekEndDay(week);
        let weekBills = [];
        for(let item of bills) {            
            item.include = true;
            if(item.day >= weekStart && item.day <= weekEnd) {
                for(let transaction of transactions){
                    if(item.bill === transaction.name){
                        item.include = false;
                        break;
                    }
                }
            } else {
                item.include = false;
            }
            if(item.include){
                let transaction = Finance.newTransaction(null);
                transaction.is_fixed = true;
                transaction.name = item.bill;
                transaction.value = item.value;
                transaction.date = Datetime.firebaseFormat(Datetime.currentDate());
                weekBills.push(transaction);
            }
        }
        return weekBills;
    }

    static newTransaction(account) {
        return {
            account: account,
            date: null,
            formField: {
              name: React.createRef(),
              value: React.createRef()
            },
            id: '',
            is_entrance: null,
            name: '',
            status: false,
            value: 0,
            is_fixed: false
      }
    }
};

export default Finance;