// MODULE: Dashboard Menu
function showDashboard() {
    const panel = document.getElementById('main-panel');
    panel.style.justifyContent = "flex-start"; // Page ko upar se shuru karne ke liye
    panel.innerHTML = `
        <div style="padding: 20px; width: 100%; max-width: 800px; margin: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #2c3e50;">SR Control Panel</h2>
                <button onclick="showLogin()" style="background: red; color: white; border: none; padding: 10px; border-radius: 5px;">Logout</button>
            </div>

            <div class="grid-container">
                <div class="box" onclick="showBilling()">💰 Billing</div>
                <div class="box" onclick="alert('Stock jald hi aayega')">📦 Stock</div>
                <div class="box" onclick="alert('Dealer section jald hi aayega')">🤝 Dealer</div>
                <div class="box" onclick="alert('Expenses jald hi aayega')">💸 Expenses</div>
                <div class="box" onclick="alert('Customer list jald hi aayega')">👤 Customer</div>
                <div class="box" onclick="alert('Reports jald hi aayega')">📊 Reports</div>
                <div class="box" onclick="alert('Summary jald hi aayega')">📅 Summary</div>
                <div class="box" onclick="alert('Orders jald hi aayega')">📝 Orders</div>
                <div class="box" onclick="alert('Settings jald hi aayega')">⚙️ Settings</div>
            </div>
        </div>
    `;
}
