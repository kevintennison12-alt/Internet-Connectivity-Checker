import sys
import json
import subprocess
import requests
from requests.exceptions import ConnectionError

url = sys.argv[1].strip()

# Fix URL formatting
if not url.startswith("http"):
    full_url = "https://" + url
else:
    full_url = url

result = {
    "status": "disconnected",
    "ping": None
}

# Try HTTP connection
try:
    r = requests.get(full_url, timeout=5)
    result["status"] = "connected"
except:
    print(json.dumps(result))
    sys.exit()

# Try ping
try:
    ping_cmd = ["ping", "-c", "1", url]
    ping_output = subprocess.check_output(ping_cmd, universal_newlines=True)

    # Extract ping time
    ping_time = ping_output.split("time=")[1].split(" ms")[0]
    result["ping"] = ping_time
except:
    result["ping"] = "N/A"

print(json.dumps(result))
