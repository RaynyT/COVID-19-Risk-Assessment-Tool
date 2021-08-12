# CovidAware Server & Back End Documentation - Rayna Tilley

## 1. Introduction

First off, I want to thank you for your interest in our project! I have had a lot of fun setting up the server and the database and I really hope you go on to enjoying that as well as it becomes more developed. This has been my first end-to-end project where I’ve seen the project from ideation to deployment so I apologize for the hierarchical structure that may not be as intuitive as it should be. Hopefully this guide aids you in navigating it!
In the Front End document, Chris will discuss the structure and layout of the different pages that contribute to the overall functionality of our COVID-19 risk calculator, but in this document I will discuss the structure for modifying and maintaining the server.

## 2. Set Up - Go Environment

Setting up the environment is by far the **most complex** step in the development of the server. To make your life easier, here is a wonderful resource that is given in INFO 441 (Server Side Development) that I utilized in order to set up my Go environment. It will be key in your success but if you have any questions feel free to reach out to me and I will gladly help you get this process started.

Resource: https://github.com/info441-au20/course_info 

For this project, I chose to utilize Go as the Back End language. From my experience, Go is logical and much easier to understand when setting up the Back End than javascript is. Feel free to change this if you do not wish to use Go, but I highly recommend you continue utilizing it.
The GOPATH is extremely difficult to articulate in words how to set up, but if you follow the tutorials on the resource, it should be able to help you navigate the set up. It is important to note, that when downloading Go the Go binary files that are utilized to compile go are not the folder you should set up the GitHub repo in. Here is an example of my structure:

GitHub Repository:

Go Source Folder (/usr/lib/go-1.13):

~/.profile (Where your environment paths are.)

## 3. Set Up - SSH Into Server

In order to access the server you must run the command:

  ssh netid@riskaware.ischool.uw.edu 

When running this, be sure that you have access to the server (you may need to reach out to the iSchool IT department to obtain access). After ensuring you have access, replace the netid with your netid and leverage your uw password to sign in to the server. Note: some files on GitHub need to be manually changed so that your netid is used instead of mine; most likely these files will be named **deploy.sh**. (The server is called riskaware due to that being its original name; the IT department added a CNAME to the DNS so that users could google covidaware.ischool.uw.edu and still be directed to our web application.)

**REMINDER!**

When sshing into the server you need to download UWs Husky OnNet Client (Big-IP Edge Client).
Source: https://www.lib.washington.edu/help/connect/husky-onnet 
This **must** be connected in order to access the server.

## 4. On the Server

Some key things I want to point out that are on the server:
   * **county_rates.py**
     * This is the script that extracts daily data from the CovidActNow API (The key can be located on the accounts documentation file).
   * **backup.sh**
     * This is the script that creates a backup of the database on a daily basis - this ensures that if something goes wrong with the county_rates.py script, you have the previous day's database saved so that it isn’t corrupted.
The frequency and time at which both of these are run can be viewed 
  **sudo crontab -e** (for the backup)

  **crontab -e** (for the python script)

These essentially mean: Run at 1am and Run at 2am.
  * **backup.sql**
    * This is the file that can be used to restore the database if the python script fails.
    * DO NOT REMOVE the **build** folder or **bin** on the server - they are a part of the update.sh script functionality and are key in deployment.
    
## 5. Accessing the Database for Modification on the Server

In order to access the MySQL database on the server, run this command:
    sudo docker exec -it radatabase sh
This will get you into the MySQL docker container. Once inside, you must run:
    mysql -u root -p
The terminal will then prompt you for the password for the MySQL database.
    (This can be changed if you would like to. Be careful though, you will need to add this password back into the update.sh files when you pull the repo onto your computer. I’ve removed them for security purposes but they are necessary to deploy the web application. **Be sure not to push this password to GitHub or the new password you create.**)
    Once in the MySQL database, you must run:
USE radb;
    This will then allow you to query, insert and alter the database. Run:
        exit;
    to exit.
    Here is an example:
    
## 6. Current Database Structure

This structure can be viewed in the sql file that creates the database. This is located in:   
* /src/server/db/schemas.sql 
It is this file that can be altered to include more tables if needed when continuing development.   
**IMPORTANT NOTE**: Redeploying the database will result in the **deletion of all data** that has been obtained from users thus far, so make sure redeploying the database is something you **want/need** to do.   
* If you want to modify it, but not at the risk of deleting all data, I would sign into the MySQL database and utilize MySQL commands to insert a new table, data or some other function you would like to complete.
    
## 7. Files/Folders

All Back End files will be under the folder “src”.
The relevant files that you will most likely be modifying are within “server”.
There are two folders under “server”: “db” and “gateway”.   

**DB**   
* “db” contains all of the files relevant to the deployment of the database.
* You may end up modifying the schemas.sql file as mentioned above.
* Otherwise, the dockerfile and others should not need to be modified besides the netid and MySQL password changes mentioned previously.
    
**GATEWAY**   
* “gateway” contains all of the files relevant to the deployment of the actual web application.
* Within the “gateway” folder are two folders: “handlers” and “models” along with the files that will deploy the web application. Again, the only files modified at this level should be with the netid and MySQL password changes mentioned previously.
* There are two binary files (“gateway” and “main” but you should **ignore** these.)
    
**HANDLERS**    
* cors.go - **Should not have to be modified**, this handles the headers and information that is attached to the http html headers.
* context.go - Contains all of the models as an interface to be utilized in main.go. It creates a HandlerContext object. **This should only be modified if a table and model are added or deleted**.
* routes.go - This handles all of the interactions with the database for when a url extension is called. If new functionality is required on the front end like returning new data or inserting a new value, a new handler function must be created and added to routes.go.
    (Note: The error codes are not currently entirely accurate, if you feel inclined, you can go through and change them.)   
    
**MODELS**   
* Each folder within models represents a table in the database.   
* Each folder has three files:   
  * “table_name”.go
    * This defines the structure and requirements for the table.
  * mysqlstore.go
    * This defines what you can do with that table. For instance, look up tables only allow for queries while transactional tables allow insertions.
      * Look Up Table Example:
        * Vaccines
      * Transactional Table Example:
        * Users
  * store.go
    * This defines the interface for the functions that can be utilized with the table.
**NOTE**: Within the “statecounty_rates” folder, the mysql store file contains a portion of the **algorithm’s computation**. The parts that it contains are the part in **teal** writing (this is in the Algorithm_Documentation file):    
  * Number of Reported Cases (Last Week)
  * Delay Factor / Population in Millions
    * Delay Factor = min(2, # of cases reported last week / # of cases reported the week before last week)

## 8. Deployment

There are two different steps that are necessary to deploy the web application:
  * Navigating to the “covrt” folder:
    * Note: you will need to pull the updates from the repo in order to incorporate the changes on the front end into the binary files that will be used to deploy the web application.
      * Run: sudo npm install
      * Run: sudo npm run build (This may take 5 minutes, it’s a large file.)
  * Navigating to the “gateway” folder within src:
    * Note: Your UW password will be required 3 times (if it is the iSchool server being leveraged).
      * Run: go build main.go
      * Run: ./deploy.sh

## 9. Next Steps

As mentioned above, all of those alteration methods can be utilized to create new functionality that the front end will provide:
  * Visualization Dashboard:
    * Will require queries and potentially new tables with new metrics being stored.
    * Leveraged via GET request; json data passed to client for manipulation.
