/* ==========================================================================
   CEFM EDUCATION CONTENT
   Canadian FHS Educational Tools
   ========================================================================== */

(() => {
    'use strict';

    const educationContent = {
        monitorTypes: `
    <p><strong>Monitoring types</strong> refers to the equipment used to assess the fetal heart rate and uterine activity during continuous electronic fetal monitoring. This information is educational only and should be applied alongside clinical judgment, institutional policy, patient consent, and manufacturer guidance.</p>

    <hr>

    <p><strong>Fetal heart monitoring</strong></p>

    <p><strong>External ultrasound:</strong> an ultrasound transducer is placed on the maternal abdomen to detect fetal heart motion. External ultrasound may be wired or wireless depending on the equipment available. It is non-invasive and commonly used.</p>

    <p><strong>Useful considerations:</strong> external ultrasound tracing quality can be affected by fetal position, maternal movement, signal loss, maternal body habitus, monitor placement, or inadvertent monitoring of the maternal heart rate. If the tracing does not clearly represent the fetal heart rate, further assessment or troubleshooting is needed before interpretation.</p>

    <p><strong>Internal fetal scalp electrode (FSE):</strong> an electrode is applied directly to the fetal presenting part, usually the fetal scalp, after membrane rupture. It detects the fetal heart rate from the fetal electrocardiographic signal and may provide a more consistent tracing when external monitoring is difficult.</p>

    <p><strong>Useful considerations:</strong> FSE is invasive and requires appropriate clinical conditions, patient consent, and adherence to institutional policy. Potential limitations and risks include local fetal skin injury, bleeding, infection risk, artifact, and inappropriate use when contraindications are present. Manufacturer-specific contraindications, warnings, or use restrictions should be reviewed when applicable.</p>

    <hr>

    <p><strong>Uterine activity monitoring</strong></p>

    <p><strong>External tocodynamometer (TOCO):</strong> a pressure-sensitive transducer is placed on the maternal abdomen, usually near the uterine fundus. It detects changes in abdominal wall contour during contractions.</p>

    <p><strong>Useful considerations:</strong> TOCO can help assess contraction frequency and approximate duration, but it does not directly measure contraction strength or true resting tone. Palpation remains important when assessing contraction intensity, resting tone, and whether the tracing matches the clinical picture. TOCO accuracy can be affected by maternal position, movement, body habitus, belt placement, and poor contact with the abdomen.</p>

    <p><strong>Internal uterine pressure catheter (IUPC):</strong> a catheter is placed inside the uterus after membrane rupture and connected to the monitor. It measures intrauterine pressure in mmHg and can provide information about contraction intensity, resting tone, and Montevideo Units.</p>

    <p><strong>Useful considerations:</strong> IUPC is invasive and requires appropriate clinical conditions, patient consent, and adherence to institutional policy. Potential limitations and risks include insertion difficulty, inaccurate readings if the system is not functioning or zeroed correctly, infection, bleeding, uterine or placental injury, and rare serious complications. Manufacturer-specific instructions, warnings, and contraindications should be reviewed when applicable.</p>
`,
    interpretability: `
    <p><strong>Interpretable tracing:</strong> contains enough visually clear fetal heart rate and uterine activity data to allow the clinician to assess the fetal health surveillance findings being evaluated.</p>

    <p><strong>Uninterpretable tracing:</strong> does not contain enough visually clear data to allow clinicians to interpret the information they are seeking. If electronic fetal monitoring is indicated, troubleshooting should be initiated so the tracing records the information needed for assessment.</p>

    <hr>

    <p><strong>Common reasons a tracing may be uninterpretable</strong></p>

    <p><strong>Artifact:</strong> a signal that interferes with the fetal heart rate display and may arise from sources other than the fetal heart. Artifact can occur when the monitor detects the wrong input, such as the maternal heart rate, or when the system displays a misleading output signal.</p>

    <p><strong>External ultrasound artifact:</strong> may appear as gaps, irregular marks, or “chicken scratches” that make the baseline difficult to determine. It may also create small vertical markings that falsely suggest variability. True fetal heart rate variability should be distinguished from artifact.</p>

    <p><strong>FSE artifact:</strong> internal fetal scalp electrode monitoring can also produce artifact. Possible causes include fetal movement, excess fetal hair, poor electrode contact, placement on maternal tissue, signal disruption during vaginal examination, or equipment-related issues.</p>

    <hr>

    <p><strong>Practical reminder:</strong> whenever the tracing does not clearly represent the fetal heart rate, interpretation should be delayed until the signal is clarified. Ongoing difficulty obtaining interpretable data should be escalated according to institutional policy, and efforts to obtain interpretable data should be documented.</p>
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
       baselineFHR: `
    <p><strong>Baseline fetal heart rate</strong> is the approximate mean fetal heart rate, rounded to increments of 5 bpm, during a 10-minute segment of the tracing.</p>

    <p>The baseline is assessed <strong>between contractions</strong> and excludes accelerations, decelerations, and periods of marked variability greater than 25 bpm.</p>

    <p>There must be at least <strong>2 minutes of identifiable baseline</strong> within a 10-minute window. The identifiable baseline does not need to be continuous. If there is not enough identifiable baseline, the baseline is considered indeterminate.</p>

    <p><strong>Normal baseline FHR</strong> is 110 to 160 bpm. A preterm fetus may have a baseline toward the higher end of the normal range, while a term or post-term fetus may have a baseline toward the lower end because of maturation of the autonomic nervous system.</p>

    <p>A baseline change may occur gradually. To be considered a new baseline, the change should be maintained for 10 minutes. Reviewing the previous 10-minute segment can help compare the prior baseline with the current tracing.</p>
`,
       baselineTrend: `
    <p><strong>Baseline trend</strong> refers to whether the fetal heart rate baseline remains stable or shows a progressive change over time.</p>

    <p><strong>Stable baseline:</strong> the baseline remains relatively consistent without a persistent upward trend.</p>

    <p><strong>Persistently rising baseline:</strong> the baseline fetal heart rate progressively increases over time. A baseline that is consistently rising is considered concerning because it may be associated with evolving fetal stress, maternal fever, infection, dehydration, medication effects, or other clinical changes.</p>

    <p>In this tool, a persistently rising baseline is treated as an <strong>atypical</strong> finding.</p>

    <p><strong>Clinical note:</strong> a decreasing baseline can occur, but it generally becomes concerning when the baseline reaches bradycardia, defined as less than 110 bpm.</p>
`,
       baselineVariability: `
    <p><strong>Baseline variability</strong> refers to irregular fluctuations in the baseline fetal heart rate. These fluctuations vary in amplitude and frequency and are visually assessed by estimating the peak-to-trough amplitude in bpm.</p>

    <p>Variability reflects the interaction between the sympathetic and parasympathetic nervous systems. The presence of variability requires an intact medulla, a sufficiently mature central nervous system, and an oxygenated brainstem.</p>

    <p><strong>Moderate variability</strong> is generally reassuring and is associated with the absence of fetal metabolic acidemia at the time it is observed. It reflects intact fetal heart rate modulation, cardiac responsiveness, and adequate oxygenation.</p>

    <ul>
        <li><strong>Absent variability:</strong> undetectable amplitude.</li>
        <li><strong>Minimal variability:</strong> amplitude of 5 bpm or less.</li>
        <li><strong>Moderate variability:</strong> amplitude of 6 to 25 bpm.</li>
        <li><strong>Marked variability:</strong> amplitude greater than 25 bpm.</li>
    </ul>

    <p><strong>Terminology reminder:</strong> use standardized terms such as absent, minimal, moderate, and marked. Avoid undefined subjective terms such as “good variability” or “improving variability.”</p>

    <p>The older terms “short-term variability,” “beat-to-beat variability,” and “long-term variability” are no longer recommended for visual interpretation because variability is visually assessed as a single characteristic.</p>
`,
       accelerations: `
    <p><strong>Accelerations</strong> are visually apparent abrupt increases in fetal heart rate above the established baseline. “Abrupt” means the onset of the acceleration to the peak occurs in less than 30 seconds.</p>

    <p>At 32 weeks gestation or greater, an acceleration is an increase of <strong>15 bpm or more</strong> above baseline, lasting <strong>15 seconds or more</strong> and less than 2 minutes from the time it leaves the baseline until it returns.</p>

    <p>Before 32 weeks gestation, an acceleration is typically defined as an increase of <strong>10 bpm or more</strong> above baseline, lasting <strong>10 seconds or more</strong> and less than 2 minutes.</p>

    <p>An acceleration lasting <strong>2 minutes to less than 10 minutes</strong> is considered a prolonged acceleration. An increase lasting <strong>10 minutes or more</strong> is considered a baseline change.</p>

    <p><strong>Physiology:</strong> accelerations reflect a sympathetic fetal response and are commonly associated with fetal movement, normal cardiovascular responsiveness, or direct fetal stimulation such as scalp stimulation.</p>

    <p><strong>Classification reminder:</strong> the presence of accelerations is normal and reassuring. However, accelerations are not required for a tracing to be classified as normal in labour, and the absence of accelerations in labour is common and does not automatically make the tracing atypical or abnormal.</p>
`,
       decelerations: `
    <p><strong>Decelerations</strong> are decreases in the fetal heart rate below the established baseline. The type of deceleration is determined by the <strong>slope</strong> of the decrease and its <strong>timing in relation to uterine contractions</strong>.</p>

    <p><strong>Abrupt onset</strong> means the time from the beginning of the deceleration to the nadir is less than 30 seconds. Abrupt decelerations are usually variable decelerations.</p>

    <p><strong>Gradual onset</strong> means the time from the beginning of the deceleration to the nadir is 30 seconds or more. Gradual decelerations are usually assessed by their relationship to the contraction and may be early or late.</p>

    <p><strong>Early decelerations</strong> are gradual decreases that usually mirror the contraction. The onset, nadir, and recovery generally correspond with the beginning, peak, and end of the contraction. Early decelerations are commonly associated with fetal head compression and are classified as normal when they meet early deceleration criteria.</p>

    <p><strong>Variable decelerations</strong> are abrupt decreases in the fetal heart rate and are commonly associated with umbilical cord compression. They may be episodic or occur with contractions. Variable decelerations may be uncomplicated or complicated depending on their features and the surrounding tracing.</p>

    <p><strong>Uncomplicated variable decelerations</strong> are abrupt decreases of at least 15 bpm below baseline, lasting at least 15 seconds and less than 2 minutes, without complicating features. Non-repetitive uncomplicated variables may be normal, while repetitive uncomplicated variables are classified as atypical in this tool.</p>

    <p><strong>Complicated variable decelerations</strong> have features suggesting greater concern, such as delayed return to baseline after the contraction, prolonged duration, deep nadir, large drop from baseline, overshoot, or occurrence with baseline tachycardia, bradycardia, minimal variability, or absent variability. In this tool, non-repetitive complicated variables are atypical and repetitive complicated variables are abnormal.</p>

    <p><strong>Late decelerations</strong> are gradual decreases where the onset, nadir, and recovery occur after the beginning, peak, and end of the contraction. They may reflect uteroplacental insufficiency and require careful assessment in the full clinical context.</p>

    <p><strong>Intermittent late decelerations</strong> occur with less than 50% of contractions in a 20-minute window and are classified as atypical in this tool. <strong>Recurrent late decelerations</strong> occur with 50% or more of contractions in a 20-minute window and are classified as abnormal.</p>

    <p><strong>Prolonged decelerations</strong> last at least 2 minutes but less than 10 minutes. A decrease lasting 10 minutes or more is considered a baseline change, but still represents a significant finding requiring clinical assessment and response.</p>

    <p><strong>Occurrence terms:</strong> periodic decelerations occur with contractions, episodic decelerations are not associated with contractions, repetitive means 3 or more decelerations in a row, recurrent means occurring with 50% or more of contractions, and intermittent means occurring with less than 50% of contractions.</p>
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
