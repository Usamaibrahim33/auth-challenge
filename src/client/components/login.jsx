import { useState } from "react";


const formLogin = {
    username:  '',
    password:  ''
}
function Login() {
    const [loginForm, setLoginForm ] = useState(formLogin);
    const [error, setError] = useState(null)


        // Function to handle Login logic and send data to the server
    const submitLogin = async () => {
        const method = {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(loginForm)
        }

        try {
            const response = await fetch('http://localhost:4000/user/login', method);
            if(!response.ok) {
                const errorData = await response.json();
                if(errorData.error2) {
                    setError("username or password does'nt match")
                    return
                }
                setError(errorData.error || "An Error Occur")
                return
            }
            const data = await response.json();
            localStorage.setItem('token', data.token)
            window.location.href = data.redirect;

        } catch (error) {
            setError("username or password does'nt match")
        }
    };


    // Function to handle Login form submission
    const handleLoginSubmission = async (event) => {
        event.preventDefault(); 
        if(!loginForm.username || !loginForm.password) {
            setError('Username and password are required!');
            return;
        }

        await submitLogin(loginForm)
    }


    // Function to handle user input changes and update the LoinForm state
    const handleLoginChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

        // Return JSX for the Register component
    return (
        <div className=' flex justify-center items-center mt-24 '>
            <form onSubmit={handleLoginSubmission} className="w-min-content h-auto" >
            {error && <p className=" text-red-500 border h-10 text-center">{error} </p>}
                <h1 className=' text-4xl font-semibold mb-4 text-center'> Login </h1>
                <label htmlFor="username"> 
                    <span className="text-xl">  Username </span> <br />
                    <input type="text" 
                        name="username"
                        placeholder='username'
                        value={loginForm.username}
                        onChange={handleLoginChange}
                        className=' w-96 border mb-6 h-8 rouded font-bold'
                    />
                </label><br />

                <label htmlFor="username"> 
                    <span className="text-xl" >  Password </span> <br />
                    <input 
                        type="password" 
                        placeholder="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className=' w-96 border rounded h-8 ' 
                    />
                </label>

                <label htmlFor="button">  <br />
                    <input type="submit" value='submit' className="w-96 mt-10 rounded h-10 bg-blue-700 "/>
                </label>
            </form>
        </div>
    )
}

export default Login;