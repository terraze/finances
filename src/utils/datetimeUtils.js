import moment from 'moment';
import firebase from 'firebase';
import 'moment/locale/pt-br';

class Datetime  {
    static date(date_string) {
        return moment(date_string, "DD-MM-YYYY");
    }

    static currentDate() {
    	let today = moment().locale('pt-br');
        let weekDay = today.format('e');
        if(weekDay < 3){
            today.subtract(1, 'w');
        }
        return today;
    }

    static prevMonth(date) {
    	return moment(date).subtract(1, 'M');
    }

    static nextMonth(date) {
    	Datetime.weekList(moment(date).add(1, 'M'));
    	return moment(date).add(1, 'M');
    }

    static month(date) {
        return parseInt(date.format("MM"));
    }

    static monthName(date) {
    	return date.format('MMMM');
    }

    static year(date) {
    	return parseInt(date.format('YYYY'));
    }

    static monthStart(date) {
		let startOfMonth = moment(date).startOf('month');
		let isGreaterThanWeekStart = startOfMonth.format('d') > 3;
		let startOfFirstWeek = moment(startOfMonth).startOf('week');
		let daysToSum = 3 + (isGreaterThanWeekStart ? 7 : 0);
		let realMonthStart = moment(startOfFirstWeek).day(daysToSum);
		return realMonthStart;	
    }

    static monthEnd(date) {
    	let monthStart = Datetime.monthStart(date);    	
    	let fourWeeksLater = moment(monthStart).add(4, 'w');
    	let isFourWeeks = fourWeeksLater.format("MM") !== monthStart.format("MM");
    	let nextMonthStart = isFourWeeks ? fourWeeksLater : moment(monthStart).add(5, 'w');
    	let previousDay = moment(nextMonthStart).subtract(1, 'd');    	
    	return previousDay;
    }

    static week(date){
        let weekStart = moment(date).startOf('week');
        weekStart.day(3);
        return {
            number: Datetime.weekNumber(weekStart),
            start: weekStart,
            end: moment(weekStart).add(6, 'd')
        }
    }

    static prevWeek(date) {
        return moment(date).subtract(1, 'W');
    }

    static nextWeek(date) {
        Datetime.weekList(moment(date).add(1, 'W'));
        return moment(date).add(1, 'W');
    }

    static weekList(date) {    	
    	let weekList = [];
    	let weekStart = Datetime.monthStart(date);
    	let monthStart = weekStart.format("MM");
    	for(let i = 0; i < 5; i++) {    		
    		let weekMonth = weekStart.format("MM");
    		let weekEnd = moment(weekStart).add(6, 'd');    		
    		if(weekMonth === monthStart){
    			weekList.push({
    				number: Datetime.weekNumber(weekStart),
    				start: moment(weekStart),
    				end: weekEnd
    			})
    		}
    		weekStart.add(1, 'w');
    	}
    	return weekList;
    }

    static d(date) {
        return date.format('D');
    }

    static dm(date) {
    	return date.format('DD/MM');
    }

    static dmy(date) {
    	return date.format('DD/MM/YYYY');
    }

    static toDatePicker(date) {
        if(date === null || date === undefined){
            return '';
        }
        if(typeof date === 'string'){
            return date;
        }
    	return Datetime.fromFirebase(date).format('YYYY-MM-DD');
    }

    static fromDatepicker(date) {
        return Datetime.firebaseUnixFormat(moment(date));
    }

    static weekNumber(date) {
    	return date.format('WW');
    }

    static firebaseFormat(date) {
        return date.toDate();
    }

    static firebaseUnixFormat(date) {
        return { nanoseconds: 0, seconds: moment(date).unix()};
    }

    static fromFirebase(firebaseDate) {
        return moment.unix(firebaseDate.seconds);
    }

    static isExpired(date) {
        let today = moment();
        return today.diff(date, 'days') > 0;
    }

    static expiresToday(date) {
        let today = moment();
        return today.diff(date, 'days') === 0;
    }

    static isBetween(date, start, end) {
        return moment(date).isBetween(start,end,'days', true);
    }

    static weekStartDay(date){
        let weekDay = moment(date).startOf('week');
        weekDay.day(3);
        return parseInt(weekDay.format('D'));
    }

    static weekEndDay(date){
        let weekDay = moment(date).startOf('week');
        weekDay.day(9);
        return parseInt(weekDay.format('D'));
    }

    static toFirebase(date){
        if(!date){
            return null;
        }
        return new firebase.firestore.Timestamp(date.seconds, date.nanoseconds);
    }

    static sort(date1, date2){
        return moment(date1).format('YYYYMMDD') - moment(date2).format('YYYYMMDD');
    }
};

export default Datetime;