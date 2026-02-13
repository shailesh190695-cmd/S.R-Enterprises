function showDashboard() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="width: 100%; box-sizing: border-box; padding: 10px;">
            <div style="background: #2c3e50; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; border-radius: 0 0 15px 15px; margin-bottom: 20px;">
                <h2 style="margin: 0;">S.R. Control Panel</h2>
                <button onclick="showLogin()" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold;">Logout</button>
            </div>

            <div class="grid-container">
                <div class="box" onclick="showBilling()">💰 Billing</div>
                <div class="box" onclick="alert('Stock coming soon')">📦 Stock</div>
                <div class="box" onclick="alert('Dealer coming soon')">🤝 Dealer</div>
                <div class="box" onclick="alert('Expenses coming soon')">💸 Expenses</div>
                <div class="box" onclick="alert('Customer coming soon')">👤 Customer</div>
                <div class="box" onclick="alert('Reports coming soon')">📊 Reports</div>
                <div class="box" onclick="alert('Summary coming soon')">📅 Summary</div>
                <div class="box" onclick="alert('Orders coming soon')">📝 Orders</div>
                <div class="box" onclick="alert('Settings coming soon')">⚙️ Settings</div>
            </div>
        </div>
    `;
}
