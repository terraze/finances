import moment from 'moment';
import 'moment/locale/pt-br';

class Datetime  {
    static currentDate() {
    	return moment().locale('pt-br');
    }

    static prevMonth(date) {
    	return moment(date).subtract(1, 'M');
    }

    static nextMonth(date) {
    	Datetime.weekList(moment(date).add(1, 'M'));
    	return moment(date).add(1, 'M');
    }

    static monthName(date) {
    	return date.format('MMMM');
    }

    static year(date) {
    	return date.format('YYYY');
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

    static dm(date) {
    	return date.format('DD/MM');
    }

    static dmy(date) {
    	return date.format('DD/MM/YYYY');
    }

    static weekNumber(date) {
    	return date.format('WW');
    }

    static firebaseFormat(date) {
        return date.toDate();
    }

    static fromFirebase(firebaseDate) {
        return moment.unix(firebaseDate.seconds);
    }

    static isExpired(date) {
        let today = moment();
        return date.isBefore(today);
    }
};

export default Datetime;