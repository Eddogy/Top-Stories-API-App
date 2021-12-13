"use strict";
//-------------------------------------------------
const nyTimesApiUrl = document.querySelector("#nyTimes");
const nyTimesButtons = document.querySelector("#nyTimes-buttons");
//-------------------------------------------------
fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=YourApiKey")
  .then((respone) => respone.json())
  .then((data) => {
    console.log(data.results); // Api Results
    //---------------------------All Button-------------------------//
    const buttonAll = document.createElement("button");
    buttonAll.className = "btn";
    buttonAll.textContent = "all";
    buttonAll.setAttribute(
      "onclick",
      `filterSelection('${buttonAll.textContent}')`
    );
    nyTimesButtons.append(buttonAll);
    //-----Finding, Creating Unique Section Values And Buttons------//
    const sectionResult = data.results.reduce((unique, o) => {
      if (!unique.some((obj) => obj.section === o.section)) {
        unique.push(o);
      }
      return unique;
    }, []);

    for (let i = 0; i < sectionResult.length; i++) {
      const sectionItems = sectionResult[i];
      const uniqueSections = sectionItems.section;
      const sectionButtons = document.createElement("button");
      sectionButtons.textContent = uniqueSections;
      sectionButtons.className = "btn";
      sectionButtons.setAttribute(
        "onclick",
        `filterSelection('${sectionButtons.textContent}')`
      );
      nyTimesButtons.append(sectionButtons);
    }
    //----------------Creating Elements---------------------------//
    data.results.map((article) => {
      const sectionArticle = document.createElement("p");
      sectionArticle.className = "section-title";
      sectionArticle.textContent = article.section;
      nyTimesApiUrl.append(sectionArticle);

      const imageArticle = document.createElement("img");
      imageArticle.className = "image-article";
      imageArticle.setAttribute("src", article.multimedia[0].url);
      nyTimesApiUrl.append(imageArticle);

      const titleArticle = document.createElement("h1");
      titleArticle.className = "title-article";
      titleArticle.textContent = article.title;
      nyTimesApiUrl.appendChild(titleArticle);

      const descriptionArticle = document.createElement("p");
      descriptionArticle.className = "description-article";
      descriptionArticle.textContent = article.abstract;
      nyTimesApiUrl.appendChild(descriptionArticle);

      const readMoreArticle = document.createElement("a");
      readMoreArticle.className = "read-more-article";
      readMoreArticle.setAttribute("href", article.short_url);
      readMoreArticle.textContent = article.style = "Read more...";
      nyTimesApiUrl.appendChild(readMoreArticle);

      const divArticle = document.createElement("div");
      divArticle.className = `nyTimes-article ${sectionArticle.textContent} show`;
      nyTimesApiUrl.append(divArticle);
      data.results.forEach(() => {
        divArticle.append(
          sectionArticle,
          imageArticle,
          titleArticle,
          descriptionArticle,
          readMoreArticle
        );
      });
    });
  });
//-------------------------------------------------
filterSelection("all");
function filterSelection(c) {
  const x = document.getElementsByClassName("nyTimes-article");
  if (c === "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (let i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

//-----------Show filtered elements-----------//
function AddClass(element, name) {
  const arr1 = element.className.split(" ");
  const arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

//---------Hide elements that are not selected------//
function RemoveClass(element, name) {
  const arr1 = element.className.split(" ");
  const arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
//-------------------------------------------------