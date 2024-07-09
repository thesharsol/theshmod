function stringDetector(str, sub) {

    // let sub = detectSub(str);
    if(str==sub){ return false}
    let ret = true;
    let strSplit = str.split(sub);
    strSplit.forEach(sp => {
        if (sp != "") {
            ret = false;
        }
    });
    
    return ret;

}

detectSub("ababab")

function detectSub(str) {
    let response = [];

    for (let i = 0; i < str.length; i++) {

        response.push(str[i])

        if (response.length > 1) {
            if (stringDetector(str, response.join(''))) {
                console.log(response.join(''))
                return 0
            }else{
            }
        }

    }
    console.log(-1)
    return -1;
}