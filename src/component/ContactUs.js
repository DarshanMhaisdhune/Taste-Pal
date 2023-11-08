import React from "react";


const ContactUs = () =>{
    return(
            <div className="contact-container">
             <div className="contact-top">              
                <h1>We would love to hear from you!</h1>
             </div>

             <div className="contact-bottom">
             <h1>Contact us</h1>
                <form >
                <input type="text" placeholder="Name" required/>
                    <input type="email" placeholder="Email" required/>
                    <textarea placeholder="Type your Message here..." required></textarea>
                    <button type="submit">Submit</button>                    
                </form>

                
             </div>
            </div>
    )
}

export default ContactUs;