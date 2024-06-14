
//% color=#E0311D icon="\uf108" block="Ultraschall" weight=13
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


    //% group="Ultraschall Sensor"
    //% block="Entfernung in mm"
    export function readDistance() {
        if (pins.i2cWriteBuffer(i2cqwiicUltrasonic, Buffer.fromArray([0]), false) == 0) {
            return pins.i2cReadBuffer(i2cqwiicUltrasonic, 2).getNumber(NumberFormat.UInt16BE, 0)
        } else {
            basic.showString(Buffer.fromArray([i2cqwiicUltrasonic]).toHex())
            return 0
        }
    }


} // ultrasonic.ts
