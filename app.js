const form = document.querySelector('#mainForm')

window.addEventListener('load', validateForm)

function validateForm() {
  const isValid = form.valueInput.value === ""
  const isSameValueSelected = form.fromValueSelect.value === form.toValueSelect.value

  if (!isValid && isSameValueSelected) {
    form.convertButton.setAttribute('disabled', true)
  } else {
    form.convertButton.removeAttribute('disabled')
  }
}

function convertValues() {
  const fromValue = form.fromValueSelect.value
  const toValue = form.toValueSelect.value
  const temperature = Number(form.valueInput.value)

  const conversionMap = {
    "celsius_fahrenheit": celsiusToFahrenheit,
    "fahrenheit_celsius": fahrenheitToCelsius,
    "celsius_kelvin": celsiusToKelvin,
    "kelvin_celsius": kelvinToCelsius,
    "fahrenheit_kelvin": fahrenheitToKelvin,
    "kelvin_fahrenheit": kelvinToFahrenheit,
  };

  const key = `${fromValue}_${toValue}`;
  const conversionFunction = conversionMap[key];

  if (conversionFunction) {
    return {
      temperature,
      result: conversionFunction(temperature),
      from: fromValue,
      to: toValue
    }
  }

  return null; // In case no conversion is needed
}

function renderResult() {
  const {temperature, result, from, to} = convertValues()

  document.querySelector('#result').textContent = `${temperature.toFixed(1)} ${from} is ${result.toFixed(1)} ${to}`
}

form.valueInput.addEventListener('change', validateForm)
form.fromValueSelect.addEventListener('change', validateForm)
form.toValueSelect.addEventListener('change', validateForm)
form.addEventListener('submit', renderResult)

function celsiusToFahrenheit(c) {
  return (c * 1.8) + 32
}

function celsiusToKelvin(c) {
  return c + 273.15
}

function fahrenheitToCelsius(f) {
  return (f - 32) / 1.8
}

function fahrenheitToKelvin(f) {
  return fahrenheitToCelsius(f) + 273.15
}

function kelvinToCelsius(k) {
  return k - 273.15
}

function kelvinToFahrenheit(k) {
  return 1.8 * (k - 273.15) + 32
}
