import sys
import json
import subprocess
import requests

# Read URL
url = sys.argv[1].strip().strip("'").strip('"')

# Ensure full URL
if not url.startswith("http://") and not url.startswith("https://"):
    url_to_test = "https://" + url
else:
    url_to_test = url

result = {
    "status": "disconnected",
    "ping": "N/A"
}

# Try HTTP connect
try:
    r = requests.get(url_to_test, timeout=5)
    result["status"] = "connected"
except:
    print(json.dumps(result))
    sys.exit()

# Try ping
try:
    ping_process = subprocess.run(
        ["ping", "-c", "1", url],
        capture_output=True,
        text=True
    )
    output = ping_process.stdout

    if "time=" in output:
        ping_time = output.split("time=")[1].split(" ms")[0]
        result["ping"] = ping_time
except:
    pass

print(json.dumps(result))
