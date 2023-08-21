Casita - README
===============

Casita is a personal project created to address a specific issue I had with my smart light bulbs. I wanted my lights to automatically change colors based on the time of day, adapting to the surrounding environment and the changing natural light. This project allows you to save a predefined color scheme in a database for different time ranges during the day.

Table of Contents
-----------------

-   [Introduction](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#introduction)
-   [Features](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#features)
-   [Installation](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#installation)
-   [Usage](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#usage)
-   [Configuration](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#configuration)
-   [Contributing](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#contributing)
-   [License](https://chat.openai.com/c/b3b7af32-7256-48de-982e-ff2d07d641e8#license)

Introduction
------------

Casita is a custom solution to enhance the functionality of smart light bulbs. It allows you to define specific color schemes for different times of the day. This can be particularly useful for creating a more comfortable and ambient atmosphere in your living spaces.

Features
--------

-   Automatic Color Adjustment: Casita automatically changes the color of your smart lights based on predefined time ranges, adapting to the natural light conditions.

-   Custom Color Schemes: You can set up unique color schemes for various times of the day, such as sunrise, sunset, and nighttime.

-   Database Storage: All your color scheme settings are stored in a database, ensuring that your preferences are retained even after power cycles or system restarts.

Installation
------------

1.  Clone the Casita repository to your local machine.

    bashCopy code

    `git clone https://github.com/your-username/casita.git`

2.  Navigate to the project directory.

    bashCopy code

    `cd casita`

3.  Install the required dependencies.

    Copy code

    `npm install`

Usage
-----

1.  Run the Casita application.

    sqlCopy code

    `npm start`

2.  Access the Casita web interface through your browser at `http://localhost:3000`.

3.  Set up your preferred color schemes for different time ranges using the intuitive interface.

4.  Watch as your smart light bulbs seamlessly transition between colors as the day progresses.

Configuration
-------------

Casita can be easily configured to match your preferences. Here's how you can configure it:

1.  Database Configuration: You can configure the database settings in the `config.js` file.

2.  Time Ranges and Colors: Adjust the time ranges and corresponding colors in the settings section of the web interface.

3.  Smart Light Integration: Casita currently supports integration with [SmartBulbHub](https://www.smartbulbhub.com/) via their API. You'll need to set your API key in the configuration for this feature to work.

Contributing
------------

Contributions to Casita are welcome! If you have any improvements or new features to suggest, feel free to submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

License
-------

Casita is released under the [MIT License](https://chat.openai.com/c/LICENSE).
