// MODULE: Authentication
function showLogin() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="max-width: 350px; margin: 80px auto; padding: 30px; background: white; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center;">
            <h1 style="color: #2c3e50; margin-bottom: 5px;">S.R. Enterprises</h1>
            <p style="color: #bdc3c7; margin-bottom: 30px;">Admin Portal Login</p>
            
            <input type="text" id="userid" placeholder="User ID" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box;">
            
            <input type="password" id="pass" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 25px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box;">
            
            <button onclick="validate()" style="width: 100%; padding: 15px; background: #2c3e50; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px;">
                LOGIN KAREIN
            </button>
        </div>
    `;
}

function validate() {
    const u = document.getElementById('userid').value;
    const p = document.getElementById('pass').value;

    if(u === "shailesh" && p === "sr123") {
        showDashboard(); // Login sahi toh dashboard pe jao
    } else {
        alert("Galat ID ya Password! Shailesh bhai sahi details dalo.");
    }
}
