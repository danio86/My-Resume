function sendMail(contactForm) {
    emailjs.send('service_tyh3gvl', 'rosie', {
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
        },
        function(error) {
            console.log('FAILED...', error);
        }
    );
    
    return false;  // To block from loading a new page
}