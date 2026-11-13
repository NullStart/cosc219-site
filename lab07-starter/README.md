# COSC 219 Lab 7
The click listener is attached to the path list instead of each button, because the buttons are rebuilt every time the list is rendered, while the list itself remains unchanged.

If `loadTrails()` does not prevent situations such as data loss, corruption or format errors, the application may receive `null` values or throw errors, resulting in incorrect loading.

AI statement: I used an AI assistant to help understand the problem and repeatedly check the code. To be honest, I couldn't complete this lab independently without the help of AI.