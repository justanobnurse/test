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

            <p><strong>Artifact:</strong> refers to a signal that interferes with the fetal heart rate display and may arise from sources other than the fetal heart. This can occur when the monitor is detecting the wrong input, such as the maternal heart rate, or when the system displays a misleading output signal.</p>
        `,
       externalUterineActivity: `
            <p><strong>External uterine activity assessment</strong> refers to evaluating contraction pattern using an external tocodynamometer and clinical assessment.</p>

            <p><strong>Normal uterine activity</strong> generally includes a contraction pattern that allows adequate uterine relaxation between contractions. Assessment should consider contraction frequency, duration, resting tone between contractions, and the overall clinical picture.</p>

            <p><strong>External TOCO limitation:</strong> an external tocodynamometer can help show contraction frequency and approximate duration, but it does not directly measure contraction strength or true resting tone. Because of this, palpation remains important when assessing uterine tone, contraction intensity, and whether the tracing matches the clinical picture.</p>

            <p><strong>Tachysystole</strong> is commonly described as more than 5 contractions in 10 minutes, averaged over 30 minutes. However, different fetal surveillance resources and institutional policies may include additional criteria, such as excessive contraction duration, inadequate resting tone between contractions, coupling or tripling contractions, elevated resting tone, or excessive intensity when measured internally.</p>

            <p>When tachysystole is suspected, consider the full clinical context, fetal heart rate response, medications or oxytocin exposure, labour progress, maternal symptoms, and institutional policy. Tachysystole can reduce uteroplacental blood flow and may affect fetal oxygenation over time, even if the current fetal heart rate classification is otherwise reassuring.</p>
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
