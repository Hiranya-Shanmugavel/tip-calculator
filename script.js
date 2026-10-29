/**
 * Tip Calculator - Beginner-Friendly JavaScript
 * Handles calculations, input validation, DOM updates, and interactive controls.
 */

// ==========================================================================
// 1. DOM Element Selections
// ==========================================================================

// Inputs & Wrappers
const billInput = document.getElementById("bill-input");
const billInputWrapper = document.getElementById("bill-input-wrapper");
const billError = document.getElementById("bill-error");

const tipSlider = document.getElementById("tip-slider");
const tipBadge = document.getElementById("tip-badge");
const tipPills = document.querySelectorAll(".tip-pill");

const peopleCountInput = document.getElementById("people-count");
const decreasePeopleBtn = document.getElementById("decrease-people");
const increasePeopleBtn = document.getElementById("increase-people");

// Results Displays
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const tipPerPersonDisplay = document.getElementById("tip-per-person");
const perPersonAmountDisplay = document.getElementById("per-person-amount");

// Reset Button
const resetBtn = document.getElementById("reset-btn");

// ==========================================================================
// 2. Default Configuration
// ==========================================================================
const DEFAULT_TIP = 15;
const DEFAULT_PEOPLE = 1;

// ==========================================================================
// 3. Helper Functions
// ==========================================================================

/**
 * Format a number into Indian Rupee currency format (₹) with 2 decimal places.
 * Example: 1250 -> "₹1,250.00"
 *
 * @param {number} amount - The numeric value to format
 * @returns {string} Formatted INR currency string
 */
function formatCurrencyINR(amount) {
  if (isNaN(amount) || amount < 0) {
    amount = 0;
  }
  return "₹" + amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Update the visual fill of the slider track based on its current position.
 *
 * @param {number} value - The slider's current value
 */
function updateSliderTrack(value) {
  const min = Number(tipSlider.min) || 0;
  const max = Number(tipSlider.max) || 30;
  const percentage = ((value - min) / (max - min)) * 100;

  tipSlider.style.background = `linear-gradient(to right, #0d9488 0%, #0d9488 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
}

/**
 * Synchronize the active state of quick preset buttons with current tip value.
 *
 * @param {number} currentTip - The current tip percentage
 */
function syncTipPresets(currentTip) {
  tipPills.forEach((pill) => {
    const pillValue = Number(pill.getAttribute("data-tip"));
    if (pillValue === currentTip) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
}

/**
 * Validate the bill input value.
 * Returns { isValid: boolean, value: number }
 */
function validateBillInput() {
  const rawValue = billInput.value.trim();

  // If input is empty, clear error and treat as 0
  if (rawValue === "") {
    clearBillError();
    return { isValid: true, value: 0 };
  }

  const numericValue = parseFloat(rawValue);

  // Check for negative numbers
  if (numericValue < 0 || rawValue.includes("-")) {
    showBillError("Bill amount cannot be negative");
    return { isValid: false, value: 0 };
  }

  // Check for invalid or non-numeric input
  if (isNaN(numericValue)) {
    showBillError("Please enter a valid amount");
    return { isValid: false, value: 0 };
  }

  // Clear any previous error when input is valid
  clearBillError();
  return { isValid: true, value: numericValue };
}

/**
 * Display an error message and highlight the bill input.
 *
 * @param {string} message - Error message to display
 */
function showBillError(message) {
  billError.textContent = message;
  billInputWrapper.classList.add("error");
}

/**
 * Clear the error message and remove error styling from the bill input.
 */
function clearBillError() {
  billError.textContent = "";
  billInputWrapper.classList.remove("error");
}

/**
 * Update the disabled state of the minus (−) button.
 * The minimum number of people is 1.
 */
function updateStepperButtons() {
  const currentCount = parseInt(peopleCountInput.value, 10) || 1;
  decreasePeopleBtn.disabled = currentCount <= 1;
}

// ==========================================================================
// 4. Main Calculation Function
// ==========================================================================

/**
 * Calculates tip amount, total bill, and split amounts,
 * then updates the DOM elements with formatted Indian Rupee values.
 */
function calculate() {
  // Step A: Validate Bill Amount
  const { isValid, value: billAmount } = validateBillInput();

  // Step B: Get Tip Percentage
  const tipPercent = Number(tipSlider.value) || 0;
  tipBadge.textContent = `${tipPercent}%`;
  updateSliderTrack(tipPercent);

  // Step C: Get Number of People (minimum 1 for math calculation)
  let peopleCount = parseInt(peopleCountInput.value, 10);
  if (isNaN(peopleCount) || peopleCount < 1) {
    peopleCount = 1;
  }
  updateStepperButtons();

  // If the bill input is invalid (e.g. negative) or empty (0), show zeroed results
  if (!isValid || billAmount === 0) {
    tipAmountDisplay.textContent = formatCurrencyINR(0);
    totalAmountDisplay.textContent = formatCurrencyINR(0);
    tipPerPersonDisplay.textContent = formatCurrencyINR(0);
    perPersonAmountDisplay.textContent = formatCurrencyINR(0);
    return;
  }

  // Step D: Core Calculations
  const totalTip = (billAmount * tipPercent) / 100;
  const totalBill = billAmount + totalTip;
  const tipPerPerson = totalTip / peopleCount;
  const totalPerPerson = totalBill / peopleCount;

  // Step E: Update DOM Results
  tipAmountDisplay.textContent = formatCurrencyINR(totalTip);
  totalAmountDisplay.textContent = formatCurrencyINR(totalBill);
  tipPerPersonDisplay.textContent = formatCurrencyINR(tipPerPerson);
  perPersonAmountDisplay.textContent = formatCurrencyINR(totalPerPerson);
}

// ==========================================================================
// 5. Event Listeners
// ==========================================================================

// --- Bill Input Events ---
billInput.addEventListener("input", calculate);

// Prevent typing invalid signs like '-' directly
billInput.addEventListener("keydown", (e) => {
  if (e.key === "-" || e.key === "+") {
    e.preventDefault();
  }
});

// --- Tip Slider Events ---
tipSlider.addEventListener("input", () => {
  const tipValue = Number(tipSlider.value);
  syncTipPresets(tipValue);
  calculate();
});

// --- Quick Tip Preset Buttons ---
tipPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const selectedTip = Number(pill.getAttribute("data-tip"));
    tipSlider.value = selectedTip;
    syncTipPresets(selectedTip);
    calculate();
  });
});

// --- Number of People Stepper Buttons ---
decreasePeopleBtn.addEventListener("click", () => {
  let count = parseInt(peopleCountInput.value, 10) || 1;
  if (count > 1) {
    peopleCountInput.value = count - 1;
    calculate();
  }
});

increasePeopleBtn.addEventListener("click", () => {
  let count = parseInt(peopleCountInput.value, 10) || 1;
  peopleCountInput.value = count + 1;
  calculate();
});

// Direct typing in people count input
peopleCountInput.addEventListener("input", () => {
  let count = parseInt(peopleCountInput.value, 10);
  if (!isNaN(count) && count < 1) {
    peopleCountInput.value = 1;
  }
  calculate();
});

// When user leaves the people input field, ensure valid minimum of 1
peopleCountInput.addEventListener("blur", () => {
  let count = parseInt(peopleCountInput.value, 10);
  if (isNaN(count) || count < 1) {
    peopleCountInput.value = 1;
    calculate();
  }
});

// Prevent invalid symbols when typing in people input
peopleCountInput.addEventListener("keydown", (e) => {
  if (e.key === "-" || e.key === "+" || e.key === "." || e.key === ",") {
    e.preventDefault();
  }
});

// --- Reset Button Event ---
resetBtn.addEventListener("click", () => {
  // 1. Reset input values to defaults
  billInput.value = "";
  tipSlider.value = DEFAULT_TIP;
  peopleCountInput.value = DEFAULT_PEOPLE;

  // 2. Reset preset button highlight
  syncTipPresets(DEFAULT_TIP);

  // 3. Clear any existing errors
  clearBillError();

  // 4. Recalculate displays back to ₹0.00
  calculate();

  // 5. Focus back to the bill input for convenience
  billInput.focus();
});

// ==========================================================================
// 6. Initial Application Setup
// ==========================================================================
// Run calculate once at load time to initialize all displays and slider track
syncTipPresets(DEFAULT_TIP);
calculate();
