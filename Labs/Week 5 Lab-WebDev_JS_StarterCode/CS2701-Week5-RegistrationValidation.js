//Let's define some variables to represent the form data
//At the beginning, the form is empty, and therefore, not valid

//Data to send
var formData = {
    username: "",
    email: "",
    password: "",
    buyer: false,
    seller: false
}

//This data will be read but not be sent as part of the form submission
var formValid= false;
var repPassword="";
var tosCheckBox=false;


//Function to read the form
function readForm(){
   formData.username = document.getElementById("name").value.trim();
   formData.email = document.getElementById("email").value.trim();
   formData.password = document.getElementById("password").value.trim();
   repPassword = document.getElementById("repPassword").value.trim();

    //Read the buyer and seller checkboxes 
    formData.buyer = document.getElementById("buyer").checked;
    formData.seller = document.getElementById("seller").checked;

    tosCheckBox = document.getElementById("tos").checked;

}

//Function to validate the form
function validateForm() {
    formValid = false;
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Add all six validation checks here
    // 1. Check that all required fields are filled
    if (formData.username === "" || formData.email === "" ||
        formData.password === "" || repPassword === "") {
        alert("Please fill in all required fields.");
        return;
    }

    // 2. Check that the email address is valid
    if (!mailformat.test(formData.email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // 3. Check password strength
    // Password must have at least 8 characters,
    // one uppercase letter, one lowercase letter and one number.
    var passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordStrength.test(formData.password)) {
        alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.");
        return;
    }

    // 4. Check that both passwords match
    if (formData.password !== repPassword) {
        alert("Your passwords do not match.");
        return;
    }

    // 5. Check that at least one account type is selected
    if (!formData.buyer && !formData.seller) {
        alert("Please select at least one account type: Buyer or Seller.");
        return;
    }

    // 6. Check that the Terms of Service checkbox is selected
    if (!tosCheckBox) {
        alert("Please accept the Terms of Service.");
        return;
    }

    // All validation checks passed
    formValid = true;
}

//Function to write the Registration success on the page
function createNewParagraph(content){
    var text = document.createTextNode(content);
    var paragraph = document.createElement("p");
    paragraph.appendChild(text);
    paragraph.style = "white-space: pre;"
    paragraph.id = "hiddenParagraph";

    var element = document.getElementById("hiddenSection");
    var existingParagraph = document.getElementById("hiddenParagraph")
    element.replaceChild(paragraph, existingParagraph);
}

//Function  to submit the form, this should be called by the Register button
//on click
function submitForm(){
    readForm();
    validateForm();
// call the validation function
    if (formValid){
        var formText = formData.username +" registered as:\n";
        formText += formData.buyer?"buyer\n":"";
        formText += formData.seller?"seller":"";

        console.log(formText);
        createNewParagraph(formText);
    }
}
