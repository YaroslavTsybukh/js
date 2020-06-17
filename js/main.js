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
            appDatasavings = false;
        }else{
            appData.savings = true;
        }
    });

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt ("Введите обязательную статью расходов в этом месяце", ""),
                b = prompt ("Во сколько обойдется?", "");
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
        
                console.log ("done");
        
                appData.expenses[a] = b;
            } else {
                console.log ("bad result");
                i--;
            }
        
        }
    },

    detectLevel: function () {
        
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
    
                appData.monthIncome = save/100/12*percent;
                alert("Доход с Вашего депозита в месяц: " + appData.monthIncome);
        }
    },
    chooseIncome: function () {

        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

        if (typeof(items) != "string" || items == "" || typeof(items) == null) {
            console.log("Вы ввели некорректные данные или не ввели их вовсе");
        } else {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?"));
            appData.income.sort();
        }

        appData.income.forEach (function (itemmassive, i) {
            alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
        });

    }


};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}

