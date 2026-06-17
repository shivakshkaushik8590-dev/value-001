// ==========================================================================
// VALURE PARTNER PORTAL & CRM DASHBOARD LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. SECURE PASSCODE CONTROL
    const lockScreen = document.getElementById('admin-lockscreen');
    const lockForm = document.getElementById('lockscreen-form');
    const lockPasscode = document.getElementById('lock-passcode');
    const lockError = document.getElementById('lock-error-msg');
    const adminDashboard = document.getElementById('admin-dashboard-container');
    const btnLogout = document.getElementById('btn-admin-logout');

    // Default Passcode: 1234
    const SECURE_PASSCODE = '1234';

    const checkSession = () => {
        const isLogged = sessionStorage.getItem('valure_admin_logged') === 'true' || sessionStorage.getItem('valure_user') === 'admin';
        if (isLogged) {
            unlockPortal();
        } else {
            lockPortal();
        }
    };

    const unlockPortal = () => {
        if (lockScreen) lockScreen.style.display = 'none';
        if (adminDashboard) adminDashboard.style.display = 'flex';
        sessionStorage.setItem('valure_admin_logged', 'true');
        sessionStorage.setItem('valure_user', 'admin');
        document.getElementById('admin-session-id').textContent = 'VAL-' + Math.floor(Math.random() * 900000 + 100000);
        initializeCRM();
    };

    const lockPortal = () => {
        if (lockScreen) lockScreen.style.display = 'flex';
        if (adminDashboard) adminDashboard.style.display = 'none';
        sessionStorage.removeItem('valure_admin_logged');
        sessionStorage.removeItem('valure_user');
    };

    if (lockForm) {
        lockForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (lockPasscode.value === SECURE_PASSCODE) {
                lockError.style.display = 'none';
                unlockPortal();
            } else {
                lockError.style.display = 'block';
                lockPasscode.value = '';
                lockPasscode.focus();
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            lockPortal();
        });
    }


    // 2. TAB TRANSITIONS CONTROLLER
    const navButtons = document.querySelectorAll('.admin-nav-btn');
    const tabContents = document.querySelectorAll('.admin-tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(`tab-${targetTab}`);
            if (targetEl) targetEl.classList.add('active');
        });
    });


    // 3. SYSTEM CLOCK
    const updateTime = () => {
        const timeEl = document.getElementById('system-time');
        if (timeEl) {
            const now = new Date();
            timeEl.textContent = now.toLocaleDateString('en-IN') + ' | ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        }
    };
    setInterval(updateTime, 1000);
    updateTime();


    // 4. CRM CORE INITIALIZATION
    let leadsData = [];
    let materialsData = [];
    let ratesData = {};

    // Chart instances
    let materialsChartInstance = null;
    let leadsChartInstance = null;

    const loadLeadsFromServer = async () => {
        try {
            const response = await fetch('/api/leads');
            if (response.ok) {
                leadsData = await response.json();
                localStorage.setItem('valure_inquiries', JSON.stringify(leadsData));
            } else {
                console.warn('Backend API leads fetch failed, loading local cache');
                leadsData = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
            }
        } catch (err) {
            console.error('Error fetching leads from server:', err);
            leadsData = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
        }
    };

    window.initializeCRM = async () => {
        loadLocalStorageData();
        await loadLeadsFromServer();
        renderKPIs();
        renderCharts();
        renderLeadsTable();
        renderMaterialsTable();
        initRatesManager();
        initFollowupsWorkspace();
    };

    const loadLocalStorageData = () => {
        const APP_VERSION = '2.0.0';
        const localVersion = localStorage.getItem('valure_custom_marbles_version');
        
        // Load Materials
        if (localVersion !== APP_VERSION) {
            if (typeof marbleProducts !== 'undefined') {
                materialsData = [...marbleProducts];
                localStorage.setItem('valure_custom_marbles', JSON.stringify(materialsData));
                localStorage.setItem('valure_custom_marbles_version', APP_VERSION);
            } else {
                materialsData = JSON.parse(localStorage.getItem('valure_custom_marbles')) || [];
            }
        } else {
            materialsData = JSON.parse(localStorage.getItem('valure_custom_marbles')) || [];
            if (materialsData.length === 0 && typeof marbleProducts !== 'undefined') {
                materialsData = [...marbleProducts];
                localStorage.setItem('valure_custom_marbles', JSON.stringify(materialsData));
            }
        }

        // Load Rates Surcharges
        ratesData = JSON.parse(localStorage.getItem('valure_rates_override')) || {
            palace: 0.35,
            gst: 18,
            fee: 15
        };
    };

    window.resetDemoData = async () => {
        if (confirm('Are you sure you want to request data reload? This will refresh your dashboard view.')) {
            await initializeCRM();
            alert('Sourcing leads successfully synchronized!');
        }
    };


    // 5. RENDER KPIs
    const renderKPIs = () => {
        const totalLeads = leadsData.length;
        document.getElementById('kpi-total-leads').textContent = totalLeads;

        // Pipeline calculation: average project size ~ 600 sq.ft. @ ₹400 = ₹2,40,000 avg per lead
        let pipelineTotal = 0;
        leadsData.forEach(l => {
            if (l.status !== 'Closed') {
                pipelineTotal += 240000;
            }
        });
        document.getElementById('kpi-pipeline-value').textContent = '₹' + pipelineTotal.toLocaleString('en-IN');

        // Sample Requests
        const sampleCount = leadsData.filter(l => l.product && l.product.toLowerCase().includes('sample')).length;
        document.getElementById('kpi-sample-requests').textContent = sampleCount;
    };


    // 6. RENDER CHARTS (CHART.JS)
    const renderCharts = () => {
        // Material demand counts
        const categoriesMap = {};
        leadsData.forEach(l => {
            let cat = 'Other';
            if (l.product) {
                if (l.product.toLowerCase().includes('statuario') || l.product.toLowerCase().includes('calacatta') || l.product.toLowerCase().includes('carrara')) cat = 'Italian Marble';
                else if (l.product.toLowerCase().includes('makrana') || l.product.toLowerCase().includes('white')) cat = 'Indian Marble';
                else if (l.product.toLowerCase().includes('3d') || l.product.toLowerCase().includes('designer')) cat = 'Visualizer Designs';
                else if (l.product.toLowerCase().includes('sample')) cat = 'Samples Requested';
            }
            categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
        };

        const materialLabels = Object.keys(categoriesMap);
        const materialCounts = Object.values(categoriesMap);

        // Status counts
        const statusMap = { 'New': 0, 'Contacted': 0, 'Quoted': 0, 'Closed': 0 };
        leadsData.forEach(l => {
            statusMap[l.status] = (statusMap[l.status] || 0) + 1;
        });

        const statusLabels = Object.keys(statusMap);
        const statusCounts = Object.values(statusMap);

        // Render materials chart
        if (materialsChartInstance) materialsChartInstance.destroy();
        const ctxMat = document.getElementById('materialsChart').getContext('2d');
        materialsChartInstance = new Chart(ctxMat, {
            type: 'doughnut',
            data: {
                labels: materialLabels,
                datasets: [{
                    data: materialCounts,
                    backgroundColor: ['#D4AF37', '#0E1629', '#3b82f6', '#10b981', '#6b7280'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter' } } }
                }
            }
        });

        // Render status chart
        if (leadsChartInstance) leadsChartInstance.destroy();
        const ctxLeads = document.getElementById('leadsCategoryChart').getContext('2d');
        leadsChartInstance = new Chart(ctxLeads, {
            type: 'bar',
            data: {
                labels: statusLabels,
                datasets: [{
                    label: 'Leads Count',
                    data: statusCounts,
                    backgroundColor: 'rgba(212, 175, 55, 0.8)',
                    borderColor: '#D4AF37',
                    borderWidth: 1.5,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    };


    // 7. LEADS TABLE CONTROLLERS
    const leadsTableBody = document.getElementById('leads-table-body');
    const filterStatus = document.getElementById('lead-filter-status');
    const filterType = document.getElementById('lead-filter-type');
    const adminSearch = document.getElementById('global-admin-search');

    const renderLeadsTable = () => {
        if (!leadsTableBody) return;
        leadsTableBody.innerHTML = '';

        const statusVal = filterStatus.value;
        const typeVal = filterType.value;
        const searchVal = adminSearch.value.toLowerCase();

        let filtered = leadsData.filter(l => {
            // Status check
            if (statusVal !== 'all' && l.status !== statusVal) return false;
            
            // Type check
            if (typeVal !== 'all') {
                const prod = l.product ? l.product.toLowerCase() : '';
                if (typeVal === '3d_visualizer' && !prod.includes('3d') && !prod.includes('designer')) return false;
                if (typeVal === 'sample_request' && !prod.includes('sample')) return false;
                if (typeVal === 'contact_form' && (prod.includes('3d') || prod.includes('designer') || prod.includes('sample'))) return false;
            }

            // Search filter
            if (searchVal) {
                const matchName = l.name.toLowerCase().includes(searchVal);
                const matchPhone = l.phone.includes(searchVal);
                const matchMsg = l.message ? l.message.toLowerCase().includes(searchVal) : false;
                const matchProd = l.product ? l.product.toLowerCase().includes(searchVal) : false;
                if (!matchName && !matchPhone && !matchMsg && !matchProd) return false;
            }

            return true;
        });

        if (filtered.length === 0) {
            leadsTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); font-style:italic;">No matching inquiries found in CRM.</td></tr>`;
            return;
        }

        filtered.forEach(lead => {
            const tr = document.createElement('tr');
            
            // Status pill color
            let statusClass = 'status-new';
            if (lead.status === 'Contacted') statusClass = 'status-contacted';
            if (lead.status === 'Quoted') statusClass = 'status-quoted';
            if (lead.status === 'Closed') statusClass = 'status-closed';

            tr.innerHTML = `
                <td><strong>${lead.name}</strong></td>
                <td>
                    <div><i class="fas fa-phone-alt" style="font-size:0.75rem; color:var(--accent-champagne-gold);"></i> ${lead.phone}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;"><i class="fas fa-envelope" style="font-size:0.7rem;"></i> ${lead.email}</div>
                    <div style="font-size:0.75rem; color:var(--accent-champagne-gold); margin-top:3px;"><i class="fas fa-map-marker-alt" style="font-size:0.7rem;"></i> ${lead.location || 'N/A'}</div>
                </td>
                <td><span style="font-weight:600; color:var(--bg-slate-navy);">${lead.product}</span></td>
                <td>
                    <div>${lead.date}</div>
                    ${lead.consultationDate && lead.consultationDate !== 'N/A' ? `<div style="font-size:0.7rem; color:var(--accent-champagne-gold); margin-top:3px;"><i class="fas fa-calendar-alt"></i> Pref: ${lead.consultationDate}</div>` : ''}
                </td>
                <td><p style="margin:0; font-size:0.8rem; line-height:1.4; max-width:260px;">${lead.message}</p></td>
                <td>
                    <select class="admin-select" onchange="updateLeadStatus('${lead.id}', this.value)">
                        <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
                        <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="Quoted" ${lead.status === 'Quoted' ? 'selected' : ''}>Quoted</option>
                        <option value="Closed" ${lead.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    </select>
                </td>
                <td>
                    <div class="btn-actions-row">
                        <button class="btn-table-action" onclick="openQuickMail('${lead.id}')" title="Followup Draft"><i class="fas fa-envelope"></i></button>
                        <button class="btn-table-action delete" onclick="deleteLead('${lead.id}')" title="Delete Inquiry"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            leadsTableBody.appendChild(tr);
        });
    };

    window.updateLeadStatus = async (leadId, newStatus) => {
        leadsData = leadsData.map(l => {
            if (l.id === leadId) {
                return { ...l, status: newStatus };
            }
            return l;
        });
        localStorage.setItem('valure_inquiries', JSON.stringify(leadsData));
        renderKPIs();
        renderCharts();
        renderLeadsTable();
        renderFollowupList();

        try {
            const response = await fetch('/api/leads', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: leadId, status: newStatus })
            });
            if (!response.ok) {
                throw new Error('Server status update failed');
            }
        } catch (err) {
            console.error('Failed to sync lead status update with server:', err);
        }
    };

    window.deleteLead = async (leadId) => {
        if (confirm('Are you sure you want to permanently delete this lead inquiry?')) {
            leadsData = leadsData.filter(l => l.id !== leadId);
            localStorage.setItem('valure_inquiries', JSON.stringify(leadsData));
            renderKPIs();
            renderCharts();
            renderLeadsTable();
            renderFollowupList();

            try {
                const response = await fetch('/api/leads', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: leadId })
                });
                if (!response.ok) {
                    throw new Error('Server lead deletion failed');
                }
            } catch (err) {
                console.error('Failed to delete lead from server:', err);
            }
        }
    };

    if (filterStatus) filterStatus.addEventListener('change', renderLeadsTable);
    if (filterType) filterType.addEventListener('change', renderLeadsTable);
    if (adminSearch) adminSearch.addEventListener('input', () => {
        renderLeadsTable();
        renderMaterialsTable();
    });


    // 8. MATERIALS CRUD CONTROLLERS
    const materialsTableBody = document.getElementById('materials-table-body');
    const materialModal = document.getElementById('material-modal');
    const materialCrudForm = document.getElementById('material-crud-form');

    const renderMaterialsTable = () => {
        if (!materialsTableBody) return;
        materialsTableBody.innerHTML = '';

        const searchVal = adminSearch.value.toLowerCase();
        let filtered = materialsData.filter(m => {
            if (searchVal) {
                const matchName = m.name.toLowerCase().includes(searchVal);
                const matchCat = m.category.toLowerCase().includes(searchVal);
                const matchOrigin = m.origin.toLowerCase().includes(searchVal);
                if (!matchName && !matchCat && !matchOrigin) return false;
            }
            return true;
        });

        filtered.forEach(mat => {
            const tr = document.createElement('tr');
            
            const availClass = mat.availability === 'in-stock' ? 'status-closed' : mat.availability === 'limited' ? 'status-contacted' : 'status-new';
            const availText = mat.availability === 'in-stock' ? 'In Stock' : mat.availability === 'limited' ? 'Limited' : 'Out of Stock';

            tr.innerHTML = `
                <td><strong>${mat.name}</strong></td>
                <td style="text-transform: capitalize;">${mat.category}</td>
                <td>${mat.color}</td>
                <td>${mat.finish}</td>
                <td>${mat.origin}</td>
                <td><strong>₹${mat.price}</strong></td>
                <td><span class="status-pill ${availClass}">${availText}</span></td>
                <td>
                    <div class="btn-actions-row">
                        <button class="btn-table-action" onclick="openEditMaterial('${mat.id}')" title="Edit Product"><i class="fas fa-edit"></i></button>
                        <button class="btn-table-action delete" onclick="deleteMaterial('${mat.id}')" title="Delete Product"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            materialsTableBody.appendChild(tr);
        });
    };

    window.openAddMaterialModal = () => {
        document.getElementById('material-modal-title').textContent = 'Add New Premium Stone';
        document.getElementById('crud-material-id').value = '';
        document.getElementById('material-crud-form').reset();
        
        materialModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.openEditMaterial = (matId) => {
        const mat = materialsData.find(m => m.id === matId);
        if (!mat) return;

        document.getElementById('material-modal-title').textContent = 'Edit Material Details';
        document.getElementById('crud-material-id').value = mat.id;
        document.getElementById('crud-material-name').value = mat.name;
        document.getElementById('crud-material-category').value = mat.category;
        document.getElementById('crud-material-color').value = mat.color;
        document.getElementById('crud-material-finish').value = mat.finish;
        document.getElementById('crud-material-origin').value = mat.origin;
        document.getElementById('crud-material-price').value = mat.price;
        document.getElementById('crud-material-avail').value = mat.availability;

        materialModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeMaterialModal = () => {
        materialModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if (materialCrudForm) {
        materialCrudForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const idVal = document.getElementById('crud-material-id').value;
            const nameVal = document.getElementById('crud-material-name').value;
            const catVal = document.getElementById('crud-material-category').value;
            const colorVal = document.getElementById('crud-material-color').value;
            const finishVal = document.getElementById('crud-material-finish').value;
            const originVal = document.getElementById('crud-material-origin').value;
            const priceVal = parseInt(document.getElementById('crud-material-price').value);
            const availVal = document.getElementById('crud-material-avail').value;

            if (idVal) {
                // Edit mode
                materialsData = materialsData.map(m => {
                    if (m.id === idVal) {
                        return {
                            ...m,
                            name: nameVal,
                            category: catVal,
                            color: colorVal,
                            finish: finishVal,
                            origin: originVal,
                            price: priceVal,
                            availability: availVal
                        };
                    }
                    return m;
                });
            } else {
                // Add mode
                const newId = 'custom-' + Date.now();
                const newMat = {
                    id: newId,
                    name: nameVal,
                    category: catVal,
                    color: colorVal,
                    finish: finishVal,
                    origin: originVal,
                    price: priceVal,
                    availability: availVal,
                    thickness: '18mm',
                    size: '60×60 cm',
                    application: 'Flooring, Feature Walls',
                    isNew: true,
                    isPopular: false,
                    description: `${nameVal} is a premium luxury selection sourced from ${originVal}. Offers a sophisticated polished finish.`,
                    shortDesc: `Premium ${colorVal} finish sourced from ${originVal.split(',')[0]} quarries.`,
                    images: ["assets/images/italian_statuario.png"],
                    specs: {
                        "Water Absorption": "< 0.25%",
                        "Hardness (Mohs)": "3–4",
                        "Min. Order": "100 sq.ft."
                    },
                    tags: ["luxury", catVal]
                };
                materialsData.unshift(newMat);
            }

            localStorage.setItem('valure_custom_marbles', JSON.stringify(materialsData));
            closeMaterialModal();
            initializeCRM();
            alert('Stone catalog settings successfully saved and synced across site!');
        });
    }

    window.deleteMaterial = (matId) => {
        if (confirm('Are you sure you want to remove this marble from the live catalog database?')) {
            materialsData = materialsData.filter(m => m.id !== matId);
            localStorage.setItem('valure_custom_marbles', JSON.stringify(materialsData));
            initializeCRM();
        }
    };


    // 9. RATES MANAGER CONTROLLER
    const ratesForm = document.getElementById('global-rates-form');

    const initRatesManager = () => {
        if (!ratesForm) return;

        // Set slide labels
        document.getElementById('rate-palace').value = ratesData.palace;
        document.getElementById('rate-palace-val').textContent = ratesData.palace;

        document.getElementById('rate-gst').value = ratesData.gst;
        document.getElementById('rate-gst-val').textContent = ratesData.gst + '%';

        document.getElementById('rate-fee').value = ratesData.fee;
        document.getElementById('rate-fee-val').textContent = ratesData.fee + '%';

        // Listen inputs
        document.getElementById('rate-palace').addEventListener('input', (e) => {
            document.getElementById('rate-palace-val').textContent = e.target.value;
        });
        document.getElementById('rate-gst').addEventListener('input', (e) => {
            document.getElementById('rate-gst-val').textContent = e.target.value + '%';
        });
        document.getElementById('rate-fee').addEventListener('input', (e) => {
            document.getElementById('rate-fee-val').textContent = e.target.value + '%';
        });
    };

    if (ratesForm) {
        ratesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const palaceVal = parseFloat(document.getElementById('rate-palace').value);
            const gstVal = parseInt(document.getElementById('rate-gst').value);
            const feeVal = parseInt(document.getElementById('rate-fee').value);

            ratesData = {
                palace: palaceVal,
                gst: gstVal,
                fee: feeVal
            };

            localStorage.setItem('valure_rates_override', JSON.stringify(ratesData));
            alert('Global cost calculator rates updated! Surcharges are synchronized across the estimator ledger.');
        });
    }


    // 10. FOLLOWUPS WORKSPACE & AUTOMATION
    const followupListContainer = document.getElementById('followup-list-container');
    const followupForm = document.getElementById('followup-email-form');
    const followupTo = document.getElementById('followup-to');
    const followupName = document.getElementById('followup-name');
    const followupSubject = document.getElementById('followup-subject');
    const followupBody = document.getElementById('followup-body');
    const templateSelector = document.getElementById('email-template-selector');

    const emailTemplates = {
        intro: (name, product) => `Dear ${name},\n\nThank you for reaching out to Valure Studio. We noticed your interest in our premium marble collections (specifically ${product || 'our Italian series'}).\n\nI would be delighted to arrange a virtual stone concierge session to showcase our latest imports and slab sizes.\n\nBest Regards,\nShivaksh Kaushik\nLead Designer, Valure Studio\nPhone: +91 7454853045`,
        quote: (name, product) => `Dear ${name},\n\nThank you for utilizing the Valure Project Estimator.\n\nWe have prepared a preliminary sourcing estimate invoice draft for your ${product || 'interior project'}. Below is the breakdown:\n- Sourced Stone Materials: Premium Grade\n- Delivery: Insured PAN India Cargo\n\nWould you like to schedule a verification call to lock in this sourcing quote?\n\nBest Regards,\nShivaksh Kaushik\nValure Studio Sourcing\n+91 7454853045`,
        sample: (name, product) => `Dear ${name},\n\nWe are pleased to inform you that your request for a physical marble slab sample of ${product || 'Statuario'} has been approved.\n\nOur logistics team has scheduled delivery via express courier. A tracking ID will be sent to this address within 24 hours.\n\nBest Regards,\nLogistics Office\nValure Partner Sourcing\nshivakshkaushik8590@gmail.com`
    };

    let selectedFollowupLead = null;

    const renderFollowupList = () => {
        if (!followupListContainer) return;
        followupListContainer.innerHTML = '';

        // Select leads that are 'New' or 'Contacted'
        const activeLeads = leadsData.filter(l => l.status === 'New' || l.status === 'Contacted');

        if (activeLeads.length === 0) {
            followupListContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">No active leads awaiting follow-ups.</div>`;
            return;
        }

        activeLeads.forEach(lead => {
            const div = document.createElement('div');
            div.className = `followup-lead-item ${selectedFollowupLead && selectedFollowupLead.id === lead.id ? 'selected' : ''}`;
            div.innerHTML = `
                <h4>${lead.name}</h4>
                <p>Interest: <strong>${lead.product}</strong></p>
                <p style="font-size:0.65rem; color:var(--text-muted); margin-top:3px;">Logged: ${lead.date} | Status: ${lead.status}</p>
            `;
            div.addEventListener('click', () => {
                selectedFollowupLead = lead;
                renderFollowupList();
                loadFollowupEditor();
            });
            followupListContainer.appendChild(div);
        });
    };

    const loadFollowupEditor = () => {
        if (!selectedFollowupLead) return;

        followupTo.value = selectedFollowupLead.email === 'N/A' ? `${selectedFollowupLead.name.toLowerCase().replace(/\s+/g, '')}@gmail.com` : selectedFollowupLead.email;
        followupName.value = selectedFollowupLead.name;
        
        // Load initial template
        const type = templateSelector.value;
        followupSubject.value = `Valure Luxury Sourcing: Following up on ${selectedFollowupLead.product}`;
        followupBody.value = emailTemplates[type](selectedFollowupLead.name, selectedFollowupLead.product);
    };

    window.openQuickMail = (leadId) => {
        const lead = leadsData.find(l => l.id === leadId);
        if (!lead) return;

        // Switch to followups tab programmatically
        const followupBtn = document.querySelector('.admin-nav-btn[data-tab="followups"]');
        if (followupBtn) followupBtn.click();

        selectedFollowupLead = lead;
        renderFollowupList();
        loadFollowupEditor();
    };

    if (templateSelector) {
        templateSelector.addEventListener('change', () => {
            if (selectedFollowupLead) {
                const type = templateSelector.value;
                followupBody.value = emailTemplates[type](selectedFollowupLead.name, selectedFollowupLead.product);
            }
        });
    }

    if (followupForm) {
        followupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!selectedFollowupLead) {
                alert('Please select a lead item from the left pane first.');
                return;
            }

            alert(`Quick follow-up email simulated successfully!\n\nTo: ${followupTo.value}\nSubject: ${followupSubject.value}\n\nLead status updated to "Contacted".`);
            
            // Auto update status to "Contacted"
            updateLeadStatus(selectedFollowupLead.id, 'Contacted');
            
            // Reset editor
            selectedFollowupLead = null;
            followupForm.reset();
            renderFollowupList();
        });
    }

    const initFollowupsWorkspace = () => {
        renderFollowupList();
    };


    // 11. INITIAL RUN
    checkSession();
});

// CSV Export Utility
function exportLeadsCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Phone,Email,Product Interest,Date,Status,Message\n";
    
    const leads = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
    leads.forEach(l => {
        const row = [
            l.id,
            `"${l.name}"`,
            `"${l.phone}"`,
            `"${l.email}"`,
            `"${l.product}"`,
            `"${l.date}"`,
            `"${l.status}"`,
            `"${(l.message || '').replace(/"/g, '""')}"`
        ].join(",");
        csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Valure_CRM_Leads_${new Date().toLocaleDateString('en-IN')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
