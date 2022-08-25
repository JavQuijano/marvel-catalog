import './Loader.css'

const Loader = (props) =>{
    return (
        <div className='loader-container'>
            <div className="spinner"></div>
            <div className='loader-text'>
                <h1>{props.loaderText}</h1>
            </div>
        </div>
    );
}

export default Loader;