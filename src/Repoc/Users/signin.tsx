import './index.css';

export default function Signin() {
    return (
        <div className="ring">
            <i style={{ "color": '#00ff0a' }}></i>
            <i style={{ 'color': '#ff0057' }}></i>
            <i style={{ 'color': '#fffd44' }}></i>
            <div className="login">
                <h2>Login</h2>
                <div className="inputBx">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="inputBx">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="inputBx">
                    <input type="submit" value="Sign in" />
                </div>
                <div className="links">
                    <label style={{"color":"#39ff14"}}><button className='transparent-button'>Forgot Password</button></label>
                </div>
            </div>
        </div>
    );
}
