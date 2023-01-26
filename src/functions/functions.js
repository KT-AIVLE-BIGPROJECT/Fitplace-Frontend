// 이름 마스킹 함수
const nameMasking = (str) => {
    let originStr = str;
    let maskingStr;
    let strLength;
    
    if(originStr === ""){
        return originStr;
    }
    
    strLength = originStr.length;
    
    if(strLength < 3){
        maskingStr = originStr.replace(/(?<=.{1})./gi, "*");
    }else {
        maskingStr = originStr.replace(/(?<=.{2})./gi, "*");
    }
    
    return maskingStr;
}

export default nameMasking;