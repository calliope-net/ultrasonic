
//% color=#E0311D icon="\u2194" block="Ultraschall" weight=13
namespace ultrasonic
/*
SparkFun Qwiic Ultrasonic Distance Sensor (HC-SR04)
https://learn.sparkfun.com/tutorials/qwiic-ultrasonic-distance-sensor-hc-sr04-hookup-guide

https://github.com/sparkfun/Zio-Qwiic-Ultrasonic-Distance-Sensor
https://github.com/sparkfun/Zio-Qwiic-Ultrasonic-Distance-Sensor/blob/master/Arduino/Zio_Ultrasonic_Distance_Sensor_IIC_Test%20(1)/Zio_Ultrasonic_Distance_Sensor_IIC_Test.ino


*/ { // ultrasonic.ts

    // ========== I²C ==========
    const i2cqwiicUltrasonic_x00 = 0x00 // SLAVE_BROADCAST_ADDR 0x00  //default address
    let i2cqwiicUltrasonic = 0x00       // SLAVE_ADDR 0xA0-0xAF

    const measure_command = 0x01


    //% group="Qwiic Ultrasonic Distance Sensor"
    //% block="I²C Adresse %newI2C"
    //% newI2C.min=160 newI2C.max=175
    export function beimStart(newI2C: number) {
        if (newI2C >= 0xA0 && newI2C <= 0xAF) {
            i2cqwiicUltrasonic = newI2C
        }
    }

    //% group="Entfernung messen"
    //% block="Entfernung in mm" weight=3
    export function readDistancemm() {
        if (pins.i2cWriteBuffer(i2cqwiicUltrasonic, Buffer.fromArray([measure_command]), false) == 0) {
            return pins.i2cReadBuffer(i2cqwiicUltrasonic, 2).getNumber(NumberFormat.UInt16BE, 0)
        } else {
            basic.showString(Buffer.fromArray([i2cqwiicUltrasonic]).toHex())
            return 0
        }
    }

    //% group="Entfernung messen"
    //% block="Entfernung in cm" weight=2
    export function readDistancecm() {
        return Math.idiv(readDistancemm(), 10)
    }


    //% group="I²C"
    //% block="I²C Adresse ändern %oldI2C neu %newI2C"
    export function changeI2C(oldI2C: number, newI2C: number) {
        //  Wire.beginTransmission(SLAVE_BROADCAST_ADDR); // transmit to device SLAVE_BROADCAST_ADDR
        //  Wire.write(SLAVE_ADDR);              // Change the SLAVE_ADDR
        //  Wire.endTransmission();    // stop transmitting
        if (newI2C >= 0xA0 && newI2C <= 0xAF) {
            if (pins.i2cWriteBuffer(oldI2C, Buffer.fromArray([newI2C]), false) == 0) {
                i2cqwiicUltrasonic = newI2C
                return true
            } else {
                basic.showString(Buffer.fromArray([oldI2C]).toHex())
                return false
            }
        } else
            return false
    }


} // ultrasonic.ts
