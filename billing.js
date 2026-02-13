// MODULE: S.R. Enterprises Professional Billing (v2.0)
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.style.display = "block";
    panel.style.background = "#1a2233";

    panel.innerHTML = `
        <div id="print-area" style="padding: 15px; color: white; font-family: sans-serif; min-height: 100vh; box-sizing: border-box;">
            <div style="width: 100%; max-width: 1100px; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 20px; background: #1a2233; box-sizing: border-box; position: relative;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 28px;">S.R Enterprises</h2>
                        <p style="font-size: 12px; margin: 0; color: #dcdde1;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="display: flex; gap: 15px;">
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #edb92e;">INVOICE NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 100px; padding: 8px; border-radius: 5px; text-align: center; border:none;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #edb92e;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 140px; padding: 8px; border-radius: 5px; border:none;">
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 15px; margin-bottom: 12px;">
                    <input type="text" id="c_name" placeholder="Customer Name" style="padding: 12px; border-radius: 8px; border:none;">
                    <input type="text" id="m_model" placeholder="Machine Model No." style="padding: 12px; border-radius: 8px; border:none;">
                </div>
                <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 15px; margin-bottom: 12px;">
                    <input type="text" id="c_addr" placeholder="Full Address" style="padding: 12px; border-radius: 8px; border:none;">
                    <input type="text" id="m_remark" placeholder="Work Remark" style="padding: 12px; border-radius: 8px; border:none;">
                </div>

                <div style="margin-bottom: 25px; display: flex; gap: 10px; max-width: 450px;">
                    <input type="number" id="c_mobile" placeholder="Phone Number" style="flex: 1; padding: 12px; border-radius: 8px; border:none;">
                    <button onclick="pickPhone()" style="background: #edb92e; color: black; border: none; padding: 0 25px; border-radius: 8px; font-weight: bold; cursor: pointer;">PICK</button>
                </div>

                <div style="background: #252e42; padding: 12px; border-radius: 10px 10px 0 0; display: grid; grid-template-columns: 4fr 1.2fr 70px 1.2fr; gap: 12px; text-align: center; color: #edb92e; font-size: 13px; font-weight: bold;">
                    <div>WORK DESCRIPTION</div><div>RATE</div><div>QTY</div><div style="text-align: right;">TOTAL</div>
                </div>
                <div id="items_container" style="background: #252e42; padding: 12px; border-bottom: 1px solid #3d4a6d;"></div>
                <button onclick="addNewRow()" style="width: 100%; background: none; border: 1px dashed #edb92e; color: #edb92e; padding: 12px; border-radius: 0 0 10px 10px; font-weight: bold; cursor: pointer; margin-bottom: 20px;">+ ADD ITEM / WORK DESCRIPTION</button>

                <div style="display: flex; justify-content: flex-end;">
                    <div style="width: 100%; max-width: 380px; border: 2px solid #edb92e; padding: 20px; border-radius: 15px; background: #252e42;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Sub-Total:</span><span id="tax_amt">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" id="gst_check" onchange="calculateTotal()" style="width:18px; height:18px; cursor:pointer;">
                                <span style="color: #4cd137;">GST (18%):</span>
                            </div>
                            <span id="gst_amt">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <span style="color: #e74c3c;">Discount (₹):</span>
                            <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 80px; padding: 5px; border-radius: 5px; border: none; text-align: right;">
                        </div>
                        <hr style="border: 0.5px solid #3d4a6d;">
                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                            <span style="font-size: 18px; font-weight: bold; color: #edb92e;">GRAND TOTAL:</span>
                            <span id="grand_total" style="font-size: 22px; font-weight: bold; color: #4cd137;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div id="signature-area" style="margin-top: 50px; display: flex; justify-content: space-between; padding: 0 20px;">
                    <div style="text-align: center;">
                        <p style="margin-bottom: 40px; border-top: 1px solid #ccc; width: 150px;"></p>
                        <p style="font-size: 12px; color: #aaa;">Customer Signature</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="margin-bottom: 40px; border-top: 1px solid #ccc; width: 150px;"></p>
                        <p style="font-size: 12px; color: #aaa;">For S.R. Enterprises</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;" id="no-print">
                    <button onclick="window.print()" style="background: #edb92e; color: black; padding: 18px; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">🖨️ PRINT BILL / PDF</button>
                    <button onclick="alert('Saving to Sheets & WhatsApp...')" style="background: #4cd137; color: white; padding: 18px; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
                <button onclick="showDashboard()" id="no-print-back" style="width: 100%; margin-top: 15px; background: #7f8c8d; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer;">← BACK</button>
            </div>
        </div>
        
        <style>
            @media print {
                #no-print, #no-print-back, button, .no-print { display: none !important; }
                #print-area { background: white !important; color: black !important; padding: 0; }
                div { background: white !important; border-color: #333 !important; color: black !important; }
                input { border: none !important; color: black !important; background: transparent !important; }
                #signature-area { display: flex !important; margin-top: 100px !important; }
            }
        </style>
    `;
    addNewRow();
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    row.style = "display: grid; grid-template-columns: 4fr 1.2fr 70px 1.2fr; gap: 12px; margin-bottom: 10px; align-items: center;";
    row.innerHTML = `
        <input type="text" placeholder="Work/Part name" style="padding: 10px; border-radius: 5px; border:none; width: 100%; box-sizing: border-box;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding: 10px; border-radius: 5px; border:none; text-align: center; width: 100%; box-sizing: border-box;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding: 10px; border-radius: 5px; border:none; text-align: center; width: 70px;">
        <div class="item-total" style="color: #edb92e; font-weight: bold; text-align: right;">₹0.00</div>
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

    const disc = parseFloat(document.getElementById('w_disc').value) || 0;
    const isGst = document.getElementById('gst_check').checked;
    const taxable = subtotal - disc;
    const gst = isGst ? (taxable * 0.18) : 0;
    const grand = taxable + gst;

    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gst.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + (grand > 0 ? grand : 0).toFixed(2);
}

async function pickPhone() {
    if (!('contacts' in navigator)) {
        alert("Mobile contact picker aapke device par support nahi hai.");
        return;
    }
    try {
        const contacts = await navigator.contacts.select(['name', 'tel'], {multiple: false});
        if (contacts.length) {
            document.getElementById('c_name').value = contacts[0].name[0];
            document.getElementById('c_mobile').value = contacts[0].tel[0].replace(/\D/g, '');
        }
    } catch (ex) {
        alert("Picker nahi khul raha. Manually number daalein.");
    }
}
    
