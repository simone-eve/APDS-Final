![Logo](https://github.com/user-attachments/assets/adcf6aeb-4b49-46b2-a992-f9e35bd51267)

# TransWorld Bank App - A Secure Customer International Payments Portal (POE)
## Description
The TransWorld Bank Customer Portal is a secure app for making international payments. It protects passwords by hashing and salting them and ensures that all user input is safe by validating it with RegEx patterns. The app uses SSL to keep data secure during transactions and is protected against common cyber-attacks. A video showing how everything works will be recorded and uploaded for review.

## Features In Our Payment Portal
- **Welcome Feature:** This is the Welcome page, this is the first page that the user will see. "Welcome to the Employee Dashboard," and an instruction to log in. The design includes two green buttons, "EMP" and "USER" with a clean white background, rounded corners, and soft shadowing against a light gray backdrop. The "EMP" Button will allow Employees to Login and the "USER" Button will allow Users to Login.
- **Employee Login Feature:** This feature is specifically for Employees they are required to fill in thier Name, Surname, Email and Password and click "Login" to proceed to the next page.
- **User Login Feature:** This feature is specifically for Users they are required to fill in thier Full Name, Account Number and Password and click "Login" to proceed to the next page.
- **Payment Form Feature:** The core functionality where users can initiate international payments, choose currencies, and ensure transactions are processed safely.
- **Dashboard Feature:** This "Payments Dashboard" displays a table of transactions, listing details like amount, currency, recipient, account info, and bank. All entries show a "Pending" verification status, with a "Verify" button available for each. The green and white rows enhance readability, making it easy to monitor and manage payments.
- **Payment DashBoard Feature:** The "Payments Dashboard" displays a table listing payment details, such as amount, currency, provider, recipient's name, account number, bank name, SWIFT code, and verification status. The dashboard has a light green background with darker green headers and alternating row colors for readability. A centered "Make New Payment" button below the table allows users to initiate a new payment. The layout is simple and functional, but the light green background may benefit from a more neutral color for a cleaner, professional look.
- **Add User Feature:** This page is for Employees to add new Users by providing information like Users Full name, Id Number, Account Number, User ID and a Password.

## Detailed Breakdown Of Each Feature
### WELCOME PAGE

![Welcome Page](https://github.com/user-attachments/assets/df3695f2-e2c2-4c3d-bd4e-828c8332f330)

- The Welcome page welcomes the user to the platform annd gives them 2 options which are "Emp" and "User".
- It starts with the Message "Welcome to the Employee DashBoard".
- When the user clicks on "Emp" they will be taken to the employee login page.
- When the user clicks on "User" they will be taken to the User login page.
- The design is straightforward and professional, effectively guiding users to take the next step towards accessing the dashboard.

### EMPLOYEE LOGIN PAGE

![Employee Login](https://github.com/user-attachments/assets/86d1bf03-7f0a-4fff-829b-53d62d042de1)

- The Employee Login page provides a straightforward interface for employees to login in to their accounts.
- It begins with the **Name** field, validated to ensure consistency with registered details.
- The **Surname** field verifies that its the right person logging in.
- The **Email** field links the login attempt to the user’s specific bank account.
- The **Password** field is encrypted using hashing and salting techniques before being stored.
- The **Login** button submits the form and verifies all inputs, prompting employee to correct any errors.

### User Login Feature

![User Login1](https://github.com/user-attachments/assets/296de9c4-2c68-4eeb-b455-f2d9198ef254)

- The **Full Name** field verifies the user’s identity by matching it with registered records.
- The **Account Number** field uniquely identifies the user’s specific bank account, ensuring that the login is linked to the correct account.
- The **Password** field protects the user’s credentials by encrypting them with hashing and salting techniques, safeguarding against unauthorized access.

### Payment Form

![Payment Form1](https://github.com/user-attachments/assets/e908a194-c9bc-4e5c-a6c5-66885f82d8ff)

- The **Amount** field specifies the sum to be transferred.
- The **Currency** field designates the currency type (e.g., USD, GBP) for the transaction.
- The **Provider** field identifies the payment provider (e.g., SWIFT) facilitating the transfer. 
- The **Recipiant Name** field indicates the full name of the person or entity receiving the payment.
- The **Account Number** field ensures the funds are directed to the correct account.
- The **Bank Name** field provides the name of the recipient's bank.
- The **Swift Code** field specifies the bank’s unique code for international transfers, ensuring secure routing to the correct institution.
- The payment form requires users to enter several critical details to complete an international payment.
- Users enter the transfer amount, select the currency, input the recipient’s name, account number, bank name, and SWIFT code.
- Validation ensures all fields are filled out correctly before finalizing the payment.

### Payment DashBoard Feature

![Payment Dashboard1](https://github.com/user-attachments/assets/72500e2f-9629-4045-9b0a-1ff4089d9dc0)

- The **Amount** total sum of money being transferred or exchanged.
- The **Currency** type of money being used in the transaction (e.g., USD, EUR, ZAR).
- The **Provider** financial institution, service, or platform facilitating the transaction (e.g., a bank or a payment service provider).
- The **Recipient  Name** name of the individual or entity receiving the funds.
- The **Account Number** recipient’s bank account number where the funds are to be deposited.
- The **Bank Name** name of the financial institution where the recipient holds their account.
- The **Swift Name** (also known as a BIC) identifies the recipient’s bank in international transactions.
- The **Verification** This could refer to any step or method used to ensure the authenticity or legitimacy of the transaction (e.g., two-factor authentication, verification code, or other security measures).
- The dashboard allows users to track and manage payments, displaying transaction details such as amount, recipient name, bank name, verification status, and date/time.
- Users can easily verify transaction details and maintain an accurate history.

### DashBoard Feature

![Dashboard1](https://github.com/user-attachments/assets/da137a20-ff9a-46c6-a212-aa31c1175f71)

- The **Amount** total sum of money that the employee needs to transfer or exchange for the transaction.
- The **Currency** specific type of money the employee will use in the transaction (e.g., USD, EUR, ZAR).
- The **Provider** financial institution, service, or platform the employee is using to facilitate the transaction (e.g., a bank or payment service provider).
- The **Recipient  Name** name of the individual or entity the employee is sending the funds to.
- The **Account Number** recipient’s bank account number where the employee needs to deposit the funds.
- The **Bank Name** name of the recipient’s bank where their account is held.
- The **Swift Name** (also known as BIC) that identifies the recipient’s bank for international transactions.
- The **Verification** process or method the employee needs to follow to confirm the authenticity of the transaction (e.g., two-factor authentication, verification code, or other security measures).

### Add User Feature

![Add new User1](https://github.com/user-attachments/assets/f6704531-0c7d-40a0-a830-e665a9b70fe7)

- The **Full Name** complete name of the individual the employee is registering or adding to the system.
- The **ID Number** unique identification number assigned to the individual (e.g., national ID, employee ID).
- The **Account Number** bank account number or system-specific account number assigned to the individual.
- The **User ID** unique identifier assigned to the individual within the system for login and access purposes.
- The **Password** chosen by the employee (or set by the individual) for securing the user account.

## Non-Functional Requirements
- **Security:** Passwords are stored using a strong hashing algorithm, with salting applied.
- **Privacy:** Adherence to data privacy policies to safeguard user information.
- **Usability:** Intuitive and user-friendly interface for easy navigation.
- **Performance:** System responds within 2 seconds under normal load conditions.

## Usage
1. To begin, users must register for an account by tapping the **Register** button and filling in essential personal information.
2. After registering, users can log in by tapping the **Login** button and entering their credentials.
3. The dashboard provides an overview of recent transactions and features a **New Payment** button to initiate an international transaction.
4. Users fill in key details on the payment form and tap the **Pay Now** button to process the transaction.

## Security Features
- **Express Brute:** Middleware that limits requests from a single IP address to prevent brute force attacks.
- **Helmet:** Enhances security by setting HTTP headers, guarding against vulnerabilities like XSS and clickjacking.
- **Morgan:** Logs HTTP request details for monitoring and debugging.
- **Express-rate-limit:** Controls request rates to specific routes to protect against abuse.
- **Express-validator:** Validates and sanitizes user input to prevent injection attacks.
- **CORS:** Manages cross-origin requests to prevent unauthorized access.
  
## Password Security
- Passwords are securely stored using hashing and salting techniques.
- User input is validated using RegEx and whitelisted for enhanced security.
- Express Validator middleware sanitizes incoming data, ensuring clean and secure inputs.

## Testing
- We are using Postman to test the registration and login functionalities of the TransWorld Bank app. Postman allows us to easily send HTTP requests to the API, ensuring that the registration and login endpoints work as expected.
- By testing these features in Postman, we can verify that user data is properly handled, and authentication is securely processed.

## Technology Used
- **Frontend:** Built with Visual Studio Code using React Native, providing a user interface to interact with the banking platform.
- **Backend API:** Built using Node.js, providing RESTful API endpoints for user registration, login, and payment processing.
- **Database:** MongoDB securely stores user information and logs international payments, ensuring performance and scalability.

##  Continuous Integration and Code Quality
## Pipeline
- The TransWorld Bank App utilizes a robust CI/CD pipeline to automate the process of building, testing, and deploying the application.
- This pipeline ensures that every change made to the codebase is automatically tested and validated, maintaining high code quality and reducing the risk of introducing bugs.
- The pipeline is set up to trigger builds on every commit to the repository, allowing for seamless integration and deployment of updates.
- Postman tests are integrated into the pipeline to automatically verify the registration and login endpoints. These tests ensure that user inputs are correctly handled and that the expected responses are returned for both valid and invalid login attempts. If any test fails, the pipeline halts, preventing the deployment of broken code and ensuring the application's stability and security.

## SonarQube
- To maintain and improve code quality, we have integrated SonarQube into our development workflow.
- SonarQube analyses the codebase for potential vulnerabilities, code smells, and maintainability issues.
- It provides valuable feedback to developers, helping them identify areas for improvement and ensuring that our code adheres to industry best practices.
- By continuously monitoring code quality, SonarQube plays a crucial role in maintaining the reliability and security of the TransWorld Bank App.

Demonstration Video: [YouTube Link]()


