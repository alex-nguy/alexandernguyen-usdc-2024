/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    // Updates the resulting objects SearchTerm
    var wordBreak = "";
    var previousFoundTerm = {};
    result.SearchTerm = searchTerm;
    
    for(let i = 0; i < scannedTextObj.length; i++) {  
        let book = scannedTextObj[i];
        let contentsInBook = book.Content;
        for(let j = 0; j < contentsInBook.length; j++) {
            let terms = contentsInBook[j]["Text"];
            terms = wordBreak + terms;
            if(terms.includes(searchTerm)) {
                if(wordBreak) {
                    let firstTerm = terms.split(" ")[0];
                    if(firstTerm.includes(searchTerm)) {
                        result.Results.push(previousFoundTerm);
                    }
                }
                let foundTerm = {
                    "ISBN": book.ISBN,
                    "Page": contentsInBook[j].Page,
                    "Line": contentsInBook[j].Line
                }
                result.Results.push(foundTerm);
            }
            if(isHyphenatedWordBreak(terms)) {
                wordBreak = getLastTerm(terms).replace('-','');
                previousFoundTerm = {
                    "ISBN": book.ISBN,
                    "Page": contentsInBook[j].Page,
                    "Line": contentsInBook[j].Line
                }
            }
            else {
                wordBreak = "";
                previousFoundTerm = {};
            }
        }
    }
    return result; 
}

function getLastTerm(terms) {
    let lengthOfTerms = terms.split(" ").length;
    return terms.split(" ")[lengthOfTerms - 1];
}

function isHyphenatedWordBreak(terms) {
    let lastTerm = getLastTerm(terms);
    return lastTerm.charAt(lastTerm.length - 1) === '-' ? true : false;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOut2 = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOut3 = {
    "SearchTerm": "hello",
    "Results": []
}

const twentyLeaguesOut4 = {
    "SearchTerm": "howevr",
    "Results": []
}

const twentyLeaguesOut5 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const twentyLeaguesOut6 = {
    "SearchTerm": "canadian\'s",
    "Results": []
}
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

const test3result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut2) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut2);
    console.log("Received:", test3result);
}

const test4result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (test4result.Results.length == 2) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOut2.Results.length);
    console.log("Received:", test4result.Results.length);
}

const test5result = findSearchTermInBooks("hello", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut3) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOut3);
    console.log("Received:", test5result);
}

const test6result = findSearchTermInBooks("hello", twentyLeaguesIn); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", twentyLeaguesOut3.Results.length);
    console.log("Received:", test6result.Results.length);
}

const test7result = findSearchTermInBooks("howevr", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut4) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", twentyLeaguesOut4);
    console.log("Received:", test7result);
}

const test8result = findSearchTermInBooks("howevr", twentyLeaguesIn); 
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", twentyLeaguesOut4.Results.length);
    console.log("Received:", test8result.Results.length);
}

const test9result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut5) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", twentyLeaguesOut5);
    console.log("Received:", test9result);
}

const test10result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (test10result.Results.length == 1) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", twentyLeaguesOut5.Results.length);
    console.log("Received:", test10result.Results.length);
}

const test11result = findSearchTermInBooks("canadian\'s", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut6) === JSON.stringify(test11result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", twentyLeaguesOut6);
    console.log("Received:", test11result);
}

const test12result = findSearchTermInBooks("canadian\'s", twentyLeaguesIn); 
if (test12result.Results.length == 0) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", twentyLeaguesOut6.Results.length);
    console.log("Received:", test12result.Results.length);
}