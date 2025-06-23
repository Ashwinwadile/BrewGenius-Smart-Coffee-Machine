#define BLYNK_TEMPLATE_ID "TMPL3qlaDkpva"
#define BLYNK_TEMPLATE_NAME "BREW"
#define BLYNK_AUTH_TOKEN "ijD5HSq-wt2IUrwc8UruENsdDNAxjdHe"

#include <OneWire.h>
#include <DallasTemperature.h>
#include <BlynkSimpleEsp32.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

char ssid[] = "Jaydeep";
char pass[] = "12345678";

#define ONE_WIRE_BUS 15
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

BlynkTimer timer;

#define relay1 18  // Heater
#define relay2 4   // Water motor
#define relay3 19  // Mixer motor
#define relay4 2   // Coffee powder motor

#define sensorPin1 36 // Water level sensor (analog)

#define Buzzer 5
#define ONBOARD_LED 2

int sensorValue1 = 0;
float temperatureC = 0.0;

bool isBrewing = false;
int brewStep = 0;
int waterLowCount = 0;

unsigned long manualDisplayUntil = 0;  // ← New variable for manual LCD timeout

// ---------- MANUAL CONTROLS ----------
BLYNK_WRITE(V7) {
  if (!isBrewing) {
    int state = param.asInt();
    digitalWrite(relay4, state == 1 ? LOW : HIGH);
    lcd.clear();
    lcd.setCursor(0, 0);
    if (state == 1) {
      lcd.print("Manual: Adding");
      lcd.setCursor(0, 1);
      lcd.print("Coffee Powder");
    } else {
      lcd.print("Manual: Stopped");
    }
    manualDisplayUntil = millis() + 3000;
  }
}

BLYNK_WRITE(V8) {
  if (!isBrewing) {
    int state = param.asInt();
    digitalWrite(relay2, state == 1 ? LOW : HIGH);
    lcd.clear();
    lcd.setCursor(0, 0);
    if (state == 1) {
      lcd.print("Manual: Adding");
      lcd.setCursor(0, 1);
      lcd.print("Water");
    } else {
      lcd.print("Manual: Stopped");
    }
    manualDisplayUntil = millis() + 3000;
  }
}

BLYNK_WRITE(V9) {
  if (!isBrewing) {
    int state = param.asInt();
    digitalWrite(relay3, state == 1 ? LOW : HIGH);
    lcd.clear();
    lcd.setCursor(0, 0);
    if (state == 1) {
      lcd.print("Manual: Mixing");
    } else {
      lcd.print("Manual: Stopped");
    }
    manualDisplayUntil = millis() + 3000;
  }
}

// ---------- AUTO BREW START ----------
BLYNK_WRITE(V10) {
  if (param.asInt() == 1 && !isBrewing) {
    isBrewing = true;
    brewStep = 0;
    startBrewSequence();
  }
}

BLYNK_WRITE(V11) {
  if (param.asInt() == 1 && !isBrewing) {
    isBrewing = true;
    brewStep = 100;
    startBrewSequence();
  }
}

void setup() {
  pinMode(ONBOARD_LED, OUTPUT);
  pinMode(Buzzer, OUTPUT);
  digitalWrite(Buzzer, LOW);
  digitalWrite(ONBOARD_LED, LOW);

  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(relay3, OUTPUT);
  pinMode(relay4, OUTPUT);

  digitalWrite(relay1, HIGH);
  digitalWrite(relay2, HIGH);
  digitalWrite(relay3, HIGH);
  digitalWrite(relay4, HIGH);

  Serial.begin(115200);
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  sensors.begin();
  lcd.init();
  lcd.backlight();
  welcome();

  timer.setInterval(1000L, updateSensors);
}

void loop() {
  Blynk.run();
  timer.run();
}

void updateSensors() {
  sensors.requestTemperatures();
  temperatureC = sensors.getTempCByIndex(0);
  sensorValue1 = analogRead(sensorPin1) + 1090;

  Blynk.virtualWrite(V1, temperatureC);
  Blynk.virtualWrite(V3, sensorValue1);

  checkWaterLevel();

  if (!isBrewing) {
    if (millis() > manualDisplayUntil) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Temp=");
      lcd.print(temperatureC, 1);
      lcd.print("C");

      lcd.setCursor(0, 1);
      lcd.print("WL=");
      lcd.print(sensorValue1);

      if (temperatureC < 35.0 && sensorValue1 > 2000) {
        digitalWrite(relay1, LOW);
        lcd.setCursor(11, 0);
        lcd.print("Heat ON ");
      } else {
        digitalWrite(relay1, HIGH);
        lcd.setCursor(11, 0);
        lcd.print("Heat OFF");
      }
    }
  } else {
    if (temperatureC < 35.0 && sensorValue1 > 2000) {
      digitalWrite(relay1, LOW);
    } else {
      digitalWrite(relay1, HIGH);
    }
  }
}

void checkWaterLevel() {
  if (sensorValue1 < 2000) {
    waterLowCount++;
    if (waterLowCount > 15) {
      Blynk.logEvent("alert2", "Water LOW is detected");
      waterLowCount = 0;
    }
    if (!isBrewing) {
      lcd.setCursor(0, 1);
      lcd.print("Alert: Water LOW");
    }
    beep();
  } else {
    waterLowCount = 0;
  }
}

void beep() {
  digitalWrite(Buzzer, HIGH);
  delay(300);
  digitalWrite(Buzzer, LOW);
  delay(300);
}

void welcome() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting...");
  lcd.setCursor(0, 1);
  lcd.print("Cloud Please Wait");
  delay(2000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Welcome to");
  lcd.setCursor(0, 1);
  lcd.print("P.E.S. MODERN COLLEGE");
  delay(2000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Coffee Machine");
  lcd.setCursor(0, 1);
  lcd.print("System ON");
  delay(2000);
  lcd.clear();
}

void startBrewSequence() {
  switch (brewStep) {
    case 0:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Adding Powder");
      digitalWrite(relay4, LOW);
      timer.setTimeout(200, []() {
        digitalWrite(relay4, HIGH);
        brewStep++;
        startBrewSequence();
      });
      break;

    case 1:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Mixing Coffee");
      digitalWrite(relay3, LOW);
      timer.setTimeout(2000, []() {
        digitalWrite(relay3, HIGH);
        brewStep++;
        startBrewSequence();
      });
      break;

    case 2:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Adding Water");
      digitalWrite(relay2, LOW);
      timer.setTimeout(1000, []() {
        digitalWrite(relay2, HIGH);
        brewStep++;
        startBrewSequence();
      });
      break;

    case 100:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Adding Powder");
      digitalWrite(relay4, LOW);
      timer.setTimeout(700, []() {
        digitalWrite(relay4, HIGH);
        brewStep = 101;
        startBrewSequence();
      });
      break;

    case 101:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Mixing Coffee");
      digitalWrite(relay3, LOW);
      timer.setTimeout(2000, []() {
        digitalWrite(relay3, HIGH);
        brewStep++;
        startBrewSequence();
      });
      break;

    case 102:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Adding Water");
      digitalWrite(relay2, LOW);
      timer.setTimeout(1000, []() {
        digitalWrite(relay2, HIGH);
        brewStep++;
        startBrewSequence();
      });
      break;

    default:
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Coffee Ready!");
      timer.setTimeout(4000, []() {
        lcd.clear();
      });
      isBrewing = false;
      Blynk.virtualWrite(V10, 0);
      Blynk.virtualWrite(V11, 0);
      break;
  }
}
