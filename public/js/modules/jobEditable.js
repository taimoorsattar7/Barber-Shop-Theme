import $ from 'jquery';

class jobEditable {
  constructor() {
    this.changer=0;


    this.ChangeCompanyUrl = $(".company_URL");
    this.ChangeApplyUrl = $(".apply_URL");

    this.JobPost = $(".jobdescription");


    this.EditBtn = $(".jobdescription__edit-post-btn");
    this.PreviewBtn = $(".jobdescription__edit-preview-btn");
    this.UpdateBtn = $(".jobdescription__edit-update-btn");
    this.DeleteBtn = $(".jobdescription__edit-delete-btn");


    this.ResponceMessage = $(".jobdescription__message");


    this.heading = $(".jobdescription__post-heading");
    this.subheading = $(".jobdescription__post-subheading");
    this.companyContent = $(".jobdescription__post-company");
    this.jobContent = $(".jobdescription__post-job");
    this.urlCOM=$(".link_company").attr("href");
    this.applyLink=$(".link_apply").attr("href");


    this.events();
  }

  events() {
    this.UpdateBtn.hide();
    this.DeleteBtn.hide();

    this.EditBtn.on("click", this.editNote.bind(this));
    this.UpdateBtn.on("click", this.updateNote.bind(this));
    this.DeleteBtn.on("click", this.deleteNote.bind(this));

    this.ChangeCompanyUrl.on("click", this.changeComUrl.bind(this));
    this.ChangeApplyUrl.on("click", this.changeApplyUrl.bind(this));
  }

  // Methods will go here


  addSaver(){
    if (this.changer<5) {
      this.changer++;
    }
    //console.log(this.changer);
  }

  changeComUrl(){

    var com_url = prompt("Enter the company URL");
    
    //console.log(com_url);
    if (com_url) {
      $(".link_company").attr("href",com_url);
      $(".link_company").text(com_url);
      this.urlCOM=com_url;
      //console.log(this.urlCOM);
    }
    
  }

  changeApplyUrl(){

    var apply_url = prompt("Enter the Apply URL");

    //console.log(apply_url);
    if (apply_url) {
      $(".link_apply").attr("href",apply_url);
      $(".link_apply").text(apply_url);
      this.applyLink=apply_url;
      //console.log(this.applyLink);
    }
  }


  editNote(e) {
    //console.log(this.applyLink);
    //console.log(this.urlCOM);
    $(".jobdescription__url").css("display", "inline-block");

    this.EditBtn.slideDown("slow").hide();
    this.PreviewBtn.slideDown("slow").hide();

    this.UpdateBtn.show(200);
    this.DeleteBtn.show(200);


    this.heading.attr("contenteditable" , "true").addClass("boadLine");
    this.subheading.attr("contenteditable" , "true").addClass("boadLine");
    this.companyContent.attr("contenteditable" , "true").addClass("boadLine");
    this.jobContent.attr("contenteditable" , "true").addClass("boadLine");

  }
  

    
updateNote(e) {
    
  if (this.changer<3) {
    this.changer++;
    $(".jobdescription__url").css("display", "none");

    this.UpdateBtn.slideDown("slow").hide();
    this.DeleteBtn.slideDown("slow").hide();

    this.EditBtn.show(200);
    this.PreviewBtn.show(200);



    this.heading.attr("contenteditable" , "false").removeClass("boadLine");
    this.subheading.attr("contenteditable" , "false").removeClass("boadLine");
    this.companyContent.attr("contenteditable" , "false").removeClass("boadLine");
    this.jobContent.attr("contenteditable" , "false").removeClass("boadLine");


    //console.log(this.urlCOM);
    //console.log(this.applyLink);

    var ourUpdatedPost = {
      'ID' : this.JobPost.data('id'),

      'title': this.heading.text(),
      'content': this.jobContent.html(),
      'applyLink' : this.applyLink,

      'title_company': this.subheading.text(),
      'content_company': this.companyContent.html(),
      'URL_company' : this.urlCOM,

      'doing' : 'update',


    }

    $.ajax({
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-WP-Nonce', portalData.nonce);
    },

    url: portalData.root_url + '/wp-json/wp/v2/jobpost/',
    type: 'POST',
    data: ourUpdatedPost,
    success: (response) => {
      $("jobdescription__url").css("display", "none");
      //console.log(response);
      this.heading.removeClass("boadLine");
      this.subheading.removeClass("boadLine");
      this.companyContent.removeClass("boadLine");
      this.jobContent.removeClass("boadLine");
    },
    error: (response) => {
      //console.log("Error");
      //console.log(response);
      this.heading.removeClass("boadLine");
      this.subheading.removeClass("boadLine");
      this.companyContent.removeClass("boadLine");
      this.jobContent.removeClass("boadLine");
      }});
    }
    else{
      this.UpdateBtn.hide();
      this.DeleteBtn.hide();
      this.EditBtn.hide();
      this.PreviewBtn.hide();
      $(".jobdescription__url").css("display", "none");
    }
    

  }

  deleteNote(e) {
    //console.log("Delete");
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', portalData.nonce);
      },
      url: portalData.root_url + '/wp-json/wp/v2/jobpost/' + this.JobPost.data('id'),
      type: 'DELETE',
      success: (response) => {
        //console.log(response);
      },
      error: (response) => {
        //console.log(response);
      }
    });
  }

  
}

export default jobEditable;