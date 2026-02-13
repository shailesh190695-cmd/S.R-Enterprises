// MODULE: Billing Logic
function showBilling() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="padding: 20px; width: 90%; max-width: 500px; background: white; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            <button onclick="showDashboard()" style="margin-bottom: 15px; background: #95a5a6; color: white; border: none; padding: 8px 15px; border-radius: 5px;">← Back</button>
            
            <h2 style="color: #27ae60; text-align: center; margin: 0;">S.R. ENTERPRISES</h2>
            <p style="text-align: center; font-size: 12px; margin-top: 5px;">Fusing Machine Sales & Service</p>
            <hr>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <input type="text" id="c_name" placeholder="Customer Name" style="padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
                <input type="number" id="c_mobile" placeholder="Mobile Number" style="padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
                <input type="text" id="m_model" placeholder="Machine Model" style="padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
                
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px dashed #ccc;">
                    <label style="font-weight: bold;">Service/Part Amount (₹)</label>
                    <input type="number" id="amt" style="width: 100%; padding: 10px; margin: 5px 0 15px 0;" oninput="calculateBill()">
                    
                    <label style="font-weight: bold; color: red;">Discount (₹)</label>
                    <input type="number" id="disc" style="width: 100%; padding: 10px; margin: 5px 0;" oninput="calculateBill()">
                </div>

                <div style="text-align: right; padding: 10px; background: #2c3e50; color: white; border-radius: 5px;">
                    <h3 style="margin: 0;">Total: ₹ <span id="final_total">0</span></h3>
                </div>

                <button onclick="alert('PDF Save ho raha hai aur WhatsApp khul raha hai...')" style="padding: 15px; background: #27ae60; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px;">
                    SAVE & PRINT BILL (PDF)
                </button>
            </div>
        </div>
    `;
}

function calculateBill() {
    let price = document.getElementById('amt').value || 0;
    let discount = document.getElementById('disc').value || 0;
    let grandTotal = parseFloat(price) - parseFloat(discount);
    document.getElementById('final_total').innerText = grandTotal.toFixed(2);
}
