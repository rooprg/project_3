# Project 3 Data Visualization
Our project wanted to look at data from natural disasters in the 21st Century and see where they are happening, their frequency, and the loss of life over time.  This data could be used to analyze if efforts to reduce the damage of natural disasters over time have been successful.


# Instructions
In order to view the stacked bar chart showing deaths by each disaster each year of the 21st Century, you will run the 'index_christian.html' file.  This will load a bar chart, and you can hover over each year to see the distribution of deaths between earthquakes, tsunamis, and volcanos and the total deaths in each year.  The max of the chart was cut off at 1500 because there are two outliers, 2015 and 2024, that made the chart unwieldy if left unedited.  The earthquakes deaths are in green, tsunamis in blue, and volcano in red.

To interact with the layered map showing 21st century natural disasters on individual layers, you will run the 'index_p3_roop' file, currently filed in the Visualizations folder. This will load a map with three layers (earthquakes, tsunamis, and volcanos). You can look at all three layers simultaneously or use the control in the upper right hand corner to select a layer. While navigating in the map, each event has a marker with a unique color (red for earthquakes; pink for tsunamis; and blue for volcanos) and a popup that displays details about that particular natural disaster event (some of the NOAA's events do not have a full set of details). 


# Ethical Considerations
We used data from the National Geophysical Data Center / World Data Service (NGDC/WDS): NCEI/WDS Global Significant Volcanic Eruptions Database. NOAA National Centers for Environmental Information, and we give them credit in the Data Sources section of the Readme.  We tried to account for bias by including data from the entire world.  There is no private data in our datasets, so we avoid concerns with data privacy violations.  


# Data Sources
National Geophysical Data Center / World Data Service (NGDC/WDS): NCEI/WDS Global Significant Volcanic Eruptions Database. NOAA National Centers for Environmental Information. https://www.ngdc.noaa.gov/hazel/view/about

# Code Assistance
In the file 'logic_christian.js', a large amount of the code was adapted from code in the documentation for Chart.js.  Assistance was received from the TA's on how to use .ajax to run the json files that allowed me to create the chart.  Stack Overflow was also referenced to help map the data I needed to display.

Assistance was received for the logic_p3_roop from the class instructors; a tutoring session on 26-Jul-2024; and the Xpert Learning Assistant.




