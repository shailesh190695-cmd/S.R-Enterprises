// MASTER MODULE: S.R. Enterprises Full Management (Billing + Dashboard)
const scriptURL = 'https://script.google.com/macros/s/AKfycbwkxcAdRCz2iAzkOV0eaeo5HvpknvSRHk_VsJdpErFZAXgWztf3Dbz0lTjJ3S78eCINog/exec';
let fetchedOldBalance = 0;

// --- 1. BILLING INTERFACE ---
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);
    fetchedOldBalance = 0;

    panel.style.display = "block";
    panel.innerHTML = `
        <style>
            input[type="text"], textarea { text-transform: uppercase; }
            .info-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 2px; }
            .info-row label { font-weight: 900; font-size: 13px; color: #000; min-width: 140px; }
            .info-row input, .info-row textarea { flex: 1; border: none; font-weight: 700; font-size: 14px; background: transparent; outline: none; }
            .grid-system { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; }
            .due-msg { color: #dc2626; font-weight: 900; font-size: 14px; margin-bottom: 10px; display: none; background: #fee2e2; padding: 10px; border-radius: 8px; border: 1px solid #ef4444; align-items: center; justify-content: space-between; }
            @media print { .no-print, button, .due-checkbox-area { display: none !important; } }
        </style>

        <div id="print-area" style="padding: 15px; color: #000; font-family: sans-serif;">
            <div id="bill-container" style="width: 100%; max-width: 1050px; margin: auto; border: 2px solid #1e3a8a; border-radius: 12px; padding: 25px; background: #ffffff;">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <h1 style="color: #1e3a8a; margin: 0; font-size: 32px; font-weight: 900;">S.R ENTERPRISES</h1>
                        <p style="font-size: 14px; font-weight: 800;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="text-align: right;">
                        <input type="text" id="inv_no" value="${autoInv}" style="width: 85px; border: 1.5px solid #1e3a8a; text-align: center; font-weight:900;">
                        <input type="date" id="inv_date" value="${today}" style="width: 130px; border: 1.5px solid #1e3a8a; font-weight:900;">
                    </div>
                </div>

                <hr style="border: 1.5px solid #1e3a8a; margin: 20px 0;">
                <div id="old_due_alert" class="due-msg">
                    <span>⚠️ OLD PENDING BALANCE: ₹<span id="due_amt_val">0</span></span>
                    <label class="due-checkbox-area"><input type="checkbox" id="add_old_dues" onchange="calculateTotal()"> ADD TO BILL</label>
                </div>

                <div id="customer-boundary" style="border: 1.5px solid #000; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <div class="grid-system">
                        <div class="col">
                            <div class="info-row"><label>MOBILE NO:</label><input type="number" id="c_mobile" onblur="checkOldBalance(this.value)"></div>
                            <div class="info-row"><label>CUSTOMER NAME:</label><input type="text" id="c_name"></div>
                            <div class="info-row"><label>ADDRESS:</label><textarea id="c_addr" rows="2"></textarea></div>
                        </div>
                        <div class="col">
                            <div class="info-row"><label>MACHINE MODEL:</label><input type="text" id="m_model"></div>
                            <div class="info-row"><label>REMARK:</label><textarea id="m_remark" rows="2"></textarea></div>
                        </div>
                    </div>
                </div>

                <div id="items_box" style="border: 1.5px solid #000; border-radius: 5px;">
                    <div style="background: #1e3a8a; color: #fff; display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 40px; padding: 10px; font-weight: 900;">
                        <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div><div class="no-print">X</div>
                    </div>
                    <div id="rows_container" style="padding: 10px;"></div>
                </div>
                <button onclick="addNewRow()" class="no-print" style="width:100%; margin-top:10px; cursor:pointer;">+ ADD LINE</button>

                <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
                    <div style="width: 380px; border: 2px solid #000; padding: 15px; border-radius: 10px;">
                        <div style="display: flex; justify-content: space-between;"><span>SUB-TOTAL:</span><span id="tax_amt">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; color: red;"><span>OLD PENDING BALANCE:</span><span id="display_old_due">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 20px; color: #1e3a8a;"><span>GRAND TOTAL:</span><span id="grand_total">₹0.00</span></div>
                        <div style="display: flex; justify-content: space-between; color: green;"><span>PAID:</span><input type="number" id="paid_amt" value="0" oninput="calculateTotal()" style="width:80px; text-align:right;"></div>
                        <div style="display: flex; justify-content: space-between; color: red; font-weight: 900; border-top: 1px solid #000; padding-top: 5px;"><span>BALANCE DUE:</span><span id="balance_due">₹0.00</span></div>
                    </div>
                </div>

                <div class="no-print" style="margin-top: 25px; display: flex; gap: 10px;">
                    <button id="saveBtn" onclick="saveAndWhatsApp()" style="flex:1; background:#16a34a; color:white; padding:15px; font-weight:900; border:none; border-radius:10px; cursor:pointer;">📲 SAVE & WHATSAPP</button>
                    <button onclick="showRecords()" style="flex:1; background:#1e3a8a; color:white; padding:15px; font-weight:900; border:none; border-radius:10px; cursor:pointer;">📂 VIEW RECORDS</button>
                </div>
            </div>
        </div>
    `;
    addNewRow();
}

// --- 2. DASHBOARD / RECORDS INTERFACE ---
async function showRecords() {
    const panel = document.getElementById('main-panel');
    panel.innerHTML = `<h2 style="text-align:center;">⏳ LOADING RECORDS...</h2>`;
    
    try {
        const response = await fetch(`${scriptURL}?action=getAll`);
        const rows = await response.json();
        
        panel.innerHTML = `
            <div style="padding: 20px; font-family: sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color:#1e3a8a; margin:0;">📊 SERVICE RECORDS</h2>
                    <input type="text" id="searchBar" oninput="filterRecords()" placeholder="SEARCH NAME OR MOBILE..." style="padding:10px; width:300px; border-radius:5px; border:1px solid #ccc;">
                    <button onclick="showBilling()" style="background:#16a34a; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer; font-weight:900;">+ NEW BILL</button>
                </div>
                <div style="overflow-x: auto; background:white; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                    <table style="width:100%; border-collapse: collapse; text-align: left;">
                        <thead style="background:#1e3a8a; color:white;">
                            <tr>
                                <th style="padding:12px;">DATE</th><th style="padding:12px;">INVOICE</th><th style="padding:12px;">CUSTOMER</th><th style="padding:12px;">MOBILE</th><th style="padding:12px;">TOTAL</th><th style="padding:12px;">PENDING</th><th style="padding:12px;">ACTION</th>
                            </tr>
                        </thead>
                        <tbody id="records_body">
                            ${rows.map((row, index) => `
                                <tr class="record-row" style="border-bottom:1px solid #eee;">
                                    <td style="padding:12px;">${row[1]}</td>
                                    <td style="padding:12px; font-weight:900;">${row[0]}</td>
                                    <td style="padding:12px;">${row[2]}</td>
                                    <td style="padding:12px;">${row[3]}</td>
                                    <td style="padding:12px;">₹${row[9]}</td>
                                    <td style="padding:12px; color:red; font-weight:900;">₹${row[11]}</td>
                                    <td style="padding:12px;"><button onclick="alert('Work in progress: Edit logic connecting...')" style="background:#64748b; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">VIEW/EDIT</button></td>
                                </tr>
                            `).reverse().join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (e) { panel.innerHTML = `<h2 style="color:red; text-align:center;">ERROR: Could not load data!</h2>`; }
}

// --- 3. CORE FUNCTIONS ---
function filterRecords() {
    let input = document.getElementById('searchBar').value.toUpperCase();
    let rows = document.querySelectorAll('.record-row');
    rows.forEach(row => {
        row.style.display = row.innerText.toUpperCase().includes(input) ? "" : "none";
    });
}

async function checkOldBalance(mobile) {
    if(!mobile || mobile.length < 10) return;
    const response = await fetch(`${scriptURL}?mobile=${mobile}&action=getDetails`);
    const res = await response.json();
    if(res.name) document.getElementById('c_name').value = res.name;
    if(res.address) document.getElementById('c_addr').value = res.address;
    fetchedOldBalance = parseFloat(res.oldBalance) || 0;
    document.getElementById('old_due_alert').style.display = fetchedOldBalance > 0 ? 'flex' : 'none';
    document.getElementById('due_amt_val').innerText = fetchedOldBalance.toFixed(2);
    calculateTotal();
}

function addNewRow() {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.style = "display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 40px; gap: 10px; padding: 8px; border-bottom: 1px solid #eee;";
    row.innerHTML = `
        <input type="text" class="item-desc" placeholder="WORK DESCRIPTION" style="border:none; font-weight:700;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="border:none; text-align:center;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="border:none; text-align:center;">
        <div class="item-total" style="font-weight:900; text-align:right;">₹0.00</div>
        <button onclick="this.parentElement.remove(); calculateTotal();" style="color:red; background:none; border:none; cursor:pointer;">❌</button>
    `;
    document.getElementById('rows_container').appendChild(row);
}

function calculateTotal() {
    let subtotal = 0;
    document.querySelectorAll('.item-row').forEach(row => {
        const total = (parseFloat(row.querySelector('.item-rate').value) || 0) * (parseFloat(row.querySelector('.item-qty').value) || 0);
        row.querySelector('.item-total').innerText = "₹" + total.toFixed(2);
        subtotal += total;
    });
    const oldPending = document.getElementById('add_old_dues')?.checked ? fetchedOldBalance : 0;
    const grand = Math.round(subtotal + oldPending);
    const paid = parseFloat(document.getElementById('paid_amt').value) || 0;
    document.getElementById('tax_amt').innerText = "₹" + subtotal.toFixed(2);
    document.getElementById('display_old_due').innerText = "₹" + oldPending.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + grand.toFixed(2);
    document.getElementById('balance_due').innerText = "₹" + (grand - paid).toFixed(2);
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
        balance: document.getElementById('balance_due').innerText.replace('₹',''),
        pending: document.getElementById('balance_due').innerText.replace('₹','')
    };
    if(!data.name || !data.mobile) { alert("Customer Name and Mobile are required!"); return; }
    try {
        await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
        alert("✅ Bill Saved!");
        window.open(`https://wa.me/91${data.mobile}?text=*S.R. ENTERPRISES REPORT*%0AInvoice: ${data.invoice}%0A*PENDING BALANCE: ₹${data.balance}*`, '_blank');
        showRecords(); // Bill save hone ke baad Dashboard par le jaye
    } catch(e) { alert("❌ Save Failed!"); }
        }
            
