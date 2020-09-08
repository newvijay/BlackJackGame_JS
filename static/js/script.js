function ClickMe() {
    var year=prompt("Enter the year you born" );
    var ageInDays= (2020 - year)*365;
    var h1=document.createElement('h1');
    var txt=document.createTextNode("You are " + ageInDays+ " days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(txt);
    document.getElementById('flex-box-result').appendChild(h1);
}


function reset() {
document.getElementById('ageInDays').remove();
}

function CatGenerator() {
    var img=document.createElement('img');
    var div=document.getElementById("flex-box-cat");
    img.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(img)
}

function rpsGame(yourChoice) {
var humanChoice,botChoice;

humanChoice=yourChoice.id;
botChoice=numberToChoice(randomTorpsInt());

var results=decideWinner(humanChoice,botChoice);
var message=finalMessage(results);

rpsFrontEnd(yourChoice.id,botChoice,message);

}

function randomTorpsInt() {
    return Math.floor(Math.random()*3);
}

function numberToChoice(number) {
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,botChoice) {
    var rpsDb={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }

    var yourScore=rpsDb[yourChoice][botChoice];
    var botScore=rpsDb[botChoice][yourChoice];
    return [yourScore,botScore];
}

function finalMessage([yourScore,botScore]) {
    if (yourScore === 0)
        return {'message':'You Lost!','color':'red'};
        else if (yourScore === 0.5)
                    return {'message':'Its a tie!','color':'yellow'};
                    else
                    return {'message':'You Won!','color':'green'};
}

function rpsFrontEnd(humanChoice,computerChoice,finalMsg) {
    var imgDb={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var msgDiv=document.createElement('div');

    humanDiv.innerHTML ="<img src='"+imgDb[humanChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px blue;'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);


    msgDiv.innerHTML="<h1 style='color: " + finalMsg['color']+"; font-size: 60px; padding:30px;'>"+finalMsg['message']+"</h1>";
    document.getElementById('flex-box-rps-div').appendChild(msgDiv);

    botDiv.innerHTML ="<img src='"+imgDb[computerChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px red;'>";
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}
var all_buttons=document.getElementsByTagName("button");
let copyAllbuttons=[]
var flag="True";

function buttonColorChange(selectedone) {
    if(flag ==="True") {
        for (let i = 0; i < all_buttons.length; i++) {
            copyAllbuttons.push(all_buttons[i].classList[1]);
        }
        flag="False";
    }
    if(selectedone.value === "red")
buttonsRed();
else if (selectedone.value === "green")
buttonsGreen();
  else if (selectedone.value === "random")
buttonsRandom();
  else if (selectedone.value === "resett")
buttonsReset();
}

function buttonsRed() {
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset() {
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllbuttons[i]);
    }
}

function buttonsRandom() {
    for(let i=0;i<all_buttons.length;i++)
    {
        var rnd=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllbuttons[rnd]);
    }
}


//black-jack game
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'ties':0,
    'isStand':false,
    'isHit':false,
    'turnsOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3');
const lossSound=new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackJackHit)

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic)

document.querySelector('#blackjack-deal-button').addEventListener('click',blackJackDeal)

document.querySelector('#blackjack-reset-button').addEventListener('click',blackJackDealReset)


function blackJackHit() {
    if(blackjackGame['isStand']===false) {
        blackjackGame['isHit']=true;
        let randomCard = randomCards();
        showCard(randomCard, YOU);
        updateScore(randomCard, YOU);
        showScore(YOU);
    }

}

function showCard(card,activePlayer) {
    if(activePlayer['score']<21) {
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/' + card + '.png';
        document.querySelector(activePlayer ['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackJackDeal() {
    // let winner=computeWinner();
    // showResult(winner);
    if (blackjackGame['isStand']===true && blackjackGame['isHit']===true) {
        if (blackjackGame['turnsOver'] === false) {
            let winner = computeWinner();
            showResult(winner);
            blackjackGame['turnsOver'] = true
        } else {
            removeImages(YOU);
            removeImages(DEALER);
            document.querySelector('#blackjack-result').textContent = "Let's Play";
            document.querySelector('#blackjack-result').style.color = 'black';
            blackjackGame['isStand'] = false;
            blackjackGame['turnsOver'] = false;
            blackjackGame['isHit'] = false;
        }
    }
}

function blackJackDealReset() {
    // let winner=computeWinner();
    // showResult(winner);
            removeImages(YOU);
            removeImages(DEALER);
            document.querySelector('#blackjack-result').textContent = "Let's Play";
            document.querySelector('#blackjack-result').style.color = 'black';
            blackjackGame['isStand'] = false;
            blackjackGame['turnsOver'] = false;
            blackjackGame['isHit'] = false;
}

function removeImages(something) {
    let Images=document.querySelector(something['div']).querySelectorAll('img');

    for(let i=0;i<Images.length;i++)
    {
        Images[i].remove();
    }
    document.querySelector(something['scoreSpan']).textContent=0;
    document.querySelector(something['scoreSpan']).style.color='white';

    something['score']=0;

}

function randomCards() {
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer) {
    if(activePlayer['score']<21) {
        if (card === 'A') {
            if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] < 21)
                activePlayer['score'] += blackjackGame['cardsMap'][card][1];
            else
                activePlayer['score'] += blackjackGame['cardsMap'][card][0];

        } else
            activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score']>21){
      document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerLogic() {
    if (blackjackGame['isHit'] === true && blackjackGame['turnsOver']===false) {
        blackjackGame['isStand'] = true;
        while (DEALER['score']<16 && blackjackGame['isStand']===true && DEALER['score']<YOU['score']) {
            let randomCard = randomCards();
            showCard(randomCard, DEALER);
            updateScore(randomCard, DEALER);
            showScore(DEALER);
            await sleep(1000);
        }
            blackjackGame['turnsOver'] = true;
            let winner = computeWinner();
            showResult(winner);

    }
}

function computeWinner() {
    let winner;
     if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || DEALER['score']>21)
        {
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if (DEALER['score']>YOU['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if (YOU['score']===DEALER['score']){
            blackjackGame['ties']++;
            winner="Tied";
        }

    }
    else if (YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;
    }
        else if (YOU['score']>21 && DEALER['score']>21) {
            blackjackGame['ties']++;
        winner = "Tied";
    }

        console.log(winner);
        blackjackGame['turnsOver'] = true;
        return winner;
}

function showResult(winner) {
    if(blackjackGame['turnsOver']===true) {
        let message, messageColor;

        if (winner === YOU) {
            message = "You Won!";
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            message = "You Lost!";
            messageColor = 'red';
            lossSound.play();
        } else {
            message = "Its a Tie";
            messageColor = 'Orange';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        document.querySelector('#draws').textContent = blackjackGame['ties'];

    }

}
