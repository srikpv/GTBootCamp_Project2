$(document).ready(function() {
  // Getting references to the table body
  var gameList = $("tbody");
  var gameContainer = $(".history-container");
  getGames();

    // Function for retrieving games and getting them ready to be rendered to the page
    function getGames() {
      $.get("http://localhost:3000/api/all/games", function(data) { 
      var rowsToAdd = [];
        for (var i = 0; i < data.games.length; i++) {
          rowsToAdd.push(createGameRow(data.games[i]));        
        }
        renderGameList(rowsToAdd);
      });
    }

  // Function for creating a new list row for games
  function createGameRow(gameData) {
    var newTr = $("<tr>");
    newTr.data("game", gameData);
    newTr.append("<td>" + gameData.home_team_id + "</td>");
    newTr.append("<td>" + gameData.opp_team_id + "</td>");
    newTr.append("<td>" + gameData.win_team_id + "</td>");
    return newTr;    
  }

  // A function for rendering the list of games to the page
  function renderGameList(rows) {
    gameList.children().not(":last").remove();
    gameContainer.children(".alert").remove();
    if (rows.length) {
      gameList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no games
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("No Games Played Yet, Check in Later !!!");
    gameContainer.append(alertDiv);
  }
});


  