import re
import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

items = [
    "https://www.myntra.com/curtains-and-sheers/urban+space/urban-space-beige--gold-toned-black-out-window-curtain/24765878/buy"
]

# Setting up the Chrome webdriver
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

for url in items:
    # Open the browser page
    driver.get(url) 

    # Wait for the element with class 'pdp-price' to be visible
    WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.CLASS_NAME, "pdp-price")))

    # Get the product title
    try:
        title_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "pdp-title")))
        title = title_element.text.strip() if title_element else "Title not found"
        print("Product Titlle:", title)
    except NoSuchElementException:
        print("Title element not found.")

    # Get the image source of the product
    try:
        first_image_url = driver.execute_script(
            "return document.querySelector('.image-grid-image').style.backgroundImage.match(/url\\(\"(.+?)\"\\)/)[1];"
        )

        print("First Image URL:", first_image_url)
    except Exception as e:
        print("Failed to extract first image URL:", str(e))

    # Get the current URL of the browser
    current_url = driver.current_url

    # Try to get the price
    try:
        price_element = driver.find_element(By.CLASS_NAME, 'pdp-price')
        price_text = price_element.text.strip() if price_element else "Price not found"
        print("Price:", price_text)
    except NoSuchElementException:
        print("Price not found or element structure changed")

    # Get the current date and time
    created_at = datetime.datetime.now()

    # Set the source
    source = "https://www.myntra.com/"

    # Print the scraped information to the terminal
    print("URL:", current_url)
    print("Created At:", created_at)
    print("Source:", source)
    print("\n")

# Close the browser window after scraping all items
driver.quit()
