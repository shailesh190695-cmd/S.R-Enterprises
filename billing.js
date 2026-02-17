// MODULE: S.R. Enterprises Premium Billing System
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.style.display = "block";
    panel.style.background = "#0f172a"; // Nayi Premium Dark Theme

    panel.innerHTML = `
        <div id="print-area" style="padding: 10px; color: white; font-family: sans-serif; min-height: 100vh; box-sizing: border-box;">
            <div style="width: 100%; max-width: 1000px; margin: auto; border: 2px solid #fbbf24; border-radius: 15px; padding: 20px; background: #1e293b; box-sizing: border-box; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div>
                        <h2 style="color: #fbbf24; margin: 0; font-size: 32px; letter-spacing: 1px;">S.R Enterprises</h2>
                        <p style="font-size: 12px; margin: 2px 0; color: #94a3b8; font-weight: bold;">FUSING MACHINE SPECIALIST</p>
                        <p style="font-size: 11px; margin: 0; color: #cbd5e1;">Malad East, Mumbai, Maharashtra</p>
                        <p style="font-size: 13px; margin: 5px 0 0 0; color: #fbbf24; font-weight: bold;">📞 +91 9326113988</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #fbbf24; font-weight: bold;">INVOICE NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 90px; padding: 8px; border-radius: 5px; text-align: center; border:1px solid #334155; background: #0f172a; color: white;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #fbbf24; font-weight: bold;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 130px; padding: 8px; border-radius: 5px; border:1px solid #334155; background: #0f172a; color: white;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1px solid #fbbf24; margin-bottom: 15px;">

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 12px;">
                    <div><label style="color: #fbbf24; font-size: 12px; font-weight: bold;">CUSTOMER NAME:</label>
                    <input type="text" id="c_name" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:1px solid #334155; background: #0f172a; color: white;"></div>
                    <div><label style="color: #fbbf24; font-size: 12px; font-weight: bold;">MACHINE MODEL:</label>
                    <input type="text" id="m_model" placeholder="Model No." style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:1px solid #334155; background: #0f172a; color: white;"></div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 12px;">
                    <div><label style="color: #fbbf24; font-size: 12px; font-weight: bold;">ADDRESS:</label>
                    <input type="text" id="c_addr" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:1px solid #334155; background: #0f172a; color: white;"></div>
                    <div><label style="color: #fbbf24; font-size: 12px; font-weight: bold;">REMARK:</label>
                    <input type="text" id="m_remark" placeholder="Note" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:1px solid #334155; background: #0f172a; color: white;"></div>
                </div>

                <div style="margin-bottom: 20px; width: 50%;">
                    <label style="color: #fbbf24; font-size: 12px; font-weight: bold;">MOBILE NO:</label>
                    <div style="display: flex; gap: 10px; margin-top: 5px;">
                        <input type="number" id="c_mobile" style="flex: 1; padding: 10px; border-radius: 8px; border:1px solid #334155; background: #0f172a; color: white;">
                        <button onclick="pickPhone()" style="background: #fbbf24; color: black; border: none; padding: 0 15px; border-radius: 8px; font-weight: bold; cursor: pointer;">PICK</button>
                    </div>
                </div>

                <div style="background: #334155; padding: 12px; border-radius: 10px 10px 0 0; display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; text-align: center; color: #fbbf24; font-size: 12px; font-weight: bold;">
                    <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div>
                </div>
                <div id="items_container" style="background: #1e293b; padding: 10px; border-bottom: 1px solid #334155;"></div>
                <button onclick="addNewRow()" class="no-print" style="width: 100%; background: none; border: 1px dashed #fbbf24; color: #fbbf24; padding: 12px; border-radius: 0 0 10px 10px; font-weight: bold; cursor: pointer; margin-bottom: 20px;">+ ADD ITEM / WORK DESCRIPTION</button>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px;">
                    <div id="bank-details" style="font-size: 11px; color: #cbd5e1; visibility: hidden;">
                        <p style="margin:0; font-weight:bold; color: #fbbf24;">BANK DETAILS:</p>
                        <p style="margin:2px 0;">A/C Name: S.R. Enterprises</p>
                        <p style="margin:2px 0;">Bank: Your Bank Name</p>
                        <p style="margin:2px 0;">A/C No: 1234567890</p>
                        <p style="margin:2px 0;">IFSC: ABCD0123456</p>
                    </div>

                    <div style="width: 100%; max-width: 400px; border: 2px solid #fbbf24; padding: 20px; border-radius: 15px; background: #334155;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Sub-Total:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="gst_check" onchange="calculateTotal()" style="width:18px; height:18px;"><span style="color: #4cd137;">GST (18%):</span></div>
                            <span id="gst_amt">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <span style="color: #f87171;">Discount (₹):</span>
                            <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 90px; padding: 5px; border-radius: 5px; border:none; text-align: right; background: #0f172a; color: white;">
                        </div>
                        <hr style="border: 0.5px solid #475569;">
                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                            <span style="font-size: 18px; font-weight: bold; color: #fbbf24;">GRAND TOTAL:</span>
                            <span id="grand_total" style="font-size: 24px; font-weight: bold; color: #4cd137;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; text-align: right; padding-right: 20px;">
                    <p id="amount_in_words" style="color: #4cd137; font-size: 14px; font-style: italic; margin: 0; font-weight: bold;">Zero Only</p>
                </div>

                <div id="signature-area" style="margin-top: 50px; display: flex; justify-content: space-between; padding: 0 20px;">
                    <div style="text-align: center;"><p style="margin-bottom: 40px; border-top: 1px solid #777; width: 150px;"></p><p style="font-size: 12px;">Customer Signature</p></div>
                    <div style="text-align: center;"><p style="margin-bottom: 40px; border-top: 1px solid #777; width: 150px;"></p><p style="font-size: 12px;">For S.R. Enterprises</p></div>
                </div>

                <div id="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                    <button onclick="window.print()" style="background: #fbbf24; color: black; padding: 18px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">🖨️ PRINT BILL / PDF</button>
                    <button onclick="sendToWhatsApp()" style="background: #10b981; color: white; padding: 18px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
                <button id="no-print-back" class="no-print" onclick="showDashboard()" style="width: 100%; margin-top: 15px; background: #64748b; color: white; padding: 10px; border: none; border-radius: 8px; cursor: pointer;">← BACK</button>
            </div>
        </div>
        <style>
            @media print{
                .no-print, #no-print, #no-print-back, button{display:none!important;}
                body{background:white!important;}
                #print-area{color:black!important;background:white!important;padding:0;}
                div{background:white!important;border-color:#333!important;color:black!important;}
                #bank-details{visibility: visible !important; color: black !important;}
                input{color:black!important; border:none!important; background:transparent!important;}
                hr{border-color:black!important;}
                #amount_in_words{color:black!important;}
            }
        </style>
    `;
    addNewRow();
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    const id = Date.now();
    row.id = 'row-' + id;
    row.style = "display: grid; grid-template-columns: 3fr 1fr 60px 1fr 40px; gap: 10px; margin-bottom: 8px; align-items: center;";
    row.innerHTML = `
        <input type="text" placeholder="Work description" style="padding:10px; border-radius:5px; border:1px solid #334155; background:#0f172a; color:white; width:100%; box-sizing:border-box;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding:10px; border-radius:5px; border:1px solid #334155; background:#0f172a; color:white; text-align:center; width:100%; box-sizing:border-box;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding:10px; border-radius:5px; border:1px solid #334155; background:#0f172a; color:white; text-align:center; width:60px;">
        <div class="item-total" style="color: #fbbf24; font-weight: bold; text-align: right;">₹0.00</div>
        <button class="no-print" onclick="deleteRow('${id}')" style="background:none; border:none; color:#f87171; font-weight:bold; cursor:pointer;">❌</button>
    `;
    container.appendChild(row);
}

function deleteRow(id) {
    const row = document.getElementById('row-' + id);
    if(row) {
        row.remove();
        calculateTotal();
    }
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
    const taxable = subtotal - disc;
    const gst = isGst ? (taxable * 0.18) : 0;
    const grand = Math.round(taxable + gst);
    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gst.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + (grand > 0 ? grand : 0).toFixed(2);
    document.getElementById('amount_in_words').innerText = numberToWords(grand > 0 ? grand : 0) + " Only";
}

function sendToWhatsApp() {
    const name = document.getElementById('c_name').value;
    const mobile = document.getElementById('c_mobile').value;
    const invNo = document.getElementById('inv_no').value;
    const total = document.getElementById('grand_total').innerText;
    const model = document.getElementById('m_model').value;

    if(!mobile || !name) {
        alert("Customer Name aur Mobile Number zaroori hai!");
        return;
    }

    const message = `*S.R. ENTERPRISES SERVICE REPORT*%0A--------------------------------%0A*Invoice:* ${invNo}%0A*Customer:* ${name}%0A*Machine:* ${model}%0A*Total Amount:* ${total}%0A--------------------------------%0AThank you!`;
    window.open(`https://wa.me/91${mobile}?text=${message}`, '_blank');
}

function numberToWords(num) {
    if (num === 0) return "Zero";
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const g = ['', 'Thousand', 'Million', 'Billion'];
    const makeGroup = (n) => {
        let s = '';
        if (n >= 100) { s += a[Math.floor(n / 100)] + ' Hundred '; n %= 100; }
        if (n >= 20) { s += b[Math.floor(n / 10)] + ' '; n %= 10; }
        if (n > 0) { s += a[n] + ' '; }
        return s;
    };
    let words = '', groupIdx = 0;
    while (num > 0) {
        let group = num % 1000;
        if (group !== 0) { words = makeGroup(group) + g[groupIdx] + ' ' + words; }
        num = Math.floor(num / 1000);
        groupIdx++;
    }
    return words.trim();
}

async function pickPhone() {
    try {
        const contacts = await navigator.contacts.select(['name', 'tel'], {multiple: false});
        if (contacts.length) {
            document.getElementById('c_name').value = contacts[0].name[0];
            document.getElementById('c_mobile').value = contacts[0].tel[0].replace(/\D/g, '');
        }
    } catch (e) { alert("Contact Picker not supported."); }
}
