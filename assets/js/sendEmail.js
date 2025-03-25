function sendMail(contactForm) {
    console.log(contactForm);
    console.log(contactForm.name.value);
    console.log(contactForm.emailaddress.value);
    console.log(contactForm.projectsummary.value);
    emailjs.send('service_tyh3gvl', 'daniel', {
        //serviceID, TemplateID from (emailJD)
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
        //these are the names of our fields
    })
    .then(
        //for our promice
        function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Thank you for your message! I'll be in touch shortly.");
            location.reload();
        },
        function(error) {
            console.log('FAILED...', error);
        }
    );
    
    return false;  // To block from loading a new page
}