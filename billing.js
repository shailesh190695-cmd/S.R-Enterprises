// MODULE: Final Billing System (Fixed Layout)
let rowCount = 0;

function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInvoice = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.innerHTML = `
        <div style="padding: 10px; background: #1a2233; min-height: 100vh; color: white; font-family: sans-serif;">
            <div style="max-width: 95%; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 15px; background: #1a2233; box-sizing: border-box;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 24px;">S.R Enterprises</h2>
                        <p style="font-size: 11px; margin: 0; color: #dcdde1;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #edb92e; font-weight: bold;">INVOICE NO</label><br>
                            <input type="text" id="inv_no" value="${autoInvoice}" style="width: 90px; padding: 8px; border-radius: 5px; border: none; font-weight: bold; text-align: center; background: white;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #edb92e; font-weight: bold;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 130px; padding: 8px; border-radius: 5px; border: none; font-weight: bold; background: white;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1px solid #edb92e; margin-bottom: 20px;">

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">CUSTOMER NAME:</label>
                        <input type="text" id="c_name" style="width: 100%; padding: 12px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">MACHINE MODEL:</label>
                        <input type="text" id="m_model" placeholder="Model No." style="width: 100%; padding: 12px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">ADDRESS:</label>
                        <input type="text" id="c_addr" style="width: 100%; padding: 12px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">REMARK:</label>
                        <input type="text" id="m_remark" placeholder="Note" style="width: 100%; padding: 12px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                </div>

                <div style="margin-bottom: 25px;">
                    <label style="color: #edb92e; font-size: 12px; font-weight: bold;">MOBILE NO:</label>
                    <div style="display: flex; gap: 10px; margin-top: 5px; max-width: 300px;">
                        <input type="number" id="c_mobile" placeholder="Mobile Number" style="flex: 1; padding: 12px; border-radius: 8px; border: none;">
                        <button onclick="pickContact()" style="background: #edb92e; color: black; border: none; padding: 0 15px; border-radius: 8px; font-weight: bold; cursor: pointer;">PICK</button>
                    </div>
                </div>

                <div style="background: #252e42; padding: 10px; border-radius: 10px 10px 0 0; border: 1px solid #3d4a6d; display: grid; grid-template-columns: 3fr 1fr 60px 1fr; gap: 10px; text-align: center; color: #edb92e; font-size: 11px; font-weight: bold;">
                    <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div>
                </div>
                
                <div id="items_container" style="background: #252e42; padding: 10px; border: 1px solid #3d4a6d; border-top: none;">
                    </div>
                
                <button onclick="addNewRow()" style="width: 100%; background: none; border: 1px dashed #edb92e; color: #edb92e; padding: 12px; border-radius: 0 0 10px 10px; font-weight: bold; cursor: pointer; margin-bottom: 20px;">+ ADD ITEM / WORK</button>

                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                    <div style="flex: 1; min-width: 250px; background: #252e42; padding: 15px; border-radius: 10px; box-sizing: border-box;">
                         <label style="color: #edb92e; font-size: 12px; font-weight: bold;">DISCOUNT (₹):</label>
                         <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 100%; padding: 12px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                         <div style="margin-top: 15px; display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" id="apply_gst" onchange="calculateTotal()" style="width: 20px; height: 20px;"> 
                            <label style="font-size: 14px;">Apply GST (18%)</label>
                         </div>
                    </div>
                    
                    <div style="flex: 1; min-width: 250px; border: 2px solid #edb92e; padding: 15px; border-radius: 10px; text-align: right; box-sizing: border-box;">
                        <div style="font-size: 14px;">Taxable Amt: <span id="tax_amt">₹0.00</span></div>
                        <div style="font-size: 14px; margin-bottom: 10px;">GST (18%): <span id="gst_amt">₹0.00</span></div>
                        <div style="font-size: 18px; color: #edb92e; font-weight: bold;">GRAND TOTAL</div>
                        <div id="grand_total" style="font-size: 32px; color: #4cd137; font-weight: bold;">₹0.00</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px;">
                    <button onclick="generateFinalBill()" style="background: #edb92e; color: black; padding: 18px; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">🖨️ PRINT BILL</button>
                    <button onclick="alert('Saving and Sharing...')" style="background: #4cd137; color: white; padding: 18px; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
                <button onclick="showDashboard()" style="width: 100%; margin-top: 15px; background: #7f8c8d; color: white; padding: 10px; border: none; border-radius: 8px; cursor: pointer;">← DASHBOARD</button>
            </div>
        </div>
    `;
    rowCount = 0;
    addNewRow(); 
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    row.style = "display: grid; grid-template-columns: 3fr 1fr 60px 1fr; gap: 10px; margin-bottom: 12px; align-items: center; box-sizing: border-box;";
    row.innerHTML = `
        <input type="text" class="item-desc" placeholder="Work name" style="padding: 10px; border-radius: 5px; border: none; width: 100%; box-sizing: border-box;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding: 10px; border-radius: 5px; border: none; text-align: center; width: 100%; box-sizing: border-box;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding: 10px; border-radius: 5px; border: none; text-align: center; width: 60px; box-sizing: border-box;">
        <div class="item-total" style="color: #edb92e; font-weight: bold; text-align: right; width: 100%; box-sizing: border-box; overflow: hidden;">₹0.00</div>
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
        
