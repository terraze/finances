import React from "react";
import Datetime from '../utils/datetimeUtils.js';

class Finance {

    static isInput(item) {
        return item.is_entrance;
    }

    static isPaid(item) {
        return item.status;
    }

    static getValue(item) {
        return item.value;
    }

    static getStatus(item) {
        if (Finance.isInput(item)) {
            if (item.status) {
                return 'recebido';
            }
            return 'a-receber';
        } else {
            if (item.status) {
                return 'pago';
            }
            if (item.date !== null) {
                let convertedDate = Datetime.fromDatabase(item.date);
                if (Datetime.isExpired(convertedDate)) {
                    return 'vencido';
                }
                if (Datetime.expiresToday(convertedDate)) {
                    return 'vence-hoje';
                }
            }
            if (item.is_fixed) {
                return 'estimado';
            }
            return 'a-vencer';
        }
    }

    static format(value) {
        return value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }

    static getBillsForWeek(week, account, bills, transactions) {
        let weekStart = Datetime.weekStartDay(week);
        let weekEnd = Datetime.weekEndDay(week);
        let weekBills = [];
        for (let item of bills) {
            item.include = true;
            let condition = item.day >= weekStart && item.day <= weekEnd;
            let isNextMonth = false;
            if (weekStart > weekEnd) {
                condition = item.day >= weekStart || item.day <= weekEnd;
                if (item.day < 10) {
                    isNextMonth = true;
                }

            }
            if (condition) {
                for (let transaction of transactions) {
                    if (item.name === transaction.name) {
                        item.include = false;
                        break;
                    }
                }
            } else {
                item.include = false;
            }
            if (item.include) {
                let transaction = Finance.newTransaction(null);
                transaction.is_fixed = true;
                transaction.name = item.bill;
                transaction.value = item.value;
                let bill_date = Datetime.date(
                    item.day
                    + "-"
                    + (Datetime.month(week) + (isNextMonth ? 1 : 0))
                    + "-"
                    + Datetime.year(week)
                );
                transaction.date = Datetime.toDatabase(bill_date);
                weekBills.push(transaction);
            }
        }
        return weekBills;
    }

    static loadTransaction(transaction) {
        transaction.value = Finance.getValue(transaction);
        if (transaction.date == null) {
            transaction.date = '';
        }
        if (transaction.paid_date == null) {
            transaction.paid_date = '';
        }
        return transaction;
    }

    static newTransaction(account) {
        return {
            account: account,
            date: null,
            paid_date: null,
            id: '',
            is_entrance: false,
            name: '',
            status: false,
            value: 0,
            is_fixed: false
        }
    }
};

export default Finance;