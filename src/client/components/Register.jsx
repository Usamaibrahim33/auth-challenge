import { useState } from "react";

const formRegister = {
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('username') || ''
}

function Register() {
    const [registerForm, setRegisterForm ] = useState(formRegister)
    const [ registrationError, setRegistrationError ]  = useState(null)
    


//         // Function to handle registration logic and send data to the server
    const register = async () => {
        const method = {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(registerForm)
        }

        try {
            const response = await fetch('http://localhost:4000/user/register', method); 
            if(!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
            } 

            const data = await response.json();
            if(data.errorNoToken) {
                setRegistrationError("user already exist")
                return
            }
            
            window.location.href = "http://localhost:5173/login"

        } catch (error) {
            console.error("Error submitting login:", error);
        }
    }


        // Function to handle form submission
    const handleRegisterSubmission = async (event) => {
        event.preventDefault();
        if(!registerForm.username || !registerForm.password) {
            setRegistrationError("username and password are required!");
            return;
        }
        await register(registerForm)
        setRegisterForm(formRegister)

    }

//     // Function to handle user input changes and update the registerForm state
    const handleRegisterChange = (event) => {
        event.preventDefault();
        const { name, value} = event.target;
        localStorage.setItem(name, value)
        setRegisterForm({
            ...registerForm,
            [name]: value
        });
    }


//         // Return JSX for the Register component
    return (
        <div className=" flex justify-center items-center  mt-24">
            <form onSubmit={handleRegisterSubmission} >
                {registrationError && <p className="text-red-500 h-10 border"> {registrationError} </p>}
                <h1 className=' text-4xl font-semibold text-center mb-4'> Register </h1>
                <label htmlFor="username">  
                    <span>  Username </span> <br />
                    <input 
                    type="text" 
                    name='username' 
                    placeholder='username' 
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                    className=' rounded w-96 border mb-6 h-8'/>
                </label>

                <label htmlFor="username"> <br />
                    <span>  Password </span> <br />
                    <input 
                    type="password"
                     placeholder='password' 
                     name="password"
                     value={registerForm.password}
                     onChange={handleRegisterChange}
                     className=' rounded w-96 border h-8 ' />
                </label>

                <label htmlFor="button">  <br />
                    <input type="submit" value='submit' className="w-96 rounded mt-10 h-10 border bg-blue-700"/>
                </label>
            </form>
        </div>
    )
}

export default Register;