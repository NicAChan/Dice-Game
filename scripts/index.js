class Player {
    constructor(diceOne, diceTwo, roundScore, totalScore) {
        this.diceOne = diceOne
        this.diceTwo = diceTwo
        this.roundScore = roundScore
        this.totalScore = totalScore
    }
}

let player1 = new Player(1, 1, 0, 0)
let computer = new Player(1, 1, 0, 0)
const players = [player1, computer]
let playerColour = "red"
let computerColour = "blue"
let round = 0
let spinDice, changeDiceImg, rotation

$("#new-game").click(() => {    
    round = 0

    // player1 = new Player(1, 1, 0, 0)
    // computer = new Player(1, 1, 0, 0)

    players.forEach(player => {
        player.diceOne = 1
        player.diceTwo = 1
        player.roundScore = 0
        player.totalScore = 0
    })

    $("#round-counter").html("Round 1")

    $("#player-dice-1").attr("src", `../images/${playerColour}-dice-1.png`)
    $("#player-dice-2").attr("src", `../images/${playerColour}-dice-1.png`)
    $("#computer-dice-1").attr("src", `../images/${computerColour}-dice-1.png`)
    $("#computer-dice-2").attr("src", `../images/${computerColour}-dice-1.png`)

    $("#player-round-score").html("0")
    $("#player-total-score").html("0")
    $("#computer-round-score").html("0")
    $("#computer-total-score").html("0")

    $("#roll-dice").prop("disabled", false)
})

$("#roll-dice").click(() => {
    $("#roll-dice").prop("disabled", true)
    $("#new-game").prop("disabled", true)

    round++
    $("#round-counter").html(`Round ${round}`)

    player1.diceOne = Math.floor(Math.random() * 6) + 1
    player1.diceTwo = Math.floor(Math.random() * 6) + 1
    computer.diceOne = Math.floor(Math.random() * 6) + 1
    computer.diceTwo = Math.floor(Math.random() * 6) + 1

    rotation = 0
    
    spinDice = setInterval(() => {
        rotation += 9
        $("#player-dice-1").css("transform", `rotate(${rotation}deg)`)
        $("#player-dice-2").css("transform", `rotate(${rotation}deg)`)
        $("#computer-dice-1").css("transform", `rotate(${rotation}deg)`)
        $("#computer-dice-2").css("transform", `rotate(${rotation}deg)`)
    }, 25);

    changeDiceImg = setInterval(() => {
        $("#player-dice-1").attr("src", `../images/${playerColour}-dice-${Math.floor(Math.random() * 6) + 1}.png`)
        $("#player-dice-2").attr("src", `../images/${playerColour}-dice-${Math.floor(Math.random() * 6) + 1}.png`)
        $("#computer-dice-1").attr("src", `../images/${computerColour}-dice-${Math.floor(Math.random() * 6) + 1}.png`)
        $("#computer-dice-2").attr("src", `../images/${computerColour}-dice-${Math.floor(Math.random() * 6) + 1}.png`)
    }, 300);

    setTimeout(() => {
        clearInterval(spinDice)
        clearInterval(changeDiceImg)

        $("#player-dice-1").attr("src", `../images/${playerColour}-dice-${player1.diceOne}.png`)
        $("#player-dice-2").attr("src", `../images/${playerColour}-dice-${player1.diceTwo}.png`)
        $("#computer-dice-1").attr("src", `../images/${computerColour}-dice-${computer.diceOne}.png`)
        $("#computer-dice-2").attr("src", `../images/${computerColour}-dice-${computer.diceTwo}.png`)
    
        players.forEach(player => {
            if (player.diceOne == 1 || player.diceTwo == 1){
                player.roundScore = 0
                player.totalScore += 0
            } else if (player.diceOne == player.diceTwo) {
                player.roundScore = 4 * (player.diceOne)
                player.totalScore += player.roundScore
            } else {
                player.roundScore = player.diceOne + player.diceTwo
                player.totalScore += player.roundScore
            }
        });
    
        $("#player-round-score").html(`${player1.roundScore}`)
        $("#player-total-score").html(`${player1.totalScore}`)
        $("#computer-round-score").html(`${computer.roundScore}`)
        $("#computer-total-score").html(`${computer.totalScore}`)

        if (round == 3) {
            $("#roll-dice").prop("disabled", true)

            $("#player-final-score").html(`<b>Player Score: ${player1.totalScore}</b>`)
            $("#computer-final-score").html(`<b>Computer Score: ${computer.totalScore}</b>`)

            if (player1.totalScore > computer.totalScore) {
                $("#result").html("You Win")
                $("#result-msg").html("<b>Congrats, luck was on your side!</b>")
            } else if (player1.totalScore < computer.totalScore) {
                $("#result").html("You Lose")
                $("#result-msg").html("<b>Better luck next time!</b>")
            } else {
                $("#result").html("Tie")
                $("#result-msg").html("<b>The luck was shared evenly!</b>")
            }

            setTimeout(() => {
            $("#result-pop-up").show()
            const fadeIn = setInterval(() => {
                const opacity = parseFloat($("#result-pop-up").css("opacity"))
                if (opacity == 1) {
                    clearInterval(fadeIn)
                } else {
                    $("#result-pop-up").css("opacity", opacity + 0.01)
                }
            }, 10)
            $("#new-game").prop("disabled", false)
            }, 2000);
        } else {
            $("#roll-dice").prop("disabled", false)
            $("#new-game").prop("disabled", false)
        }
    }, 3000);
})

const changeDiceColor = (selectedColor, otherColor) => {
    if (playerColour == otherColor) {
        playerColour = selectedColor
        computerColour = otherColor

        $(`#${otherColor}-die`).css({
            "border": "none",
            "margin": "5px"
        })

        $(`#${selectedColor}-die`).css({
            "margin": "0",
            "border": "solid",
            "border-radius": "5px",
            "border-width": "5px",
            "border-color": "yellow"
        })

        $("#player-dice-1").attr("src", `../images/${playerColour}-dice-${player1.diceOne}.png`)
        $("#player-dice-2").attr("src", `../images/${playerColour}-dice-${player1.diceTwo}.png`)
        $("#computer-dice-1").attr("src", `../images/${computerColour}-dice-${computer.diceOne}.png`)
        $("#computer-dice-2").attr("src", `../images/${computerColour}-dice-${computer.diceTwo}.png`)        
    }
}

$("#red-die").click(() => {
    changeDiceColor("red", "blue")
})

$("#blue-die").click(() => {
    changeDiceColor("blue", "red")
})

$("#close-pop-up").click(()=> {
    $("#result-pop-up").hide()
    $("#result-pop-up").css("opacity", "0")
})