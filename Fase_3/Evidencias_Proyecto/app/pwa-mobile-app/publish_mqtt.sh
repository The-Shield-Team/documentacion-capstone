#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "Uso: $0 <topic> <room> <device_id>"
    exit 1
fi

TOPIC=$1
ROOM=$2
DEVICE_ID=$3

aws iot-data publish \
    --topic "$TOPIC" \
    --payload "{\"room\":$ROOM,\"device_id\":$DEVICE_ID}" \
    --cli-binary-format raw-in-base64-out

echo "Mensaje publicado al tópico '$TOPIC' con room=$ROOM y device_id=$DEVICE_ID"