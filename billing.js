// MODULE: S.R. Enterprises Billing Form
function showBilling() {
    const panel = document.getElementById('main-panel');
    const today = new Date().toISOString().split('T')[0];
    const autoInv = "SR-" + Math.floor(1000 + Math.random() * 9000);

    // Layout setup
    panel.style.display = "block";
    panel.style.background = "#1a2233";

    panel.innerHTML = `
        <div style="padding: 10px; color: white; font-family: sans-serif;">
            <div style="max-width: 98%; margin: auto; border: 2px solid #edb92e; border-radius: 15px; padding: 15px; background: #1a2233; box-sizing: border-box;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div>
                        <h2 style="color: #4cd137; margin: 0; font-size: 24px;">S.R Enterprises</h2>
                        <p style="font-size: 11px; margin: 0; color: #dcdde1;">FUSING MACHINE SPECIALIST</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #edb92e;">INV NO</label><br>
                            <input type="text" id="inv_no" value="${autoInv}" style="width: 80px; padding: 8px; border-radius: 5px; border: none; font-weight: bold; text-align: center;">
                        </div>
                        <div style="text-align: center;">
                            <label style="font-size: 10px; color: #edb92e;">DATE</label><br>
                            <input type="date" id="inv_date" value="${today}" style="width: 140px; padding: 8px; border-radius: 5px; border: none; font-weight: bold;">
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-bottom: 10px;">
                    <input type="text" id="c_name" placeholder="Customer Name" style="padding: 12px; border-radius: 8px; border: none;">
                    <input type="text" id="m_model" placeholder="Machine Model" style="padding: 12px; border-radius: 8px; border: none;">
                </div>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <input type="text" id="c_addr" placeholder="Address" style="padding: 12px; border-radius: 8px; border: none;">
                    <input type="text" id="m_remark" placeholder="Remark/Note" style="padding: 12px; border-radius: 8px; border: none;">
                </div>
                <div style="margin-bottom: 20px; display: flex; gap: 10px; max-width: 400px;">
                    <input type="number" id="c_mobile" placeholder="Mobile No" style="flex: 1; padding: 12px; border-radius: 8px; border: none;">
                    <button style="background: #edb92e; color: black; border: none; padding: 0 15px; border-radius: 8px; font
                    
