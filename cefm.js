/* ==========================================================================
   CEFM CLASSIFIER LOGIC
   Canadian FHS Educational Tools
   ========================================================================== */

/* ==========================================================================
   1. STATE
   ========================================================================== */

let state = {
    tempVarType: null,
    audit: {
        fhrMon: null,
        uaMon: null,
        ua: '',
        maternal: 'None',
        base: '',
        baseDetail: { cat: 'NORMAL', detail: 'Baseline 110-160' },
        trend: { cat: 'NORMAL', detail: 'Stable Trend' },
        variability: { cat: 'NORMAL', detail: 'Moderate Variability' },
        accels: { cat: 'NORMAL', detail: 'Accelerations Present' },
        decels: {}
    },
    decelQueue: []
};

/* ==========================================================================
   2. DOM HELPERS
   ========================================================================== */

const $ = id => document.getElementById(id);
const $$ = selector => document.querySelectorAll(selector);

function setButtonState(btn, enabled) {
    if (!btn) return;
    btn.disabled = !enabled;
}

/* ==========================================================================
   3. PAGE-SPECIFIC LOGIC HOOK
   ========================================================================== */

function handlePageLogic(id) {
    if (id === 'page2') chkM();
    if (id === 'page5') validateMat();

    if (id === 'page11') {
        validateDecel();
        handleUVCaution();
    }

    if (id === 'page7') {
        const savedBase = state.audit.base;
        const baseInput = $('baseIn');

        if (baseInput && savedBase && !Number.isNaN(parseInt(savedBase, 10))) {
            baseInput.value = parseInt(savedBase, 10);
        }

        validateBaseInput();
    }
}

/* ==========================================================================
   4. VALIDATION HELPERS
   ========================================================================== */

function validateCheckboxGroup(noneId, groupClass, btnId) {
    const noneEl = $(noneId);
    const btn = $(btnId);

    if (!noneEl || !btn) return;

    const noneChecked = noneEl.checked;
    const groupChecked = document.querySelectorAll(`.${groupClass}:checked`).length > 0;

    btn.classList.remove('hidden');
    setButtonState(btn, noneChecked || groupChecked);
}

function chkM() {
    const btn = $('page2-next');
    setButtonState(btn, Boolean(state.audit.fhrMon && state.audit.uaMon));
}

function validateMat() {
    validateCheckboxGroup('mat-none', 'mat-factor', 'mat-next');
}

function validateDecel() {
    validateCheckboxGroup('d-none', 'decel-factor', 'decel-next');
}

function validateBaseInput() {
    const input = $('baseIn');
    const btn = $('baseContinueBtn');

    if (!input || !btn) return;

    const value = input.value.trim();
    const bpm = Number(value);

    setButtonState(btn, value !== '' && Number.isFinite(bpm) && bpm > 0);
}

/* ==========================================================================
   5. MONITOR SELECTION
   ========================================================================== */

function selF(l, c) {
    state.audit.fhrMon = l;
    setSelected(['f-us', 'f-fse'], `f-${c}`);
    chkM();
}

function selU(l, c) {
    state.audit.uaMon = l;
    setSelected(['u-toco', 'u-iupc'], `u-${c}`);
    chkM();
}

/* ==========================================================================
   6. UTERINE ACTIVITY / MATERNAL FACTORS
   ========================================================================== */

function handleInt() {
    const uaMon = state.audit.uaMon || '';
    uaMon.includes('Internal') ? goTo('page4b') : goTo('page4');
}

function setUA(v) {
    const mvuInput = $('mvu');
    const rawValue = mvuInput ? mvuInput.value.trim() : '';
    const mvu = Number(rawValue);

    state.audit.ua =
        rawValue !== '' && Number.isFinite(mvu) && mvu >= 0
            ? `${v} (${mvu} MVUs)`
            : v;

    goTo('page5');
}

function setMat() {
    const noneBox = $('mat-none');
    const checked = Array.from($$('.mat-factor:checked')).map(i => i.value);

    state.audit.maternal =
        (noneBox?.checked || checked.length === 0)
            ? 'None'
            : checked.join(', ');

    goTo('page6');
}

/* ==========================================================================
   7. BASELINE EVALUATION
   ========================================================================== */

function evalBase() {
    const input = $('baseIn');
    if (!input) return;

    const b = Number(input.value);
    if (!Number.isFinite(b) || b <= 0) return;

    state.audit.base = `${b} bpm`;

    if (b < 100) {
        state.audit.baseDetail = { cat: 'ABNORMAL', detail: 'Baseline Bradycardia < 100' };
        goTo('page8');
    } else if (b < 110) {
        state.audit.baseDetail = { cat: 'ATYPICAL', detail: 'Baseline 100-110' };
        goTo('page8');
    } else if (b > 160) {
        goTo('page7b');
    } else {
        state.audit.baseDetail = { cat: 'NORMAL', detail: 'Baseline 110-160' };
        goTo('page8');
    }
}

function setTachy(cat, detail, bypass = false) {
    state.audit.baseDetail = { cat, detail };

    if (!bypass) {
        goTo('page8');
        return;
    }

    if (detail.includes('Erratic')) state.audit.base = 'Erratic';
    else if (detail.includes('Sinusoidal')) state.audit.base = 'Indeterminate (Sinusoidal)';
    else if (detail.includes('Marked')) state.audit.base = 'Indeterminate (Marked)';

    state.audit.trend = { cat: 'NORMAL', detail: 'Unable to Determine' };
    state.audit.accels = { cat: 'NORMAL', detail: 'Unable to Determine' };
    state.audit.decels = { bypass: { cat: 'NORMAL', detail: 'Unable to Determine' } };

    if (detail.includes('Sinusoidal')) {
        state.audit.variability = { cat: 'ABNORMAL', detail: 'Sinusoidal Pattern', isBypass: true };
    } else if (detail.includes('Marked')) {
        state.audit.variability = { cat: 'ABNORMAL', detail: 'Marked Variability', isBypass: true };
    } else {
        state.audit.variability = { cat: 'NORMAL', detail: 'Unable to Determine' };
    }

    finalize();
}

/* ==========================================================================
   8. TREND / VARIABILITY / ACCELERATIONS
   ========================================================================== */

function setTrend(cat, detail) {
    state.audit.trend = { cat, detail };
    goTo('page9');
}

function goToVarDuration(type) {
    state.tempVarType = type;
    goTo('page9a');
}

function setVar(cat, detail, next) {
    let finalDetail = detail;

    if (state.tempVarType && detail.includes('Minimal/Absent')) {
        finalDetail = detail.replace('Minimal/Absent', state.tempVarType);
    }

    state.audit.variability = { cat, detail: finalDetail };

    if (next !== 'FINAL') {
        goTo(next);
        return;
    }

    if (finalDetail === 'Sinusoidal Pattern') {
        state.audit.base = 'Indeterminate (Sinusoidal)';
        state.audit.variability.isBypass = true;
    } else if (finalDetail.includes('Marked')) {
        state.audit.base = 'Indeterminate (Marked)';
        state.audit.variability.isBypass = true;
    }

    state.audit.accels = { cat: 'NORMAL', detail: 'Unable to Determine' };
    state.audit.decels = { bypass: { cat: 'NORMAL', detail: 'Unable to Determine' } };
    state.audit.trend = { cat: 'NORMAL', detail: 'Unable to Determine' };

    finalize();
}

function setAcc(cat, detail) {
    state.audit.accels = { cat, detail };
    goTo('page11');
}

/* ==========================================================================
   9. DECELERATION FLOW
   ========================================================================== */

function startDecelFlow() {
    state.audit.decels = {};
    state.decelQueue = [];

    const noneEl = $('d-none');

    if (noneEl && noneEl.checked) {
        state.audit.decels.none = { cat: 'NORMAL', detail: 'No Decelerations' };
    } else {
        $$('#page11 input:checked').forEach(i => {
            if (i.id === 'd-uv') state.decelQueue.push('page11a');
            if (i.id === 'd-cv') state.decelQueue.push('page11b');
            if (i.id === 'd-late') state.decelQueue.push('page11c');
            if (i.id === 'd-pro') state.decelQueue.push('page11d');

            if (i.id === 'd-early') {
                state.audit.decels.early = { cat: 'NORMAL', detail: 'Early Decelerations' };
            }
        });
    }

    nextDecel();
}

function nextDecel() {
    state.decelQueue.length > 0
        ? goTo(state.decelQueue.shift())
        : finalize();
}

function logDecel(key, cat, detail) {
    state.audit.decels[key] = { cat, detail };
    nextDecel();
}

/* ==========================================================================
   10. UNCOMPLICATED VARIABLE CAUTION
   ========================================================================== */

function handleUVCaution() {
    const uvCaution = $('uv-caution');
    if (!uvCaution) return;

    const bpm = parseInt(state.audit.base, 10);
    const variabilityDetail = state.audit.variability?.detail || '';

    const baselineAbnormal = Number.isFinite(bpm) && (bpm > 160 || bpm < 110);
    const varAbnormal =
        variabilityDetail.includes('Minimal') ||
        variabilityDetail.includes('Absent');

    uvCaution.classList.toggle('hidden', !(baselineAbnormal || varAbnormal));
}

/* ==========================================================================
   11. FINAL RESULT RENDERING
   ========================================================================== */

function renderSecureList(container, features, color, title) {
    if (!features.length) return;

    const div = document.createElement('div');
    div.style.marginBottom = '20px';

    const strong = document.createElement('strong');
    strong.style.color = color;
    strong.style.fontSize = '1.2rem';
    strong.textContent = title;

    const ul = document.createElement('ul');
    ul.style.marginTop = '5px';

    features.forEach(f => {
        if (f.detail !== 'N/A' && !f.isBypass) {
            const li = document.createElement('li');
            li.textContent = f.detail;
            ul.appendChild(li);
        }
    });

    div.appendChild(strong);
    div.appendChild(ul);
    container.appendChild(div);
}

function finalize() {
    const allFindings = [
        state.audit.baseDetail,
        state.audit.trend,
        state.audit.variability,
        state.audit.accels,
        ...Object.values(state.audit.decels)
    ];

    const abnormal = allFindings.filter(f => f.cat === 'ABNORMAL');
    const atypical = allFindings.filter(f => f.cat === 'ATYPICAL');

    let finalRank = 'NORMAL';
    let rankColor = '#27ae60';

    if (abnormal.length > 0) {
        finalRank = 'ABNORMAL';
        rankColor = '#e74c3c';
    } else if (atypical.length > 0) {
        finalRank = 'ATYPICAL';
        rankColor = '#f39c12';
    }

    const rEl = $('finalRank');
    rEl.textContent = finalRank;
    rEl.style.color = rankColor;

    const resBox = $('resBox');
    resBox.innerHTML = '';

    if (state.audit.ua.includes('Tachysystole')) {
        const tachBox = document.createElement('div');
        tachBox.className = 'caution-box';

        const tachStrong = document.createElement('strong');
        tachStrong.textContent = '⚠️ Note: ';

        const tachP = document.createElement('p');
        tachP.textContent = 'Tachysystole is present. While tachysystole alone does not change the classification of the CEFM strip, steps should be taken to resolve tachysystole to optimize fetal oxygenation, regardless of the fetal heart rate classification.';

        tachBox.appendChild(tachStrong);
        tachBox.appendChild(tachP);
        resBox.appendChild(tachBox);
    }

    if (finalRank === 'ABNORMAL') {
        renderSecureList(resBox, abnormal, '#e74c3c', "Why it's Abnormal:");
        renderSecureList(resBox, atypical, '#f39c12', "Atypical Features:");
    } else if (finalRank === 'ATYPICAL') {
        renderSecureList(resBox, atypical, '#f39c12', "Why it's Atypical:");
    } else {
        const p = document.createElement('p');
        p.style.color = '#27ae60';
        p.style.fontWeight = 'bold';
        p.style.fontSize = '1.1rem';
        p.textContent = 'All assessed FHS parameters meet Normal criteria.';
        resBox.appendChild(p);
    }

    const decelSummary = Object.values(state.audit.decels)
        .map(f => f.detail)
        .join(', ') || 'No Decelerations';

    const auditBox = $('audit');
    auditBox.innerHTML = '';

    const auditGrid = document.createElement('div');
    auditGrid.style.display = 'grid';
    auditGrid.style.gridTemplateColumns = '1fr 1fr';
    auditGrid.style.gap = '10px';
    auditGrid.style.padding = '10px';

    const auditData = [
        { label: 'Monitors in Use:', value: `${state.audit.fhrMon} / ${state.audit.uaMon}` },
        { label: 'Maternal Factors:', value: state.audit.maternal },
        { label: 'Uterine Activity:', value: state.audit.ua },
        { label: 'FHR Baseline:', value: state.audit.base },
        { label: 'Trend:', value: state.audit.trend.detail },
        { label: 'Variability:', value: state.audit.variability.detail },
        { label: 'Accelerations:', value: state.audit.accels.detail },
        { label: 'Decelerations:', value: decelSummary }
    ];

    auditData.forEach(item => {
        const labelDiv = document.createElement('div');
        const strongLabel = document.createElement('strong');
        strongLabel.textContent = item.label;
        labelDiv.appendChild(strongLabel);

        const valueDiv = document.createElement('div');
        valueDiv.textContent = item.value;

        auditGrid.appendChild(labelDiv);
        auditGrid.appendChild(valueDiv);
    });

    auditBox.appendChild(auditGrid);

    goTo('page12');
}

/* ==========================================================================
   12. SMART CHECKBOX TOGGLES
   ========================================================================== */

function setupSmartToggles() {
    const matNone = $('mat-none');
    const matFactors = $$('.mat-factor');

    if (matNone) {
        matNone.addEventListener('change', function () {
            if (this.checked) {
                matFactors.forEach(f => {
                    f.checked = false;
                });
            }

            validateMat();
        });
    }

    matFactors.forEach(f => {
        f.addEventListener('change', function () {
            if (this.checked && matNone) {
                matNone.checked = false;
            }

            validateMat();
        });
    });

    const decelNone = $('d-none');
    const decelFactors = $$('.decel-factor');

    if (decelNone) {
        decelNone.addEventListener('change', function () {
            if (this.checked) {
                decelFactors.forEach(d => {
                    d.checked = false;
                });
            }

            validateDecel();
        });
    }

    decelFactors.forEach(d => {
        d.addEventListener('change', function () {
            if (this.checked && decelNone) {
                decelNone.checked = false;
            }

            validateDecel();
        });
    });
}

document.addEventListener('DOMContentLoaded', setupSmartToggles);
