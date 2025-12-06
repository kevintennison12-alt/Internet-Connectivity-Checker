function checkConnectivity() {
    let url = document.getElementById("urlInput").value.trim();

    if (url === "") {
        alert("Please enter a website URL");
        return;
    }

    // send request to backend
    fetch("check.php?url=" + encodeURIComponent(url))
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
            } 
            else {
                box.className = "result error";
                status.innerHTML = "❌ Connection Failed";
                ping.innerHTML = "Unable to reach website.";
            }
        });
}
