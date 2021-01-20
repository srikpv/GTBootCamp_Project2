var home_team_id = 0;
var opp_team_id = 0;

$(function() {
    $(".nav_button").on("click", function(event) {
      //var id = $(this).data("id");
      //var id = 1;
  
      // Send the GET request.
      var gameData = {
        home_team_id: home_team_id,
        opp_team_id: opp_team_id
      };
      $.ajax("/api/new/game/", {
        type: "PUT",
        data: gameData
      }).then(
        function(response) {
            console.log("response id", response.game.id);
            id = response.game.id;
            window.location.href = "/api/game/"+id;
        }
      );
    });
});

$(function() {
    $(".pick_home_button").on("click", function(event) {
        home_team_id = $(this).data("id");
        $("#home_team_id").val(home_team_id)
      console.log("home team ", home_team_id);
    });
});

$(function() {
    $(".pick_opp_button").on("click", function(event) {
        opp_team_id = $(this).data("id");
        $("#opp_team_id").val(opp_team_id)
        console.log("opp team ", opp_team_id);
    });
});