function Validation(values) {
 let error = {}
 const name_pattern = /^([a-zA-Z ]){2,20}$/;
 const email_pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;    //Starts with one or more characters that are not whitespace or "@".Followed by "@".Followed by one or more characters that are not whitespace or "@".Followed by dot (period).Followed by one or more characters that are not whitespace or "@".Ends at the end of the string. 
 const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/; //Contains at least one digit.Contains at least one lowercase letter.Contains at least one uppercase letter.Consists of at least 8 (max15) characters and has 1 special character at least 
 if(values.name === ""){
  error.name = "Name should not be empty"
}
else if(!name_pattern.test(values.name)){
  error.name = "Name needs to be 20 character maximum with only letters"
}
else{
  error.name = "";
}
 if(values.email === ""){
    error.email = "Email should not be empty"
 }
 else if(!email_pattern.test(values.email)){
    error.email = "Email should be in the format xxx@xxx.xxx with maximum 30 characters"
 }
 else{
    error.email = "";
 }
 if(values.password === ""){
    error.password = "Password should not be empty"
 }
 else if(!password_pattern.test(values.password)){
    error.password = "Password should contain at least one Uppercase letter, one Lowercase letter, one digit and one special character"
 }
 else{
    error.password = "";
 }
 return error;
}
export default Validation;