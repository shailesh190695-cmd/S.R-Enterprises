function showBilling() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="width: 100%; box-sizing: border-box; padding: 15px;">
            <button onclick="showDashboard()" style="background: #7f8c8d; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-bottom: 15px; font-weight: bold;">← Dashboard Back</button>
            
            <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <h2 style="color: #27ae60; text-align: center; margin: 0;">S.R. ENTERPRISES</h2>
                <p style="text-align: center; color: #7f8c8d; margin: 5px 0 20px 0;">Fusing Machine Sales & Service</p>
                <hr>

                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                    <input type="text" id="c_name" placeholder="Customer Name" style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 16px;">
                    <input type="number" id="c_mobile" placeholder="Mobile Number" style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 16px;">
                    <input type="text" id="m_model" placeholder="Machine Model" style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 16px;">
                    
                    <div style="background: #fdfdfd; padding: 20px; border: 1px dashed #27ae60; border-radius: 10px;">
                        <label style="font-weight: bold;">Service/Part Amount (₹)</label>
                        <input type="number" id="amt" style="width: 100%; padding: 12px; margin: 8px 0 15px 0; border: 1px solid #ccc; border-radius: 5px;" oninput="calculateBill()">
                        
                        <label style="font-weight: bold; color: #c0392b;">Discount (₹)</label>
                        <input type="number" id="disc" style="width: 100%; padding: 12px; margin: 8px 0; border: 1px solid #ccc; border-radius: 5px;" oninput="calculateBill()">
                    </div>

                    <div style="background: #27ae60; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 10px;">
                        <h2 style="margin: 0;">Final Total: ₹ <span id="final_total">0</span></h2>
                    </div>

                    <button onclick="alert('PDF coming soon!')" style="width: 100%; background: #2c3e50; color: white; padding: 18px; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; margin-top: 15px;">
                        SAVE & PRINT PDF
                    </button>
                </div>
            </div>
        </div>
    `;
}

function calculateBill() {
    let price = document.getElementById('amt').value || 0;
    let discount = document.getElementById('disc').value || 0;
    let total = parseFloat(price) - parseFloat(discount);
    document.getElementById('final_total').innerText = total > 0 ? total : 0;
}
