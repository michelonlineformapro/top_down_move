//le canvas
let monCanvas = document.getElementById("games-canvas");
//le contexte
let gameContext = monCanvas.getContext('2d');

//largeur
monCanvas.width = window.innerWidth;
//hauteur
monCanvas.height = window.innerHeight;

//Les events touches appuyée et relachée
window.addEventListener('keydown', handleKeyAction);
window.addEventListener('keyup', handleKeyAction);

//la position du player (largeur / 2  et hauteur / 2)
let playerPosition = {
    xPosition: monCanvas.width / 2,
    yPosition: monCanvas.height / 2
};

//Tableau des touches
let keys = [];
//Le compteur de deplacement
let count = 0;

//Les evenement lors des action touches
function handleKeyAction(event){
    //Si on a  ppuie une touche et qu'elle n'est pas dans le tableau key
    if(event.type === 'keydown' && !keys.includes(event.keyCode)){
        //On ajoute la touche au tablau key
        keys.push(event.keyCode);
    }

    //Si la touche est relachée
    if(event.type === 'keyup'){
        //On parcours le tableau key et on eleve la touche pressée
        for(let index = 0; index < keys.length; index++){
            if(keys[index] === event.keyCode){
                //On supprime l'index du tableau
                keys.splice(index, 1);
            }
        }
    }
}

//Deplacer le player
function movePlayer(){
    //la gauche touche Q
    if(keys.includes(81) || keys.includes(37)){
        playerPosition.xPosition -= 5;
    }

    //la droite touche D
    if(keys.includes(68) || keys.includes(39)){
        playerPosition.xPosition += 5;
    }

    //le bas S + down
    if(keys.includes(83) || keys.includes(40)){
        playerPosition.yPosition += 5;
    }

    //le haut touche z + up
    if(keys.includes(90) || keys.includes(38)){
        playerPosition.yPosition -= 5;
    }

}

//Dessiner le player
function drawPlayer(){
    gameContext.beginPath();
    gameContext.fillStyle = '#8C4820';
    //Un cercle
    gameContext.arc(playerPosition.xPosition, playerPosition.yPosition, 15,0,Math.PI * 2);
    //Colore le cercle
    gameContext.fill();
    //Ferme la forme
    gameContext.closePath();
}

//Animer player
function animPlayer(){
    gameContext.clearRect(0,0,monCanvas.width, monCanvas.height);
    //deplacer le player
    movePlayer();
    //dessiner le player
    drawPlayer();
    //canvas animation
    requestAnimationFrame(animPlayer);
}

animPlayer();
