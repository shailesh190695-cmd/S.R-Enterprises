// MODULE: S.R. Enterprises Universal System (Perfect Mobile + Print Layout)
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.style.display = "block";
    panel.style.background = "#f1f5f9"; 

    panel.innerHTML = `
        <style>
            /* Layout Fix for Mobile & Tablet */
            .row-flex { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 2px; }
            .row-flex label { font-weight: 900; font-size: 12px; color: #000; white-space: nowrap; min-width: fit-content; }
            .row-flex input { flex: 1; border: none; background: transparent; font-weight: 700; font-size: 13px; padding: 4px; min-width: 50px; }
            
            .grid-2 { display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px; }

            @media screen and (max-width: 600px) {
                .grid-2 { gap: 8px; }
                .row-flex label { font-size: 10px; }
                .row-flex input { font-size: 11px; }
                h1 { font-size: 22px !important; }
            }

            @media print {
                @page { size: A4; margin: 8mm; }
                .no-print, button { display: none !important; }
                body { background: white !important; }
                #bill-container { border: 2px solid black !important; padding: 5px !important; margin: 0 !important; width: 100% !important; box-shadow: none !important; border-radius: 0 !important; }
                .row-flex { border-bottom: none !important; }
                #bank-details { display: block !important; border: 1.5px solid black !important; }
            }
        </style>

        <div id="print-area" style="padding: 10px; color: #000; font-family: sans-serif; min-height: 100vh; box-sizing: border-box;">
            <div id="bill-container" style="width: 100%; max-width: 950px; margin: auto; border: 2px solid #1e3a8a; border-radius: 12px; padding: 20px; background: #ffffff; box-sizing: border-box; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; gap: 10px;">
                    <div>
                        <h1 style="color: #1e3a8a; margin: 0; font-size: 28px; letter-spacing: 1px; font-weight: 900;">S.R ENTERPRISES</h1>
                        <p style="font-size: 12px; margin: 1px 0; color: #000; font-weight: 800;">FUSING MACHINE SPECIALIST</p>
                        <p style="font-size: 11px; margin: 0; color: #475569; font-weight: 700;">Malad East, Mumbai, Maharashtra</p>
                        <p style="font-size: 13px; margin: 3px 0 0 0; color: #1e3a8a; font-weight: 900;">📞 +91 9326113988</p>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <div style="text-align: center;">
                            <label style="font-size: 9px; font-weight: 900;">INV NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 65px; padding: 4px; border-radius: 4px; border: 1.5px solid #1e3a8a; font-weight: 900; font-size: 12px; text-align: center;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 9px; font-weight: 900;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 110px; padding: 4px; border-radius: 4px; border: 1.5px solid #1e3a8a; font-weight: 900; font-size: 11px;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1px solid #1e3a8a; margin-bottom: 15px;">

                <div style="margin-bottom: 15px;">
                    <div class="grid-2">
                        <div class="row-flex">
                            <label>CUSTOMER NAME:</label>
                            <input type="text" id="c_name">
                        </div>
                        <div class="row-flex">
                            <label>MACHINE MODEL:</label>
                            <input type="text" id="m_model" placeholder="Model No.">
                        </div>
                    </div>

                    <div class="grid-2">
                        <div class="row-flex">
                            <label>ADDRESS:</label>
                            <input type="text" id="c_addr">
                        </div>
                        <div class="row-flex">
                            <label>REMARK:</label>
                            <input type="text" id="m_remark" placeholder="Note">
                        </div>
                    </div>

                    <div class="row-flex" style="max-width: 350px;">
                        <label>MOBILE NO:</label>
                        <input type="number" id="c_mobile">
                        <button onclick="pickPhone()" class="no-print" style="background: #1e3a8a; color: white; border: none; padding: 2px 8px; border-radius: 4px; font-weight: 900; cursor: pointer; font-size: 10px;">PICK</button>
                    </div>
                </div>

                <div style="overflow-x: auto;">
                    <div style="background: #1e3a8a; padding: 10px; border: 1.5px solid #000; border-radius: 5px 5px 0 0; display: grid; grid-template-columns: 3fr 1fr 50px 1fr 35px; gap: 5px; text-align: center; color: #fff; font-size: 11px; font-weight: 900; min-width: 450px;">
                        <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div>
                    </div>
                    <div id="items_container" style="background: #fff; border: 1.5px solid #000; border-top: none; padding: 5px; min-width: 450px;"></div>
                </div>
                <button onclick="addNewRow()" class="no-print" style="width: 100%; background: #f1f5f9; border: 1.5px dashed #1e3a8a; color: #1e3a8a; padding: 8px; font-weight: 900; cursor: pointer; margin-bottom: 10px; font-size: 11px;">+ ADD ITEM</button>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px; gap: 10px;">
                    <div id="bank-details" style="font-size: 10px; color: #000; font-weight: 800; border: 1.5px solid #000; padding: 8px; border-radius: 8px; display: none; background: #fff; line-height: 1.2;">
                        <p style="margin:0; font-weight: 900; text-decoration: underline; color: #1e3a8a;">BANK DETAILS:</p>
                        <p style="margin:2px 0;">NAME: MR. HARIRAM SITARAM RAJBHAR</p>
                        <p style="margin:2px 0;">BANK: SBI | A/C: 44695199584</p>
                        <p style="margin:2px 0;">IFSC: SBIN0008373</p>
                    </div>

                    <div style="width: 100%; max-width: 320px; border: 2.2px solid #000; padding: 12px; border-radius: 10px; background: #f8fafc;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-weight: 800; font-size: 12px;"><span>SUB-TOTAL:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-weight: 800; font-size: 12px;">
                            <div style="display: flex; align-items: center; gap: 5px;"><input type="checkbox" id="gst_check" onchange="calculateTotal()" style="width:14px; height:14px;"><span style="color: #000;">GST (18%):</span></div>
                            <span id="gst_amt">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-weight: 800; font-size: 12px;">
                            <span>DISCOUNT:</span>
                            <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 60px; padding: 2px; border: 1.2px solid #000; text-align: right; font-weight: 900;">
                        </div>
                        <hr style="border: 0.8px solid #1e3a8a; margin: 4px 0;">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="font-size: 15px; font-weight: 900;">GRAND TOTAL:</span>
                            <span id="grand_total" style="font-size: 20px; font-weight: 900; color: #16a34a;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 8px; text-align: right; padding-right: 15px;">
                    <p id="amount_in_words" style="color: #000; font-size: 12px; font-style: italic; font-weight: 900; text-decoration: underline;">Zero Only</p>
                </div>

                <div id="signature-area" style="margin-top: 40px; display: flex; justify-content: space-between; padding: 0 10px;">
                    <div style="text-align: center;"><p style="margin-bottom: 30px; border-top: 2px solid #000; width: 140px;"></p><p style="font-size: 11px; font-weight: 900;">Customer Signature</p></div>
                    <div style="text-align: center;"><p style="margin-bottom: 30px; border-top: 2px solid #000; width: 140px;"></p><p style="font-size: 11px; font-weight: 900;">For S.R. ENTERPRISES</p></div>
                </div>

                <div id="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                    <button onclick="window.print()" style="background: #000; color: #fff; padding: 12px; border: none; border-radius: 8px; font-weight: 900; font-size: 14px; cursor: pointer;">🖨️ PRINT</button>
                    <button onclick="sendToWhatsApp()" style="background: #16a34a; color: #fff; padding: 12px; border: none; border-radius: 8px; font-weight: 900; font-size: 14px; cursor: pointer;">📲 WHATSAPP</button>
                </div>
                <button id="no-print-back" class="no-print" onclick="showDashboard()" style="width: 100%; margin-top: 10px; background: #64748b; color: white; padding: 8px; border: none; border-radius: 8px; font-weight: 900; cursor: pointer;">← BACK</button>
            </div>
        </div>
    `;
    addNewRow();
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    const id = Date.now();
    row.id = 'row-' + id;
    row.style = "display: grid; grid-template-columns: 3fr 1fr 50px 1fr 35px; gap: 5px; margin-bottom: 5px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 2px; min-width: 450px;";
    row.innerHTML = `<input type="text" placeholder="Work description" style="padding:5px; border:none; background:transparent; font-weight:700; width:100%; font-size:11px;"><input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700; width:100%; font-size:11px;"><input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding:5px; border:none; text-align:center; font-weight:700; width:50px; font-size:11px;"><div class="item-total" style="color: #000; font-weight: 900; text-align: right; font-size:11px;">₹0.00</div><button class="no-print" onclick="deleteRow('${id}')" style="background:none; border:none; color:#ef4444; font-size: 14px; cursor:pointer;">❌</button>`;
    container.appendChild(row);
}

function deleteRow(id) { const row = document.getElementById('row-' + id); if(row) { row.remove(); calculateTotal(); } }

function calculateTotal() {
    let subtotal = 0; document.querySelectorAll('#items_container > div').forEach(row => {
        const r = parseFloat(row.querySelector('.item-rate').value) || 0;
        const q = parseFloat(row.querySelector('.item-qty').value) || 0;
        const total = r * q; row.querySelector('.item-total').innerText = "₹" + total.toFixed(2); subtotal += total;
    });
    const disc = parseFloat(document.getElementById('w_disc').value) || 0;
    const isGst = document.getElementById('gst_check').checked;
    const taxable = subtotal - disc; const gst = isGst ? (taxable * 0.18) : 0; const grand = Math.round(taxable + gst);
    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2); document.getElementById('gst_amt').innerText = "₹" + gst.toFixed(2); document.getElementById('grand_total').innerText = "₹" + (grand > 0 ? grand : 0).toFixed(2);
    document.getElementById('amount_in_words').innerText = numberToWords(grand > 0 ? grand : 0) + " Only";
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

function sendToWhatsApp() {
    const name = document.getElementById('c_name').value; const mobile = document.getElementById('c_mobile').value; const invNo = document.getElementById('inv_no').value; const total = document.getElementById('grand_total').innerText; const model = document.getElementById('m_model').value;
    if(!mobile || !name) { alert("Customer Name aur Mobile Number zaroori hai!"); return; }
    const message = `*S.R. ENTERPRISES SERVICE REPORT*%0A--------------------------------%0A*Invoice:* ${invNo}%0A*Customer:* ${name}%0A*Machine:* ${model}%0A*Total Amount:* ${total}%0A--------------------------------%0AThank you!`;
    window.open(`https://wa.me/91${mobile}?text=${message}`, '_blank');
}

async function pickPhone() {
    try { const contacts = await navigator.contacts.select(['name', 'tel'], {multiple: false}); if (contacts.length) { document.getElementById('c_name').value = contacts[0].name[0]; document.getElementById('c_mobile').value = contacts[0].tel[0].replace(/\D/g, ''); } } catch (e) { alert("Contact Picker not supported."); }
}
