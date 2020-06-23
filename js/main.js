let btn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),



    chooseIncome = document.querySelector(".choose-income")
    checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


    let money, time;



    btn.addEventListener('click' , function() { 
        money = +prompt ("Ваш бюджет на месяц?", "");
        time = prompt ("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
        appData.budget = money ; 
        appData.timeData = time ; 
        budgetValue.textContent = money.toFixed();
        yearValue.value = new Date (Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate();
    });

    expensesItemBtn.addEventListener('click', function() {
        let sum = 0;
        for (let i = 0; i < expensesItem.length ; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
        
                console.log ("done");
        
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ("bad result")
                i--
            }  
        }
        expensesValue.textContent=sum; 
    });


    optionalExpensesBtn.addEventListener('click' , function() {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
            let questionOptExpenses = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = questionOptExpenses;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
        }
    });

    countBudgetBtn.addEventListener('click' , function () {
        appData.moneyPerDay = (appData.budget / 25).toFixed(0);
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = ("Это минимальный уровень достатка!");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = ("Это средний уровень достатка!");
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = ("Это высокий уровень достатка!");
        } else {
            levelValue.textContent = ("Ошибочка...!");
        }
    });

    chooseIncome.addEventListener('input', function() {
        let items = chooseIncome.value;
        appData.income = items.split(", ");
        incomeValue.textContent = appData.income;
    });


    checkSavings.addEventListener('click', function() {
        if(appData.savings == true){
            appData.savings = false;
        }else{
            appData.savings = true;
        }
    });


    sumValue.addEventListener('input', function(){
        if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });


    percentValue.addEventListener('input', function(){
        if(appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;

                appData.monthIncome = sum/100/12*percent;
                appData.yearIncome = sum/100*percent;
                monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
                yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
            }
    })
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,   
}

