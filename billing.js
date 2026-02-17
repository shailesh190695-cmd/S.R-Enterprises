// MODULE: S.R. Enterprises Professional System (Auto-Fill & Old Pending Balance Final)
const scriptURL = 'https://script.google.com/macros/s/AKfycbw7OimhdjMEh5dkxx-kCSv9VjHEQyOc1gVeR75C19Mj_QtvYpSqqSfZm2SZkbAFKDwTxg/exec';
let fetchedOldBalance = 0;

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
            
            /* Old Pending Balance Alert Branding */
            .due-msg { color: #dc2626; font-weight: 900; font-size: 14px; margin-bottom: 10px; display: none; background: #fee2e2; padding: 10px; border-radius: 8px; border: 1px solid #ef4444; align-items: center; justify-content: space-between; }

            @media screen and (max-width: 600px) {
                .info-row label { min-width: 110px; font-size: 11px; }
                .grid-system { grid-template-columns: 1fr !important; gap: 0; }
            }

            @media print {
                @page { size: A4; margin: 10mm; }
                .no-print, #no-print, #no-print-back, button { display: none !important; }
                body { background: white !important; margin: 0; padding: 0; }
                #bill-container { border: 2px solid black !important; width: 100% !important; max-width: 100% !important; padding: 15px !important; box-shadow: none !important; border-radius: 0 !important; }
                #customer-boundary { border: 2px solid black !important; border-radius: 0 !important; padding: 15px !important; }
                .info-row { border-bottom: none !important; }
                input, textarea { border: none !important; font-weight: 900 !important; }
                #old_due_alert { display: none !important; }
                #bank-details { display: block !important; border: 2px solid black !important; }
            }
        </style>

        <div id="print-area" style="padding: 15px; color: #000; font-family: sans-serif; min-height: 100vh; box-sizing: border-box;">
            <div id="bill-container" style="width: 100%; max-width: 1050px; margin: auto; border: 2px solid #1e3a8a; border-radius: 12px; padding: 25px; background: #ffffff; box-sizing: border-box; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; gap: 15px;">
                    <div>
                        <h1 style="color: #1e3a8a; margin: 0; font-size: 32px; letter-spacing: 1px; font-weight: 900;">S.R ENTERPRISES</h1>
                        <p style="font-size: 14px; margin: 2px 0; color: #000; font-weight: 800; text-transform: uppercase;">Fusing Machine Specialist</p>
                        <p style="font-size: 12px; margin: 0; color: #475569;">Malad East, Mumbai | 📞 +91 9326113988</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #000; font-weight: 900;">INVOICE NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 85px; padding: 6px; border-radius: 5px; text-align: center; border: 2px solid #1e3a8a; font-weight: 900; font-size: 15px;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 11px; color: #000; font-weight: 900;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 130px; padding: 6px; border-radius: 5px; border: 2px solid #1e3a8a; font-weight: 900; font-size: 13px;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1.5px solid #1e3a8a; margin-bottom: 20px;">
                
                <div id="old_due_alert" class="due-msg">
                    <span>⚠️ OLD PENDING BALANCE: ₹<span id="due_amt_val">0</span></span>
                    <label class="due-checkbox-area" style="font-size: 12px; color: #000; cursor:pointer;">
                        <input type="checkbox" id="add_old_dues" onchange="calculateTotal()" style="width:16px; height:16px; vertical-align:middle;"> ADD TO THIS BILL
                    </label>
                </div>

                <div id="customer-boundary" style="border: 1.5px solid #000; padding: 15px; border-radius: 8px; margin-bottom: 20px; background: #fff;">
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

                <div style="overflow-x: auto;">
                    <div style="background: #1e3a8a; padding: 12px; border: 2px solid #000; border-radius: 5px 5px 0 0; display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; text-align: center; color: #fff; font-size: 12px; font-weight: 900; min-width: 550px;">
                        <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div>
                    </div>
                    <div id="items_container" style="background: #fff; border: 2px solid #000; border-top: none; padding: 10px; min-width: 550px;"></div>
                </div>
                <button onclick="addNewRow()" class="no-print" style="width: 100%; background: #f8fafc; border: 2px dashed #1e3a8a; color: #1e3a8a; padding: 12px; font-weight: 900; cursor: pointer; margin-bottom: 15px;">+ ADD ITEM</button>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 15px; gap: 15px;">
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
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font-weight: 800; color: #dc2626;">
                            <span>OLD PENDING BALANCE:</span><span id="display_old_due">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 800;">
                            <span>DISCOUNT (₹):</span>
                            <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 70px; padding: 4px; border: 1.5px solid #000; text-align: right; font-weight: 900; border-radius: 5px;">
                        </div>
                        <hr style="border: 1px solid #1e3a8a; margin: 8px 0;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: 900;"><span>GRAND TOTAL:</span><span id="grand_total" style="font-size: 24px; color: #1e3a8a;">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; color: #16a34a; font-weight: 900;">
                            <span>PAID AMOUNT:</span><input type="number" id="paid_amt" value="0" oninput="calculateTotal()" style="width: 80px; padding: 5px; border: 1.5px solid #16a34a; text-align: right; font-weight: 900; border-radius: 5px; color: #16a34a;">
                        </div>
                        <div style="display: flex; justify-content: space-between; color: #dc2626; font-weight: 900;">
                            <span>BALANCE DUE:</span><span id="balance_due" style="font-size: 22px;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; text-align: right; padding-right: 20px;">
                    <p id="amount_in_words" style="color: #000; font-size: 14px; font-style: italic; margin: 0; font-weight: 900; text-decoration: underline;">Zero Only</p>
                </div>

                <div id="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px;">
                    <button onclick="window.print()" style="background: #000; color: #fff; padding: 15px; border: none; border-radius: 10px; font-weight: 900; font-size: 16px; cursor: pointer;">🖨️ PRINT BILL / PDF</button>
                    <button id="saveBtn" onclick="saveAndWhatsApp()" style="background: #16a34a; color: #fff; padding: 15px; border: none; border-radius: 10px; font-weight: 900; font-size: 16px; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
            </div>
        </div>
    `;
    addNewRow();
}

async function checkOldBalance(mobile) {
    if(!mobile || mobile.length < 10) return;
    try {
        const response = await fetch(`${scriptURL}?mobile=${mobile}`);
        const res = await response.json();
        
        // Auto-Fill Details from Sheets
        if(res.name) document.getElementById('c_name').value = res.name;
        if(res.address) document.getElementById('c_addr').value = res.address;
        
        fetchedOldBalance = parseFloat(res.oldBalance) || 0;
        if(fetchedOldBalance > 0) {
            document.getElementById('old_due_alert').style.display = 'flex';
            document.getElementById('due_amt_val').innerText = fetchedOldBalance.toFixed(2);
        } else {
            document.getElementById('old_due_alert').style.display = 'none';
        }
        calculateTotal();
    } catch(e) { console.log("Balance fetch error"); }
}

async function saveAndWhatsApp() {
    const saveBtn = document.getElementById('saveBtn');
    const data = {
        invoice: document.getElementById('inv_no').value,
        date: document.getElementById('inv_date').value,
        name: document.getElementById('c_name').value.toUpperCase(),
        mobile: document.getElementById('c_mobile').value,
        model: document.getElementById('m_model').value.toUpperCase(),
        address: document.getElementById('c_addr').value.toUpperCase(),
        description: document.querySelector('.item-desc')?.value.toUpperCase() || "REPAIRING SERVICE",
        subtotal: document.getElementById('tax_amt').innerText.replace('₹', ''),
        gst: document.getElementById('gst_amt').innerText.replace('₹', ''),
        total: document.getElementById('grand_total').innerText.replace('₹', ''),
        paid: document.getElementById('paid_amt').value,
        balance: document.getElementById('balance_due').innerText.replace('₹', ''),
        pending: document.getElementById('balance_due').innerText.replace('₹', '')
    };

    if(!data.name || !data.mobile) { alert("Customer Name aur Mobile Number zaroori hai!"); return; }

    saveBtn.innerText = "⏳ SAVING...";
    saveBtn.disabled = true;

    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        alert("✅ Bill Saved in Google Sheet!");
        
        const msg = `*S.R. ENTERPRISES REPORT*%0A---------------------------%0A*Invoice:* ${data.invoice}%0A*Date:* ${data.date}%0A*Customer:* ${data.name}%0A*Model:* ${data.model}%0A*Grand Total:* ₹${data.total}%0A*Amount Paid:* ₹${data.paid}%0A*OLD PENDING BALANCE:* ₹${data.balance}%0A---------------------------%0A*Thank you!*`;
        window.open(`https://wa.me/91${data.mobile}?text=${msg}`, '_blank');
        
    } catch(e) { 
        alert("❌ Error saving to sheet!"); 
    } finally {
        saveBtn.innerText = "📲 SAVE & WHATSAPP";
        saveBtn.disabled = false;
    }
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    const id = Date.now();
    row.id = 'row-' + id;
    row.style = "display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; margin-bottom: 8px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 4px; min-width: 550px;";
    row.innerHTML = `
        <input type="text" class="item-desc" placeholder="WORK DESCRIPTION" style="padding:5px; border:none; background:transparent; font-weight:700; width:100%; font-size:12px;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700; width:100%; font-size:12px;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700; width:60px; font-size:12px;">
        <div class="item-total" style="color: #000; font-weight: 900; text-align: right; font-size:12px;">₹0.00</div>
        <button class="no-print" onclick="this.parentElement.remove(); calculateTotal();" style="background:none; border:none; color:#ef4444; font-size: 16px; cursor:pointer;">❌</button>
    `;
    container.appendChild(row);
}

function calculateTotal() {
    let subtotal = 0;
    document.querySelectorAll('#items_container > div').forEach(row => {
        const r = parseFloat(row.querySelector('.item-rate').value) || 0;
        const q = parseFloat(row.querySelector('.item-qty').value) || 0;
        const total = r * q;
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
    let words = '', groupIdx = 0; while (num > 0) { let group = num % 1000; if (group !== 0) { words = makeGroup(group) + g[groupIdx] + ' ' + words; } num = Math.floor(num / 1000); groupIdx++; }
    return words.trim();
}

async function pickPhone() {
    try { const contacts = await navigator.contacts.select(['name', 'tel'], {multiple: false}); if (contacts.length) { document.getElementById('c_name').value = contacts[0].name[0]; document.getElementById('c_mobile').value = contacts[0].tel[0].replace(/\D/g, ''); checkOldBalance(document.getElementById('c_mobile').value); } } catch (e) { alert("Contact Picker not supported."); }
            }
    
