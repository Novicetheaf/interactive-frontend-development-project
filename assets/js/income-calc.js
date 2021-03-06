const TAX_PAYED_OUTPUT_TEXT = "Your total tax payed for the year is: € ";
var uSC;
var normalUniversalSocialCharge;
var lowerUniversalSocialCharge;
var incomeTaxed = document.getElementById("income-taxed-btn");
var inputBox = document.getElementById("income-input");
var outputBox = document.getElementById("income-tax-output");
var netPayOutputBox = document.getElementById("net-pay");
var optionSelectionEmpty = document.getElementById("blank");
var dropDownSelection = document.getElementById("drop-down");

// This calculates the rate of pay per week after tax.
function weeklyPay(totalTax) {

    if (dropDownSelection.value !== optionSelectionEmpty.value) {

        //I used uppercase text for constant const variables following ES6: https://google.github.io/styleguide/javascriptguide.xml
        const WEEKS_PER_YEAR = 52;
        const WEEKLY_PAY_TEXT = "Your weekly pay for the year is: € ";
        let usersIncome = parseFloat(inputBox.value.replace(",", ""));
        let weeklyPayOutput = document.getElementById("weekly-pay");
        let weeklyPay = usersIncome - totalTax;
        weeklyPay = weeklyPay / WEEKS_PER_YEAR;
        weeklyPayOutput.innerHTML = WEEKLY_PAY_TEXT + weeklyPay.toFixed(2);

    }

}

//This function calculates the net pay after tax's owed. 
function netPay(totalTax) {

    let usersIncome = parseFloat(inputBox.value.replace(",", ""));

    if (dropDownSelection.value != optionSelectionEmpty.value) {
        
        const NET_PAYTEXT = "Your net pay for the year is: € ";
        const NET_PAY = usersIncome - totalTax;
        netPayOutputBox.innerHTML = NET_PAYTEXT + NET_PAY.toFixed(2);

    }

}

// This takes tax credits from your total tax owed, if applicable. Those under 13,000 euro are exempt from tax, thus not applicable.
function taxCredits() {

    let taxCreditValue;

    if (dropDownSelection.value == "single" || dropDownSelection.value == "civil-partner") {

        const SINGLE_OR_CIVILP_TAXCREDITVALUE = 3300;
        taxCreditValue = SINGLE_OR_CIVILP_TAXCREDITVALUE;
    }
    else if (dropDownSelection.value == "married") {

        const MARRIED_TAXCREDITVALUE = 4950;
        taxCreditValue = MARRIED_TAXCREDITVALUE;
    }

    return taxCreditValue;

}

//calculates lower universal social charge
function calcLowerUscTaxRange() {

    const usersIncome = parseFloat(inputBox.value.replace(",", ""));
    const LOWER_USC_RATE = 0.005;
    const LOWER_USC_TAXRANGE = 12012;

    if(usersIncome <= LOWER_USC_TAXRANGE) {

        lowerUniversalSocialCharge = usersIncome * LOWER_USC_RATE;

    }
    else {

        lowerUniversalSocialCharge = LOWER_USC_TAXRANGE * LOWER_USC_RATE;

    }
    
}

//calculates normal universal social charge
function calcNormalUscTaxRange() {

    const usersIncome = parseFloat(inputBox.value.replace(",", ""));
    const LOWER_USC_TAXRANGE = 12012;
    const NORMAL_USC_RATE = 0.02;
    normalUniversalSocialCharge = usersIncome - LOWER_USC_TAXRANGE;
    normalUniversalSocialCharge = normalUniversalSocialCharge * NORMAL_USC_RATE;

}

//calculates normal tax charge
function calcNormalTaxRange() {

    const usersIncome = parseFloat(inputBox.value.replace(",", ""));
    const NORMAL_TAX_RATE = 0.20;
    const NORMAL_TAX_RANGE = 35000;
    const NORMAL_USC_TAXRANGE = 13000;
    let normalTaxRate;

    if (usersIncome <= NORMAL_TAX_RANGE && usersIncome > NORMAL_USC_TAXRANGE) {
        
        normalTaxRate = usersIncome * NORMAL_TAX_RATE;
       
    }
    else {

        normalTaxRate = NORMAL_TAX_RANGE * NORMAL_TAX_RATE;
        
    }

    return normalTaxRate;

}

// This calculates rate of tax & usc depending on your income from 12,012 to 35,000 or more, those under 13,000 are exempt from tax, but not usc.
function calcIncomeTaxed() {

    const usersIncome = parseFloat(inputBox.value.replace(",", ""));
    const LOWER_USC_TAXRANGE = 12012;
    const NORMAL_USC_TAXRANGE = 13000;
    const NORMAL_TAX_RANGE = 35000;
    const HIGHER_TAX_RATE = 0.40;
    let totalTax = 0;
    let higherTaxCharge;

    if (usersIncome <= LOWER_USC_TAXRANGE) {

        calcLowerUscTaxRange();
        
        totalTax = lowerUniversalSocialCharge;
        outputBox.innerHTML = TAX_PAYED_OUTPUT_TEXT + totalTax.toFixed(2);

    }
    else if (usersIncome <= NORMAL_USC_TAXRANGE) {

        calcLowerUscTaxRange();
        calcNormalUscTaxRange();

        totalTax = normalUniversalSocialCharge + lowerUniversalSocialCharge;
        outputBox.innerHTML = TAX_PAYED_OUTPUT_TEXT + totalTax.toFixed(2);

    }
    else if (usersIncome <= NORMAL_TAX_RANGE && usersIncome > NORMAL_USC_TAXRANGE) {

        calcLowerUscTaxRange();
        calcNormalUscTaxRange();

        uSC = normalUniversalSocialCharge + lowerUniversalSocialCharge;
        totalTax = calcNormalTaxRange();
        totalTax -= taxCredits();
        totalTax += uSC;

        if (totalTax < 0) {

            outputBox.innerHTML = TAX_PAYED_OUTPUT_TEXT + uSC.toFixed(2);

        }
        else {

            outputBox.innerHTML = TAX_PAYED_OUTPUT_TEXT + totalTax.toFixed(2);

        }
    }
    else if (usersIncome > NORMAL_TAX_RANGE) {

        const normalTaxCharge = calcNormalTaxRange();
        calcLowerUscTaxRange();
        calcNormalUscTaxRange();
        
        higherTaxCharge = usersIncome - NORMAL_TAX_RANGE;
        higherTaxCharge = higherTaxCharge * HIGHER_TAX_RATE;

        totalTax = normalUniversalSocialCharge + lowerUniversalSocialCharge + normalTaxCharge + higherTaxCharge;

        uSC = normalUniversalSocialCharge + lowerUniversalSocialCharge;
        totalTax -= taxCredits();
        totalTax += uSC;
        
        if (totalTax < 0) {

            outputBox.innerHTML = TAX_PAYED_OUTPUT_TEXT + uSC.toFixed(2);

        }
        else {

            outputBox.innerHTML = TAX_PAYED_OUTPUT_TEXT + totalTax.toFixed(2);

        }

    }

    return totalTax;

}

// button listener & validation checker.
incomeTaxed.addEventListener("click", function () {

    const usersIncome = parseFloat(inputBox.value.replace(",", "").replace(".", ""));
    const usersInput = inputBox.value.replace(",", "").replace(".", "");
    let required = $(".required-message");
    let requiredDropDown = $(".required-message-dropdown");


    if (usersInput.startsWith(0)) {

        required.text("Please enter a valid input, like '.20' not 0.20 or 0");
        required.css("color", "red");
        requiredDropDown.text("");

    }
    else if (isNaN(usersIncome) || usersIncome.toString().length != usersInput.length) {

        required.text("This field is required, numbers only.");
        required.css("color", "red");
        requiredDropDown.text("");

    }
    else if ((dropDownSelection.value === optionSelectionEmpty.value)) {
        
        requiredDropDown.text("This field is required, please choose an option.");
        requiredDropDown.css("color", "red");
        required.text("");

    }
    else {

        // setting a variable to be the returned value of the function that it is equals to.
        // I used normal camel case text for non-constant const variables following ES6: https://catalin.red/es6-const-is-not-constant-immutable/
        required.text("");
        requiredDropDown.text("");
        const taxValueReturned = calcIncomeTaxed();
        netPay(taxValueReturned);
        weeklyPay(taxValueReturned);

    }
    
}); 