const INSTRUMENT_GENERATORS = {
    smiq: new SmiqSmeGenerator('smiq', 'SMIQ', 'SMIQ'),
    sme: new SmiqSmeGenerator('sme', 'SME', 'SM3'),
    cmu200: new Cmu200Generator(),
    fsp: new FspGenerator(),
};

function generate() {
    const serial = document.getElementById('serial').value.trim();
    const type = document.getElementById('type').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p style="color:#888;margin-bottom:1rem;">Serial: ' + serial + '</p>';

    const generator = INSTRUMENT_GENERATORS[type];
    if (!generator) {
        resultDiv.innerHTML += `<p style="color:#ff6b6b;">Unknown instrument type: ${type}</p>`;
        return;
    }
    generator.render(serial, resultDiv);
}

document.addEventListener('DOMContentLoaded', generate);
