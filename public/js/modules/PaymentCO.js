import $ from 'jquery';

class PaymentCO {
  constructor() {

    this.events();
  }

  events() {
    //TCO.loadPubKey('production');
    $(".paycheck").on("click", this.tokenRequest.bind(this));
    console.log("This is good");
  }



  Payment_Recieve(tokenvalue){
    


    var tco = new Twocheckout({
      sellerId: "203763260",
      privateKey: "046E76BB-1B3F-4129-A992-5D7B76CBF7F2",
      //sandbox: true   #Uncomment to use Sandbox
    });

    var params = {
      "merchantOrderId": "1",
      "token": tokenvalue,
      "currency": "USD",
      "total": "0.50"
      };

    console.log(params);

    

    tco.checkout.authorize(params, function (error, data) {
      if (error) {
        console.log(error.message);
      } else {
        console.log(JSON.stringify(data));
      }
    });
  }
//Next
  tokenRequest(){
    var args = {
      sellerId: "203763260",
      publishableKey: "B5624437-BFC9-4DCE-801D-0C659D38893D",
      ccNo: $("#ccNo").val(),
      cvv: $("#cvv").val(),
      expMonth: $("#expMonth").val(),
      expYear: $("#expYear").val()
    };
    TCO.requestToken(this.successCallback.bind(this), this.errorCallback.bind(this), args);
  }
  

  // Called when token created successfully.
  successCallback(data) {

    var tokenvalue = data.response.token.token;
    console.log(tokenvalue);

    this.Payment_Recieve(tokenvalue);

  };

  // Called when token creation fails.
  errorCallback(data) {
    if (data.errorCode === 200) {

    } else {
      alert(data.errorMsg);
    }
  };

}

export default PaymentCO;


//Seller Number
//203763260

//private-key
//046E76BB-1B3F-4129-A992-5D7B76CBF7F2

//public-key
//B5624437-BFC9-4DCE-801D-0C659D38893D

//-----------Sandbox



//Seller Number
//901384440

//Publishable Key
//4311C5B1-A677-4CE3-9FF3-416F8DD9CEF0

//Private Key
//8DD4A25F-8D69-4475-8073-0C8E585EC09D



