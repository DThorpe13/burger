$(function() {

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#burgerEntry").val().trim()
        };
        console.log(newBurger);
        //send POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log(`created new burger`)
                //reload page to get update list
                location.reload();
            }
        );
    });


    $(".eat-burger").on("click", function(event) {
        var id = $(this).data("id");
        var confirmEat = $(this).data("neweaten") === false;

        var confirmEatState = {
            devour: confirmEat
        };
        console.log(`id: ${id}
eaten: ${confirmEatState.devour}`);

        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: confirmEatState
        }).then(
            function() {
                console.log(`changed eaten state to: ${confirmEat}`);
                location.reload();
            }
        );
    });

}) 