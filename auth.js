// MODULE: Authentication (Full Screen Centered)
function showLogin() {
    const panel = document.getElementById('main-panel');
    // Isse login box poore page ke beech mein aa jayega
    panel.style.display = "flex";
    panel.style.alignItems = "center";
    panel.style.justifyContent = "center";
    panel.style.height = "100vh";
    panel.style.background = "#f4f7f6";

    panel.innerHTML = `
        <div style="width: 90%; max-width: 400px; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); text-align: center;">
            <h1 style="color: #2c3e50; margin-bottom: 10px; font-size: 28px;">S.R. Enterprises</h1>
            <p style="color: #95a5a6; margin-bottom: 30px;">Fusing Machine Experts</p>
            
            <div style="text-align: left; margin-bottom: 15px;">
                <label style="font-weight: bold; color: #34495e; display: block; margin-bottom: 5px;">User ID</label>
                <input type="text" id="userid" placeholder="shailesh" style="width: 100%; padding: 15px; border: 2px solid #ecf0f1; border-radius: 10px; box-sizing: border-box; font-size: 16px;">
            </div>
            
            <div style="text-align: left; margin-bottom: 25px;">
                <label style="font-weight: bold; color: #34495e; display: block; margin-bottom: 5px;">Password</label>
                <input type="password" id="pass" placeholder="••••••••" style="width: 100%; padding: 15px; border: 2px solid #ecf0f1; border-radius: 10px; box-sizing: border-box; font-size: 16px;">
            </div>
            
            <button onclick="validate()" style="width: 100%; padding: 15px; background: #2c3e50; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 18px; transition: 0.3s;">
                LOGIN KAREIN
            </button>
        </div>
    `;
}

function validate() {
    const u = document.getElementById('userid').value;
    const p = document.getElementById('pass').value;

    if(u === "shailesh" && p === "sr123") {
        // Dashboard pe jaane se pehle flex hatana zaroori hai
        const panel = document.getElementById('main-panel');
        panel.style.display = "block"; 
        showDashboard(); 
    } else {
        alert("Galat ID ya Password! Shailesh bhai sahi details dalo.");
    }
}
