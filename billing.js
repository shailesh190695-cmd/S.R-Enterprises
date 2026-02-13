// MODULE: Advanced Billing System
function showBilling() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `
        <div style="padding: 10px; background: #1a2233; min-height: 100vh; color: white; font-family: sans-serif;">
            <div style="max-width: 600px; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 15px; background: #1a2233;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 22px;">S.R Enterprises</h2>
                        <p style="font-size: 10px; margin: 0; color: #dcdde1;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="background: white; color: black; padding: 2px 10px; border-radius: 5px; font-weight: bold; margin-bottom: 5px;">NO: 001</div>
                        <div style="background: white; color: black; padding: 2px 10px; border-radius: 5px; font-weight: bold;">DATE: ${new Date().toLocaleDateString('en-GB')}</div>
                    </div>
                </div>

                <hr style="border: 1px solid #edb92e;">

                <div style="margin-top: 15px;">
                    <label style="color: #edb92e; font-size: 12px; font-weight: bold;">CUSTOMER NAME:</label>
                    <input type="text" id="c_name" style="width: 100%; padding: 10px; margin: 5px 0 15px 0; border-radius: 8px; border: none; box-sizing: border-box;">
                    
                    <label style="color: #edb92e; font-size: 12px; font-weight: bold;">ADDRESS:</label>
                    <input type="text" id="c_addr" style="width: 100%; padding: 10px; margin: 5px 0 15px 0; border-radius: 8px; border: none; box-sizing: border-box;">
                    
                    <div style="display: flex; gap: 10px; align-items: flex-end;">
                        <div style="flex: 1;">
                            <label style="color: #edb92e; font-size: 12px; font-weight: bold;">MOBILE NO:</label>
                            <input type="number" id="c_mobile" placeholder="98XXXXXXXX" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                        </div>
                        <button style="background: #edb92e; color: black; border: none; padding: 10px 15px; border-radius: 8px; font-weight: bold; height: 40px;">SELECT</button>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <div style="display: flex; gap: 5px; font-size: 11px; color: #edb92e; font-weight: bold; text-align: center;">
                        <div style="flex: 3;">WORK DESCRIPTION</div>
                        <div style="flex: 1;">RATE</div>
                        <div style="flex: 1;">QTY</div>
                        <div style="flex: 1;">TOTAL</div>
                    </div>
                    <div style="display: flex; gap: 5px; margin-top: 5px;">
                        <input type="text" id="w_desc" placeholder="Service/Part" style="flex: 3; padding: 8px; border-radius: 5px; border: none;">
                        <input type="number" id="w_rate" value="0" oninput="calculateSR()" style="flex: 1; padding: 8px; border-radius: 5px; border: none; text-align: center;">
                        <input type="number" id="w_qty" value="1" oninput="calculateSR()" style="flex: 1; padding: 8px; border-radius: 5px; border: none; text-align: center;">
                        <div id="row_total" style="flex: 1; color: #edb92e; font-weight: bold; align-self: center; text-align: right;">₹0.00</div>
                    </div>
                </div>

                <button style="width: 100%; margin-top: 15px; background: none; border: 1px dashed #edb92e; color: #edb92e; padding: 10px; border-radius: 8px; font-weight: bold;">+ ADD ITEM / WORK</button>

                <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="apply_gst" onchange="calculateSR()" style="transform: scale(1.5);">
                        <label style="font-size: 12px;">GST 18%: Apply Tax</label>
                    </div>
                </div>

                <div style="margin-top: 15px;">
                    <label style="color: #edb92e; font-size: 12px; font-weight: bold;">DISCOUNT (₹):</label>
                    <input type="number" id="w_disc" value="0" oninput="calculateSR()" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                </div>

                <div style="margin-top: 20px; border: 1px dashed #edb92e; padding: 15px; border-radius: 10px;">
                    <div style="display: flex; justify-content: space-between; font-size: 14px;">
                        <span>Taxable:</span> <span id="tax_amt">₹0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 14px; margin-top: 5px;">
                        <span>GST 18%:</span> <span id="gst_amt">₹0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 20px; margin-top: 15px; color: #edb92e; font-weight: bold;">
                        <span>GRAND TOTAL:</span> <span id="grand_total">₹0.00</span>
                    </div>
                    <p id="total_words" style="font-size: 10px; font-style: italic; color: #aaa; margin: 5px 0 0 0;">Zero Rupees Only</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px;">
                    <button onclick="window.print()" style="background: #edb92e; color: black; padding: 15px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">🖨️ PRINT BILL</button>
                    <button onclick="alert('WhatsApp Sending...')" style="background: #4cd137; color: white; padding: 15px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">📲 WHATSAPP BILL</button>
                </div>

                <button onclick="showDashboard()" style="width: 100%; margin-top: 15px; background: #7f8c8d; color: white; padding: 10px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">← BACK</button>
            </div>
        </div>
    `;
}

function calculateSR() {
    let rate = parseFloat(document.getElementById('w_rate').value) || 0;
    let qty = parseFloat(document.getElementById('w_qty').value) || 0;
    let disc = parseFloat(document.getElementById('w_disc').value) || 0;
    let gstChecked = document.getElementById('apply_gst').checked;

    let subtotal = (rate * qty);
    document.getElementById('row_total').innerText = "₹" + subtotal.toFixed(2);

    let taxable = subtotal - disc;
    let gst = gstChecked ? (taxable * 0.18) : 0;
    let grand = taxable + gst;

    document.getElementById('tax_amt').innerText = "₹" + taxable.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gst.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + grand.toFixed(2);
}
