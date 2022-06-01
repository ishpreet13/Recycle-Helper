# Recycle-Helper
This project is a capstone project submitted in partial fulfillment of the requirements of the degree of Master of Science in Computer Science & Software Engineering from [University of Washington-Bothell](https://www.uwb.edu/).

Recycle helper is a cross platform mobile application that aims to promote recycling. It helps users by providing them recycling instructions for different product categories. The recycle instructions rule database that provides these instructions to the user was created from scratch by researching from credible sources. These instructions were then formulated into simple executable steps to be followed by the user. The application allows the user to capture/choose an image of an item using a phone camera or gallery. It uses software engineering methodologies and machine learning to predict the item and provide the relevant recycle instructions.To motivate and engage users for recycling, the application allows the user to set a monthly target goal for recycling, track its progress, and view their recycle history. It also provides additional information on recycling an item and shows nearby recycling locations.
More implementation details of the project can be found in this [paper](https://drive.google.com/file/d/1VPlurK52III2tR7ts3nLtNmlpoZlGCYk/view?usp=sharing). 

## Dataset
The application is able to detect and predict the items with an accuracy of 83.4%, using Resnet34, a pre-trained Convolutional Neural Network (CNN) model. A new dataset with 5239 images and 59 category labels was created to train the CNN model for this project. This dataset can be accessed [here](https://drive.google.com/drive/folders/1agsbgRf_oG73bc9HswquvUGyGJ8toswO?usp=sharing). **If you are using the dataset, please give a citation of this repository.** More details on the breakdown of the dataset and the machine learning algorithm can be found in the [paper](https://drive.google.com/file/d/1VPlurK52III2tR7ts3nLtNmlpoZlGCYk/view?usp=sharing).

## Tools and framework
This project uses Google's Firebase as the Mobile Backend as a Service(MBaaS) and Expo framework for developing the cross-platform mobile application.

## Demonstration
A short demonstration of the application on an android emulator can be found [here](https://drive.google.com/file/d/1pNb9KoQmLOA1eloWh6SxWDAqdiHroljo/view?usp=sharing)
