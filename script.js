$(document).ready(function() { //event handler starts starts the game when doc is fully loaded and ready.
    //These lines declare and initialize variables used in the game logic
    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;
    let board = ['', '', '', '', '', '', '', '', ''];

  
    $('.cell').click(function() { //selects all elements with the class "cell" and sets up a click event handler for them
      let cellId = $(this).attr('id'); //retrieve the ID of the clicked cell and gets the index number from it.
      let cellIndex = cellId.split('-')[1]; //The ID is split at the '-' character, and the second element (index 1) is taken out.
  
      if (board[cellIndex] === '' && gameActive) { //checks if cell is empty and if game is still active.
        board[cellIndex] = currentPlayer; //update the game board array with the current player's symbol at the clicked cell index
        $(this).text(currentPlayer);//text content of the clicked cell is also updated
  
        if (checkWin(currentPlayer)) {  //current player has won, a message is displayed, and the game is marked as inactive.
          showAlert(currentPlayer + ' Wins!');
          gameActive = false;
        } else if (moves === 8) { //it's a draw (all moves have been made), a message is displayed, and the game is marked as inactive.
          showAlert("It's a Draw!");
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          $('#turn').text(currentPlayer + "'s Turn"); //display whose turn it is
        }
  
        moves++; //increments the moves counter after a valid move has been made.
      }
    });
  
    $('#restart').click(function() {  //resets game
      currentPlayer = 'X';
      gameActive = true;
      moves = 0;
      board = ['', '', '', '', '', '', '', '', ''];
  
      $('.cell').text(''); //clear the text content of all cells.
      $('#turn').text("X's Turn"); //starts with X again
      $('.alert').remove(); //Any existing alert messages (win or draw) are removed from the DOM.
    });
  
    function checkWin(player) {
      var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      for (var i = 0; i < winningCombinations.length; i++) {
        let [a, b, c] = winningCombinations[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
          return true;
        }
      }
  
      return false;
    }
  
    function showAlert(message) {
      var alertHtml = '<div class="alert alert-primary" role="alert">' +
        message +
        '</div>'; // this make sure the opening and closing tags are balanced
  
      $('.container').prepend(alertHtml); // adds the Alert too beginning of its contents.
    }
  });
  