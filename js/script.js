// Sticky Navigation Menu JS Code
document.addEventListener("DOMContentLoaded", function () {
  let phrases = [
    "I'm Vishal Mistry",
    "Passionate Learner",
    "Technology Enthusiast",
    "Full Stack Web Developer"
  ];

  let typedContainer = document.getElementById("typed-lines");
  let currentIndex = 0;

  function addNewTypedLine() {
    if (currentIndex < phrases.length) {
      let newLine = document.createElement("div");
      newLine.classList.add("text-two");
      newLine.setAttribute("id", "typed-" + currentIndex);
      typedContainer.appendChild(newLine);

      new Typed("#typed-" + currentIndex, {
        strings: [phrases[currentIndex]],
        typeSpeed: 50,
        showCursor: false,
        onComplete: function () {
          currentIndex++;
          setTimeout(addNewTypedLine, 500); // Delay before adding the next line
        }
      });
    }
  }

  addNewTypedLine(); // Start typing effect
});


let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
let val;
let exps;
fetch('assets/experiences.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON data from the response
  })
  .then(data => {
    exps = data.experiences; // Store the JSON data
    console.log(exps); // Log the data to the console
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });

window.onscroll = function () {
  console.log("Scroll")
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

//Click Event on paragraph
const projectsTag = document.getElementById('projects');

projectsTag.addEventListener('click', (e) => {
  console.log(e.target.id);
  window.location.href = `projects.html?projectType=${e.target.id}`
});

var modal = document.getElementById("myModal");

// Get the button that opens the modal
document.querySelectorAll(".box.expBtn").forEach(button => {
  button.addEventListener("click", function () {
    const expData = exps.filter(e => e.organization == button.id)[0]
    document.getElementById('expHeader').innerText = expData['organization']
    document.getElementById('expDate').innerText = expData['start_date'] + " -" + expData['end_date']
    document.getElementById('expLocation').innerText = expData['location']

    let respon = '<ul>';

    expData['responsibilities'].forEach(element => {
      respon = respon + '<li>' + element + '</li>'
    });

    respon = respon + '</ul>';

    respon = respon + '<br><br><h4>Skills : </h4>'

    expData['skills'].forEach(element => {
      respon = respon + element + "  ,"
    });

    respon = respon + '<br><br><h4>Tech Stack : </h4>'

    expData['tech_stack'].forEach(element => {
      respon = respon + element + "<br>"
    });

    respon = respon + '<br><br>'


    document.getElementById('expRespon').innerHTML = respon;

    modal.style.display = "block";
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function () {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}