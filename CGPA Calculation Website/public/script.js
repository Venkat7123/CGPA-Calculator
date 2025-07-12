let sub_count = 1;
function add() {
    sub_count++;
    const container = document.getElementById('subjects');

    container.classList.add('top-align');

    const creditrow = document.createElement('div');
    creditrow.className = 'row';
    const head1 = document.createElement('h3');
    head1.innerText = "Enter Number of Credits for Subject " + sub_count;
    const input1 = document.createElement('input');
    input1.type = "number";
    input1.className = "score";
    creditrow.appendChild(head1);
    creditrow.appendChild(input1);

    const pointrow = document.createElement('div');
    pointrow.className = 'row';
    const head2 = document.createElement('h3');
    head2.innerText = "Enter Grade Points for Subject " + sub_count;
    const select = document.createElement('select');
    select.className = "point";

    const options = [
        { text: "Select Grade", value: "", disabled: true, selected: true },
        { text: "O - 10", value: "10" },
        { text: "A+ - 9", value: "9" },
        { text: "A - 8", value: "8" },
        { text: "B+ - 7", value: "7" },
        { text: "B - 6", value: "6" },
        { text: "F - 0", value: "0" }
    ];

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.text = opt.text;
        if (opt.disabled) option.disabled = true;
        if (opt.selected) option.selected = true;
        select.appendChild(option);
    });
    pointrow.appendChild(head2);
    pointrow.appendChild(select);

    container.appendChild(creditrow);
    container.appendChild(pointrow);

    container.scrollTop = container.scrollHeight;
    creditrow.style.opacity = 0;
    pointrow.style.opacity = 0;

    setTimeout(() => {
        creditrow.style.transition = "opacity 0.3s ease";
        pointrow.style.transition = "opacity 0.3s ease";
        creditrow.style.opacity = 1;
        pointrow.style.opacity = 1;
    }, 10);

}

function calc() {
    const credits = document.querySelectorAll('.score');
    const points = document.querySelectorAll('.point');
    let cgpa = 0;
    let total = 0;

    for (let i = 0; i < credits.length; i++) {
        const c = parseFloat(credits[i].value);
        const p = parseFloat(points[i].value);
        if (!isNaN(c) && !isNaN(p)) {
            cgpa += c * p;
            total += c;
        }
        else {
            Toastify({
                text: "Please enter valid credit and grade values.",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "rgb(203, 157, 157)",
                style: {
                    fontSize: "20px",
                    color: "#58350c",
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: "450",
                    width: "fit-content",
                    padding: "10px 20px",
                    borderRadius: "8px"
                }
            }).showToast();
            return;
        }
    }

    cgpa /= total;
    document.getElementById('result').innerText = "Your CGPA is " + cgpa.toFixed(2);
}
function resetForm() {
    const inner = document.getElementById('subjects');
    inner.innerHTML = `
                <div class="row", style = "align-items: center;justify-content: space-between;">
                <h3>Enter Number of Credits for Subject 1</h3>
                <input type="number" class="score">
                </div>
                <div class="row">
                <h3>Enter Grade Points for Subject 1</h3>
                <select class="point">
                    <option value="" disabled selected>Select Grade</option>
                    <option value="10">O - 10</option>
                    <option value="9">A+ - 9</option>
                    <option value="8">A - 8</option>
                    <option value="7">B+ - 7</option>
                    <option value="6">B - 6</option>
                    <option value="0">F - 0</option>
                </select>
                </div>
            `;
    document.getElementById('result').innerText = "";
    sub_count = 1;

}

function downloadPDF() {
    const element = document.getElementById('subjects');
    const opt = {
        margin: 0.5,
        filename: 'cgpa_result.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}