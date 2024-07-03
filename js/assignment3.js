//define the modal content object
var modal = {
  //content of "Learn More" button
  "contact": {
    "head": "Contact Us",
    "content": "<p>Want to know more? Please contact us. </p>" +
      "<p>email: contact@jp.sword.asso.ca</p>"
  },
  //content of "Reference" button
  "reference": {
    "head": "Reference",
    "content": "<p>Wikipedia. (2022). <em>Japanese sword</em>. Classification. " +
      "<a href='https://en.wikipedia.org/wiki/Japanese_sword' title='Wikipedia'>" +
      "https://en.wikipedia.org/wiki/Japanese_sword</a></p>"
  }
};
//end of modal object

//define the swords data object for add or remove items
var swords = [
  {
    name: "Katana - 刀",
    img_path: "images/katana.jpg",
    desc: "Katana is a curved blade that the length is between 60 to 90 cm. " +
      "It was developed from the short blade and replaced Tachi at 15th century. " +
      "Normally, it worn with the edge upwards in the sash (a belt in traditional Japanese clothes)."
  },
  {
    name: "Tachi - 太刀",
    img_path: "images/tachi.jpg",
    desc: "Tachi were suspended after 15th century and replaced by Katana. " +
      "The different between Katana and Tachi is that Tachi is longer and more curved. " +
      "The curvature of the sword often centered from the middle and worn with the edge downwards."
  },
  {
    name: "Nodachi - 野太刀",
    img_path: "images/nodachi.jpg",
    desc: "Nodachi is an extremely long Tachi. Some of them were longer than 90cm and " +
      "active in the horse fight in late 14 century."
  }
];
//end of swords array

var content = "";

//loop all swords items then display to the page 
for (let i = 0; i < swords.length; i++) {
  //remove the japanese word
  let sword = swords[i].name.split(" - ")[0];
  //assign all value to the html
  content += "<h2 data-target='#" + sword + "' class='the_title'>" + swords[i].name + "</h2>" +
    "<div id='" + sword + "' class='description'><div><p>" + swords[i].desc + "</p>" +
    "<img src='" + swords[i].img_path + "' alt='" + swords[i].name + "' width=357 height=228 /></div></div>";
};
//end for

$(document).ready(function () {
  //pre-load the images
  cacheImages()
  
  //fade in the title
  $("#header_img .slogan:first-of-type").fadeIn(1800);
  //slide and fade in those three words
  //animate of the word "Deadly"
  $("#header_img .slogan:nth-of-type(2)").animate({
    left: "500px",
    opacity: 1
  }, 1100);
  //animate of the word "Flexible"
  $("#header_img .slogan:nth-of-type(3)").animate({
    left: "660px",
    opacity: 1
  }, 1100);
  //animate of the word "Elegant"
  $("#header_img .slogan:nth-of-type(4)").animate({
    left: "830px",
    opacity: 1
  }, 1100);
  
  //change text size event
  $("#change_text_size div").click(function(){
    changeTextSize($(this).text());
  });
  //end of #change_text_size div click

  //display all the swords data to the page
  $("#list_of_swords").html(content);

  //toggle the sword items
  $(".the_title").click(function () {
    var data_tar = $(this).data("target");
    //prevent div slide up and down again when the div is opened 
    $(".description:not(" + data_tar + ")").slideUp();
    $(data_tar).slideToggle();
  });
  //end of toggle event

  //button event
  $("#content_wrapper p button").click(function (e) {
    e.preventDefault();
    //use the button text as argument to open the modal
    showModal($(this).text());
  });
  //end of button click event

  //close modal event
  $(".close_button, #overlay").click(function (e) {
    e.preventDefault();
    closeModal();
  });
  //end of close modal event
});
//end of $(document).ready

function showModal(button) {  
  let head;
  let content;
  //according to the parameter to choose the values
  if (button == "Learn More") {
    head = modal.contact.head;
    content = modal.contact.content;
  } else if (button == "Reference") {
    head = modal.reference.head;
    content = modal.reference.content;    
  }
  
  //assign the header to the modal
  $("#the_modal>div#header").html(head);
  //assign the content
  $("#the_modal>div:last-of-type").html(content);
  //blur the background when open modal
  $("#wrapper").css("filter", "blur(4px)");
  //open modal animation
  $("#fade_in_modal").fadeIn(500);
  $("#the_modal").animate({
    //calculate the window size and locate the modal to the middle
    left: window.innerWidth / 2 - 234,
    opacity: 1
  }, 1100);
}
//end of showModal function

function closeModal() {
  //open modal animation
  $("#the_modal").animate({
    left: 0,
    opacity: 0
  }, 1100);
  $("#fade_in_modal").fadeOut(500);
  //make the background return normal
  $("#wrapper").css("filter", "blur()");
}
//end of closeModal function

function changeTextSize(size_determ) {  
  let first_paras = $("#content>p");
  //get the first pargraph font size
  let curr_size = window.getComputedStyle(first_paras[0]).fontSize;
  curr_size = parseInt(curr_size);
  
  //according to the parameter to change the font size
  if (size_determ == "T-") {
    //if size greater than 12px make it to 12px and become smaller when already 12px
    curr_size > 12 ? curr_size = 12 : curr_size -= 2;  
  }
  if (size_determ == "T") {
    curr_size = 16;
  }
  if (size_determ == "T+") {
    //if size less than 20px make it to 20px and become larger when already 20px
    curr_size < 20 ? curr_size = 20 : curr_size += 2;  
  }
  $("#content p").css("fontSize",curr_size+"px");
}
//end of changeTextSize function


function cacheImages(){
  let b_smith = new Image();
  b_smith.src = "images/blacksmithing.jpg";
  
  let katana = new Image();
  katana.src = "images/katana.jpg";
  
  let tachi = new Image();
  tachi.src = "images/tachi.jpg";
  
  let nodachi = new Image();
  nodachi.src = "images/nodachi.jpg";
}