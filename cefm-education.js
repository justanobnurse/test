/* ==========================================================================
   CEFM EDUCATION CONTENT
   Canadian FHS Educational Tools
   ========================================================================== */

(() => {
    'use strict';

    const educationContent = {
        monitorTypes: `
            <p><strong>Fetal heart monitor</strong> refers to the device used to detect and display the fetal heart rate during continuous electronic fetal monitoring.</p>

            <p><strong>External ultrasound</strong> monitoring uses an ultrasound transducer placed on the maternal abdomen to detect fetal heart motion. It may be used with wired or wireless systems, depending on the equipment available. External ultrasound is non-invasive and commonly used, but the tracing can be affected by fetal position, maternal movement, signal loss, maternal body habitus, or inadvertent monitoring of the maternal heart rate.</p>

            <p><strong>Internal fetal scalp electrode (FSE)</strong> monitoring uses an electrode applied directly to the fetal presenting part, usually the fetal scalp, after membrane rupture. It detects the fetal heart rate from the fetal electrocardiographic signal and may provide a more consistent tracing when external monitoring is difficult.</p>

            <p>FSE use is invasive and requires appropriate clinical conditions, patient consent, and adherence to institutional policy. Potential limitations and risks include local fetal skin injury, bleeding, infection risk, and inappropriate use when contraindications are present. Some manufacturers may list specific contraindications, warnings, or use restrictions on the product packaging or instructions for use, so product-specific guidance should be reviewed when applicable.</p>

            <hr>

            <p><strong>Uterine activity monitor</strong> refers to the device used to assess contraction frequency, duration, and resting tone pattern during fetal health surveillance.</p>

            <p><strong>External tocodynamometer (TOCO)</strong> monitoring uses a pressure-sensitive transducer placed on the maternal abdomen. It detects changes in abdominal wall contour during contractions and is commonly used because it is non-invasive. TOCO can usually help assess contraction frequency and approximate duration, but it does not directly measure contraction strength or true resting tone.</p>

            <p>TOCO accuracy can be affected by maternal position, movement, body habitus, belt placement, fetal or maternal movement, and poor contact with the abdomen. Because TOCO does not measure true uterine pressure, palpation remains important when assessing contraction intensity, resting tone, or whether the tracing matches the clinical picture.</p>

            <p><strong>Internal uterine pressure catheter (IUPC)</strong> monitoring uses a catheter placed inside the uterus after membrane rupture. It directly measures intrauterine pressure in mmHg and can provide more detailed information about contraction intensity, resting tone, and Montevideo Units.</p>

            <p>IUPC use is invasive and requires appropriate clinical conditions, patient consent, and adherence to institutional policy. Potential limitations and risks include insertion difficulty, inaccurate readings if not functioning or zeroed correctly, infection, bleeding, uterine or placental injury, and rare serious complications. Manufacturer-specific instructions, warnings, and contraindications should be reviewed when applicable.</p>
        `,

    interpretability: `
    <p><strong>Interpretable tracing:</strong> contains enough visually clear fetal heart rate and uterine activity data to allow the clinician to assess the fetal health surveillance findings being evaluated.</p>

    <p><strong>Uninterpretable tracing:</strong> does not contain enough visually clear data to allow clinicians to interpret the information they are seeking. If electronic fetal monitoring is indicated, troubleshooting should be initiated so that the tracing records the information needed for assessment.</p>

    <p><strong>Artifact:</strong> refers to a signal that interferes with the fetal heart rate display and may arise from sources other than the fetal heart. Artifact can occur when the monitor is detecting the wrong input, such as the maternal heart rate, or when the system displays a misleading output signal.</p>

    <p><strong>External ultrasound artifact:</strong> may appear as gaps, irregular marks, or “chicken scratches” that make the baseline difficult to determine. It may also create small vertical markings that falsely suggest variability. It is important to distinguish true fetal heart rate variability from artifact.</p>

    <p><strong>FSE artifact:</strong> internal fetal scalp electrode monitoring can also produce artifact. Possible causes include fetal movement, excess fetal hair, poor electrode contact, placement on maternal tissue, signal disruption during vaginal examination, or equipment-related issues.</p>

    <p>Whenever the tracing does not clearly represent the fetal heart rate, interpretation should be delayed until the signal is clarified. Ongoing difficulty obtaining interpretable data should be escalated according to institutional policy, and efforts to obtain interpretable data should be documented.</p>
`,
    externalUterineActivity: `
    <p><strong>Uterine activity assessment</strong> evaluates the contraction pattern in relation to the fetal heart rate. With external monitoring, this includes use of the tocodynamometer and manual palpation of the maternal abdomen.</p>

    <p>Uterine activity is described by four characteristics: <strong>frequency</strong>, <strong>duration</strong>, <strong>intensity</strong>, and <strong>resting tone</strong>.</p>

    <p><strong>Frequency</strong> is how often contractions occur, usually counted as the number of contractions in 10 minutes and averaged over 30 minutes. Normal frequency is generally 5 or fewer contractions in 10 minutes.</p>

    <p><strong>Duration</strong> is the length of each contraction, from the start of uterine tightening to return of uterine relaxation. Normal duration is generally 90 seconds or less.</p>

    <p><strong>Intensity</strong> and <strong>resting tone</strong> cannot be measured by an external tocodynamometer. They require palpation. Intensity is commonly described as mild, moderate, or strong. Resting tone should feel soft between contractions and should be present for at least 30 seconds.</p>

    <p><strong>Clinical reminder:</strong> palpation should accompany external monitoring to confirm the contraction pattern, assess intensity and resting tone, support correct transducer placement, and ensure the tracing matches the clinical picture. The labouring person’s perception of contractions should also be considered.</p>

    <p><strong>Tachysystole</strong> is the term for excessive uterine activity and includes any of the following: more than 5 contractions in 10 minutes averaged over 30 minutes, contraction duration greater than 90 seconds, insufficient resting tone between contractions, or excessive intensity when measured by IUPC.</p>

<ul>
    <li><strong>Frequency:</strong> &gt;5 contractions in 10 minutes averaged over 30 minutes.</li>
    <li><strong>Duration:</strong> contraction duration &gt;90 seconds.</li>
    <li><strong>Resting tone:</strong> resting period between contractions &lt;30 seconds, or the uterus remains firm between contractions.</li>
    <li><strong>Intensity:</strong> IUPC measurement &ge;75 mmHg above baseline, except in second stage.</li>
</ul>

    <p>Tachysystole can reduce uteroplacental blood flow and may affect fetal oxygenation over time. If fetal heart rate characteristics are atypical or abnormal during excessive uterine activity, response should not be delayed while waiting to complete a 30-minute average.</p>
`,
       maternalFactors: `
    <p><strong>Maternal factors matter</strong> because maternal physiology can affect fetal oxygen delivery and can also influence how the fetal heart rate tracing is interpreted.</p>

    <p>Maternal tachycardia, fever, hypotension, hypoxia, cardiac arrhythmia, or other clinical changes may alter uteroplacental blood flow, fetal oxygenation, or the ability to clearly distinguish the fetal heart rate from the maternal heart rate.</p>

    <p>When maternal factors are present, the fetal tracing should be interpreted in the full clinical context. Maternal assessment, vital signs, symptoms, medications, labour progress, and the quality of the tracing may all affect clinical interpretation and next steps.</p>

    <p><strong>Clinical reminder:</strong> abnormal maternal findings do not automatically determine the fetal heart rate classification, but they may increase concern, require correction or escalation, and support closer reassessment according to clinical judgment and institutional policy.</p>
`,
       coincidence: `
    <p><strong>Maternal-fetal heart rate coincidence</strong> occurs when the displayed fetal heart rate is the same as, very similar to, or difficult to distinguish from the maternal heart rate.</p>

    <p>This can happen when the external fetal monitor inadvertently detects the maternal pulse instead of the fetal heart rate, or when the maternal and fetal heart rates are close enough that the tracing source becomes uncertain.</p>

    <p>Coincidence is a safety concern because the tracing may appear to show fetal heart rate characteristics when it is actually displaying maternal heart rate data. This can delay recognition of fetal compromise or lead to incorrect interpretation.</p>

    <p><strong>Clinical reminder:</strong> when coincidence is suspected, the maternal pulse should be confirmed by palpation or appropriate maternal monitoring and compared with the displayed fetal heart rate. Ongoing or repetitive coincidence should be resolved before fetal heart rate classification is applied.</p>
`,
    };

    function renderEducationContent() {
        document.querySelectorAll('[data-edu]').forEach((target) => {
            const key = target.getAttribute('data-edu');

            if (!key || !educationContent[key]) return;

            target.innerHTML = educationContent[key];
        });
    }

    document.addEventListener('DOMContentLoaded', renderEducationContent);
})();
