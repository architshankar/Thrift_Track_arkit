from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.common.exceptions import NoSuchElementException
import datetime

items = ["B0BR88R74Y","B09M5ZHWTL"]

options = EdgeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])#exclude Devtools logs
driver = webdriver.Edge(options=options)

for it in items:
    # Create an Amazon link for each item
    amz_link = "https://www.amazon.in//dp/" + str(it)

    # Open the browser page
    driver.get(amz_link)

    # Wait for the element with ID 'centerCol' to be visible
    WebDriverWait(driver, 20).until(EC.visibility_of_all_elements_located((By.ID, "centerCol")))

    # Get the product title
    try:
        # Wait for the title element to be visible
        title_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "productTitle")))
        
        # Extract the text from the title element
        title = title_element.text.strip()  # Get the text and remove leading/trailing whitespace
        
        # Now 'title' variable holds the extracted title text
        print("Product Title:", title)  # Just for demonstration, replace with your logic to use the title
    except NoSuchElementException:
        print("Title element not found.")

    # Get the image source of the product
    try:
        # Wait for the image element to be visible
        image_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "landingImage")))
        
        # Get the image source URL
        image_url = image_element.get_attribute("src")
        
        # Now 'image_url' variable holds the URL of the image
        print("Image URL:", image_url)  # Replace with logic to use the image URL as needed
    except NoSuchElementException:
        print("Image element not found.")

    # Get the current URL of the browser
    url = str(driver.current_url)

    # Try to get the price


    try:
        price_element = driver.find_element(By.CSS_SELECTOR, '.a-price-whole')
        price_text = price_element.text.strip()  # Get the text of the price element
        price = price_text.replace(',', '')  # Remove commas from the price if present
        print("found it:", price)  # Add a print statement for the extracted price
    except NoSuchElementException:
        print("Price not found or element structure changed")



    # Get the current date and time
    created_at = datetime.datetime.now()

    # Get the searched text
    search_text = title.split(",")[0]

    # Set the source
    source = "https://www.amazon.in/"

    # Print the scraped information to the terminal
    print("Name:", title)
    print("Image Source:", image_url)
    print("URL:", url)
    print("Price:", price)
    print("Created At:", created_at)
    print("Searched Text:", search_text)
    print("Source:", source)
    print("\n")
