// MODULE: Authentication (Fixed Full Screen Center)
function showLogin() {
    const panel = document.getElementById('main-panel');
    
    // Page layout settings
    panel.style.display = "block";
    panel.style.width = "100%";
    panel.style.height = "100vh";
    panel.style.position = "relative";
    panel.style.background = "#f0f2f5";

    panel.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    width: 90%; max-width: 400px; background: white; padding: 40px; 
                    border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; box-sizing: border-box;">
            
            <h1 style="color: #2c3e50; margin-bottom: 5px; font-size: 32px;">S.R. Enterprises</h1>
            <p style="color: #7f8c8d; margin-bottom: 35px;">Admin Portal Login</p>
            
            <div style="text-align: left; margin-bottom: 15px;">
                <label style="font-weight: bold; color: #34495e; display: block; margin-bottom: 8px;">User ID</label>
                <input type="text" id="userid" placeholder="shailesh" 
                       style="width: 100%; padding: 15px; border: 2px solid #ecf0f1; border-radius: 10px; box-sizing: border-box; font-size: 16px;">
            </div>
            
            <div style="text-align: left; margin-bottom: 30px;">
                <label style="font-weight: bold; color: #34495e; display: block; margin-bottom: 8px;">Password</label>
                <input type="password" id="pass" placeholder="••••••••" 
                       style="width: 100%; padding: 15px; border: 2px solid #ecf0f1; border-radius: 10px; box-sizing: border-box; font-size: 16px;">
            </div>
            
            <button onclick="validate()" 
                    style="width: 100%; padding: 18px; background: #2c3e50; color: white; border: none; 
                           border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 18px;">
                LOGIN KAREIN
            </button>
        </div>
    `;
}

function validate() {
    const u = document.getElementById('userid').value;
    const p = document.getElementById('pass').value;

    if(u === "shailesh" && p === "sr123") {
        showDashboard(); 
    } else {
        alert("Galat details! Shailesh bhai sahi details dalo.");
    }
}
