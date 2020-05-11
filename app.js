const readXlsxFile = require('read-excel-file/node');
const utils = require('./utils.js');
const pathToFile = process.argv[2];
/*
the array will be filled with arrays of objects that contains the following structure:
[
    group1_counter: {
        A : (number_counter),
        B : (number_counter)
    },
    group2_counter: {
        A : (number_counter),
        B : (number_counter)
    },
    group3_counter: {
        A : (number_counter),
        B : (number_counter)
    },
    group4_counter: {
        A : (number_counter),
        B : (number_counter)
    },
    group5_counter: {
        A : (number_counter),
        B : (number_counter)
    },
    group6_counter: {
        A : (number_counter),
        B : (number_counter)
    },
    group7_counter: {
        A : (number_counter),
        B : (number_counter)
    },
]
*/
let generatedTypes = [];

if(pathToFile == undefined){
    console.log("É necessário passar por argumento o caminho do arquivo a ser analisado!");
}

else{
    readXlsxFile(pathToFile)
    .then(rows =>{
        rows.forEach((row, idx) =>{
            if(idx != 0){
                console.log("Pesquisa "+idx)
                let values = Object.values(row);
                let feedback = {
                    group1_counter: {
                        A : 0,
                        B : 0
                    },
                    group2_counter: {
                        A : 0,
                        B : 0
                    },
                    group3_counter: {
                        A : 0,
                        B : 0
                    },
                    group4_counter: {
                        A : 0,
                        B : 0
                    },
                    group5_counter: {
                        A : 0,
                        B : 0
                    },
                    group6_counter: {
                        A : 0,
                        B : 0
                    },
                    group7_counter: {
                        A : 0,
                        B : 0
                    }
                };
                for(let i = 9, res= 1; i < values.length; i++){
                    switch(res){
                        case 1:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group1_counter.A += 1;
                            }else{
                                feedback.group1_counter.B += 1;
                            } 
                            break;
                        case 2:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group2_counter.A += 1;
                            }else{
                                feedback.group2_counter.B += 1;
                            } 
                            break;
                        case 3:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group3_counter.A += 1;
                            }else{
                                feedback.group3_counter.B += 1;
                            } 
                            break;
                        case 4:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group4_counter.A += 1;
                            }else{
                                feedback.group4_counter.B += 1;
                            } 
                            break;
                        case 5:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group5_counter.A += 1;
                            }else{
                                feedback.group5_counter.B += 1;
                            } 
                            break;
                        case 6:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group6_counter.A += 1;
                            }else{
                                feedback.group6_counter.B += 1;
                            } 
                            break;
                        case 7:
                            if(utils.verifyAnswer(values[i])){
                                feedback.group7_counter.A += 1;
                            }else{
                                feedback.group7_counter.B += 1;
                            } 
                            break;
                        default:
                            console.log("An error ocurred!")
                            return process.exit(-1);
                    }
                    if(res != 1 && res % 7 == 0){
                        res = 1;
                    }
                    else{
                        res = res + 1;
                    }
                }
                let profile = utils.getProfiles(feedback)
                console.log("perfil : "+ profile)
                generatedTypes.push(profile);
            }

        })
        utils.generateOutputFile(generatedTypes);
    });
}