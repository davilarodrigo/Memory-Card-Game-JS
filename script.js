
let card_flipped_1
let card_flipped_2

let attempts_left

let cards_flipped = 0
let cards_discovered = 0

function click_card(e) {
    if (attempts_left) {


        let card = e.target

        if (card === card_flipped_1) {
            return
        }

        //alert(card_number)
        card_number = card.getAttribute("card_number")
        if (card_number == 0) {
            return
        }

        attempts_left--
        attempts_span.innerHTML = attempts_left

        set_card_image(card, card_number)

        if (cards_flipped == 2) {
            reset_cards(card_flipped_1, card_flipped_2)
            card_flipped_1 = card
            console.log("cards reset, one card flipped")
        }
        else if (cards_flipped == 1) {
            console.log("two cards flipped")
            cards_flipped = 2
            card_flipped_2 = card
            cards_are_equal(card_flipped_1, card)
        }
        else if (cards_flipped == 0) {
            console.log("one card flipped")
            card_flipped_1 = card
            cards_flipped = 1
        }
    }
}

function cards_are_equal(card1, card2) {
    if (card1.getAttribute("card_number") == card2.getAttribute("card_number")) {
        card1.setAttribute("src", "/docs/assets/images/solved.PNG")
        card2.setAttribute("src", "/docs/assets/images/solved.PNG")
        card1.setAttribute("card_number", 0)
        card2.setAttribute("card_number", 0)
        cards_flipped = 0
        cards_discovered++
        attempts_left++
        attempts_left++    
        attempts_span.innerHTML = attempts_left    
    }
    if (cards_discovered == game_difficulty) {
        alert("You Won!")
    }
    if (attempts_left == 0) {
        alert("you lost :c")
        reveal_cards()
    }
}

function reset_cards(card1, card2) {
    cards_flipped = 1
    set_card_image(card1)
    set_card_image(card2)
}

function set_card_image(card, number = false) {
    if (!number) {
        card.setAttribute("src", "/docs/assets/images/backside.PNG")
    } else {
        card.setAttribute("src", "/docs/assets/images/card" + number + ".PNG")
    }
}

function reveal_cards() {
    console.log("revealing cards")
    cards = document.querySelectorAll(".card>img")

    cards.forEach(card => {
        if (card.getAttribute("card_number") != 0) {
            set_card_image(card, card.getAttribute("card_number"))
        }
    });
}

function reset_game() {
    cards_flipped = 0
    cards_discovered = 0
    board.innerHTML = " "

    game_difficulty = game_difficulty_input.value

    max_game_level = 12

    if (game_difficulty > max_game_level) {
        game_difficulty = max_game_level
        game_difficulty_input.value = max_game_level
    }

    attempts_left = game_difficulty * 3
    attempts_span.innerHTML = attempts_left

    let card_list = []
    for (i = 1; i <= game_difficulty; i++) {
        card_list.push(i)
        card_list.push(i)
    }

    //suffle array
    card_list = card_list.sort(() => 0.5 - Math.random());

    fragment = document.createDocumentFragment()

    //shuffle cards 
    for (i = 0; i < game_difficulty * 2; i++) {
        card = document.createElement("div")
        button = document.createElement("button")
        img = document.createElement("img")
        img.setAttribute("src", "/docs/assets/images/backside.PNG")
        card.appendChild(img)
        card.classList.add("card")
        fragment.appendChild(card)

        card_number = card_list.pop()
        img.setAttribute("card_number", card_number)

        img.addEventListener("click", click_card);
    }
    board.appendChild(fragment)
}

game_difficulty_input = document.getElementById("game_difficulty_input")
reset_game_button = document.getElementById("reset_game_input")
attempts_span = document.getElementById("attempts")
board = document.getElementsByClassName("board")[0]
reset_game_button.addEventListener("click", reset_game)

console.clear()
reset_game()




