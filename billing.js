// MODULE: Professional Billing System (S.R. Enterprises)
let itemsList = [];

function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInvoice = "SR-" + Math.floor(1000 + Math.random() * 9000);

    panel.innerHTML = `
        <div style="padding: 10px; background: #1a2233; min-height: 100vh; color: white; font-family: sans-serif;">
            <div style="max-width: 900px; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 20px; background: #1a2233;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 26px;">S.R Enterprises</h2>
                        <p style="font-size: 11px; margin: 0; color: #dcdde1;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div>
                            <label style="font-size: 10px; color: #edb92e;">INVOICE NO:</label><br>
                            <input type="text" id="inv_no" value="${autoInvoice}" style="width: 100px; padding: 5px; border-radius: 5px; border: none; font-weight: bold; text-align: center;">
                        </div>
                        <div>
                            <label style="font-size: 10px; color: #edb92e;">DATE:</label><br>
                            <input type="date" id="inv_date" value="${today}" style="padding: 5px; border-radius: 5px; border: none; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <hr style="border: 1px solid #edb92e; margin-bottom: 20px;">

                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 2;">
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">CUSTOMER NAME:</label>
                        <input type="text" id="c_name" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                    <div style="flex: 1;">
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">MACHINE MODEL:</label>
                        <input type="text" id="m_model" placeholder="Model No." style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                </div>

                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 2;">
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">ADDRESS:</label>
                        <input type="text" id="c_addr" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                    <div style="flex: 1;">
                        <label style="color: #edb92e; font-size: 12px; font-weight: bold;">REMARK:</label>
                        <input type="text" id="m_remark" placeholder="Work Note" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none; box-sizing: border-box;">
                    </div>
                </div>

                <div style="margin-bottom: 20px; width: 50%;">
                    <label style="color: #edb92e; font-size: 12px; font-weight: bold;">MOBILE NO:</label>
                    <div style="display: flex; gap: 10px; margin-top: 5px;">
                        <input type="number" id="c_mobile" style="flex: 1; padding: 10px; border-radius: 8px; border: none;">
                        <button onclick="pickContact()" style="background: #edb92e; color: black; border: none; padding: 0 15px; border-radius: 8px; font-weight: bold; cursor: pointer;">PICK</button>
                    </div>
                </div>

                <div style="background: #252e42; padding: 15px; border-radius: 10px; border: 1px solid #3d4a6d;">
                    <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; text-align: center; color: #edb92e; font-size: 12px; font-weight: bold;">
                        <div>DESCRIPTION</div><div>RATE</div><div>QTY</div><div>TOTAL</div>
                    </div>
                    <div id="items_container">
                        </div>
                    <button onclick="addNewRow()" style="width: 100%; margin-top: 10px; background: none; border: 1px dashed #edb92e; color: #edb92e; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">+ ADD ITEM / WORK</button>
                </div>

                <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                    <div style="flex: 1; background: #252e42; padding: 15px; border-radius: 10px;">
                         <label style="color: #edb92e; font-size: 12px; font-weight: bold;">DISCOUNT (₹):</label>
                         <input type="number" id="w_disc" value="0" oninput="calculateTotal()" style="width: 100%; padding: 10px; margin-top: 5px; border-radius: 8px; border: none;">
                         <div style="margin-top: 15px;">
                            <input type="checkbox" id="apply_gst" onchange="calculateTotal()" style="transform: scale(1.3);"> 
                            <label style="font-size: 13px; margin-left: 5px;">Apply GST (18%)</label>
                         </div>
                    </div>
                    
                    <div style="flex: 1; border: 1px solid #edb92e; padding: 15px; border-radius: 10px; text-align: right;">
                        <div style="font-size: 14px; margin-bottom: 5px;">Taxable: <span id="tax_amt">₹0.00</span></div>
                        <div style="font-size: 14px; margin-bottom: 10px;">GST (18%): <span id="gst_amt">₹0.00</span></div>
                        <div style="font-size: 22px; color: #edb92e; font-weight: bold;">GRAND TOTAL</div>
                        <div id="grand_total" style="font-size: 28px; color: #4cd137; font-weight: bold;">₹0.00</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px;">
                    <button onclick="generateFinalBill()" style="background: #edb92e; color: black; padding: 18px; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">🖨️ PRINT / VIEW BILL</button>
                    <button onclick="alert('Saving to Sheets...')" style="background: #4cd137; color: white; padding: 18px; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">📲 SAVE & WHATSAPP</button>
                </div>
                <button onclick="showDashboard()" style="width: 100%; margin-top: 15px; background: #7f8c8d; color: white; padding: 10px; border: none; border-radius: 8px; cursor: pointer;">← BACK</button>
            </div>
        </div>
    `;
    addNewRow(); // Start with one empty row
}

function addNewRow() {
    const container = document.getElementById('items_container');
    const rowId = Date.now();
    const row = document.createElement('div');
    row.id = `row_${rowId}`;
    row.style = "display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;";
    row.innerHTML = `
        <input type="text" class="item-desc" placeholder="Work/Part name" style="padding: 10px; border-radius: 5px; border: none;">
        <input type="number" class="item-rate" value="0" oninput="calculateTotal()" style="padding: 10px; border-radius: 5px; border: none; text-align: center;">
        <input type="number" class="item-qty" value="1" oninput="calculateTotal()" style="padding: 10px; border-radius: 5px; border: none; text-align: center;">
        <div class="item-total" style="color: #edb92e; font-weight: bold; align-self: center; text-align: right;">₹0.00</div>
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
    const taxable = subtotal - disc;
    const gst = document.getElementById('apply_gst').checked ? (taxable * 0.18) : 0;
    const grand = taxable + gst;

    document.getElementById('tax_amt').innerText = "₹" + taxable.toFixed(2);
    document.getElementById('gst_amt').innerText = "₹" + gst.toFixed(2);
    document.getElementById('grand_total').innerText = "₹" + grand.toFixed(2);
}

async function pickContact() {
    try {
        const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: false });
        if (contacts.length > 0) {
            document.getElementById('c_name').value = contacts[0].name[0];
            document.getElementById('c_mobile').value = contacts[0].tel[0].replace(/\D/g, '');
        }
    } catch (err) {
        alert("Mobile contact picker aapke browser/device mein allow nahi hai. Manually number daalein.");
    }
}

function generateFinalBill() {
    // Ye function hum agle step mein likhenge ki Print kaisa dikhega
    alert("Printing system ready ho raha hai...");
}
