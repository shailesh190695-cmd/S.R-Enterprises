function showLogin() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; width: 300px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">S.R. Enterprises</h2>
            <input type="text" id="userid" placeholder="User ID" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px;">
            <input type="password" id="pass" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <button onclick="validate()" style="width: 100%; padding: 15px; background: #2c3e50; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">LOGIN</button>
        </div>
    `;
}

function validate() {
    const u = document.getElementById('userid').value;
    const p = document.getElementById('pass').value;

    if(u === "shailesh" && p === "sr123") {
        showDashboard();
    } else {
        alert("Galat details! Sahi password daalein.");
    }
}
