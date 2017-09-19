export function loadData(pageNum = 1){
    return new Promise((resolve, reject) => {
        if(pageNum>=10){
            resolve([]);
            reject([]);
        }
        let tempArr = [];
        for(let i=0;i<25;i++){
            tempArr.push(i*pageNum);//Math.round(Math.random()*100)
        }
        setTimeout(() => {
            resolve(tempArr);
            reject(tempArr);
        },1000);
    });
};