$(document).ready(function() {
  $.getJSON('/addUser',{
    banner_id:123123123,
    first_name:"HELLO",
    middle_name:"BILLIAM",
    last_name:"WORLD",
    user:"helloworld",
    role:"student",
    email:"helloworld@hello.com"
  },
  function(data){
    alert(data.result);
  });
});
