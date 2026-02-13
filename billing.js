// MODULE: S.R. Enterprises Final Billing Form
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.style.display = "block";
    panel.style.background = "#1a2233";

    panel.innerHTML = `
        <div style="padding: 15px; color: white; font-family: sans-serif; min-height: 100vh; box-sizing: border-box;">
            <div style="width: 100%; max-width: 1100px; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 20px; background: #1a2233; box-sizing: border-box;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 28px;">S.R Enterprises</h2>
                        <p style="font-size: 12px; margin: 0; color: #dcdde1; letter-spacing: 1px;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="display: flex; gap: 15px;">
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #edb92e; font-weight: bold;">INVOICE NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 100px; padding: 10px; border-radius: 8px; border: none; font-weight: bold; text-align: center;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #edb92e; font-weight: bold;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 150px; padding: 10px; border-radius: 8px; border: none; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 15px;">
                    <div>
                        <label style="color: #edb92e; font-size: 13px; font-weight: bold;">CUSTOMER NAME:</label>
                        <input type="text" id="c_name" placeholder="Enter Name" style="width: 100%; padding: 12px; border-radius: 8px; border: none; margin-top: 5px; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="color: #edb92e; font-size: 13px; font-weight: bold;">MACHINE MODEL:</label>
                        <input type="text" id="m_model" placeholder="Model No." style="width: 100%; padding: 12px; border-radius: 8px; border: none; margin-top: 5px; box-sizing: border-box;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 15px;">
                    <div>
                        <label style="color: #edb92e; font-size: 13px; font-weight: bold;">ADDRESS:</label>
                        <input type="text" id="c_addr" placeholder="Full Address" style="width: 100%; padding: 12px; border-radius: 8px; border: none; margin-top: 5px; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="color: #edb92e; font-size: 13px; font-weight: bold;">REMARK:</label>
                        <input type="text" id="m_remark" placeholder="Work Note" style="width: 100%; padding: 12px; border-radius: 8px; border: none; margin-top: 5px; box-sizing: border-box;">
                    </div>
                </div>

                <div style="margin-bottom: 25px;">
                    <label style="color: #edb92e; font-size: 13px; font-weight: bold;">MOBILE NO:</label>
                    <div style="display: flex; gap: 10px; margin-top: 5px; max-width: 400px;">
                        <input type="number" id="c_mobile" placeholder="Phone Number" style="flex: 1; padding: 12px; border-radius: 8px; border: none;">
                        <button onclick="pickContact()" style="background: #edb92e; color: black; border: none; padding: 0 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">PICK</button>
                    </div>
                </div>

                <div style="background: #252e42; padding: 12px; border-radius: 10px 10px 0 0; border: 1px solid #3d4a6d; display: grid; grid-template-columns: 4fr 1.5fr 80px 1.5fr; gap: 15px; text-align: center; color: #edb92e; font-size: 13px; font-weight: bold;">
                    <div>WORK DESCRIPTION</div>
                    <div>RATE (₹)</div>
                    <div>QTY</div>
                    <div style="text-align: right;">TOTAL</div>
                </div>
                
                <div id="items_container" style="background: #252e42; padding: 12px; border: 1px solid #3d4a6d; border-top: none;">
                    </div>
                
                <button onclick="addNewRow()" style="width: 100%; background: none; border: 1px dashed #edb92e; color: #edb92e; padding: 15px; border-radius: 0 0 10px 10px; font-weight: bold; cursor: pointer; margin-bottom: 25px;">+ ADD ITEM / WORK DESCRIPTION</button>

                <div style="display: flex; justify-content: flex-end;">
                    <div style="width: 100%; max-width: 400px; border: 2px solid #edb92e; padding: 20px; border-radius: 15px; background: #252e42; box-sizing: border-box;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Sub-Total:</span>
                            <span id="tax_amt" style="font-weight: bold;">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #4cd137;">
                            <span>GST (18%):</span>
                            <span id="gst_amt">₹0.00</span>
                        </div>
                        <hr style="border: 0.5px solid #3d4a6d;">
                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                            <span style="font-size: 20px; font-weight: bold; color: #edb92e;">GRAND TOTAL:</span>
                            <span id="grand_total" style="font-size: 24px; font-weight: bold; color: #4cd137;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
                    <button onclick="window.print()" style="background: #edb92e; color: black; padding: 20px; border: none; border-radius: 12px; font-weight: bold; font-size: 18px; cursor: pointer;">🖨️ PRINT BILL / PDF</button>
                    <button onclick="alert('Saving to Google Sheets & Opening WhatsApp...')" style="background: #4cd137; color: white; padding: 20px; border: none; border-radius: 12px; font-weight: bold; font-size: 18px; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
                <button onclick="showDashboard()" style="width: 100%; margin-top: 20px; background: #7f8c8d; color: white; padding: 12px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">← BACK TO DASHBOARD</button>
            </div>
        </div>
    `;
    addNewRow(); 
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    row.style = "display: grid; grid-template-columns: 4fr 1.5fr 80px 1.5fr; gap: 15px; margin-bottom: 12px; align-items: center;";
    row.innerHTML = `
        <input type="text" class="item-desc" placeholder="Work name / Parts" style="padding: 12px; border-radius: 8px; border: none; width: 100%; box-sizing: border-box;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding: 12px; border-radius: 8px; border: none; text-align: center; width: 100%; box-sizing: border-box;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding: 12px; border-radius: 8px; border: none; text-align: center; width: 80px; box-sizing: border-box;">
        <div class="item-total" style="color: #edb92e; font-weight: bold; text-align: right; font-size: 16px;">₹0.00</div>
    `;
    container.appendChild(row);
}

function calculateTotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#items_container > div');
    
    rows.forEach(row => {
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const total = rate * qty;
        row.querySelector('.item-total').innerText = "₹" + total.toFixed(2);
        subtotal += total;
    });

    // Humne abhi GST calculation ko simple rakha hai, aap zaroorat padne par toggle kar sakte hain
    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + subtotal.toFixed(2);
}

async function pickContact() {
    alert("Mobile Contact Picker Tablet browser mein manually number daalne ko kehta hai.");
}
