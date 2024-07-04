board=[
    ['.oo','.oi','.oii'],
    ['.io','.ii','.iii'],
    ['.iio','.ii-i','.iiii']
]

var weightArr = [0,0,0,0,0,0,0,0];

var compWeightArr = [0,0,0,0,0,0,0,0];

var fc;
var sc;

var crnt=0;
const players = ['X','O'];
var count=0
var cond=1;
const grids = document.querySelectorAll(".box");

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
 

function randomPt(r,c){
    do{
        fc = Math.floor(Math.random()*10)%3;
        sc = Math.floor(Math.random()*10)%3;
    }while((fc==r && sc==c) || (board[fc][sc]=='X' || board[fc][sc]=='O') && count<9);
}

function checkForWinMove(){
    for(var i=0;i<6;i++){
        if(compWeightArr[i] == 2 && weightArr[i] == 0){
            if(i<3){
                fc = i;
                sc = 0;
                while((board[fc][sc] == 'X' || board[fc][sc] == 'O') && sc<2){
                    sc +=1;
                }
                return 1;
            }else if(i>=3 && i<6){
                sc = i-3;
                fc = 0;
                while((board[fc][sc] == 'X' || board[fc][sc] == 'O') && fc<2){
                    fc +=1;
                }
                return 1;
            }else{
                if(i==7){
                    fc = 0;
                    sc = 0;
                    while((board[fc][sc] == 'X' || board[fc][sc] == 'O') && fc<2 && sc<2){
                        fc+=1;
                        sc+=1;
                    }
                }

                if(i==8){
                    fc = 0;
                    sc = 2;
                    while((board[fc][sc] == 'X' || board[fc][sc] == 'O') && fc<2 && sc>0){
                        fc+=1;
                        sc-=1;
                    }
                }
            }
        }
    }
    return 0;
}


function autoplay(r,c){


    weightArr[r] +=1;
        weightArr[3+c] +=1;
    
        if(r==c){
            weightArr[6]+=1;
        }
    
        if(r==2-c){
            weightArr[7]+=1;
        }
    
    
    if(!checkForWinMove()){
    
    
        if(count<2){
    
            randomPt(r,c);
            
        }else{
    
            var max = weightArr[0];
            var ind = 0;
    
            for(var i=1;i<8;i++){
                if(weightArr[i]==2 && compWeightArr[i] == 0){
                    max = weightArr[i];
                    ind = i;
                    break
                }
            }
            console.log(weightArr);

    
    
            if(ind<3){
                for(var j=0;j<3;j++){
                    if(board[ind][j]!='X' && board[ind][j]!='O' && count<9){
                        fc = ind;
                        sc = j;
                        break;
                    }
                }
            }else if(ind>=3 && ind<6){
                for(var j=0;j<3;j++){
                    if(board[j][ind-3]!='X' && board[j][ind-3]!='O' && count<9){
                        fc = j;
                        sc = ind-3;
                        break;
                    }
                }
    
            }else{
    
                if(ind==6){
                    for(var j=0;j<3;j++){
                        if(board[j][j]!='X' && board[j][j]!='O' && count<9){
                            fc = j;
                            sc = j;
                            break;
                        }
                    }
                }
    
                if(ind==7){
                    for(var j=0;j<3;j++){
                        if(board[j][2-j]!='X' && board[j][2-j]!='O' && count<9){
                            fc = j;
                            sc = 2-j;
                            break;
                        }
                    }
                }
            }
            if(board[fc][sc]=="X" || board[fc][sc]=="O"){
                randomPt(r,c);
            }
            
        }
        console.log("Pt Calculated");

    }


   

    compWeightArr[fc] += 1;
    compWeightArr[sc+3] += 1;

    console.log(fc + " " + sc); 
    var crntPos = board[fc][sc];
    board[fc][sc]=players[crnt%2];
    document.querySelector(crntPos).innerHTML=players[crnt%2];

}

function play(r,c,pos){
    board[r][c]=players[crnt%2];
    if(document.querySelector(pos).innerHTML!='X' && document.querySelector(pos).innerHTML!='O'){
        document.querySelector(pos).innerHTML=players[crnt%2];
        cond=check(players[crnt%2]);

        if(cond==0){
            setTimeout(()=>{
                popup(players[crnt%2]);
            },200);
            return 0;
        }

        crnt+=1;
        count+=1;


        if(count>=9 && cond==1){
            tie();
        }

        autoplay(r,c);

        cond=check(players[crnt%2]);

        if(cond==0){
            setTimeout(()=>{
                popup(players[crnt%2]);
            },200);
            return 0;
        }

        crnt+=1;
        count+=1;


        if(count>=9 && cond==1){
            tie();
        }
        
    }else{
        return 0;
    }
}

function reset(){
    // board=[
    //     ['.oo','.oi','.oii'],
    //     ['.io','.ii','.iii'],
    //     ['.iio','.ii-i','.iiii']
    // ]
    
    // crnt=0;
    // cond=1;
    // count=0;
    

    // document.querySelector(".crnt-move-ind").innerHTML=`Player <span>${players[crnt%2]}</span>'s Chance :`;
    location.reload()
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
