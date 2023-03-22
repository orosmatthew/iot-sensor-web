#include <Arduino.h>

#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiClient.h>

#include <ArduinoJson.h>

#include "env.h"

ESP8266WiFiMulti WiFiMulti;

int count = 0;

void setup()
{
    Serial.begin(115200);

    Serial.println();
    Serial.println();
    Serial.println();

    for (uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] WAIT %d...\n", t);
        Serial.flush();
        delay(1000);
    }

    WiFi.mode(WIFI_STA);
    WiFiMulti.addAP(STASSID, STAPSK);
}

void post_data(const String post_data)
{
    if ((WiFiMulti.run() == WL_CONNECTED)) {
        WiFiClient client;
        HTTPClient http;

        Serial.print("[HTTP] begin...\n");
        if (http.begin(client, URL)) { // HTTP

            http.addHeader("Content-Type", "application/json");
            Serial.print("[HTTP] POST...\n");
            // start connection and send HTTP header
            int httpCode = http.POST(post_data);

            // httpCode will be negative on error
            if (httpCode > 0) {
                // HTTP header has been send and Server response header has been handled
                Serial.printf("[HTTP] POST... code: %d\n", httpCode);
            }
            else {
                Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
            }
            http.end();
        }
        else {
            Serial.println("[HTTP] Unable to connect");
        }
    }
}

void loop()
{
    DynamicJsonDocument doc(1024);
    doc["test"] = std::to_string(count);

    char serialize[1024] = { 0 };
    serializeJson(doc, serialize);

    post_data(static_cast<String>(serialize));

    count+=10;
    delay(1000);
}
