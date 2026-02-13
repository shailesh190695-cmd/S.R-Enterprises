// MODULE: S.R. Enterprises Original Layout (Total in Words Added)
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.style.display = "block";
    panel.style.background = "#1a2233";

    panel.innerHTML = `
        <div id="print-area" style="padding: 10px; color: white; font-family: sans-serif; min-height: 100vh; box-sizing: border-box;">
            <div style="width: 100%; max-width: 1000px; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 20px; background: #1a2233; box-sizing: border-box;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 28px;">S.R Enterprises</h2>
                        <p style="font-size: 12px; margin: 2px 0; color: #dcdde1; font-weight: bold;">FUSING MACHINE SPECIALIST</p>
                        <p style="font-size: 11px; margin: 0; color: #fff;">Malad East, Mumbai, Maharashtra</p>
                        <p style="font-size: 13px; margin: 5px 0 0 0; color: #edb92e; font-weight: bold;">📞 +91 9326113988</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #edb92e; font-weight: bold;">INVOICE NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 90px; padding: 8px; border-radius: 5px; text-align: center; border:none;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #edb92e; font-weight: bold;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 130px; padding: 8px; border-radius: 5px; border:none;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1px solid #edb92e; margin-bottom: 15px;">

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 12px;">
                    <div><label style="color: #edb92e; font-size: 12px; font-weight: bold;">CUSTOMER NAME:</label>
                    <input type="text" id="c_name" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:none; box-sizing: border-box;"></div>
                    <div><label style="color: #edb92e; font-size: 12px; font-weight: bold;">MACHINE MODEL:</label>
                    <input type="text" id="m_model" placeholder="Model No." style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:none; box-sizing: border-box;"></div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 12px;">
                    <div><label style="color: #edb92e; font-size: 12px; font-weight: bold;">ADDRESS:</label>
                    <input type="text" id="c_addr" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:none; box-sizing: border-box;"></div>
                    <div><label style="color: #edb92e; font-size: 12px; font-weight: bold;">REMARK:</label>
                    <input type="text" id="m_remark" placeholder="Note" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border:none; box-sizing: border-box;"></div>
                </div>

                <div style="margin-bottom: 20px; width: 50%;">
                    <label style="color: #edb92e; font-size: 12px; font-weight: bold;">MOBILE NO:</label>
                    <div style="display: flex; gap: 10px; margin-top: 5px;">
                        <input type="number" id="c_mobile" style="flex: 1; padding: 10px; border-radius: 8px; border:none;">
                        <button onclick="pickPhone()" style="background: #edb92e; color: black; border: none; padding: 0 15px; border-radius: 8px; font-weight: bold; cursor: pointer;">PICK</button>
                    </div>
                </div>

                <div style="background: #252e42; padding: 12px; border-radius: 10px 10px 0 0; display: grid; grid-template-columns: 3fr 1fr 60px 1fr; gap: 10px; text-align: center; color: #edb92e; font-size: 12px; font-weight: bold;">
                    <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div style="text-align: right;">TOTAL</div>
                </div>
                <div id="items_container" style="background: #252e42; padding: 10px; border-bottom: 1px solid #3d4a6d;"></div>
                <button onclick="addNewRow()" style="width: 100%; background: none; border: 1px dashed #edb92e; color: #edb92e; padding: 12px; border-radius: 0 0 10px 10px; font-weight: bold; cursor: pointer; margin-bottom: 20px;">+ ADD ITEM / WORK DESCRIPTION</button>

                <div style="display: flex; justify-content: flex-end;">
                    <div style="width: 100%; max-width: 400px; border: 2px solid #edb92e; padding: 20px; border-radius: 15px; background: #252e42;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Sub-Total:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="gst_check" onchange="calculateTotal()" style="width:18px; height:18px;"><span style="color: #4cd137;">GST (18%):</span></div>
                            <span id="gst_amt">₹0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <span style="color: #e74c3c;">Discount (₹):</span>
                            <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 90px; padding: 5px; border-radius: 5px; border:none; text-align: right;">
                        </div>
                        <hr style="border: 0.5px solid #3d4a6d;">
                        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                            <span style="font-size: 18px; font-weight: bold; color: #edb92e;">GRAND TOTAL:</span>
                            <span id="grand_total" style="font-size: 24px; font-weight: bold; color: #4cd137;">₹0.00</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; text-align: right; padding-right: 20px;">
                    <p id="amount_in_words" style="color: #4cd137; font-size: 14px; font-style: italic; margin: 0; font-weight: bold;">Rupees Zero Only</p>
                </div>

                <div id="signature-area" style="margin-top: 50px; display: flex; justify-content: space-between; padding: 0 20px;">
                    <div style="text-align: center;"><p style="margin-bottom: 40px; border-top: 1px solid #777; width: 150px;"></p><p style="font-size: 12px;">Customer Signature</p></div>
                    <div style="text-align: center;"><p style="margin-bottom: 40px; border-top: 1px solid #777; width: 150px;"></p><p style="font-size: 12px;">For S.R. Enterprises</p></div>
                </div>

                <div id="no-print" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                    <button onclick="window.print()" style="background: #edb92e; color: black; padding: 18px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">🖨️ PRINT BILL / PDF</button>
                    <button onclick="alert('Saving...')" style="background: #4cd137; color: white; padding: 18px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
                <button id="no-print-back" onclick="showDashboard()" style="width: 100%; margin-top: 15px; background: #7f8c8d; color: white; padding: 10px; border: none; border-radius: 8px; cursor: pointer;">← BACK</button>
            </div>
        </div>
        <style>@media print{#no-print, #no-print-back, button{display:none!important;}body{background:white!important;}#print-area{color:black!important;background:white!important;padding:0;}div{background:white!important;border-color:#333!important;color:black!important;}input{color:black!important;}hr{border-color:black!important;}#amount_in_words{color:black!important;}}</style>
    `;
    addNewRow();
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const row = document.createElement('div');
    row.style = "display: grid; grid-template-columns: 3fr 1fr 60px 1fr; gap: 10px; margin-bottom: 8px; align-items: center;";
    row.innerHTML = `<input type="text" placeholder="Work description" style="padding:10px; border-radius:5px; border:none; width:100%; box-sizing:border-box;"><input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding:10px; border-radius:5px; border:none; text-align:center; width:100%; box-sizing:border-box;"><input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding:10px; border-radius:5px; border:none; text-align:center; width:60px;"><div class="item-total" style="color: #edb92e; font-weight: bold; text-align: right;">₹0.00</div>`;
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
    const taxable = subtotal - disc;
    const gst = isGst ? (taxable * 0.18) : 0;
    const grand = Math.round(taxable + gst);
    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gst.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + (grand > 0 ? grand : 0).toFixed(2);
    document.getElementById('amount_in_words').innerText = "Rupees " + numberToWords(grand > 0 ? grand : 0) + " Only";
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
