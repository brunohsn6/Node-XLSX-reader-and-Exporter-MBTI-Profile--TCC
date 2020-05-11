const excel = require('excel4node');
//returns true to answer '(A)' and false to answer '(B)'
module.exports.verifyAnswer = function(answer){
    if(answer.substring(0, 2))
        return answer.substring(0, 3) == '(A)' ? true : false;
    process.exit(-2);
}
module.exports.sumGroupsAnswers = function(group1, group2){
    return {A: group1.A + group2.A, B: group1.B + group2.B}
}
module.exports.generateOutputFile = function(generatedTypes){
    var workbook = new excel.Workbook();
    var sheet = workbook.addWorksheet("Resultados da Pesquisa");
    var styles = workbook.createStyle({
        alignment: {
            shrinkToFit: true,
            wrapText: false
        }
    });
    sheet.cell(1,2).string("PERFIS");
    generatedTypes.forEach((item, idx)=>{
        sheet.cell(idx+2, 1).string("Pesquisado "+(idx+1)).style(styles)
        sheet.cell(idx+2, 2).string(item).style(styles)
    });
    workbook.write("Extração dos perfis MBTI.xlsx");
}
module.exports.getProfiles = function(groups){
    profile = "";
    dichotomy1 = this.sumGroupsAnswers(groups.group1_counter, {A: 0, B: 0});
    dichotomy2 = this.sumGroupsAnswers(groups.group2_counter, groups.group3_counter);
    dichotomy3 = this.sumGroupsAnswers(groups.group4_counter, groups.group5_counter);
    dichotomy4 = this.sumGroupsAnswers(groups.group6_counter, groups.group7_counter);
    profile = profile.concat(dichotomy1.A > dichotomy1.B ? "E" : "I");
    profile = profile.concat(dichotomy2.A > dichotomy2.B ? "S" : "N");
    profile = profile.concat(dichotomy3.A > dichotomy3.B ? "T" : "F");
    profile = profile.concat(dichotomy4.A > dichotomy4.B ? "J" : "P");
    return profile;
}