// MODULE: Main Dashboard
function showDashboard() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="padding: 20px; max-width: 900px; margin: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 style="color: #2c3e50;">Control Panel</h2>
                <button onclick="showLogin()" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Logout</button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <div class="box" onclick="showBilling()">💰 Billing</div>
                <div class="box" onclick="alert('Stock Master Under Construction')">📦 Stock</div>
                <div class="box" onclick="alert('Dealer Ledger Under Construction')">🤝 Dealer</div>
                <div class="box" onclick="alert('Expenses Under Construction')">💸 Expenses</div>
                <div class="box" onclick="alert('Customer Network Under Construction')">👤 Customer</div>
                <div class="box" onclick="alert('Reports Under Construction')">📊 Reports</div>
                <div class="box" onclick="alert('Summary Under Construction')">📅 Summary</div>
                <div class="box" onclick="alert('Orders Under Construction')">📝 Orders</div>
                <div class="box" onclick="alert('Settings Under Construction')">⚙️ Settings</div>
            </div>
        </div>
    `;
}
