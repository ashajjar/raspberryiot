#!/usr/bin/python
#encoding=utf-8

# the sensor has to be connected to pin 1 for power, pin 6 for ground
# and pin 16 for signal(board numbering!).

import time
import sys
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

def action(pin):
    print('Sensor detected action!')
    return

GPIO.add_event_detect(16, GPIO.RISING)
GPIO.add_event_callback(16, action)

try:
    while True:
        print('alive')
        time.sleep(0.5)
except KeyboardInterrupt:
    GPIO.cleanup()
    sys.exit()