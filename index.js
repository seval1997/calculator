let numbersArray = [];

var historyNumber = "";
$(".mathOps").on("click", function () {
    var mathOpsId = $(this).attr("id");
    selectMathOperation(mathOpsId);
});


$(".number").on("click", function () {
    var numberId = $(this).attr("id");
    showClickEffect(numberId);
    selectNumber(numberId);
});


function showClickEffect(numberId) {
    $("#" + numberId).css("background-color", "red");
    setTimeout(function () {
        $("#" + numberId).css("background-color", "black");
    }, 100);
}


function selectNumber(numberId) {
    var number = numberId.slice(5);
    if (number === "dot") {
        historyNumber = historyNumber + ".";
    } else if (number === "eq") {
        numbersArray.push(historyNumber);
        generateAnswer();
    } else {
        historyNumber = historyNumber + number;
        $("div.numberInputDisplay > p").html(historyNumber);
    }
}

function selectMathOperation(mathOpsId) {
    numbersArray.push(historyNumber);
    historyNumber = "";
    var sign;
    switch (mathOpsId) {
        case "modulo":
            sign = "%";
            break;

        case "divide":
            sign = "/"
            break;

        case "multiply":
            sign = "*";
            break;

        case "subtract":
            sign = "-"
            break;

        case "addition":
            sign = "+";
            break;    
    }
    numbersArray.push(sign);
}

function generateAnswer() {
    var lastInput = numbersArray.at(numbersArray.length-1);
    var answer;
    if(numbersArray.length >= 3 &&  ( lastInput === "%" || lastInput != "/" || lastInput != "*" || lastInput != "-" || lastInput != "+")) {
        while(numbersArray.length >= 3) {
            var input1 = numbersArray.at(0);
            var sign = numbersArray.at(1);
            var input2 = numbersArray.at(2);

            input1 = parseInt(input1);
            input2 = parseInt(input2);

            if(sign === "%") {
                answer = input1%input2;
            } else if (sign === "/") {
                answer = input1 / input2
            } else if (sign === "*") {
                answer = input1 * input2;
            } else if (sign === "-") {
                answer = input1 - input2;
            } else {
                answer = input1 + input2;
            }

            numbersArray.unshift(answer);
            numbersArray.splice(1,3);

            $("div.numberInputDisplay > p").html(answer);
        }        
    }
}

$(".number").hover(function () {
    $(this).css("background-color", "gray");
}, function () {
    $(this).css("background-color", "black");
});

$(".mathOps").hover(function () {
    $(this).css("background-color", "gray");
}, function () {
    $(this).css("background-color", "black");
});

