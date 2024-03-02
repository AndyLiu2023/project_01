function trimarray(array){
    return array.map(i => i.trim());
}

function checkarray(array){
    if(!Array.isArray(array)){
        return  trimarray([array]);
    }else{
        return trimarray(array);
    }

}




function fillarray(array){


    let arraynum = array.length;
    for (arraynum; arraynum < 5; arraynum++){
        array.push('null');
    }

}


module.exports ={
    fillarray: fillarray,
    checkarray: checkarray

}