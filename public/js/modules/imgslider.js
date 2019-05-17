import $ from 'jquery';

class ImgSlider {
  constructor() {
  	this.slidePrevious = $(".section__slider-previous");
  	this.slideNext = $(".section__slider-next");

    this.slideBarLong = $(".section__slider-bar");
    this.slideBarShort = $(".section__slider-bar-val");


    this.imgsNo = $(".section__inner").children().length;
    this.imgsWidth = parseInt($(".section__inner img").css("width"));

  	this.slideBoundary = $( window ).width();
  	this.slideWindow = $(".section__inner");

    this.slideWindow.css("width", this.imgsWidth * this.imgsNo);

    this.barVal = (this.slideBoundary/parseInt(this.slideWindow.css("width")))*100;
    this.barValPX = this.barVal + '%';
    this.slideBarShort.css("width", this.barValPX);


  	this.maxSlide = parseInt(this.slideWindow.css("width")) - parseInt(this.slideBoundary);

    this.perImg = parseInt(this.slideBoundary/this.imgsWidth);
    this.perMove = ((this.perImg + 1)* this.imgsWidth) - this.slideBoundary;

    this.move = 0;
    this.maxmove = this.imgsNo - this.perImg;

    this.offset = 0;
    this.barOffset = 0;
    
    this.perBar = 0;
    this.barMaxOffset = parseInt(this.slideBarLong.css("width")) - parseInt(this.slideBarShort.css("width"));

    this.events();

  }

  events() {
  	this.adjustSetting();

  	$(window).on("resize", this.adjustSetting.bind(this));

    this.slideWindow.on("click", this.noDefault.bind(this));
  	this.slidePrevious.on("click", this.movePrevious.bind(this));
  	this.slideNext.on("click", this.moveNext.bind(this));
  }

  noDefault(e){
    return false;
  }

  moveNext(e) {

    if((this.offset + parseInt(this.perMove)) <= parseInt(this.maxSlide)){
      this.offset = this.offset + parseInt(this.perMove);
      this.move = this.move + 1;
      if(this.move > 0){
        this.perMove = this.imgsWidth;
      }
    }else{
      this.offset = 0;
      this.perMove = ((this.perImg + 1)* this.imgsWidth) - this.slideBoundary;
      this.move = 0;
    }
  	this.slideWindow.animate({  right: this.offset });
    this.barMove();
    console.log('move ' + this.move);
  }




  movePrevious(e) {
    if(this.move > 1){
      this.perMove = this.imgsWidth;
    }else{
      this.perMove = ((this.perImg + 1)* this.imgsWidth) - this.slideBoundary;
    }

    if(this.offset > 0){
      this.offset = this.offset - parseInt(this.perMove);
      this.slideWindow.animate({  right: this.offset  });

      this.move = this.move - 1;
      this.barMove();
    }else{
      this.offset = parseInt(this.maxSlide);
      this.slideWindow.animate({  right: this.offset  });
      this.move = this.maxmove;
      this.barMove();
    }
  }

  barMove(e){
    if(this.move == 0){
      this.barOffset = 0;
    }else if(this.move == this.maxmove){
      this.barOffset = this.barMaxOffset;
    }
    else{
      this.barOffset = (this.move/this.maxmove)*this.barMaxOffset;
    }
    this.slideBarShort.animate({  left: this.barOffset  });
  }

  adjustSetting(e){
    this.imgsWidth = parseInt($(".section__inner img").css("width"));

    this.slideBoundary = $( window ).width();
    this.slideWindow.css("width", this.imgsWidth * this.imgsNo);


    this.maxSlide = parseInt(this.slideWindow.css("width")) - parseInt(this.slideBoundary);
    

    this.perImg = parseInt(this.slideBoundary/this.imgsWidth);
    this.perMove = ((this.perImg + 1)* this.imgsWidth) - this.slideBoundary;

    this.move = 0;
    this.maxmove = this.imgsNo - this.perImg;

    this.offset = 0;



    this.barVal = (this.slideBoundary/parseInt(this.slideWindow.css("width")))*100;
    this.barValPX = this.barVal + '%';
    this.slideBarShort.css("width", this.barValPX);

    this.barOffset = 0;
    
    this.perBar = 0;
    this.barMaxOffset = parseInt(this.slideBarLong.css("width")) - parseInt(this.slideBarShort.css("width"));
    this.slideWindow.animate({  right: 0 });
    this.slideBarShort.animate({  left: 0  });
  }
}

export default ImgSlider;