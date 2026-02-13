// MODULE: Billing Page Logic
function showBilling() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="padding: 15px; max-width: 500px; margin: auto; background: white; border-radius: 10px;">
            <button onclick="showDashboard()" style="margin-bottom: 10px;">← Back</button>
            <h2 style="color: #27ae60; text-align: center; margin: 0;">S.R. ENTERPRISES</h2>
            <p style="text-align: center; font-size: 11px; margin-bottom: 20px;">Fusing Machine Sales & Service</p>
            
            <div style="display: grid; gap: 8px;">
                <input type="text" id="c_name" placeholder="Customer Name" style="padding: 12px; border: 1px solid #ddd;">
                <input type="number" id="c_mobile" placeholder="Mobile Number" style="padding: 12px; border: 1px solid #ddd;">
                <input type="text" id="m_model" placeholder="Machine Model" style="padding: 12px; border: 1px solid #ddd;">
                <hr>
                <label>Service/Part Amount (₹)</label>
                <input type="number" id="amt" style="padding: 12px;" oninput="doTotal()">
                <label>Discount (₹)</label>
                <input type="number" id="disc" style="padding: 12px; color: red;" oninput="doTotal()">
            </div>
            
            <div style="margin-top: 20px; text-align: right; background: #f9f9f9; padding: 10px;">
                <h3 style="margin: 0;">GRAND TOTAL: ₹ <span id="g_total">0</span></h3>
            </div>
            
            <button onclick="alert('PDF Generated & Sent!')" style="width: 100%; margin-top: 20px; padding: 15px; background: #2c3e50; color: white; border: none; border-radius: 8px; font-weight: bold;">
                GENERATE PDF & SHARE
            </button>
        </div>
    `;
}

function doTotal() {
    let a = document.getElementById('amt').value || 0;
    let d = document.getElementById('disc').value || 0;
    document.getElementById('g_total').innerText = a - d;
}
