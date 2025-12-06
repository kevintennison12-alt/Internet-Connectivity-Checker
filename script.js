function checkConnectivity() {
    let url = document.getElementById("urlInput").value.trim();

    fetch(`/api/check?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {
            let box = document.getElementById("resultBox");
            let status = document.getElementById("statusText");
            let ping = document.getElementById("pingText");

            box.classList.remove("hidden");

            if (data.status === "connected") {
                box.className = "result success";
                status.innerHTML = "✔ Connection Established";
                ping.innerHTML = "Ping: " + data.ping + " ms";
            } else {
                box.className = "result error";
                status.innerHTML = "❌ Connection Failed";
                ping.innerHTML = "Website unreachable.";
            }
        })
        .catch(err => {
            alert("Error: " + err);
        });
}
