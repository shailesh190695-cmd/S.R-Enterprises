// PART 1: S.R. Enterprises Master Logic (Fixed Minus & URL)
const scriptURL = 'https://script.google.com/macros/s/AKfycbxPOez8uPSHlxo2t4nWNNwOU6OD6DzxMB9lsRPhsgQl4qwFT48i-xp5KLDDxhkkMLlwlw/exec';
let fetchedOldBalance = 0;

function numberToWords(num) {
    if (num === 0) return "Zero";
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const g = ['', 'Thousand', 'Million', 'Billion'];
    const makeGroup = (n) => {
        let s = ''; if (n >= 100) { s += a[Math.floor(n / 100)] + ' Hundred '; n %= 100; }
        if (n >= 20) { s += b[Math.floor(n / 10)] + ' '; n %= 10; }
        if (n > 0) { s += a[n] + ' '; } return s;
    };
    let words = '', groupIdx = 0; let tempNum = Math.floor(num);
    while (tempNum > 0) { let group = tempNum % 1000; if (group !== 0) { words = makeGroup(group) + g[groupIdx] + ' ' + words; } tempNum = Math.floor(tempNum / 1000); groupIdx++; }
    return words.trim();
}

function addNewRow() {
    const container = document.getElementById('items_container');
    if(!container) return;
    const row = document.createElement('div');
    row.className = "item-row";
    row.style = "display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; margin-bottom: 8px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 5px;";
    row.innerHTML = `<input type="text" placeholder="WORK DESCRIPTION" style="padding:5px; border:none; font-weight:700;" class="item-desc"><input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700;"><input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700;"><div class="item-total" style="font-weight:900; text-align:right;">₹0.00</div><button class="no-print" onclick="this.parentElement.remove(); calculateTotal();" style="color:red; border:none; background:none; cursor:pointer;">❌</button>`;
    container.appendChild(row);
}

function calculateTotal() {
    let subtotal = 0;
    document.querySelectorAll('.item-row').forEach(row => {
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const total = rate * qty;
        row.querySelector('.item-total').innerText = "₹" + total.toFixed(2);
        subtotal += total;
    });
    const disc = parseFloat(document.getElementById('w_disc')?.value || 0);
    const isGst = document.getElementById('gst_check')?.checked;
    const addOldDues = document.getElementById('add_old_dues')?.checked;
    const taxableTotal = subtotal - disc;
    const gstAmt = isGst ? (taxableTotal * 0.18) : 0;
    const currentBillTotal = taxableTotal + gstAmt;
    const oldDueToAdd = addOldDues ? fetchedOldBalance : 0;
    const finalGrandTotal = Math.round(currentBillTotal + oldDueToAdd);
    const paid = parseFloat(document.getElementById('paid_amt')?.value || 0);
    const balance = finalGrandTotal - paid;
    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gstAmt.toFixed(2);
    document.getElementById('display_old_due').innerText = "₹" + oldDueToAdd.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + finalGrandTotal.toFixed(2);
    document.getElementById('balance_due').innerText = "₹" + (balance > 0 ? balance : 0).toFixed(2);
    document.getElementById('amount_in_words').innerText = numberToWords(finalGrandTotal > 0 ? finalGrandTotal : 0) + " Only";
}
    // PART 2: Original Layout (Form + Back Button)
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);
    fetchedOldBalance = 0; panel.style.display = "block"; panel.style.background = "#f1f5f9"; 
    panel.innerHTML = `
        <style>
            input[type="text"], textarea { text-transform: uppercase; }
            .info-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 2px; }
            .info-row label { font-weight: 900; font-size: 13px; color: #000; white-space: nowrap; min-width: 130px; display: inline-block; }
            .info-row input, .info-row textarea { flex: 1; border: none; font-weight: 700; font-size: 14px; padding: 2px; background: transparent; outline: none; width: 100%; resize: none; font-family: sans-serif; }
            .grid-system { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; }
            .due-msg { color: #dc2626; font-weight: 900; font-size: 14px; margin-bottom: 10px; display: none; background: #fee2e2; padding: 10px; border-radius: 8px; border: 1px solid #ef4444; align-items: center; justify-content: space-between; }
            .update-box { border: 2px solid #16a34a; background: #f0fdf4; padding: 15px; border-radius: 10px; margin-top: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            @media print {
                @page { size: A4; margin: 10mm; }
                .no-print, button, .update-box, #back-btn-area { display: none !important; }
                body { background: white !important; }
                #bill-container { border: 2px solid black !important; width: 100% !important; max-width: 100% !important; padding: 15px !important; margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
                #signature-area { display: flex !important; }
            }
        </style>
        <div id="print-area" style="padding: 10px; color: #000; font-family: sans-serif; box-sizing: border-box; display: flex; flex-direction: column; align-items: center;">
            <div id="bill-container" style="width: 100%; max-width: 1050px; border: 2px solid #1e3a8a; border-radius: 12px; padding: 25px; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div><h1 style="color: #1e3a8a; margin: 0; font-size: 32px; font-weight: 900;">S.R ENTERPRISES</h1><p style="font-size: 14px; margin: 2px 0; font-weight: 800;">Fusing Machine Specialist</p><p style="font-size: 12px; margin: 0;">Mumbai | 📞 +91 9326113988</p></div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;"><label style="font-size: 11px; font-weight: 900;">INV NO</label><br><input type="text" id="inv_no" value="${autoInv}" style="width: 85px; text-align: center; border: 2px solid #1e3a8a; font-weight: 900;"></div>
                        <div style="text-align: center;"><label style="font-size: 11px; font-weight: 900;">DATE</label><br><input type="date" id="inv_date" value="${today}" style="width: 130px; border: 2px solid #1e3a8a; font-weight: 900;"></div>
                    </div>
                </div>
                <hr style="border: 1.5px solid #1e3a8a; margin-bottom: 15px;">
                <div id="old_due_alert" class="due-msg"><span>⚠️ OLD PENDING BALANCE: ₹<span id="due_amt_val">0</span></span><label style="cursor:pointer;"><input type="checkbox" id="add_old_dues" onchange="calculateTotal()"> ADD TO THIS BILL</label></div>
                <div id="customer-boundary" style="border: 1.5px solid #000; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: #fff;">
                    <div class="grid-system">
                        <div class="col">
                            <div class="info-row"><label>CUSTOMER NAME:</label><input type="text" id="c_name"></div>
                            <div class="info-row"><label>ADDRESS:</label><textarea id="c_addr" rows="2"></textarea></div>
                            <div class="info-row" style="border-bottom: none;"><label>MOBILE NO:</label><div style="display: flex; gap: 8px; flex: 1;"><input type="number" id="c_mobile" onblur="checkOldBalance(this.value)"><button onclick="pickPhone()" class="no-print" style="background: #1e3a8a; color: white; border: none; padding: 5px 12px; border-radius: 5px; font-weight: 900;">PICK</button></div></div>
                        </div>
                        <div class="col"><div class="info-row"><label>MACHINE MODEL:</label><input type="text" id="m_model"></div><div class="info-row"><label>REMARK:</label><textarea id="m_remark" rows="2"></textarea></div></div>
                    </div>
                </div>
                <div style="overflow: hidden; border: 2px solid #000; border-radius: 8px;">
                    <div style="background: #1e3a8a; padding: 12px; display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; text-align: center; color: #fff; font-weight: 900;"><div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div></div>
                    <div id="items_container" style="background: #fff; padding: 10px;"></div>
                </div>
                <button onclick="addNewRow()" class="no-print" style="width: 100%; background: #f8fafc; border: 2px dashed #1e3a8a; color: #1e3a8a; padding: 12px; font-weight: 900; margin-top: 10px;">+ ADD ITEM</button>
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 15px; gap: 15px;">
                    <div id="bank-details" style="font-size: 11px; border: 1.5px solid #000; padding: 10px; border-radius: 8px;"><p style="margin:0; font-weight: 900;">SBI | MR. HARIRAM SITARAM RAJBHAR</p><p style="margin:2px 0; font-weight: 900;">A/C: 44695199584 | IFSC: SBIN0008373</p></div>
                    <div style="width: 380px; border: 2.5px solid #000; padding: 15px; border-radius: 10px; background: #fff;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: 800;"><span>SUB-TOTAL:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font-weight: 800;"><div><input type="checkbox" id="gst_check" onchange="calculateTotal()"> GST (18%):</div><span id="gst_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 800;"><span>OLD DUE:</span><span id="display_old_due">₹0.00</span></div>
                        <hr style="border: 1px solid #1e3a8a; margin: 8px 0;">
                        <div style="display: flex; justify-content: space-between; font-weight: 900;"><span>GRAND TOTAL:</span><span id="grand_total" style="font-size: 24px; color: #1e3a8a;">₹0.00</span></div>
                        <div style="text-align: right;"><p id="amount_in_words" style="font-size: 12px; font-style: italic; font-weight: 900;">Zero Only</p></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; color: #16a34a; font-weight: 900;"><span>PAID:</span><input type="number" id="paid_amt" value="0" oninput="calculateTotal()" style="width: 80px; border: 1.5px solid #16a34a; text-align: right;"></div>
                        <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 900;"><span>BALANCE DUE:</span><span id="balance_due" style="font-size: 22px;">₹0.00</span></div>
                    </div>
// PART 2: Original Layout UI (Fixing Auto-fill Trigger & Layout)
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);
    fetchedOldBalance = 0; panel.style.display = "block"; panel.style.background = "#f1f5f9"; 
    panel.innerHTML = `
        <style>
            input[type="text"], textarea { text-transform: uppercase; }
            .info-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 2px; }
            .info-row label { font-weight: 900; font-size: 13px; color: #000; white-space: nowrap; min-width: 130px; display: inline-block; }
            .info-row input, .info-row textarea { flex: 1; border: none; font-weight: 700; font-size: 14px; padding: 2px; background: transparent; outline: none; width: 100%; resize: none; font-family: sans-serif; }
            .grid-system { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; }
            .due-msg { color: #dc2626; font-weight: 900; font-size: 14px; margin-bottom: 10px; display: none; background: #fee2e2; padding: 10px; border-radius: 8px; border: 1px solid #ef4444; align-items: center; justify-content: space-between; }
            .update-box { border: 2px solid #16a34a; background: #f0fdf4; padding: 15px; border-radius: 10px; margin-top: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            @media print {
                @page { size: A4; margin: 10mm; }
                .no-print, button, .update-box, #back-btn-area { display: none !important; }
                body { background: white !important; }
                #bill-container { border: 2px solid black !important; width: 100% !important; max-width: 100% !important; padding: 15px !important; margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
                #signature-area { display: flex !important; }
            }
        </style>
        <div id="print-area" style="padding: 10px; color: #000; font-family: sans-serif; box-sizing: border-box; display: flex; flex-direction: column; align-items: center;">
            <div id="bill-container" style="width: 100%; max-width: 1050px; border: 2px solid #1e3a8a; border-radius: 12px; padding: 25px; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div><h1 style="color: #1e3a8a; margin: 0; font-size: 32px; font-weight: 900;">S.R ENTERPRISES</h1><p style="font-size: 14px; margin: 2px 0; font-weight: 800;">Fusing Machine Specialist</p><p style="font-size: 12px; margin: 0;">Mumbai | 📞 +91 9326113988</p></div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;"><label style="font-size: 11px; font-weight: 900;">INV NO</label><br><input type="text" id="inv_no" value="${autoInv}" style="width: 85px; text-align: center; border: 2px solid #1e3a8a; font-weight: 900;"></div>
                        <div style="text-align: center;"><label style="font-size: 11px; font-weight: 900;">DATE</label><br><input type="date" id="inv_date" value="${today}" style="width: 130px; border: 2px solid #1e3a8a; font-weight: 900;"></div>
                    </div>
                </div>
                <hr style="border: 1.5px solid #1e3a8a; margin-bottom: 15px;">
                <div id="old_due_alert" class="due-msg"><span>⚠️ OLD PENDING BALANCE: ₹<span id="due_amt_val">0</span></span><label style="cursor:pointer;"><input type="checkbox" id="add_old_dues" onchange="calculateTotal()"> ADD TO THIS BILL</label></div>
                <div id="customer-boundary" style="border: 1.5px solid #000; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: #fff;">
                    <div class="grid-system">
                        <div class="col">
                            <div class="info-row"><label>CUSTOMER NAME:</label><input type="text" id="c_name"></div>
                            <div class="info-row"><label>ADDRESS:</label><textarea id="c_addr" rows="2"></textarea></div>
                            <div class="info-row" style="border-bottom: none;"><label>MOBILE NO:</label><div style="display: flex; gap: 8px; flex: 1;">
                                <input type="number" id="c_mobile" oninput="if(this.value.length >= 10) checkOldBalance(this.value)" onchange="checkOldBalance(this.value)">
                                <button onclick="pickPhone()" class="no-print" style="background: #1e3a8a; color: white; border: none; padding: 5px 12px; border-radius: 5px; font-weight: 900;">PICK</button>
                            </div></div>
                        </div>
                        <div class="col"><div class="info-row"><label>MACHINE MODEL:</label><input type="text" id="m_model"></div><div class="info-row"><label>REMARK:</label><textarea id="m_remark" rows="2"></textarea></div></div>
                    </div>
                </div>
                <div style="overflow: hidden; border: 2px solid #000; border-radius: 8px;">
                    <div style="background: #1e3a8a; padding: 12px; display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; text-align: center; color: #fff; font-weight: 900;"><div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div></div>
                    <div id="items_container" style="background: #fff; padding: 10px;"></div>
                </div>
                <button onclick="addNewRow()" class="no-print" style="width: 100%; background: #f8fafc; border: 2px dashed #1e3a8a; color: #1e3a8a; padding: 12px; font-weight: 900; margin-top: 10px;">+ ADD ITEM</button>
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 15px; gap: 15px;">
                    <div id="bank-details" style="font-size: 11px; border: 1.5px solid #000; padding: 10px; border-radius: 8px;"><p style="margin:0; font-weight: 900;">SBI | MR. HARIRAM SITARAM RAJBHAR</p><p style="margin:2px 0; font-weight: 900;">A/C: 44695199584 | IFSC: SBIN0008373</p></div>
                    <div style="width: 380px; border: 2.5px solid #000; padding: 15px; border-radius: 10px; background: #fff;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: 800;"><span>SUB-TOTAL:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font-weight: 800;"><div><input type="checkbox" id="gst_check" onchange="calculateTotal()"> GST (18%):</div><span id="gst_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 800;"><span>OLD DUE:</span><span id="display_old_due">₹0.00</span></div>
                        <hr style="border: 1px solid #1e3a8a; margin: 8px 0;">
                        <div style="display: flex; justify-content: space-between; font-weight: 900;"><span>GRAND TOTAL:</span><span id="grand_total" style="font-size: 24px; color: #1e3a8a;">₹0.00</span></div>
                        <div style="text-align: right;"><p id="amount_in_words" style="font-size: 12px; font-style: italic; font-weight: 900;">Zero Only</p></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; color: #16a34a; font-weight: 900;"><span>PAID:</span><input type="number" id="paid_amt" value="0" oninput="calculateTotal()" style="width: 80px; border: 1.5px solid #16a34a; text-align: right;"></div>
                        <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 900;"><span>BALANCE DUE:</span><span id="balance_due" style="font-size: 22px;">₹0.00</span></div>
                    </div>
                </div>
                <div id="signature-area" style="margin-top: 35px; display: flex; justify-content: space-between; padding: 0 20px;"><div style="text-align: center;"><p style="border-top: 2px solid #000; width: 180px;"></p><p style="font-size: 12px; font-weight: 900;">Customer Signature</p></div><div style="text-align: center;"><p style="border-top: 2px solid #000; width: 180px;"></p><p style="font-size: 12px; font-weight: 900;">For S.R. ENTERPRISES</p></div></div>
                <div class="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px;"><button onclick="window.print()" style="background: #000; color: #fff; padding: 15px; border-radius: 10px; font-weight: 900;">🖨️ PRINT BILL / PDF</button><button id="saveBtn" onclick="saveAndWhatsApp()" style="background: #16a34a; color: #fff; padding: 15px; border-radius: 10px; font-weight: 900;">📲 SAVE & WHATSAPP</button></div>
            </div>
            <div class="no-print update-box" style="width: 100%; max-width: 1050px; box-sizing: border-box;">
                <h3 style="color: #16a34a; margin: 0 0 10px 0;">💰 UPDATE PENDING PAYMENT (ONLY)</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <input type="number" id="upd_mobile" placeholder="MOBILE NO" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; flex: 1;" onblur="fetchForUpdate(this.value)">
                    <div style="padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 5px; font-weight: 900; color: red;">DUE: ₹<span id="upd_due_val">0</span></div>
                    <input type="number" id="upd_paid" placeholder="PAID NOW (₹)" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; flex: 1;">
                    <button onclick="updatePaymentOnly()" style="background: #16a34a; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-weight: 900;">UPDATE NOW</button>
                </div>
            </div>
            <div id="back-btn-area" class="no-print" style="margin-top: 20px;"><button onclick="location.reload()" style="background: #475569; color: #fff; padding: 12px 40px; border-radius: 10px; font-weight: 900; border: none; cursor: pointer;">🔙 BACK TO MENU</button></div>
        </div>
    `;
    addNewRow();
                }
    // PART 3: Integration & Start (FIXED: Reliable Auto-fill)
async function checkOldBalance(mobile) {
    if(!mobile || mobile.toString().length < 10) return;
    try {
        const response = await fetch(`${scriptURL}?mobile=${mobile}`);
        const res = await response.json();
        
        // --- DATA BHARNE KA LOGIC ---
        if(res.name) {
            document.getElementById('c_name').value = res.name.toUpperCase();
        }
        if(res.address) {
            document.getElementById('c_addr').value = res.address.toUpperCase();
        }
        // ----------------------------

        fetchedOldBalance = parseFloat(res.oldBalance) || 0;
        const alertBox = document.getElementById('old_due_alert');
        if(fetchedOldBalance > 0) {
            alertBox.style.display = 'flex';
            document.getElementById('due_amt_val').innerText = fetchedOldBalance.toFixed(2);
        } else {
            alertBox.style.display = 'none';
        }
        calculateTotal();
    } catch(e) { console.log("Fetch error"); }
}

async function fetchForUpdate(mobile) {
    if(!mobile) return;
    try {
        const response = await fetch(`${scriptURL}?mobile=${mobile}`);
        const res = await response.json();
        document.getElementById('upd_due_val').innerText = (parseFloat(res.oldBalance) || 0).toFixed(2);
    } catch(e) { console.log("Update fetch error"); }
}

async function updatePaymentOnly() {
    const mobile = document.getElementById('upd_mobile').value;
    const additionalPaid = parseFloat(document.getElementById('upd_paid').value) || 0;
    const currentDue = parseFloat(document.getElementById('upd_due_val').innerText) || 0;
    if(!mobile || additionalPaid <= 0) { alert("Data bhariye!"); return; }
    const remainingBalance = (currentDue - additionalPaid).toFixed(2);
    
    // Logic: Naya Balance Sheet mein bhej rahe hain taaki minus ho jaye
    const data = { action: "updatePayment", mobile: mobile, paid: additionalPaid, pending: remainingBalance };
    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        alert("✅ Hisab Updated! Naya Balance: ₹" + remainingBalance);
        showBilling(); 
    } catch(e) { alert("Error updating payment!"); }
}

async function saveAndWhatsApp() {
    const data = {
        invoice: document.getElementById('inv_no').value,
        date: document.getElementById('inv_date').value,
        name: document.getElementById('c_name').value.toUpperCase(),
        mobile: document.getElementById('c_mobile').value,
        model: document.getElementById('m_model').value.toUpperCase(),
        address: document.getElementById('c_addr').value.toUpperCase(),
        description: document.querySelector('.item-desc')?.value.toUpperCase() || "SERVICE",
        subtotal: document.getElementById('tax_amt').innerText.replace('₹',''),
        paid: document.getElementById('paid_amt').value,
        balance: (parseFloat(document.getElementById('grand_total').innerText.replace('₹','')) - parseFloat(document.getElementById('paid_amt').value)).toFixed(2),
        pending: (parseFloat(document.getElementById('grand_total').innerText.replace('₹','')) - parseFloat(document.getElementById('paid_amt').value)).toFixed(2)
    };
    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        alert("✅ Bill Sheet mein Save ho gaya!");
        const msg = `*S.R. ENTERPRISES REPORT*%0AInvoice: ${data.invoice}%0A*PENDING BALANCE:* ₹${data.pending}`;
        window.open(`https://wa.me/91${data.mobile}?text=${msg}`, '_blank');
    } catch(e) { alert("Error!"); }
}

async function pickPhone() {
    try { 
        const contacts = await navigator.contacts.select(['name', 'tel'], {multiple: false}); 
        if (contacts && contacts.length > 0) { 
            const phone = contacts[0].tel[0].replace(/\D/g, '');
            document.getElementById('c_name').value = contacts[0].name[0];
            document.getElementById('c_mobile').value = phone; 
            checkOldBalance(phone); 
        } 
    } catch (e) { alert("Contact Picker not supported."); }
}

showBilling();
            
