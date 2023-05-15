document.addEventListener("DOMContentLoaded", function() {
  console.log("JS LOADED");

  var x = new XMLHttpRequest();
  x.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", true);
  x.onreadystatechange = function() {
    if (x.readyState === 4 && x.status === 200) {
      var response = JSON.parse(x.responseText);
      displayQuiz(response);
    }
  };
  x.send();

  function displayQuiz(quizData) {
    var questionDiv = document.getElementById("question-div");
    var submitBtn = document.getElementById("submit-btn");
    var marksGot = document.getElementById("marks-got");
    
    quizData.forEach(function(question) {
      var questionHeading = document.createElement("h2");
      questionHeading.innerHTML = "Q" + question.id + " " + question.question;
      questionDiv.appendChild(questionHeading);

      question.options.forEach(function(option, index) {
        var optionsDiv = document.createElement("div");
        optionsDiv.classList.add("label-div");

        var optionLabel = document.createElement("label");
        optionLabel.id = question.id;

        var radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "option" + question.id;
        radioButton.value = index + 1;
        radioButton.classList.add("option" + question.id);
        radioButton.classList.add("radio-btn");

        var span = document.createElement("span");
        span.innerHTML = option;

        optionLabel.appendChild(radioButton);
        optionLabel.appendChild(span);
        optionsDiv.appendChild(optionLabel);
        questionDiv.appendChild(optionsDiv);
      });

      questionDiv.appendChild(document.createElement("div")).classList.add("seprator");
    });

    submitBtn.addEventListener("click", function(event) {
      event.preventDefault();
      var selected = [];
      var answers = [];

      quizData.forEach(function(question) {
        var name = 'option' + question.id;
        var selectedOption = document.querySelector("input[name='" + name + "']:checked");
        selected.push(selectedOption ? selectedOption.value : null);
        answers.push(question.answer);

        var parentLabel = selectedOption ? selectedOption.parentNode : null;
        if (selectedOption && selectedOption.value == question.answer) {
          var checkIcon = document.createElement("span");
          checkIcon.innerHTML = "<i class='fas fa-check'></i>";
          parentLabel.appendChild(checkIcon);
        } else {
          var crossIcon = document.createElement("span");
          crossIcon.innerHTML = "<i class='fas fa-times'></i>";
          parentLabel.appendChild(crossIcon);

          var correctOption = document.querySelector("input[name='" + name + "'][value='" + question.answer + "']");
          var checkIcon = document.createElement("i");
          checkIcon.classList.add("fas", "fa-check");
          correctOption.parentNode.appendChild(checkIcon);
        }
      });

      var counter = 0;
      for (var i = 0; i < selected.length; i++) {
        if (selected[i] == answers[i]) {
          counter++;
        }
      }
      marksGot.innerHTML = counter + "/5";
    });
  }
});
