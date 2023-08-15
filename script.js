board=[
    ['TL','TM','TR'],
    ['ML','MM','MR'],
    ['BL','BM','BR']
]

var crnt=0;
const players = ['X','O'];
var count=0
var cond=1;

function check(sym){
    var dia1=1;
    var dia2=1; 
    for(i=0;i<3;i++){
        if(board[i][0]==sym && board[i][1]==sym && board[i][2]==sym){
            return 0;
        }
        if(board[0][i]==sym && board[1][i]==sym && board[2][i]==sym){
            return 0;
        }
        if(board[i][i]!=sym && dia1==1){
            dia1=0;
        }
        if(board[i][2-i]!=sym && dia2==1){
            dia2=0;
        }
    }

    if(dia2==1 || dia1==1){
        return 0;
    }

    return 1;
}

function play(r,c,pos){
    board[r][c]=players[crnt%2];
    if(document.querySelector(pos).innerHTML!='X' && document.querySelector(pos).innerHTML!='O'){
        document.querySelector(pos).innerHTML=players[crnt%2];
        cond=check(players[crnt%2])

        if(cond==0){
            setTimeout(()=>{
                popup(players[crnt%2]);
            },200);
            return 0;
        }

        crnt+=1;
        count+=1;
        document.querySelector(".crnt-move-ind").innerHTML=`Player <span>${players[crnt%2]}</span>'s Chance :`;

        if(count==9 && cond==1){
            tie()
        }
    }else{
        return 0;
    }
}


function popup(sym){
    document.querySelector(".popup-cont").style.display="grid";
    document.querySelector(".txt-box").innerHTML= `${sym} is the winner`;
}

function tie(){
    document.querySelector(".popup-cont").style.display="grid";
    document.querySelector(".txt-box").innerHTML= `Its a TIE`;
}

function refresh(){
    location.reload()
}


function info(){
    if(document.querySelector(".info-cont").style.display=='none'){
        document.querySelector(".info-cont").style.display="grid";
        document.querySelector(".info-btn-cont").innerHTML="&times";
        document.querySelector(".info-btn-cont").style.transform="scale(3,3)";
        document.querySelector(".info-btn-cont").style.border="none";
        document.querySelector(".info-btn-cont").style.color="#fff";
    }else{
        document.querySelector(".info-cont").style.display="none";
        document.querySelector(".info-btn-cont").innerHTML="i";
        document.querySelector(".info-btn-cont").style.transform="scale(1,1)";
        document.querySelector(".info-btn-cont").style.border="1px solid #000";
        document.querySelector(".info-btn-cont").style.color="#000";
    }
}