const API_BASE = "http://localhost:5000/api/v1";
const TOKEN = "mock-token-001";

const ZONE_LOOKUP = {
    "Outer Ring Road":  { lat: 12.9352, lng: 77.6245, zone_id: "tdr3ej" },
    "Koramangala":      { lat: 12.9279, lng: 77.6271, zone_id: "tdr3f1" },
    "Whitefield":       { lat: 12.9698, lng: 77.7500, zone_id: "tdr3g2" },
    "HSR Layout":       { lat: 12.9116, lng: 77.6389, zone_id: "tdr3h3" },
    "Electronic City":  { lat: 12.8399, lng: 77.6770, zone_id: "tdr3i4" },
    "Marathahalli":     { lat: 12.9591, lng: 77.6974, zone_id: "tdr3j5" }
};

let currentRider = {
    rider_id: "",
    order_id: "",
    zone: null
};

// 1. Navigation Controller
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'screen-dashboard') refreshDashboard();
    if (screenId === 'screen-status') fetchZoneStatus();
}

// 2. Initial Zone Loading
const selectorArea = document.getElementById('zone-selector');
Object.keys(ZONE_LOOKUP).forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'btn-zone';
    btn.innerText = name;
    btn.onclick = () => {
        document.querySelectorAll('.btn-zone').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        currentRider.zone = { ...ZONE_LOOKUP[name], zone_name: name };
        document.getElementById('btn-start-shift').disabled = false;
    };
    selectorArea.appendChild(btn);
});

document.getElementById('btn-start-shift').onclick = () => {
    currentRider.rider_id = document.getElementById('login-rider-id').value;
    currentRider.order_id = document.getElementById('login-order-id').value;
    navigateTo('screen-dashboard');
};

// 3. API Handlers [cite: 15-28]
async function request(path, method = "GET", body = null) {
    const headers = { "Content-Type": "application/json", "X-Rider-Token": TOKEN };
    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_BASE}${path}`, config);
        return await response.json();
    } catch (e) {
        console.warn("Using demo/mock logic due to connectivity.");
        return { success: true, data: {} }; // Demo fallback
    }
}

// Feature 1: Check Broadcasts [cite: 70-88]
async function refreshDashboard() {
    document.getElementById('rider-display').innerText = currentRider.rider_id;
    document.getElementById('dash-zone-name').innerText = currentRider.zone.zone_name;
    document.getElementById('dash-order-id').innerText = currentRider.order_id;

    const bRes = await request(`/weather/broadcasts?rider_id=${currentRider.rider_id}`);
    const area = document.getElementById('broadcast-area');
    area.innerHTML = (bRes.data?.active_broadcasts || []).map(b => 
        `<div class="broadcast-banner">🛡️ ${b.message}</div>`).join("");

    // Feature 3: Peer Corroboration [cite: 125-138]
    const cRes = await request(`/corroboration/zone/${currentRider.zone.zone_id}`);
    if (cRes.success) {
        document.getElementById('corro-count').innerText = `${cRes.data.report_count || 0} / 2 Riders`;
        document.getElementById('corro-status').innerText = cRes.data.verified ? "VERIFIED" : "PENDING";
    }
}

// Feature 4: Emergency [cite: 161-188]
async function triggerEmergency() {
    const payload = {
        rider_id: currentRider.rider_id,
        order_id: currentRider.order_id,
        emergency_type: document.getElementById('emg-type').value,
        lat: currentRider.zone.lat,
        lng: currentRider.zone.lng,
        note: document.getElementById('emg-note').value
    };

    const res = await request("/emergency/declare", "POST", payload);
    if (res.success) {
        document.getElementById('emergency-form').style.display = 'none';
        document.getElementById('transfer-status-area').innerHTML = `
            <div class="card">
                <h3>Emergency Recorded [cite: 172]</h3>
                <p>Transfer Status: <strong>SEARCHING</strong></p>
                <p>Your record is protected. No penalties will be applied[cite: 160].</p>
            </div>
        `;
    }
}