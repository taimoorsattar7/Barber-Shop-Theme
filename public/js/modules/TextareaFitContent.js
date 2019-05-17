import $ from 'jquery';

class TextareaFitContent {
  constructor() {
    this.events();
  }

  events() {
   this.ContentFit();
  }

  ContentFit(){

  	//console.log($("#finder"));
  	if ($("#finder")) {
  		//console.log("yes");
  	}
  	else{
  		//console.log("no");
  	}
  	$(document).ready(function(){
  		if(true){
  		$(".jobdescription__post-heading").css("height", $(".jobdescription__post-heading")[0].scrollHeight);
			$(".jobdescription__post-subheading").css("height", $(".jobdescription__post-subheading")[0].scrollHeight);
			$(".jobdescription__post-company").css("height", $(".jobdescription__post-company")[0].scrollHeight);
			$(".jobdescription__post-job").css("height", $(".jobdescription__post-job")[0].scrollHeight);
  		}


});
  }

  
}

export default TextareaFitContent;