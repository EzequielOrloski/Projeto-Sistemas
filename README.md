# Indoor Positioning

Posicionamento interno usando Beacons com trilateração.

## ESP32

O módulo ESP32 funciona como estação de monitoramento Beacon, reportando todos os beacons encontrados ao tópico MQTT, com NOME e RSSI.

Formato enviado pelo Esp32

{"b":[{"m":"BT-18","r":"-30"},{"m":"BT-19","r":"-30"},{"m":"BT-20","r":"-30"},{"m":"user2","r":"00"}]}

## Dashboard

O Dashboard é feito em React, que se conecta ao servidor MQTT e mostra os Beacons.

## Trabalho em Progresso...

![Dashboard](https://github.com/EzequielOrloski/Projeto-Sistemas/blob/master/foto.png)
![Dashboard](https://github.com/EzequielOrloski/Projeto-Sistemas/blob/master/foto1.png)