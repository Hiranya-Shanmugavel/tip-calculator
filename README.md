# Tip Calculator Web Application

A clean, beginner-friendly, and responsive Tip Calculator built with vanilla **HTML5**, **CSS3**, and **JavaScript** (no external libraries or frameworks required).

Designed with a modern **Teal color theme** and built to calculate tips and split bills in **Indian Rupees (₹)** with instant DOM updates.

---

## 🚀 Features

1. **Indian Rupee (₹) Currency**:
   - Bill amount input with currency prefix.
   - All results displayed formatted in Indian Rupees with two decimal places (e.g. `₹1,250.00`).
2. **Interactive Tip Slider (0% to 30%)**:
   - Smooth range slider from 0% to 30% with live percentage badge.
   - Quick preset buttons (5%, 10%, 15%, 20%, 25%) that synchronize with the slider.
3. **People Stepper (+ / −)**:
   - Increment and decrement buttons to split the bill among people.
   - Enforces a minimum of 1 person (minus button automatically disables at 1).
4. **Live Instant Calculations**:
   - Updates all amounts immediately as you type or adjust sliders/buttons:
     - **Tip Amount** (total tip)
     - **Total Bill** (bill + tip)
     - **Tip Per Person**
     - **Amount Per Person** (bill + tip divided equally)
5. **Robust Validation**:
   - Rejects negative numbers and invalid inputs with friendly error messages and visual highlighting.
6. **One-Click Reset**:
   - Restores all inputs to their default starting values (Empty bill, 15% tip, 1 person).
7. **Responsive & Modern Design**:
   - Mobile-first, card-based layout with rounded corners, subtle shadows, and responsive two-column desktop view.

---

## 📁 File Structure

```
tip_calculator_app/
│
├── index.html     # Semantic HTML markup for the UI
├── style.css      # Custom styling & Teal color design system
├── script.js      # Vanilla JavaScript logic, event listeners, and math
└── README.md      # Project overview and guide
```

---

## 💻 How to Run the Application

Since this project uses pure vanilla HTML, CSS, and JavaScript, no build step or package installation is needed.

### Method 1: Open Directly in Any Browser
- Navigate to the project folder:
  `c:\Users\user\Documents\GitHub\tip_calculator_app`
- Double-click `index.html`, or right-click `index.html` and choose **Open with** -> **Google Chrome** (or Edge, Firefox, Brave, Safari).

### Method 2: Using Python's Built-in Local Server
Open PowerShell or Terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then open your browser and visit:
[http://localhost:8000](http://localhost:8000)

### Method 3: Using VS Code Live Server
- Install the **Live Server** extension in VS Code.
- Right-click `index.html` and select **"Open with Live Server"**.

---

## 🧪 How to Test the Features

1. **Test Standard Tip Calculation**:
   - Enter `1000` in the Bill Amount field.
   - Keep the Tip Slider at `15%`.
   - Keep Number of People at `1`.
   - **Expected Result**:
     - Tip Amount: `₹150.00`
     - Total Bill: `₹1,150.00`
     - Amount Per Person: `₹1,150.00`

2. **Test Splitting Across Multiple People**:
   - Click the `+` button to increase the people count to `4`.
   - **Expected Result**:
     - Tip Amount: `₹150.00`
     - Total Bill: `₹1,150.00`
     - Tip Per Person: `₹37.50`
     - Amount Per Person: `₹287.50`

3. **Test Tip Slider and Quick Presets**:
   - Drag the slider between `0%` and `30%` and watch the badge and amounts update smoothly.
   - Click one of the quick presets like `20%` or `10%` to verify the slider moves and the button becomes highlighted.

4. **Test Minimum People Constraint**:
   - Click the `−` button until the count reaches `1`.
   - Notice the `−` button becomes disabled and cannot go below `1`.

5. **Test Input Validation (Negative & Invalid Values)**:
   - Try typing or pasting `-500` into the Bill field.
   - Notice the input turns red with an error message: *"Bill amount cannot be negative"*.
   - Results safely default to `₹0.00`.

6. **Test Reset Function**:
   - Click the **"Reset Calculator"** button.
   - All fields reset back to defaults (Empty bill, 15% tip, 1 person, results to `₹0.00`).
