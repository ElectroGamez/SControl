const byte numChars = 32;
char receivedChars[numChars];

boolean newData = false;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
    Serial.begin(9600);
    Serial.println("<Arduino is ready>");
}

void loop() {
    recvWithStartEndMarkers();
    showNewData();
}

void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;
 
 // if (Serial.available() > 0) {
    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void showNewData() {
    if (newData == true) {
        Serial.print("Arduino Read: ");
        Serial.println(receivedChars);

        int a, b, c;
        
        if (sscanf(receivedChars, "%d,%d,%d", &a, &b, &c) == 3) {
          switch (a) {
          case 0:
            if (b == 0) {
              digitalWrite(LED_BUILTIN, LOW);
            } else {
              digitalWrite(LED_BUILTIN, HIGH);
            }
            break;
           case 1:
            Serial.println(b);
            break;
          default:
            Serial.println("Invalid command");
            break;
        }
        }
        newData = false;
    }
}
