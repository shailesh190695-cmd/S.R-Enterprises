// MASTER MODULE: S.R. Enterprises Original Layout + Payment Update Function
const scriptURL = 'https://script.google.com/macros/s/AKfycbyVCx6eZsxUQn9SnQnsJwh4LBBAAM_qxpewlJs-mEUhqKsxDLKLPXzoszfKKM3NKnwsYQ/exec';
let fetchedOldBalance = 0;

// 1. Function to convert numbers to words
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
    let words = '', groupIdx = 0; 
    let tempNum = Math.floor(num);
    while (tempNum > 0) { 
        let group = tempNum % 1000; 
        if (group !== 0) { words = makeGroup(group) + g[groupIdx] + ' ' + words; } 
        tempNum = Math.floor(tempNum / 1000); 
        groupIdx++; 
    }
    return words.trim();
}

// 2. Function to add a new row
function addNewRow() {
    const container = document.getElementById('items_container');
    if(!container) return;
    const row = document.createElement('div');
    row.className = "item-row";
    row.style = "display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; margin-bottom: 8px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 5px;";
    row.innerHTML = `
        <input type="text" placeholder="WORK DESCRIPTION" style="padding:5px; border:none; font-weight:700;" class="item-desc">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700;">
        <div class="item-total" style="font-weight:900; text-align:right;">₹0.00</div>
        <button class="no-print" onclick="this.parentElement.remove(); calculateTotal();" style="color:red; border:none; background:none; cursor:pointer;">❌</button>
    `;
    container.appendChild(row);
}

// 3. Calculation Logic
function calculateTotal() {
    let subtotal = 0;
    document.querySelectorAll('.item-row').forEach(row => {
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const total = rate * qty;
        row.querySelector('.item-total').innerText = "₹" + total.toFixed(2);
        subtotal += total;
    });

    const disc = parseFloat(document.getElementById('w_disc').value) || 0;
    const isGst = document.getElementById('gst_check').checked;
    const addOldDues = document.getElementById('add_old_dues')?.checked;
    
    const taxableTotal = subtotal - disc;
    const gstAmt = isGst ? (taxableTotal * 0.18) : 0;
    const currentBillTotal = taxableTotal + gstAmt;
    
    const oldDueToAdd = addOldDues ? fetchedOldBalance : 0;
    const finalGrandTotal = Math.round(currentBillTotal + oldDueToAdd);
    
    const paid = parseFloat(document.getElementById('paid_amt').value) || 0;
    const balance = finalGrandTotal - paid;

    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gstAmt.toFixed(2);
    document.getElementById('display_old_due').innerText = "₹" + oldDueToAdd.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + finalGrandTotal.toFixed(2);
    document.getElementById('balance_due').innerText = "₹" + (balance > 0 ? balance : 0).toFixed(2);
    document.getElementById('amount_in_words').innerText = numberToWords(finalGrandTotal > 0 ? finalGrandTotal : 0) + " Only";
}

// 4. Main Billing UI (Aapka original layout bina badlav ke)
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);
    fetchedOldBalance = 0; 

    panel.style.display = "block";
    panel.style.background = "#f1f5f9"; 

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
                .no-print, #no-print, #no-print-back, button, .update-box { display: none !important; }
                body { background: white !important; margin: 0; padding: 0; }
                #print-area { display: flex; justify-content: center; padding: 0 !important; }
                #bill-container { border: 2px solid black !important; width: 100% !important; max-width: 100% !important; padding: 15px !important; box-shadow: none !important; border-radius: 0 !important; margin: 0 !important; }
                .info-row { border-bottom: none !important; }
                input, textarea { border: none !important; font-weight: 900 !important; }
                #old_due_alert { display: none !important; }
                #signature-area { margin-top: 35px !important; display: flex !important; }
            }
        </style>

        <div id="print-area" style="padding: 10px; color: #000; font-family: sans-serif; box-sizing: border-box; display: flex; flex-direction: column; align-items: center;">
            <div id="bill-container" style="width: 100%; max-width: 1050px; border: 2px solid #1e3a8a; border-radius: 12px; padding: 25px; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 15px;">
                    <div>
                        <h1 style="color: #1e3a8a; margin: 0; font-size: 32px; letter-spacing: 1px; font-weight: 900;">S.R ENTERPRISES</h1>
                        <p style="font-size: 14px; margin: 2px 0; color: #000; font-weight: 800; text-transform: uppercase;">Fusing Machine Specialist</p>
                        <p style="font-size: 12px; margin: 0; color: #475569;">Malad East, Mumbai | 📞 +91 9326113988</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #000; font-weight: 900;">INV NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 85px; padding: 6px; border-radius: 5px; text-align: center; border: 2px solid #1e3a8a; font-weight: 900; font-size: 15px;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #000; font-weight: 900;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 130px; padding: 6px; border-radius: 5px; border: 2px solid #1e3a8a; font-weight: 900; font-size: 13px;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1.5px solid #1e3a8a; margin-bottom: 15px;">
                
                <div id="old_due_alert" class="due-msg">
                    <span>⚠️ OLD PENDING BALANCE: ₹<span id="due_amt_val">0</span></span>
                    <label class="due-checkbox-area" style="font-size: 12px; color: #000; cursor:pointer;">
                        <input type="checkbox" id="add_old_dues" onchange="calculateTotal()" style="width:16px; height:16px; vertical-align:middle;"> ADD TO THIS BILL
                    </label>
                </div>

                <div id="customer-boundary" style="border: 1.5px solid #000; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: #fff;">
                    <div class="grid-system">
                        <div class="col">
                            <div class="info-row"><label>CUSTOMER NAME:</label><input type="text" id="c_name"></div>
                            <div class="info-row"><label>ADDRESS:</label><textarea id="c_addr" rows="2" placeholder="ENTER FULL ADDRESS"></textarea></div>
                            <div class="info-row" style="border-bottom: none; margin-bottom: 0;">
                                <label>MOBILE NO:</label>
                                <div style="display: flex; gap: 8px; flex: 1;">
                                    <input type="number" id="c_mobile" style="border-bottom: 1px solid #ddd;" onblur="checkOldBalance(this.value)">
                                    <button onclick="pickPhone()" class="no-print" style="background: #1e3a8a; color: white; border: none; padding: 5px 12px; border-radius: 5px; font-weight: 900; cursor: pointer; font-size: 11px;">PICK</button>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="info-row"><label style="min-width: 115px;">MACHINE MODEL:</label><input type="text" id="m_model" placeholder="MACHINE & SIZE"></div>
                            <div class="info-row"><label style="min-width: 115px;">REMARK:</label><textarea id="m_remark" rows="2" placeholder="WORK REMARK"></textarea></div>
                        </div>
                    </div>
                </div>

                <div style="overflow: hidden; border: 2px solid #000; border-radius: 8px;">
                    <div style="background: #1e3a8a; padding: 12px; display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; text-align: center; color: #fff; font-size: 13px; font-weight: 900;">
                        <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div>
                    </div>
                    <div id="items_container" style="background: #fff; padding: 10px;"></div>
                </div>
                <button onclick="addNewRow()" class="no-print" style="width: 100%; background: #f8fafc; border: 2px dashed #1e3a8a; color: #1e3a8a; padding: 12px; font-weight: 900; cursor: pointer; margin-bottom: 15px; margin-top: 10px;">+ ADD ITEM</button>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px; gap: 15px;">
                    <div id="bank-details" style="font-size: 11px; border: 1.5px solid #000; padding: 10px; border-radius: 8px;">
                        <p style="margin:0; font-weight: 900; color: #1e3a8a;">BANK: SBI | NAME: MR. HARIRAM SITARAM RAJBHAR</p>
                        <p style="margin:2px 0; font-weight: 900;">A/C: 44695199584 | IFSC: SBIN0008373</p>
                    </div>

                    <div style="width: 100%; max-width: 380px; border: 2.5px solid #000; padding: 15px; border-radius: 10px; background: #fff;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: 800;"><span>SUB-TOTAL:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font-weight: 800;">
                            <div style="display: flex; align-items: center; gap: 5px;"><input type="checkbox" id="gst_check" onchange="calculateTotal()" style="width:16px; height:16px;"><span>GST (18%):</span></div>
                            <span id="gst_amt">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; color: #dc2626; font-weight: 800;">
                            <span>OLD PENDING BALANCE:</span><span id="display_old_due">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 800;">
                            <span>DISCOUNT (₹):</span>
                            <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 70px; padding: 4px; border: 1.5px solid #000; text-align: right; font-weight: 900; border-radius: 5px;">
                        </div>
                        <hr style="border: 1px solid #1e3a8a; margin: 8px 0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: 900;"><span>GRAND TOTAL:</span><span id="grand_total" style="font-size: 24px; color: #1e3a8a;">₹0.00</span></div>
                        <div style="margin-bottom: 5px; text-align: right;">
                             <p id="amount_in_words" style="color: #000; font-size: 13px; font-style: italic; margin: 0; font-weight: 900; text-decoration: underline;">Zero Only</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; color: #16a34a; font-weight: 900;">
                            <span>PAID AMOUNT:</span><input type="number" id="paid_amt" value="0" oninput="calculateTotal()" style="width: 80px; padding: 5px; border: 1.5px solid #16a34a; text-align: right; font-weight: 900; border-radius: 5px; color: #16a34a;">
                        </div>
                        <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 900;">
                            <span>BALANCE DUE:</span><span id="balance_due" style="font-size: 22px;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div id="signature-area" style="margin-top: 35px; display: flex; justify-content: space-between; padding: 0 20px;">
                    <div style="text-align: center;"><p style="margin-bottom: 30px; border-top: 2px solid #000; width: 180px;"></p><p style="font-size: 12px; font-weight: 900;">Customer Signature</p></div>
                    <div style="text-align: center;"><p style="margin-bottom: 30px; border-top: 2px solid #000; width: 180px;"></p><p style="font-size: 12px; font-weight: 900;">For S.R. ENTERPRISES</p></div>
                </div>
                
                <div id="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px;">
                    <button onclick="window.print()" style="background: #000; color: #fff; padding: 15px; border: none; border-radius: 10px; font-weight: 900; font-size: 16px; cursor: pointer;">🖨️ PRINT BILL / PDF</button>
                    <button id="saveBtn" onclick="saveAndWhatsApp()" style="background: #16a34a; color: #fff; padding: 15px; border: none; border-radius: 10px; font-weight: 900; font-size: 16px; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
            </div>

            <div class="no-print update-box" style="width: 100%; max-width: 1050px; box-sizing: border-box;">
                <h3 style="color: #16a34a; margin: 0 0 10px 0;">💰 UPDATE PENDING PAYMENT (ONLY)</h3>
                <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Baad mein paisa jama karne ke liye yahan update karein:</p>
                <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr auto; gap: 15px; align-items: end;">
                    <div>
                        <label style="font-size: 11px; font-weight: 900;">MOBILE NO</label><br>
                        <input type="number" id="upd_mobile" placeholder="Customer Mobile" style="padding: 10px; border: 1.5px solid #ccc; border-radius: 5px; width: 100%;" onblur="fetchForUpdate(this.value)">
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 900; color: red;">DUE: ₹<span id="upd_due_val">0</span></label><br>
                        <div style="padding: 10px; background: #fff; border: 1.5px solid #ddd; border-radius: 5px; text-align: center; font-weight:900; color: #444;">INFO</div>
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 900;">PAID NOW (₹)</label><br>
                        <input type="number" id="upd_paid" placeholder="Enter Amount" style="padding: 10px; border: 1.5px solid #ccc; border-radius: 5px; width: 100%;">
                    </div>
                    <button onclick="updatePaymentOnly()" style="background: #16a34a; color: white; padding: 12px 25px; border: none; border-radius: 5px; font-weight: 900; cursor: pointer; height: 45px;">UPDATE NOW</button>
                </div>
            </div>
        </div>
    `;
    addNewRow();
}

// 5. Integration Functions
async function checkOldBalance(mobile) {
    if(!mobile || mobile.length < 10) return;
    try {
        const response = await fetch(`${scriptURL}?mobile=${mobile}`);
        const res = await response.json();
        if(res.name) document.getElementById('c_name').value = res.name;
        if(res.address) document.getElementById('c_addr').value = res.address;
        fetchedOldBalance = parseFloat(res.oldBalance) || 0;
        document.getElementById('old_due_alert').style.display = fetchedOldBalance > 0 ? 'flex' : 'none';
        document.getElementById('due_amt_val').innerText = fetchedOldBalance.toFixed(2);
        calculateTotal();
    } catch(e) { console.log("Balance fetch error"); }
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
    
    if(!mobile || additionalPaid <= 0) { alert("Mobile and Paid amount needed!"); return; }
    
    const data = { action: "updatePayment", mobile: mobile, paid: additionalPaid, newBalance: (currentDue - additionalPaid).toFixed(2) };
    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        alert("✅ Payment Updated! Remaining: ₹" + data.newBalance);
        showBilling(); 
    } catch(e) { alert("Error!"); }
}

async function saveAndWhatsApp() {
    const data = {
        invoice: document.getElementById('inv_no').value,
        date: document.getElementById('inv_date').value,
        name: document.getElementById(
