var totalTax;
var underthirtyFiveK;
var overTwelveK;
var incomeTaxed = document.getElementById("income-taxed-btn");
var inputBox = document.getElementById("income-input"); 
var outputBox = document.getElementById("income-tax-output");
var optionSelection = document.getElementById("blank");
var dropDownSelection = document.getElementById("drop-down");

function calcIncomeTaxed(){
    if(inputBox.value <= 13000 && dropDownSelection.value != optionSelection.value){
        overTwelveK = inputBox.value - 12012;
        overTwelveK = overTwelveK * 0.02;

        underTwelveK = 12012 * 0.005;
        totalTax = overTwelveK + underTwelveK;
        totalTax = totalTax.toFixed(2);
        outputBox.innerHTML = "Your total taxed amount for the year is €" + totalTax; 
    }
    else if(inputBox.value < 35000 && inputBox.value > 13000  && dropDownSelection.value != optionSelection.value){
        overTwelveK = inputBox.value - 12012;
        overTwelveK = overTwelveK * 0.02;
        underTwelveK = 12012 * 0.005;
    
        underthirtyFiveK = inputBox.value * 0.20;
        totalTax = overTwelveK + underTwelveK + underthirtyFiveK;
        totalTax = totalTax.toFixed(2);
        outputBox.innerHTML = "Your total taxed amount for the year is €" + totalTax;
    }
    else if(inputBox.value >= 35000  && dropDownSelection.value != optionSelection.value){
        overTwelveK = inputBox.value - 12012;
        overTwelveK = overTwelveK * 0.02;
        underTwelveK = 12012 * 0.005;

        underthirtyFiveK = 34999 * 0.20;
        let overthirtyFiveK = inputBox.value - 34999;
        overthirtyFiveK = overthirtyFiveK * 0.40;
        
        totalTax = overTwelveK + underTwelveK + underthirtyFiveK + overthirtyFiveK;
        totalTax = totalTax.toFixed(2);
        outputBox.innerHTML = "Your total taxed amount for the year is €" + totalTax; 
    }
    
}

incomeTaxed.addEventListener("click", function(){
    calcIncomeTaxed();
}); 

