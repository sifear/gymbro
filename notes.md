### Phone availablility
- Windows firewall let 8080 out
- Powersehell: port proxy:
    - ip address is from windows side: ```wsl.exe hostname -I```
    - cmd: ```netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=8080 connectaddress=172.22.83.215```

- nginx: others has to have x access on all directory on the way to www root