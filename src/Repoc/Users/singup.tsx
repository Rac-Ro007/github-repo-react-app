import './index.css';

export default function Signup() {
    return (
        <div className="ring" >
            <i style={{ "color": '#00ff0a' }}></i>
            <i style={{ 'color': '#ff0057' }}></i>
            <i style={{ 'color': '#fffd44' }}></i>
            <div className="login">
                <h2>Sign Up</h2>
                <div className="inputBx">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="inputBx">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="inputBx">
                    <input type="submit" value="Sign Up" />
                </div>
                <div className="links">
                    <label><input type='checkbox' style={{"marginRight":"20px"}}></input></label>
                    <label style={{"color":"#39ff14"}}>Remember Me</label>
                </div>
            </div>
        </div>
    );
}