function checkConnection() {
    let icon = document.getElementById("statusIcon");
    let text = document.getElementById("statusText");

    icon.className = "status-icon checking";
    text.innerHTML = "Checking connection...";

    fetch("check.php")
        .then(res => res.json())
        .then(data => {
            if (data.status === "connected") {
                icon.className = "status-icon connected";
                text.innerHTML = "Internet Connected ✔";
            } else {
                icon.className = "status-icon disconnected";
                text.innerHTML = "No Internet ❌";
            }
        })
        .catch(() => {
            icon.className = "status-icon disconnected";
            text.innerHTML = "No Internet ❌";
        });
}
