


function Footer() {
    // const history = useHistory();

    const handleGoBack = () => {
        window.history.back();
    };
  

    return (
        <div className="bg-blue-700 ">
            <footer className="h-36 lg:mx-36 flex justify-between items-center">
                <div>
                    <button className=" text-4xl font-sans hover:bg-slate-300 bg-white text-black" onClick={handleGoBack}>Back</button>
                </div>
                <div>
                    <h1> this is the footer </h1>
                </div>
            </footer>
        </div>
    );
}


export default Footer;