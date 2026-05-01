/* ==========================================================================
   CEFM EDUCATION CONTENT
   Canadian FHS Educational Tools
   ========================================================================== */

(() => {
    'use strict';

    const educationContent = {
        monitors: `
            <p>
                <strong>Fetal heart monitor</strong> refers to the device used to detect and display the fetal heart rate during continuous electronic fetal monitoring.
            </p>

            <p>
                <strong>External ultrasound</strong> monitoring uses an ultrasound transducer placed on the maternal abdomen to detect fetal heart motion. It may be used with wired or wireless systems, depending on the equipment available. External ultrasound is non-invasive and commonly used, but the tracing can be affected by fetal position, maternal movement, signal loss, maternal body habitus, or inadvertent monitoring of the maternal heart rate.
            </p>

            <p>
                <strong>Internal fetal scalp electrode (FSE)</strong> monitoring uses an electrode applied directly to the fetal presenting part, usually the fetal scalp, after membrane rupture. It detects the fetal heart rate from the fetal electrocardiographic signal and may provide a more consistent tracing when external monitoring is difficult.
            </p>

            <p>
                FSE use is invasive and requires appropriate clinical conditions, patient consent, and adherence to institutional policy. Potential limitations and risks include local fetal skin injury, bleeding, infection risk, and inappropriate use when contraindications are present. Some manufacturers may list specific contraindications, warnings, or use restrictions on the product packaging or instructions for use, so product-specific guidance should be reviewed when applicable.
            </p>
        `
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
