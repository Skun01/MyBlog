import {Link} from 'react-router-dom';
function Home(){
    return (
        <div>
            Hello my homepage
            <ul>
                <li>
                    <Link to = "login">move to login</Link>
                </li>
                <li>
                    <Link to = "/register">Move to register</Link>    
                </li>
            </ul>
        </div>
    )
}
export default Home;