$(document).ready(function() {
  // var userList = document.getElementById("user-list");
  var gameList = $("tbody");
  var gameContainer = $(".history-container");
  getUser();

  $("#user-list").change(function(){
    var $userdropdown = $(this);
    var userId = $userdropdown.val();
    console.log(userId);
    getuserTeams(userId);
  });

  $("#team-list").change(function(){
    var $teamdropdown = $(this);
    var teamId = $teamdropdown.val();
    console.log(teamId);
    getuserGames(teamId);
  });
 
      // Function for retrieving authors and getting them ready to be rendered to the page
      function getUser() {
        $.get("http://localhost:3000/api/all/users", function(data) {
        console.log(data);
        var $option = $("#user-list");      
          for (var i = 0; i < data.users.length; i++) {
            $option.append($("<option></option>").attr("value",data.users[i].id).text(data.users[i].username));          
          }
          // console.log(userList)
        });
      }
       
      function getuserTeams(id) {
        $.get("http://localhost:3000/api/all/teams/" + id , function(data) {
          // data = data.filter(team => team.user_id = parseInt($userdropdown.val()));
        console.log(data);
        var $option = $("#team-list");      
        for (var i = 0; i < data.teams.length; i++) {
          $option.append($("<option></option>").attr("value",data.teams[i].id).text(data.teams[i].name));          
        }
        })
      }

      function getuserGames(id) {
        $.get("http://localhost:3000/api/all/games/" + id, function(data) {
          console.log(data);
          var rowsToAdd = [];
          for (var i = 0; i < data.games.length; i++) {
            rowsToAdd.push(createGameRow(data.games[i]));        
          }
          renderGameList(rowsToAdd);
          
        })
      }

      function createGameRow(gameData) {
        var newTr = $("<tr>");
        newTr.data("game", gameData);
        // newTr.append("<td>" + gameData.home_team_id + "</td>");
        newTr.append("<td>" + gameData.home_team.name + "</td>");
        // newTr.append("<td>" + gameData.opp_team_id + "</td>");
        newTr.append("<td>" + gameData.opp_team.name + "</td>");
        // newTr.append("<td>" + gameData.win_team_id + "</td>");
        if (gameData.home_team_id === gameData.win_team_id){
         newTr.append("<td>" + gameData.home_team.name + "</td>"); 
        }
        else {
         newTr.append("<td>" + gameData.opp_team.name + "</td>"); 
        }
        return newTr;    
      }

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

      function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-info");
        alertDiv.text("No Home Games Played Yet, Check in Later !!!");
        gameContainer.append(alertDiv);
      }    
});


  