function hide(id) {
    document.getElementById(id).classList.remove('show');
    document.getElementById(id).classList.add('hide');
}

function show(id) {
    document.getElementById(id).classList.remove('hide');

    if (id === 'summary') {
        document.getElementById(id).classList.add('summary', 'show');
    }
    else {
        document.getElementById(id).classList.add('show');
    }
}

async function submit_url(e) {
    e.preventDefault();
    document.getElementById("submit").classList.add('loading'); // make loading appear
    document.getElementById("submit").disabled = true; // disable clicking while loading

    const formData = new FormData(e.target);

    const res = await fetch("https://sidekick-collect-emails.benhong.workers.dev/api/email", {
        method: "POST",
        body: formData,
    });

    document.getElementById("submit").classList.remove('loading');
    document.getElementById("submit").disabled = false; // enable clicking after loading
    show("request_status")
    if (res.ok) {
        document.getElementById("submit-text").innerText = "Thanks! We'll let you know when it's ready.";
    } else {
        document.getElementById("submit-text").innerText = `${await res.text()}. Please try again.`;
    }
}

function onload_function() {
    const summary_form = document.querySelector('#summary_form');
    summary_form.onsubmit = submit_url;
}

window.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('#summary_input');
    const copyTextBtn = document.querySelector('#copyTextBtn');
    const submitBtn = document.querySelector('#submit');

    if (searchBar) {
        searchBar.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Enter':
                    if (!e.shiftKey) {
                        e.preventDefault();
                        submitBtn.click();
                    }
                    break;
            }
        });
    }

    if (copyTextBtn) {
        copyTextBtn.addEventListener('click', () => {
            const mdDataBox = document.querySelector('#mdDataBox');
            navigator.clipboard.writeText(mdDataBox.innerHTML);
        });
    }
});

var summary_type = "takeaway";
var request_target = ""
window.onload = onload_function;
