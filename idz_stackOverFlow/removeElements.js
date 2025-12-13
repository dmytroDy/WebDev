
(function () {
    
    document.getElementsByTagName("header")[0]?.remove(); 
    document.getElementById("left-sidebar")?.remove(); 
    document.getElementById("sidebar")?.remove(); 
    document.getElementById("post-form")?.remove();
    document.getElementById("footer")?.remove();
    document.getElementsByClassName("js-bottom-notice")[0]?.remove();

    let accepted_answers = document.querySelectorAll(".accepted-answer");
    accepted_answers.forEach(ans => {
        ans.style.backgroundColor = "orange";
        ans.style.color = "blue";
        ans.style.fontStyle = "italic";
        ans.style.fontWeight = "bold";
});

})();