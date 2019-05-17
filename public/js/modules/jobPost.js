import $ from 'jquery';

class jobPost {
  constructor() {

    this.jobform=$(".postfield");
    this.postTitle=$(".post-title");
    this.postApply=$(".post-apply");
    this.postDescription=$(".post-job-description");

    this.companyName=$(".post-company-name");
    this.companyDetail=$(".post-companydetail");
    this.companyWebsite=$(".post-url");

    this.errorcomment=$(".postfield__error");
    this.submitButton=$(".post-submit");
    this.successLink=$(".post-success");
    this.imageLink = $(".postfield__inputfile");

    var selector;
    this.clickSubmit = false;
    this.events();
    
  }

  events() {

    $(".post-submit").on("click", this.createJobBlock.bind(this));
    
  }

  
  createJobBlock(e) {
    //this.companyDetail.each(function() {$(this).removeAttr('style'); });
    //this.postDescription.each(function() {$(this).removeAttr('style'); });
    //console.log(this.companyDetail.html());
    //console.log(this.postDescription.html());
    this.selector=0;

    if(this.clickSubmit){
      return false;
    }

    this.clickSubmit=true;
    $(".postfield__handler").removeClass("noactive");

    if(this.clickSubmit){
      this.submitButton.css({"opacity": "0.5", "cursor": "alias"});
    }

    if(this.postTitle.val().length<2){
      this.postTitle.css("border", "1px solid red");
      this.selector++;
    }else{
      this.postTitle.css("border", "1px solid #798a56");
    }



    if(this.postDescription.html().length<20){
      this.postDescription.css("border", "1px solid red");
      this.selector++;
    }else{
      this.postDescription.css("border", "1px solid #798a56");
    }



    if(this.postApply.val().length<2){
      this.postApply.css("border", "1px solid red");
      this.selector++;
    }else{    
      this.postApply.css("border", "1px solid #798a56");
    }


    if(this.companyName.val().length<2){
      this.companyName.css("border", "1px solid red");
      this.selector++;
    }else{
      this.companyName.css("border", "1px solid #798a56");
    }


    if(this.companyDetail.html().length<20){
      this.companyDetail.css("border", "1px solid red");
      this.selector++;
    }else{
      this.companyDetail.css("border", "1px solid #798a56");
    }


    if(this.companyWebsite.val().length<10){
      this.companyWebsite.css("border", "1px solid red");
      this.selector++;
    }else{
      this.companyWebsite.css("border", "1px solid #798a56");
    }

    if (this.selector>0) {
      this.errorcomment.removeClass("noactive");
    }
    else{
      this.errorcomment.addClass("noactive");
    }


    if(this.selector == 0){

      var TempApply;
      var TempComUrl;

      if (this.postApply.val().indexOf("@")!= -1) {



        if (this.postApply.val().indexOf("mailto:") == -1) {
          var emailhandler="mailto:";
          TempApply = emailhandler.concat("", this.postApply.val().toLowerCase());
        }else{
          TempApply = this.postApply.val().toLowerCase();
        }



      }else{


        if (this.postApply.val().indexOf("http") == -1) {
          var webhandler="//";
          TempApply = webhandler.concat("", this.postApply.val().toLowerCase());
        }else{
          TempApply = this.postApply.val().toLowerCase();
        }


      }


      if (this.companyWebsite.val().indexOf("@")!= -1) {

        if (this.companyWebsite.val().indexOf("mailto:") == -1) {
          var emailhandler="mailto:";
          TempComUrl = emailhandler.concat("", this.companyWebsite.val().toLowerCase());
        }else{
          TempComUrl = this.companyWebsite.val().toLowerCase();
        }


      }else{
        if (this.companyWebsite.val().indexOf("http") == -1) {
          var webhandler="//";
          TempComUrl = webhandler.concat("", this.companyWebsite.val().toLowerCase());
        }else{
          TempComUrl = this.companyWebsite.val().toLowerCase();
        }

      }


    //console.log(this.companyDetail.find('*').removeAttr('style').html());
    //console.log(this.postDescription.find('*').removeAttr('style').html());
    //$("post-job-description[style]").removeAttr("style");
    //$("post-job-description[style]").removeAttr("style");

    

      var ourNewPost = {
        'title': this.postTitle.val(),
        'content': this.postDescription.html(),
        'applyLink': TempApply,

        'title_company': this.companyName.val(),
        'content_company': this.companyDetail.html(),
        'URL_company': TempComUrl,

        'status': 'publish'

      }


    console.log(ourNewPost);
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', portalData.nonce);
      },
      url: portalData.root_url + '/wp-json/wp/v2/jobpost/',
      type: 'POST',
      data: ourNewPost,
      success: (response) => {
        //console.log(response);

        $(".postfield__handler").addClass("noactive");
        this.errorcomment.addClass("noactive");
        this.clickSubmit=false;
        

        this.successLink.removeClass("noactive");


        this.successLink.find("a").attr("href", response);
        this.submitButton.toggle();

      },
      error: (response) => {
        //console.log(response);

        $(".postfield__handler").addClass("noactive");
        this.clickSubmit=false;
        this.submitButton.css({"opacity": "1", "cursor": "alias"});
        this.errorcomment.removeClass("noactive");
      }
    });
  }
  else{

    $(".postfield__handler").addClass("noactive");
    this.clickSubmit=false;

    this.submitButton.css({"opacity": "1", "cursor": "alias"});
    this.errorcomment.removeClass("noactive");
    this.selector=0;
  }
}


}


export default jobPost;